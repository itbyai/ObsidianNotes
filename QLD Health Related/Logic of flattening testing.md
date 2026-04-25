
# 一、整体思路

这段 SQL 的核心目标是：

**把 `screen_file_mapping` 里的字段映射规则，按“源文件 + 目标表”分组，然后再按数据类型分类，把每一类字段拼成一组可复用的列表达式。**

最后产出一个临时视图：

```sql
file_names_with_primitive_data_type_columns
```

这个视图本质上是一个**元数据驱动的字段规则汇总表**，后续可以拿它去：

- 动态生成 source-to-target 对账 SQL
    
- 动态生成 profile SQL
    
- 动态生成校验 SQL
    
- 按不同数据类型做不同转换逻辑
    

---

## 这段 SQL 在做什么

你可以把它理解成两层：

### 第一层：分组收集规则

在 CTE `columns_by_data_type` 里，按：

- `File Name` → 源文件
    
- `PADP Table` → 目标表
    

进行 `GROUP BY`

然后把这个文件/表组合下的字段，按不同数据类型收集成数组，例如：

- string 类型的源字段数组
    
- string 类型的目标字段数组
    
- boolean 类型的源表达式数组
    
- boolean 类型的目标表达式数组
    
- number 类型的源表达式数组
    
- array string 类型的源表达式数组
    
- 等等
    

---

### 第二层：把数组转成可直接拼 SQL 的字符串

外层 `select` 再把这些数组：

- 转成字符串
    
- 去掉 `[]`
    
- 做一点清洗
    

最后输出成类似这种结果：

|Source_File_Name|Target_Table_Name|Source_Columns_Primitive_String_Cleaned|Target_Columns_Primitive_String_Cleaned|...|
|---|---|---|---|---|

这样每一行就代表：

> 某一个 source file 对应某一个 target table，在不同数据类型下，各自应该怎么取列、怎么转换、怎么对比。

---

# 二、为什么这样设计

因为你后面很可能不是只处理一个表，而是很多表很多列。

如果每次都手写：

```sql
select col1, col2, col3 ...
```

或者手写转换：

```sql
case when src_flag in ('Y','1') then 'true' ...
```

那会非常重复。

所以这里的思路是：

## 1）把字段规则放在 mapping 表里

`screen_file_mapping` 充当配置表，定义：

- 源字段名
    
- 目标字段名
    
- 数据类型
    
- 是否数组
    
- 是否有 related values
    
- 属于哪个 file / table
    

## 2）按数据类型套用不同模板

比如：

- `X` → 字符串
    
- `A` → operator / 特殊字符类
    
- `B` → 布尔
    
- `D` → 日期
    
- `N` → 数值
    
- `N2` → 除以 100
    
- `N4` → 除以 10000
    
- `T` → 时间
    
- `Related Values in ('S','M')` → 数组字符串
    

也就是说：

**不是每个字段都单独写逻辑，而是同一类字段共用一个模板。**

## 3）最终输出“SQL表达式清单”

这段 SQL 最重要的不是取业务数据，而是**生成表达式列表**。

例如某个字段不是直接输出字段名，而是输出一段表达式：

```sql
REPLACE(trim(target_col), CHAR(9), ".")
```

或者：

```sql
case when `src_flag` in ("Y","1") then "true" ...
```

所以结果表本质上更像是一个：

**“动态 SQL 片段仓库”**

后面你可以再拼接：

- select list
    
- compare list
    
- hash list
    
- union list
    
- audit list
    

---

# 三、产出结果长什么样

假设某个 file / table 下有这些字段：

- name → X
    
- status → A
    
- active_flag → B
    
- amount → N2
    

那么最终这一行大概会变成：

- `Source_Columns_Primitive_String_Cleaned`
    
    - `` `name` ``
        
- `Target_Columns_Primitive_String_Cleaned`
    
    - `REPLACE(trim(name_col),CHAR(9),".")`
        
- `Source_Columns_Primitive_Operator_Cleaned`
    
    - `` `status` ``
        
