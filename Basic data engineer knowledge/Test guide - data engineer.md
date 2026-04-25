Below is a **clear, structured, detailed introduction** to each major testing focus in a Data Engineering project. This is written in a practical way so you can directly apply it to **ODS → Curated → EDW/Model → Power BI**.

---

# 🌟 **DATA ENGINEERING TESTING – FULL EXPLANATION**

You will learn:

- What each test type means
    
- Why it is important
    
- How to perform it (step-by-step)
    
- Examples
    
- SQL / PySpark sample queries
    

This is the exact checklist that is normally used in enterprise data engineering projects.

---

# ✅ **1. Schema Validation**

Ensures that **table structure matches the agreed design** (Data Element Requirements or Mapping Spec).

### ✔ What to check

- Column names
- Data types
- Nullability
- Primary key is defined
    
- Foreign keys (if used)
    
- Constraints
    
- Data type conversions: `int → bigint`, `varchar → string`
    
- Naming conventions
    

### ✔ How to do it

**Step 1:** Extract schema from raw  
**Step 2:** Extract schema from curated/model  
**Step 3:** Compare using SQL, Python, or automated tools (dbt tests, Great Expectations)

### ✔ Example SQL

```sql
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Patient'
ORDER BY COLUMN_NAME;
```

### ✔ Sample automated comparison (PySpark)

```python
df1_schema = set((f.name, f.dataType) for f in df1.schema.fields)
df2_schema = set((f.name, f.dataType) for f in df2.schema.fields)

print("Columns missing:", df1_schema - df2_schema)
```

---

# ✅ **2. Transformation Logic Testing**

Verifies that the logic applied during transformation is correct.

### ✔ What to check

- Date calculations (e.g., LOS = discharge – admission)
    
- Conditional rules (e.g., if status = “cancelled”)
    
- Code mappings
    
- Derived fields
    
- Joins
    
- Filters
    
- Aggregations
    

### ✔ Example

Rule:

```
Length_of_Stay = DATEDIFF(day, Admission_Date, Discharge_Date)
```

**Test:**

- Manually calculate LOS for 5–10 raw records
    
- Compare with curated output
    

---

# ✅ **3. Mapping Validation (Raw → Curated → Model)**

Ensures **every field** in curated/model correctly comes from the source.

### ✔ What to check

- All required fields appear in curated
    
- All business rules applied
    
- Calculation is correct
    
- Lookups applied correctly
    
- No missing rows
    
- No extra rows
    

### ✔ Example Mapping Row

|Raw Field|Curated Field|Transformation|
|---|---|---|
|PAT_NAME|Patient_Name|Trim + Upper|
|ADMIT_DT|Admission_Date|Cast to date|
|DOB|Birth_Date|No change|

**Test Method:**  
Compare 10–20 rows manually using SQL:

```sql
SELECT raw.PAT_NAME, curated.Patient_Name
FROM raw.Patient raw
JOIN curated.Patient curated ON raw.ID = curated.ID;
```

---

# ✅ **4. Data Quality Tests**

Ensures data is **clean, complete, and valid**.

### ✔ What to test

- Mandatory fields not null
    
- Invalid values
    
- Outliers
    
- Wrong data formats
    
- Negative values (where not allowed)
    
- Broken reference codes (e.g., Gender = “Z”)
    

### ✔ Examples

```sql
-- Null check
SELECT COUNT(*) FROM curated.Patient WHERE Admission_Date IS NULL;

-- Code set validity
SELECT DISTINCT Gender FROM curated.Patient 
WHERE Gender NOT IN ('M','F','X');
```

---

# ✅ **5. Record Counts, Duplicates, Null Checks**

### ✔ Why important?

To ensure **no data loss**, **no duplication**, and data integrity.

### ✔ Count Test

```sql
SELECT COUNT(*) FROM raw.Patient;
SELECT COUNT(*) FROM curated.Patient;
```

Expect:

```
Counts match unless filtering rules apply.
```

### ✔ Duplicate Test

