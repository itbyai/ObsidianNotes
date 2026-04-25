

> [!NOTE] Function
> 
从 metadata schema 中收集所有 ODS 表的 ingestion 配置、CDC配置、watermark、key字段、调度信息、运行状态等，并生成一个统一的 metadata 视图，用于 pipeline 控制、监控、测试和自动化


核心metadata表：

| 表名                  | 作用                 |
| ------------------- | ------------------ |
| load_config         | 主配置表               |
| load_template       | load类型             |
| databricks_schema   | 目标schema           |
| load_config_merge   | keys和watermark     |
| batch_config        | batch配置            |
| rls_table_config    | Row level security |
| load_runtime_config | 运行配置               |
| vw_batch_config     | 调度和运行状态            |
|                     |                    |
# Databricks ODS Integrity Test Generation Notebook

## Overview

This notebook generates automated integrity and comparison tests for ODS tables in Databricks based on metadata from:

```
cbi_metadata_{environment}.cbi_gen3
```

The tests are dynamically generated and stored in:

```
cbi.test.test_repository
```

---

## Integrity Tests Covered

This notebook creates tests for:

- Duplicate key detection
    
- RLS column integrity
    
- Metadata column presence
    
- Rescued data validation
    
- Synapse vs Databricks comparison
    
- Schema comparison
    
- Data type compatibility
    
- High watermark comparison
    

---

# 1. Widget Parameters

These parameters allow execution in different environments and releases.

```python
dbutils.widgets.text("project","Synapse to Databricks Migration")
dbutils.widgets.text("project_phase","Phase1")
dbutils.widgets.text("release","1")
dbutils.widgets.text("environment","prod")

project = dbutils.widgets.get("project")
project_phase = dbutils.widgets.get("project_phase")
release = dbutils.widgets.get("release")
environment = dbutils.widgets.get("environment")
```

---

# 2. Test Suite Initialization

Define the suite name.

```python
suite_name = 'ods_integrity_checks'
print(suite_name)
```

Delete existing test records to avoid duplication.

```sql
DELETE FROM cbi.test.test_repository 
WHERE project = :project 
AND suite_name = concat(:suite_name,'_',:environment)
```

Append environment suffix.

```python
suite_name = 'ods_integrity_checks' + '_' + environment
```

---

# 3. Load ODS Ingestion Metadata

This metadata drives test generation.

```python
sql = f"""
SELECT 
    ods_table_catalog,
    ods_table_schema,
    ods_table_name,
    lt.load_type,
    lt.cdc_type,
    lt.is_cdc,
    concat(ods_table_catalog,'.',ods_table_schema,'.',ods_table_name) as full_table_name,
    
    trim('[]', cast(array_agg(ky.column_name) as string)) as keys,

    wm.column_name as high_watermark_field,
    high_watermark,

    bc.is_enabled,

    watermark_backfill_window,
    watermark_incremental_window,

    wm.watermark_has_nulls,

    fetch_mode,
    lrc.load_mode,

    case when rls.load_config_id is not null then 1 else 0 end as rls_flag

FROM cbi_metadata_{environment}.cbi_gen3.load_config lc

LEFT JOIN cbi_metadata_prod.cbi_gen3.load_template lt
ON lt.load_template_id = lc.load_template_id

LEFT JOIN cbi_metadata_{environment}.cbi_gen3.load_config_merge ky
ON ky.load_config_id = lc.load_config_id 
AND ky.load_config_merge_type = 'KEY'

LEFT JOIN cbi_metadata_{environment}.cbi_gen3.load_config_merge wm
ON wm.load_config_id = lc.load_config_id 
AND wm.load_config_merge_type = 'WATERMARK'

LEFT JOIN cbi_metadata_{environment}.cbi_gen3.rls_table_config rls
ON rls.load_config_id = lc.load_config_id

LEFT JOIN cbi_metadata_{environment}.cbi_gen3.load_runtime_config lrc
ON lrc.load_config_id = lc.load_config_id

GROUP BY ...
"""

df = spark.sql(sql)
df.createOrReplaceTempView("ods_ingestion_metadata")
```

---

# 4. Schema Mapping Between Synapse and Databricks

Defines schema mapping.

```python
# adding to this mapping between syn and dbx schema name will control what tests get created

# can also add other flags that can't be sourced from metadata.  e.g. can't see load type where _rescued_Data field is expected

schema_mapping = {

     "synapse_schema": [

        "ods_iemr_v500_adf", "ods_edis_edis", "ods_epadt_dbo","ods_satr_cbiusr", "ods_satr_ddhhs", "ods_satr_satown","ods_satr_schhs","ods_satr_srrac","ODS_QHPIMS","ODS_SPR_EXPLORE","ODS_SWADCS","ODS_OEDP1_CRDS","ODS_QMPI"

    ],

    "databricks_schema": [

        "iemrprod_v500", "edisprod_edis", "epadtprod_dbo","satrprod_cbiusr", "satrddhhsprod_satown", "satrprod_satown","satrschhsprod_satown","satrprod_srrac","ipharmacyprod_prd_dbo","sprexploreprod_dbo", "swadcsprod_dbo","crdsprod_datown","qmpiprod_qmpi"

    ],

   "watermark_flag": [

    "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0","0","0"

    ],

}

  

df = spark.createDataFrame(

    [dict(zip(schema_mapping.keys(), values)) for values in zip(*schema_mapping.values())]

)

  

display(df)

  
  
  

df.createOrReplaceTempView("schema_mapping")
```