- `Target_Columns_Primitive_Operator_Cleaned`
    
    - `status_col`
        
- `Source_Columns_Primitive_Boolean_Cleaned`
    
    - `case when` active_flag `in ("Y","1") then "true" ...`
        
- `Target_Columns_Primitive_Boolean_Cleaned`
    
    - `cast(active_flag_col as string)`
        
- `Source_Columns_Primitive_Number2_Cleaned`
    
    - `` `amount`/100 ``
        
- `Target_Columns_Primitive_Number2_Cleaned`
    
    - `amount_col`
        

所以后面程序可以直接取出这些字符串，再拼成动态 SQL。

---

# 四、这段 SQL 的业务定位

这不是一段“直接对账业务数据”的 SQL。  
它更像一个**预处理元数据的 SQL**。

它做的是：

## 输入

`screen_file_mapping`

里面是字段映射定义。

## 输出

`file_names_with_primitive_data_type_columns`

里面是按 source/target 分组后的表达式集合。

## 用途

给后续动态校验 / 动态建 SQL / 自动化测试使用。

---

# 五、现在再讲细节结构

---

## 1）整体结构

```python
sql = """with columns_by_data_type as (...) 
select ...
from columns_by_data_type
"""
```

结构分两段：

### 第一段：CTE `columns_by_data_type`

负责：

- 读取 mapping 表
    
- 过滤无效行
    
- 按 file + table 分组
    
- 对每种类型做 `array_agg`
    

### 第二段：外层 select

负责：

- 把数组转成字符串
    
- 去掉数组符号 `[]`
    
- 输出 clean 后的字段表达式列
    

---

# 六、CTE 部分的核心逻辑

---

## 1）分组键

```sql
select `File Name` as Source_File_Name, `PADP Table` as Target_Table_Name
...
from screen_file_mapping
...
GROUP BY `File Name`,  `PADP Table`
```

说明每一行结果代表：

- 一个源文件
    
- 对应一个目标表
    

也就是以 file-to-table 作为规则粒度。

---

## 2）每种数据类型各做一组 source / target 数组

模式几乎都是这样：

```sql
array_agg(
  case when 条件 then 某个表达式 else null end
) as 某类型数组
```

意思是：

- 如果当前映射行属于这个类型，就生成对应表达式
    
- 否则给 null
    
- 再把这些行聚合成一个数组
    

---

# 七、各数据类型的思路

---

## A. Primitive String (`Data Type = 'X'`)

### Source

```sql
array_agg(
  case when `Data Type` = 'X' and `Related Values` is null 
       then concat('`',trim(`Documented Data Description`),'`') 
       else null 
  end
) as Source_Columns_Primitive_String
```

意思：

对源字段，直接生成带反引号的列名，例如：

```sql
`Patient Name`
```

这里用的是 `Documented Data Description` 作为源字段名。

### Target

```sql
array_agg(
  case when `Data Type` = 'X' and `Related Values` is null 
       then concat('REPLACE(trim(',`PADP Column`,'),CHAR(9),".")') 
       else null 
  end
) as Target_Columns_Primitive_String
```

意思：

目标字段不直接取列，而是套一层标准化处理：

- `trim()` 去空格
    
- `REPLACE(..., CHAR(9), ".")` 把 tab 替换成点
    

这说明目标侧字符串在对比前需要清洗。

---

## B. Primitive Operator (`Data Type = 'A'`)

### Source

```sql
concat('`',trim(`Documented Data Description`),'`')
```

### Target

```sql
`PADP Column`
```

这类字段看起来被当作普通文本/操作码处理，没有复杂转换。

---

## C. Primitive Boolean (`Data Type = 'B'`)

这是最典型的“源目标语义不同，需要转换”。

### Source

```sql
concat(
'case when `',trim(`Documented Data Description`),'` in ("Y","1") then "true" 
      when `',trim(`Documented Data Description`),'` in ("N","0") then "false" 
      else `',trim(`Documented Data Description`),'` end as ',`PADP Column`,''
)
```