```sql
SELECT Patient_ID, COUNT(*)
FROM curated.Patient
GROUP BY Patient_ID
HAVING COUNT(*) > 1;
```

---

# ✅ **6. Business Rules Validation**

These rules come from SMEs and define how data should behave.

### ✔ Examples

- Admission_Date <= Discharge_Date
    
- Category must be between 1–3
    
- If appointment cancelled → Outcome = NULL
    

### ✔ Test Example

```sql
SELECT *
FROM curated.Appointments
WHERE Appointment_Status = 'Cancelled'
AND Outcome IS NOT NULL;
```

---

# ✅ **7. Fact & Dimension Table Checks**

When data reaches the **semantic layer (EDW)**, test the star schema.

### ✔ What to check

- Surrogate keys
    
- Dim table values
    
- Fact table foreign keys
    
- Granularity (1 row = 1 event)
    
- Relationships match the model
    

### ✔ Example test

Check that every Fact_Admission.Patient_Key exists in Dim_Patient:

```sql
SELECT f.Patient_Key
FROM Fact_Admission f
LEFT JOIN Dim_Patient d ON f.Patient_Key = d.Patient_Key
WHERE d.Patient_Key IS NULL;
```

---

# ✅ **8. End-to-End Pipeline Testing**

Ensures the entire pipeline works as expected:

### ✔ Steps

✓ Raw ingestion  
✓ Transformation jobs  
✓ Joins & calculations  
✓ Loads to curated  
✓ Loads to EDW  
✓ Loads to Power BI dataset

### ✔ What to test

- Jobs run successfully
    
- Timeliness (SLA)
    
- All layers updated
    
- No data loss across stages
    

---

# ✅ **9. Report-Level Validation (Power BI)**

Final step: confirm that the **report matches the data model** and business rules.

### ✔ Tests include:

- Measures produce correct values
    
- Filters work
    
- Slicers behave correctly
    
- Totals = sum of detail
    
- Visuals show correct granularity
    
- Drill-through works
    
- Star schema is correctly used
    

### ✔ Example measure test

If the measure is:

```
Total Admissions = COUNTROWS(Fact_Admission)
```

Manually compare with SQL:

```sql
SELECT COUNT(*) FROM Fact_Admission;
```

---

# 🎯 **Full Testing Summary Table**

|Test Type|Purpose|Example|
|---|---|---|
|Schema Validation|Structure is correct|Column types match|
|Transformation Logic|Calculations correct|LOS = discharge – admission|
|Mapping Validation|Raw → Curated match|Source fields transformed correctly|
|Data Quality|Clean data|Code sets, nulls, invalid values|
|Record Counts|No loss/duplication|Counts match across layers|
|Business Rules|Business meaning correct|Emergency → Transfer Source != null|
|Fact/Dim Checks|Star schema correctness|Foreign keys valid|
|End-to-End|Whole pipeline works|All layers refreshed|
|Report Validation|PBI correctness|Measures match SQL|

---

# If you want, I can generate:

✅ Full Azure DevOps Test Plan template  
✅ Test cases for each layer (step-by-step)  
✅ SQL test scripts  
✅ Databricks Notebook test scripts  
✅ Mapping verification checklist  
✅ A whole test strategy document

Just tell me!

Great — below I’ve created a practical, ready-to-use **testing bundle** you can apply immediately:

- 🔹 **Azure DevOps Test Plan template** (test suites & example test cases)
    
- 🔹 **Detailed test cases** for each layer (raw → curated → self-service) ready to paste into Azure DevOps
    
- 🔹 **SQL test scripts** you can run in your warehouse / Databricks SQL to validate results
    
- 🔹 **Databricks (PySpark) notebook snippets** for automating checks and comparisons
    
- 🔹 **Source→Target Mapping verification checklist** (what to inspect)
    
- 🔹 **Short Test Strategy document** (roles, cadence, SLAs, automation)
    

Use, adapt, and copy these into your pipelines / test plan. I kept examples healthcare-themed (HBCIS → Databricks → Power BI) but they’re generic enough to re-label.

---

# 1) Azure DevOps Test Plan structure (recommended)

