

> [!NOTE] Function
> Add test cases in to the table source_to_target_mapping using STTM file
> 



```python
# Databricks notebook source

# adds to STTM mapping per project.  As we currently don't have STTM mapping (e.g. in a database), using csv files to construct these per project.  e.g. ESM, PADP, CCT, ED_Combined.  This notebook will be the latest csv file for given IM_Project.  csv file naming needs to match paramater.  e.b. STTM_[IM_Project]

  

# using the field module_entity in STTM to differentiate between IM's (IM_Project).  When tests are created, this will be stored in the Project_Phase in cbi.test.test_repository.

  

# COMMAND ----------

  

dbutils.widgets.text("IM_Project","ED_Combined")

  

IM_Project = dbutils.widgets.get("IM_Project")

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC --remove STTM entries before reading latest

# MAGIC delete from cbi.test.source_to_target_mapping where module_entity = :IM_Project

  

# COMMAND ----------

  

##adding from csv per IM_Project

sql = f"""select uuid() as id,

project,

project_phase,

from_json(project_tag, 'ARRAY<STRING>') as project_tag,

module_entity,

version,

stage,

source_type,

source_catalog,

source_schema,

source_table,

source_table_type,

source_file_path,

source_column,

source_column_data_type,

source_key_flag,

source_watermark_flag,

source_filter,

source_transform,

source_column_description,

target_type,

target_catalog,

target_schema,

target_table,

target_table_type,

target_file_path,

target_column,

target_column_data_type,

target_key_flag,

target_watermark_flag,

target_filter,

target_transform,

target_column_description,

generic_data_type,

load_frequency,

active,

dev,

tst,

pat,

prd,

rls_flag

 from

read_files(

 '/Volumes/cbi/test/reference/STTM_{IM_Project}.csv',

 multiLine => true,

 inferSchema => false,

 mode => 'PERMISSIVE',

 quote => '"',

 escape => '\"'

)

"""

  

df = spark.sql(sql)

# df.createOrReplaceTempView('STTM_load')

display(df)

  

df.write.format("delta").mode("append").saveAsTable('cbi.test.source_to_target_mapping')

  

# COMMAND ----------
```

[^1]: 
