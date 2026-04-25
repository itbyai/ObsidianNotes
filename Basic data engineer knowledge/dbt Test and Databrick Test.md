Of course — here is a **complete and accurate English translation** of your content.\ I’ve kept the structure, emphasis, tables, and formatting exactly the same as your original Chinese version, but written in clear professional English.

---

# ✅ **Translation: Which Tests Belong in dbt vs Databricks (Detailed Breakdown)**

Below is a clear breakdown of **which tests should be done in dbt** and **which should be done in Databricks**, organized by test type, along with **execution notes, trigger timings, examples, and boundary conditions**.\ This helps ensure clarity on test responsibilities, reducing duplication or gaps during your project.

---

## 📌 One‑Map Overview (Recommended Ownership)

| Test Type                                                                  | Execute in dbt                              | Execute in Databricks                                   |
| -------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| **Model / Column‑level validation (NOT NULL / UNIQUE / ACCEPTED VALUES)**  | ✅ Strongly recommended (dbt built‑in tests) | ⭕ Can supplement (e.g., SQL audit scripts)              |
| **Referential constraints (FK/PK consistency)**                            | ✅ dbt relationships/reference tests         | ⭕ Large‑scale verification or sampling via SQL/Notebook |
| **Business rule unit tests (per column / per model)**                      | ✅ dbt generic/custom tests                  | ⭕ Only for sampling or investigation                    |
| **Model Contracts (schema / type / required fields)**                      | ✅ dbt Contracts (prevents breaking changes) | ❌                                                       |
| **Data Freshness (source freshness)**                                      | ✅ dbt source freshness                      | ⭕ Platform‑level monitoring/alerts in Databricks Jobs   |
| **Data sparsity / anomaly distribution (statistical DQ)**                  | ⭕ Basic stats via dbt + macros              | ✅ More flexible using Databricks SQL/Notebook/Jobs      |
| **Cross‑model / cross‑domain consistency (reconciliation / totals match)** | ⭕ Small‑scale in dbt                        | ✅ Large‑scale, cross‑layer E2E reconciliation           |
| **Performance / build duration / resource consumption**                    | ⭕ High‑level via run artifacts              | ✅ Performance testing, concurrency, cost benchmarking   |
| **Pipeline orchestration / dependencies / E2E workflow**                   | ⭕ CI‑only                                   | ✅ End‑to‑end via Databricks Jobs/Workflows              |
| **Streaming / CDC correctness (checkpoint / late arrival / idempotency)**  | ❌                                           | ✅ Structured Streaming / Auto Loader testing            |
| **Schema evolution & rollback**                                            | ⭕ Contracts prevent mistakes                | ✅ Real schema evolution + rollback rehearsal            |
| **Security & governance (ACL, RLS/CLS, masking)**                          | ⭕ Document/declare constraints              | ✅ Validate Unity Catalog permissions, masking, auditing |
| **Audit & access/change logs**                                             | ⭕ dbt artifacts as reference                | ✅ Unity Catalog / audit tables                          |
| **Large‑scale DQ (Expectations / Great Expectations)**                     | ⭕ Small thresholds                          | ✅ Best executed via Databricks Expectations / GE        |
| **Backfill / reprocessing idempotency**                                    | ⭕ Logical validation                        | ✅ Real execution with table state testing               |
| **UAT (User Acceptance Testing)**                                          | ⭕ Provide samples/evidence                  | ✅ Business SMEs validate in Databricks or Power BI      |


---

## ✅ Tests Best Performed in **dbt** (Detailed)

> Purpose: ensure **correctness, repeatability, and auditability** of business rules and model logic at the code layer. These tests follow CI/CD and version‑control discipline.

### 1. Column/Table‑level Schema Tests

