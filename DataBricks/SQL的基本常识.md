```SQL
    SELECT
        * 
    FROM
        (     SELECT
                    b.*,
                    tn.txn_no     
        FROM
            cbi_ods_pat.hbcisprod.bank b     LATERAL VIEW explode(b.transaction_no) tn AS txn_no ) b 
    JOIN
        cbi_ods_pat.hbcisprod.transactions t   
            ON t.table_id = b.txn_no   
            AND t.hbcis_instance = b.hbcis_instance 
    JOIN
        cbi_ods_pat.hbcisprod.patients p   
            ON p.table_id = substring(         b.txn_no,
               1,
               locate('-',
        b.txn_no) - 1       )   
        AND p.hbcis_instance = b.hbcis_instance  LIMIT 100;
```

# 如何对比table？

## 结论先给你（可以直接记住）

> **进行两个 table 的内容比较之前，  
> ✅ columns 的“语义类型”必须一致， 也就是说表示的是同一回事 
> ❌ 但物理类型（是否同样是 string / int）不一定非要一样——前提是你在比较时显式对齐了类型。**

换句话说：

> **“数据库不要求列类型一样；但你作为使用者，必须保证比较时类型语义一致。”**

---

## 一、什么是「必须一致」的类型？（最重要）

### ✅ 必须一致的是：**业务语义类型**

例如：

|语义|表 A|表 B|是否可直接比较|
|---|---|---|---|
|数字 ID|`string '21096'`|`int 21096`|❌（不 cast 不行）|
|日期|`string '2024-01-01'`|`date`|❌|
|金额|`double`|`decimal(18,2)`|⚠️|
|代码|`string`|`string`|✅|

👉 **如果语义不一致，就算数据库能跑，也一定是逻辑错误。**

---

## 二、如果两个表 column 物理类型不同，会怎样？

### ❌ 直接比较（危险）

a.table_id = b.table_id

-- 一个是 string，一个是 int

可能出现的问题：

- Spark/Hive **隐式 cast（不可控）**
- 性能下降
- 比较结果不稳定
- 某些引擎直接报错

👉 **生产环境不推荐**

---

### ✅ 正确做法：显式类型对齐（你来负责）

#### ✅ 把 string → 数值（最常见）

cast(a.table_id as bigint) = b.table_id

或者双方都 cast：

cast(a.table_id as bigint) = cast(b.table_id as bigint)

---

#### ✅ 日期比较（非常常见）

to_date(a.date_str) = b.date

绝对不要：

a.date_str = b.date   -- ❌

---

## 三、什么时候**必须**先统一类型？

下面这些场景，**不统一类型就是错的**：

### ✅ 1️⃣ JOIN / 比对两个表的数据

a.id = b.id

👉 语义必须一致  
👉 类型必须显式对齐

---

### ✅ 2️⃣ 范围比较

a.col BETWEEN x AND y

- string vs int ❌
- string vs date ❌

---

### ✅ 3️⃣ 聚合 / 数学运算

sum(a.amount)

string → 必须 cast

---

## 四、什么时候“类型一样”也不够？

### ⚠️ 物理类型相同，但**语义不同**（隐蔽 bug）

表 A：table_id = '00123'

表 B：table_id = '123'

类型一样（string）✅  
语义相同 ❓  
直接比较：

'00123' <> '123'

👉 **业务上可能是同一个 ID，但 SQL 认为不等**

这时你还是要 **规范化**：

cast(table_id as bigint)

---

## 五、推荐的**比较前检查清单（实战）**

在做两个 table 的内容比较前，建议你快速检查：

### ✅ Checklist ✅

1. **这两个 column 业务语义一样吗？**
2. **是否用于 JOIN / 范围 / 计算？**
3. **类型是否显式统一？**
4. **是否有脏数据（空值、非数字、异常格式）？**
5. **cast 是否会影响性能（分区、索引）？**

---

## 六、你这个问题的标准答案（一句话版）

> **不是“必须 column 类型一样”，  
> 而是：只要要比较，它们就必须被转换成「同一业务语义下的同一类型」。**

也可以记成一句口诀：

> 👉 **Join / Compare 之前，一定先对齐类型**

---

## 七、给你一个非常标准的示例（你现在这个风格）

SELECT *

FROM table_a a

JOIN table_b b

  ON cast(a.table_id as bigint) = cast(b.table_id as bigint)

如果有脏数据：

ON try_cast(a.table_id as bigint) = b.table_id

---

如果你愿意，我可以进一步帮你：

- ✅ 判断某个 join 是否 **隐式 cast（性能杀手）**
- ✅ 给你一套 **跨表对账 / 比对模板 SQL**
- ✅ 帮你设计 **ODS → DWD 的类型规范**

你可以直接贴一个 **真实 join SQL**，我帮你 review。