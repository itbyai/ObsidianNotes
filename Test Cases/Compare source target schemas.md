Got it! Let’s go **step by step** for how to get **all constraints for all columns** and how to **compare source → target schemas** for ETL testing or validation. I’ll focus on SQL Server as an example, but I’ll also note cross-platform options.

---

# **1️⃣ Get all constraints for a table**

Constraints include:

- **Primary Key (PK)**
- **Foreign Key (FK)**
- **Unique**
- **Check**
- **Default**
- **Not Null** (technically a column property, but considered a constraint)

You can use **system views** or **INFORMATION_SCHEMA**.

---

### **A) Using INFORMATION_SCHEMA (SQL Server)**

```sql
-- Get all column constraints for a table
SELECT
    c.COLUMN_NAME,
    c.DATA_TYPE,
    c.IS_NULLABLE,
    kcu.CONSTRAINT_NAME,
    tc.CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.COLUMNS c
LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    ON c.TABLE_NAME = kcu.TABLE_NAME
    AND c.COLUMN_NAME = kcu.COLUMN_NAME
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    ON kcu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
WHERE c.TABLE_NAME = 'Customer'
ORDER BY c.ORDINAL_POSITION;
```

**Output Example:**

|COLUMN_NAME|DATA_TYPE|IS_NULLABLE|CONSTRAINT_NAME|CONSTRAINT_TYPE|
|---|---|---|---|---|
|customer_id|int|NO|PK_Customer|PRIMARY KEY|
|first_name|varchar|YES|NULL|NULL|
|email|varchar|YES|UQ_Customer_Email|UNIQUE|

---

### **B) Get Foreign Keys**

```sql
SELECT
    f.name AS FK_Name,
    OBJECT_NAME(f.parent_object_id) AS Table_Name,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS Column_Name,
    OBJECT_NAME (f.referenced_object_id) AS Referenced_Table,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS Referenced_Column
FROM sys.foreign_keys AS f
INNER JOIN sys.foreign_key_columns AS fc
    ON f.object_id = fc.constraint_object_id
WHERE OBJECT_NAME(f.parent_object_id) = 'Orders';
```

---

### **C) Get Check & Default Constraints**

```sql
-- Default constraints
SELECT
    c.name AS Column_Name,
    d.name AS Default_Name,
    d.definition AS Default_Value
FROM sys.columns c
JOIN sys.default_constraints d
    ON c.default_object_id = d.object_id
WHERE c.object_id = OBJECT_ID('Customer');

-- Check constraints
SELECT
    cc.name AS Check_Name,
    cc.definition AS Check_Definition,
    col.name AS Column_Name
FROM sys.check_constraints cc
JOIN sys.columns col
    ON cc.parent_object_id = col.object_id
WHERE col.object_id = OBJECT_ID('Customer');
```

---

# **2️⃣ Combine All Constraints**

You can write a **view or query** that gathers **all columns + all constraints** in a single table:

| Column_Name | Data_Type | Is_Nullable | PK | FK | Unique | Check | Default |

This makes it easy to **compare source → target**.

---

# **3️⃣ Compare Source → Target**

1. **Get all constraints from source** → store as table or CSV.
2. **Get all constraints from target** → store similarly.
3. **Join source and target** on **column mapping** (e.g., `id → customer_key`)
4. Compare:

|Column_Source|Column_Target|PK_Source|PK_Target|FK_Source|FK_Target|Null_Source|Null_Target|Result|
|---|---|---|---|---|---|---|---|---|
|id|customer_key|1|1|0|0|NO|NO|Pass|
|name|customer_name|0|0|0|0|YES|NO|Fail|

- If all constraints **match**, mark **Pass**
    
- If any mismatch, mark **Fail**
    

---

# **4️⃣ Optional: Python Automation**

```python
import pandas as pd
from sqlalchemy import create_engine

# Connect to source and target
source_engine = create_engine("mssql+pyodbc://user:pass@source_db")
target_engine = create_engine("mssql+pyodbc://user:pass@target_db")

# Query source constraints
source_constraints = pd.read_sql("""
-- Example combined query for constraints
SELECT c.COLUMN_NAME,
       c.DATA_TYPE,
       c.IS_NULLABLE,
       CASE WHEN tc.CONSTRAINT_TYPE='PRIMARY KEY' THEN 1 ELSE 0 END AS PK
FROM INFORMATION_SCHEMA.COLUMNS c
LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    ON c.TABLE_NAME = kcu.TABLE_NAME AND c.COLUMN_NAME = kcu.COLUMN_NAME
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    ON kcu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
WHERE c.TABLE_NAME='Customer'
""", source_engine)

# Query target constraints (similar)
target_constraints = pd.read_sql("""
-- Target query here
""", target_engine)

# Merge and compare
merged = source_constraints.merge(target_constraints, left_on='COLUMN_NAME', right_on='COLUMN_NAME', suffixes=('_src','_tgt'))
merged['PK_match'] = merged['PK_src'] == merged['PK_tgt']
merged['Null_match'] = merged['IS_NULLABLE_src'] == merged['IS_NULLABLE_tgt']

print(merged)
```

This will **highlight mismatches** between source and target constraints automatically.

---

# ✅ **Summary**

1. Use **INFORMATION_SCHEMA** or **sys tables** to get all column constraints.
2. Include: **PK, FK, UNIQUE, CHECK, DEFAULT, NOT NULL**
3. Combine into a single table or dataframe for **easy comparison**
4. Compare **source → target column mapping**
5. Report **Pass/Fail** for each column
    

---

If you want, I can create a **ready-to-use SQL query** that generates a **full source→target constraint comparison report** for any table, including **PK, FK, unique, check, default, nullability**, which you can run directly.

Do you want me to do that?