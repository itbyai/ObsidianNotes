
```python
# not ODS as source
sql = f"""
SELECT
    CAST(
        seq_row_num
        + ROW_NUMBER() OVER (
            ORDER BY target_catalog, target_schema, target_table
        ) AS STRING
    ) AS id,

    project AS project,
    module_entity AS project_phase,
    version AS release,
    '{suite_name}' AS suite_name,

    'compare' AS test_type,
    'IM_business_key_compare not ODS' AS test_name,
    '' AS requirement,

    stage AS stage,
    source_type AS source_type,
    source_catalog AS source_catalog,
    source_schema AS source_schema,
    source_table AS source_table,
    source_table_type AS source_table_type,
    '' AS source_key,                                   -- TBD
    TRIM('[]', CAST(array_agg(source_column) AS STRING))
        AS source_column_names,                          -- business keys
    source_filter AS source_filter,

    target_type AS target_type,
    target_catalog AS target_catalog,
    target_schema AS target_schema,
    target_table AS target_table,
    target_table_type AS target_table_type,
    '' AS target_key,                                   -- TBD
    TRIM('[]', CAST(array_agg(target_column) AS STRING))
        AS target_column_names,                          -- business keys
    target_filter AS target_filter,

    '' AS regression,
    '1' AS active,
    '' AS risk_likelihood,
    '' AS risk_impact,
    '' AS dev,
    '' AS tst,
    '' AS pat,
    '' AS prd,

    CONCAT(
        'with source as (select ',
        TRIM(
            '[]',
            CAST(
                array_agg(
                    CONCAT(
                        'upper(', source_column, ') as ', target_column
                    )
                ) AS STRING
            )
        ),
        ' from ',
        CONCAT(source_catalog, '.', source_schema, '.', source_table),
        ' ',
        source_filter,
        '), ',

        'target as (select ',
        TRIM(
            '[]',
            CAST(
                array_agg(
                    CONCAT(
                        'upper(', target_column, ') as ', target_column
                    )
                ) AS STRING
            )
        ),
        ' from ',
        CONCAT(target_catalog, '.', target_schema, '.', target_table),
        ' ',
        target_filter,
        '), ',

        'compare as ( ',
            'select sum(src) as src, sum(tgt) as tgt, ',
            TRIM('[]', CAST(array_agg(target_column) AS STRING)),
            ' from ( ',
                'select 1 as src, 0 as tgt, ',
                TRIM('[]', CAST(array_agg(target_column) AS STRING)),
                ' from source union all ',
                'select 0 as src, 1 as tgt, ',
                TRIM('[]', CAST(array_agg(target_column) AS STRING)),
                ' from target ',
            ') group by ',
            TRIM('[]', CAST(array_agg(target_column) AS STRING)),
            ' having sum(src) <> sum(tgt) ',
        ') select * from compare'
    ) AS query

FROM cbi.test.source_to_target_mapping R1
JOIN (
    SELECT COUNT(id) AS seq_row_num
    FROM cbi.test.test_repository
    WHERE project = project
      AND '{suite_name}' = suite_name
) R2

WHERE active = '1'
  AND module_entity = '{IM_Project}'
  AND source_table_type <> 'ods'

GROUP BY
    source_file_path,
    seq_row_num,
    project,
    project_phase,
    stage,
    source_type,
    source_catalog,
    source_schema,
    source_table,
    source_filter,
    source_table_type,
    target_catalog,
    target_schema,
    target_table,
    target_type,
    target_table_type,
    target_filter,
    target_column,
    module_entity,
    version
"""

```

Great question — this is **exactly the right thing to ask** at this stage 👍  
I’ll explain the **execution order at two levels**:

1. **Overall execution flow (Python → Spark → SQL)**
2. **Detailed SQL execution order inside `spark.sql(sql)`**

I’ll keep it precise and aligned to **how Spark SQL actually works**, not just theoretical SQL order.

---

# 1️⃣ Overall execution order (big picture)

Your code runs in **this exact order**:

```text
1. Python builds the SQL string (f-string)
2. Spark parses & executes the SQL
3. Spark produces a DataFrame (df)
4. DataFrame is written to Delta table
5. DataFrame is displayed
```

So chronologically:

```python
sql = f""" ... """        -- (1) string construction only
df = spark.sql(sql)      -- (2) SQL execution
df.write...saveAsTable() -- (3) write result
display(df)              -- (4) show result
```

⚠️ Important:  
**Nothing runs inside Spark until `spark.sql(sql)` is called.**

---

# 2️⃣ Execution order inside `spark.sql(sql)` (THIS IS THE KEY PART)

Spark SQL follows a **logical execution order**, not the top-to-bottom order you read in the SQL.

---

## Logical execution order (simplified but accurate)

For your query, Spark executes in this order:

