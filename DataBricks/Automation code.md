```python
## should also pass in catalog here and use this in test script creation queries. cbi_im_test or cbi_im_prod
dbutils.widgets.text("project","Synapse to Databricks Migration")
dbutils.widgets.text("IM_Project","ED_Combined")
dbutils.widgets.text("suite_name","IM_data_comparison")

project = dbutils.widgets.get("project")
IM_Project = dbutils.widgets.get("IM_Project")
suite_name = dbutils.widgets.get("suite_name")

release = '1'
```

```sql
--remove STTM entries before reading latest
delete from cbi.test.source_to_target_mapping where module_entity = :IM_Project
```

```python
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
 '/Volumes/cbi/test/reference/STTM\_{IM_Project}.csv',
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
```

```sql
%sql

  

--remove before re-adding latest

  

-- SELECT * FROM cbi.test.test_repository where project = :project and suite_name = :suite_name and Project_Phase = :IM_Project

  

 DELETE FROM cbi.test.test_repository where project = :project and suite_name = :suite_name and Project_Phase = :IM_Project
```
```python
# key_compare not ODS

# not ODS as source

sql = f"""select

cast(seq_row_num + row_number() OVER (ORDER BY target_catalog, target_schema, target_table) as string) as id

, project as project

, module_entity as project_phase

, project_tag as project_tag

, version as release

, '{suite_name}' as suite_name

, 'compare' as test_type

, 'key_compare not ODS' as test_name

, '' as requirement

, stage as stage

, source_type as source_type

, source_catalog as source_catalog

, source_schema as source_schema

, source_table as source_table

, source_table_type as source_table_type

, source_column as source_key

, trim('[]', cast(array_agg(source_column) as string)) as source_column_names --TBD

, source_filter as source_filter

, target_type as target_type

, target_catalog as target_catalog

, target_schema as target_schema

, target_table as target_table

, target_table_type as target_table_type

, target_column as target_key --TBD

, trim('[]', cast(array_agg(target_column) as string)) as target_column_names --TBD

, target_filter as target_filter

  
  

,'' as regression

,'1' as active

,'' as risk_likelihood

,'' as risk_impact

,'' as dev

,'' as tst

,'' as pat

,'' as prd

,concat(

    'with source as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ',source_filter,'), '

   'target as (select ',

    --trim('[]', cast(array_agg(target_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',target_column,') as ',target_column,'')) as string)),

  

    ' from ',

    concat(

      target_catalog,

      '.',

      target_schema,

      '.',

      target_table

    ),

    ' ', target_filter,

    '), ',

    'compare as ( select sum(src) as src, sum(tgt) as tgt, ',

    trim('[]', cast(array_agg(target_column) as string)),

    ' from ( select 1 as src, 0 as tgt, ',

    trim('[]', cast(array_agg(target_column) as string)),

    ' from source union all ',

    'select 0 as src, 1 as tgt, ',

    trim('[]', cast(array_agg(target_column) as string)),

    ' from target ) group by ',

    trim('[]', cast(array_agg(target_column) as string)),

    ' having sum(src) <> sum(tgt) )  select * from compare'

  ) as query

from

  cbi.test.source_to_target_mapping R1

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name) R2

where

  active = '1' and module_entity = '{IM_Project}' and source_table_type <> 'ods' and target_key_flag = '1'

group by

  source_file_path,

  seq_row_num,

  project,

  project_phase,

  project_tag,

  stage,

  source_type,

  source_catalog,

  source_schema,

  source_table,

  source_filter,

  source_table_type,

  --source_column_data_type,

  source_column,

  target_catalog,

  target_schema,

  target_table,

  target_type,

  target_table_type,

  target_filter,

  target_column,

  module_entity,

  version

  

"""

  

df = spark.sql(sql)

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

display(df)
```

