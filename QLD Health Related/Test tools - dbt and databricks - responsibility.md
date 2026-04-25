


# Tests Appropriate for dbt

### Model / [[Column‑Level Validation]] (NOT NULL / UNIQUE / ACCEPTED VALUES)

- **Level:** Recommended
- **Purpose:** Validate deterministic column constraints and fail invalid data early during model build.

### [[Referential Constraints]] (FK/PK Consistency)

- **Level:** Recommended
- **Purpose:** Ensure fact-to-dimension relationships are correct within the dbt DAG.

### [[Business Rule Unit Tests]] (Per Column / Per Model)

- **Level:** Recommended
- **Purpose:** Enforce domain logic through reusable custom tests defined alongside transformation code.
[[Business Rule Unit Tests]]

### [[Model Contracts]] (Schema / Data Types / Required Fields)

- **Level:** Recommended
- **Purpose:** Enforce strict model schemas, prevent column drift, and guarantee alignment between SQL outputs and YAML definitions.
### [[Data Freshness]] (Source Freshness)

- **Level:** Recommended
- **Purpose:** Block downstream transformations when upstream source data is stale.
###[[ Duplicate Detection]] (Deterministic Composite Keys)

- **Level:** Optional
- **Purpose:** Identify duplicates in cases where key definitions are fixed and data volumes are manageable.

### [[Anomaly-Distribution Checks with dbt]] (Small Scale)

- **Level:** Optional
- **Purpose:** Allow simple statistical checks on small tables using dbt‑expectations or custom macros.

### [[Contract-to-Warehouse Alignment]](Types / Casing)

- **Level:** Recommended
- **Purpose:** Ensure output types and fields strictly follow contract definitions through controlled casts in SQL.

### [[Documentation and Lineage Validation]] (Transformation-Level)

- **Level:** Optional
- **Purpose:** Ensure models are documented and relationships are reflected accurately in dbt docs.

### Performance / Resource / Cost Testing

- **Level:** Not Recommended
- **Purpose:** Not suitable; dbt does not manage cluster execution or resource behavior.

### Streaming / CDC Correctness

- **Level:** Not Recommended
- **Purpose:** Not supported; streaming semantics cannot be validated in dbt.

### Schema Evolution & Rollback Drills

- **Level:** Not Recommended
- **Purpose:** dbt contracts prevent drift but cannot simulate real schema migrations or rollback scenarios.

### GDPR / PII Compliance

- **Level:** Not Recommended
- **Purpose:** dbt does not enforce masking, ACLs, or privacy policies.

### SLA / SLO Monitoring

- **Level:** Optional (limited)
- **Purpose:** dbt exposures can declare expectations, but cannot operationally monitor runtime SLAs.

---

# Tests Appropriate for Databricks

### [[Anomaly - Distribution Checks with databricks]] (Statistics, Trend Analysis)

- **Level:** Recommended
- **Purpose:** Perform large-scale statistical checks, anomaly detection, and time-window analysis.

### [[Cross-Model - Cross-Domain Reconciliation with databricks]]

- **Level:** Recommended
- **Purpose:** Validate totals, aggregations, and integrity across domains or large table joins.

### Performance / Resource / Cost Testing

- **Level:** Recommended
- **Purpose:** Evaluate SQL warehouse performance, scalability, caching, and compute cost behaviour.

### [[Pipeline Orchestration]] / Dependency / End-to-End Workflow Testing

- **Level:** Recommended
- **Purpose:** Validate DAG execution timing, retries, failover behaviour, and workflow-level SLAs.

### Streaming / CDC Correctness (Watermark, Idempotency)

- **Level:** Recommended
- **Purpose:** Validate checkpoint correctness, late-arriving data handling, and Delta MERGE behaviour.

### [[Schema Evolution & Rollback Drills]]

- **Level:** Recommended
- **Purpose:** Validate Delta table schema evolution, compatibility, and rollback scenarios.

### Security & Governance (ACL, RLS, CLS, Masking)

- **Level:** Recommended
- **Purpose:** Confirm Unity Catalog access rules, row/column filters, and masking policies.

### Audit & Access / Change Logs

- **Level:** Recommended
- **Purpose:** Validate that lineage, access events, and changes are captured in audit logs.

### [[Large-scale Data Quality]] (Great Expectations / Databricks Expectations)

- **Level:** Recommended
- **Purpose:** Execute scalable data quality suites with operational metrics and expectations.

### Backfill / Reprocessing Idempotency

- **Level:** Recommended
- **Purpose:** Validate correctness of repeated reprocessing, MERGE policies, and downstream impacts.

### UAT (User Acceptance Testing)

- **Level:** Recommended
- **Purpose:** Enable SMEs to validate data using notebooks or BI dashboards.

### Data Drift Detection (Schema Drift / Column Drift)

- **Level:** Recommended
- **Purpose:** Use Auto Loader and Delta features to detect schema drift at ingestion time.

### Duplicate Detection (Large-Scale / Fuzzy)

- **Level:** Optional
- **Purpose:** Perform fuzzy matching or large-scale duplicate checks that require distributed compute.

### SCD Correctness (SCD2 Validity)

- **Level:** Recommended
- **Purpose:** Use Delta Change Data Feed and history to validate effective-dating logic.

### GDPR / PII Compliance (Masking, Right-to-Erasure)

- **Level:** Recommended
- **Purpose:** Validate policy enforcement, data retention, and soft/hard deletion requirements.

### SLA / SLO Monitoring (Latency / Quality SLAs)

- **Level:** Recommended
- **Purpose:** Use Databricks Workflows and Observability to monitor operational SLAs.

### [[Documentation and Lineage Validation]] (Platform-Level)

- **Level:** Optional
- **Purpose:** Ensure lineage captured in Unity Catalog reflects true data flows.

---
### [[RLS Test]]

