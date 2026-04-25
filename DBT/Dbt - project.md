

# **dbt Healthcare Data Warehouse Project - Learning Guide**

## **📋 Project Overview**

This is a **dbt (data build tool)** project for a **healthcare data warehouse** built on **Databricks**. It processes data from multiple clinical information systems (EDIS, ieMR, SWADCS) and creates dimensional models for analytics.

### **Tech Stack:**
- **dbt-databricks** (1.11.0+)
- **Python 3.12+**
- **sqlfluff** for SQL linting/formatting
- **Databricks** as the data platform

---

## **🏗️ Architecture Overview**

The project follows a **3-layer architecture**:

```
┌─────────────────────────────────────────────────────────┐
│  SOURCE SYSTEMS (External DBs)                          │
│  - EDIS (Emergency Department Info System)              │
│  - ieMR (Integrated Electronic Medical Record)          │
│  - CRDS (Common Reference Data System)                  │
└──────────────────┬──────────────────────────────────────┘
                   │ source()
                   ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: ODS (Operational Data Store)                  │
│  Catalog: cbi_ods_{env}                                 │
│  - Views only (no tables)                               │
│  - Minimal transformation                               │
│  - Schema organized                                     │
└──────────────────┬──────────────────────────────────────┘
                   │ ref()
                   ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 2: EDW (Enterprise Data Warehouse)               │
│  Catalog: cbi_edw_{env}                                 │
│  - Dimensional modeling (Star Schema)                   │
│  - Staging → dim_sf → Dimensions → Facts                │
│  - System-specific models (edis, iemr, crds)            │
└──────────────────┬──────────────────────────────────────┘
                   │ ref()
                   ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: INFOMART (Business Ready)                     │
│  Catalog: cbi_im_{env}                                  │
│  - OBT (One Big Table) models                           │
│  - Denormalized & conformed                             │
│  - Cross-system analytics                               │
└─────────────────────────────────────────────────────────┘
```

---

## **📁 Directory Structure**

```
models/
├── _source/              # Source definitions (YAML)
│   ├── edis.yml         # External table definitions
│   ├── iemr.yml
│   └── crds.yml
│
├── _properties/          # Schema/test definitions (YAML)
│   └── crds/
│       └── im_crds.yml  # Tests for reference tables
│
├── ods/                  # Layer 1: ODS Views
│   └── {schema}_vw/
│       └── ods_{schema}_vw__{table}.sql
│
├── edw/                  # Layer 2: Dimensional Models
│   ├── common/          # Shared dimensions (d_date, d_time)
│   ├── edis/            # EDIS system models
│   │   ├── stg/         # Staging (optional private models)
│   │   ├── dim/         # Dimension tables
│   │   ├── bridge/      # Many-to-many relationships
│   │   └── fact/        # Fact tables
│   ├── iemr/            # ieMR system models
│   │   ├── stg/
│   │   ├── dim/
│   │   ├── dim_sf/      # Snowflake format (optional)
│   │   ├── bridge/
│   │   └── fact/
│   └── crds/            # Reference data
│       ├── ref/
│       └── ref_current/
│
├── infomart/            # Layer 3: Business Ready
│   ├── edis/
│   │   └── obt/
│   ├── iemr/
│   │   └── obt/
│   └── emergency/       # Cross-system analytics
│       └── ed_combined/
│
└── system/              # Databricks system tables

macros/                   # Reusable SQL functions
├── calculate_age.sql
├── get_custom_schema.sql
└── crds/

seeds/                    # CSV reference data
└── emergency/
    └── r_real_time_facilities.csv

tests/                    # Custom SQL tests (empty - using YAML)
```

---

## **🎯 Code Structure Patterns**

### **1. Naming Conventions**

