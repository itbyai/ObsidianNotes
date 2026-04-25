Here is a **clear, practical, data-engineering-friendly explanation** of  
`INFORMATION_SCHEMA.COLUMNS` — what it is, what it contains, and how to use it.

---

# ✅ **What is `INFORMATION_SCHEMA.COLUMNS`?**

It is a **system view** automatically provided by SQL databases (SQL Server, Azure SQL, Synapse, Snowflake, Postgres, MySQL, Databricks Unity Catalog etc.)

It contains **one row per column** in every table or view you have access to.

Think of it as a **catalog table describing your schema**.  
It does NOT contain data from your tables — only **metadata**.

---

# 📘 **Why is it important?**

It allows you to:

- check schema
    
- validate data types
    
- validate column lengths
    
- confirm if a column exists
    
- find nullable columns
    
- compare schema across environments
    
- generate automated data quality tests
    
- validate mapping specs
    
- build lineage
    

**Testers and Data Engineers use it constantly**.

---

# 📄 **Columns inside `INFORMATION_SCHEMA.COLUMNS` (Typical Content)**

Here is the most common set of fields you will see.

|Column Name|Meaning|
|---|---|
|**TABLE_CATALOG**|Database name|
|**TABLE_SCHEMA**|Schema name (e.g., dbo, raw, curated)|
|**TABLE_NAME**|Table name|
|**COLUMN_NAME**|Column name|
|**ORDINAL_POSITION**|Order of the column (1 = first column)|
|**COLUMN_DEFAULT**|Default value if not provided|
|**IS_NULLABLE**|YES/NO – whether the column allows NULL|
|**DATA_TYPE**|Data type (varchar, int, date, float, etc.)|
|**CHARACTER_MAXIMUM_LENGTH**|For varchar, nvarchar|
|**NUMERIC_PRECISION**|For decimals, numeric columns|
|**NUMERIC_SCALE**|Decimal places|
|**DATETIME_PRECISION**|For date/timestamp types|
|**CHARACTER_SET_NAME**|For char/varchar fields|
|**COLLATION_NAME**|For ordered text comparison|

Different platforms may include extra fields, but this is the core.

---

# 📌 **Example Row (How to read it)**

Suppose your table:

```sql
CREATE TABLE curated.Patient (
    Patient_ID INT NOT NULL,
    First_Name VARCHAR(50),
    Birth_Date DATE
)
```

`INFORMATION_SCHEMA.COLUMNS` will show:

|TABLE_SCHEMA|TABLE_NAME|COLUMN_NAME|DATA_TYPE|IS_NULLABLE|CHARACTER_MAXIMUM_LENGTH|
|---|---|---|---|---|---|
|curated|Patient|Patient_ID|int|NO|NULL|
|curated|Patient|First_Name|varchar|YES|50|
|curated|Patient|Birth_Date|date|YES|NULL|

---

# 🧪 **How Testers Use `INFORMATION_SCHEMA.COLUMNS`**

### ✔ Schema validation

To check if curated layer matches DER (Data Element Requirements):

```sql
SELECT *
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'curated'
AND TABLE_NAME = 'Patient';
```

### ✔ Compare environments (DEV vs UAT vs PROD)

Automatically detect column changes:

```sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE
FROM dev.INFORMATION_SCHEMA.COLUMNS
EXCEPT
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE
FROM prod.INFORMATION_SCHEMA.COLUMNS;
```

### ✔ Identify nullable columns

```sql
SELECT TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE IS_NULLABLE = 'YES';
```

### ✔ Identify which table has a column

```sql
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'Patient_ID';
```

---

# 🧑‍💻 **How Data Engineers Use It**

### ✔ Generate dynamic SQL

Example: automatically build a SELECT list:

```sql
SELECT STRING_AGG(COLUMN_NAME, ',')
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Patient';
```

### ✔ Ensure RAW → CURATED → MODEL matches definitions

Useful when validating mapping specifications.

### ✔ Generate auditing tables

E.g., capturing schema drift in source systems.

---

# 🔥 **Why This Table Is Critical in Data Engineering Projects**

Because it provides:

### 1️⃣ **Single source of truth for schema**

Matches what you actually have, not what documents say.

### 2️⃣ **Foundation for schema testing**

Testers use it to validate:

- column existence
    
- data types match DER
    
- column order
    
- nullable rules
    
- length rules
    

### 3️⃣ **Detects unexpected changes** (schema drift)

Very important when ingesting source systems.

### 4️⃣ **Used in data catalogs**

Part of metadata management & lineage.

---

# 💬 If you want, I can also give you:

📌 A full **schema validation test plan** using INFORMATION_SCHEMA  
📌 Automated SQL scripts for comparing raw → curated → semantic  
📌 How DER columns map to INFORMATION_SCHEMA columns  
📌 Example SQL for automated data-quality testing

Just tell me what you want next.