Use **Test Suites** mapped to layers and types:

- Test Plan: `ProjectName - Data Engineering Tests`
    
    - Static Tests (optional)
        
    - Raw Layer Tests
        
        - Ingestion & File Arrival
            
        - Raw Schema & Metadata
            
        - Raw DQ
            
    - Curated Layer Tests
        
        - Mapping validation
            
        - Transformation logic
            
        - DQ & business rules
            
        - Fact & Dimension checks
            
    - Self-Service / BI Tests
        
        - Semantic model / Measures
            
        - Report validation
            
    - End-to-End Pipeline Tests
        
        - Job orchestration / SLA / Recovery
            

Each **Test Case** should include fields:

- Title
    
- Preconditions (dataset, run id, snapshot time)
    
- Test Steps (explicit)
    
- Expected result (pass/fail criteria)
    
- Actual result (for tester)
    
- Attachments (SQL, screenshots, run logs)
    
- Tags (layer, severity, automation)
    

---

# 2) Example Test Cases (copy into Azure DevOps)

## RAW: Ingestion — File arrival

- **Title:** `RAW - Daily file arrival for HBCIS_PATIENT`
    
- **Preconditions:** Ingestion job id `ingest_2025_12_01` executed
    
- **Steps:**
    
    1. Check landing folder `/raw/hbcis/patient/2025-12-01/` exists.
        
    2. Verify file `hbcis_patient_20251201.csv` presence and size > 1KB.
        
- **Expected:** File exists, timestamp within 24h, size > 1KB.
- **Severity:** High
    

## RAW: Schema validation

- **Title:** `RAW - HBCIS_PATIENT schema columns`
    
- **Steps:**
    
    1. Run `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='raw_hbcis_patient';`
        
    2. Compare list to expected schema.
        
- **Expected:** No missing columns; datatypes match expected.
    

## CURATED: Mapping validation (source → target)

- **Title:** `CURATED - Map PATIENT_ID correctness`
    
- **Steps:**
    
    1. Select sample 20 patient rows from `raw_hbcis_patient` (ordered by ingestion_ts).
        
    2. For each sample, run join:
        
        ```
        SELECT r.patient_id, c.patient_key, c.source_patient_id
        FROM raw_hbcis_patient r
        LEFT JOIN curated.dim_patient c ON c.source_patient_id = r.patient_id
        WHERE r.patient_id IN (<sample_list>);
        ```
        
- **Expected:** All `source_patient_id` values match raw `patient_id`. No NULLs for source_patient_id in curated rows.
    

## CURATED: Transformation logic — LOS

- **Title:** `CURATED - LengthOfStay calculation`
    
- **Steps:**
    
    1. For sample admissions where discharge_date IS NOT NULL, calculate `DATEDIFF(discharge_date, admission_date)` from raw and compare to curated `length_of_stay`.
        
- **SQL (see below)**
    
- **Expected:** Values match for all sample rows; differences = 0.
    

## CURATED: Business rule — admission <= discharge

- **Title:** `CURATED - Admission <= Discharge`
    
- **Steps:**  
    Run:
    
    ```sql
    SELECT admission_id FROM curated.fact_admission
    WHERE admission_date > discharge_date;
    ```
    
- **Expected:** 0 rows.
    

## FACT/DIM: FK integrity

- **Title:** `CURATED - Fact.Patient FK exists in Dim_Patient`
    
- **Steps:**
    
    ```sql
    SELECT f.patient_key
    FROM curated.fact_visit f
    LEFT JOIN curated.dim_patient d ON f.patient_key = d.patient_key
    WHERE d.patient_key IS NULL
    LIMIT 100;
    ```
    
- **Expected:** 0 rows.
    

## END-TO-END: Count reconciliation

- **Title:** `E2E - Daily Visit count reconciliation (raw -> curated -> PBI)`
    
- **Steps:**
    
    1. Raw count: `SELECT COUNT(*) FROM raw_hbcis_visit WHERE ingestion_date = '2025-12-01';`
        
    2. Curated count: `SELECT COUNT(*) FROM curated.fact_visit WHERE load_date = '2025-12-01';`
        
    3. PBI dashboard total (or semantic dataset) compare.
        
