
nb_get_counts_for_schema to test if rls filed has been populated correctly







%sql

SET lg_number = 9

select `PADP Table` as Target_Table_Name

,`PADP Column` as Target_column_Name

,`Data Type` as source_data_type

,case when `Data Type` in ('A','X','ZZZ') then 'string'

when `Data Type` in ('N','N2','N4') then 'double'

when `Data Type` in ('B') then 'boolean'

when `Data Type` in ('D') then 'date'

when `Data Type` in ('T') then 'int'

else 'not_classified' end as target_data_type

  

from screen_file_mapping

left join tab_not_in_ods_with_reason on tab_not_on_ods = `PADP Table`

where 1=1

and  tab_not_on_ods is null

and cast(Attribute as decimal(10)) >= 1

and concat(`PADP Table`, "|", `PADP Column`) not in ("patients|birth_sex")

and `PADP Table` not in (select padp_table from tab_excluded_from_multi_value)

and `Related Values` in ('M{lg_number}')

--and `PADP Table` in ('pds_model')


exception - 1
```
#########   important    ####

#########   important    ####

#########   important    ####

## these exception were put together in Dec 2024 and Jan 2025 for PADP Phase 1.  

### These are no longer valid for Phase 2a, as we now could be getting data for any of these tables

  

sql = """

select 'accruals_error' as tab_not_on_ods, 'reportal no records found' as reason union

select 'adm_address_hist' as tab_not_on_ods, 'reportal no records found' as reason union

select 'adm_clin_subprogram' as tab_not_on_ods, 'reportal no records found' as reason union

select 'adm_discharge_notes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'adm_programs' as tab_not_on_ods, 'reportal no records found' as reason union

select 'adm_rehabilitation' as tab_not_on_ods, 'reportal no records found' as reason union

select 'alt_structure' as tab_not_on_ods, 'reportal no records found' as reason union

select 'asr_bulk_movements' as tab_not_on_ods, 'reportal no records found' as reason union

select 'asr_revaluation' as tab_not_on_ods, 'reportal no records found' as reason union

select 'asr_revaluation_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'asr_stocktake' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'budget_audit' as tab_not_on_ods, 'reportal no records found' as reason union

select 'budget_vars' as tab_not_on_ods, 'reportal no records found' as reason union

select 'budget_vars_audit' as tab_not_on_ods, 'reportal no records found' as reason union

select 'cons_account_variations' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_budget_officer' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_control_account' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_journals_summary' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_patient_fees' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_receipt_summary' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_stats_summary' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_transaction_summary' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_trial_class' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'cons_trial_fund' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'credvar' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_balances' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_category' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_cheque_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_history' as tab_not_on_ods, 'reportal no records found' as reason union

select 'crs_manual_cheques' as tab_not_on_ods, 'reportal no records found' as reason union

select 'csh_receipt_db' as tab_not_on_ods, 'reportal no records found' as reason union

select 'csh_receipt_gl' as tab_not_on_ods, 'reportal no records found' as reason union

select 'csh_receipt_ip' as tab_not_on_ods, 'reportal no records found' as reason union

select 'csh_receipt_mb' as tab_not_on_ods, 'reportal no records found' as reason union

select 'csh_receipt_nh' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_cat_audit' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'debt_day_band_classes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_drg_adjustments' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_drg_charges' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_drg_history' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_funds_theatre_rebate' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_monetary_scale_rebate' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_overdue_status' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'debt_procedure_level' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'debt_procedures' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_status_history' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_time_scale' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_time_scale_rebate' as tab_not_on_ods, 'reportal no records found' as reason union

select 'del_credtrans' as tab_not_on_ods, 'reportal no records found' as reason union

select 'del_invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'department' as tab_not_on_ods, 'reportal no records found' as reason union

select 'deposits' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'distrib_models' as tab_not_on_ods, 'reportal no records found' as reason union

select 'division' as tab_not_on_ods, 'reportal no records found' as reason union

select 'eas_notes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'eft_overtime' as tab_not_on_ods, 'reportal no records found' as reason union

select 'equip' as tab_not_on_ods, 'reportal no records found' as reason union

select 'fax_orders' as tab_not_on_ods, 'reportal no records found' as reason union

select 'faxed_orders' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_activity' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_aging_error' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_bank' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_cost_alloc' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_eoy_journal' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_error_feed' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_mlcpay_control' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_mlcpay_entity' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_mlcpay_hospital' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_mlcpay_invalid' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_mlcpay_status' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_mlcpay_type' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'gls_policy' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_program_area' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_receipt' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_redirect_audit' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_standing_journal' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_sub_prog_comp' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_sub_program' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_accom_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_indigenous_status' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_legal_status_codes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_pat_cat_codes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_ref_care_codes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hosp_ref_doc_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hpmi_merge_msgs' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hqi_adm_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'hqi_hd_adm_type' as tab_not_on_ods, 'on Not Included Files table with reason of Reviewed' as reason union

select 'hqi_hd_country' as tab_not_on_ods, 'reportal no records found' as reason union

select 'imprest_replacement' as tab_not_on_ods, 'reportal no records found' as reason union

select 'inclus_exclus' as tab_not_on_ods, 'reportal no records found' as reason union

select 'invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'ivm_invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'job' as tab_not_on_ods, 'reportal no records found' as reason union

select 'management' as tab_not_on_ods, 'reportal no records found' as reason union

select 'models' as tab_not_on_ods, 'reportal no records found' as reason union

select 'municipality' as tab_not_on_ods, 'reportal no records found' as reason union

select 'os_invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'os_porders' as tab_not_on_ods, 'reportal no records found' as reason union

select 'patbal' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'patfees' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'pds_dependency' as tab_not_on_ods, 'reportal no records found' as reason union

select 'phs_routes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'phs_unit_template' as tab_not_on_ods, 'reportal no records found' as reason union

select 'phs_unprocessed_labels' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'phs_ward_drugs' as tab_not_on_ods, 'reportal no records found' as reason union

select 'preparation' as tab_not_on_ods, 'reportal no records found' as reason union

select 'program' as tab_not_on_ods, 'reportal no records found' as reason union

select 'rad_bill_codes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'rad_merges' as tab_not_on_ods, 'reportal no records found' as reason union

select 'rcheques' as tab_not_on_ods, 'reportal no records found' as reason union

select 'rec_comp_code_sets' as tab_not_on_ods, 'reportal no records found' as reason union

select 'rec_wies_excl' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'sds_debtor_category' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_overdue_status' as tab_not_on_ods, 'reportal no records found' as reason union

select 'ser_accounting_periods' as tab_not_on_ods, 'reportal no records found' as reason union

select 'ser_stock_interface' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'service' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stock_audit_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stock_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stock_group_audit_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stock_issues' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stock_postings' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sup_interface_status' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sup_qgfms_cc' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'sup_qgfms_errors' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'sup_qgfms_expense' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'sup_qgfms_run' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'sup_qgfms_transmitted' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'supplier_contract_audit_type' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason union

select 'supplier_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'tac_pos_errors' as tab_not_on_ods, 'reportal no records found' as reason union

select 'tac_pos_trans' as tab_not_on_ods, 'reportal no records found' as reason union

select 'transfer_type' as tab_not_on_ods, 'reportal no records found' as reason union

select 'unaccepted_invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'unfaxed_orders' as tab_not_on_ods, 'reportal no records found' as reason union

select 'uninv_del' as tab_not_on_ods, 'reportal no records found' as reason union

select 'unmatched_invoices' as tab_not_on_ods, 'reportal no records found' as reason union

select 'unsent_edi_order' as tab_not_on_ods, 'reportal no records found' as reason union

select 'ytd_file' as tab_not_on_ods, 'on Not Included Files table with reason of Map' union

select 'bank_chqs' as tab_not_on_ods, 'reportal no records found' as reason union

select 'book_banks' as tab_not_on_ods, 'reportal no records found' as reason union

select 'cheques' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_interface_table' as tab_not_on_ods, 'reportal no records found' as reason union

select 'debt_summary' as tab_not_on_ods, 'reportal no records found' as reason union

select 'eft' as tab_not_on_ods, 'reportal no records found' as reason union

select 'gls_fin_sub_range' as tab_not_on_ods, 'reportal no records found' as reason union

select 'phs_fd_daily' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_fin_resp' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_journal' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_journal_codes' as tab_not_on_ods, 'reportal no records found' as reason union

select 'sds_refund' as tab_not_on_ods, 'reportal no records found' as reason union

select 'special_projects' as tab_not_on_ods, 'reportal no records found' as reason union

select 'stop_cheques' as tab_not_on_ods, 'reportal no records found' as reason union

select 'ward_group' as tab_not_on_ods, 'reportal no records found' as reason  union

select 'pledger_eom_save' as tab_not_on_ods, 'File Notes have as Not Extracted' as reason union

select 'adm_acas_status' as tab_not_on_ods, 'File Notes have as Not Extracted' as reason union

select 'adm_bed_control_idx' as tab_not_on_ods, 'File Notes have as Not Extracted' as reason union

select 'test_file' as tab_not_on_ods, 'test file on data dictionary' as reason union

select 'No Table in VLOOKUP' as tab_not_on_ods, 'on Not Included Files table with reason of Map' as reason

  
  

"""

df = spark.sql(sql)

display(df)

df.createOrReplaceTempView('tab_not_in_ods_with_reason')
```

```
# not in ods with reason

##  for phase 2a - setting table exclusions table back to empty table

sql = """

select 'new_table' as tab_not_on_ods, 'Prangya confirmed no records found in reportal' as reason union

select 'new_table' as tab_not_on_ods, 'new reason' as reason

"""

df = spark.sql(sql)

display(df)

df.createOrReplaceTempView('tab_not_in_ods_with_reason')
```

```\\qh.health.qld.gov.au\Apps\CBI\Data\PADP
```

```
manually removed this part
lineSep => "\r",
```


Screen-File Mapping_05032026.csv

remove and attribute <> 'BY.PATIENT"' from 54
![[Pasted image 20260323114157.png]]