| Type | Pattern | Example |
|------|---------|---------|
| **Private Model** | `__{semantic}_edw_{system}__{entity}.sql` | __stg_edw_iemr__encounter.sql |
| **Dimension** | `edw_{system}__d_{entity}.sql` | `edw_iemr__d_patient.sql` |
| **Bridge** | `edw_{system}__b_{entity1}_{entity2}.sql` | `edw_iemr__b_encounter_diagnosis.sql` |
| **Fact** | `edw_{system}__f_{entity}.sql` | `edw_iemr__f_encounter.sql` |
| **OBT** | `im_{system}__obt_{domain}.sql` | im_iemr__obt_emergency.sql |
| **Reference** | `edw_crds__r_{entity}.sql` | `edw_crds__r_icd.sql` |

**Key Patterns:**
- `__` prefix = Private/internal models (not for external consumption)
- `edw_` = Enterprise Data Warehouse namespace
- `im_` = InfoMart namespace
- `d_` = Dimension table
- `b_` = Bridge table
- `f_` = Fact table
- `r_` = Reference data

### **2. Model Structure Example**

**Staging Model** (__stg_edw_iemr__encounter.sql):
```sql
{{
    config(
         enabled=true
 )
}}

WITH code_value AS (
    -- Get lookup values
    SELECT cv.code_value, cv.display
    FROM {{ source('iemr','code_value') }} AS cv
    WHERE cv.active_ind = 1
)

SELECT
    named_struct('dbt', named_struct('modified_ts', current_timestamp())) AS _metadata
    , e._rls
    , e.encntr_id AS bk_encounter
    , e.person_id AS bk_patient
    , dateadd(HOUR, 10, e.arrive_dt_tm) AS arrive_dt_tm_aest
    ...
FROM {{ source('iemr','encounter') }} AS e
LEFT JOIN code_value AS t ON e.encntr_type_cd = t.code_value
WHERE e.active_ind = 1
```

**Dimension Model** (edw_edis__d_patient.sql):
```sql
{{
    config(
         alias='d_patient'
        ,materialized='table'
    )
}}

SELECT
    named_struct('dbt', named_struct('modified_ts', current_timestamp())) AS _metadata
    , pin._rls
    , pin.pi_sequ AS bk_patient
    , pin.pi_first_name AS patient_first_name
    , pin.pi_last_name AS patient_last_name
    , cast(pin.pi_dob AS date) AS patient_birth_date
    ...
FROM {{ source('edis','f_patient_index') }} AS pin
LEFT JOIN {{ ref('r_patient_sex_map') }} AS gen
    ON pin.pi_sex = gen.mapped_from_code
```

**Fact Model** (edw_edis__f_ed_presentations.sql):
```sql
{{
    config(
         alias='f_ed_presentations'
        ,materialized='table'
)
}}

SELECT
    pp._metadata
    , pp._rls
    , pp.pp_sequ AS bk_presentation
    , pp.pp_pi_sequ AS bk_patient
    , pp.pp_ca_sequ AS bk_facility
FROM {{ ref('__stg_edw_edis_presentations') }} AS pp
```

**OBT Model** (im_iemr__obt_emergency.sql):
```sql
{{
    config(
         alias='obt_emergency'
 )
}}

WITH diagnosis AS (
    -- Pivot diagnoses using FILTER
    SELECT
        d.encntr_id
        , max(d.snomed_diagnosis_code) FILTER
            (WHERE b.principal_diagnosis_flag = 1) AS principal_diagnosis_snomed_code
    FROM {{ ref('edw_iemr__d_diagnosis') }} AS d
    INNER JOIN {{ ref('edw_iemr__b_encounter_diagnosis') }} AS b
        ON d.bk_diagnosis = b.bk_diagnosis
    GROUP BY d.encntr_id
)

SELECT
    f._metadata
    , f._rls
    , f.bk_encounter
    , 'IEMR' AS source_system   
    , p.patient_first_name
    , {{ calculate_age('p.patient_birth_date', 'f.presentation_datetime') }} AS patient_age_at_presentation
    ...
FROM {{ ref('edw_iemr__f_encounter') }} AS f
LEFT JOIN {{ ref('edw_iemr__d_patient') }} AS p
    ON f.bk_patient = p.bk_patient
LEFT JOIN diagnosis AS d
    ON f.bk_encounter = d.encntr_id
```

### **3. Key Concepts**

