Below is a **practical, production-ready way** to do **Anomaly / Distribution Checks in Databricks**, written from a **QA / data-platform** perspective (fits PADP / Lakehouse / dbt + Databricks setups).

I’ll structure this as:

1. What anomaly & distribution checks mean (clearly)
    
2. What to test (categories)
    
3. How to implement in Databricks (SQL + PySpark)
    
4. How to operationalise (alerts, baselines, CI)
    
5. How to document it in a Test Plan
    

---

## 1️⃣ What are Anomaly / Distribution Checks?

They answer this question:

> **“Did today’s data behave _unexpectedly_ compared to historical patterns?”**

This is **not correctness of a single row**, but **statistical / pattern-level QA**.

Typical signals:

- Sudden spikes / drops
    
- Shape of data distribution changes
    
- Unexpected value ranges
    
- Volume anomalies
    

---

## 2️⃣ What to Test (Core Categories)

### A. Volume & Cardinality Anomalies

|Check|Example|
|---|---|
|Row count|Today vs historical avg|
|Distinct count|# of patients suddenly halves|
|Group volume|One HHS spikes abnormally|

---

### B. Distribution Shape Changes

|Check|Example|
|---|---|
|Mean / median|Avg LOS jumps 3×|
|Percentiles|P95 wait time collapses|
|Histogram|Values concentrate at one number|

---

### C. Range & Outlier Detection

|Check|Example|
|---|---|
|Min / Max|Negative duration|
|Z-score|Extreme outliers|
|IQR|Values far outside normal band|

---

### D. Category Proportion Drift

|Check|Example|
|---|---|
|Status codes|“Completed” drops from 90% → 40%|
|Enum mix|New unexpected category dominates|

---

## 3️⃣ How to Implement in Databricks

You usually do this in **Silver / Gold QA layer**.

---

## A. Volume anomaly (SQL – simplest & most common)

### Step 1: Build historical baseline

```sql
select
  avg(cnt)  as avg_cnt,
  stddev(cnt) as std_cnt
from (
  select count(*) as cnt
  from gold.fct_encounter
  where load_date >= current_date() - 30
  group by load_date
)
```

### Step 2: Compare today

```sql
with today as (
  select count(*) as cnt
  from gold.fct_encounter
  where load_date = current_date()
)
select
  cnt,
  case
    when cnt > avg_cnt + 3 * std_cnt then 'HIGH_SPIKE'
    when cnt < avg_cnt - 3 * std_cnt then 'DROP'
    else 'NORMAL'
  end as anomaly_flag
from today
cross join baseline
```

📌 **Fail condition**  
`anomaly_flag != 'NORMAL'`

---

## B. Distribution drift (percentiles – very effective)

```sql
select
  approx_percentile(wait_time_min, 0.5)  as p50,
  approx_percentile(wait_time_min, 0.95) as p95
from gold.fct_encounter
where load_date = current_date()
```

Compare against **historical percentiles** (store daily stats).

📌 Red flags:

- p95 drops to near zero
    
- p50 suddenly equals p95 (collapsed distribution)
    

---

## C. Z-score anomaly (PySpark – numeric fields)

```python
from pyspark.sql.functions import col, avg, stddev

stats = df.select(
    avg("wait_time").alias("mean"),
    stddev("wait_time").alias("std")
).collect()[0]

df_anomaly = df.withColumn(
    "z_score",
    (col("wait_time") - stats["mean"]) / stats["std"]
).filter(abs(col("z_score")) > 3)
```

📌 **Fail condition**

- % of rows with |z| > 3 exceeds threshold (e.g. 0.5%)
    

---

## D. Category distribution drift

```sql
select
  status,
  count(*) / sum(count(*)) over () as ratio
from gold.fct_encounter
where load_date = current_date()
group by status
```

Compare with historical ratios.

📌 Red flags:

- One category jumps disproportionately
    
- Previously dominant category disappears
    

---

## E. Range violations

```sql
select count(*) as bad_rows
from gold.fct_encounter
where wait_time_min < 0
   or wait_time_min > 1440
```

