Below is a **clean, structured, detailed explanation** of what RLS means in your project context, along with **what to test, how creation works, how execution works, and what manual scenarios to run**.\ This is written specifically for **data engineering teams implementing RLS across Synapse + Databricks**, incorporating your terminology (mapping tables, `_rls` columns, AD/Entra groups, notebooks for test execution).

---

# 🌐 **2.4 RLS — Detailed Explanation**

## **What is RLS?**

RLS (**Row-Level Security**) is a security mechanism that restricts which rows a user can see in a dataset, based on:

- the user’s **identity** (e.g., their domain/novell account),
- their **group membership** (Entra AD / security groups),
- and the applied **mapping rules** (e.g., user belongs to a specific HHS region, hospital, facility, or statewide access group).

RLS ensures that:

- A user from _HHS Region A_ cannot see data that belongs to _HHS Region B_.
- A statewide user can see _all rows_.
- A user assigned to multiple HHS groups should see the _union_ of allowed data.
- Data platforms (Synapse, Databricks, Power BI, downstream APIs) consistently enforce the _same_ filtering logic.

---

# 🔍 **3 Main Areas to Test**

RLS testing must confirm that the correct data is visible to the right users. Your project breaks that into **three required test categories**:

---

## **1 — Mapping Tests (Lookup Tables & Assigned RLS Values)**

### **Purpose**

Ensure that the **value-to-HHS/facility mapping** is correct.\ This mapping determines which rows a user is allowed to see.

### **What to test**

- Lookup tables correctly map **source-level values → HHS → Facility**.
- Every permissible value from the source is mapped.
- No missing values, no invalid mappings, no duplicates.
- Ensure mapping aligns with Gen 3 requirements.

### **Examples**

- Source "Region_Code = 02" maps to "HHS North".
- Source "Facility_ID = X123" maps to "Facility ABC".

### **Where tests run**

- Mapping created and validated using **adhoc tests** during development.
- Mapping logic exists in:
    - Synapse views (e.g., filtering by region/facility)
    - Databricks `_rls` columns (e.g., `_rls = ['HHS_NORTH']`)

---

## **2 — Logic Tests (Table / Row‑Level Filtering Logic)**

### **Purpose**

Ensure that the **actual filtering logic** applied at the row level behaves identically in both platforms.

### **Platforms & Behavior**

- **Synapse** uses **views** with filtering logic embedded.
- **Databricks** uses an **`_rls` column** that contains allowed values.

RLS logic = _User can only see rows where their allowed groups intersect with the row’s allowed RLS values._

### **What to test**

- `_rls` column is generated correctly (Databricks).
- Synapse views apply equivalent logic.
- Logic matches mapping (1-to-1 alignment).
- RLS blocks/returns rows correctly for:
    - single HHS group users
    - multiple HHS group users
    - statewide users
    - users with _no group membership_
    - rows containing special flags such as `ALL`

### **Example**

Row has `_rls = ['HHS_NORTH', 'HHS_SOUTH']`\ User belongs to group `HHS_SOUTH` → **row must be visible**\ User belongs to group `HHS_WEST` → **row must be hidden**

---

## **3 — User‑Level Tests (Entra AD / Group Membership)**

### **Purpose**

To verify that the **AAD group membership** drives RLS correctly in real execution.

### **Mechanics**

Users gain access via specific **Entra (Azure AD) groups**, for example:

- `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD`\ → This contains the novell accounts of test users.

This group is then placed into:

- Statewide group
- HHS groups
- Other combinations

### **What to test**

- Correct access when the tester is in **exactly 1 HHS group**
- Correct access when in **multiple HHS groups**
- Correct access when in **statewide**
- No access when **in 0 groups**

### **Key rule**

Execution testing must be performed **under the user account** assigned to the group, because RLS policies check the authenticated user identity at query time.

---

# 🏗️ **Creation Process (How RLS Is Set Up)**

### ✔ Step 1 — Finalise Mapping

- Agree on mapping rules for each source.
- Populate lookup tables (HHS/facility mapping).
- Validate through **adhoc mapping tests** (ensuring coverage and correctness).

### ✔ Step 2 — Create RLS Logic

Two implementations must behave identically:

1. **Synapse:** Apply row-level filters in **views**.
2. **Databricks:** Populate the `_rls` column with allowed region/facility/HHS values.

Both must use the **same mapping tables** to avoid divergence.

### ✔ Step 3 — Configure User-Level Access

- Add test users to AD group:\ `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD`
- Framework can create required test groups:\ `nb_create_rls_ods_tests`
- Assign groups to statewide / HHS groups depending on scenario.

---

