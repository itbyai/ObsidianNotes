Anomaly / distribution checks in dbt are used to answer this question:

> **“Did today’s data behave very differently from what we usually expect?”**

They are **not deterministic rules** (like NOT NULL or UNIQUE).  
They are **statistical / trend-based checks**.

Below is the **correct, production-grade way** to do anomaly & distribution testing with dbt.

---

## 1️⃣ What are Anomaly / Distribution checks?

They detect **unexpected changes**, such as:

- Sudden spikes or drops in row counts
    
- Metric jumps (revenue, volume, duration)
    
- Distribution shifts (mean, min/max, percentiles)
    
- Schema-level volume anomalies
    

These tests usually compare:

- **Today vs historical baseline**
    
- **Current window vs rolling window**
    

---

## 2️⃣ dbt has NO built-in anomaly tests (by design)

dbt core does **not** provide anomaly detection natively because:

- Anomalies are **business-specific**
    
- Statistical assumptions vary
    
- Warehouses differ in SQL support
    

👉 In dbt, anomaly tests are implemented via:

1. **`dbt_utils` macros**
    
2. **Custom SQL tests**
    
3. (Optional) **metrics / exposures + external monitoring**
    

---

## 3️⃣ Row-count anomaly detection (most common)

### Business rule example

> “Daily row count should not change by more than ±30% vs yesterday”

### Custom test

📁 `tests/anomaly_row_count.sql`

```sql
with daily_counts as (
    select
        date(load_date) as d,
        count(*) as row_cnt
    from {{ ref('fct_orders') }}
    group by 1
),
compare as (
    select
        d,
        row_cnt,
        lag(row_cnt) over (order by d) as prev_cnt
    from daily_counts
)
select *
from compare
where prev_cnt is not null
  and abs(row_cnt - prev_cnt) / prev_cnt > 0.30
```

If this returns rows → ❌ anomaly detected.

---

## 4️⃣ Metric anomaly detection (sum / avg)

### Example

> “Total daily revenue should not deviate by more than 40% from 7-day average”

```sql
with daily_revenue as (
    select
        date(order_date) as d,
        sum(amount) as revenue
    from {{ ref('fct_sales') }}
    group by 1
),
baseline as (
    select
        d,
        revenue,
        avg(revenue) over (
            order by d
            rows between 7 preceding and 1 preceding
        ) as avg_7d
    from daily_revenue
)
select *
from baseline
where avg_7d is not null
  and abs(revenue - avg_7d) / avg_7d > 0.40
```

---

## 5️⃣ Distribution checks (min / max / mean / percentiles)

### Example

> “Session duration distribution should remain stable”

```sql
with stats as (
    select
        date(event_date) as d,
        avg(duration) as avg_dur,
        percentile_cont(0.95) within group (order by duration) as p95
    from {{ ref('fct_sessions') }}
    group by 1
),
baseline as (
    select
        d,
        avg_dur,
        avg(avg_dur) over (
            rows between 7 preceding and 1 preceding
        ) as baseline_avg
    from stats
)
select *
from baseline
where baseline_avg is not null
  and abs(avg_dur - baseline_avg) / baseline_avg > 0.50
```

---

## 6️⃣ Using `dbt_utils` for simple anomaly logic

### Example: row count > 0 (basic sanity)

```yaml
models:
  - name: stg_customers
    tests:
      - dbt_utils.not_empty
```

⚠️ This is **not real anomaly detection**, but useful as a guardrail.

---

## 7️⃣ Incremental model anomaly checks (very important)

For incremental models, anomalies often mean:

- CDC broke
    
- watermark failed
    
- duplicates reappeared
    

### Example

> “Today’s incremental load must not exceed 3× average daily load”

```sql
with inc_load as (
    select
        load_date,
        count(*) as cnt
    from {{ ref('im_events') }}
    where load_date = current_date
    group by 1
),
baseline as (
    select avg(cnt) as avg_cnt
    from (
        select
            load_date,
            count(*) as cnt
        from {{ ref('im_events') }}
        where load_date >= current_date - 7
        group by 1
    )
)
select *
from inc_load, baseline
where cnt > avg_cnt * 3
```

---

## 8️⃣ Severity control (VERY important)

Anomaly tests should **start as warnings**, not errors.

```yaml
tests:
  - anomaly_row_count:
      severity: warn
```

This avoids:

- False positives
    
- Pipeline noise
    
- Alert fatigue
    

---

## 9️⃣ Where anomaly tests belong (best practice)

|Layer|Anomaly tests|
|---|---|
|Source / ODS|❌ (use freshness instead)|
|Staging|⚠️ Rare|
|Intermediate|✅ Incremental / volume|
|Mart / Fact|✅ Metrics & distributions|

---

## 10️⃣ Common mistakes (avoid these)

❌ Treating anomalies as hard business rules  
❌ Running anomaly tests on small datasets  
❌ No rolling baseline  
❌ Thresholds too tight  
❌ Mixing freshness with anomaly logic

---

## 11️⃣ Minimal anomaly test template

```sql
select *
from {{ ref('model') }}
where <current_metric deviates from historical baseline>
```

**Return rows = anomaly detected**

---

## TL;DR

- Anomaly tests = **trend & distribution checks**
    
- dbt has **no built-in anomaly tests**
    
- Implement using **custom SQL tests**
    
- Compare current vs historical baseline
    
- Start with `severity: warn`
    
- Use mainly for **facts & incrementals**
    

---

If you want, I can next:

- Design a **full anomaly test pack** (row count, metrics, CDC)
    
- Help you tune **thresholds that actually work**
    
- Show how to **separate signal vs noise**
    
- Integrate anomalies with **CI / Azure DevOps alerts**
    

Just tell me which layer or metric you want to protect.