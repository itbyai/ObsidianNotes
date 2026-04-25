# Column-Level Validation

Great question — this is **core dbt testing**, and you can do it **cleanly, declaratively, and auditable**.  
I’ll show you **exactly how to implement**:

> **Model / Column-Level Validation**

- NOT NULL
    
- UNIQUE
    
- ACCEPTED VALUES
    

using **dbt-native tests** (no custom SQL needed).

---

## 1️⃣ Where these tests live in dbt

All of these go into your **`schema.yml`** (or `models.yml`) next to the model.

Example structure:

```
models/
└── staging/
    ├── stg_customers.sql
    └── stg_customers.yml
```

---

## 2️⃣ Column-level tests (NOT NULL / UNIQUE / ACCEPTED VALUES)

### ✅ Example: `stg_customers.yml`

```yaml
version: 2

models:
  - name: stg_customers
    description: "Staging customers"

    columns:
      - name: customer_id
        description: "Primary key"
        tests:
          - not_null
          - unique

      - name: email
        description: "Customer email"
        tests:
          - not_null

      - name: status
        description: "Customer lifecycle status"
        tests:
          - accepted_values:
              values: ['active', 'inactive', 'suspended']
```

### What dbt does internally

|Test|Generated logic (conceptually)|
|---|---|
|not_null|`where column is null`|
|unique|`group by column having count(*) > 1`|
|accepted_values|`where column not in (...)`|

If **any rows are returned → test fails**.

---

## 3️⃣ Model-level tests (table-wide rules)

Some tests logically belong to the **model**, not a single column.

### Example: row count must be > 0

```yaml
models:
  - name: stg_customers
    tests:
      - dbt_utils.not_empty
```

> Requires `dbt_utils` package.

---

## 4️⃣ Composite uniqueness (multi-column UNIQUE)

For **business keys**, do this at **model level**:

```yaml
models:
  - name: fct_orders
    tests:
      - unique:
          column_name: "(order_id || '-' || order_date)"
```

Or (better, readable, dbt-utils):

```yaml
models:
  - name: fct_orders
    tests:
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_id
            - order_date
```

---

## 5️⃣ Relationships test (foreign key validation)

This is **model-level validation**, but column-scoped.

```yaml
models:
  - name: fct_orders
    columns:
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id
```

This checks:

- No orphan `customer_id`
    
- Referential integrity
    

---

## 6️⃣ How to run these tests

### Run all tests

```bash
dbt test
```

### Only this model

```bash
dbt test -s stg_customers
```

### Only staging layer

```bash
dbt test -s staging
```

---

## 7️⃣ Test failure output (what you’ll see)

When a test fails, dbt shows:

- Test name
    
- Failing rows count
    
- Query location:
    
    ```
    target/compiled/.../not_null_stg_customers_customer_id.sql
    ```
    

You can **open that SQL** and see exactly what failed.

---

## 8️⃣ Best practices (real-world dbt teams)

### ✅ Staging models

- not_null
    
- accepted_values
    
- basic uniqueness (if guaranteed upstream)
    

### ✅ Intermediate models

- relationships
    
- composite uniqueness
    

### ✅ Fact / Mart models

- business-key uniqueness
    
- not_null on all keys
    
- referential integrity
    

---

## 9️⃣ Common mistakes (avoid these)

❌ Putting tests in `.sql`  
❌ Using custom SQL for simple checks  
❌ Over-testing raw data  
❌ Forgetting `version: 2`  
❌ Using `accepted_values` for high-cardinality fields

---

## 10️⃣ TL;DR template you can reuse

```yaml
columns:
  - name: id
    tests:
      - not_null
      - unique

  - name: status
    tests:
      - accepted_values:
          values: ['A', 'I']

  - name: fk_id
    tests:
      - relationships:
          to: ref('dim_table')
          field: id
```

---