# ▶️ **Execution Process (How Tests Run)**

### **A. Run Mapping & Logic Tests**

Use the notebook:

```
nb_exec_tests_concurrent
```

Pass the suite name via:

```
where_clause parameter
```

Example:

where_clause__="suite_name = 'rls_mapping_tests'"

### **B. Run User-Level Tests**

Must be executed **as the actual user** whose account is placed in the AD group:

- The tester logs in using their novell identity.
- RLS policies dynamically apply based on group membership.

This validates the _real runtime behavior_ of RLS in production.

---

# 🧪 **Manual RLS Test Scenarios**

These ensure end-to-end behavior is correct.

### ✔ **1. Statewide Only**

- Add:\ `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD → statewide group`
- Expected: user can see all rows.

---

### ✔ **2. Zero Groups**

- User belongs to **no HHS groups** and **not statewide**.
- Expected: user sees **0 rows**.

---

### ✔ **3. More Than One HHS Group**

- Assign user to multiple groups, e.g. `HHS_NORTH` & `HHS_SOUTH`.
- Expected: user sees rows belonging to **both groups**.

---

### ✔ **4. Statewide + One HHS Group**

- User placed in statewide and 1 HHS group.
- Expected: statewide overrides → **full access**.

---

### ✔ **5. Rows where `_rls` = `ALL`**

- Row tagged as `ALL` should be visible to:
    - Statewide users
    - Any HHS user
- Ensure no suppression happens.

---

# 📁 **Reference Material**

### Gen 3 Requirements SharePoint

Contains:

- High-level RLS requirements
- Detailed requirements per source

### Testing Artefacts Repository

Contains:

- TPSRs (Test Plan & Scenario Reports)
- Test data
- Expected outputs
- Mapping documents
- Notebook references (nb_create_rls_ods_tests, nb_exec_tests_concurrent)

---

# ✔️ If you want, I can also prepare:

✅ A diagram showing mapping → logic → user-level RLS\ ✅ Example SQL for Synapse views\ ✅ Example `_rls` generation logic for Databricks\ ✅ A complete RLS test matrix table

Just tell me!

Awesome—let’s turn your RLS requirements into a **clear, measurable coverage matrix**.  
Below you’ll find:

1. **Coverage Dimensions** (what we must cover)
2. **Scenario Catalog** (all test scenarios with IDs)
3. **Per‑Source Coverage Tracker** (tick‑box style)
4. **Execution Status Log** (to capture run results/evidence)
5. **Coverage Metrics & Formulas** (how to measure)
6. **Roll‑Up Dashboard** (what to report at a glance)

> Scope reflects your stack and process: **Synapse views**, **Databricks `_rls` columns**, **Entra/AAD groups**, **mapping tables**, and your test notebooks (`nb_create_rls_ods_tests`, `nb_exec_tests_concurrent`).

---

## 1) Coverage Dimensions

We’ll measure coverage across **three pillars** and **two platforms**:

- **Pillar A – Mapping**: value → HHS/facility lookups, completeness, duplicates, drift
- **Pillar B – Logic**: row/table filters; parity between **Synapse views** and **Databricks `_rls`**
- **Pillar C – User level**: effective permissions via Entra groups; identity-driven behavior

**Platforms**:

- **Synapse** (views)
- **Databricks** (`_rls` column, notebooks)

**User cohorts**:

- Statewide
- Zero groups
- Single HHS
- Multiple HHS
- Statewide + HHS
- Special flag rows (`_rls` contains `ALL`)

---

## 2) Scenario Catalog (Authoritative List)

Use these IDs in your notebooks and reports.

### A. Mapping Scenarios (MP*)

|ID|Scenario|Purpose|Data Requirement|
|---|---|---|---|
|**MP-01**|Full mapping coverage|Every source value maps to an HHS/facility|Sample covering all distinct codes|
|**MP-02**|Unmapped value detection|Unmapped values are blocked/flagged|Inject at least 1 unmapped value|
|**MP-03**|Duplicate/conflict mapping|Conflicting rows in lookup are rejected|Create duplicate key in lookup|
|**MP-04**|Invalid HHS/facility code|Reject/flag invalid target|Include one invalid target|
|**MP-05**|Effective-dated mapping|Honor start/end dates (if applicable)|Same key with overlapping dates|
|**MP-06**|Drift detection|Detect new source codes over time|Time‑phased test data|
|**MP-07**|Referential integrity|All foreign keys resolve to mapping|FK set with NULL and bad refs|

### B. Logic Scenarios (LG*)

_Confirm parity across **Synapse (views)** and **Databricks (`_rls`)**._