---

# 5. Load Table Exclusions

```python
sql = """
select * except (_rescued_data)
from read_files(
 '/Volumes/cbi/test/reference/syn_dbx_ods_table_exclusions.csv'
)
"""

df = spark.sql(sql)
df.createOrReplaceTempView('syn_dbx_ods_table_exclusions')
```

---

# 6. Load Column Exclusions

```python
sql = """
select * except (_rescued_data)
from read_files(
 '/Volumes/cbi/test/reference/syn_dbx_ods_column_exclusions.csv'
)
"""

df = spark.sql(sql)
df.createOrReplaceTempView('syn_dbx_ods_column_exclusions')
```

---

# 7. Test: RLS Column Not Null

Purpose:

Ensure `_rls` column is populated when RLS enabled.

```python
sql = f"""
SELECT

id,
project,
suite_name,

concat(
    'select ',keys,
    ' from cbi_ods_{environment}.',
    ods_table_schema,'.',ods_table_name,
    ' where _rls is null'
) as query

FROM ods_ingestion_metadata

WHERE rls_flag = '1'
"""

df = spark.sql(sql)

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')
```

---

# 8. Test: Duplicate Key Detection

Purpose:

Detect duplicate primary keys.

```python
concat(
'select ',keys,
', count(*) from cbi_ods_{environment}.',
ods_table_schema,'.',ods_table_name,
' group by ',keys,
' having count(*) > 1'
)
```

---

# 9. Test: Synapse vs Databricks Hourly Comparison

Purpose:

Compare hourly counts.

```sql
WITH dbx_cnt AS (

SELECT date_format(high_watermark_field,"yyyy-MM-dd HH"), COUNT(*)

FROM Databricks

),

syn_cnt AS (

SELECT date_format(high_watermark_field,"yyyy-MM-dd HH"), COUNT(*)

FROM Synapse

)

SELECT *

FROM dbx_cnt
FULL OUTER JOIN syn_cnt

WHERE syn_cnt.cnt > dbx_cnt.cnt
```

---

# 10. Test: Business Key Compare (Full Load)

```sql
SELECT keys

FROM Synapse

EXCEPT

SELECT keys

FROM Databricks
```

---

# 11. Test: Business Key Compare (Incremental)

Uses watermark logic.

```sql
SELECT keys

FROM Synapse

WHERE watermark < yesterday

EXCEPT

SELECT keys

FROM Databricks
```

---

# 12. Test: Information Schema Compare

Detect missing tables/columns.

```sql
SELECT *

FROM source

FULL OUTER JOIN target

WHERE mismatch
```

Excludes:

```
_metadata
_rescued_data
_rls
```

---

# 13. Test: Data Type Compatibility

Detect unsafe conversions.

Example allowed conversions:

```
varchar → string
int → bigint
datetime2 → timestamp
```

---

# 14. Test: Metadata Column Presence

Ensure required columns exist:

```
_rls
_metadata
```

---

# 15. Test: Rescued Data Validation

Purpose:

Detect schema drift issues.

```sql
SELECT count(*)

FROM table

WHERE _rescued_data IS NOT NULL
```

---

# Test Repository Storage

All tests are stored in:

```
cbi.test.test_repository
```

Using:

```python
df.write.format("delta").mode("append").saveAsTable(...)
```

---

# Summary of Generated Test Types

|Test Type|Purpose|
|---|---|
|duplicate_key_check|Detect duplicate business keys|
|rls_field_not_null|Validate RLS enforcement|
|hourly_comparison|Validate ingestion completeness|
|business_key_compare|Validate migration accuracy|
|information_schema_compare|Validate schema consistency|
|data_type_compare|Validate safe type conversion|
|rescued_data_check|Detect ingestion schema drift|

---

# Architecture Overview

```
Synapse
   │
   ▼
Databricks ODS
   │
   ▼
Metadata-driven Test Generator
   │
   ▼
cbi.test.test_repository
   │
   ▼
Automated Execution Framework
```

---

# Recommended Usage

Run this notebook:

```
Daily
After ingestion
After release
```

---

# If you want, I can also provide:

• GitHub-ready version  
• Documentation version  
• dbt-compatible version  
• Test execution framework version