意思：

把源字段里的：

- `Y` / `1` → `"true"`
    
- `N` / `0` → `"false"`
    
- 其他值 → 保持原值
    

并且生成别名为目标列名。

所以这是在生成一段 source 侧标准化表达式。

### Target

```sql
concat('cast(',`PADP Column`,' as string)')
```

目标侧则把 boolean 列转成 string，这样方便和 source 转换后的 `"true"` / `"false"` 比较。

---

## D. Primitive Date (`Data Type = 'D'`)

源和目标都比较简单：

- source：直接源列
    
- target：直接目标列
    

说明日期字段可能在别处已经标准化，或者这里默认两边格式兼容。

---

## E. Primitive Number (`Data Type = 'N'`)

### Source

```sql
concat('replace(`',trim(`Documented Data Description`),'`,"]","")*1')
```

这里的意思是：

- 去掉 `]`
    
- 再乘以 1 强制转数值
    

说明源字段里可能有脏数据，比如数字末尾带 `]`。

### Target

直接目标列。

---

## F. Primitive Number2 (`Data Type = 'N2'`)

### Source

```sql
concat('`',trim(`Documented Data Description`),'`/100')
```

说明源字段存的是放大 100 倍的数，比较前要除以 100。

### Target

直接目标列。

---

## G. Primitive Number4 (`Data Type = 'N4'`)

同理：

```sql
`源字段` / 10000
```

说明源值被放大了 10000 倍。

---

## H. Primitive Time (`Data Type = 'T'`)

这个最复杂。

### Source

```sql
concat(
'date_diff(MILLISECOND, DATEADD(DAY, 0, CURRENT_DATE()), 
 date_format(
   case when `',trim(`Documented Data Description`),'` = "24:00:00" 
        then "00:00:00" 
        else `',trim(`Documented Data Description`),'` 
   end ,
 "HH:mm:ss"))'
)
```

它的意图是把源时间值转换成一个统一的时间表示，特殊处理：

- `24:00:00` → `00:00:00`
    

说明源系统可能出现不标准时间值。

然后再转成与日期锚点相关的毫秒差，方便跟目标统一比较。

### Target

直接目标列。

这通常意味着目标侧存的可能已经是时间戳/毫秒数或兼容格式。

---

## I. Array String (`Data Type in ('X','A') and Related Values in ('S','M')`)

这部分说明：

这些字段虽然基础类型是字符串 / operator，但由于 `Related Values` 是 `S` 或 `M`，被当成数组型字符串处理。

### Source

```sql
concat(
'nullif(translate(replace(`',trim(`Documented Data Description`),'`, char(10),""),"[]',char(92),'" ,",""),"")'
)
```

这一步是在清洗数组样式字符串：

- 去换行
    
- 去 `[]`
    
- 去反斜杠
    
- 去双引号
    
- 去空格 / 逗号等字符
    
- 最后空字符串转 null
    

### Target

```sql
concat(
'nullif(translate(REPLACE(trim(cast(',`PADP Column`,' as string)),CHAR(9),"."),"',char(92),'"[] ,",""),"")'
)
```

目标侧也做类似清洗，只不过先：

- cast 成 string
    
- trim
    
- tab 改成点
    

这个明显是为了把数组/string 表达统一后再比较。

---

# 八、where 条件的作用

---

## 1）

```sql
where 1=1
```

只是为了后续方便继续加条件。

---

## 2）

```sql
and attribute <> 'BY.PATIENT"'
```

排除某类 attribute。

看起来是 mapping 里有异常值或特殊不需要处理的记录。

---

## 3）

```sql
and cast(Attribute as decimal(10)) >= 1
```

只保留 attribute 可转成数字且大于等于 1 的行。

这通常说明：

`Attribute` 在这里像是字段顺序号或有效标识，只处理正式字段，不处理 header/注释/特殊记录。

---

## 4）

```sql
and concat(`PADP Table`, "|", `PADP Column`) not in ("patients|birth_sex")
```