|ID|Scenario|Purpose|Platform|
|---|---|---|---|
|**LG-01**|Single group allow|Row visible when `_rls` intersects user HHS|Both|
|**LG-02**|Multi group allow (union)|User sees union of all assigned HHS rows|Both|
|**LG-03**|Zero groups deny|User with no groups sees 0 rows|Both|
|**LG-04**|Statewide allow all|Statewide users see all rows|Both|
|**LG-05**|Statewide + HHS|Statewide supersedes; still all rows|Both|
|**LG-06**|`_rls` contains `ALL`|Row visible to any HHS and statewide|Both|
|**LG-07**|Case sensitivity/format|Normalized matching (`HHS_NORTH` vs `hhs_north`)|Both|
|**LG-08**|Null/empty `_rls`|Handle NULL/empty `_rls` safely (deny)|Both|
|**LG-09**|Mixed row sets|Dataset with mixed `_rls` values|Both|
|**LG-10**|Parity check|Synapse view result == Databricks result|Cross‑platform|
|**LG-11**|Incremental loads|RLS correct on newly landed partitions|Both|
|**LG-12**|Historical rows|RLS correct on backfilled history|Both|
|**LG-13**|Performance guardrail|Filters use predicate push‑down / partitions|Both|

### C. User-Level Scenarios (UL*)

_Tests must run as the **actual user** placed in the right Entra groups._

|ID|Scenario|Group Setup|Expected|
|---|---|---|---|
|**UL-01**|Statewide only|Place `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD` into **statewide**|All rows visible|
|**UL-02**|Zero groups|Remove from all HHS/statewide groups|0 rows|
|**UL-03**|One HHS|Add to **exactly one** HHS group|Only that HHS rows|
|**UL-04**|More than 1 HHS|Add to **2+** HHS groups|Union of both/all|
|**UL-05**|Statewide + 1 HHS|In statewide and one HHS|All rows|
|**UL-06**|`_rls` = ALL rows|Any group|ALL rows visible as per flag|
|**UL-07**|Disabled or stale account|Temporarily disable account|Access denied|
|**UL-08**|Propagation delay|Re-test shortly after group change|Document expected latency behavior|

---

## 3) Per‑Source Coverage Tracker (Checklist)

Use one table per **source** (e.g., each ODS/STG dataset). Replace `{source}` with the actual source name.

|Field|{source}|
|---|---|
|Owner||
|Test Suite Name||
|Environments|DEV / TEST / PROD|
|Mapping Coverage (MP-01…07)|☐ MP-01 ☐ MP-02 ☐ MP-03 ☐ MP-04 ☐ MP-05 ☐ MP-06 ☐ MP-07|
|Logic Coverage – Synapse (LG-01…13)|☐ LG-01 ☐ LG-02 ☐ LG-03 ☐ LG-04 ☐ LG-05 ☐ LG-06 ☐ LG-07 ☐ LG-08 ☐ LG-09 ☐ LG-10 ☐ LG-11 ☐ LG-12 ☐ LG-13|
|Logic Coverage – Databricks (LG-01…13)|☐ LG-01 ☐ LG-02 ☐ LG-03 ☐ LG-04 ☐ LG-05 ☐ LG-06 ☐ LG-07 ☐ LG-08 ☐ LG-09 ☐ LG-10 ☐ LG-11 ☐ LG-12 ☐ LG-13|
|User‑Level (UL-01…08)|☐ UL-01 ☐ UL-02 ☐ UL-03 ☐ UL-04 ☐ UL-05 ☐ UL-06 ☐ UL-07 ☐ UL-08|
|Special Data Flags Present|`_rls`=ALL ☐ / NULLs ☐ / invalid codes ☐ / backfill ☐|
|Evidence Links||
|Last Review Date||

---

## 4) Execution Status Log (All Runs)

Populate from `nb_exec_tests_concurrent` and manual runs. One row per run.

|Date/Time|Env|Source|Pillar|Scenario ID|Runner (User)|Where/How|Where Clause / Params|Result|Rows Seen / Stats|Evidence (link)|Defect ID|
|---|---|---|---|---|---|---|---|---|---|---|---|
|2026‑01‑23 10:12|TEST|ODS_Claims|Logic|LG‑10|novell\alice.tan|Cross: Synapse vs DBX|`suite='rls_parity'`|PASS|124,113 vs 124,113|PBIX/CSV/nb cell||
|2026‑01‑23 10:30|TEST|ODS_Claims|User|UL‑03|novell\bob.lee|Manual as user|N/A|FAIL|Expected 12,345; got 10,112|Screen + query|DEF‑4321|

**Notes**