```python
# key_compare source is ODS

# ODS as source, so need to consider timestamp from ODS to Staging, but not the other way.

# #  create a union except statement

sql = f"""select

cast(seq_row_num + row_number() OVER (ORDER BY target_catalog, target_schema, target_table) as string) as id

, project as project

, module_entity as project_phase

, project_tag as project_tag

, version as release

, '{suite_name}' as suite_name

, 'compare' as test_type

, 'key_compare source is ODS' as test_name

, '' as requirement

, stage as stage

, source_type as source_type

, source_catalog as source_catalog

, source_schema as source_schema

, source_table as source_table

, source_table_type as source_table_type

, source_column as source_key

, trim('[]', cast(array_agg(source_column) as string)) as source_column_names --TBD

, source_filter as source_filter

, target_type as target_type

, target_catalog as target_catalog

, target_schema as target_schema

, target_table as target_table

, target_table_type as target_table_type

, target_column as target_key --TBD

, trim('[]', cast(array_agg(target_column) as string)) as target_column_names --TBD

, target_filter as target_filter

  
  

,'' as regression

,'1' as active

,'' as risk_likelihood

,'' as risk_impact

,'' as dev

,'' as tst

,'' as pat

,'' as prd

,concat(

    'with source as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ',source_filter,'),

    source_no_filter as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ),

    '

  

   'target as (select ',

    --trim('[]', cast(array_agg(target_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',target_column,') as ',target_column,'')) as string)),

  

    ' from ',

    concat(

      target_catalog,

      '.',

      target_schema,

      '.',

      target_table

    ),

    ' ', target_filter,

    '), ',

  

    'compare as (

(

select * from source

except select * from target

)

union all

(

select * from target

except

select * from source_no_filter

  

)

    )  select * from compare'

  ) as query

from

  cbi.test.source_to_target_mapping R1

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name) R2

where

  active = '1' and module_entity = '{IM_Project}' and source_table_type = 'ods' and target_key_flag = '1'

group by

  source_file_path,

  seq_row_num,

  project,

  project_phase,

  project_tag,

  stage,

  source_type,

  source_catalog,

  source_schema,

  source_table,

  source_filter,

  source_table_type,

  --source_column_data_type,

  source_column,

  target_catalog,

  target_schema,

  target_table,

  target_type,

  target_table_type,

  target_filter,

  target_column,

  module_entity,

  version

  

"""

  

df = spark.sql(sql)

  

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

display(df)
```


```python
# key_and_int_field_compare not ODS

# ODS as source, so need to consider timestamp from ODS to Staging, but not the other way.

# #  create a union except statement

sql = f"""select

cast(seq_row_num + row_number() OVER (ORDER BY target_catalog, target_schema, target_table) as string) as id

, project as project

, module_entity as project_phase

, project_tag as project_tag

, version as release

, '{suite_name}' as suite_name

, 'compare' as test_type

, 'key_and_int_field_compare not ODS' as test_name

, '' as requirement

, stage as stage

, source_type as source_type

, source_catalog as source_catalog

, source_schema as source_schema

, source_table as source_table

, source_table_type as source_table_type

, '' as source_key --TBD

, trim('[]', cast(array_agg(source_column) as string)) as source_column_names --TBD

, source_filter as source_filter

, target_type as target_type

, target_catalog as target_catalog

, target_schema as target_schema

, target_table as target_table

, target_table_type as target_table_type

, '' as target_key --TBD

, trim('[]', cast(array_agg(target_column) as string)) as target_column_names --TBD

, target_filter as target_filter

  
  

,'' as regression

,'1' as active

,'' as risk_likelihood

,'' as risk_impact

,'' as dev

,'' as tst

,'' as pat

,'' as prd

,concat(

    'with source as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ',source_filter,'),

    source_no_filter as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ),

    '

  

   'target as (select ',

    --trim('[]', cast(array_agg(target_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',target_column,') as ',target_column,'')) as string)),

  

    ' from ',

    concat(

      target_catalog,

      '.',

      target_schema,

      '.',

      target_table

    ),

    ' ', target_filter,

    '), ',

  

    'compare as (

(

select * from source

except select * from target

)

union all

(

select * from target

except

select * from source_no_filter

  

)

    )  select * from compare'

  ) as query

from

  cbi.test.source_to_target_mapping R1

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name) R2

where

  active = '1' and module_entity = '{IM_Project}' and source_table_type <> 'ods'

  and target_table in (select target_table from cbi.test.source_to_target_mapping where target_key_flag = '0' and generic_data_type = 'NUMBER')

  and (target_key_flag = 1 or generic_data_type = 'NUMBER')

group by

  source_file_path,

  seq_row_num,

  project,

  project_phase,

  project_tag,

  stage,

  source_type,

  source_catalog,

  source_schema,

  source_table,

  source_filter,

  source_table_type,

  --source_column_data_type,

  target_catalog,

  target_schema,

  target_table,

  target_type,

  target_table_type,

  target_filter,

  --target_column,

  module_entity,

  version

  

"""

  

df = spark.sql(sql)

  

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

display(df)
```