📌 **Fail condition**  
`bad_rows > 0`

---

## 4️⃣ Making It Operational (Real-World)

### A. Persist daily metrics (strongly recommended)

Create a **data_quality_metrics** table:

|date|table|metric|value|
|---|---|---|---|
|2026-01-28|fct_encounter|row_count|1,234,567|
|2026-01-28|fct_encounter|p95_wait|320|

This allows:

- Trend analysis
    
- Backtesting thresholds
    
- Auditability
    

---

### B. Threshold strategy (don’t hardcode blindly)

|Metric|Typical Rule|
|---|---|
|Row count|±3σ|
|Percentiles|±20%|
|Category ratio|±10%|
|Outliers|<0.5%|

---

### C. Alerting

Use:

- Databricks Jobs + failure
    
- SQL Alerts
    
- Downstream (Teams / Email / Pager)
    

---

## 5️⃣ How to Write This as a Test Case

### Test Case: Anomaly & Distribution Validation

|Field|Value|
|---|---|
|Test Type|Data Quality – Statistical|
|Tool|Databricks SQL / PySpark|
|Layer|Silver / Gold|
|Objective|Detect abnormal data behaviour|
|Baseline|Last 30 days|
|Metrics|Row count, percentiles, ratios|
|Pass Criteria|Metrics within thresholds|
|Fail Criteria|Significant deviation detected|

---

## 6️⃣ Key Positioning (important for stakeholders)

> **Anomaly checks do not assert correctness; they detect unexpected behaviour that indicates upstream issues, schema changes, partial loads, or logic regressions.**

This makes them:

- Non-controversial
    
- Non-blocking (unless severe)
    
- Extremely valuable
    

---

# Databricks上面的具体的做法
下面给你一套 **Production-ready 的完整框架**：  
✅ 自动扫描 Unity Catalog 里的 views（或用白名单）  
✅ 每天采集 metrics 写入 **一张 Delta 历史表**  
✅ 自动做 anomaly 检测（阈值 / 7日均值 / Z-score 三种）  
✅ 输出 anomaly 结果表（方便告警/DevOps/邮件集成）  
✅ 适配 “很多 views + 只想存历史指标，不存全量数据” 的场景

> 你可以直接复制到 Databricks（SQL + Notebook + Job）。

---

## 0) 约定与目标

- 你有很多 view（业务层 / accurate 层等）
    
- 你想保存历史：**只存统计指标 history（metrics history）**
    
- 统一落地到：`<catalog>.monitoring` schema 下
    

你只需要替换：

- `CATALOG_NAME`
    
- `SCHEMA_NAME`（view所在schema；或用扫描全catalog）
    
- 阈值策略（row_count / null_rate / distinct / min/max/avg）
    

---

## 1) 一次性建表（SQL）

### 1.1 建 schema（如需要）

```sql
CREATE SCHEMA IF NOT EXISTS CATALOG_NAME.monitoring;
```

### 1.2 View 清单表（可选：白名单/黑名单/owner/tag）

```sql
CREATE TABLE IF NOT EXISTS CATALOG_NAME.monitoring.view_registry (
  view_fqn        STRING,      -- fully qualified name: catalog.schema.view
  enabled         BOOLEAN,
  layer           STRING,       -- e.g. ods/flatten/transform/accurate/business
  owner           STRING,
  notes           STRING,
  created_ts      TIMESTAMP
)
USING DELTA;
```

> 你可以只维护 enabled=true 的 view；也可以不用 registry，直接自动扫描（后面给两种模式）。

### 1.3 Metrics 历史表（核心）

```sql
CREATE TABLE IF NOT EXISTS CATALOG_NAME.monitoring.view_metrics_history (
  run_id              STRING,
  view_fqn            STRING,
  metric_date         DATE,
  metric_ts           TIMESTAMP,

  row_count           BIGINT,

  -- 通用：数值列统计（可为空）
  numeric_col         STRING,
  min_value           DOUBLE,
  max_value           DOUBLE,
  avg_value           DOUBLE,

  -- 通用：空值率（可为空）
  null_col            STRING,
  null_count          BIGINT,
  null_rate           DOUBLE,

  -- 通用：distinct（可为空）
  distinct_col        STRING,
  distinct_count      BIGINT,

  -- 运行信息
  status              STRING,       -- OK / ERROR
  error_message       STRING
)
USING DELTA
PARTITIONED BY (metric_date);
```

