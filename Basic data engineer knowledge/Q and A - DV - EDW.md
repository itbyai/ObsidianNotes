

---

## 1️⃣ What is **DV (Data Vault)**?

**DV = Data Vault**, a **data-warehouse modelling methodology**, not a tool.
### In simple terms

> DV is a way to **store integrated data** that separates:

- **business keys**
- **relationships**
- **descriptive attributes + history**

It is designed to:
- integrate many sources
- keep _full history_
- survive frequent source changes

### Core DV objects

|DV Object|What it stores|
|---|---|
|**Hub**|Business keys (Patient ID, Encounter ID)|
|**Link**|Relationships (Patient–Encounter)|
|**Satellite**|Attributes + history|
|**Audit fields**|Load time, source, record source|
|**Hashes**|Change detection|

👉 DV is **about structure and traceability**, not analytics.

---

## 2️⃣ Is DV good with **Databricks**?

### Short answer
**Yes, technically — but often not the best choice.**
### Why DV _can_ work on Databricks
Databricks + Delta Lake supports:
- Large tables
- Slowly changing data
- Schema evolution
- ACID transactions
So DV **runs fine** on Databricks.

### Why many teams _avoid_ DV on Databricks

|Reason|Explanation|
|---|---|
|Over-normalised|DV creates **many small tables**|
|Join-heavy|Analytics engines prefer **fewer, wider tables**|
|Slow consumption|BI tools hate 6–10 joins per query|
|High modelling cost|DV requires strong discipline|
|Databricks favours|**Curated, denormalised layers**|

### Modern trend

> Databricks teams often replace DV with:
- Curated EDW models
- Dimensional or “DV-lite” patterns
- dbt-managed transformations

So DV is **compatible**, but **often unnecessary**.

---

## 3️⃣ What is the **function of DV**?

DV’s role is **NOT reporting**.
### DV is for:

- Integrating multiple source systems
- Preserving _all_ historical changes
- Auditing data lineage
- Decoupling source changes from reporting

### DV is **NOT**:

- Easy to query
- Business-friendly
- Performance-optimised

That’s why DV is usually **hidden** behind marts.

---

## 4️⃣ What are **Subject-oriented marts (ESM, CCT, ABC, etc.)**?

### Definition

> A **subject-oriented mart** is a dataset organised around **one business domain**.
### Examples

|Mart|Business subject|
|---|---|
|**ESM**|Emergency Services|
|**CCT**|Clinical Costing|
|**ABC**|Activity-Based Costing|

Each mart:

- Focuses on **one audience**
- Has **clear business rules**
- Is optimised for reporting
### Why “subject-oriented”?

Because instead of:
- “one table per source”
You get:
- “one model per business topic”

---

## 5️⃣ What is **InfoMart**?

### InfoMart = Information Mart layer

It is:

- The **presentation / consumption layer**
- Closest to users, BI tools, analysts
- Often heavily governed (security, CE, encryption)

### Function of InfoMart

|Function|Why|
|---|---|
|Business-friendly schemas|Analysts don’t understand DV|
|Aggregations|Faster dashboards|
|Calculated metrics|Consistent KPIs|
|Security (CE, encryption)|Data protection|
|Stable interfaces|Don’t break reports|

In many orgs:

> **InfoMart = “what Power BI / Tableau sees”**

---

## 6️⃣ Why is it called **InfoMart**?

Because:

- **“Mart”** → data mart (subset of DW)
- **“Info”** → information, not raw data

It signals:

> “This is **ready-to-use information**, not raw data.”

Other orgs call the same thing:

- Presentation Layer
- Semantic Layer
- Reporting Layer
- Business Data Mart

---

## 7️⃣ Why does **removing DV mean less structural testing**?

This is a **very important QA point**.
### With DV (old model)
You must test:
- Hub key uniqueness
- Link relationship correctness
- Satellite history rules
- Hash calculations
- Load ordering (hub → link → sat)
- Late-arriving data handling

That’s a LOT of **structure-focused tests**.

### Without DV (new model)

You mostly test:

- Table schemas
- Business keys
- Measures & calculations
- Row counts and reconciliation
- Business rule correctness
### Comparison

|With DV|Without DV|
|---|---|
|Test structure correctness|Test data correctness|
|Many small tables|Fewer, wider tables|
|Hash logic|Simple keys|
|Load sequencing|Straight pipelines|
|High regression scope|Lower regression scope|

👉 **Structural testing drops**,  
👉 **Business-rule testing increases**

---

## 8️⃣ One clean mental model

```
DV = Integration correctness & history
EDW = Business logic & consistency
InfoMart = Consumption & reporting
```

In your **new Databricks design**:
- DV responsibility → **EDW**
- InfoMart becomes thinner
- QA focus shifts from structure → outcomes

---

## 9️⃣ One-paragraph executive answer

> DV (Data Vault) is an integration modelling approach designed for auditability and historical tracking, but in Databricks environments it is often replaced by curated EDW models because DV introduces heavy structural complexity, join overhead, and higher testing cost. Subject-oriented marts (like ESM, CCT, ABC) are business-focused datasets designed for specific analytical domains, and InfoMart is the final presentation layer that exposes clean, secure, business-ready data to users. Removing DV reduces structural testing because there are fewer interdependent tables, no hash-based change logic, and simpler data flows, allowing QA to focus more on business rules and data quality rather than modelling mechanics.


