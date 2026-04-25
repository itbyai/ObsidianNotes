
# What does “Documentation & Lineage Validation” mean in dbt?

It answers **3 concrete questions**:

1. **Is the documentation complete and correct?**
    
2. **Does the documented lineage match the _actual_ data lineage?**
    
3. **Can downstream users trust what dbt says about sources → models → marts?**
    

This is **governance QA**, not data-value QA.

---

## 1️⃣ Documentation Validation — what exactly to test

### A. Model-level documentation checks

**What should exist (minimum standard):**

|Item|Where|
|---|---|
|Model description|`schema.yml`|
|Column descriptions|`schema.yml`|
|Tests declared|`schema.yml`|
|Source descriptions|`sources.yml`|
|Tags / meta (optional)|`schema.yml`|

### Example (expected state)

```yaml
models:
  - name: fct_encounter
    description: "Fact table for patient encounters"
    columns:
      - name: encounter_id
        description: "Unique encounter identifier"
        tests:
          - not_null
          - unique
```

### How to test (automated)

#### ✅ Test 1: Missing descriptions

```bash
dbt docs generate
```

Then check:

- Models without descriptions
    
- Columns without descriptions
    

**How to validate (CI-friendly):**

- Use `dbt docs generate --fail-on-warning` (dbt v1.6+)
    
- Or enforce via **dbt-expectations / dbt-meta-testing**
    

Example meta-test idea:

```yaml
tests:
  - dbt_expectations.expect_table_columns_to_have_descriptions
```

📌 **Fail condition**:  
Any model / column appears undocumented.

---

### B. Source documentation validation

Sources must be documented **before lineage is trusted**.

```yaml
sources:
  - name: iemr
    description: "iEMR source system"
    tables:
      - name: encounter
        description: "Raw encounter records from iEMR"
```

**Test**

```bash
dbt source freshness
```

Validate:

- Source exists
    
- Source freshness defined
    
- Source descriptions present
    

---

## 2️⃣ Lineage Validation — core of the test

This is where most teams _say_ they test, but don’t actually.

---

## A. Logical lineage (declared lineage)

This is dbt’s **intended lineage**, derived from:

- `ref()`
    
- `source()`
    

### Test 2: No hard-coded table references

❌ BAD (breaks lineage):

```sql
select * from cbi_ods_prod.iemr.encounter
```

✅ GOOD:

```sql
select * from {{ source('iemr', 'encounter') }}
```

**How to test**

- Code scan (CI):
    
    - Fail build if raw catalog.schema.table appears
        
- dbt project lint rules
    

📌 **Fail condition**:  
Any model bypasses `ref()` / `source()`.

---

## B. Physical lineage (actual execution)

This validates that:

> “What dbt _says_ flows → what actually runs”

### Test 3: dbt lineage graph vs warehouse lineage

Run:

```bash
dbt docs generate
dbt docs serve
```

Then visually verify:

- Source → staging → intermediate → mart
    
- No “orphan models”
    
- No unexpected cross-domain joins
    

**In Databricks**:

- Compare dbt lineage with:
    
    - Unity Catalog lineage
        
    - Query history dependencies
        

📌 **Fail conditions**

- A model shows lineage in dbt docs but not in Databricks
    
- A Databricks lineage edge has **no dbt ref**
    

---

## 3️⃣ Documentation ↔ Lineage consistency tests (most important)

This is where QA really shines.

---

### Test 4: Column lineage vs column documentation

Validate:

- Column documented as “derived” actually comes from transformations
    
- Column documented as “source field” maps directly to source
    

Example mismatch:

```yaml
description: "Copied from source encounter_id"
```

But SQL shows:

```sql
md5(encounter_id || patient_id) as encounter_id
```

📌 **Fail condition**  
Documentation contradicts transformation logic.

---

### Test 5: Model purpose vs lineage shape

Example:

- Model described as **“HHS-level aggregate”**
    
- But lineage shows **patient-level joins**
    

📌 **Fail condition**