- **Expected:** Curated count = Raw count (or explainable delta due to filtering; documented).
    

## REPORT: Power BI measure check

- **Title:** `PBI - Total Admissions measure`
    
- **Steps:**
    
    1. SQL: `SELECT COUNT(*) FROM curated.fact_admission WHERE admission_date BETWEEN '2025-01-01' AND '2025-01-31';`
        
    2. Check Power BI card visual for same period.
        
- **Expected:** Numbers match.
    

---

# 3) SQL Test Scripts (runnable examples)

Use these in Databricks SQL or your warehouse. Parameterize date / run id as needed.

### A. Raw row count

```sql
-- raw count
SELECT COUNT(*) AS raw_count
FROM raw_hbcis_patient
WHERE ingestion_date = '2025-12-01';
```

### B. Schema difference (compare expected columns list)

```sql
-- expected columns table (small meta table expected_schema)
SELECT e.column_name
FROM expected_schema e
LEFT JOIN information_schema.columns c
  ON c.table_name = 'raw_hbcis_patient' AND c.column_name = e.column_name
WHERE c.column_name IS NULL;
-- if rows returned -> missing columns
```

### C. LOS calculation compare

```sql
SELECT f.admission_id,
       DATEDIFF(day, r.admission_date, r.discharge_date) AS raw_los,
       f.length_of_stay AS curated_los
FROM raw_hbcis_admission r
JOIN curated.fact_admission f ON f.source_admission_id = r.admission_id
WHERE r.discharge_date IS NOT NULL
AND f.load_date = '2025-12-01'
LIMIT 100;
-- check where raw_los != curated_los
```

### D. FK integrity

```sql
SELECT f.patient_key
FROM curated.fact_visit f
LEFT JOIN curated.dim_patient d ON f.patient_key = d.patient_key
WHERE d.patient_key IS NULL
LIMIT 100;
```

### E. Duplicate detection

```sql
SELECT patient_id, COUNT(*) AS cnt
FROM curated.dim_patient
GROUP BY patient_id
HAVING COUNT(*) > 1;
```

### F. Code set validity

```sql
SELECT DISTINCT gender
FROM curated.dim_patient
WHERE gender NOT IN ('M','F','U','X'); -- allowed values
```

### G. Late-arriving data detection (CDC lag)

```sql
SELECT MAX(ingestion_ts) AS last_ingest
FROM raw_hbcis_visit;
-- compare to now() to ensure within SLA
```

---

# 4) Databricks PySpark notebook snippets (automation)

### A. Compare record counts automatically

```python
# params
raw_table = "raw_hbcis_visit"
curated_table = "curated.fact_visit"
date = "2025-12-01"

raw_count = spark.sql(f"SELECT COUNT(*) as c FROM {raw_table} WHERE ingestion_date = '{date}'").collect()[0].c
curated_count = spark.sql(f"SELECT COUNT(*) as c FROM {curated_table} WHERE load_date = '{date}'").collect()[0].c

if raw_count != curated_count:
    print(f"COUNT_MISMATCH raw={raw_count} curated={curated_count}")
    # optionally write to monitoring table / send alert
else:
    print("COUNT_OK")
```

### B. Sample mapping verification

```python
sample_ids = [101,102,103]  # sample patient ids
raw = spark.table("raw_hbcis_patient").filter(f"patient_id IN ({','.join(map(str,sample_ids))})")
cur = spark.table("curated.dim_patient").filter(f"source_patient_id IN ({','.join(map(str,sample_ids))})")
display(raw.join(cur, raw.patient_id == cur.source_patient_id, "left").select("patient_id","source_patient_id","patient_key"))
```

### C. Automate business rule check (admission <= discharge)

```python
bad = spark.sql("""
SELECT admission_id, admission_date, discharge_date
FROM curated.fact_admission
WHERE discharge_date IS NOT NULL AND admission_date > discharge_date
LIMIT 100
""")
if bad.count() > 0:
    bad.show()
    # raise alert / write to table
else:
    print("Business rule pass: admission <= discharge")
```

