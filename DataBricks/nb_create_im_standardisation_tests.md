
> [!NOTE] Functions
> Naming conventions check


```python
# Databricks notebook source
## upcoming changes
##  ##no need for dbt_run_ts as it will be in metadata.  should no longer exist
##  bk one word.  no longer
# COMMAND ----------
##### need to revisit this with now using new IM Standard doc. which include cbi_edw schem
#cbi_edw_{env} contains staging (private layer), snowflake and dims and facts
#cbi_im_{env} contains end user tables (obt, interface)
# COMMAND ----------
# test creation based on new IM Standard documnent
#  1 function to insert the tests in the test_repository.  Can add cells for new tests that call this function
# COMMAND ----------
dbutils.widgets.text("project","Synapse to Databricks Migration")
dbutils.widgets.text("project_phase","Phase1")
dbutils.widgets.text("release","1")
# dbutils.widgets.text("catalog","cbi_im_test")
dbutils.widgets.text("environment","test") # this to be passed in from job
dbutils.widgets.text("suite_name","IM_standardisation_tests")
dbutils.widgets.text("schema_exclusions","""esm","placeholder""") #  test use schema not in () only temporary to exclude schemas that arre not yet ready to test for standards
project = dbutils.widgets.get("project")
project_phase = dbutils.widgets.get("project_phase")
release = dbutils.widgets.get("release")
# catalog = dbutils.widgets.get("catalog")
environment = dbutils.widgets.get("environment")
suite_name = dbutils.widgets.get("suite_name")
schema_exclusions = dbutils.widgets.get("schema_exclusions")
# COMMAND ----------
# MAGIC %sql
# MAGIC --clear tests before recreating
# MAGIC
# MAGIC DELETE FROM cbi.test.test_repository where project = :project and suite_name = concat(:suite_name,'_',:environment)
# COMMAND ----------
suite_name = 'IM_standardisation_tests'+'_'+environment
# COMMAND ----------
# function that all tests in this notebook can pass in parameters to insert into test repository
def add_to_test_repository(id, test_name, stage, query, comment):
test_case_entry = f"""
select '{id}' AS id,
'{project}' AS project,
'{project_phase}' AS project_phase,
'{release}' AS release,
'{suite_name}' AS suite_name,
'standardisation' AS test_type,
'{test_name}' AS test_name,
'' AS requirement,
'{stage}' AS stage,
'' AS source_type,
'' AS source_catalog,
'' AS source_schema,
'' AS source_table,
'' AS source_table_type,
'' AS source_key,
'' AS source_column_names,
'' AS source_filter,
'databricks' AS target_type,
'{catalog}' AS target_catalog,
'all schemas under this catalog and stage' AS target_schema,
'all tables under this catalog and stage' AS target_table,
'delta' AS target_table_type,
'' AS target_key,
'' AS target_column_names,
'' AS target_filter,
'1' AS regression,
'1' AS active,
'5' AS risk_likelihood,
'5' AS risk_impact,
'1' AS dev,
'1' AS tst,
'1' AS pat,
'1' AS prd,
'{query}' AS query,
'{comment}' AS comment"""
df = spark.sql(test_case_entry)
display(df)
# append to test_repository
df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')
# COMMAND ----------
## start staging schema -- Purpose: Clean and transform raw source data
# COMMAND ----------
# test case 1 -- Purpose: define variables and call the previous function to add tests to test repository
id = "1"
test_name = "ensure table name in staging schema prefixed with __stg_edw_"
comment = "based on standards doc"
stage = "edw_stg"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_stg"
and substring(table_name,1,10) <> "__stg_edw_" """
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#  test case 2 -- Purpose: define variables and call the previous function to add tests to test repository
id = "2"
test_name = "ensures source referred to in table_name matches source referred to in schema_name"
comment = "based on standards doc"
stage = "edw_stg"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_stg"
and substring(table_schema,1,position("_" in table_schema)-1) <> substring(table_name,11,position("_" in substring(table_name,11,100))-1) """
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#latest version of standards say can preserve source naming e.g. _dt_tm if keeping source columns, or not EDW unified modes (?) and not infomart
# so will need to revisit this test
## decision was this is no longer compulosory to have columns datetime columns suffixed wth _aest
# id = "3"
# test_name = "timestamp fields in unified edw are all suffixed with _aest"
# comment = "based on standards doc"
# stage = "edw_stg"
# catalog = "cbi_edw_"+environment
# query = fr"""select table_catalog, table_schema, table_name, column_name, data_type
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_stg"
# and data_type like "TIMESTAMP%"
# and column_name not like "%\_aest" """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#  comment on bug 31369 has prompted removal of this test.  _rls and _metatadata columns not needed on __stg tables
# https://dev.azure.com/CBIProgram/CBI%20Foundation/_workitems/edit/31369
# id = "4"
# test_name = "staging table contains _metadata column"
# comment = "based on standards doc"
# stage = "edw_stg"
# catalog = "cbi_edw_"+environment
# query = fr"""select table_catalog, table_schema, table_name
# from {catalog}.information_schema.tables
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_stg"
# except
# select table_catalog, table_schema, table_name
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_stg"
# and column_name = "_metadata" """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#  comment on bug 31369 has prompted removal of this test.  _rls and _metatadata columns not needed on __stg tables
# https://dev.azure.com/CBIProgram/CBI%20Foundation/_workitems/edit/31369
# id = "5"
# test_name = "staging table contains _rls column"
# comment = "based on standards doc"
# stage = "edw_stg"
# catalog = "cbi_edw_"+environment
# query = fr"""select table_catalog, table_schema, table_name
# from {catalog}.information_schema.tables
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_stg"
# except
# select table_catalog, table_schema, table_name
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_stg"
# and column_name = "_rls" """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "5.5"
test_name = "staging table _metadata contains dbt.modified_ts"
comment = "based on standards doc"
stage = "edw_stg"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_stg"
and column_name = "_metadata"
and full_data_type not like "%dbt:struct<modified_ts:timestamp%"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "6"
test_name = "ensure table name in snowflake schema prefixed with dsf_"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
and substring(table_name,1,4) <> "dsf_" """
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "7"
test_name = "ensure table snowflake schema contains a field starting with bk_"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
and column_name like "bk\_%"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#decision made that no longer a standard
# id = "8"
# test_name = "snowflake table bks only have 1 word"
# comment = "based on standards doc"
# stage = "edw_sf"
# catalog = "cbi_edw_"+environment
# query = fr"""select table_catalog, table_schema, table_name, column_name
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema like "%\_sf"
# and substring(column_name,1,3) = "bk_"
# and substring(column_name,4,len(column_name)) like "%\_%"
#  """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "9"
test_name = "snowflake table contains _rls column"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
and column_name = "_rls"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "10"
test_name = "snowflake table contains _metadata column"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
and column_name = "_metadata"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "10.5"
test_name = "snowflake table _metadata contains dbt.modified_ts"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema like "%\_sf"
and column_name = "_metadata"
and full_data_type not like "%dbt:struct<modified_ts:timestamp%"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "11"
test_name = "ensure table name in core dimensional models with start with d_, b_,f_ or r_"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("cbi","bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and substring(table_name,1,2) not in ("d_","b_","f_","r_") """
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "12"
test_name = "core dimensional table contains _rls column"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and column_name = "_rls"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "13"
test_name = "core dimensional table contains _metadata column"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and column_name = "_metadata"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "13.5"
test_name = "core dimensional _metadata contains dbt.modified_ts"
comment = "based on standards doc"
stage = "edw_sf"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and column_name = "_metadata"
and full_data_type not like "%dbt:struct<modified_ts:timestamp%"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
## checking for specific types in subsequet tests.  e.g. dims have 1, bridges 2
id = "14"
test_name = "core dimensional data entities have at least 1 bk"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and substring(table_name,1,2) in ("d_","b_","f_")
except
select table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and substring(column_name,1,3) = "bk_"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "15"
test_name = "core dimensional dims only have 1 bk"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and substring(table_name,1,2) = "d_"
and substring(column_name,1,3) = "bk_"
group by table_catalog, table_schema, table_name
having count(*) > 1
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "16"
test_name = "core dimensional bridges have 2 bks"
comment = "based on standards doc"
stage = "edw_core_dimensional"
catalog = "cbi_edw_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not like "%\_sf" and table_schema not like "%\_stg"
and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
and substring(table_name,1,2) = "b_"
and substring(column_name,1,3) = "bk_"
group by table_catalog, table_schema, table_name
having count(*) <> 2
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
## decision that this was no longer a standard
# id = "17"
# test_name = "core dimensional bks only have 1 word"
# comment = "based on standards doc"
# stage = "edw_core_dimensional"
# catalog = "cbi_edw_"+environment
# query = fr"""select table_catalog, table_schema, table_name, column_name
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema not like "%\_sf" and table_schema not like "%\_stg"
# and table_schema not in ("bv","bv_s","crds","crds_current","information_schema","pipeline_metadata","rv","rv_md","rv_s")
# and substring(column_name,1,3) = "bk_"
# and substring(column_name,4,len(column_name)) like "%\_%"
# """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
##starting some IM test script creation here until I get an answer on how to identify edw unified tables###
#  deliberatelly starting at a higher id number to differentate the layer (i.e. will be more edw tests to add above here)
# COMMAND ----------
#excluding specific schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "30"
test_name = "timestamp fields in IM are all suffixed with _datetime"
comment = "based on standards doc"
stage = "im"
catalog = "cbi_im_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name, data_type
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref","esm_pbi")
and column_name not in ("dbt_run_ts")
and data_type like "TIMESTAMP%"
and column_name not like "%\_datetime"
and table_schema not in ("{schema_exclusions}")"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "31"
test_name = "date fields in IM are all suffixed with _date"
comment = "based on standards doc"
stage = "im"
catalog = "cbi_im_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name, data_type
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref","esm_pbi")
and table_name not in ("d_date")
and data_type = "DATE"
and column_name not like "%\_date"
and table_schema not in ("{schema_exclusions}") """
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
id = "32"
test_name = "boolean fields in IM are all suffixed with _flag"
comment = "based on standards doc"
stage = "im"
catalog = "cbi_im_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name, data_type
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref","esm_pbi")
and data_type = "BOOLEAN"
and column_name not like "%\_flag"
and table_schema not in ("{schema_exclusions}")"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
## decision is no longer a standard
#excluding schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
# also included know schemas that contain obts
# and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
# decision to be made whether this column dbt_run_ts should exist in obt tables.  leaving here for now
# id = "33"
# test_name = "obt tables includes dbt_run_ts column"
# comment = "based on standards doc"
# stage = "im_obt"
# catalog = "cbi_im_"+environment
# query = fr"""select table_catalog, table_schema, table_name
# from {catalog}.information_schema.tables
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref")
# and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
# except
# select distinct table_catalog, table_schema, table_name
# from {catalog}.information_schema.columns
# where 1=1
# and table_catalog = "{catalog}"
# and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref")
# and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
# and column_name = "dbt_run_ts"
# """
# add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
id = "33.5"
test_name = "obt tables _metadata contains dbt.modified_ts"
comment = "based on standards doc"
stage = "edw_obt"
catalog = "cbi_im_"+environment
query = fr"""select table_catalog, table_schema, table_name, column_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref")
and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
and column_name = "_metadata"
and full_data_type not like "%dbt:struct<modified_ts:timestamp%"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
#excluding schemas here.  once confirmed list, consider have a  temp view to join to rather than repeating this code
# also included know schemas that contain obts
# and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
id = "34"
test_name = "obt tables includes source_system column"
comment = "based on standards doc"
stage = "im_obt"
catalog = "cbi_im_"+environment
query = fr"""select table_catalog, table_schema, table_name
from {catalog}.information_schema.tables
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref")
and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
except
select distinct table_catalog, table_schema, table_name
from {catalog}.information_schema.columns
where 1=1
and table_catalog = "{catalog}"
and table_schema not in ("br","br_s","d","dbt","information_schema","met","ref")
and (substring(table_name,1,4) = "obt_" or table_schema in ("ed","ed_cbi","ed_rt","ed_hiu"))
and column_name = "source_system"
"""
add_to_test_repository(id, test_name, stage, query, comment)
# COMMAND ----------
# hbcis view validation
##hbcis ciew contans _rls and and _metadata fields
# COMMAND ----------
##passing back environment task value to be used for execution in job
dbutils.jobs.taskValues.set(key = "environment", value = environment)
# COMMAND ----------
###analysis beneath here####
###analysis beneath here####
###analysis beneath here####
# COMMAND ----------
# MAGIC %sql
# MAGIC
# MAGIC -- select table_catalog, table_schema, table_name, column_name, full_data_type
# MAGIC -- from cbi_edw_dev.information_schema.columns
# MAGIC -- where 1=1
# MAGIC -- and table_catalog = "cbi_edw_dev"
# MAGIC -- --and table_schema like "%\_stg"
# MAGIC -- and column_name = "_metadata"
# MAGIC -- and full_data_type not like "%dbt:struct<modified_ts:timestamp%"
```