```text
1. FROM
2. JOIN
3. WHERE
4. GROUP BY
5. AGGREGATIONS (array_agg, count)
6. SELECT expressions
7. WINDOW functions (row_number)
8. FINAL projection
```

Let’s apply this **directly to your SQL**.

---
# 3️⃣ Step-by-step execution of YOUR SQL

---
## 🔹 Step 1: FROM clause

```sql
from cbi.test.source_to_target_mapping R1
```

Spark:
- Reads **all rows** from the metadata table
- This is the **driver dataset**

👉 This is where the _implicit loop_ begins.

---
## 🔹 Step 2: JOIN execution

```sql
JOIN (
  select count(id) as seq_row_num
  from cbi.test.test_repository
  where project = project
    and '{suite_name}' = suite_name
) R2
```

Execution details:

1. Spark runs the **subquery first**
2. Counts existing test cases
3. Produces **one row**:

```text
seq_row_num = N
```

4. Spark performs a **cross join** (effectively)
    - Same `seq_row_num` added to every row from R1

📌 `seq_row_num` is now available to all rows.

---
## 🔹 Step 3: WHERE clause filtering

```sql
where
  active = '1'
  and module_entity = '{IM_Project}'
  and source_table_type <> 'ods'
```

Spark:

- Filters metadata rows
- Only **active, non-ODS, matching project** rows survive

❗ Any rows filtered here:
- Do NOT participate in aggregation
- Do NOT generate test cases

---

## 🔹 Step 4: GROUP BY (CRITICAL STEP)

```sql
group by
  source_catalog,
  source_schema,
  source_table,
  target_catalog,
  target_schema,
  target_table,
  ...
```

This defines the **test-case grain**.

Spark now groups rows like this:

```text
One group = one source–target table pair
```

Each group may contain **multiple rows**, one per column mapping.

---

## 🔹 Step 5: Aggregations (`array_agg`, `count`)

Inside each group, Spark evaluates:

```sql
array_agg(source_column)
array_agg(target_column)
```

This is the **implicit loop over columns**:

```text
FOR each mapping row in the group
  collect column names
```

Result example:

```text
bk_visit, bk_patient, bk_site
```

This is where **“all columns” (business keys)** are assembled.

---

## 🔹 Step 6: SELECT expressions (most columns)

Now Spark evaluates the SELECT list:

```sql
project
module_entity
version
stage
source_catalog
target_catalog
...
```

These are **group-level values**, not row-level anymore.

---

## 🔹 Step 7: Build the dynamic SQL string (`concat(...)`)

Now Spark evaluates:

```sql
concat(
  'with source as (select ',
  array_agg(...),
  ' from ... ',
  source_filter,
  ...
)
```

At this point:

- `array_agg()` already produced column lists
- Spark concatenates everything into **one SQL string**
- This string is stored in the `query` column

📌 **Important**:  
👉 This SQL is **NOT executed yet**  
👉 It is **stored as data**

---

## 🔹 Step 8: Window function execution (`row_number()`)

```sql
row_number() OVER (
  ORDER BY target_catalog, target_schema, target_table
)
```

Window functions run **after aggregation**.

Spark:

- Orders the grouped result
- Assigns row numbers
- Adds `seq_row_num`
- Produces final `id`

---

## 🔹 Step 9: Final projection

Spark returns a DataFrame with columns like:

```text
id
project
suite_name
test_name
source_column_names
target_column_names
query
```

This DataFrame is returned to Python as `df`.

---

# 4️⃣ Execution order AFTER SQL (Python side)

---

## 🔹 Step 10: Write to Delta table

```python
df.write.format("delta")
  .mode("append")
  .saveAsTable("cbi.test.test_repository")
```

Spark:

- Appends new test definitions
- Commits Delta transaction
- IDs are persisted

---

## 🔹 Step 11: Display

```python
display(df)
```

Databricks:

- Renders the DataFrame
- No data reprocessing (uses cached result)

---

# 5️⃣ Visual execution flow (mental model)

```text
Metadata rows (R1)
   ↓
JOIN seq_row_num (R2)
   ↓
WHERE filter
   ↓
GROUP BY (table level)
   ↓
array_agg (column level)
   ↓
concat (SQL generation)
   ↓
row_number (ID)
   ↓
write test_repository
```

---

# 6️⃣ Key takeaways (memorise these)

✅ SQL is **set-based**, not procedural  
✅ `array_agg` replaces loops  
✅ `group by` defines test scope  
✅ `row_number()` runs **after aggregation**  
✅ The generated SQL is **data**, not executed here

---

## ✅ One-line summary

> **Spark first filters and groups metadata rows, then aggregates column mappings, then generates SQL strings, then assigns IDs, and only afterwards writes the results to the test repository.**

---