### 1.4 Anomaly 结果表（用于告警/报表/审计）

```sql
CREATE TABLE IF NOT EXISTS CATALOG_NAME.monitoring.view_anomaly_results (
  run_id           STRING,
  view_fqn         STRING,
  metric_date      DATE,
  metric_ts        TIMESTAMP,

  check_name       STRING,      -- e.g. ROWCOUNT_DROP_30PCT
  severity         STRING,      -- INFO/WARN/CRITICAL
  metric_name      STRING,      -- row_count/null_rate/distinct_count/avg_value...
  observed_value   DOUBLE,
  expected_value   DOUBLE,
  threshold_value  DOUBLE,
  passed           BOOLEAN,

  details          STRING
)
USING DELTA
PARTITIONED BY (metric_date);
```

---

## 2) Notebook：采集 metrics（Python / PySpark）

创建一个 notebook（例如：`monitoring_collect_view_metrics`）：

> 这个版本支持：
> 
> - **模式 A：自动扫描** 某个 catalog/schema 下所有 VIEW
>     
> - **模式 B：从 view_registry 取 enabled=true 的 view**
>     

并且支持为每个 view 配置要监控的列（null / distinct / numeric）。

```python
# Databricks notebook: monitoring_collect_view_metrics
from pyspark.sql import functions as F
from datetime import datetime, date
import uuid

CATALOG = "CATALOG_NAME"
MON_SCHEMA = "monitoring"

# ====== 配置：选择 view 列表来源 ======
MODE = "AUTO_SCAN"   # "AUTO_SCAN" or "REGISTRY"

# AUTO_SCAN 模式下：扫描范围（可以只扫 business schema）
SCAN_CATALOG = "CATALOG_NAME"
SCAN_SCHEMA  = "SCHEMA_NAME"     # e.g. "business" / "accurate" / "*" (下面会处理)

# REGISTRY 模式下：从 registry 读 enabled views
REGISTRY_TABLE = f"{CATALOG}.{MON_SCHEMA}.view_registry"

# ====== 配置：每个 view 监控哪些列（按需扩展）======
# 你可以按 layer/命名规则配置；这里给个示例：key 用 view_fqn
MONITOR_CONFIG = {
  # "CATALOG.schema.view": {"null_cols":[...], "distinct_cols":[...], "numeric_cols":[...]}
  f"{SCAN_CATALOG}.{SCAN_SCHEMA}.admission_vw": {
    "null_cols": ["age", "admission_type"],
    "distinct_cols": ["patient_id"],
    "numeric_cols": ["age"]
  },
  # 没配置的 view 也可以只收 row_count（框架默认）
}

HISTORY_TABLE = f"{CATALOG}.{MON_SCHEMA}.view_metrics_history"

run_id = str(uuid.uuid4())
metric_date = date.today()
metric_ts = datetime.now()

def list_views_auto_scan(catalog: str, schema: str):
    if schema == "*" or schema.strip() == "":
        q = f"""
        SELECT table_catalog, table_schema, table_name
        FROM system.information_schema.tables
        WHERE table_catalog = '{catalog}'
          AND table_type = 'VIEW'
        """
    else:
        q = f"""
        SELECT table_catalog, table_schema, table_name
        FROM system.information_schema.tables
        WHERE table_catalog = '{catalog}'
          AND table_schema = '{schema}'
          AND table_type = 'VIEW'
        """
    rows = spark.sql(q).collect()
    return [f"{r['table_catalog']}.{r['table_schema']}.{r['table_name']}" for r in rows]

def list_views_from_registry(registry_table: str):
    rows = spark.table(registry_table).filter(F.col("enabled") == True).select("view_fqn").collect()
    return [r["view_fqn"] for r in rows]

def safe_collect_metrics(view_fqn: str):
    """
    Return list[dict] rows to append into view_metrics_history.
    Each view can generate multiple rows:
      - row_count row
      - per null col row
      - per distinct col row
      - per numeric col row
    """
    base_row = {
        "run_id": run_id,
        "view_fqn": view_fqn,
        "metric_date": metric_date,
        "metric_ts": metric_ts,
        "row_count": None,
        "numeric_col": None, "min_value": None, "max_value": None, "avg_value": None,
        "null_col": None, "null_count": None, "null_rate": None,
        "distinct_col": None, "distinct_count": None,
        "status": "OK",
        "error_message": None
    }

    try:
        df = spark.table(view_fqn)

        rows_out = []

        # 1) row_count
        rc = df.count()
        r = dict(base_row)
        r["row_count"] = int(rc)
        rows_out.append(r)

        cfg = MONITOR_CONFIG.get(view_fqn, {})
        null_cols = cfg.get("null_cols", [])
        distinct_cols = cfg.get("distinct_cols", [])
        numeric_cols = cfg.get("numeric_cols", [])

        # 2) null rate per col
        for c in null_cols:
            # null_count = count(*) - count(col)
            # null_rate = null_count / row_count (protect divide by zero)
            null_count = df.selectExpr(f"count(*) - count({c}) as null_count").collect()[0]["null_count"]
            r = dict(base_row)
            r["row_count"] = int(rc)
            r["null_col"] = c
            r["null_count"] = int(null_count)
            r["null_rate"] = float(null_count) / float(rc) if rc and rc > 0 else 0.0
            rows_out.append(r)

        # 3) distinct per col
        for c in distinct_cols:
            dc = df.selectExpr(f"count(distinct {c}) as distinct_count").collect()[0]["distinct_count"]
            r = dict(base_row)
            r["row_count"] = int(rc)
            r["distinct_col"] = c
            r["distinct_count"] = int(dc)
            rows_out.append(r)

        # 4) numeric stats per col
        for c in numeric_cols:
            stats = df.selectExpr(
                f"min({c}) as min_value",
                f"max({c}) as max_value",
                f"avg({c}) as avg_value"
            ).collect()[0]
            r = dict(base_row)
            r["row_count"] = int(rc)
            r["numeric_col"] = c
            r["min_value"] = float(stats["min_value"]) if stats["min_value"] is not None else None
            r["max_value"] = float(stats["max_value"]) if stats["max_value"] is not None else None
            r["avg_value"] = float(stats["avg_value"]) if stats["avg_value"] is not None else None
            rows_out.append(r)

        return rows_out

    except Exception as e:
        r = dict(base_row)
        r["status"] = "ERROR"
        r["error_message"] = str(e)[:2000]
        return [r]

# ====== 获取 view 列表 ======
if MODE == "AUTO_SCAN":
    views = list_views_auto_scan(SCAN_CATALOG, SCAN_SCHEMA)
else:
    views = list_views_from_registry(REGISTRY_TABLE)

# ====== 采集并落表 ======
all_rows = []
for v in views:
    all_rows.extend(safe_collect_metrics(v))

out_df = spark.createDataFrame(all_rows)
(out_df
 .withColumn("metric_date", F.to_date(F.col("metric_date")))
 .withColumn("metric_ts", F.to_timestamp(F.col("metric_ts")))
 .write.mode("append")
 .saveAsTable(HISTORY_TABLE)
)

display(out_df.orderBy(F.col("view_fqn"), F.col("null_col"), F.col("distinct_col"), F.col("numeric_col")))
```