---

# 5) Source→Target Mapping verification checklist

For each mapping row do the following:

1. **Source presence** — Source table exists and contains expected column.
    
2. **Sampling** — pick sample keys and trace them from source → intermediate → curated.
    
3. **Transformation logic** — check each rule: cast, timezone, trim, concatenation, lookups.
    
4. **Code set mapping** — verify raw codes map to standard codes; check invalid codes.
    
5. **Null handling** — confirm null/empty rules implemented.
    
6. **Duplicates** — ensure dedup logic applied (e.g., most recent record wins).
    
7. **Audit columns** — confirm source id, ingestion_ts, batch_id stored in curated table.
    
8. **SCD** — confirm SCD type implementation (Type 1 override or Type 2 history).
    
9. **Edge cases** — negative values, zero, extreme dates, leap year, timezone.
    
10. **Performance** — confirm partitioning / indexes and query performance for expected reports.
    
11. **Lineage** — document lineage (source → pipeline → curated table).
    
12. **Acceptance criteria** — list acceptable deltas (% or absolute) for counts/aggregates.
    

---

# 6) Test Strategy (concise actionable plan)

### Objective

Ensure **data correctness, completeness, and reliability** from source systems through curated models into consumer reports.

### Scope

- Raw ingestion, curated transforms, EDW star schema, Power BI datasets.
    

### Roles

- **Data Engineer**: implement transforms, fix issues, provide run logs.
    
- **Data Modeller**: confirm model & semantics.
    
- **Tester / QA**: execute test cases, log defects in Azure DevOps.
    
- **SME / Business Owner**: validate business rule outcomes & reports.
    
- **Automation Owner**: schedule notebooks/SQL tests + alerts.
    

### Test Types & Frequency

- **Daily Automated**: file arrival, counts, freshness, basic DQ, FK checks.
    
- **Per Pipeline Run**: mapping validation sampling, business rule checks.
    
- **Pre-release / Regression**: full test suite when changing ETL or model.
    
- **Ad-hoc**: SME-driven checks for new metrics.
    

### Pass/Fail Criteria

- **Critical tests** (file arrival, counts, FK integrity) must pass — else block release.
    
- **Business rule violations** require triage and must be resolved before promotion.
    
- Minor data quality issues can have documented exceptions.
    

### Automation & Monitoring

- Automate checks in Databricks notebooks or Airflow jobs.
    
- Send alerts to Slack/email on failures.
    
- Write results to a `monitoring.test_results` table with job_id, test_id, status, details.
    

### Defect Management

- Log defects in Azure DevOps with reproduction steps, query snippets, sample ids, severity, owner.
    

---

# 7) Deliverables you can copy/paste now

- Use the **Test Cases** above directly in Azure DevOps.
    
- Drop SQL snippets into Databricks SQL jobs.
    
- Paste PySpark snippets into a Databricks notebook and schedule as a job (daily).
    
- Use the **Mapping checklist** as a verification worksheet for each mapping row.
    

---

If you want, I can do one of the following next (pick one):

1. Generate a **full Excel test-case workbook** (rows = test cases, columns = steps/expected/actual) and provide it as a downloadable file.
    
2. Produce a **ready-to-run Databricks notebook** (complete, with parameters) that runs daily tests and writes results into a monitoring table.
    
3. Create a **detailed Azure DevOps Test Plan** CSV ready to import (with the sample test cases expanded to 50 items).
    

Which one do you want me to produce now?
# explain more about this "As for static testing such as review of definitions etc, in my opinion, this would be a lower priority. Have not called this out today as in scope for your testing". I am not sure what does it mean and which is high priority?

Here is a **very clear explanation** of what that sentence means — _and exactly what is high priority vs low priority in a data engineering testing project._

---

# ✅ **What does this sentence mean?**

> “As for **static testing** such as review of **definitions** etc, in my opinion, this would be a **lower priority**. Have not called this out today as in scope for your testing.”

### ✔ Meaning in simple words