- Grain described ≠ grain implied by lineage
    

---

## 4️⃣ Governance-level lineage tests (enterprise-grade)

If you’re in PADP / QH / regulated environments, add these.

### A. RLS-aware lineage validation

Check:

- All downstream marts inherit HHS filters
    
- No model drops the RLS column
    

Test idea:

```sql
select count(*)
from {{ ref('fct_encounter') }}
where hhs_code is null
```

📌 **Fail condition**

- Lineage breaks security propagation
    

---

### B. Impact analysis test

Pick a source table:

```text
iemr.encounter
```

Verify:

- All impacted models appear in dbt lineage graph
    
- No undocumented downstream usage
    

This is a **manual + visual validation**, but critical.

---

## 5️⃣ How to report this in a Test Plan (copy-paste friendly)

### Test Case: Documentation & Lineage Validation

|Field|Value|
|---|---|
|Test Type|Governance / Metadata|
|Tool|dbt|
|Scope|Sources, Models, Marts|
|Entry Criteria|dbt compile succeeds|
|Test Steps|Generate docs → validate descriptions → validate lineage|
|Pass Criteria|100% documented models; no orphan lineage|
|Fail Criteria|Missing docs; broken lineage; undocumented joins|

---

## 6️⃣ Summary (QA mindset)

**This test is NOT about data correctness**  
It is about:

✅ Trust  
✅ Maintainability  
✅ Auditability  
✅ Change impact safety


下面我给你一个**非常清晰、易理解、工程级别**的答案：  
👉 **dbt 上做 lineage 和 Databricks（Unity Catalog）上做 lineage 的区别是什么？**

这是数据团队最容易混淆的点，因为**两者都有血缘图，但根本目的、能力、边界完全不同**。

我会用对比表、工程示例、层级对照，让你一下子就明白。

---

# 🎯 **一句最本质的区别（立即理解）**

|工具|血缘类型|本质|
|---|---|---|
|**dbt lineage**|Transformation Lineage（SQL 模型层血缘）|显示**dbt 项目内部**模型之间的 ref() 依赖关系|
|**Databricks Unity Catalog lineage**|Platform Lineage（平台级血缘）|显示**跨系统**、跨 notebook/job/pipeline/table 的真实执行血缘|

**总结一句话：**

> **dbt lineage = 代码依赖图**  
> **Unity Catalog lineage = 实际执行的跨系统血缘图**

---

# 🧠 一、为什么它们不一样？（目的完全不同）

## ✔ dbt lineage（Transformation Lineage）

- 用于展示 dbt 项目内部模型如何 ref 来 ref 去
- 只代表**SQL 转换代码的静态依赖关系**
- 和实际执行无关
- 只覆盖 dbt 负责的模型（staging → intermediate → marts）

👉 **只关注“模型如何算出来"**  
👉 **不关注“运行在哪里、上游是谁、下游是谁”**

---

## ✔ Unity Catalog Lineage（Platform Lineage）

它捕获：

- **跨系统**：dbt、Notebook、Jobs、SQL Warehouse、BI 工具
- **跨语言**：SQL、Python、Scala
- **跨执行环境**：Jobs、Delta Live Tables、Serverless SQL
- **跨 workspace**
- **平台级元数据**

👉 捕获的是**真实执行的血缘**  
👉 不是代码推断，而是 runtime‑level lineage

例如：

```
dbt model → Delta Table → PowerBI report → SQL Dashboard → ML notebook
```

UC 全部能捕获。

---

# 🧩 二、从 5 个维度告诉你它们的区别（非常清晰）

## ① **覆盖范围不同**

|覆盖范围|dbt docs|Unity Catalog|
|---|---|---|
|dbt 模型|✔ 覆盖|✔ 覆盖|
|ODS 表|❌ 不覆盖|✔ 覆盖|
|Notebook SQL|❌|✔|
|Python transformations|❌|✔|
|SQL Warehouse queries|❌|✔|
|BI 工具 lineage（PowerBI）|❌|✔|
|ML pipelines|❌|✔|

