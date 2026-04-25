Duplicate detection is a **core data-quality check** in dbt. The key idea is simple:

> **A duplicate test returns rows that should be unique but aren’t. If any rows are returned → the test fails.**

Below are **all the correct ways to do duplicate detection with dbt**, from basic to advanced, and **when to use each**.

---

## 1️⃣ Column-level duplicates (single column)

### Use when

- A column should be a **primary key**
    
- IDs must be unique
    

### ✅ Built-in dbt test (recommended)

```yaml
version: 2

models:
  - name: stg_customers
    columns:
      - name: customer_id
        tests:
          - not_null
          - unique
```

### What dbt checks (conceptually)

```sql
select customer_id
from stg_customers
group by customer_id
having count(*) > 1;
```

---

## 2️⃣ Composite (multi-column) duplicates

### Use when

- Business key spans multiple columns  
    (e.g. `order_id + order_date`)
    

### ✅ Best practice: `dbt_utils`

```yaml
models:
  - name: fct_orders
    tests:
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_id
            - order_date
```

This is the **most common real-world duplicate check**.

---

## 3️⃣ Duplicate detection with conditions (filtered duplicates)

### Use when

- Uniqueness applies **only under certain conditions**
    
- e.g. only active records must be unique
    

### Example rule

> `email` must be unique **where is_active = true**

```yaml
columns:
  - name: email
    tests:
      - unique:
          where: "is_active = true"
```

---

## 4️⃣ Model-level duplicate detection (custom SQL test)

### Use when

- Logic is complex
    
- Involves calculations or derived keys
    

📁 `tests/duplicate_orders.sql`

```sql
select
  order_id,
  order_date,
  count(*) as cnt
from {{ ref('fct_orders') }}
group by order_id, order_date
having count(*) > 1
```

If this returns rows → ❌ duplicates exist.

---

## 5️⃣ Detect _exact_ row duplicates (full-row duplication)

### Use when

- You suspect ingestion or CDC duplication
    
- Entire rows are repeated
    

```sql
select *
from (
    select
        *,
        count(*) over (
            partition by customer_id, email, created_at
        ) as row_cnt
    from {{ ref('stg_customers') }}
) t
where row_cnt > 1;
```

---

## 6️⃣ Deduplication logic + validation (important pattern)

Often you **deduplicate in the model**, then **test the result**.

### Model logic (example)

```sql
select *
from (
    select
        *,
        row_number() over (
            partition by customer_id
            order by updated_at desc
        ) as rn
    from {{ ref('raw_customers') }}
)
where rn = 1;
```

### Validation test

```yaml
columns:
  - name: customer_id
    tests:
      - unique
```

This ensures **dedup logic keeps working**.

---

## 7️⃣ Duplicate detection by time window

### Use when

- Duplicates within the same day / batch are invalid
    

```sql
select
  customer_id,
  date_trunc('day', load_ts),
  count(*)
from {{ ref('stg_customers') }}
group by customer_id, date_trunc('day', load_ts)
having count(*) > 1;
```

---

## 8️⃣ Severity control (warn vs error)

Duplicate tests can start as **warnings**:

```yaml
tests:
  - dbt_utils.unique_combination_of_columns:
      combination_of_columns: [order_id, order_date]
      severity: warn
```

Useful when:

- Data isn’t clean yet
    
- You want visibility without breaking pipelines
    

---

## 9️⃣ Where to put duplicate tests (best practice)

|Layer|Duplicate tests|
|---|---|
|Source / ODS|⚠️ Rare (monitor only)|
|Staging|✅ PK & business key checks|
|Intermediate|✅ Composite uniqueness|
|Mart / Fact|✅ Strict uniqueness|

---

## 10️⃣ Common mistakes to avoid

❌ Testing uniqueness before deduplication  
❌ Using `unique` on high-cardinality non-keys  
❌ Forgetting `not_null` with `unique`  
❌ Over-testing raw sources

---

## TL;DR (copy-paste mental model)

- **Single column** → `unique`
    
- **Multi-column key** → `dbt_utils.unique_combination_of_columns`
    
- **Conditional** → `unique + where`
    
- **Complex logic** → custom SQL test
    
- **After dedup** → always re-test
    

---

If you want next, I can:

- Map **duplicate rules → business keys** for your layers
    
- Show **CDC-safe dedup patterns**
    
- Help you design a **duplicate detection + remediation workflow**
    
- Align this with **Databricks / Unity Catalog constraints**
    

Just tell me which direction you want to go.