**Required Columns:**
- `_metadata` - Struct with processing timestamp
- `_rls` - Row-level security identifier
- `bk_{entity}` - Business keys (always single word entity names)

**Common Patterns:**
- **Timezone Conversion**: `dateadd(HOUR, 10, utc_timestamp)` (UTC → AEST)
- **Conditional Aggregation**: `max(code) FILTER (WHERE flag = 1)`
- **Window Functions**: `row_number() OVER (PARTITION BY ... ORDER BY ...)`
- **Macros**: `{{ calculate_age('birth_date', 'current_date') }}`

---

## **🧪 Testing in dbt**

### **1. Test Types**

#### **A. Schema Tests (YAML-based)**

Tests are defined in YAML files alongside models. Location: ed_combined.yml

```yaml
version: 2

models:
  - name: im_ed_cbi__ed_combined
    description: 'Combined ED data from IEMR and EDIS'
    columns:
      - name: pk_presentation
        description: 'Primary key'
        data_tests:
          - not_null
          - unique:
              config:
                severity: error
      
      - name: bk_presentation
        description: 'Business key'
        data_tests:
          - not_null
      
      - name: source_system
        data_tests:
          - not_null
          - accepted_values:
              values: ['IEMR', 'EDIS']
      
      - name: patient_sex_code
        data_tests:
          - not_null
          - accepted_values:
              values: ['1', '2', '3', '9']
```

**Built-in Tests:**
- `not_null` - Column cannot be NULL
- `unique` - No duplicate values
- `relationships` - Foreign key validation
- `accepted_values` - Enumeration validation

#### **B. Custom SQL Tests**

Custom tests go in the tests folder (currently empty in this project).

Example custom test:
```sql
-- tests/assert_patient_age_valid.sql
SELECT *
FROM {{ ref('edw_iemr__d_patient') }}
WHERE patient_age_at_presentation < 0
  OR patient_age_at_presentation > 120
```

### **2. Running Tests**

```powershell
# Run all tests
dbt test

# Test specific model
dbt test --select edw_iemr__d_patient

# Test specific model and its children
dbt test --select edw_iemr__d_patient+

# Test by tag
dbt test --select tag:ref

# Test with increased verbosity
dbt test --select im_ed_cbi__ed_combined --debug
```

### **3. Test Strategy**

**What to Test:**

1. **Primary Keys** - Always test `unique` + `not_null`
   ```yaml
   - name: bk_patient
     data_tests:
       - unique
       - not_null
   ```

2. **Foreign Keys** - Use `relationships` test
   ```yaml
   - name: bk_patient
     data_tests:
       - relationships:
           to: ref('edw_iemr__d_patient')
           field: bk_patient
   ```

3. **Enumerations** - Test known values
   ```yaml
   - name: patient_sex_code
     data_tests:
       - accepted_values:
           values: ['1', '2', '3', '9']
   ```

4. **Business Rules** - Custom SQL tests
   - Age validations
   - Date ranges
   - Required field combinations

### **4. Test Best Practices**

✅ **DO:**
- Test all primary keys (unique + not_null)
- Test foreign key relationships in facts
- Test business rules that must never be violated
- Use severity: error for critical tests
- Document test purpose in description

❌ **DON'T:**
- Over-test every single column
- Test derived calculations (test the inputs instead)
- Test external source data quality (use data quality tool instead)

---

## **🔧 Development Workflow**

### **1. Setup Environment**

```powershell
# Install dependencies
pip install -e ".[dev]"

# Configure dbt profile (profiles.yml)
# Located at: ~/.dbt/profiles.yml or C:\Users\{user}\.dbt\profiles.yml
```

### **2. Development Commands**

```powershell
# Parse and validate project
dbt parse

# Run all models
dbt run

# Run specific model
dbt run --select edw_iemr__d_patient

# Run model and its downstream dependencies
dbt run --select edw_iemr__d_patient+

# Run by tag
dbt run --select tag:ref

# Run by folder
dbt run --select models/edw/iemr/dim

# Compile SQL without running
dbt compile --select edw_iemr__d_patient

# Test
dbt test

# Generate documentation
dbt docs generate
dbt docs serve

# Lint SQL
sqlfluff lint models/
sqlfluff fix models/
```

