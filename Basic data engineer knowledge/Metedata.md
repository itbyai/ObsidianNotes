In **Databricks Delta** and **ingestion/migration pipelines**, there are a few **special metadata/system columns** that testers should be aware of.  
These columns are **not business data** — they help detect ingestion issues, schema mismatches, and data quality problems.

Below is a complete list of commonly used metadata fields for testing 👇

---
# Metadata for ingestion
## ✅ Most Important Metadata Columns for Testing

|Column|Meaning|Why Test It|
|---|---|---|
|**_rescued_data**|JSON container of any unmapped / unexpected fields during ingestion|Ensure **no schema drift**; verify mappings complete|
|**_ingest_time** / **_load_timestamp**|When data was ingested|Check freshness and incremental logic|
|**_ingest_id**|Batch ID or pipeline execution ID|Validate records come from correct run|
|**_source_file** / **_file_path**|Original file name|Track source errors, dedupe testing|
|**_file_modification_time**|Modification time of source file|Validate incremental ingestion|
|**_record_id** / **_row_id**|Unique ID generated during ingestion|Validate deduplication and merge correctness|
|**_corrupt_record** (Spark/AutoLoader)|Stores bad/unparseable rows|Ensure critical business rows are not lost|
|**_error** / **_error_description**|Error reason when rescued|Help debug data issues|
|**_deleted** (Delta delete marker)|Indicates soft-deleted rows|Verify delete logic during incremental loads|

---

## 📌 Databricks Delta Lake System Columns

|Column|Description|
|---|---|
|**_commit_version**|Row’s version after write|
|**_change_type**|`insert`, `update`, `delete` – used for Change Data Feed|
|**_commit_timestamp**|When the row version was committed|

These are created only when **Change Data Feed (CDF)** is enabled.

---

## 🧪 Why These Matter in Testing

Testers can perform checks like:

|Test Type|Metadata Used|Goal|
|---|---|---|
|**Schema completeness**|`_rescued_data`|Ensure no unexpected fields exist|
|**Freshness**|`_ingest_time`|Validate pipeline runs correctly|
|**Duplicate testing**|`_record_id`, `_source_file`|Ensure unique business keys|
|**CDC validation**|`_change_type`, `_commit_version`|Correct updates/deletes|
|**Error validation**|`_corrupt_record`, `_error`|Monitor ingestion failures|

---

### 📘 Example Validation Checks

```sql
-- No rescued fields should exist
select count(*) 
from curated.table 
where _rescued_data is not null;

-- Fresh load happened today
select max(_ingest_time) 
from curated.table;
```

More checks depending on your DQ rules.

---

## 🧩 Other Optional Metadata fields (project-specific)

|Field|Purpose|
|---|---|
|**ETL_Run_ID**|Pipeline run identifier|
|**Source_System**|Tracks original system like HBCIS|
|**Created_By** / **Updated_By**|Audit columns|
|**Created_Date** / **Updated_Date**|Audit timestamps|

These depend on **data governance requirements**.

---

## 🎯 Quick Summary

|Category|Examples|
|---|---|
|Ingestion metadata|`_ingest_time`, `_source_file`|
|Schema drift metadata|`_rescued_data`, `_corrupt_record`|
|CDC metadata|`_change_type`, `_commit_version`|
|Audit metadata|`Created_Date`, `Updated_By`|

For **testing**, the most critical one is:

👉 `_rescued_data`  
because any row inside indicates **mapping or data issues**.

---

If you'd like, I can provide:  
✔ A **full test case template** for metadata validation  
✔ SQL scripts to automatically check all metadata columns  
✔ Dashboard ideas for monitoring rescued/corrupt data over time

Would you like me to generate the SQL suite for your environment?




# metadata for transform etc
When you move into **transformation** (ODS/Curated/Silver) and **semantic modeling** (Self-service/Gold), **different metadata** becomes important.

---

## 🔹 Metadata related to **Transformation** (ODS → Curated)

These metadata fields help validate **logic, mapping, business rules, and data quality**.

### ✔ Common Transformation Metadata

|Metadata Column|Purpose|Why Tester Cares|
|---|---|---|
|**hash_key / surrogate_key**|Unique row identifier generated after transformation|Ensure deduplication and correct joins|
|**effective_date**|Start time of a valid record|SCD tracking (Slowly Changing Dimensions)|
|**expiry_date**|End time of valid record|Validate historical logic|
|**is_current**|Indicates current active record|Ensures no overlapping valid dates|
|**dq_status** / **validation_flag**|Result of data quality checks|Confirm rules applied correctly|
|**dq_error_reason**|Why row failed|Verify business rule violations handled|
|**processed_timestamp**|When this layer transformation executed|Freshness in curated layer|
|**source_system_code**|Identity of original source|Verify cross-source merge correctness|

