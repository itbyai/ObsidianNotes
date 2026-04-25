# Model Contracts
## 1) What you get with model contracts

- **Schema lock**: Only declared columns exist in the table/view.
- **Type enforcement**: Data types must match your YAML.
- **(Optional) Constraints**: Primary key, not null, unique, foreign key, etc., pushed down to the warehouse when supported.
- **Early failure**: Builds fail if columns/types don’t match.

> ✅ Use **contracts** to enforce shape & types at build time; use **tests** to validate data **values** and **relationships**.

---

## 2) Minimal setup

**a) In your model’s YAML (e.g., `models/staging/customers.yml`)**

```yaml
version: 2
models:
  - name: stg_customers
    description: "Staging customers with enforced schema"
    config:
      contract:
        enforced: true    # turn the contract on
      # optional but recommended when incremental:
      # on_schema_change: fail
    columns:
      - name: customer_id
        description: "Surrogate key"
        data_type: bigint      # warehouse-native type (e.g., bigint, string, timestamp_ntz)
        tests:
          - not_null
          - unique
      - name: email
        data_type: string
        tests:
          - not_null
          - accepted_values:
              values: ['gmail.com', 'outlook.com']   # typical example is domain extraction; see notes below
      - name: created_at
        data_type: timestamp
        tests:
          - not_null
```

> **Notes**
>
> - `data_type` must be valid for your warehouse (Snowflake, BigQuery, Redshift, Databricks, etc.).
> - For `accepted_values` on something like email domains, either pre-derive `email_domain` in SQL or use a custom test that extracts the domain.

**b) In the model SQL (e.g., `models/staging/stg_customers.sql`)**

```sql
-- models/staging/stg_customers.sql
with src as (
    select
        cast(id as bigint)             as customer_id,
        lower(email)                   as email,
        cast(created_at as timestamp)  as created_at
    from {{ ref('raw_customers') }}
)
select * from src
```

The **contract** is enforced against the **YAML**. The SQL must align types/casing with the YAML declarations.

---

## 3) Adding warehouse-level constraints (optional but powerful)

In modern dbt versions, you can push down constraints natively. Add a `constraints` block at the model or column level (support varies by adapter).

```yaml
version: 2
models:
  - name: stg_customers
    description: "Staging customers with constraints"
    config:
      contract:
        enforced: true
    constraints:
      - type: primary_key
        columns: [customer_id]
    columns:
      - name: customer_id
        data_type: bigint
        constraints:
          - type: not_null
          - type: unique
      - name: email
        data_type: string
        constraints:
          - type: not_null
      - name: created_at
        data_type: timestamp
        constraints:
          - type: not_null
```
          - type: not_null

> If your adapter doesn’t support a constraint (e.g., `foreign_key`), dbt will skip or emulate depending on the adapter/version. Keep generic tests as a safety net.

---

## 4) Tests for required fields, types & relationships

- **Required fields** → enforce with **contract** + **`not_null` tests** (and constraints if supported).
- **Types** → enforced by the **contract** (`data_type`); also cast in SQL to avoid implicit coercion.
- **Uniqueness** → `unique` test and/or `unique` constraint.
- **Foreign keys** → `relationships` test and/or `foreign_key` constraint (if supported).

**Example tests block (in the same YAML):**
``` yaml
version: 2

models:
  - name: stg_customers
    columns:
      - name: customer_id
        data_type: bigint
        tests:
          - not_null
          - unique

      - name: email
        data_type: string
        tests:
          - not_null

      - name: created_at
        data_type: timestamp
        tests:
          - not_null

  - name: fct_orders
    columns:
      - name: order_id
        data_type: bigint
        tests:
          - not_null
          - unique

      - name: customer_id
        data_type: bigint
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id

```

---

## 5) Incremental models & contracts

For **incremental** models:

- Contracts are enforced at create-time; they **don’t** auto-add/drop columns mid-flight.
- Use:
  config:
    materialized: incremental
    contract:
      enforced: true
    on_schema_change: fail   # avoids silent drift
- If a new column appears in SQL but not in YAML (or vice versa), the build will fail—this is usually what you want.

---

## 6) Running and observing failures

- Build: `dbt run -s stg_customers`
- Test: `dbt test -s stg_customers`
- Contract/type mismatch example failures:
    - _Column missing in SQL but listed in YAML_ → contract error.
    - _Type mismatch (e.g., YAML says bigint, SQL produces string)_ → contract error or cast error at create time.
    - _Nulls found where `not_null` test exists_ → test failure.

---

## 7) Common gotchas & tips

- **Align names exactly**: Column names are case-insensitive in many warehouses, but keep consistent casing in YAML and SQL.
- **Adapter-specific data types**: Use native types (`NUMBER`, `STRING`, `TIMESTAMP_TZ` for Snowflake; `INT64`, `STRING`, `TIMESTAMP` for BigQuery; etc.).
- **Views vs tables**: Some warehouses can only enforce table-level constraints, not views. If you rely on physical constraints, use `materialized: table`.
- **Accepted values**: If your constraint is on a derived value (like email domain), expose that column in the contract and test it, or use a custom macro to check expressions.
- **Performance**: Some constraints (e.g., `unique`) can be heavier on very large tables; balance with tests or indexes where available.

---

## 8) Full example (copy‑paste)

**`models/staging/customers.yml`**

``` yaml
version: 2

models:
  - name: stg_customers
    description: "Customers with contract + constraints"

    config:
      materialized: table
      contract:
        enforced: true

    constraints:
      - type: primary_key
        columns: [customer_id]

    columns:
      - name: customer_id
        data_type: bigint
        description: "Primary key"
        tests:
          - not_null
          - unique
        constraints:
          - type: not_null
          - type: unique

      - name: email
        data_type: string
        description: "Normalized email"
        tests:
          - not_null

      - name: created_at
        data_type: timestamp
        description: "Creation timestamp"
        tests:
          - not_null

```
**`models/staging/stg_customers.sql`
```sql
with src as (
    select
        cast(id as bigint)            as customer_id,
        lower(email)                  as email,
        cast(created_at as timestamp) as created_at
    from {{ ref('raw_customers') }}
)
select *
from src;
```

Run:
```shell
dbt run -s stg_customers
dbt test -s stg_customers
```
---

## 9) Want stronger type checks?

Contracts already enforce warehouse types. If you want **cross‑warehouse portable checks** (e.g., assert length, regex, numeric ranges), add tests:

```yaml
columns:
  - name: email
    tests:
      - not_null
      - dbt_expectations.expect_column_values_to_match_regex:
          regex: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
```

> Requires `dbt-expectations` package configured in `packages.yml`. If you’re not using that package, you can write a small custom generic test macro.

---
## 10) Quick checklist

- [ ] Add YAML with `contract.enforced: true`
- [ ] Declare **every** column with `data_type`
- [ ] Add `constraints` for PK/UK/NN/FK if adapter supports them
- [ ] Add tests: `not_null`, `unique`, `relationships`, `accepted_values` as needed
- [ ] Align SQL output types with YAML (`cast(...)`)
- [ ] For incremental, set `on_schema_change: fail`

---