手工排除一个特殊映射：

- `patients.birth_sex`
    

一般这是因为这个字段转换规则特殊，或者已知有问题。

---

## 5）

```sql
and trim(`Documented Data Description`) <> ''
```

排除没有源字段名的空记录。

---

# 九、外层 select 在做什么

CTE 里得到的是数组列，例如：

```sql
["`col1`", "`col2`", null]
```

外层 select 负责把这些数组清理成字符串。

---

## 1）source 侧常见处理

```sql
trim('[]',cast(Source_Columns_Primitive_String as string))
```

目的是：

- 先把数组 cast 成字符串
    
- 再把首尾的 `[` `]` 去掉
    

变成：

```sql
`col1`, `col2`, null
```

注意：这里不一定会自动去掉中间的 `null`，这点后续可能要留意。

---

## 2）target 侧常见处理

```sql
translate(cast(Target_Columns_Primitive_String as string),'[]','')
```

也是把 `[` `]` 去掉，只是用的是 `translate`。

---

## 3）array string target 特别处理

```sql
nullif(trim('[]',cast(Target_Columns_Array_String as string)),"")
```

如果清洗后为空字符串，就转成 `null`。

这样后面拼动态 SQL 时更好判断。

---

# 十、最后三行 Python 的作用

```python
df = spark.sql(sql)
display(df)
df.createOrReplaceTempView('file_names_with_primitive_data_type_columns')
```

## `spark.sql(sql)`

执行这段 SQL，得到 DataFrame。

## `display(df)`

在 Databricks 里展示结果。

## `createOrReplaceTempView(...)`

把结果注册成临时视图，供后续 SQL 使用：

```sql
select * from file_names_with_primitive_data_type_columns
```

---

# 十一、一句话概括这段代码

这段代码的本质是：

**根据 `screen_file_mapping` 中的字段映射定义，按文件和目标表汇总出不同 primitive 数据类型对应的 source/target SQL 表达式清单，并保存为临时视图，供后续动态生成对账和测试 SQL 使用。**

---

# 十二、你在阅读这段代码时最该抓住的重点

最重要的不是每个函数，而是这 4 个设计点：

## 1. 它不是在处理业务数据

它在处理的是**元数据**。

## 2. 它不是直接比对

它是在生成**比对所需的表达式集合**。

## 3. 它按数据类型套模板

这是典型的 metadata-driven / template-driven 设计。

## 4. 它的输出是为了后续动态 SQL

不是最终报表，而是“中间规则层”。

---

# 十三、这段 SQL 可能存在的几个隐患

顺手提醒你几个点，因为这段写法在 Databricks/Spark SQL 里后续很容易踩坑：

## 1）`array_agg` 会包含 null

因为每行不满足条件时返回 null，所以聚合结果里可能混着 null。

最后 cast 成 string 后，可能得到：

```sql
[`col1`, null, `col3`]
```

这会让后续动态 SQL 拼接不干净。

更稳的方式通常是：

- 先 collect_list 非空值
    
- 或 array_remove(..., null)
    

---

## 2）`trim('[]', cast(array as string))` 不一定是最稳妥的“去数组括号”方式

它只是去首尾括号，不会处理内部格式问题。

---

## 3）很多列是在生成 SQL 片段字符串，不是在执行表达式

比如：

```sql
'case when ... end as xxx'
```

这只是字符串。  
后面必须再动态拼 SQL 才会真正执行。

---

## 4）source/target 两侧清洗规则不完全对称

有些类型 source 做了大量清洗，target 没做；有些 target 做了 cast/string 化，source 没做。  
这说明这是带业务假设的，不是纯技术通用逻辑。

---

如果你愿意，我下一步可以继续帮你做两件事中的一个：

1. **把这段 SQL 画成流程图式解释**，更容易给别人讲
    
2. **逐段重构成更清晰、更稳健的 Databricks 版本**，特别是把 `array_agg + null` 和字符串清洗部分优化掉