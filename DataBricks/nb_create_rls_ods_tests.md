
> [!NOTE] Functions
> use user a-xiaof to swith novel account to different group then  run the test script in databricks to check if anything show to prove that the result is expected or not.
> 



```python
# Databricks notebook source

#  focus is regression here. uncommon scenarios such as multiple groups, will be done manually

#  this will be for hhe happy path of 1 user in an hhs entra group (which will be passed in as a parameter)

#  intent is this to source agnostic

#  initially this will be looking at ODS data, using the same lookup logic that exists in Synapse (e.g. org_id to hhs)

#  need requirements to beyong ods to get expected results

  

## for tests directly on ods using _rls field, will information schema to drive these tests

  

# COMMAND ----------

  
  

suite_name = 'rls_ods'

  

# COMMAND ----------

  

dbutils.widgets.text("project","")

dbutils.widgets.text("project_phase","")

dbutils.widgets.text("release","")

dbutils.widgets.text("hhs","")

dbutils.widgets.text("catalog","")

dbutils.widgets.text("environment","pat")

dbutils.widgets.text("suite_name","rls_ods")

  

project = dbutils.widgets.get("project")

project_phase = dbutils.widgets.get("project_phase")

release = dbutils.widgets.get("release")

hhs = dbutils.widgets.get("hhs")

catalog = dbutils.widgets.get("catalog")

environment = dbutils.widgets.get("environment")

suite_name = dbutils.widgets.get("suite_name")

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC -- Delete tests from test_repository - avoid duplicates and get latests tests

# MAGIC -- DELETE FROM cbi.test.test_repository where project = :project and suite_name = 'rls_ods'

# MAGIC -- appending environment to have different test suites for pat and prod

# MAGIC DELETE FROM cbi.test.test_repository where project = :project and suite_name = concat(:suite_name,'_',:environment)

# MAGIC

# MAGIC --select * from cbi.test.test_repository where project = :project and suite_name = concat(:suite_name,'_',:environment)

# MAGIC

# MAGIC --select * FROM cbi.test.test_repository where project = :project and suite_name = 'rls_ods'

  

# COMMAND ----------

  

suite_name = 'rls_ods'+'_'+environment

  

# COMMAND ----------

  

# get metadata -- use this as consistent view of metadata.  consider creating a view in cbi.test

# and union any user facing IM table

sql = f"""select

"Synapse to Databricks Migration" as Project, "ODS" as stage, ods_table_catalog as table_catalog, ods_table_schema as table_schema, ods_table_name as table_name

,case when rls.load_config_id is not null then 1 else 0 end as rls_flag

from cbi_metadata_{environment}.cbi_gen3.load_config lc

left join cbi_metadata_{environment}.cbi_gen3.databricks_schema ds on ds.databricks_schema_id = lc.ods_databricks_schema_id

left join cbi_metadata_{environment}.cbi_gen3.rls_table_config rls on rls.load_config_id = lc.load_config_id

where 1=1

and rls.load_config_id is not null

and ods_table_name not in ('SW_QHPIMS_Imprest_Lists') -- descoped

union all

select "Synapse to Databricks Migration", "IM", "cbi_im_test", "ed_cbi","ed_combined","1"

union all

select "PADP", "ODS_VIEW",table_catalog, table_schema, table_name, "1" from cbi_ods_{environment}.information_schema.tables where table_schema = 'hbcisprod_vw'

"""

  

df = spark.sql(sql)

display(df)

  

df.createOrReplaceTempView("tables_in_scope")

  

# COMMAND ----------

  

# get metadata -- use this as consistent view of metadata.  consider creating a view in cbi.test

# sql = f"""select

# ods_table_catalog, ods_table_schema, ods_table_name

# ,case when rls.load_config_id is not null then 1 else 0 end as rls_flag

# from cbi_metadata_{environment}.cbi_gen3.load_config lc

# left join cbi_metadata_{environment}.cbi_gen3.databricks_schema ds on ds.databricks_schema_id = lc.ods_databricks_schema_id

# left join cbi_metadata_{environment}.cbi_gen3.rls_table_config rls on rls.load_config_id = lc.load_config_id

# where 1=1

# and rls.load_config_id is not null

# and ods_table_name not in ('SW_QHPIMS_Imprest_Lists') -- descoped

# """

  

# df = spark.sql(sql)

# display(df)

  

# df.createOrReplaceTempView("tables_in_scope")

  

# COMMAND ----------

  
  

#generated fron information schema

#   happy path

##  return 1 distinct hhs

  

from pyspark.sql.functions import row_number

  
  

sql = f"""select

cast(seq_row_num + row_number() over (order by table_catalog, table_schema, table_name) as string) as id

, '{project}' as project

, '{project_phase}' as project_phase

, '{release}' as release

, '{suite_name}' as suite_name

, 'security' as test_type

, '1 distinct hhs for entra group' as test_name

, '' as requirement

, stage

, '' as source_type

, '' as source_catalog

, '' as source_schema

, '' as source_table

, '' as source_table_type

, '' as source_key

, '' as source_column_names --TBD

, '' as source_filter

, 'delta' as target_type

, table_catalog as target_catalog

, table_schema as target_schema

, table_name as target_table

, '' as target_table_type

, '' as target_key --TBD

, '_rls' as target_column_names --TBD

, '' as target_filter

  
  

,'1' as regression

,'1' as active

,'5' as risk_likelihood

,'5' as risk_impact

,'1' as dev

,'1' as tst

,'1' as pat

,'1' as prd

,concat(

    'select count(*) from (SELECT distinct _rls.hhs.rls FROM

     ',

    concat(

      table_catalog,

      '.',

      table_schema,

      '.',

      table_name

    ), '

     where ARRAY_CONTAINS(_rls.hhs.rls, "{hhs}") and NOT(ARRAY_CONTAINS(_rls.hhs.rls, "ALL")) and size(_rls.hhs.rls) = 1) having count(*) > 1'

  ) as query,

  'rls testing' as comment

from

  tables_in_scope

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name)

  where project = '{project}'

"""

  

df = spark.sql(sql)

  

display(df)

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

  

# COMMAND ----------

  
  

#generated fron information schema

#   not expecting any other hhs in rls row

  

from pyspark.sql.functions import row_number

sql = f"""select

cast(seq_row_num + row_number() over (order by table_catalog, table_schema, table_name) as string) as id

, '{project}' as project

, '{project_phase}' as project_phase

, '{release}' as release

, '{suite_name}' as suite_name

, 'security' as test_type

, '0 rows returned for hhs outside of entra group' as test_name

,'' as requirement

, stage

, '' as source_type

, '' as source_catalog

, '' as source_schema

, '' as source_table

, '' as source_table_type

, '' as source_key

, '' as source_column_names --TBD

, '' as source_filter

, 'delta' as target_type

, table_catalog as target_catalog

, table_schema as target_schema

, table_name as target_table

, '' as target_table_type

, '' as target_key --TBD

, '_rls' as target_column_names --TBD

, '' as target_filter

  
  

,'1' as regression

,'1' as active

,'5' as risk_likelihood

,'5' as risk_impact

,'1' as dev

,'1' as tst

,'1' as pat

,'1' as prd

,concat(

    'select count(*) from (SELECT distinct _rls.hhs.rls FROM

     ',

    concat(

      table_catalog,

      '.',

      table_schema,

      '.',

      table_name

    ), '

     where not(ARRAY_CONTAINS(_rls.hhs.rls, "{hhs}")) AND not(ARRAY_CONTAINS(_rls.hhs.rls, "ALL"))) having count(*) <> 0'

  ) as query,

  'rls testing' as comment

from

  tables_in_scope

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name)

  where project = '{project}'

"""

  

df = spark.sql(sql)

display(df)

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

  

# COMMAND ----------

  

#### analysis beneath here ####

#### analysis beneath here ####

#### analysis beneath here ####

#### analysis beneath here ####

#### analysis beneath here ####

#### analysis beneath here ####

  

# COMMAND ----------

  

# MAGIC %sql

# MAGIC select * from cbi.test.test_repository where project = 'PADP' and suite_name = 'rls_ods_pat'
```