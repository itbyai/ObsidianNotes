Below are **widely accepted Databricks best practices**, with **official documentation links** and **clear explanations**. These are the same practices used in **enterprise Azure Databricks / Lakehouse projects** (EDW, analytics, ML).

I’ve grouped them so you can **learn + apply systematically**.

---

## 1️⃣ Workspace & Project Structure Best Practices

### ✅ Use a clear workspace layout

**Best practice**

- Separate **Dev / Test / Prod** workspaces
    
- Organise notebooks by **domain**, not by person
    

**Example**

```
/Repos
  /finance
    /ingestion
    /transform
    /tests
  /clinical
  /shared
```

📘 Official doc  
👉 Workspace & Repos  
[https://docs.databricks.com/en/repos/index.html](https://docs.databricks.com/en/repos/index.html)

---

### ✅ Use Databricks Repos (Git-based)

**Why**

- Version control
    
- Code reviews
    
- CI/CD integration
    

**Best practice**

- One Git repo per data domain or platform
    
- No ad-hoc notebooks in workspace root
    

📘 Docs  
👉 Databricks Repos best practices  
[https://docs.databricks.com/en/repos/repos-best-practices.html](https://docs.databricks.com/en/repos/repos-best-practices.html)

---

## 2️⃣ Notebook & Code Best Practices

### ✅ One notebook = one responsibility

Avoid “god notebooks”.

**Good**

- `01_ingest_raw`
    
- `02_transform_dim_patient`
    
- `03_load_fact_encounter`
    

📘 Docs  
👉 Notebook best practices  
[https://docs.databricks.com/en/notebooks/notebooks-best-practices.html](https://docs.databricks.com/en/notebooks/notebooks-best-practices.html)

---

### ✅ Parameterise notebooks

Use **widgets** instead of hard-coded values.

```python
dbutils.widgets.text("run_date", "")
run_date = dbutils.widgets.get("run_date")
```

📘 Docs  
👉 Widgets  
[https://docs.databricks.com/en/notebooks/widgets.html](https://docs.databricks.com/en/notebooks/widgets.html)

---

## 3️⃣ Data Engineering & Lakehouse Best Practices

### ✅ Always use Delta Lake (not plain Parquet)

**Why**

- ACID transactions
    
- Time travel
    
- Schema enforcement
    

📘 Docs  
👉 Delta Lake best practices  
[https://docs.databricks.com/en/delta/best-practices.html](https://docs.databricks.com/en/delta/best-practices.html)

---

### ✅ Use Medallion Architecture

**Standard pattern**

```
Bronze (raw / ODS)
→ Silver (cleaned, validated)
→ Gold (facts, dimensions, BI)
```

📘 Docs  
👉 Medallion Architecture  
[https://docs.databricks.com/en/lakehouse/medallion.html](https://docs.databricks.com/en/lakehouse/medallion.html)

---

### ✅ Never overwrite blindly in production

Use:

- `MERGE INTO`
    
- Incremental loads
    
- Watermarking
    

📘 Docs  
👉 Incremental processing  
[https://docs.databricks.com/en/ingestion/incremental-data.html](https://docs.databricks.com/en/ingestion/incremental-data.html)

---

## 4️⃣ Performance Best Practices

### ✅ Partition wisely

**Rules**

- Partition by **date**, **region**, or **natural filters**
    
- Avoid high-cardinality columns (e.g. ID)
    

📘 Docs  
👉 Partitioning  
[https://docs.databricks.com/en/tables/partitions.html](https://docs.databricks.com/en/tables/partitions.html)

---

### ✅ OPTIMIZE & Z-ORDER

```sql
OPTIMIZE fact_encounter
ZORDER BY (patient_id, encounter_date)
```

📘 Docs  
👉 OPTIMIZE & Z-ORDER  
[https://docs.databricks.com/en/delta/optimizations/file-mgmt.html](https://docs.databricks.com/en/delta/optimizations/file-mgmt.html)

---

### ✅ Cache only when needed

```python
df.cache()
```

Avoid caching large datasets blindly.

📘 Docs  
👉 Caching  
[https://docs.databricks.com/en/optimizations/caching.html](https://docs.databricks.com/en/optimizations/caching.html)

---

## 5️⃣ Testing & Data Quality Best Practices

### ✅ Test at every layer

**Recommended tests**

- Schema validation
    
- Nullability
    
- Uniqueness
    
- Row-count reconciliation
    
- Business rule checks
    

📘 Docs  
👉 Data quality patterns  
[https://docs.databricks.com/en/lakehouse/data-quality.html](https://docs.databricks.com/en/lakehouse/data-quality.html)

---

### ✅ Use dbt or SQL-based tests

Databricks works **very well with dbt**.

📘 Docs  
👉 dbt on Databricks  
[https://docs.databricks.com/en/dbt/index.html](https://docs.databricks.com/en/dbt/index.html)

---

## 6️⃣ Security & Governance Best Practices

### ✅ Use Unity Catalog

**Why**

- Centralised governance
    
- Fine-grained access control
    
- Lineage
    

📘 Docs  
👉 Unity Catalog best practices  
[https://docs.databricks.com/en/data-governance/unity-catalog/best-practices.html](https://docs.databricks.com/en/data-governance/unity-catalog/best-practices.html)

---

### ✅ Never hard-code secrets

Use **Databricks Secrets**.

📘 Docs  
👉 Secrets management  
[https://docs.databricks.com/en/security/secrets/index.html](https://docs.databricks.com/en/security/secrets/index.html)

---

## 7️⃣ Job & Workflow Best Practices

### ✅ Use Jobs, not manual runs

- Schedule notebooks
    
- Define dependencies
    
- Retry on failure
    

📘 Docs  
👉 Databricks Jobs  
[https://docs.databricks.com/en/jobs/index.html](https://docs.databricks.com/en/jobs/index.html)

---

### ✅ Small, reusable tasks

Instead of:

```
One huge job
```

Use:

```
Ingest → Validate → Transform → Publish
```

📘 Docs  
👉 Job design best practices  
[https://docs.databricks.com/en/jobs/jobs-best-practices.html](https://docs.databricks.com/en/jobs/jobs-best-practices.html)

---

## 8️⃣ Cost Management Best Practices

### ✅ Use cluster policies

Prevent oversized clusters.

📘 Docs  
👉 Cluster policies  
[https://docs.databricks.com/en/administration-guide/clusters/policies.html](https://docs.databricks.com/en/administration-guide/clusters/policies.html)

---

### ✅ Prefer Job clusters over All-purpose

**Why**

- Auto-terminate
    
- Cheaper
    
- Reproducible
    

📘 Docs  
👉 Cluster types  
[https://docs.databricks.com/en/clusters/cluster-types.html](https://docs.databricks.com/en/clusters/cluster-types.html)

---

## 9️⃣ CI/CD Best Practices

### ✅ Use DevOps pipelines

Typical flow:

```
Git → PR → Tests → Databricks Job → Prod
```

📘 Docs  
👉 CI/CD on Databricks  
[https://docs.databricks.com/en/dev-tools/ci-cd.html](https://docs.databricks.com/en/dev-tools/ci-cd.html)

---

## 🔟 Official “Must-Read” Pages (Bookmark These)

⭐ Databricks Best Practices (main hub)  
[https://docs.databricks.com/en/best-practices/index.html](https://docs.databricks.com/en/best-practices/index.html)

⭐ Delta Lake Best Practices  
[https://docs.databricks.com/en/delta/best-practices.html](https://docs.databricks.com/en/delta/best-practices.html)

⭐ Unity Catalog Best Practices  
[https://docs.databricks.com/en/data-governance/unity-catalog/best-practices.html](https://docs.databricks.com/en/data-governance/unity-catalog/best-practices.html)

⭐ Performance Tuning Guide  
[https://docs.databricks.com/en/optimizations/index.html](https://docs.databricks.com/en/optimizations/index.html)

---

## ✅ If you want next steps

I can:

- Create a **Databricks best-practice checklist**
    
- Map best practices to **certification exam topics**
    
- Provide a **real-world enterprise reference architecture**
    
- Tailor best practices specifically for **data testing / QA / EDW projects**
    

Just tell me 👍