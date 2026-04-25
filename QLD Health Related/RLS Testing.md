
> [!NOTE] How to check RLS Test report
> Check RLS Test result
> 

Check test result
```databricks
%sql
select * from cbi.test.test_results_log where run_id = '975457012082658' and result != 'Pass'
```


```databricks
%sql
select count(*) from (SELECT distinct _rls.hhs.rls FROM
     cbi_ods_pat.hbcisprod_vw.adl_type_code__adl_sub_type_v
     where not(ARRAY_CONTAINS(_rls.hhs.rls, "SCHHS")) AND not(ARRAY_CONTAINS(_rls.hhs.rls, "ALL"))) having count(*) <> 0
```

execute test cases with where clause:
 ```databricks
 project = 'PADP' and suite_name = 'rls_ods_pat'
 ```

how to find ssl information from view
```databricks
%sql
SELECT distinct _rls.hhs.rls FROM    cbi_ods_pat.hbcisprod_vw.adl_type_code__adl_sub_type_v
```

check the rls information from 
```databricks
%sql
SELECT distinct _rls.hhs.rls FROM cbi_ods_pat.hbcisprod.adm_cancel
```

PADP

7x24 

high level - 3 kinds  
business view
star schema
power bi - using star schema to represent data

ODS - replica of production data  
end day - complete refresh - every hour we need to look 
during day - incremental
from test point of view what we need to do - incremental test - 
delete/change some thing - > downstream doesn't know the change(or not necessary) ->

materialise the 

change the view mean change the code 

questions:
representation is correct or not?
how many layers - from the picture - are they correct?
which is table and which view?
table and view

1. the transform rule - specification - where to find it() model - check it    EDR -  data element requirements
2. rls 
3. do we have any docs for tasks in each layers?    
4. staging tables - ?
5. edw
6. star schema is based on the business view or a part of 


test result:



| Test ID | Scenario                                             | Pre-conditions (Group Memberships)                                  | Test method                                                                          | run-id                                                                                                                                                                                                     | Expected Access/Behavior                                           | Test Result 🛑 |
| ------- | ---------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------- |
| TS-001  | **Statewide group only**                             | User ∈ `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD`; User ∉ any HHS groups | query all views row count with my privilege account and novel account, they are same | manual testing with this script [nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895)    | row count are same for each view                                   | Pass           |
| TS-002  | **0 groups (no membership)**                         | User ∉ statewide; User ∉ HHS                                        | query all views row count                                                            | manual testing with this script<br>[nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895) | Access denied or zero rows returned                                | Pass           |
| TS-003  | **More than 1 HHS group**                            | User ∈ 2+ HHS groups (e.g., `SCHHS`, `MWHHS); User ∉ statewide      | query all views row count with my privilege account and novel account, they are same | manual testing with this script<br>[nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895) | row count are same for each views                                  | Pass           |
| TS-013  | RLS is in NWHHS group and User is in  WMHHS group    | User ∈ `NWHHS`,                                                     | `_rls` include `WMHHS`                                                               | 213400236510762                                                                                                                                                                                            | Access denied                                                      | Pass           |
| TS-014  | **RLS is in SCHHS group and User is in SCHHS group** | User ∈ `SCHHS`                                                      | `_rls` include `SCHHS`                                                               | 975457012082658                                                                                                                                                                                            | Full access                                                        | Pass           |

How to set user to statewide group?
How to set to multiple group?
`_rls` includes 


| Test ID | Scenario                                             | run-id                                                                                                                                                                                                       | Test Result 🛑 |
| ------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| TS-001  | **Statewide group only**                             | manual testing with this script [nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895)      | Pass           |
| TS-002  | **0 groups (no membership)**                         | manual testing with this script  <br>[nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895) | Pass           |
| TS-003  | **More than 1 HHS group**                            | manual testing with this script  <br>[nb_get_counts_for_schema - Databricks](https://adb-212645264149012.12.azuredatabricks.net/editor/notebooks/209787642143776?o=212645264149012#command/5902405890610895) | Pass           |
| TS-04   | RLS is in NWHHS group and User is in WMHHS group     | 213400236510762                                                                                                                                                                                              | Pass           |
| TS-05   | **RLS is in SCHHS group and User is in SCHHS group** | 975457012082658                                                                                                                                                                                              | Pass           |