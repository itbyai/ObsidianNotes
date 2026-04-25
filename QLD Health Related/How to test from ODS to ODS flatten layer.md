这种场景的测试，核心要分成两类看：

**一类是“展开是否正确”**，  
**一类是“展开后是否还能被业务正确使用”**。

如果 ODS 里某一列是 `array`，现在要把它展开成多个列，通常测试不能只看“有没有值”，而要系统验证：

1. 结构是否展开对了
    
2. 值有没有丢、错位、重复
    
3. 空数组、null、异常结构怎么处理
    
4. 下游视图和业务规则有没有被影响
    

---

# 一、先分清你是哪种“展开”

这个很重要，因为不同展开方式测试点不同。

## 情况 A：array of scalar，按位置展开成多列

例如：

```json
["A","B","C"]
```

展开成：

|uid|col_1|col_2|col_3|
|---|---|---|---|
|1|A|B|C|

这里重点测试：

- 第 1 个元素是不是进了 `col_1`
    
- 第 2 个元素是不是进了 `col_2`
    
- 长度不够时后面列是否为 null
    

---

## 情况 B：array of struct，按 key 展开

例如：

```json
[
  {"location":"A","date":"2024-01-01","vol":"1"}
]
```

展开成：

|uid|pos|location|date|vol|
|---|--:|---|---|---|
|1|0|A|2024-01-01|1|

这里重点测试：

- key 是否映射到正确列
    
- `pos` 是否正确
    
- key 缺失时是否 null
    
- struct 里不同字段类型是否正确
    

---

## 情况 C：array 先拆行，再 pivot 成列

例如多个元素先变多行，再按位置或 key 变宽表。  
这种测试会比前两种更复杂，要同时测：

- explode 正确
    
- pivot 正确
    
- 聚合时没丢数据
    

---

# 二、测试思路总框架

建议你按这 6 大类去测。

---

## 1. Schema / Contract 测试

先确认展开后的表结构是不是符合设计。

### 要测什么

- 是否生成了预期列
    
- 列名是否正确
    
- 数据类型是否正确
    
- nullability 是否符合预期
    
- 是否多出不该有的列
    
- 是否少了必须有的列
    

### 例子

如果需求是：

- `LinkedGroup1[0].location -> location`
    
- `LinkedGroup1[0].date -> date`
    
- `LinkedGroup1[0].vol -> vol`
    

那就要测：

- 是否存在 `location/date/vol`
    
- `date` 是否是 date/string（看设计）
    
- `vol` 是否是 numeric/string（看设计）
    

### 典型断言

- column exists
    
- data type matches
    
- no unexpected columns
    

---

## 2. Mapping / Transformation 逻辑测试

这是最核心的。

要证明：

**源数组里的值，真的被放到了正确目标列。**

---

### 2.1 按位置展开时

例如：

```json
["X","Y","Z"]
```

目标：

- `item_1 = X`
    
- `item_2 = Y`
    
- `item_3 = Z`
    

#### 测试点

- 第 0 个元素是否进入第一个目标列
    
- 第 1 个元素是否进入第二个目标列
    
- 顺序是否错位
    
- 元素不足时是否补 null
    
- 元素超长时是否按规则处理
    

#### SQL 思路

把源表拆出来，与目标表逐列对比。

例如：

```sql
with src as (
  select
    uid,
    array_col[0] as exp_col_1,
    array_col[1] as exp_col_2,
    array_col[2] as exp_col_3
  from src_table
),
tgt as (
  select
    uid,
    col_1,
    col_2,
    col_3
  from target_table
)
select *
from src s
join tgt t on s.uid = t.uid
where not (
  s.exp_col_1 <=> t.col_1
  and s.exp_col_2 <=> t.col_2
  and s.exp_col_3 <=> t.col_3
)
```

---

### 2.2 按 key 展开时

例如 `array<struct>`。

#### 测试点

- `location` 是否来自正确 key
    
- `date` 是否来自正确 key
    
- `vol` 是否来自正确 key
    
- key 缺失时目标列是否 null
    
- 目标列是否拿错 key
    

#### SQL 思路

把源列 explode 后按 key 取值，再与目标对比。

如果规则是只取第一个元素 `pos=0`：