- **Static testing** = reviewing documents, definitions, descriptions, data element definitions, business concept descriptions **without running any data**.
    
- The person is saying:
    
    - **This type of document-review testing is not important right now**.
        
    - **Your current testing scope does NOT include reviewing definitions**.
        
    - **Your priority is dynamic testing** of actual data flows, mappings, logic, outputs, etc.
        

### ✔ Why “static testing” is low priority?

Because:

- Definitions do not break pipelines.
    
- Definitions do not cause wrong numbers in Power BI.
    
- Definitions do not cause data loss.
    

Static testing is “nice to have,” but not essential to functionality.

---

# ✅ **Then what is high priority?**

In a Data Engineering project, the most important testing focuses on **real data, transformations, quality, and pipelines**.

## 🔥 **High-Priority Areas**

These directly affect whether the data platform works correctly.

### 1️⃣ **Schema Validation**

Check that:

- All columns exist
    
- Data types match
    
- Constraints match
    
- Nullability is correct  
    **This ensures the model doesn’t break.**
    

---

### 2️⃣ **Transformation Logic Testing**

Verify all business rules in the Data Engineering pipeline.

For example:

- `full_name = first_name + ' ' + last_name`
    
- Date conversions
    
- Dedup logic
    
- Clean-up logic
    
- Mapping to coding sets
    

**This ensures data is transformed correctly.**

---

### 3️⃣ **Raw → Curated → Model Mapping Validation**

Check that each field in raw appears correctly in curated and model layers.  
This is where you compare _source-to-target mapping_.

Example:

|RAW|CURATED|MODEL|
|---|---|---|
|patient_id|patient_key|patient_key|
|admit_dt|admission_date|admission_date|
|emerg_flag|emergency_flag|emergency_flag|

---

### 4️⃣ **Data Quality Tests**

This is extremely important.

Must test:

- Null checks
    
- Duplicate checks
    
- Unique key checks
    
- Referential integrity
    
- Valid values (coded values)
    
- Record counts
    

---

### 5️⃣ **Business Rules Validation**

These rules usually come from SMEs, Business Analysts, Data Modellers.

Examples:

- “Discharge date must be after admission date”
    
- “If emergency_flag = Y, then triage_category cannot be null”
    
- “Age must be between 0 and 120”
    

These rules ensure the data makes sense.

---

### 6️⃣ **Fact & Dimension Testing**

- Dimensions must be unique
    
- Facts must join to dimensions via keys
    
- Surrogate keys generated correctly
    

**These ensure the star schema works for Power BI.**

---

### 7️⃣ **End-to-End Pipeline Testing**

Test that:

- Data ingests from source
    
- Lands in RAW
    
- Curated transformation executes
    
- Model layer updates
    
- Power BI refresh works
    

---

### 8️⃣ **Report-Level Validation**

Power BI report checks:

- Correct measures
    
- Correct aggregations
    
- Filters/slicers behave correctly
    
- Totals match expectations
    

---

# ⬇️ Low Priority (Static)

This is what the sentence refers to.

## ❌ **Low-Priority (Static) Testing**

Examples:

- Reviewing column descriptions
    
- Reviewing definitions written by BA
    
- Proofreading business definitions
    
- Reviewing synonyms or business concepts
    
- Checking if documentation wording is correct
    

These do NOT impact the system functioning.

---

# 🌟 Easy Summary

|Area|Priority|Why|
|---|---|---|
|Schema validation|HIGH|Affects pipeline & models|
|Transformations|HIGH|Affects logic & correctness|
|Data mapping|HIGH|Ensures accuracy|
|Data quality|HIGH|Prevent data issues|
|Business rules|HIGH|Ensures correctness|
|Fact/Dim integrity|HIGH|Needed for reporting|
|End-to-end pipeline|HIGH|Ensures workflow works|
|Power BI checks|HIGH|Ensures user output|
|**Document/definition review**|**LOW**|Does not break system|

---

# 🧠 Final Answer to Your Question

### ✔ The sentence means:

