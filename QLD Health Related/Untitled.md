明白 ✅  
我**完全忽略你刚才贴的那个项目内容**，**只参考“表格格式和字段”**，**只填写你自己项目里会用到的自动化测试**，并且**贴合你真实的架构**：

> **ODS → Flattening View → Transform（Customer Rules） → Fact / Dimension → Semantic Layer**  
> **测试工具：Databricks（SQL / 脚本）**

下面内容你可以**直接复制进测试计划文档的表格里**。

---

# SYSTEM TESTING PHASE (Automated)

---

### Test entry criteria

- Databricks environment available and pipelines deployed
- Source data available in ODS layer
- No blocking pipeline failures
- Data Element documentation available and approved

---

## Automated System Testing – Project Specific

| No  | Test Level                                | Test Item/s (incl. versions)             | Functions / Features to be tested                         | Test Coverage (Risks / Reqs)                                                                                                                     | Testing Staff      | Test Location / Environment  | Start Date | Finish Date |
| --- | ----------------------------------------- | ---------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------------------- | ---------- | ----------- |
| 1   | System Test – ODS Data Quality            | ODS Tables (Source Extracts)             | Raw data ingestion completeness and structural stability  | • Table not empty  <br>• Mandatory fields not null  <br>• Primary key uniqueness  <br>• Schema drift detection                                   | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 2   | System Test – Flattening View             | Flattening Views (Array / Nested Fields) | Structural transformation (explode / flatten) correctness | • No data loss after flattening  <br>• Row count consistency  <br>• Null handling validation  <br>• Array element integrity                      | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 3   | System Test – Transform (Customer Rules)  | Transform Tables                         | Application of business rules and standardisation logic   | • Code set validation (Y/N/1/0, status codes)  <br>• Boolean mapping correctness  <br>• Cross-field business rules  <br>• Default value handling | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 4   | System Test – Fact Tables                 | Fact Tables                              | Fact table grain and metric correctness                   | • Grain validation (no duplicates)  <br>• Measure validity (no negative / invalid values)  <br>• Row count reconciliation with transform layer   | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 5   | System Test – Dimension Tables            | Dimension Tables                         | Dimension integrity and key stability                     | • Primary key uniqueness  <br>• Slowly changing attributes consistency  <br>• Mandatory attributes populated                                     | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 6   | System Test – Fact to Dimension Integrity | Fact & Dimension Tables                  | Referential integrity between facts and dimensions        | • Foreign key existence  <br>• No orphan fact records  <br>• Join integrity validation                                                           | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 7   | System Test – End-to-End Data Consistency | ODS → Transform → Fact/Dim               | End-to-end data reconciliation                            | • Record count consistency  <br>• Business key consistency across layers  <br>• No unexplained data loss                                         | Data Test Engineer | Databricks (CTP Environment) |            |             |
| 8   | System Test – Semantic Readiness (Pre-BI) | Semantic Views / Aggregates              | Analytical readiness of curated data                      | • Aggregated values not null  <br>• Measures within expected ranges  <br>• Dataset consumable by BI tools                                        | Data Test Engineer | Databricks (CTP Environment) |            |             |

---

## Test exit criteria

- All planned automated tests executed
- No critical or high severity data quality defects
- All automated tests report PASS status or approved exceptions
- Test results logged and retained for audit

---

## 一句话总结（你这个项目的测试定位）

> **这些自动化测试保证：**  
> ODS 数据是干净的 ✅  
> Flatten 没有丢数据 ✅  
> Transform 规则是对的 ✅  
> Fact / Dim 是可信的 ✅  
> 数据可以安全交付到 Semantic Layer ✅

---

如果你愿意，下一步我可以非常具体地帮你做其中任意一件：

- ✅ 把 **第 3 行（Transform）拆成 10 条具体 SQL 自动化测试**
- ✅ 给你一套 **Databricks 测试脚本命名规范 + 目录结构**
- ✅ 帮你把这张表 **改写成审计/交付用的正式版本**