```sql
with src as (
  select
    uid,
    linkedgroup1[0].location as exp_location,
    linkedgroup1[0].date as exp_date,
    linkedgroup1[0].vol as exp_vol
  from src_table
),
tgt as (
  select
    uid,
    location,
    date,
    vol
  from target_table
)
select *
from src s
join tgt t on s.uid = t.uid
where not (
  s.exp_location <=> t.location
  and s.exp_date <=> t.date
  and s.exp_vol <=> t.vol
)
```

如果规则是 explode 成多行，则加上 `pos` 对比。

---

## 3. Row Count / Cardinality 测试

展开类需求最容易出问题的就是行数。

### 要测什么

- 一条源记录展开后，目标产生几条记录
    
- 是否多了
    
- 是否少了
    
- `uid + pos` 是否唯一
    
- 一对一 / 一对多关系是否符合设计
    

---

### 3.1 如果数组展开成多行

源表：

|uid|arr|
|---|---|
|1|[A,B,C]|

目标应该有 3 行。

#### 断言

`size(array_col)` 应等于目标表同 uid 的记录数。

```sql
with src as (
  select uid, size(array_col) as expected_cnt
  from src_table
),
tgt as (
  select uid, count(*) as actual_cnt
  from target_table
  group by uid
)
select *
from src s
left join tgt t on s.uid = t.uid
where s.expected_cnt <> coalesce(t.actual_cnt, 0)
```

---

### 3.2 如果数组展开成多列

那行数一般不变。

#### 断言

- 源表行数 = 目标表行数
    
- 主键仍唯一
    

---

## 4. Null / Empty / Edge Case 测试

这是 array 展开最容易漏的。

一定要专门准备边界数据。

### 必测场景

#### 4.1 `array_col is null`

预期：

- 目标列全 null
    
- 或不生成子行
    
- 具体看设计
    

#### 4.2 `array_col = []`

预期：

- 和 null 是否同处理
    
- `size=0` 是否生成 0 行
    

#### 4.3 数组只有 1 个元素

看是否只有第一列有值，其余为 null

#### 4.4 数组长度超过设计上限

如果只展开 3 列，但数组有 5 个元素：

- 后两项是否丢弃
    
- 是否告警
    
- 是否另存
    

#### 4.5 struct 内部缺 key

例如：

```json
{"location":"A","date":"2024-01-01"}
```

没有 `vol`。

预期：

- `vol` 为 null
    
- 不能错位到别的列
    

#### 4.6 元素类型异常

比如本应 numeric 的字段来了字符串。

要测：

- cast 后结果
    
- 是否变 null
    
- 是否被 reject / quarantine
    

---

## 5. Data Quality / Business Rule 测试

展开正确不代表业务可用。

### 要测什么

- 展开后的列值域是否合法
    
- 日期格式是否合理
    
- 数值范围是否合理
    
- 业务必填项是否满足
    
- 枚举值是否在代码表内
    

### 例子

如果展开后有：

- `date`
    
- `time`
    
- `location`
    

可以测：

- `date` 不是未来不合理日期
    
- `time` 在 0~2359 或合法时间范围
    
- `location` 在 allowed code list 中
    

---

## 6. Reconciliation / Source-to-Target 测试

这个是上线前最关键的。

你要能回答：

**目标表是否完整、准确地表达了源 array 的内容？**

### 推荐做法

做 source-to-target 对账：

- source：把 array 按同样逻辑拆开
    
- target：取展开后的结果
    
- 用主键 + pos + value/key 对比
    

---

## 例子：array 拆行对账

```sql
with expected as (
    select
        uid,
        exploded.pos as pos,
        cast(exploded.col as string) as field_value
    from src_table
    lateral view posexplode_outer(array_col) exploded as pos, col
),
actual as (
    select
        uid,
        pos,
        cast(field_value as string) as field_value
    from target_table
),
missing_in_actual as (
    select e.*
    from expected e
    left anti join actual a
      on e.uid = a.uid
     and e.pos <=> a.pos
     and e.field_value <=> a.field_value
),
unexpected_in_actual as (
    select a.*
    from actual a
    left anti join expected e
      on e.uid = a.uid
     and e.pos <=> a.pos
     and e.field_value <=> a.field_value
)
select 'missing_in_actual' as issue_type, * from missing_in_actual
union all
select 'unexpected_in_actual' as issue_type, * from unexpected_in_actual
```