👉 **dbt lineage 只能看到 dbt 内部的 ref()**  
👉 **Unity Catalog lineage 才是真正端到端（end-to-end）**

---

## ② **血缘粒度不同**

dbt docs：

- 表级 lineage
- 字段 lineage 仅限 dbt 模板内的 columns
- 基于解析 SQL（静态分析）

Unity Catalog：

- 表级 lineage
- 列级 lineage（真实执行）
- 关联多个系统
- 动态推断（基于 runtime logs）

---

## ③ **来源不同**

||dbt docs|Unity Catalog|
|---|---|---|
|血缘来源|代码（ref、source）|实际执行日志（runtime capture）|
|静态 / 动态|静态|动态|

---

## ④ **目的不同**

|目的|dbt docs（Transformation Lineage）|UC（Platform Lineage）|
|---|---|---|
|理解模型之间的 SQL 依赖|✔|✔|
|Debug dbt model|✔|❌|
|审计数据流转|❌|✔|
|验证跨 Job 血缘|❌|✔|
|跨 notebook、跨 SQL warehouse|❌|✔|
|PII lineage（合规）|❌|✔|
|端到端 lineage（ODS → Transform → BI）|❌|✔|

---

## ⑤ **谁在用？**

|团队|dbt docs|UC Lineage|
|---|---|---|
|Data Engineer|✔✔✔|✔✔|
|BI / Analyst|✔|✔✔|
|Governance / Compliance|❌|✔✔✔|
|Auditors|❌|✔✔✔|
|ML / Data Science|❌|✔✔|

---

# 🧪 三、看一个真实例子（你就明白区别了）

## 👉 场景：你的 fact_orders 表是这样流转的：

```
Oracle → ODS → stg_orders → int_orders → fact_orders → PowerBI
```

### **在 dbt docs 中看到：**

```
stg_orders → int_orders → fact_orders
```

只显示 dbt 项目内部的 ref 关系。

---

### **在 Unity Catalog 中看到：**

```
Oracle.orders_raw
     ↓
ODS.orders_delta
     ↓
dbt.stg_orders
     ↓
final.int_orders
     ↓
accurate.fact_orders
     ↓
SQL Warehouse
     ↓
PowerBI Dashboard
```

你能看到：

- ODS → dbt 的来源
- dbt → Databricks Delta 表
- Delta 表 → BI 可视化
- 哪个 job/notebook 生成了哪个表
- 哪个用户运行导致 lineage 更新

**这才是完整“平台级”血缘。**

---

# ⭐ 四、在哪一层做这两个 lineage 测试？

### ✔ dbt lineage（Transformation Lineage）

**在 dbt 层测试**  
对应你的 Transform → Accurate 层。

### ✔ Databricks Unity Catalog Lineage（Platform Lineage）

**在 UC 层测试，但覆盖所有数据层级：**

|层|UC 是否捕获？|
|---|---|
|ODS|✔|
|Flatten|✔|
|Transform（dbt）|✔|
|Accurate|✔|
|Business View|✔|
|Notebook|✔|
|Jobs|✔|
|SQL Warehouse|✔|
|BI（PowerBI, Tableau）|✔|

**UC 是跨层测试，dbt 只是模型层测试。**

---

# 🧧 五、最直观一句话总结

> **dbt docs lineage** = “代码层面的依赖图（ref graph），只看 dbt 内部。”
> 
> **Unity Catalog lineage** = “平台级、真实执行、跨系统的 end‑to‑end 血缘图。”

换句话说：

- dbt lineage = 你写出来的 SQL 如何流转
- UC lineage = 数据整个生命周期如何流转

---

如果你愿意，我可以继续帮你：

📌 画一个你们项目的 **dbt lineage vs UC lineage 对照图**  
📌 给你 **Lineage Testing Test Cases（10 条）**  
📌 写出你们整个数据平台的 **Lineage Testing SOP**

你需要吗？