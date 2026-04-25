Great question — **Business Rule Unit Tests** in dbt are where dbt really starts to feel like a **data engineering test framework**, not just SQL with checks.

I’ll show you **how to implement business rules** in dbt at **column level and model level**, with **clear patterns**, **examples**, and **when to use which approach**.

---

# 1️⃣ First: what “Business Rule Unit Test” means in dbt

In dbt terms, a _business rule test_ is:

> **A query that returns zero rows when the business rule is satisfied**

If **any rows are returned → test fails**.

Business rules usually include:

- Valid ranges (age ≥ 0)
    
- Conditional logic (if A then B)
    
- Cross-column rules
    
- Cross-table rules
    
- Temporal rules
    

These are **not covered** by built-in tests like `not_null` or `relationships`.

---

# 2️⃣ Three ways to implement Business Rule tests in dbt

|Approach|Scope|When to use|
|---|---|---|
|Generic tests (YAML)|Column / Model|Simple reusable rules|
|Custom SQL tests|Model / Cross-model|Complex logic|
|dbt-unit-testing (advanced)|Model logic|Deterministic transformations|

Most teams use **#1 + #2**.

---

# 3️⃣ Column-level Business Rule tests (generic test)

## Example rule

> `age` must be between **0 and 120**

### Step 1: Create a generic test

📁 `tests/generic/age_range.sql`

```sql
{% test age_range(model, column_name, min_value, max_value) %}

select *
from {{ model }}
where {{ column_name }} < {{ min_value }}
   or {{ column_name }} > {{ max_value }}

{% endtest %}
```

---

### Step 2: Use it in `schema.yml`

```yaml
models:
  - name: stg_customers
    columns:
      - name: age
        tests:
          - age_range:
              min_value: 0
              max_value: 120
```

✔ Column-level  
✔ Reusable  
✔ Clean YAML

---

# 4️⃣ Conditional column rules (IF / THEN logic)

## Example rule

> If `status = 'ACTIVE'`, then `end_date` must be NULL

### Custom test

📁 `tests/generic/active_end_date.sql`

```sql
{% test active_end_date(model) %}

select *
from {{ model }}
where status = 'ACTIVE'
  and end_date is not null

{% endtest %}
```

### YAML usage

```yaml
models:
  - name: dim_accounts
    tests:
      - active_end_date
```

---

# 5️⃣ Model-level Business Rule tests (most common)

## Example rule

> Order amount must equal sum of order lines

📁 `tests/order_amount_consistency.sql`

```sql
select o.order_id
from {{ ref('fct_orders') }} o
join {{ ref('fct_order_lines') }} l
  on o.order_id = l.order_id
group by o.order_id, o.order_amount
having o.order_amount <> sum(l.line_amount)
```

✔ Cross-table  
✔ Business semantics  
✔ Model-level test

---

# 6️⃣ Per-model row-level rules (row count, duplication, etc.)

### Example

> Every customer must have **at least one order**

```sql
select c.customer_id
from {{ ref('dim_customers') }} c
left join {{ ref('fct_orders') }} o
  on c.customer_id = o.customer_id
where o.customer_id is null
```

---

# 7️⃣ Accepted values with business meaning

Built-in test, but **business-driven**:

```yaml
columns:
  - name: account_type
    tests:
      - accepted_values:
          values: ['PERSONAL', 'BUSINESS', 'ENTERPRISE']
```

---

# 8️⃣ Severity levels (important for business rules)

Business rules often start as **warnings**, not failures.

```yaml
tests:
  - age_range:
      min_value: 0
      max_value: 120
      severity: warn
```

This allows:

- Visibility
    
- Gradual enforcement
    
- No pipeline break on day one
    

---

# 9️⃣ How to run business rule tests

```bash
dbt test
```

Or scoped:

```bash
dbt test -s stg_customers
```

---

# 🔟 Best-practice layering (real-world dbt)

### Staging

- Light business rules
    
- Range checks
    
- Accepted values
    

### Intermediate

- Cross-column logic
    
- Conditional rules
    

### Mart

- Cross-model reconciliation
    
- Aggregation correctness
    
- Financial integrity
    

---

# 11️⃣ Common mistakes (avoid these)

❌ Putting business logic only in SQL without tests  
❌ Overusing accepted_values for complex rules  
❌ Writing tests that depend on volatile data  
❌ Running heavy cross-table tests in staging

---

# 12️⃣ Minimal business rule test template

```sql
-- tests/my_business_rule.sql
select *
from {{ ref('my_model') }}
where <business condition violated>
```

If this returns rows → ❌ test fails.

---

# TL;DR

- dbt business rule tests = **queries that should return zero rows**
    
- Column-level → **generic tests**
    
- Model-level → **custom SQL tests**
    
- Complex logic → **custom tests**
    
- Use **severity: warn** to roll out safely
    
