Below is a **clean, professional, and easy-to-use explanation of “Test Levels”** for your **Test Strategy** — specifically tailored for **data engineering / PADP / HBCIS migration projects**.

You can copy this directly into your Test Strategy document.

---

# ⭐ **Test Levels (for Test Strategy)**

Test levels describe **how testing is structured**, from developer-level checks to full end-to-end system validation.  
Each level has a different purpose, different responsibility, and different scope.

For a data platform project like PADP, the recommended test levels are:

1. **Unit Testing**
2. **Component Testing / Model-Level Testing**
3. **Integration Testing (Data Pipeline Integration)**
4. **System Testing (Layer-by-Layer Testing)**
5. **End-to-End Testing**
6. **User Acceptance Testing (UAT)**
7. **Non-Functional Testing** (Performance, RLS/security, Reliability)

Below is a detailed breakdown.

---

# 🟦 **1. Unit Testing (Developer-Level Testing)**

### **Purpose:**

Verify correctness of individual SQL logic, dbt macros, transformations, and functions.
### **Performed by:**
Developers (Data Engineers)
### **Examples:**

- SQL logic validation
- dbt unit tests on Jinja macros
- Testing one calculation rule
- Testing one mapping rule
- Testing one CTE in isolation

### **Tools:**

dbt unit testing framework, Databricks SQL, Python unit tests (if used)

---

# 🟩 **2. Component / Model-Level Testing (Model Validation)**

### **Purpose:**

Validate a single dbt model or table **in isolation**, including metadata rules.
### **Performed by:**

Developers + Data Test Engineers
### **Examples:**

- `unique` tests
- `not_null` tests
- schema tests
- metadata tests
- column-level mapping validations

### **Tools:**

dbt generic tests, dbt singular tests, Databricks SQL

---

# 🟧 **3. Integration Testing (Data Pipeline Integration)**

### **Purpose:**

Ensure different tables, models, and stages of the pipeline work correctly when integrated.

### **Performed by:**

Data Test Engineers

### **Examples:**

- ODS → Business Views → Self Service layer flow
- Lookup joins and reference data
- Ensuring model dependencies compile and run
- Validating relationship rules

### **Tools:**

dbt build with lineage, state:modified runs, Databricks comparison queries

---

# 🟨 **4. System Testing (Layer-by-Layer Testing)**

### **Purpose:**

Validate the **entire data platform**, including pipeline logic, completeness, transformations, and security.

### **Performed by:**

Data Test Engineers

### **Testing Layers:**

1. **ODS Layer**
2. **Business Views Layer**
3. **Self Service Layer**

### **Examples:**

- Completeness across layers
    
- Business-rule validation
    
- Mapping accuracy
    
- RLS (Row-Level Security)
    
- Freshness
    
- Conformed logic
    
- Schema consistency
    

### **Tools:**

dbt, Databricks SQL, Comparator, dashboards, metadata-driven tests

---

# 🟪 **5. End-to-End Testing**

### **Purpose:**

Validate the **full flow from source (HBCIS) → PADP → downstream consumers**.

This is essential in your HBCIS → PADP project.

### **Performed by:**

Data Test Engineers + BAs

### **Examples:**

- Create/update a patient in HBCIS → verify data appears in PADP
    
- Admission, discharge, transfer scenarios
    
- Episodes, comorbidities, accommodations
    
- Verify legacy extracts vs PADP outputs
    
- Compare against MAR, HQI, NOB reporting requirements
    

### **Tools:**

HBCIS test environment  
Comparator  
PADP (ODS/BV/Self-Service)  
Downstream extracts or Power BI

---

# 🟫 **6. User Acceptance Testing (UAT)**

### **Purpose:**

Ensure the solution meets business needs and reporting requirements.

### **Performed by:**

Business representatives (HHS, SSB, clinical coders)

### **Examples:**

- Check self-service reports
    
- Validate ABF fields
    
- Validate MAR / HQI / NOB values
    
- Business rule validation with SMEs
    
- Sign-off for production release
    

---

# 🟫 **7. Non-Functional Testing (NFR Testing)**

### **Purpose:**

Ensure the platform meets performance, security, and reliability requirements.

### **Types:**

1. **Performance testing**
    
    - Query speed
        
    - Pipeline run duration
        
2. **Security testing**
    
    - RLS correctness by HHS
        
    - User access & permissions
        
3. **Operational testing**
    
    - Error handling
        
    - Retry logic
        
4. **Resilience testing**
    
    - Pipeline restarts
        
    - Data recovery ability
        

### **Performed by:**

Data Test Engineers + Platform Engineers

---

# ⭐ **Final Summary: Test Levels Overview Table**

|Test Level|Purpose|Who Performs|Examples|
|---|---|---|---|
|**Unit Testing**|Validate small pieces of logic|Developers|SQL logic, macros|
|**Component (Model) Testing**|Validate individual models/tables|Devs + Testers|Not null, unique, mapping|
|**Integration Testing**|Validate table-to-table flows|Test Engineers|ODS → BV joins|
|**System Testing**|Validate whole PADP pipeline|Test Engineers|Completeness, business rules, RLS|
|**End-to-End Testing**|Validate source → PADP → downstream|Testers + BA|HBCIS action → PADP → reports|
|**UAT**|Business sign-off|Business users|Checking reports & fields|
|**Non-Functional Testing**|Validate performance & security|Testers + Platform team|RLS, performance, reliability|

---

Great — let’s explain the **data engineering test levels using realistic, concrete examples**, especially ones relevant to your world:

**HBCIS → PADP (ODS → Business Views → Self-Service → Downstream Reporting).**

This explanation will make it 100% clear how each test level differs **from normal software testing** and how it applies **specifically to data pipelines**.

---

