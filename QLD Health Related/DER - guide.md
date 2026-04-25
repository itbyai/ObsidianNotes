Perfect — this is the **Data Element Requirements (DER)** table structure.  
I’ll now explain **each column**, **how to read it**, and **how it is used in a data engineering project**.

This will help you understand exactly how to use this document for mapping, modelling, and testing.

---

# ✅ **FULL EXPLANATION OF EACH COLUMN**

Below is a clear breakdown:

---

# **1. No.**

A simple row number (ID).  
Has no impact on logic.

---

# **2. Source**

Where the data originates.

Examples:

- HBCIS
    
- FRED
    
- PAS
    
- External CSV
    
- API feed
    

**Used for:**

- Knowing which raw table you must read
    
- Knowing which system your mapping references
    

---

# **3. Business Concept**

The _domain meaning_ of the data field.

Examples:

- **Patient Admission**
    
- **Surgery Event**
    
- **Person Demographics**
    
- **Outpatient Visit**
    
- **Diagnosis Information**
    

This helps group data elements by _subject area_.

**Why it matters:**  
Business concepts drive:

- Fact table design
    
- Dimension table design
    
- Curated layer grouping
    
- Testing by business process
    

---

# **4. Business Concept – Secondary**

Sometimes a field belongs to more than one domain.

Examples:

- “Admission Date” (primary = Admission, secondary = Encounter Lifecycle)
    
- “ICD Code” (primary = Clinical Coding, secondary = Diagnosis)
    

**This helps with modelling** → deciding which dimension/fact owns the field.

---

# **5. Data Item Name**

The **official name** of the data element.

Examples:

- Patient_ID
    
- Admission_Date
    
- Sex_Code
    
- Procedure_Type
    

This is the **canonical name** used in the curated/model layers.

---

# **6. Data Item Definition**

A clear _business-friendly_ definition.

Examples:

- “The date the patient was admitted to hospital”
    
- “A code identifying the patient’s sex at birth”
    

**Used for:**

- Ensuring correct interpretation
    
- Transformation logic understanding
    
- Semantic consistency
    

This is extremely important for modelling & testing.

---

# **7. Synonym**

Alternate names used in other systems.

Examples:

- “UR Number” is synonym for “Patient ID”
    
- “DOB” is synonym for “Birth Date”
    

**Useful for mapping raw → curated**  
You know which fields correspond to the canonical name.

---

# **8. Rules**

This is one of the **most important columns**.

Contains:

- Business rules
    
- Validation rules
    
- Conditional logic
    
- Constraints
    

Examples:

- “Admission_Date must be <= Discharge_Date”
    
- “Sex_Code must be one of M/F/U”
    
- “If Surgery_Flag = Y, then Procedure_Type is mandatory”
    
- “Birth_Date cannot be in the future”
    

**These rules become your TEST CASES**.

---

# **9. Coded Item**

Lists values that are permitted.

Example:

- Sex_Code → M, F, U
    
- Payment_Type → Medicare, Private, DVA
    
- Surgery_Type → Elective, Emergency
    

Used for:

- Data validation tests
    
- Transformation logic (mapping to dimension keys)
    

---

# **10. Calculations**

Any computation required.

Examples:

- Length_of_Stay = Discharge_Date – Admission_Date
    
- Age = Today – Birth_Date
    

This feeds transformation logic.

---

# **11. PADP table/s**

Which table in the _PADP_ system contains the field.

Example:

- PADP_ADM
    
- PADP_PATIENT
    

You use this to:

- Locate raw tables
    
- Validate raw → curated mapping
    

---

# **12. PADP column/s**

The column name in PADP that matches the data element.

Example:

- ADMIT_DT → Admission_Date
    
- SEX → Sex_Code
    

---

# **13. HBCIS documented description/s**

Documentation from HBCIS that describes the field.

Used for:

- Cross-checking definitions
    
- Understanding field usage
    

---

# **14. HBCIS screen ID/s**

Which screen in HBCIS shows this field.

Example:

- Screen 30 “Admission Details”
    

Used only for:

- Business SMEs
    
- Validation against HBCIS UI
    

---

# **15. HBCIS field no./s**

The field identifier on the screen.

---

# **16. HBCIS screen title/s**

Title of the screen for business reference.

---

# **17. Validation file/s**

Lists external validation files (if any).

Example:

- ICD-10 code lists
    
- Procedure code sets
    
- Value sets
    

Used for:

- Reference data validation
    
- Coded value checks
    

---

# **18. File Notes**

Any extra notes about validation files.

---

# **19. Validation status for PADP and HBCIS source**

Whether validation is completed:

- Pass
    
- Fail
    
- Pending
    

---

# **20. Notes**

General comments (uncertainties, risks, pending info)

---

# **21. Questions / follow-up**

Issues requiring SME clarification.

---

# **22. Entity Type**

Whether the element belongs to:

- Patient
    
- Encounter
    
- Admission
    
- Facility
    
- Procedure
    
- Diagnosis
    

Used for **dimension modelling**.

---

# **23. Entity**

Actual entity name used in the semantic model.

Example:

- Dim_Patient
    
- Fact_Admission
    
- Dim_Procedure
    

---

# 🎉 Summary — How You Use This Table

## ✔ **For Testing**

You use:

- Rules
    
- Coded Items
    
- PADP/HBCIS fields
    
- Calculations
    
- Entity
    

to write test cases like:

- Check schema
    
- Check mapping
    
- Check transformations
    
- Check data quality
    
- Validate business logic
    
- Validate fact/dim relationships
    

---

# 🎯 If you want, I can show you HOW TO USE THIS TABLE TO DESIGN TEST CASES

Example:

- Raw → curated schema test
    
- Transformation test
    
- Fact/dim model validation
    
- Business rule test
    
- Mapping test
    

Just tell me:  
**“Show me test cases based on this DER table.”**