---

# 三、测试用例怎么设计

建议最少覆盖下面这些样例。

|场景|示例|预期|
|---|---|---|
|正常 3 元素|`[A,B,C]`|3 个值正确展开|
|单元素|`[A]`|只有第一列/第一行有值|
|null|`null`|按设计输出 null 或 0 行|
|空数组|`[]`|按设计输出 null 或 0 行|
|长度不足|`[A,B]`|第三列为 null|
|长度超限|`[A,B,C,D]`|第四项按设计处理|
|含 null 元素|`[A,null,C]`|中间位置保留 null|
|重复元素|`[A,A,B]`|不应被意外去重|
|struct 缺字段|`{"location":"A"}`|缺失字段为 null|
|类型异常|`{"vol":"abc"}`|按 cast/校验规则处理|

---

# 四、在数据项目里怎么分类这些测试

你可以把它归到这些 validation type：

## Model Contract Validation

- 展开后列名、类型、必填性
    

## Column-Level Validation

- 单列值是否正确
    
- 格式、范围、nullability
    

## Transformation Validation

- array 元素到目标列的映射关系是否正确
    

## Cardinality Validation

- 行数、展开条数是否正确
    

## Domain Rule Validation

- 展开后字段是否满足业务规则
    

## Reconciliation Validation

- source explode 后与 target 对账
    

---

# 五、你这个场景的推荐测试清单

如果是 ODS 某一列 array 展开成多个列，我建议至少做这 8 个：

1. **Schema test**  
    目标列都存在，类型正确
    
2. **Primary key uniqueness test**  
    目标表主键仍唯一，或 `uid+pos` 唯一
    
3. **Row count/cardinality test**  
    行数是否符合预期
    
4. **Position mapping test**  
    第 N 个元素是否进入第 N 个目标列/行
    
5. **Null / empty array test**  
    null、空数组处理是否符合规则
    
6. **Overflow test**  
    超出设计长度的元素如何处理
    
7. **Business field validation**  
    展开后日期、代码、数值是否合法
    
8. **Full source-to-target reconciliation**  
    源数据 explode 后与目标完整对账
    

---

# 六、如果是“展开成多个列”，最简测试 SQL 模板

假设：

- 源表：`src_table`
    
- array 列：`arr_col`
    
- 目标表：`tgt_table`
    
- 目标列：`item_1, item_2, item_3`
    

```sql
with src as (
  select
    uid,
    arr_col[0] as exp_item_1,
    arr_col[1] as exp_item_2,
    arr_col[2] as exp_item_3
  from src_table
),
tgt as (
  select
    uid,
    item_1,
    item_2,
    item_3
  from tgt_table
)
select
  s.uid,
  s.exp_item_1, t.item_1,
  s.exp_item_2, t.item_2,
  s.exp_item_3, t.item_3
from src s
join tgt t
  on s.uid = t.uid
where not (
  s.exp_item_1 <=> t.item_1
  and s.exp_item_2 <=> t.item_2
  and s.exp_item_3 <=> t.item_3
)
```

---

# 七、如果是 array 展开成多列，最简测试 SQL 模板

假设只取第一个元素 `pos=0`：

```sql
with src as (
  select
    uid,
    arr_col[0].location as exp_location,
    arr_col[0].date as exp_date,
    arr_col[0].vol as exp_vol
  from src_table
),
tgt as (
  select
    uid,
    location,
    date,
    vol
  from tgt_table
)
select *
from src s
join tgt t on s.uid = t.uid
where not (
  s.exp_location <=> t.location
  and s.exp_date <=> t.date
  and s.exp_vol <=> t.vol
)
```

---

# 八、一句话总结

这种需求的测试重点不是“能不能展开”，而是：

**源 array 的每个元素、每个位置、每个 key，是否准确、完整、按规则落到了目标列，并且边界情况也处理正确。**

如果你愿意，我下一条可以直接按你现在的场景，给你整理一套 **ODS array 展开测试用例表**，按 `Test Scenario / Expected Result / SQL Logic` 的格式输出。