# ⭐ **1. Unit Testing (Developer-Level Logic Testing)**

### **Purpose:** test small logic pieces before they become full models.

### 🔹 Example (HBCIS → PADP)

Developer writes a macro:

```sql
{% macro convert_hbcis_date(hbcis_raw_date) %}
  to_date(hbcis_raw_date, 'YYYYDDD')
{% endmacro %}
```

### ✔ Unit Test Example

Developer writes a test:

Input → Output  
`2024123` → `2024-05-02`  
`2023365` → `2023-12-31`

### Tools

- dbt unit testing
- Python/PyTest (optional)

🟦 **This is similar to software “function-level testing.”**

---

# ⭐ **2. Component Testing (dbt Model-Level Testing)**

### **Purpose:** test one dbt model/table in isolation.

### 🔹 Example Model

ODS table: `ods_visit`

### ✔ Component Test Examples

1. **Unique test**  
    `visit_id` must be unique.
2. **Not null test**  
    `patient_uic` cannot be null.
3. **Accepted values**  
    `gender` ∈ {M, F, U}
4. **Relationship test**  
    `patient_uic` must exist in `ods_patient`.
### Tools

- dbt generic tests (`unique`, `not_null`, etc.)

🟦 Equivalent to testing one “module/class” in software testing.

---

# ⭐ **3. Integration Testing (Pipeline Integration Testing)**

### **Purpose:** Test that multiple models work together properly.

### 🔹 Example

Business View: `bv_encounter`  
Depends on:

- `ods_visit`
- `ods_patient`
- `ods_comorbidity`
- lookup tables

### ✔ Integration Test Examples

1. **Joins produce the correct number of records**  
    If `ods_visit` has 1000 visits, `bv_encounter` should not suddenly drop to 870.
2. **Lookup transformations work**  
    `M` → `Male`, `F` → `Female`
3. **Relationship test across layers**  
    Every `encounter` must match a `patient`.
4. **Column merging logic**  
    Check that multiple loop values (1.0, 2.0, 3.0) map correctly.

### Tools

- dbt `ref()` lineage
- dbt build
- Databricks SQL comparisons

🟦 This is “API integration testing” in software, but for **tables and transformations**.

---

# ⭐ **4. System Testing (ODS → BV → SS Full Layer Testing)**

### **Purpose:** Validate the entire data platform logic **as a whole**.

### 🔹 Example Scenario

Load 10 new admissions in HBCIS test instance.

### ✔ System Test Examples

#### **ODS Layer**

- Are all 10 admissions present in ODS? (Completeness)
- Does ODS date format convert correctly?
- Are keys unique?
#### **Business Views**

- Does LOS (length of stay) calculate correctly?
- Does “admission type” map correctly?
- Does ABF episode logic apply correctly?

#### **Self-Service**

- HHS users can see only their data (RLS)
- Derived fields match business rules
- Queryable for reporting teams

### Tools

- dbt generic tests
- custom SQL comparisons
- Databricks notebooks
- Comparator

🟦 Equivalent to “System Testing” in software, but here the system = **entire data pipeline**.

---

# ⭐ **5. End-to-End Testing (Source → PADP → Output)**

### **Purpose:** Validate that _real business workflows_ produce correct end results.

### 🔹 Example Scenario

Create a patient + admission in HBCIS test environment:

1. Register patient in HBCIS
2. Admit the patient
3. Add comorbidity
4. Add accommodation change

Then check results through PADP.

### ✔ End-to-End Test Examples

- Does the new patient appear in PADP ODS?
- Do admission details appear in Business Views?
- Do LOS & episode-level metrics compute correctly?
- Does the patient appear in Self-Service reports?
- Does downstream MAR/HQI extract match expectations?

Tools:

- HBCIS UI
- PADP/Databricks
- Power BI or extract files

🟦 Equivalent to business workflow testing in software, but here the "workflow" is **data movement + transformation**.

---

# ⭐ **6. User Acceptance Testing (UAT)**

### **Purpose:** Business users validate that data output meets their reporting needs.

### 🔹 Example

HHS reporting team checks:

- ABF fields correctness
- MAR report alignment
- NOB extract alignment
- PICQ coding quality
- SODC/ESDC activity data

### ✔ UAT Test Examples

- Compare PADP output to legacy extracts
    
- Validate business-rule fields:
    
    - episode_type
    - visit_count
    - census counts
- Validate Power BI metrics
- Validate real use cases from business

🟦 Equivalent to UAT in software, but focused on **data & reports**.

---

# ⭐ **7. Non-Functional Testing (NFR)**

### **Purpose:** Validate platform readiness.

### ✔ RLS Security Example

Metro South user must not see Gold Coast patients.

### ✔ Performance Example

Queries on `self_service_encounter` must run < 5 sec.

### ✔ Resilience Example

Pipeline re-runs after failure should produce same results.

🟦 Similar to NFR in software, but applied to **data performance and security**.

---

# ⭐ **FINAL SUMMARY — All Test Levels with Examples**

|Level|Example|
|---|---|
|**Unit Testing**|Test date conversion macro returns correct dates|
|**Component Testing**|`visit_id` unique in ODS table|
|**Integration Testing**|ODS → BV join produces correct row counts|
|**System Testing**|Admission logic correct across ODS → BV → Self Service|
|**End-to-End Testing**|HBCIS admission appears correctly in PADP and MAR report|
|**UAT**|HHS validates ABF fields, NOB extract, HQI outputs|
|**NFR**|RLS correctness, query performance, pipeline resiliency|

---

If you want, I can generate:

✔ A **single Test Strategy section** summarizing all levels  
✔ A **diagram** showing all test levels  
✔ Example test cases for each level  
✔ A formal document-style explanation tailored to Queensland Health data systems