> 说明：

- 没配置的 view 也会至少记录 `row_count`
    
- 配置了 null/distinct/numeric 的 view，会记录更多行（每列一行），方便后续对每个指标做 anomaly 检测
    
- 发生异常（view 解析失败/权限等）也会记录一条 ERROR 行，方便审计
    

---

## 3) Notebook：Anomaly 检测（SQL 为主，最稳定）

创建另一个 notebook（例如：`monitoring_detect_anomalies_sql`），跑下面 SQL（可用 spark.sql 执行或直接 SQL Warehouse）。

### 3.1 Row count：相对 7 日均值跌幅（30%）

```sql
INSERT INTO CATALOG_NAME.monitoring.view_anomaly_results
WITH base AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts,
    row_count
  FROM CATALOG_NAME.monitoring.view_metrics_history
  WHERE status = 'OK'
    AND numeric_col IS NULL
    AND null_col IS NULL
    AND distinct_col IS NULL
),
stats AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts, row_count,
    AVG(row_count) OVER (
      PARTITION BY view_fqn
      ORDER BY metric_date
      ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
    ) AS avg_7d
  FROM base
)
SELECT
  run_id,
  view_fqn,
  metric_date,
  metric_ts,
  'ROWCOUNT_DROP_VS_AVG7D' AS check_name,
  'CRITICAL' AS severity,
  'row_count' AS metric_name,
  CAST(row_count AS DOUBLE) AS observed_value,
  CAST(avg_7d AS DOUBLE) AS expected_value,
  0.70 AS threshold_value,
  CASE
    WHEN avg_7d IS NULL THEN TRUE                -- 前7天不足，不判异常
    WHEN row_count >= avg_7d * 0.70 THEN TRUE
    ELSE FALSE
  END AS passed,
  CONCAT('row_count=', row_count, ', avg_7d=', avg_7d) AS details
FROM stats;
```

