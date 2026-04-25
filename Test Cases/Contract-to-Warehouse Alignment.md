**Contract-to-Warehouse Alignment** in dbt means:

> **Ensuring that what your dbt model _promises_ (schema, data types, constraints) is exactly what the warehouse actually stores.**

This prevents silent drift like:

- columns added/removed
    
- data types changing
    
- nullability breaking assumptions
    
- downstream tools failing unexpectedly
    

Below is the **correct, dbt-native way** to do this, plus how it works on real warehouses.

---

## 1️⃣ What is a “contract” in dbt?

A **dbt contract** is a **schema guarantee** defined in `schema.yml` that dbt enforces **at runtime**.

It answers:

- What columns must exist?
    
- What data types must they have?
    
- What constraints apply?
    

Contracts are about **structure**, not data correctness.

---

## 2️⃣ Enable contracts on a model (core step)

### Example: `schema.yml`

```yaml
version: 2

models:
  - name: stg_customers
    description: "Staging customers"

    config:
      contract:
        enforced: true

    columns:
      - name: customer_id
        data_type: bigint
        constraints:
          - type: not_null
          - type: unique

      - name: email
        data_type: string

      - name: created_at
        data_type: timestamp
```

### What this does

When dbt runs this model, it will:

- **Validate the compiled SQL output schema**
    
- Compare it to the contract
    
- **Fail the run** if they don’t match
    

This is the core of **contract-to-warehouse alignment**.

---

## 3️⃣ What dbt actually checks (important)

With `contract.enforced: true`, dbt checks:

|Aspect|Enforced|
|---|---|
|Column exists|✅|
|Column name|✅|
|Column order|✅|
|Data type|✅|
|Extra columns|❌ (not allowed)|
|Missing columns|❌|
|Nullability|⚠️ depends on warehouse|
|PK / unique|⚠️ depends on warehouse|

If the warehouse cannot create the table exactly as defined → **dbt fails the model build**.

---

## 4️⃣ How dbt enforces the contract technically

dbt does **not** compare after-the-fact.

Instead, it:

1. Compiles your model SQL
    
2. Wraps it in a **`CREATE TABLE AS SELECT`** with explicit column definitions
    
3. Asks the warehouse to create the table
    

If the warehouse rejects it → ❌ contract violation.

This is why contracts are **stronger than tests**.

---

## 5️⃣ Warehouse behavior (critical reality check)

Contract enforcement strength depends on the warehouse.

|Warehouse|Type enforcement|Constraint enforcement|
|---|---|---|
|Snowflake|✅ Strong|❌ Informational|
|BigQuery|⚠️ Loose|❌|
|Databricks (Unity Catalog)|✅ Strong|⚠️ Partial|
|Postgres|✅ Strong|✅ Strong|

👉 Even when constraints aren’t enforced physically, **schema alignment still is**.

---

## 6️⃣ Contracts vs tests (must understand)

|Feature|Contracts|Tests|
|---|---|---|
|Enforce schema|✅|❌|
|Enforce types|✅|❌|
|Enforce PK/FK|⚠️ Warehouse|❌|
|Validate data|❌|✅|
|Fail build|✅|❌ (unless tests run after)|

👉 **Contracts prevent bad tables from being created.**  
👉 **Tests detect bad data after creation.**

They are complementary.

---

## 7️⃣ Detecting schema drift with contracts

### Example: accidental column added

```sql
select
  customer_id,
  email,
  created_at,
  current_timestamp as debug_ts
from raw_customers
```

But `debug_ts` is **not in the contract**.

➡ dbt will fail with:

```
Contract error: unexpected column debug_ts
```

This is exactly what you want.

---

## 8️⃣ Aligning contracts with the warehouse (best practice)

### Where to use contracts

|Layer|Use contracts?|Why|
|---|---|---|
|Source|❌|dbt doesn’t own schema|
|Staging|✅|stable interface|
|Intermediate|⚠️|optional|
|Mart / Fact|✅|downstream consumers|

---

## 9️⃣ Contract + warehouse constraints (advanced)

If your warehouse supports it, you can also **declare physical constraints**:

```yaml
models:
  - name: fct_orders
    constraints:
      - type: primary_key
        columns: [order_id]
      - type: foreign_key
        columns: [customer_id]
        to:
          model: ref('dim_customers')
          columns: [customer_id]
```

dbt will pass these to the warehouse, but:

- Enforcement depends on the engine
    
- Contracts still provide the main protection
    

---

## 🔟 CI / pipeline usage (real-world)

Most teams run:

```bash
dbt build
```

Contracts ensure:

- Schema mismatches fail early
    
- No broken tables reach prod
    
- Refactors are safe
    

This is **contract-to-warehouse alignment in practice**.

---

## TL;DR

- **Contract-to-Warehouse Alignment** = dbt contracts
    
- Defined in `schema.yml`
    
- Enabled with `contract.enforced: true`
    
- Enforces schema + types at build time
    
- Strength depends on warehouse
    
- Complements (does not replace) tests
    

---

If you want, I can next:

- Review one of your real models and suggest a **safe contract**
    
- Show **how contracts behave on Databricks Unity Catalog**
    
- Help you roll contracts out **gradually without breaking prod**
    
- Compare **contracts vs external schema governance**
    

Just tell me where you want to go next.