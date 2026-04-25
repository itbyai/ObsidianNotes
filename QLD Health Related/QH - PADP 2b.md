![[Pasted image 20251215112452.png]]


Summary:
padp 2b project test scope:
test methods:
	databricks - compare the two tables from source to target (sciprts)
test coverage:
test tools: databricks and dbt stuff

I need to list all column test cases like nullability value check etc 

**Questions**
timeline for the whole project: when and what and ready time?
docs

**Docs**
test strategy: [Clinical and Business Intelligence Foundations Projects - Test Strategy - All Documents](https://healthqld.sharepoint.com/sites/qh-pwa/Clinical%20and%20Business%20Intelligence%20Foundations%20Projects/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Fqh%2Dpwa%2FClinical%20and%20Business%20Intelligence%20Foundations%20Projects%2FShared%20Documents%2F14%20Testing%2FCBI%20Test%20Team%20Resources%2FProjects%2FPADP%2FPADP%20%2D%20Phase%202b%2FTest%20Strategy&viewid=b3323b9a%2D299c%2D4464%2D8ddb%2D265bdf9f1fbd&e=5%3Acfa76ec2b4624e688775f2758889afad&sharingv2=true&fromShare=true&at=9&CID=ac193df3%2D673c%2D4467%2Da613%2D83dac2c23c96&FolderCTID=0x012000F8DFD1562EED8543ABBE188DE06C1FED)
requirements: [Requirements Overview for Testers.pptx](https://healthqld.sharepoint.com/:p:/r/teams/HBCISProject-ProjectFiles/_layouts/15/Doc.aspx?sourcedoc=%7B030493EF-9632-4658-B702-0F61D033AE1B%7D&file=Requirements%20Overview%20for%20Testers.pptx&wdOrigin=TEAMS-MAGLEV.null_ns.rwc&action=edit&mobileredirect=true)
any implementation docs?
any process I need to follow?

Scope for the 2b -  Business Views will be created for the following:  - Data Element Requirements needs to be reviewed 
- Patient  -  data items - what data should be included 
- Outpatient  - data items - what data should be included
- Inpatient  - data items - 
- Elective Surgery - data items
need to figure out what data is required.

Types of Reconciliation
record  

ODS data location - cbi_ods_pat has two schema: hbcisprod and hbcistest and cbi_ods_prod has two schema: hbcisprod and hbcistest 

Business view location - cbiprojects_dev.hbcisprod_vw

flaening test result
[HBCIS Patient Administration Data Platform (PADP) - Project Files - Testing hbcisprod_vw - All Documents](https://healthqld.sharepoint.com/teams/HBCISProject-ProjectFiles/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FHBCISProject%2DProjectFiles%2FShared%20Documents%2FProject%20Files%2FPhase%202%2F07%2E%20Technical%20Artefacts%2F02%20Detailed%20Technical%20Design%2FTesting%20hbcisprod%5Fvw&viewid=f4190f35%2D5b41%2D4238%2D96f6%2Dc084abbfd930&e=5%3A91a80f8a050942b6aa081a0827b4fb20&sharingv2=true&fromShare=true&at=9&CID=58b6dd1f%2Dd97c%2D4d04%2D83e7%2D2f85e64489ba&FolderCTID=0x012000E3D759754225804999752858CF42C112 "https://healthqld.sharepoint.com/teams/hbcisproject-projectfiles/shared%20documents/forms/allitems.aspx?id=%2fteams%2fhbcisproject%2dprojectfiles%2fshared%20documents%2fproject%20files%2fphase%202%2f07%2e%20technical%20artefacts%2f02%20detailed%20technical%20design%2ftesting%20hbcisprod%5fvw&viewid=f4190f35%2d5b41%2d4238%2d96f6%2dc084abbfd930&e=5%3a91a80f8a050942b6aa081a0827b4fb20&sharingv2=true&fromshare=true&at=9&cid=58b6dd1f%2dd97c%2d4d04%2d83e7%2d2f85e64489ba&folderctid=0x012000e3d759754225804999752858cf42c112")
---

## 1️⃣ Data Extraction & Ingestion (Left side)

### **PADP 2a Data extraction & ingestion**

**What this does**

- Pulls data from **source systems** (e.g. HBCIS, operational apps)
- Brings data into Databricks **without heavy business logic**
- Usually:
    - Batch jobs
    - Incremental loads
    - Minimal transformations (rename columns, basic typing)

**Output**

- Raw / lightly cleaned data

---

### **PADP Databricks ODS**

**ODS = Operational Data Store**
**Purpose**
- First landing zone in Databricks
- Data is:
    - Close to source
    - Traceable
    - Auditable

**Key characteristics**
- One-to-one with source tables (or close)
- No analytics modelling yet
- Often used as:
    - “Single source of truth” for downstream layers

**Typical tests here**
- Row count reconciliation (source vs ODS)
- Nullability
- Schema match
- Duplicate primary keys

---

## 2️⃣ Reference & Enrichment Data (Middle bottom)

These are **supporting datasets** used during transformation
### **Geocoded addresses**
- Enriches address data
- Converts raw addresses → lat/long, regions, LGA, etc.
### **QMPI**
- Queensland Master Patient Index
- Used to:
    - Resolve patient identity
    - Link multiple records to one person
### **CRDS**
- Clinical / reference datasets
- Standardised codes, classifications, reference values

**Why these exist**

> Transformations rarely use only one source.  
> Business logic almost always needs reference data.

**Typical tests**
- Referential integrity
- Join completeness
- Domain value validation

---

## 3️⃣ 1.1 Transform Data (Core Data Engineering Step)

This is the **heart of the pipeline**.

### **What “Transform” actually means here**

- Clean data
- Apply business rules
- Join multiple sources
- Create analytics-ready structures

**Examples**

- Standardise dates and codes
- Derive new columns (age, length of stay, flags)
- Apply inclusion/exclusion logic
- Resolve duplicates using QMPI
- Enrich with geocoded data

**Input**

- PADP Databricks ODS
- Geocoded addresses
- QMPI
- CRDS

**Output**
- Structured, consistent datasets

> ⚠️ This is where **most defects happen**  
> and where **most testing value exists**

**Typical tests**
- Source → target mapping
- Business rule validation
- Key uniqueness
- Domain & constraint checks

---

## 4️⃣ 1.2 Curate Data (Analytics Readiness)

### **What “Curate” means**
- Shape transformed data for **business use**
- This is where **data modelling** happens

**Common activities**
- Build **fact tables** (events, measures)
- Build **dimension tables** (patient, facility, date)
- Define:
    - Grain
    - Relationships
    - Surrogate keys
- Align with reporting needs
**Output**
- **PADP Business Views**

These are:
- Clean
- Consistent
- Stable
- Designed for BI tools
    

**Typical tests**

- Fact grain validation
- Dimension uniqueness
- Foreign key integrity
- Aggregation correctness

---

## 5️⃣ 1.3 Refresh Business Intelligence Model

### **PADP Self-Service BI Model**
This is what **Power BI / BI tools** connect to.
**What happens**
- BI semantic model is refreshed
- Measures and calculations are re-evaluated
- Dashboards get updated data

**Key point**

- No heavy data logic should live here
- BI should consume **curated data**, not fix it

**Typical tests**

- Row count sanity checks
- Measure consistency
- Regression checks after model changes

---

## 6️⃣ Scheduled, Automated Data Refresh (Far right)

### **What this means**

- Entire pipeline runs automatically:
    - Daily / hourly / scheduled
- Includes:
    - Ingestion
    - Transform
    - Curate
    - BI refresh

**Why this matters**

- Any change upstream can:
    - Break downstream tables
    - Change numbers in reports

This is why:

> 🔁 **Regression testing is critical**

---

## 7️⃣ Why One Model Change Affects Other Tests (Important Insight)

When Mahua mentioned:

> “single model may affect some other testing result”

She meant this:

- Transform model changes →
- Curated views change →
- BI model numbers change →
- Existing tests fail (correctly!

Example
- Change join logic in Transform
- Fewer records flow into fact table
- Row count tests fail
- BI totals change

This is **expected behaviour**, not a bug —  
it signals **impact**, which testing should catch.

---

## 8️⃣ Whole Flow in One Sentence

> **Data is ingested into ODS, enriched with reference data, transformed with business rules, curated into analytics-ready views, and finally consumed by BI models through scheduled refreshes.**

---

## 9️⃣ From a Tester’s Mental Model (Very Useful)

Think in layers:

```
ODS        → completeness & accuracy
Transform  → business rules & mappings
Curate     → modelling & aggregation
BI         → regression & consistency
```

---

Perfect — narrowing the scope like this is **exactly what a good test strategy should do** 👍  
Below is a **clean, PADP-aligned test strategy** that **only covers**:
> **Transform Data → Curate Data → Business Views**
No ingestion, no raw ODS noise — just what your project actually owns.
You can drop this straight into a Test Strategy document.
---

# Test Strategy

## Scope: Transform → Curate → Business Views

---

## 1. In-Scope Layers (Context)

### Transform Data

- Applies business rules and transformation logic
- Joins multiple upstream datasets
- Produces structured intermediate outputs

### Curate Data
- Shapes transformed data into analytics-ready structures
- Builds fact and dimension models
- Enforces modelling standards (grain, keys)

### Business Views

- Provides stable, business-facing views
- Acts as the consumption layer for BI tools

---

## 2. Test Levels Overview

|Test Level|Primary Purpose|
|---|---|
|Unit Testing|Validate individual transformation logic|
|Integration Testing|Validate interactions between datasets|
|System Testing|Validate end-to-end behaviour within scope|
|Regression Testing|Detect unintended changes|
|Data Quality Testing|Enforce data correctness rules|

---

## 3. Test Levels & Scope (Detailed)

---

## 3.1 Unit Testing

### Purpose

Validate **individual transformation logic** in isolation.

### Applies To

- Transform models
- Curate models
- Business view definitions

---

### Test Scope

#### Transform Data

- Column-level transformations
- Business rule calculations
- Filtering logic
- Derived fields

#### Curate Data

- Surrogate key generation
- Fact grain enforcement
- Dimension attributes

#### Business Views

- Column projections
- Simple calculated fields

---

### Example Test Scenarios

- “Age is calculated correctly from DOB”
- “Only active records are included”
- “Business flag logic matches requirement”

---

## 3.2 Integration Testing

### Purpose

Validate **data interactions** between datasets and layers.
### Applies To

- Transform → Curate
- Curate → Business Views

---

### Test Scope

#### Transform Data

- Join correctness between multiple sources
- Referential integrity
- Join cardinality (no row explosion)

#### Curate Data

- Fact ↔ dimension relationships
- Foreign key resolution
- Slowly changing attributes (if applicable)

#### Business Views

- Correct sourcing from curated models
- Join completeness

---

### Example Test Scenarios

- “Every fact record resolves to a valid dimension”
- “No record loss during joins”
- “Join logic does not introduce duplicates”

---

## 3.3 System Testing

### Purpose

Validate that **each layer produces correct, stable outputs**.

### Applies To

- Entire Transform layer    
- Entire Curate layer
- Entire Business Views layer

---

### Test Scope

#### Transform Data

- Source-to-target completeness
- Output schema correctness
- Row count expectations

#### Curate Data

- Aggregation correctness
- Modelling integrity
- Consistent historical behaviour

#### Business Views

- Data consistency across views
- Stable schemas for BI consumption

---

### Example Test Scenarios

- “Row counts align with defined grain”
- “Aggregated totals match transformed data”
- “No unexpected schema changes”

---

## 3.4 Regression Testing

### Purpose

Detect **unintended downstream impact** when changes occur.

### Applies To

- Any model change in Transform or Curate
- Business View refreshes

---

### Test Scope

#### Transform Data

- Impact of logic changes on downstream models
- Business rule drift detection

#### Curate Data

- Fact/dimension structure stability
- Measure stability over time

#### Business Views

- Snapshot comparison between releases
- Metric trend consistency

---

### Example Test Scenarios

- “Key counts unchanged after refactor”
- “Totals remain consistent unless expected”
- “No unintended view breakage”

---

## 3.5 Data Quality Testing

### Purpose

Enforce **trustworthiness and usability** of data.

### Applies To

- All in-scope layers
---

### Test Scope

#### Transform Data

- Nullability
- Domain validation
- Business key uniqueness

#### Curate Data

- Surrogate key uniqueness
- Referential integrity
- Valid dimension values

#### Business Views

- No nulls in mandatory reporting fields
- Consistent domain values

---

### Example Test Scenarios

- “No nulls in business-critical fields”
    
- “Codes conform to allowed values”
    
- “Each business key appears once”
    

---

## 4. Test Coverage Matrix (Quick Reference)

|Test Level|Transform|Curate|Business Views|
|---|---|---|---|
|Unit|✅|✅|✅|
|Integration|✅|✅|✅|
|System|✅|✅|✅|
|Regression|✅|✅|✅|
|Data Quality|✅|✅|✅|

---

## 5. Explicit Out of Scope

- Source system validation
    
- Ingestion pipelines
    
- Raw / ODS data testing
    
- Infrastructure performance testing
    

---

## 6. Testing Focus & Priority

|Priority|Area|
|---|---|
|Highest|Transform business rules|
|High|Curated fact/dimension integrity|
|Medium|Business view stability|
|Lower|Static documentation review|

---

## 7. Strategy One-Line Summary (Very Useful)

> This test strategy focuses on validating business rule correctness, data model integrity, and downstream stability across the Transform, Curate, and Business View layers, with strong emphasis on regression protection and data quality.

---

If you want next, I can:

- Convert this into a **formal Test Strategy document**
    
- Map each test level to **dbt / SQL / Databricks execution**
    
- Help you **justify exclusions (ODS, ingestion) in reviews**
    
- Create **example test cases per layer**



| Test level                                     | Description / Procedures                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Key Resources                                                                                                                            | Entry Criteria                                                                                                                                                             | Exit Criteria                                                                                                                                                       | Testing activities                                                                                                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pre-System / Unit Testing**                  | • Schema validation for transformed, curated and business view datasets (generic schema validation; attributes or fields may vary by site/HHS) • Data mapping validation to ensure correct linkage of data elements from source (ODS / transformed layer) to target (transform / curate tables) • Validation of individual transformation logic including business rules, calculations, filtering logic • Verification that newly generated tables conform to defined schema and mapping rules | • Data mapping / STTM documents • DAS / Data Engineering technical team • Databricks SQL & notebooks • Comparator / reconciliation tools | • Approved data mapping and transformation specifications available • Transform / curate models deployed to test environment • Schema definitions available for validation | • Successful completion of schema validation and data mapping without critical or major defects • All unit-level tests executed • Unit defects resolved or accepted | • Exploratory testing of transform outputs • Manual validation of data mappings • Schema comparison (expected vs actual) • Validation of derived fields and edge cases |
| **Integration Testing**                        | • Validation of data flow between Transform → Curate and Curate → Business Views • Verification of joins, relationships and referential integrity across datasets • Validation that integration logic does not introduce data loss, duplication or incorrect aggregation                                                                                                                                                                                                                       | • Data engineers / modellers • Data modelling documents • Databricks SQL & notebooks • Reference and lookup datasets                     | • Unit testing successfully completed • Transform, curate and business view layers available in test environment • Required reference data accessible                      | • All integration scenarios executed successfully • No unresolved high or critical defects • Join and relationship integrity validated                              | • Join completeness and cardinality checks • Referential integrity validation • Cross-layer data consistency checks • Validation of aggregation across joins           |
| **System Testing**                             | • End-to-end validation of Transform → Curate → Business View pipeline • Verification that system outputs meet functional and data quality expectations • Validation of business rules in a production-like environment                                                                                                                                                                                                                                                                        | • System test environment • Business requirements and data definitions • Databricks workflows / jobs                                     | • Integration testing completed successfully • All components deployed to system test environment • Test data prepared and validated                                       | • All system test cases executed • No critical or high severity defects outstanding • System outputs validated against requirements                                 | • End-to-end data reconciliation • Row count and completeness checks • Validation of business rules across layers • Multi-run stability validation                     |
| **Regression Testing**                         | • Validation to ensure changes to transform or curate logic do not negatively impact existing functionality • Verification that previously validated outputs remain consistent unless changes are expected and approved                                                                                                                                                                                                                                                                        | • Historical datasets or snapshots • Automated regression scripts (where available) • Data engineering and testing teams                 | • Code or logic changes deployed to test environment • Baseline data/results available                                                                                     | • Regression tests completed • No unexpected deviations detected • Approved variances documented                                                                    | • Snapshot comparison (before vs after) • Validation of key metrics and aggregates • Impact analysis on downstream business views                                      |
| **Data Quality Testing**                       | • Validation of data quality rules across transform, curate and business view layers • Enforcement of completeness, accuracy, consistency and validity standards                                                                                                                                                                                                                                                                                                                               | • Data quality rules and standards • dbt tests / SQL validation scripts • Databricks platform                                            | • Defined data quality rules available • Data loaded in test environment                                                                                                   | • All data quality checks executed • No unresolved critical data quality issues • Results reviewed and approved                                                     | • Nullability and completeness checks • Domain and value range validation • Uniqueness and key integrity checks • Cross-layer consistency checks                       |
| **User Acceptance / Business View Validation** | • Validation of business views against reporting and analytics expectations • Confirmation that data is consumable, understandable and fit for business use                                                                                                                                                                                                                                                                                                                                    | • Business stakeholders • BI developers / analysts • Business definitions and KPIs                                                       | • System testing completed successfully • Business views deployed to UAT environment • Business acceptance criteria defined                                                | • Business sign-off obtained • No open critical or high defects • Business views approved for production                                                            | • Validation of KPIs and measures • Cross-checking totals and trends • Filtering and slicing behaviour validation • Business scenario testing                          |





> **Curated data + PADP Business Views → refreshed by Business Intelligence Model → PADP Self-Service BI Model**

I’ll explain:

1. What each layer does
2. What is _actually transformed_ vs _what is just refreshed_
3. A **single running example** you can reuse in docs or meetings

---

## 🧭 Big Picture Flow (Plain English)

```
Curated data (facts & dimensions)
        ↓
PADP Business Views (SQL, stable, reusable)
        ↓
1.3 Refresh Business Intelligence Model
        ↓
PADP Self-Service BI Model (semantic layer)
        ↓
Reports / Dashboards
```

Key idea upfront (very important):

> **Business Views do NOT become the BI model automatically.  
> The BI model is a separate semantic layer that is refreshed from Business Views.**

---

## 🏥 Example Domain: Patient Admissions (PADP)

We’ll use a simple but realistic PADP example.

---

# 1️⃣ Curated Data (Facts & Dimensions)

### What this layer is

- Cleaned
- Modeled
- Analytics-ready
- Owned by **data engineering**
### Example Curated Tables

#### `fact_encounter`

| encounter_id | patient_id | facility_key | admit_date | discharge_date | length_of_stay |
| ------------ | ---------- | ------------ | ---------- | -------------- | -------------- |
| E1001        | P01        | 10           | 2025-01-01 | 2025-01-05     | 4              |
| E1002        | P02        | 10           | 2025-01-02 | null           | null           |

#### `dim_facility`

| facility_key | facility_name  |
| ------------ | -------------- |
| 10           | Royal Brisbane |

These tables are **technically correct but not friendly** for BI users.

---

## 2️⃣ PADP Business Views (SQL Presentation Layer)

### What this layer is

- SQL views
- Built on curated facts & dimensions
- Still **inside Databricks / data platform**
- Owned by **data engineering**
### Purpose
- Hide star-schema complexity
- Provide a **stable contract** to BI
- Reusable by many tools
---
### Example: `vw_padp_encounter`

```sql
create view vw_padp_encounter as
select
  f.encounter_id,
  f.patient_id,
  d.facility_name,
  f.admit_date,
  f.discharge_date,
  f.length_of_stay
from fact_encounter f
join dim_facility d
  on f.facility_key = d.facility_key;
```

### Output of the Business View

| encounter_id | patient_id | facility_name  | admit_date | discharge_date | length_of_stay |
| ------------ | ---------- | -------------- | ---------- | -------------- | -------------- |
| E1001        | P01        | Royal Brisbane | 2025-01-01 | 2025-01-05     | 4              |
| E1002        | P02        | Royal Brisbane | 2025-01-02 | null           | null           |

⚠️ Important:

- Still **no KPIs**
- Still **no RLS**
- Still **no time intelligence**

This is **data**, not analytics yet.

## 1️⃣ “Still **no KPIs**”

### What KPIs are
KPIs are:
- Aggregations (SUM, COUNT, AVG)
- Ratios and percentages
- Calculated metrics
- Business definitions (e.g. LOS, Readmission Rate)
Example KPI:
`Average Length of Stay = Total Bed Days / Total Admissions`
### Why KPIs are NOT in Business Views

#### 1. KPIs depend on **how the user slices the data**
- By date
- By facility
- By department
- By patient cohort

SQL views are **static**:
- They return rows
- They don’t react dynamically to filters

If you put KPIs in SQL views:
- You pre-aggregate
- You lose flexibility
- You get wrong answers in BI
#### 2. KPIs change frequently
- Business definitions evolve
- Finance & clinical definitions change
- Thresholds change

If KPIs were in Business Views:
- Every change would require:
    - Data engineering change
    - Release cycle
    - Regression testing
That kills agility.
### Where KPIs belong instead
👉 **BI semantic model (Power BI / DAX)**
Example:
`Average LOS = AVERAGE(vw_padp_encounter[length_of_stay])`
This allows:
- Dynamic slicing
- Easy updates
- Business ownership

## 2️⃣ “Still **no RLS** (Row-Level Security)”

### What RLS is
RLS controls:
- Which rows a user can see
- Based on user identity
- Based on business rules
Example:
- User A → only Facility X
- User B → all facilities
### Why RLS is NOT in Business Views
#### 1. SQL views don’t know **who the user is**
- Databricks SQL has limited user context
- BI tools know user identity natively
#### 2. RLS is **consumer-specific**
Different consumers may have:
- Different access rules
- Different organisational mappings
Putting RLS in Business Views:
- Couples security to data
- Makes reuse difficult
- Increases risk
#### 3. Security changes often
- Staff movement
- Org structure changes
- Role changes
You don’t want to redeploy data views for that.
### Where RLS belongs instead
👉 **BI semantic model**
Example (Power BI):
`vw_padp_encounter[facility_name]   IN VALUES(UserFacility[facility_name])`
## 3️⃣ “Still **no Time Intelligence**”
### What time intelligence is
Time intelligence includes:
- Year-to-date (YTD)
- Month-to-date (MTD)
- Rolling 12 months
- Period-over-period comparison
### Why Time Intelligence is NOT in Business Views
#### 1. Time intelligence is **context-aware**
It depends on:
- Selected date
- Selected period
- Fiscal calendar
SQL views:
- Return fixed rows
- Cannot react to user selections
#### 2. Fiscal calendars vary
- Financial year vs calendar year
- Health-specific reporting periods
Hardcoding this in SQL:
- Locks you into one definition
- Breaks flexibility
### Where Time Intelligence belongs instead
👉 **BI semantic model**
Example:
`Admissions YTD = TOTALYTD(   [Total Admissions],   'Date'[Date] )`
## 3️⃣ Step 1.3 – Refresh Business Intelligence Model

This is the step many people misunderstand.
### What “refresh” means here

- Power BI (or similar) **re-reads data** from `vw_padp_encounter`
- Caches it in the BI semantic model
- Recalculates measures
- Applies security

❗ **No SQL transformation happens here**

---
### What triggers refresh
- Schedule (e.g. every morning)
- Manual refresh
- After upstream data pipeline completes
---
## 4️⃣ PADP Self-Service BI Model (Semantic Layer)

### What this layer is
- Power BI Dataset (or equivalent)
- Built **on top of Business Views**
- Owned by **BI / Analytics team**
- Enables **self-service**
---
### What gets added here (this is the “transformation”)

#### 🔢 Measures (DAX)

```DAX
Total Admissions =
COUNT(vw_padp_encounter[encounter_id])

Average Length of Stay =
AVERAGE(vw_padp_encounter[length_of_stay])
```

#### 🔐 Row-Level Security (example)

```DAX
vw_padp_encounter[facility_name] =
LOOKUPVALUE(
  UserFacility[facility_name],
  UserFacility[user_email],
  USERPRINCIPALNAME()
)
```

#### 🧠 Relationships & Time Intelligence
- Date tables
- Year-to-date
- Month-over-month trends

---
### What the BI Model now provides
- Business metrics
- Secure access
- Fast query performance
- Consistent definitions
---
## 5️⃣ Reports / Dashboards

Now business users:
- Build reports
- Filter by facility
- Trust KPIs
- Don’t write SQL

Example visuals:
- Total admissions by hospital
- Average LOS trend
- Discharged vs not discharged
---

# 🔍 Key Differences (Very Clear)

|Layer|What changes data values?|What adds meaning?|
|---|---|---|
|Curated data|✅ Yes|Technical meaning|
|Business Views|❌ No|Structural clarity|
|BI Model refresh|❌ No|Triggers update|
|BI Model (semantic)|❌ No (raw values)|✅ Business meaning|

---

# 🧠 One-Sentence Summary (Perfect for Docs)

> Curated data is exposed through PADP Business Views as stable SQL interfaces, which are then consumed and refreshed by the Business Intelligence Model to generate the PADP Self-Service BI Model containing measures, security, and analytics logic.

---
# 🧪 Testing Implication (Bonus – very useful)

- **Curated + Business Views** → tested with SQL (data correctness)
- **BI Model refresh** → tested for success & schema compatibility
- **Self-Service BI Model** → tested for KPI correctness & RLS
### Two important questions


I’ll answer in **two parts**:

1️⃣ **Without Power BI, how do we test the Self-Service BI Model?**  
2️⃣ **Chinese translation of the sentence**

---

## 1️⃣ Without Power BI, how do we test the Self-Service BI Model?

First, an important clarification:

> **If Power BI (or another BI tool) does not exist yet, you cannot fully test the “Self-Service BI Model”**  
> because the BI model **lives inside the BI tool**.

However 👉 **you _can_ test everything that _enables_ the Self-Service BI Model**.  
In practice, this is how mature teams do it.

---
### What “Self-Service BI Model” actually consists of

|Part|Where it lives|
|---|---|
|Data structure|Curated tables|
|Data exposure|Business Views|
|KPIs / Measures|BI semantic layer|
|RLS|BI semantic layer|
|Time intelligence|BI semantic layer|

Without Power BI:
- ❌ No DAX
- ❌ No dataset
- ❌ No report visuals

But:
- ✅ Data readiness
- ✅ Metric correctness (logic)
- ✅ Security logic (design level)
- ✅ Contract stability

**can still be tested.**

---

## ✅ What you CAN test without Power BI

### 1️⃣ Test **BI-readiness of Business Views** (most important)

This answers:

> “Can a BI model be safely built on this data?”
#### Example tests
- One row per business grain
- No duplicates
- No missing keys
- Stable schema

```sql
-- Grain test
select encounter_id, count(*)
from vw_padp_encounter
group by encounter_id
having count(*) > 1;
```

Expected: **0 rows**
### 2️⃣ Test KPI logic using SQL (BI-equivalent logic)

Even without Power BI, **every KPI can be validated in SQL**.
#### Example: Total Admissions

```sql
select count(*) as total_admissions
from vw_padp_encounter;
```

This validates:
- Metric logic
- Data completeness
- Aggregation correctness

Later, Power BI must match this number.

---

### 3️⃣ Test Time-based logic using SQL windows

Before DAX exists, validate time logic in SQL.

```sql
select
  year(admit_date) as year,
  count(*) as admissions
from vw_padp_encounter
group by year(admit_date);
```

This ensures:
- Dates are correct
- Time slicing will work

---

### 4️⃣ Test RLS logic conceptually (design-level test)

Without Power BI:
- You **cannot enforce RLS**
- But you **must validate RLS rules are possible**
#### Example

```sql
select *
from vw_padp_encounter
where facility_name = 'Royal Brisbane';
```

This confirms:
- Facility column exists
- Can be used later in RLS rules

This is called **RLS design validation**, not enforcement.

---

### 5️⃣ Contract & Regression Testing (very important)

Self-service BI depends on **schema stability**.

```sql
describe vw_padp_encounter;
```

Validate:

- Column names unchanged
- Data types unchanged
- No breaking changes

This prevents BI model breakage later.

---

## ❌ What you CANNOT test without Power BI

Be very clear about this in test strategy:

|Item|Why|
|---|---|
|DAX measures|Do not exist|
|RLS enforcement|Requires BI engine|
|Visual interactions|No reports|
|Performance in BI|Different engine|

These are **out of scope until BI exists**.

