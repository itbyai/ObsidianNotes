Here is a **clear, practical example** of **Data Mapping** — converting source data into the structure required by a target system.

---

## 📌 Scenario

You are loading **customer data** from a **CRM system** into a **data warehouse**.  
But the **column names, formats, and values** are different.

---

## 🟦 Source Table (CRM: `crm_customer`)

|Source Column|Example Value|Meaning|
|---|---|---|
|cust_id|C12345|Customer identifier|
|fullname|John Smith|First + Last name combined|
|dob|12/07/1985|Date in **DD/MM/YYYY** text format|
|gender|M|M = Male, F = Female|
|country_code|AU|ISO country code|

---

## 🟩 Target Table (DWH: `dim_customer`)

|Target Column|Required Format|
|---|---|
|customer_key|Same as cust_id|
|first_name|Extract from fullname|
|last_name|Extract from fullname|
|birth_date|Convert to **DATE** type|
|gender_desc|Convert M → Male, F → Female|
|country|Map AU → Australia|

---

## 🔁 Data Mapping Table (Source → Target)

|Target Column|Source Column|Transformation Rule|
|---|---|---|
|customer_key|cust_id|Direct copy|
|first_name|fullname|Split by space → first part|
|last_name|fullname|Split by space → second part|
|birth_date|dob|Convert text → DATE|
|gender_desc|gender|Convert using lookup: M→Male, F→Female|
|country|country_code|Lookup: AU→Australia, US→United States|

This mapping document is often built in **Excel** or **metadata tables**.

---

## 📝 Example SQL Transformation Based on Mapping

```sql
SELECT
    cust_id AS customer_key,
    SPLIT(fullname, ' ')[0] AS first_name,
    SPLIT(fullname, ' ')[1] AS last_name,
    TO_DATE(dob, 'dd/MM/yyyy') AS birth_date,
    CASE gender
        WHEN 'M' THEN 'Male'
        WHEN 'F' THEN 'Female'
    END AS gender_desc,
    CASE country_code
        WHEN 'AU' THEN 'Australia'
        WHEN 'US' THEN 'United States'
    END AS country
FROM crm_customer;
```

Result for John Smith

|customer_key|first_name|last_name|birth_date|gender_desc|country|
|---|---|---|---|---|---|
|C12345|John|Smith|1985-07-12|Male|Australia|

---

## ⭐ Why Data Mapping is important

|Reason|Benefit|
|---|---|
|Aligns different systems|Integrates CRM → DWH → reporting|
|Ensures data quality|Standard formats and cleaned values|
|Supports automation|Clear rules for ETL / Data Pipeline|
|Enables validation & testing|Mapping table becomes source for tests|

---

If you’d like, I can generate:  
✔ A **template** for data mapping documentation (Excel-style)  
✔ Test cases based on the mapping  
✔ A **dbt** model example for Databricks  
✔ More complex mapping: surrogate keys, datatype conversion, SCD

Would you like a downloadable **mapping template** you can use in your project?