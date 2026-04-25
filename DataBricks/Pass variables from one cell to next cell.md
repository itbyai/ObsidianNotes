Great question! In Databricks/Spark notebooks, **what “persists” across cells depends on the language mode and the object type**. Here’s a practical guide to passing **parameters** and **views** from one cell to the next.

---

## 1) Python ↔ Python (same notebook)

**Variables and objects (including DataFrames) live in the same Python kernel**, so they’re available in later cells.

# Cell 1 (Python)

threshold = 10
df = spark.read.table("sales.orders")
df_filtered = df.filter(df.amount > threshold)

# Cell 2 (Python)

df_filtered.select("order_id", "amount").show()

**Tip:** This is true for anything created in Python: variables, functions, DataFrames, UDFs, etc.

---

## 2) Passing values into SQL cells

SQL cells run in the same Spark session, but **SQL itself doesn’t “see” your Python variables** unless you pass them in. You have a few options:

### Option A: Call SQL from Python

Build the SQL string using Python variables and run it via `spark.sql(...)`.

# Cell 1 (Python)

schema = "sales"

min_amount = 50

  

# Cell 2 (Python)

result = spark.sql(f"""

  SELECT order_id, amount

  FROM {schema}.orders

  WHERE amount >= {min_amount}

""")

result.show()

### Option B: Use **temp views** to bridge Python → SQL

Register a DataFrame as a **temporary view**; SQL cells can query it.

# Cell 1 (Python)

df = spark.read.table("sales.orders")
df.createOrReplaceTempView("orders_tmp")
# Cell 2 (SQL)

SELECT order_id, amount
FROM orders_tmp
WHERE amount >= 50;

- **Temporary view** lifetime: **current Spark session** (your notebook cluster session).
- Use **global temp view** if you need `"global_temp.<name>"` accessible across _notebooks in the same cluster session_:

df.createOrReplaceGlobalTempView("orders_g")
-- In any notebook on the same cluster session
SELECT * FROM global_temp.orders_g;
``
---

## 3) SQL ↔ SQL (between SQL cells)

- **Catalog/schema settings** (e.g., `USE CATALOG`, `USE SCHEMA`) persist for the session, so later cells inherit them.
- **Temporary views** created in a SQL cell are accessible in later SQL cells of the same session.

-- Cell 1 (SQL)
USE CATALOG main;
USE SCHEMA sales;
CREATE OR REPLACE TEMP VIEW big_orders AS
SELECT * FROM orders WHERE amount >= 100;

-- Cell 2 (SQL)
SELECT COUNT(*) FROM big_orders;  -- works in later cells (same session)
**Note on SQL variables:** SQL `DECLARE` variables (where supported) are scoped to the statement block, not the whole session. To “persist” a value, prefer widgets, temp views, or pass from Python.

---

## 4) Notebook **widgets** (for parameters you set once and reuse)

Widgets are great for **user-set parameters** that many cells can read (in any language with small adjustments).

# Cell 1 (Python)

dbutils.widgets.text("min_amount", "100", "Minimum Amount")
min_amount = int(dbutils.widgets.get("min_amount"))
Use the widget value in Python:

# Cell 2 (Python)
df = spark.table("sales.orders").filter(f"amount >= {min_amount}")
``
Use the widget value in SQL (via Python bridge):

# Cell 3 (Python)

spark.sql(f"""

  SELECT order_id, amount

  FROM sales.orders

  WHERE amount >= {min_amount}

""").show()

_(In pure SQL you can’t read a widget directly; fetch it in Python and inject into SQL as shown.)_

---

## 5) Persisting beyond the session (cluster detach/restart)

If you need the output to outlive the session:

- **Create a view or table in the metastore** (managed by your catalog/schema):

-- SQL

CREATE OR REPLACE VIEW sales.big_orders AS

SELECT * FROM sales.orders WHERE amount >= 100;

Or write a **table**:

df_filtered.write.mode("overwrite").saveAsTable("sales.big_orders_tbl")

These are persisted and available next time, even after a restart (assuming you have permissions).

---

## 6) Passing Python values to SQL safely

When injecting values, be careful with quoting and types:

country = "AU"
min_amount = 100
spark.sql(f"""
  SELECT *
  FROM sales.orders
  WHERE country = '{country}' AND amount >= {min_amount}
""")

For complex values or to avoid string interpolation pitfalls, consider creating a small **DataFrame of parameters** and joining/using it in SQL, or keep the logic in the **DataFrame API**.

---

## 7) Quick patterns you can copy

**Python variable → SQL filter**
limit_n = 10
spark.sql(f"SELECT * FROM sales.orders ORDER BY amount DESC LIMIT {limit_n}").show()

**Python DataFrame → SQL temp view → SQL cell**

df = spark.read.table("sales.orders").filter("status = 'COMPLETE'")
df.createOrReplaceTempView("complete_orders")
SELECT status, COUNT(*) FROM complete_orders GROUP BY status;
**Global temp view (across notebooks on same cluster session)**

df.createOrReplaceGlobalTempView("shared_data")
SELECT * FROM global_temp.shared_data;
``

---
### Common gotchas

- **Temp views vanish** when the cluster detaches/restarts (session ends).
- **Global temp views** still vanish on session end; they’re just visible across notebooks _within_ the same session.
- **SQL variables (`DECLARE`)** don’t persist across cells.
- **Widgets** persist per notebook (and are easy for parameterization).
- **Persisted views/tables** are the only way to keep results beyond the session.

---

If you tell me your exact flow (e.g., “Python cell filters a DataFrame → SQL cell queries it → another notebook uses it”), I can sketch the best pattern and provide ready-to-run cells for your setup.