你只需要说一句：  
👉「我想先细化第 X 行的测试内容」






Below is the table filled **in English**, following **the same structure and format** as your provided template, with the **testing content derived from the automated data testing discussion above**.  
(Only formatted output; no extra explanation.)

---

### **SYSTEM TESTING PHASE (Automated)**

**Test entry criteria:**

- Test environment readiness confirmed, and relevant configuration information recorded and retained
- Smoke tests executed successfully (basic functional tests to prove environment stability)
- Pre-system testing by data engineering / analytics teams completed and test readiness notification received
- No outstanding critical or high-severity defects

| No  | Test Level                                   | Test Item/s (incl. versions)           | Functions / Features to be tested                  | Test Coverage (Risks / Reqs)                                                                                                                                                                                          | Testing Staff      | Test Location / Environment                    | Start Date | Finish Date |
| --- | -------------------------------------------- | -------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------- | ---------- | ----------- |
| 1   | System Test – Source Data Validation         | Source / Bronze Tables                 | Source data availability and structure validation  | • Data presence validation (non-empty datasets)  <br>• Schema drift detection (added/removed/changed columns)  <br>• File/table arrival timeliness                                                                    | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 2   | System Test – Data Quality Rules             | Cleansed / Silver Tables               | Enforcement of data quality and cleansing rules    | • Not-null constraints  <br>• Valid value domain checks  <br>• Format validation (dates, numeric ranges)  <br>• Duplicate record detection                                                                            | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 3   | System Test – Transform Logic                | Transform Tables                       | Application of business and calculation rules      | • Business rule validation  <br>• Derived attribute correctness  <br>• Default value handling  <br>• Conditional logic validation                                                                                     | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 4   | System Test – Fact Tables                    | Fact Tables                            | Fact table grain and metric correctness            | • Grain validation (no duplicate business keys)  <br>• Measure validity (no negative or invalid values)  <br>• Record count reconciliation with transform layer                                                       | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 5   | System Test – Dimension Tables               | Dimension Tables                       | Dimension integrity and historical consistency     | • Primary key uniqueness  <br>• Surrogate key stability  <br>• Slowly Changing Dimension (SCD) consistency  <br>• Mandatory attribute population                                                                      | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 6   | System Test – Fact to Dimension Integrity    | Fact & Dimension Tables                | Referential integrity between facts and dimensions | • Foreign key existence validation  <br>• No orphan fact records  <br>• Join integrity checks                                                                                                                         | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 7   | System Test – End-to-End Data Consistency    | ODS → Transform → Fact/Dim             | End-to-end data reconciliation                     | • Record count consistency across layers  <br>• Business key consistency  <br>• No unexplained data loss                                                                                                              | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 8   | System Test – Metric & Analytical Validation | Semantic Views / Aggregates            | Analytical and reporting readiness                 | • Aggregated metrics within expected thresholds  <br>• Metric regression checks  <br>• BI-consumable dataset validation                                                                                               | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 9   | System Test – Security & Access              | Curated / Gold Tables                  | Data access control and security enforcement       | • Role-based access validation  <br>• Column-level security checks  <br>• Row-level security enforcement                                                                                                              | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 10  | System Test – Pipeline Stability             | End-to-End Pipelines                   | Operational stability and recoverability           | • Pipeline success validation  <br>• SLA adherence monitoring  <br>• Idempotent re-run capability                                                                                                                     | Data Test Engineer | Databricks (CTP Environment)                   |            |             |
| 9   | System Test – Power BI DAX Validation        | Power BI Semantic Model / DAX Measures | Correctness and stability of DAX measures          | • Measure calculation correctness  <br>• Filter and slicer context behavior  <br>• Aggregation accuracy across dimensions  <br>• Time intelligence logic validation  <br>• Measure consistency with warehouse metrics | Data Test Engineer | Power BI Service (Connected to Databricks CTP) |            |             |
**Test exit criteria:**

- All planned automated tests executed
- No outstanding critical or high-severity defects