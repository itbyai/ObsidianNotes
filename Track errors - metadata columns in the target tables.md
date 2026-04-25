Yes — in data engineering, it’s **common to include metadata columns in the target tables** to track errors, transformations, and business logic issues. But this is **not modifying `information_schema`**, it’s adding **columns to your own curated/fact/dimension tables**.

Here’s how it works:

---

## 1️⃣ Why track errors or business logic issues

During transformation or mapping:
- Some data may violate business rules (e.g., negative ages, discharge date < admission date).
- Some records may be incomplete or have unexpected values.
- Some rows may fail type conversions or reference lookups.

To **handle this**, data engineers usually:

- Add **DQ (Data Quality) columns** or **error flags**
- Mark invalid rows rather than silently dropping them
- Preserve original data for auditing / debugging

---

## 2️⃣ Common metadata / “error tracking” columns

|Column Name|Purpose|
|---|---|
|`_rescued_data`|Stores unparseable or invalid data during ingestion|
|`dq_flag` / `validation_flag`|Indicates pass/fail for data quality or business rules|
|`dq_error_reason`|Explains why a row failed a rule|
|`source_system_code`|Keeps track of original source|
|`processed_timestamp`|When the row was inserted/updated|
|`is_current` / `effective_date` / `expiry_date`|Track Slowly Changing Dimensions (SCD) logic|

**Example:**

```sql
CREATE TABLE curated_patient (
    patient_key BIGINT,
    name STRING,
    dob DATE,
    dq_flag STRING,
    dq_error_reason STRING,
    processed_timestamp TIMESTAMP
);
```

---

## 3️⃣ How it is used in testing

As a **data engineering tester**, you can query these columns:

```sql
-- Check how many rows failed DQ rules
SELECT dq_flag, COUNT(*)
FROM curated_patient
GROUP BY dq_flag;

-- Inspect failed rows
SELECT *
FROM curated_patient
WHERE dq_flag = 'FAIL';
```

---

## 4️⃣ Key points

- **Don’t touch `information_schema`** — all of this is in your own tables.
- **Always keep original/raw data** intact.
- These columns help testers **validate transformations** and catch **business logic errors**.

---

Great! Let me explain with a clear **layered diagram** conceptually (I’ll describe it textually here, but it’s easy to turn into a visual diagram in Databricks / PowerPoint / whiteboard):

---

## **Raw → ODS → Curated → Self-Service (Gold) with Error / DQ Columns**

```
+-------------------+
|       RAW         |
|-------------------|
| source tables      |
| original data      |
| no transformations |
+-------------------+
         |
         |  Ingestion
         v
+-------------------+
|        ODS        |   (Operational Data Store)
|-------------------|
| original fields    |
| _rescued_data      | <-- captures unparseable / bad records
| source_system_code |
| processed_timestamp|
+-------------------+
         |
         | Transformation / Mapping / Cleansing / Business Rules
         v
+-------------------+
|      CURATED      |   (Silver layer)
|-------------------|
| cleaned & standardized fields |
| dq_flag           | <-- indicates pass/fail business rule / data quality
| dq_error_reason   | <-- explains why a row failed a rule
| surrogate keys    | for dimension/fact tables
| effective_date / expiry_date / is_current | <-- history tracking (SCD)
| measures (aggregated/calculated fields) |
+-------------------+
         |
         | Modeling / Star Schema / Fact & Dimension
         v
+-------------------+
|   SELF-SERVICE    |   (Gold / Analytics layer)
|-------------------|
| fact tables       |
| dimension tables  |
| measures & metrics|
| cleaned / validated |
+-------------------+
```

---

### **Explanation**

1. **RAW layer**
    
    - Data is ingested as-is.
        
    - `_rescued_data` column may capture rows that failed parsing (e.g., invalid date or corrupted text).
        
2. **ODS / Curated layer**
    
    - Transformation occurs: standardize values, apply business rules.
        
    - `dq_flag` indicates whether each row passed validation.
        
    - `dq_error_reason` explains failures (like negative age, missing foreign key, or business logic violation).
        
    - Surrogate keys are generated for fact/dimension tables.
        
    - `effective_date`/`expiry_date` track historical changes for Slowly Changing Dimensions.
        
3. **Self-Service / Gold layer**
    
    - Cleaned and validated tables for reporting.
        
    - Testers focus on:
        
        - Fact → dimension relationships
            
        - Aggregations / measures
            
        - Correctness of transformations
            

---

### ✅ **Why this is useful for testing**

- Testers **don’t modify system tables**.
    
- They use the **DQ / error columns** to validate:
    
    - Schema consistency
        
    - Transformation logic
        
    - Business rule adherence
        
    - Historical tracking (SCD)
        
- Allows **quickly identifying rows with issues** without going back to raw source.
    

---

If you want, I can create a **ready-to-use Databricks test query template** that:

1. Checks `_rescued_data` in all tables
    
2. Summarizes `dq_flag` / `dq_error_reason`
    
3. Outputs a **consolidated dashboard table** for all curated tables
    

Do you want me to do that?