- `not_null`, `unique`, `accepted_values`, `relationships`
- Examples: PK uniqueness, FK integrity, valid status codes (A/I/D). [[#^dbt-example]]
- **Value:** catches breaking changes or dirty data early.
  
### 2. Custom Business Rule Tests

- Examples: [[#^dbt-example]]
    - order_total = sum of item + tax − discount
    - refund amount cannot be positive
    - age range must be valid
    - currency conversion precision
- Use `macros` + `tests` for complex/column‑level constraints.

### 3. Model Contracts

- Fix output columns, data types, nullability [[#^dbt-example]]
- Prevent unreviewed schema changes from entering main branch
- Protect downstream consumers (Power BI, data apps)

### 4. Source Freshness

- Define data latency thresholds (warn/error)
- Executed in CI or scheduled runs
- Alerts to engineering teams

### 5. Snapshot / SCD Consistency

- Validate slowly changing dimension logic (effective dates, flags)
- Compare snapshot row counts or key‑column differences

### 6. Seed Data & Reference Definitions

- Dictionary/code tables (country codes, category types)
- Validate downstream models use only allowed values

### 7. Data Standardization Rules

- timezone normalization
- currency normalization
- casing rules
- null/blank/zero normalization

### 8. Build Integrity & Dependency Tests (CI layer)

- `dbt build` (run+test) in PR pipelines
- Block merge if tests fail
- Selective incremental validation via selectors/paths

**Trigger timing:** local development, PR/CI, before/after production builds\ **Failure handling:** block release; fix + rerun; store artifacts for traceability

---

## ✅ Tests Best Performed in **Databricks** (Detailed)

> Purpose: ensure **end‑to‑end flow, platform behavior, performance, governance, and runtime correctness** in a real production‑like environment.

### 1. End‑to‑End System Testing (E2E)

- Validates full flow:\ **Layer 1 → Layer 2 (dbt) → Layer 3 → Layer 4**
- Includes scheduling, dependencies, retries, and alert workflows

### 2. Performance, Scalability & Cost

- Different cluster sizes / Photon / concurrency
- JOIN performance, shuffle behavior, partitioning, skew mitigation
- Cost benchmarking against SLA/SLO

### 3. Streaming / CDC Scenarios

- Structured Streaming / Auto Loader:
    - exactly‑once
    - checkpoint recovery
    - late/early arrival
    - out‑of‑order handling
    - duplicate suppression
    - schema evolution + inference
- Incremental idempotency: rerun, rollback, backfill

### 4. Schema Evolution & Rollback

- Add/remove columns; type changes
- Validate downstream impacts with dbt Contracts
- Grey release / Blue‑Green / Canary strategies

### 5. Cross‑System Reconciliation

- Compare aggregated totals with source or golden systems
- Large‑scale diffing with thresholds and exception records

### 6. Security, Governance & Audit

- Unity Catalog permissions
- Row/column‑level security
- Data masking
- Audit logs (who accessed what, when)
- PII access traceability
- Cluster/job isolation

### 7. Platform‑Level Data Quality

- Delta Live Tables Expectations
- Great Expectations tests
- Thresholds based on partitions or volume
- Pipeline fail / quarantine strategies
- Profiling & anomaly detection

### 8. Job Orchestration & Reliability

- Databricks Jobs/Workflows: DAG, concurrency, retries
- Failure simulation, DR testing, checkpoint replay
- Transaction boundaries validation

### 9. UAT & Visualization

- Business SME validation in Databricks SQL or Power BI
- KPI logic, drill‑down paths, filter accuracy
- Time‑based checks aligned to business cycles (daily/monthly close)

**Trigger timing:** SIT, pre‑prod, performance test, before/after UAT, go‑live rehearsal\ **Failure handling:** log events, diff snapshots, apply runbook rollback/backfill

---

## ✅ Delivery Recommendations

### 1. RACI

- dbt tests: Data modeling/warehouse team (R); Code review + CI team (A)
- Databricks system tests: Data engineering/platform team (R); Architecture/governance (A)
- UAT: Business SME (R); Product/business owner (A)

### 2. Naming & Layering

- dbt tests stored by subject area (`tests/generic/tests/<domain>`)
- Databricks tests grouped by layer (`l1_ingest_tests`, `l2_e2e`, `perf`, `security`)

### 3. Evidence & Traceability

- dbt: keep `run_results.json`, `manifest.json`, test tables
- Databricks: persist results in Delta tables (e.g., `qa.test_results`) and visualize via SQL dashboards

### 4. Thresholds & Blocking Strategy

- dbt → failures block deployment
- Databricks → severity rules (error/warn/quarantine), SLA metrics feed alerts

---

## ✅ Example Snippets
```yaml
models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - not_null
          - unique
      - name: order_status
        tests:
          - accepted_values:
              values: ['NEW','SHIPPED','CANCELLED']
      - name: customer_id
        tests:
          - relationships:
	          to: ref('dim_customers')
	          field: customer_id
    tests:
      - dbt_utils.expression_is_true:
          expression: "amount_total = amount_item + amount_tax - amount_discount"
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
^dbt-example

### Databricks SQL (Cross‑layer reconciliation)

```sql
-- L2 vs source reconciliation (tolerance: 0.1%)
WITH src AS (
  SELECT order_date, SUM(amount_total) AS amt FROM src.orders GROUP BY order_date
),
l2 AS (
  SELECT order_date, SUM(amount_total) AS amt FROM mart.fct_orders GROUP BY order_date
)
SELECT
  s.order_date,
  s.amt AS src_amt,
  l.amt AS l2_amt,
  (l.amt - s.amt) AS diff,
  (CASE WHEN s.amt = 0 THEN NULL ELSE ABS(l.amt - s.amt)/s.amt END) AS diff_rate
FROM src s
FULL JOIN l2 l USING(order_date)
WHERE ABS(l.amt - s.amt) > 0.001 * COALESCE(s.amt, l.amt);
```


---

## 🎯 Final Conclusions (How to Draw the Line)

- **Put all model‑level correctness and rule validation in dbt.**\ These belong with the code, versioning, and CI pipeline.
- **Put all runtime, scale, platform, governance, CDC, and E2E validations in Databricks.**\ These require real data volume, orchestration, and security.
- **UAT must always be done by business SMEs** using Databricks SQL or Power BI, with dbt providing evidence and traceability.

---

If you want, I can produce:

- ✅ a one‑page comparison chart
- ✅ a dbt test template pack
- ✅ a full Databricks QA SQL/Notebook suite
- ✅ a production‑ready Test Strategy document

Just tell me which format you prefer!

[^1]: sht 
