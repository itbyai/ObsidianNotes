

> [!NOTE] Functions
> count all view/tables under specific schema and count all rows for each table/view



```databricks
#catalog="cbi_ods_pato"
#schema="esm"
# catalog="cbi_syn_tds"
catalog="cbi_ods_pat"
#schema="im_esm_f"
#schema="im_esm_d"
#schema="im_esm_f_i"
# schema="im_esm_d_i"
# schema="iemrprod_v500"
# schema="ipharmacyprod_prd_dbo"
# schema="crdsprod_datown"
# schema="satrddhhsprod_satown"
# schema="satrprod_cbiusr"
# schema="satrschhsprod_satown"
# schema="satrprod_satown"
schema="hbcisprod_vw"
# schema="epadtprod_dbo"
# schema="swadcsprod_dbo"
where_clause = "1=1"
# where_clause = "_rescued_data is not null and _rescued_data not like '%file_path%'"
# where_clause = "_rescued_data is not null"
# where_clause = "facility_code not in (select distinct fclty_id from cbi_ods_prod.crdsprod_datown.rd_facility_details where district_name = 'SUNSHINE COAST')"
```

```databricks
sql = f"""select concat('select "{catalog}" as catalog, "',table_schema,'" as table_schema, "',table_name,'" as table_name, count(*) as rowcount from {catalog}.',table_schema,'.',table_name, ' where '"{where_clause}") as sql_statement
from {catalog}.information_schema.tables
where table_schema = '{schema}' and table_type <> "VIEW" """
# listg all views table  
df = spark.sql(sql)
display(df)
# df.createOrReplaceTempView("sql_counts")
```

```databricks
# execute each of the previousbly dynamically created sql and append to a results dataframe
# df.colletc() - python list
get_counts = [(row.sql_statement) for row in df.collect()]
results = spark.createDataFrame([], schema='catalog string, table_schema string, table_name string, hbcis_instance string, hhs_rls string')
# the reason to create dataframe is to union
for row in get_counts:
    df1 = spark.sql(row)
    results = results.union(df1)
```