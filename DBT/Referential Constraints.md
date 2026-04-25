# Referential Constraints
Great topic — **Referential Constraints (PK / FK consistency)** is one of dbt’s strongest features when done properly.  
I’ll show you **the correct, production-grade ways to do this in dbt**, from **basic tests → contracts → physical constraints**, and explain **when to use which**.

---

## 1️⃣ The dbt-native way (most common): **`relationships` test**

This is how dbt enforces **foreign key → primary key consistency** logically.

## ✅ FK → PK validation (row-level)

### Example

- **Parent (PK)**: `stg_customers.customer_id`
    
- **Child (FK)**: `fct_orders.customer_id`
    

```yaml
version: 2

models:
  - name: fct_orders
    columns:
      - name: customer_id
        description: "FK to customers"
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id
```

### What dbt checks

Conceptually:

```sql
select *
from fct_orders o
left join stg_customers c
  on o.customer_id = c.customer_id
where c.customer_id is null;
```

➡ If **any rows returned → test fails**

---

## 2️⃣ Enforcing the **Primary Key** side (uniqueness)

dbt does **not assume PKs** — you must declare them.

## ✅ PK validation

```yaml
models:
  - name: stg_customers
    columns:
      - name: customer_id
        description: "Primary key"
        tests:
          - not_null
          - unique
```

This guarantees:

- No NULL PKs
    
- No duplicate PKs
    

Together with `relationships`, you now have **logical FK/PK enforcement**.

---

## 3️⃣ Composite keys (very common in facts)

### Example

- PK = `(order_id, order_date)`
    
- FK = `(order_id, order_date)`
    

## ✅ Parent (composite PK)

```yaml
models:
  - name: dim_orders
    tests:
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_id
            - order_date
```

## ✅ Child (composite FK)

dbt does **not natively support multi-column relationships**, so use `dbt_utils`:

```yaml
models:
  - name: fct_payments
    tests:
      - dbt_utils.relationships_where:
          from: ref('fct_payments')
          to: ref('dim_orders')
          field: order_id
          to_field: order_id
          where: "order_date = dim_orders.order_date"
```

(For complex cases, many teams write a **custom test** — I can show that if you want.)

---

## 4️⃣ dbt Contracts (schema enforcement, not data validation)

Starting dbt v1.5+, you can define **contracts**.

⚠️ Important:

> **Contracts validate schema, NOT FK relationships**

But they _pair very well_ with FK tests.

### ✅ Contract example (PK column)

```yaml
models:
  - name: stg_customers
    config:
      contract:
        enforced: true
    columns:
      - name: customer_id
        data_type: bigint
        constraints:
          - type: not_null
          - type: unique
```

This ensures:

- Column exists
    
- Correct type
    
- Not-null / unique at model boundary
    

---

## 5️⃣ Physical constraints (warehouse-level, optional)

Some warehouses (Snowflake, Postgres, Databricks UC) support **real FK / PK constraints**.

dbt can **declare them**, but enforcement depends on the engine.

## ✅ Example (dbt constraint syntax)

```yaml
models:
  - name: fct_orders
    constraints:
      - type: foreign_key
        columns: [customer_id]
        to:
          model: ref('stg_customers')
          columns: [customer_id]
```

### Reality check

|Warehouse|FK enforced?|
|---|---|
|Snowflake|❌ (informational)|
|BigQuery|❌|
|Databricks UC|⚠️ partially|
|Postgres|✅|

👉 Most teams **still rely on dbt tests** for real enforcement.

---

## 6️⃣ How to run FK / PK checks

```bash
dbt test
```

Or scoped:

```bash
dbt test -s fct_orders
```

---

## 7️⃣ Recommended real-world pattern (what good teams do)

### Staging layer

- PK: `not_null`, `unique`
    
- No FK tests (data still dirty)
    

### Intermediate layer

- FK → dimension validation
    
- Composite key checks
    

### Fact / Mart layer

- Full FK/PK coverage
    
- Business key enforcement
    

---

## 8️⃣ Common mistakes (avoid these)

❌ Assuming PKs exist without tests  
❌ Testing FK before cleaning staging data  
❌ Relying on warehouse FK enforcement  
❌ Forgetting `not_null` on FK  
❌ Overusing contracts for data validation

---

## 9️⃣ Minimal FK/PK template (copy-paste)

```yaml
models:
  - name: parent
    columns:
      - name: id
        tests:
          - not_null
          - unique

  - name: child
    columns:
      - name: parent_id
        tests:
          - not_null
          - relationships:
              to: ref('parent')
              field: id
```

---

## TL;DR

- **PK consistency** → `not_null` + `unique`
    
- **FK consistency** → `relationships` test
    
- **Composite keys** → `dbt_utils`
    
- **Contracts** → schema guarantee, not data
    
- **Physical FK** → optional, warehouse-dependent
    

---

If you want next, I can:

- 🔧 Write a **custom FK test** for composite keys
    
- 📊 Map this to **Databricks Unity Catalog**
    
- 🧪 Design a **full FK/PK test strategy per layer**
    
- 🔍 Show how to **debug FK test failures**
    

Just tell me where you want to go.