- **Mapping & logic tests**: run via `nb_exec_tests_concurrent` with `where_clause="suite_name='<your_suite>'"`.
- **User‑level tests**: must be executed **under the user identity** that sits in `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD` and then assigned to the target Entra groups for the scenario.

---

## 5) Coverage Metrics & Formulas

Define these once and compute per **source** and **overall**.

### A. Scenario Coverage

- **Mapping Coverage %** = `(# of MP scenarios executed & passed) / (total MP scenarios)`
- **Logic Coverage – Synapse %** = `(# of LG (Synapse) executed & passed) / 13`
- **Logic Coverage – Databricks %** = `(# of LG (DBX) executed & passed) / 13`
- **User Coverage %** = `(# of UL scenarios executed & passed) / 8`

### B. Parity Score

- **Parity Pass Rate %** = `LG‑10 passes / LG‑10 total runs`  
    (Counts only cross‑platform equality checks.)

### C. Scenario Outcome Quality

- **First‑Pass Yield (FPY)** = `# Passed on first attempt / # Executed`
- **Defect Density** = `# Defects logged / # Scenarios executed`

### D. Execution Health

- **On‑Time Execution %** = `# runs completed within SLA window / # scheduled runs`
- **Re‑run Rate %** = `# re‑runs / # total runs`

> **Thresholds (example targets)**
> 
> - Mapping ≥ **95%**
> - Logic (each platform) ≥ **95%**
> - User ≥ **100%** (since risk is high)
> - Parity ≥ **99%**

---

## 6) Roll‑Up Coverage Dashboard (Example)

|Source|Mapping %|Logic (Synapse) %|Logic (DBX) %|User %|Parity %|FPY %|Open Defects|Last Run|
|---|---|---|---|---|---|---|---|---|
|ODS_Claims|100|92|92|100|98|90|2|2026‑01‑23|
|STG_Visits|100|100|100|100|100|100|0|2026‑01‑23|
|IM_Patients|86|95|95|100|99|94|1|2026‑01‑22|
|MART_Activity|100|100|100|100|100|100|0|2026‑01‑23|

---

## 7) Sample “All Scenarios per Source” Table (Ready to Fill)

Create one comprehensive table per source to both **plan** and **record** outcomes:

|Source|Env|Pillar|Scenario ID|Scenario Name|Preconditions (Groups / Data)|Steps (Synapse / Databricks / User)|Expected Result|Status|Evidence Link|Defect|
|---|---|---|---|---|---|---|---|---|---|---|
|{source}|TEST|Mapping|MP‑01|Full mapping coverage|Latest lookup deployed|Run suite `rls_mapping_full`|100% of distinct source codes mapped|☐|||
|{source}|TEST|Mapping|MP‑02|Unmapped detection|Inject unmapped code|Run suite `rls_mapping_negative`|Unmapped flagged/blocked|☐|||
|{source}|TEST|Logic|LG‑01|Single group allow|User in HHS_NORTH only|Synapse view / DBX `_rls`|Only HHS_NORTH rows visible|☐|||
|{source}|TEST|Logic|LG‑10|Parity check|Same filters both platforms|Compare counts & hashes|Results equal|☐|||
|{source}|TEST|User|UL‑02|Zero groups|Remove from all groups|Execute as user|0 rows|☐|||
|…|…|…|…|…|…|…|…|…|…|…|

> Tip: For **LG‑10 Parity**, record **row counts**, **checksum/hash of PK set**, and (optionally) a **sample diff** if mismatch occurs.

---

## 8) Where to Store

- **Gen 3 Requirements SharePoint**
    - Maintain this scenario catalog and per‑source trackers here (same place as high‑level + detailed requirements).
- **Testing Artefacts repo**
    - Store TPSRs, generated evidence (CSV snapshots, notebook HTML/PDF exports, PBIX screenshots), and parameterized `where_clause` presets.

---

## 9) How to Run (Quick Reference)

- **Create test users/groups**: `nb_create_rls_ods_tests`
- **Execute suites concurrently**: `nb_exec_tests_concurrent` with `where_clause="suite_name='<suite>'"`
- **User‑level**: Log in **as the tester** whose novell account sits in `AAD-CBI-ROLE-CBI-NOVELL_TESTER-PROD`, then place that AD group into the target Entra groups for each scenario.

---

## Would you like this as a ready‑to‑use Excel/CSV?

If you want, I can generate a **.xlsx** workbook with:

- A “Scenario Catalog” sheet (pre-filled IDs)
- A “Per‑Source Tracker” template
- An “Execution Log” sheet
- A “Dashboard” sheet with formulas

Say the word and I’ll create the file for you.