```python
# key_and_timestamp_field_compare not ODS

# ODS as source, so need to consider timestamp from ODS to Staging, but not the other way.

# #  create a union except statement

sql = f"""select

cast(seq_row_num + row_number() OVER (ORDER BY target_catalog, target_schema, target_table) as string) as id

, project as project

, module_entity as project_phase

, project_tag as project_tag

, version as release

, '{suite_name}' as suite_name

, 'compare' as test_type

, 'key_and_timestamp_field_compare not ODS' as test_name

, '' as requirement

, stage as stage

, source_type as source_type

, source_catalog as source_catalog

, source_schema as source_schema

, source_table as source_table

, source_table_type as source_table_type

, '' as source_key --TBD

, trim('[]', cast(array_agg(source_column) as string)) as source_column_names --TBD

, source_filter as source_filter

, target_type as target_type

, target_catalog as target_catalog

, target_schema as target_schema

, target_table as target_table

, target_table_type as target_table_type

, '' as target_key --TBD

, trim('[]', cast(array_agg(target_column) as string)) as target_column_names --TBD

, target_filter as target_filter

  
  

,'' as regression

,'1' as active

,'' as risk_likelihood

,'' as risk_impact

,'' as dev

,'' as tst

,'' as pat

,'' as prd

,concat(

    'with source as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ',source_filter,'),

    source_no_filter as (select ',

    --trim('[]', cast(array_agg(source_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',source_column,') as ',target_column,'')) as string)),

    ' from ',

    concat(

      source_catalog,

      '.',

      source_schema,

      '.',

      source_table

    ),

    ' ),

    '

  

   'target as (select ',

    --trim('[]', cast(array_agg(target_column) as string)),

    trim('[]', cast(array_agg(concat('upper(',target_column,') as ',target_column,'')) as string)),

  

    ' from ',

    concat(

      target_catalog,

      '.',

      target_schema,

      '.',

      target_table

    ),

    ' ', target_filter,

    '), ',

  

    'compare as (

(

select * from source

except select * from target

)

union all

(

select * from target

except

select * from source_no_filter

  

)

    )  select * from compare'

  ) as query

from

  cbi.test.source_to_target_mapping R1

  JOIN (select count(id) as seq_row_num from cbi.test.test_repository where project = project and '{suite_name}' = suite_name) R2

where

  active = '1' and module_entity = '{IM_Project}' and source_table_type <> 'ods'

  and target_table in (select target_table from cbi.test.source_to_target_mapping where target_key_flag = '0' and generic_data_type = 'TIMESTAMP')

  and (target_key_flag = 1 or generic_data_type = 'TIMESTAMP')

group by

  source_file_path,

  seq_row_num,

  project,

  project_phase,

  project_tag,

  stage,

  source_type,

  source_catalog,

  source_schema,

  source_table,

  source_filter,

  source_table_type,

  --source_column_data_type,

  target_catalog,

  target_schema,

  target_table,

  target_type,

  target_table_type,

  target_filter,

  --target_column,

  module_entity,

  version

  

"""

  

df = spark.sql(sql)

  

df.write.format("delta").mode("append").saveAsTable('cbi.test.test_repository')

  

display(df)
```