![](file:///C:/Users/xiaof/AppData/Local/Temp/msohtmlclip1/01/clip_image002.gif)


Here is a **clear, professional, data-engineering explanation** of  
**Raw → Curated → Self-Service** layers, including **definitions, criteria, purpose, examples**, and **how each layer is used**.

---

# ✅ **1. RAW Layer (Landing / Bronze Layer)**

**Definition:**  
This is the **initial landing zone** where data arrives **exactly as it comes from the source system**—no cleaning, no transformation.

### **Purpose**

- Preserve the original data for auditing.
- Support reprocessing if upstream logic changes.
- Provide a single source of truth for ingestion.

### **Typical Characteristics / Criteria**

|Criteria|Meaning|
|---|---|
|**As-is**|No transformations except basic metadata or file renaming.|
|**Immutable**|Never overwritten; append-only.|
|**Documented source**|Each dataset has a source owner/system.|
|**Raw format preserved**|CSV, JSON, Parquet—whatever the system produces.|

### **Examples**

- Raw HBCIS patient records (.csv).
- Kafka event logs stored in JSON.
- SFTP-dropped files stored in a landing zone.
    

---

# ✅ **2. CURATED Layer (Business / Silver Layer)**

**Definition:**  
This layer cleans, standardises, and models the data into **business meaning**—usually into **Fact** and **Dimension** tables.

This is where **data modelling happens**.
### **Purpose**

- Make the data usable and consistent.
- Apply business logic.
- Remove duplicates, fix data types, add surrogate keys.

### **Typical Characteristics / Criteria**

| Criteria                     | Meaning                                                 |
| ---------------------------- | ------------------------------------------------------- |
| **Cleaned**                  | Null handling, standardised formats, deduped.           |
| **Validated**                | Tests like uniqueness, relationships, row counts.       |
| **Business logic applied**   | E.g., “Active patient = last_seen_date within 2 years”. |
| **Modelled**                 | Fact/Dim tables, conformed dimensions.                  |
| **Designed for performance** | Optimised for BI or analytics.                          |

### **Examples**

- FactPatientVisit table with VisitID, PatientID, DoctorID, DateKey.
- DimPatient, DimProvider, DimLocation.
- Derived fields such as `age_group`, `financial_year`, `visit_category`.

This layer is the **curated data model**.

---

# ✅ **3. SELF-SERVICE Layer (Presentation / Gold Layer)**

**Definition:**  
This is the **final layer** where data is structured so that **business users (analysts, Power BI users, executives)** can explore and build reports **without needing engineering help**.

### **Purpose**

- Enable reporting, dashboards, ad-hoc analysis.
- Provide semantic meaning (Power BI semantic model, Databricks semantic layer).

### **Typical Characteristics / Criteria**

|Criteria|Meaning|
|---|---|
|**Easy to use**|Table names meaningful to business (“Patient Visits”, “Surgery Waitlist”).|
|**Semantic model**|Measures, hierarchies, relationships defined.|
|**Optimised for tools**|Power BI, Tableau, Looker.|
|**Consistent metrics**|E.g., “Total Admissions”, “Average Wait Time”.|
|**Row-level security**|Apply user access rules (e.g., Hospital A only sees their data).|

### **Examples**

- Power BI dataset containing DimPatient + FactVisit.
- Databricks SQL endpoint for analysts.
- A simplified view like `vw_OutpatientSummaryDaily`.

---

# 🧱 **How the Three Layers Work Together**

```
RAW (Bronze)
 └── Source files, logs, events
CURATED (Silver)
 └── Cleaned, deduped, modelled Fact/Dim tables
SELF SERVICE (Gold)
 └── Power BI datasets, semantic models, user-friendly tables
```

---

# 📌 **Why This Architecture is Best Practice**

- Separates concerns (ingestion vs modelling vs analytics).
- Makes data traceable (lineage).
- Makes testing and validation easier.
- Enables self-service analytics at scale.
- Allows reprocessing when source systems change.

---

# 🧪 **What Criteria to Use for Each Layer?**

### **RAW**

- Is the file identical to the source?
- Can we reproduce the ingestion?
- Are metadata (timestamps, sources) captured?

### **CURATED**

- Are business rules implemented?
- Are Fact/Dim tables validated with tests?
- Are joins consistent across multiple datasets?

### **SELF-SERVICE**

- Can business users understand the fields?
- Are relationships defined correctly?
- Are measures defined (e.g., DAX in Power BI)?
- Is performance acceptable for reports?

---

# 📘 Example: Hospital Reporting Use Case

### RAW

- `hbcis_patient_20241201.csv`
- `outpatient_waitlist.json`

### CURATED

- `FactOutpatientVisit`
- `DimPatient`
- `DimClinician`
- `DimClinic`

### SELF SERVICE

Power BI dataset:

- Relationships defined (DimPatient → FactVisit)
- Measures:
    - Total Patients
    - Avg Wait Time
    - Total Elective Surgeries
- Hierarchies:
    - Date → Month → Year

---
Here are **clear and practical explanations** for all your questions, written specifically from a **data engineering + BI** perspective.

---

# ✅ 1. **What does “single source of truth for ingestion” mean?**

### **Definition**

A **single source of truth (SSOT) for ingestion** means:

> There is **one official, authoritative place** where all original source data is stored **exactly as it comes in**, and all downstream pipelines read from this one place — NOT from the source system again.

### **Why is it important?**

Because:

- Source systems change structure, naming, or data.
- If pipelines ingested directly from source every time, they could break.
- Historical data might disappear from the source system.
- You cannot **re-run** or **rebuild** curated layers without the raw data.

### **Example**

Raw Layer (Bronze):

```
/raw/hbcis/patient/2025-01-01/patient_01.csv
/raw/hbcis/visit/2025-01-01/visit_01.csv
```

All curated tables (Silver) and self-service datasets (Gold) read from **these raw files**, not from HBCIS directly.

### **Key point**

Raw is the **single source of truth** for all downstream processing — ingestion only happens once.

---

# ✅ 2. **What is “measures” in data engineering?**

### **Definition**

A **measure** is a **numeric calculation** used for reporting and analytics.
Measures are usually:
- Aggregated (sum, count, avg)
- Calculated dynamically based on filters
- Defined in BI tools like Power BI / Looker / Tableau
### **Examples of measures**

- **Total Patients = COUNT(PatientID)**
- **Total Admissions = COUNT(AdmissionID)**
- **Average Length of Stay = AVG(DischargeDate - AdmissionDate)**
- **Total Revenue = SUM(ChargeAmount)**
### Why measures are important?

Because measures define **the business KPIs** people use to make decisions.
### Measures vs Facts

- **Facts** = raw numeric fields (e.g., visit_duration_in_minutes)
- **Measures** = calculations using facts (e.g., average visit duration)

---

# ✅ 3. **What is a “business concept”? Why is it important?**

### **Definition**

A **business concept** is a simple, clear description of **what the business cares about**.
It defines the meaning of the data from the **business perspective**, not the technical one.
### Examples of business concepts in healthcare

|Business Concept|Meaning|
|---|---|
|**Patient**|A person receiving care.|
|**Encounter/Visit**|A visit to hospital or clinic.|
|**Elective Surgery**|Planned (non-emergency) surgery.|
|**Waiting List**|Patients waiting for service.|
|**Clinician**|The doctor/nurse providing service.|
|**Admission**|When a patient enters hospital.|

These are **concepts**, not tables.
### Why business concepts are CRITICAL in data engineering

Because they guide:

- Data modelling (Fact/Dim design)
- Naming conventions
- Measures and KPIs
- Data validation
- Test cases
- Reporting structure (self-service layer)

### **Without business concepts:**

- The curated layer becomes messy.
- Measures become inconsistent.
- Reports from different teams show different numbers.
- Testing has no clear rules.
### What is the content of a _business concept_ document?

Typically includes:

1. **Concept name**  
    e.g., “Outpatient Visit”
2. **Business definition**  
    e.g., “A clinical encounter where the patient is not admitted.”
3. **Source systems**  
    e.g., HBCIS, ESM
4. **Key attributes**
    - Visit Date
    - Clinician
    - Clinic Code
    - Patient ID
5. **Relationships**
    - A patient can have many visits
    - A clinician provides many visits
6. **Rules**  
    e.g., “Cancelled appointments are not counted as visits.”
7. **KPIs / Measures**  
    e.g., “Total outpatient visits”, “Wait time”
This document is often prepared by:

- **Data Modeller**
- **Business Analyst**
- **Data Architect**

---

# 🧠 How these 3 concepts connect

### **Raw layer**

- Stores original data
- Single source of truth for ingestion

### **Curated layer**

- Uses **business concepts** to design Fact/Dim tables
- Uses **measures** to prepare meaningful analytics
### **Self-service layer**

- Power BI / semantic models
- Uses measures + business concepts for easy reporting




# ✅ 1. **Does ingestion mean move data from source to target?**

### **Short answer: Yes — but with a specific meaning.**

### **Definition**

**Ingestion** means:

> **Extracting data from the source system and loading it into the data platform (usually RAW layer)**.

Examples:
- Pulling data from HBCIS → Databricks RAW
- Pulling data from SQL Server → ADLS RAW
- Streaming data from Kafka → Delta Lake RAW
### Important:

- Ingestion is **not transformation**.
- Ingestion is **not modelling**.
- Ingestion **only moves data**, does not change structure.

### Ingestion =💧 Extract → 🚚 Load → 📦 Land (RAW layer)

---

# ✅ 2. **Measures: Do we need to define which fields are allowed to be measures?**

### **Yes. Not all fields become measures.**

A **measure** is always:

- Numeric
- Meaningful for business
- Used to calculate KPIs, summaries, or totals
### Examples of what _should_ be measures:
- Visit_Count
- Total_Admissions
- Total_Revenue
- Average_Length_of_Stay
- Number_of_Elective_Surgeries
### Examples of fields NOT used as measures:
- Patient_Name
- Address
- Gender
- Comment_Text
- Procedure_Code
- Status

So during design, you **select only the useful numeric fields** to become measures.

---

# ✅ 3. **If we have lots of data, do we only define useful parts during the project and leave others for future?**

### **Yes — this is EXACTLY how real data projects work.**

A business project rarely uses 100% of the source fields.

### Typical approach:

### **Step 1 — In RAW layer**

✔️ Keep **all** columns — don’t drop anything  
✔️ Store the full dataset  
✔️ RAW = “Single Source of Truth”

### **Step 2 — In Curated (EDW) layer**

You only build **the portions that are needed for the current project**.
Example:
Source table has 200 fields  
But current reporting project only needs 20 fields.
**So you create curated tables with only 20 useful fields.**
### **Step 3 — Leave the rest for future**

When business needs expand:
- You add more fields
- Or create new dimensions/facts
- No need to go back to the source system because RAW already has everything

This is why RAW is so important.

---

# 🧠 Why do we select only useful fields?

Because:
- It reduces complexity
- It makes the EDW/Curated layer clean
- It prevents unnecessary storage and processing
- It speeds up reporting
- It avoids confusion for end users

A curated model needs to be **clean**, **simple**, and **business-friendly**, not a dump of everything.

---

# 🏗️ This is the real lifecycle:

### **1. Business Concept**
- Define what business cares about
- Example: "Elective Surgery", "Outpatient Visit"
### **2. Data Elements Requirements**
- Define which fields from source represent these concepts
- Example: "visit_date", "clinic_code", "patient_id"
### **3. Data Modelling**
- Convert them into DIM and FACT tables
### **4. Measures**
- Define numeric KPIs
- Example: “Total outpatient visits”
### **5. Curated Layer**
- Only include the fields needed for the current project
### **6. Self-Service Layer**
- Business uses Power BI or semantic models for reporting

---

# 🎯 Summary

### ✔ Ingestion = move data from source → RAW
### ✔ Measures = numeric KPIs, define only the useful ones
### ✔ Business concept = decide what business needs
### ✔ You only build the parts needed for the current project
### ✔ RAW keeps all data for future projects
