Below is a **clear, practical, Databricks-native way** to do  
**Cross-Model / Cross-Domain Reconciliation testing** — written so you can lift it straight into a **QA Test Plan, PADP-style**, or turn it into automated SQL jobs.

---

# What is Cross-Model / Cross-Domain Reconciliation?

It answers this question:

> **Does the _same business fact_ reconcile across different models or domains that are built independently?**

This is **consistency QA**, not transformation QA.

Typical examples:

- ODS vs IM vs Gold
    
- Clinical domain vs Finance domain
    
- Encounter fact vs Activity fact
    
- Patient counts in two marts that should align
    

---

# 1️⃣ What to Reconcile (Test Types)

## A. Count Reconciliation (most common)

|Scenario|Example|
|---|---|
|Same entity|Encounter count in `clinical` vs `reporting`|
|Same slice|Daily counts by HHS|
|Same grain|Episode-level vs episode-level|

---

## B. Measure Reconciliation

|Measure|Example|
|---|---|
|SUM|Total bed days|
|AVG|Average LOS|
|MIN / MAX|Date ranges|

---

## C. Key Coverage Reconciliation

|Check|Example|
|---|---|
|Missing keys|Encounter exists in model A but not B|
|Extra keys|Model B has orphan records|

---

## D. Domain Boundary Reconciliation

|Domain A|Domain B|
|---|---|
|Clinical|Finance|
|Activity|Billing|
|Patient admin|Reporting mart|

---

# 2️⃣ Core Reconciliation Patterns (Databricks SQL)

All examples assume **Databricks SQL** (works the same in notebooks or SQL Warehouses).

---

## Pattern 1: Row Count Reconciliation (Basic)

### Step 1 – Define comparable scope

```sql
-- Clinical model
select count(*) as cnt
from clinical.fct_encounter
where encounter_date = '2026-01-28';
```

```sql
-- Reporting model
select count(*) as cnt
from reporting.fct_encounter
where encounter_date = '2026-01-28';
```

### Step 2 – Compare

```sql
select
  a.cnt as clinical_cnt,
  b.cnt as reporting_cnt,
  a.cnt - b.cnt as diff
from clinical_cnt a
cross join reporting_cnt b;
```

📌 **Pass**

```
diff = 0
```

📌 **Fail**

```
abs(diff) > tolerance
```

---

## Pattern 2: Grouped Reconciliation (HHS / Date)

```sql
select
  coalesce(a.hhs_code, b.hhs_code) as hhs_code,
  a.cnt as clinical_cnt,
  b.cnt as reporting_cnt,
  a.cnt - b.cnt as diff
from (
  select hhs_code, count(*) cnt
  from clinical.fct_encounter
  group by hhs_code
) a
full outer join (
  select hhs_code, count(*) cnt
  from reporting.fct_encounter
  group by hhs_code
) b
on a.hhs_code = b.hhs_code
where coalesce(a.cnt, 0) != coalesce(b.cnt, 0);
```

📌 **Fail condition**

- Any row returned
    

---

## Pattern 3: Key-Level Reconciliation (EXCEPT)

This is **the most powerful test**.

```sql
-- Keys in clinical but missing in reporting
select encounter_id
from clinical.fct_encounter
except
select encounter_id
from reporting.fct_encounter;
```

```sql
-- Keys in reporting but not in clinical
select encounter_id
from reporting.fct_encounter
except
select encounter_id
from clinical.fct_encounter;
```

📌 **Fail**

- Any returned rows (unless documented exceptions)
    

---

## Pattern 4: Measure Reconciliation (SUM / AVG)

```sql
select
  a.total_los as clinical_los,
  b.total_los as reporting_los,
  a.total_los - b.total_los as diff
from (
  select sum(length_of_stay) as total_los
  from clinical.fct_encounter
) a
cross join (
  select sum(length_of_stay) as total_los
  from reporting.fct_encounter
) b;
```

📌 **Tolerance-based pass**

```
abs(diff) <= threshold
```

---

## Pattern 5: Cross-Domain Reconciliation (Different Models)

Example: **Clinical Encounters vs Finance Billing**

```sql
select
  a.encounter_id
from clinical.fct_encounter a
left join finance.fct_billing b
  on a.encounter_id = b.encounter_id
where b.encounter_id is null;
```

📌 Interpretation:

- Not necessarily an error
    
- Must match **documented business rules**
    

---

# 3️⃣ Handling Legitimate Differences (Critical)

Not all mismatches are defects.

You **must document reconciliation rules**:

|Difference Type|Handling|
|---|---|
|Timing lag|Acceptable within N days|
|Filtering|Documented exclusion|
|Grain mismatch|Aggregate before compare|
|Late arriving data|Reconcile over rolling window|

---

## Rolling Window Example (recommended)

```sql
where encounter_date between current_date() - 7 and current_date()
```

This avoids false positives.

---

# 4️⃣ Automation Pattern (Production-Ready)

## A. Reconciliation Result Table

Create a table like:

|run_date|test_name|domain_a|domain_b|diff|status|
|---|---|---|---|---|---|
|2026-01-28|encounter_count|clinical|reporting|0|PASS|

---

## B. Fail Logic

```sql
case
  when abs(diff) > threshold then 'FAIL'
  else 'PASS'
end
```

---

## C. Alerting

- Databricks Jobs fail on `FAIL`
    
- SQL Alerts notify teams
    
- Results visible to QA & stakeholders
    

---

# 5️⃣ How to Write This as a Test Case

### Test Case: Cross-Model / Cross-Domain Reconciliation

|Field|Value|
|---|---|
|Test Type|Reconciliation|
|Tool|Databricks SQL|
|Scope|Clinical vs Reporting|
|Grain|Encounter|
|Metrics|Count, keys, measures|
|Window|Rolling 7 days|
|Pass Criteria|Differences within tolerance|
|Fail Criteria|Missing keys or excess variance|

---

# 6️⃣ Key Messaging (Very Important)

Use this sentence with stakeholders 👇

> **Cross-model reconciliation does not assert correctness of a single model; it ensures consistency of business facts across independently built domains.**

This positions the test as:

- Non-threatening
    
- Governance-driven
    
- Essential for trust
    