### 3.2 Null rate：相对 7 日均值上升（+5% 绝对值）

```sql
INSERT INTO CATALOG_NAME.monitoring.view_anomaly_results
WITH base AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts,
    null_col,
    null_rate
  FROM CATALOG_NAME.monitoring.view_metrics_history
  WHERE status = 'OK'
    AND null_col IS NOT NULL
),
stats AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts,
    null_col,
    null_rate,
    AVG(null_rate) OVER (
      PARTITION BY view_fqn, null_col
      ORDER BY metric_date
      ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
    ) AS avg_7d
  FROM base
)
SELECT
  run_id,
  view_fqn,
  metric_date,
  metric_ts,
  'NULLRATE_SPIKE_VS_AVG7D' AS check_name,
  'WARN' AS severity,
  CONCAT('null_rate:', null_col) AS metric_name,
  CAST(null_rate AS DOUBLE) AS observed_value,
  CAST(avg_7d AS DOUBLE) AS expected_value,
  0.05 AS threshold_value,
  CASE
    WHEN avg_7d IS NULL THEN TRUE
    WHEN null_rate <= avg_7d + 0.05 THEN TRUE
    ELSE FALSE
  END AS passed,
  CONCAT('null_col=', null_col, ', null_rate=', null_rate, ', avg_7d=', avg_7d) AS details
FROM stats;
```

### 3.3 Distinct count：相对 7 日均值跌幅（20%）

```sql
INSERT INTO CATALOG_NAME.monitoring.view_anomaly_results
WITH base AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts,
    distinct_col,
    distinct_count
  FROM CATALOG_NAME.monitoring.view_metrics_history
  WHERE status = 'OK'
    AND distinct_col IS NOT NULL
),
stats AS (
  SELECT
    run_id, view_fqn, metric_date, metric_ts,
    distinct_col,
    distinct_count,
    AVG(distinct_count) OVER (
      PARTITION BY view_fqn, distinct_col
      ORDER BY metric_date
      ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
    ) AS avg_7d
  FROM base
)
SELECT
  run_id,
  view_fqn,
  metric_date,
  metric_ts,
  'DISTINCT_DROP_VS_AVG7D' AS check_name,
  'WARN' AS severity,
  CONCAT('distinct_count:', distinct_col) AS metric_name,
  CAST(distinct_count AS DOUBLE) AS observed_value,
  CAST(avg_7d AS DOUBLE) AS expected_value,
  0.80 AS threshold_value,
  CASE
    WHEN avg_7d IS NULL THEN TRUE
    WHEN distinct_count >= avg_7d * 0.80 THEN TRUE
    ELSE FALSE
  END AS passed,
  CONCAT('distinct_col=', distinct_col, ', distinct_count=', distinct_count, ', avg_7d=', avg_7d) AS details
FROM stats;
```