### **3. Creating New Models**

**Step-by-step Example:**

1. **Define Source (if new)**
   ```yaml
   # models/_source/newsystem.yml
   version: 2
   sources:
     - name: newsystem
       catalog: cbi_ods_prod
       schema: newsystem_schema
       tables:
         - name: patients
   ```

2. **Create Staging Model (optional)**
   ```sql
   -- models/edw/newsystem/stg/__stg_edw_newsystem__patient.sql
   {{
       config(
            enabled=true
    )
   }}
   
   SELECT
       named_struct('dbt', named_struct('modified_ts', current_timestamp())) AS _metadata
       , _rls
       , patient_id AS bk_patient
       , ...
   FROM {{ source('newsystem', 'patients') }}
   WHERE active_flag = 1
   ```

3. **Create Dimension**
   ```sql
   -- models/edw/newsystem/dim/edw_newsystem__d_patient.sql
   {{
       config(
            alias='d_patient'
           ,materialized='table'
       )
   }}
   
   SELECT
       _metadata
       , _rls
       , bk_patient
       , patient_name
       ...
   FROM {{ ref('__stg_edw_newsystem__patient') }}
   ```

4. **Add Tests**
   ```yaml
   # models/_properties/newsystem/newsystem.yml
   version: 2
   
   models:
     - name: edw_newsystem__d_patient
       columns:
         - name: bk_patient
           data_tests:
             - unique
             - not_null
   ```

5. **Run and Test**
   ```powershell
   dbt run --select edw_newsystem__d_patient
   dbt test --select edw_newsystem__d_patient
   ```

---

## **📚 Key Files Reference**

| File | Purpose |
|------|---------|
| dbt_project.yml | Project configuration, model defaults |
| pyproject.toml | Python dependencies |
| Development-Standards.md | Complete coding standards (1065 lines!) |
| _source | Source table definitions |
| _properties | Test definitions |
| macros | Reusable SQL functions |
| seeds | CSV reference data |

---

## **🎓 Learning Path**

### **Phase 1: Understand the Structure**
1. ✅ Read this guide
2. ✅ Review Development-Standards.md
3. ✅ Explore the directory structure
4. ✅ Look at dbt_project.yml configuration

### **Phase 2: Study Examples**
1. **Simple Model**: d_date.sql - Date dimension
2. **Staging**: __stg_edw_iemr__encounter.sql - Source transformation
3. **Dimension**: edw_edis__d_patient.sql - Patient dimension
4. **Bridge**: edw_edis__b_presentation_consult.sql - Many-to-many
5. **Fact**: edw_edis__f_ed_presentations.sql - Fact table
6. **OBT**: im_iemr__obt_emergency.sql - Denormalized

### **Phase 3: Practice Testing**
1. Review existing tests in ed_combined.yml
2. Run tests: `dbt test --select im_ed_cbi__ed_combined`
3. Create a simple test for an existing model
4. Create a custom SQL test

### **Phase 4: Build Something**
1. Choose a small enhancement
2. Create a new staging model
3. Add tests
4. Submit for review

---

## **💡 Quick Reference**

**Common dbt functions:**
- `{{ source('system', 'table') }}` - Reference external table
- `{{ ref('model_name') }}` - Reference another dbt model
- `{{ config(...) }}` - Set model configuration
- `{{ var('variable_name', 'default') }}` - Access variables
- `{{ doc('doc_block') }}` - Include documentation

**Important Patterns:**
- Business keys: `bk_patient`, `bk_encounter`, `bk_patientfacility`
- Metadata: `named_struct('dbt', named_struct('modified_ts', current_timestamp()))`
- Timezone: `dateadd(HOUR, 10, utc_timestamp)`
- Conditional aggregation: `max(col) FILTER (WHERE condition)`

---

This project is well-structured with clear separation of concerns, comprehensive standards documentation, and follows modern dbt best practices. Focus on understanding the layered architecture and naming conventions - they're key to navigating this codebase!