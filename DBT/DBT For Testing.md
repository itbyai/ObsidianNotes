dbt has **built-in testing** designed specifically for data quality.  
This is one of the biggest reasons dbt is popular in data engineering.

Below is a **clear, practical guide** on how dbt performs testing, with examples you can directly apply on **Databricks / Delta Lake**.

---

# ✅ 1. **Types of Tests in dbt**

dbt supports **three main test categories**:

## **A. Generic Tests (built-in tests)**

dbt provides ready-made tests:

|Test|Purpose|
|---|---|
|`unique`|No duplicates in a column|
|`not_null`|Column must not be null|
|`accepted_values`|Only allowed values|
|`relationships`|Foreign-key relationships|
|`is_increasing`|Column always increases (timestamps)|

---

## **B. Custom (SQL-based) Tests**

You can write your own SQL test like this:

```sql
select * from {{ ref('orders_clean') }}
where total_amount < 0
```

👉 If the SQL returns **any rows**, the test **fails**.

---

## **C. Schema Tests (YAML)**

Most dbt tests are defined in YAML next to your model.

Example `orders_clean.yml`:

```yaml
version: 2

models:
  - name: orders_clean
    columns:
      - name: order_id
        tests:
          - unique
          - not_null

      - name: status
        tests:
          - accepted_values:
              values: ['COMPLETE', 'PENDING', 'CANCELLED']
```

---

# 🔍 2. How to Run Tests

In terminal or Databricks job:

### **Run all tests**

```bash
dbt test
```

### **Run tests for one model**

```bash
dbt test -m orders_clean
```

### **Run tests only for modified models**

```bash
dbt test --select state:modified+
```

---

# 📊 3. What dbt Tests Look Like in Practice

If your model produces bad data (e.g., duplicated primary keys), dbt will show:

```
Failure in test unique_orders_clean_order_id
Got 3 results
```

You get:

- failing rows stored in the warehouse under `dbt_test__audit_schema`
- test summary in logs
- test visualization in dbt Cloud (if used)

---

# 🧪 4. Common Real-World Test Use Cases

### **Primary key tests**

```
- unique
- not_null
```

### **Check data types / ranges**

Custom SQL:

```sql
select * from {{ ref('sales') }}
where price < 0 or price > 100000
```

### **Check slowly changing dimensions**

```sql
select * from {{ ref('dim_customer') }}
where valid_from > valid_to
```

### **Check referential integrity**

```yaml
- relationships:
    field: customer_id
    to: ref('dim_customer')
    column: id
```

### **Check for schema drift**

dbt won’t allow a model to change unexpectedly unless you approve it.

---

# 🧠 5. How dbt Testing Fits into ELT Architecture

### Layer: **ODS → EDW → Marts**

dbt typically performs tests in:

|Layer|Why dbt tests matter|
|---|---|
|**ODS (raw clean)**|Detect ingestion errors, check duplicates, check nulls|
|**EDW (standardized)**|Check business logic transformations|
|**Marts (reporting)**|Validate metrics and aggregations|

Your CI/CD (GitHub Actions/Azure DevOps) runs:

```
dbt run
dbt test
```

to catch data failures **before dashboards break**.

---

# ⚙️ 6. dbt + Databricks Example

If you have Delta tables:

### Model: `silver_orders.sql`

```sql
select * from delta.`/mnt/bronze/orders`
where is_valid = true
```

### Tests: `silver_orders.yml`

```yaml
models:
  - name: silver_orders
    columns:
      - name: id
        tests: [not_null, unique]
      - name: order_status
        tests:
          - accepted_values:
              values: ['PAID', 'CANCELLED', 'REFUND']
```

dbt handles everything else.

---

# 🧩 7. Summary: How dbt Is Used for Testing

|Feature|Description|
|---|---|
|**Generic tests**|one-line YAML tests|
|**Custom tests**|SQL tests you write yourself|
|**Full test automation**|`dbt test` in CI/CD|
|**Test lineage**|dbt knows which tests belong to which models|
|**Real-time data quality**|fail fast when data breaks|
|**Perfect for Databricks**|integrates with Delta Lake + Unity Catalog|

---

# Want examples for your real use case?

I can help generate:

✔ Testing framework for ODS → EDW → Mart  
✔ A full dbt testing folder structure  
✔ Example tests for schema drift  
✔ Example tests for comparing **source vs target systems**

Just tell me what you want next.