---

### 🏷 Derived / Calculated Columns (Transformation outputs)

|Type|Example|What to Test|
|---|---|---|
|Business derived|LOS = DischargeDate – AdmissionDate|Correct calculation|
|Standardized values|Gender → M/F/Unknown|Mapping rules applied|
|Code lookups|Diagnosis_Code → Diagnosis_Name|Correct joins to reference tables|
|Cleansing|Trim, uppercase, remove symbols|No dirty values remain|

These fields **must be tested** against the **Data Element Requirements**.

---

## 🔸 Metadata related to **Data Modeling** (Curated → Self-service / Gold)

|Metadata|Purpose|Testing Focus|
|---|---|---|
|**surrogate keys in dimensions**|Stable join keys|Star schema relationship validation|
|**foreign keys in fact tables**|Join back to dimensions|Cardinality, referential integrity|
|**grain definition**|Lowest level of detail|Calculate duplicate or missing fact records|
|**measure columns**|Numeric fields used for reporting|Accuracy, aggregation rules|

---

## 🧪 Example Transformation Metadata Validation

```sql
-- Check surrogate key uniqueness
select surrogate_key, count(*)
from dim_patient
group by surrogate_key
having count(*) > 1;

-- Validate history tracking (SCD)
select *
from dim_patient
where is_current = 1
and expiry_date is not null;
```

---

## 🧱 Summary by Layer

|Layer|Metadata Type|Purpose|
|---|---|---|
|**Raw (Bronze)**|ingestion metadata|detect file/data errors|
|**ODS/Curated (Silver)**|transformation metadata|verify rules + mapping|
|**Self-Service (Gold)**|modeling metadata|verify analytics logic + joins|

---

## 🎯 Why Metadata Is Crucial

Without these metadata fields, you cannot:

✔ trace changes  
✔ validate business rules  
✔ ensure no duplicates  
✔ maintain history  
✔ guarantee reporting accuracy

---

## If You Want, I Can Also Provide:

📌 A **metadata checklist** for each layer  
📌 SQL scripts to auto-validate all transformation metadata  
📌 A test case template linked to Data Element Requirements  
📌 A traceability matrix from **requirements → mapping → tests**

Would you like me to generate a **Transformation Metadata Testing Checklist** for your project?

# information_schema is related to ingestion and some other column in target table is related to transform
Yes — that’s exactly the right way to think about it. ✅

---

## **1️⃣ INFORMATION_SCHEMA → Ingestion / Technical Metadata**

- `information_schema` is a **system metadata catalog**.
- It describes the **structure of tables**: table names, schemas, columns, data types, constraints, etc.
- You typically use it to **validate ingestion**, for example:
    - All expected tables exist in the schema
    - All expected columns exist with correct data types
    - No unexpected views or extra tables
- **Example query**:

```sql
SELECT column_name, data_type, is_nullable
FROM catalog_name.information_schema.columns
WHERE table_schema = 'swadcsprod_dbo';
```

- This is a **read-only reference**; it reflects the tables as they were ingested or created.


---

## **2️⃣ Target Table Columns → Transformation / Business Logic Metadata**

- During transformation or mapping, engineers often add **custom metadata columns** in the curated/model layer to track:
    

|Column|Purpose|Layer|
|---|---|---|
|`_rescued_data`|Capture unparseable or invalid data|ODS / Curated|
|`dq_flag`|Pass/fail for business rules or quality checks|Curated|
|`dq_error_reason`|Why a row failed validation|Curated|
|`source_system_code`|Track the source system|ODS / Curated|
|`processed_timestamp`|When the row was transformed|Curated / Gold|
|`effective_date` / `expiry_date` / `is_current`|Track historical changes (SCD)|Curated / Gold|

- These columns **exist in the target table itself**, unlike `information_schema`, which is system-level.
    
- They are **directly related to transformations, mappings, and business logic**.
    

---

## ✅ **Putting it together**

|Purpose|Metadata location|Examples|
|---|---|---|
|**Ingestion / schema validation**|`information_schema`|table_name, column_name, data_type, constraints|
|**Transformation / business logic**|Target tables / curated tables|`_rescued_data`, `dq_flag`, `dq_error_reason`, `effective_date`, measures|

---

### **Summary**

- Think of `information_schema` as **the database’s technical catalog** → useful for **ingestion checks**.
    
- Think of **special columns in target tables** as **transformation and business logic metadata** → useful for **testing transformations, business rules, and data quality**.
    

---

If you want, I can draw a **layered diagram showing which metadata is system vs transformation-related**, so it’s very clear for testing purposes.

Do you want me to do that?