### 3.4 数值列：max/min 边界（硬规则，最常用）

比如 age 必须 0~120：

```sql
INSERT INTO CATALOG_NAME.monitoring.view_anomaly_results
SELECT
  run_id,
  view_fqn,
  metric_date,
  metric_ts,
  'NUMERIC_RANGE_CHECK' AS check_name,
  'CRITICAL' AS severity,
  CONCAT('range:', numeric_col) AS metric_name,
  CAST(max_value AS DOUBLE) AS observed_value,
  120.0 AS expected_value,
  120.0 AS threshold_value,
  CASE
    WHEN numeric_col = 'age' AND (min_value < 0 OR max_value > 120) THEN FALSE
    ELSE TRUE
  END AS passed,
  CONCAT('numeric_col=', numeric_col, ', min=', min_value, ', max=', max_value, ', avg=', avg_value) AS details
FROM CATALOG_NAME.monitoring.view_metrics_history
WHERE status='OK'
  AND numeric_col IS NOT NULL;
```

> 你可以按每个 view 的字段含义定制规则（比如金额>=0、日期不能超未来等）。

---

## 4) Notebook：汇总本次 run 的失败项（给告警/DevOps）

```sql
SELECT *
FROM CATALOG_NAME.monitoring.view_anomaly_results
WHERE run_id = '${run_id}'      -- 如果你在 Job 里传参
  AND passed = false
ORDER BY severity DESC, view_fqn, check_name;
```

---

## 5) Databricks Job 编排（建议）

创建一个 Job（Daily 运行）：

1. Task A：`monitoring_collect_view_metrics`（先写 metrics）
    
2. Task B：`monitoring_detect_anomalies_sql`（再写 anomaly results）
    
3. Task C（可选）：如果 B 有 failed，则触发通知（Webhook / email / Teams / DevOps）
    

> 通知方式你们环境各不一样：最常见是 **Job failure + webhook** 或者 **写表后由外部监控系统拉取**。

---

## 6) 关键最佳实践（适合“很多 view”）

### 6.1 不要存 view 数据，只存 metrics

- 100 views × 365 天 = 36,500 行左右（非常小）
    
- 你甚至可以保存 20 个指标，也依然很小
    

### 6.2 配置管理（强烈建议）

把 `MONITOR_CONFIG` 从 notebook 字典升级为一张配置表，例如：

`CATALOG_NAME.monitoring.view_metric_config`

- view_fqn
    
- metric_type (ROWCOUNT/NULLRATE/DISTINCT/NUMERIC)
    
- column_name
    
- rule_json (阈值/范围)
    

这样不需要改代码就能加 view。

---

## 7) dbt（可选加分：把“硬规则”变成 dbt tests）

如果你想把一部分 hard checks 变成 dbt tests（适合 CI）：

```yaml
version: 2

models:
  - name: admission_vw
    tests:
      - dbt_expectations.expect_table_row_count_to_be_between:
          min_value: 500000
          max_value: 2000000

    columns:
      - name: age
        tests:
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              max_value: 120
```

> anomaly（漂移）更适合你上面那套 metrics history + rolling baseline；dbt 更适合 hard constraints。

---

## 你接下来怎么落地（最省事路径）

1. 先建 4 张表（registry/history/anomaly）
    
2. 把采集 notebook 跑通（哪怕先只收 row_count）
    
3. 加入 2～3 条最关键 anomaly 规则（row_count/null_rate/distinct）
    
4. 加到 daily job
    
5. 再逐步把 MONITOR_CONFIG 配齐到关键 view（business views 优先）
    

---

如果你愿意我再帮你把这套升级到“配置驱动版本”（完全不用改 notebook，只改配置表就能新增 view/新增列/新增阈值），我可以直接把那张 config 表的 DDL + 解析逻辑也给你。