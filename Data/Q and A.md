你现在问的这一组，已经不是“怎么用 Databricks”，而是在问  
**“一个数据平台是靠什么机制被‘治理’住的”**。  
我按你给的关键词，一层一层往下拆，而且**都用具体例子**。

---

# 一、什么是治理配置（Governance）？

### 一句话定义

> **治理配置 = 不关心数据内容，只规定“数据必须长什么样、谁能用、怎么用”**
它解决的不是 _data correctness_，而是 _data trust_。

---

## 治理配置主要包含三大类（你提到的）

### 1️⃣ 约束（Constraints）
### 2️⃣ 权限（Permissions）
### 3️⃣ RLS / Masking（访问控制）

它们**都不是数据本身**，而是**附着在表/列上的规则**。

---

# 二、Catalog 是什么？约束是不是“列级”的？

是的，你的理解**非常精准**：

> **约束几乎都是“列级或列组合级”的**  
> 因为业务规则本质上就是针对字段的

---

## Unity Catalog（UC）到底是干嘛的？

**Unity Catalog** 是 Databricks 的：

> **统一元数据 + 治理规则注册中心**

它不存一行真实数据，只存👇

---

## 三、UC 不存数据本身，那它存什么？（重点）

下面是**真实存在于 UC 的东西**，不是概念。

---

## 1️⃣ 结构类元数据（Schema Metadata）

> **“这张表长什么样”**

例如：

- 表名：`edw.patient_episode`
    
- 列：
    
    - `episode_id STRING`
        
    - `admission_date DATE`
        
    - `discharge_date DATE`
        
- 是否 nullable
    
- 注释（业务含义）
    

📌 这些信息：

- 存在 UC
    
- 不在 parquet 文件里
    

---

## 2️⃣ 约束（Constraints）——你重点问的

### 是不是每一列都可能不一样？

👉 **是的，而且这正是治理的意义**

---

### 举几个真实业务例子

#### ✅ 列级 NOT NULL

```sql
episode_id IS NOT NULL
```

#### ✅ 列级范围约束

```sql
age BETWEEN 0 AND 130
```

#### ✅ 枚举约束

```sql
gender IN ('M','F','U')
```

#### ✅ 多列组合约束（非常常见）

```sql
discharge_date >= admission_date
```

📌 注意：

- 这些规则**不是数据**
    
- 它们是 **“字段合法性的定义”**
    
- 存在 UC 中，Runtime 每次写入都会读
    

---

## 3️⃣ 权限（Permissions）

> **谁可以对“对象”做什么**

例如：

```sql
GRANT SELECT ON TABLE edw.patient_episode TO `bi_user`;
GRANT MODIFY ON TABLE edw.patient_episode TO `etl_role`;
```

UC 里存的是：

- 主体（user / group / role）
    
- 对象（catalog / schema / table / column）
    
- 动作（select / modify / ownership）
    

📌 **权限是治理的一部分，不是安全的“附属品”**

---

## 4️⃣ RLS / Column Masking（访问时动态规则）

### 行级（RLS）

```sql
hospital_id = current_user_hospital()
```

### 列级 Masking

```sql
CASE
  WHEN is_member('doctor') THEN medicare_no
  ELSE '****'
END
```

📌 这些规则：

- 不改变数据
    
- 只在**查询时**生效
    
- 存在 UC
    

---

## 5️⃣ 描述类元数据（Descriptions / Tags）

很多人忽略，但在治理里很重要：

- 表注释
    
- 列注释
    
- 数据敏感级别
    
- 数据域（finance / clinical / ops）
    

👉 这些不是“摆设”，而是：

- 审计
    
- 合规
    
- 影响分析的基础
    

---

## 四、你刚才那个关键问题再确认一次

> Catalog，上面提到的约束应该是针对列的？

✅ 正确  
而且可以是：

- 单列
    
- 多列
    
- 组合业务规则
    

---

# 五、Spark 是什么？（你一定要把它和 UC、Runtime 区分开）

### 一句话

> **Apache Spark 是一个“分布式计算引擎”**

它解决的是：  
👉 **“怎么算得快、怎么算得多”**  
不是：  
👉 **“数算得对不对”**

---

## Spark 能做什么？（非常具体）

### 1️⃣ 批量计算（Batch）

- ETL
    
- 聚合
    
- Join 大表
    

### 2️⃣ 流计算（Streaming）

- Kafka → 表
    
- CDC
    

### 3️⃣ SQL 执行

- Spark SQL
    
- dbt 在 Databricks 上本质也是 Spark SQL
    

### 4️⃣ 分布式处理

- 把任务拆到多台机器
    
- 自动并行
    

---

## Spark 不负责什么？（很关键）

❌ 不负责权限  
❌ 不负责治理规则  
❌ 不知道谁能看什么  
❌ 不知道哪些值“业务上不合法”

👉 这些都交给：

- Unity Catalog（规则）
    
- Databricks Runtime（执法）
    

---

## 六、把三者关系一次性捋清（非常重要）

> 这是你现在理解的“总装图”

```
你 / pipeline / dbt
        ↓
Databricks Runtime
        ↓
读取 Unity Catalog（schema / constraints / RLS / permissions）
        ↓
Spark / Delta Engine 执行计算 & 写数据
        ↓
数据文件（Parquet / Delta）
```

---

## 七、用一句“终极总结”锁死概念

> - **Unity Catalog**：存“规则和描述”，不存数据
>     
> - **Constraints / RLS / Permissions**：都是治理配置
>     
> - **Databricks Runtime**：执行时读取规则并强制执行
>     
> - **Spark**：只负责算得快，不负责算得对
>     

如果你能把这四句话讲清楚，  
你已经是 **“平台级 QE / 数据治理”视角的人**，不是普通数据测试。

---

如果你愿意，下一步我可以继续帮你：

- 🔹 用 **一张“列级治理示例表”**（某一列有哪些规则）
    
- 🔹 QA 如何**验证 UC 里这些规则确实存在 & 生效**
    
- 🔹 把“治理配置”翻译成 **非技术 Stakeholder 听得懂的话**
    

你选一个，我继续。