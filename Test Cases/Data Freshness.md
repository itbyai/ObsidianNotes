Here’s a **clear, dbt-practical explanation** in English.

> [!NOTE] Important notes
> That question only makes sense for:
> - Raw / ODS tables
> - External feeds
> - CDC / ingestion pipelines
> It does **not** make sense for derived models, because
> - CDC / ingestion pipelines
> - Models don’t “receive” data
> - They are **recomputed**


---

## What is a Data Freshness Test?

A **data freshness test** answers this question:

> **“Has this data been updated recently enough?”**

It checks **how old the most recent record is** (based on a timestamp column) and compares it to an expected threshold.

Freshness tests are about **timeliness**, not correctness.

- ❌ Not about nulls, duplicates, or values
    
- ✅ About **late / stalled data pipelines**
    

---

## Where freshness fits in dbt

dbt supports **freshness checks natively for `sources`** (raw / ODS tables).

There is **no built-in freshness test for models**, but you can implement one with a custom test (shown below).

---

## 1️⃣ Source Freshness (Official dbt feature)

This is the **recommended and most common** approach.

### When to use

- Raw / ODS tables
    
- Ingestion, CDC, or landing tables
    
- External system feeds
    

---

### Step 1: Define freshness in `sources.yml`

```yaml
version: 2

sources:
  - name: raw
    database: raw_db
    schema: raw_schema

    loaded_at_field: ingestion_ts

    freshness:
      warn_after: { count: 2, period: hour }
      error_after: { count: 6, period: hour }

    tables:
      - name: raw_customers
      - name: raw_orders
```

#### Key fields explained

|Field|Meaning|
|---|---|
|`loaded_at_field`|Timestamp that indicates **when data was loaded**|
|`warn_after`|Emit a **warning** if data is older than this|
|`error_after`|**Fail** if data is older than this|

---

### Step 2: Run the freshness check

```bash
dbt source freshness
```

Example output:

```
Source raw.raw_customers is late by 3 hours (WARN)
Source raw.raw_orders is late by 7 hours (ERROR)
```

---

### What dbt actually checks (conceptually)

```sql
select max(ingestion_ts) from raw_schema.raw_customers;
```

Then dbt computes:

```
current_time - max(ingestion_ts)
```

---

## 2️⃣ Per-table freshness overrides (optional)

You can set different thresholds per table:

```yaml
tables:
  - name: raw_customers
    freshness:
      warn_after: { count: 1, period: hour }
      error_after: { count: 3, period: hour }
```

---

## 3️⃣ Choosing the right timestamp column

This is critical.

|Scenario|Good `loaded_at_field`|
|---|---|
|CDC / ingestion|`ingestion_ts`, `_loaded_at`, `dv_loaddate`|
|File loads|`file_ingested_at`|
|API sync|`synced_at`|
|Business facts|❌ NOT recommended|

👉 Always use a **load / ingestion timestamp**, not a business date.

---

## 4️⃣ Model Freshness (dbt does NOT provide this natively)

Sometimes you want to check:

> “Is my model still being updated?”

You can do this with a **custom test**.

---

### Example: Model freshness test (custom SQL)

📁 `tests/fct_orders_freshness.sql`

```sql
select *
from {{ ref('fct_orders') }}
having max(updated_at) < current_timestamp - interval '6 hour'
```

If this query returns a row → ❌ test fails.

Run it with:

```bash
dbt test -s fct_orders
```

---

## 5️⃣ Freshness vs Data Quality (important distinction)

|Test type|Checks|
|---|---|
|Freshness|Is the data **recent**?|
|not_null / unique|Is the data **correct**?|
|relationships|Is the data **consistent**?|
|Business rules|Does data **match business logic**?|

Freshness is **monitoring**, not validation.

---

## 6️⃣ Recommended real-world pattern

### Source / ODS layer

- ✅ Always define `source freshness`
    
- Warn + error thresholds
    
- Used in monitoring / alerting
    

### Staging / IM / Mart layers

- ❌ Do not use source freshness
    
- ✅ Optional custom freshness tests if required
    

---

## 7️⃣ Common mistakes to avoid

❌ Using `created_at` instead of load timestamp  
❌ Setting thresholds too strict (constant alerts)  
❌ Treating freshness as a data quality test  
❌ Expecting freshness to work on models automatically

---

## TL;DR

- **Data freshness = “Is the data late?”**
    
- dbt supports it **natively for sources**
    
- Configure with `loaded_at_field`
    
- Run with `dbt source freshness`
    
- Use **custom tests** for model freshness
    

---

If you want, I can next:

- Design a **freshness strategy by layer (ODS → STG → IM → MART)**
    
- Help you pick the **right thresholds** for your pipelines
    
- Show how to **alert on freshness failures in CI / Azure DevOps**
    

Just tell me what you want to go deeper on.