Static document review is not included in your testing scope and is low priority.  
Your focus should be on actual **data** and **pipelines**, not on reviewing text definitions.

---

If you want, I can also create:

✅ A full testing plan  
✅ A checklist for each layer (RAW, Curated, Model)  
✅ A test-case template for your project

Just tell me “generate test plan.”
# is that true? I think high priority areas depends on the data element requirements document? without reviewing data element requirements how can I know how to check schema, transformation, data quliaty, business rules, fact dimension table, end to end pipeline testing etc?
You are **100% correct** — and your thinking is **mature and accurate** for real data engineering projects.

Let me explain clearly:

---

# ✅ **Yes — You MUST Understand Data Element Requirements First**

You cannot test schema, transformation logic, data quality, business rules, fact/dim models, or even mapping **without first knowing what the rules are**.

Where do those rules come from?

👉 **Data Element Requirements (DER)**  
👉 **Business Concepts**  
👉 **Data Model (Star Schema)**  
👉 **Mapping Document**  
👉 **Transformation Logic Specification**

These documents **define what the data SHOULD look like**.

So you are absolutely correct:

- **You cannot do high-priority testing without reviewing the definitions.**
    
- **DER defines the expected schema, rules, constraints, transformations, allowed values, and relationships.**
    

---

# 🔍 Why Someone Said “Static testing is low priority”

Here is the real meaning (common in agile data projects):

They mean:

> “Don’t spend too much time reviewing wording, definitions, descriptions.  
> Focus on functional testing first.”

They assume:

- DER is mostly done
    
- Business rules exist
    
- Modeller already confirmed definitions
    

So they want you to focus on _working software/data_, not debating definitions.

BUT…

### ✔ You still need to READ and UNDERSTAND the DER

You simply don’t need to _validate or challenge the document itself_.

**You are not testing the correctness of the document,  
You are using the document to test the data pipeline.**

This is the difference.

---

# 🔥 So let’s clarify with precision:

## ❌ LOW PRIORITY

Static review meaning:

- Checking spelling of definitions
    
- Reviewing whether BA wrote definitions correctly
    
- Debating the meaning of terms
    
- Reviewing synonyms
    
- Checking if descriptions are complete
    
- Validating the BA’s business definitions
    

**These do not affect data pipeline functionality.**

---

## ✅ HIGH PRIORITY

Using the DER to validate data:

### ✔ Schema Testing

Because DER defines:

- column names
    
- data types
    
- nullability
    
- constraints
    

Without DER → schema testing is impossible.

---

### ✔ Transformation Logic Testing

DER includes:

- “Rules”
    
- “Logic”
    
- “Calculation”
    

Without DER → you cannot verify transformations.

---

### ✔ Data Quality & Business Rules

DER gives:

- What values are allowed
    
- Which fields must be non-null
    
- Range limits
    
- Coded values
    
- Relationships between fields
    
- Validation conditions
    

Without DER → data quality testing is blind.

---

### ✔ Mapping Testing

The “Source → Target mapping” section comes from DER.

Without DER → mapping validation cannot be done.

---

### ✔ Fact/Dimension Testing

The Data Model uses:

- business concepts
    
- DER fields
    
- definitions
    
- cardinality
    
- relationships
    

Without DER → you cannot test dimensions, facts, or relationships.

---

# 🎯 **Your conclusion (correct):**

> High priority testing depends on DER.  
> Without DER, testers do not know what “correct” means.

💯 **Yes. Absolutely true.**

---

# 🧠 Short Summary

- You **must** read DER → to know what to test
    
- But you **don’t need to test the DER itself**
    
- That’s why they call documentation review “low priority”
    
- Your real job is testing pipelines, logic, mappings based on DER
    

---

# ✅ If you want, I can help you read your DER document

I can explain each column:

- Business Concept
    
- Data Item Name
    
- Data Item Definition
    
- Rules
    
- Coded Item
    
- Calculations
    
- PADP tables
    
- HBCIS fields
    
- Validation files
    
- Entity type
    

Just paste 2–3 rows (with sensitive info removed) and I will interpret them for you.

Would you like that?