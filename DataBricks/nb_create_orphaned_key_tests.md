
> [!NOTE] Functions
> create relationship csv file then created a view then find some 
> the script is used to test star schema fact table and dimension table
> to find some values in fact table but not in dimension table


``` python
# Databricks notebook source

#### WIP ####

#### WIP ####

#### WIP ####

# based on created metata between fact and dimensions keys, ensore that there are no orphaned keys in the fact.  i.e. key in fact, but not in dimension

  

# COMMAND ----------

  

dbutils.widgets.text("environment","test")

  

dbutils.widgets.text("project","Synapse to Databricks Migration")

dbutils.widgets.text("suite_name","IM_integrity_checks_relationships")

  

environment = dbutils.widgets.get("environment")

  

project = dbutils.widgets.get("project")

suite_name = dbutils.widgets.get("suite_name")

  

# COMMAND ----------

  

suite_name = 'IM_integrity_checks_relationships'

  

# COMMAND ----------

  

##adding from csv per IM_Project

sql = f"""select

project,

project_phase,

from_json(project_tag, 'ARRAY<STRING>') as project_tag,

release,

stage,

parent_catalog,

parent_schema,

parent_table,

parent_key,

child_catalog,

child_schema,

child_table,

child_key,

Status,

comment,

_rescued_data

  

 from

read_files(

 '/Volumes/cbi/test/reference/relationships.csv',

 multiLine => true,

 inferSchema => false,

 mode => 'PERMISSIVE',

 quote => '"',

 escape => '\"'

)"""

  

df = spark.sql(sql)

df.createOrReplaceTempView('relationships')

display(df)

  
  
  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC --clear out tests in test_repository before re-inserting for same project, catalog and suite

# MAGIC DELETE FROM cbi.test.test_repository where project = :project and endswith(target_catalog,:environment) and suite_name = :suite_name

# MAGIC

  

# COMMAND ----------

  

# key_and_string_field_compare source is ODS

# ODS as source, so need to consider timestamp from ODS to Staging, but not the other way.

# #  create a union except statement

sql = f"""select

cast(seq_row_num + row_number() OVER (ORDER BY parent_catalog, parent_table, child_table, child_key) as string) as id

, project as project

, project_phase as project_phase

, project_tag as project_tag

, release as release

, '{suite_name}' as suite_name

, 'integrity' as test_type

, 'Relationships Check - no orphaned records' as test_name

, '' as requirement

, stage as stage

, 'delta' as source_type

, concat(parent_catalog,'{environment}') as source_catalog

, parent_schema as source_schema

, parent_table as source_table

, '' as source_table_type

, parent_key as source_key

, parent_key as source_column_names

, '' as source_filter

, 'delta' as target_type

, concat(child_catalog,'{environment}') as target_catalog

, child_schema as target_schema

, child_table as target_table

, '' as target_table_type

, child_key as target_key

, child_key as target_column_names

, '' as target_filter

  
  

,'' as regression

,'1' as active

,'' as risk_likelihood

,'' as risk_impact

,'' as dev

,'' as tst

,'' as pat

,'' as prd

,concat(

'select p.',parent_key,' from ',parent_catalog,'{environment}.',parent_schema,'.',parent_table,' p

left join ',child_catalog,'{environment}.',child_schema,'.',child_table,' c on c.',child_key,' = p.',parent_key,'

where c.',child_key,' is null and p.',parent_key,' is not null'

) as query

from

  relationships R1

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name) R2

where

  status = '1'

  

"""

  

df = spark.sql(sql)

  

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

display(df)

  

# COMMAND ----------

  

##### analysis under here ######

##### analysis under here ######

##### analysis under here ######

##### analysis under here ######

##### analysis under here ######

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select * from cbi.test.test_repository where test_name = 'Relationships Check - no orphaned records' and target_catalog like '%test'

# MAGIC

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select p.* from cbi_edw_test.iemr.f_service_request p

# MAGIC left join cbi_edw_test.iemr.d_encounter c on c.bk_encounter = p.bk_encounter

# MAGIC where c.bk_encounter is null and p.bk_encounter is not null

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC

# MAGIC select source_catalog, source_table, source_key, target_catalog, target_table, target_key, query, result  from cbi.test.test_results_log where run_id = '626524274281240' and result <> 'Pass' and source_table = 'f_service_request'

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select source_catalog, source_table, source_key, target_catalog, target_table, target_key, query, result  from cbi.test.test_results_log where run_id = '626524274281240' and result <> 'Pass' and source_table = 'f_appointment'

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select * from cbi_im_dev.esm.d_date order by bk_date desc

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select p.* from cbi_im_dev.esm.f_service_request p

# MAGIC left join cbi_im_dev.esm.d_date c on c.bk_date = p.bk_date__service_request

# MAGIC where c.bk_date is null and p.bk_date__service_request is not null

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select p.* from cbi_im_dev.esm_pbi.f_appointment p

# MAGIC

# MAGIC left join cbi_im_dev.esm.d_appointment c on c.bk_appointment = p.bk_scheduled_appointment

# MAGIC

# MAGIC where c.bk_appointment is null and p.bk_scheduled_appointment is not null
```