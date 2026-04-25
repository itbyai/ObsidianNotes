下面给你一份**“经典 & 核心且刚需”的测试清单**，专门针对你描述的 **dbt + Databricks 全视图（views）数据流水线**：  
**ODS Ingestion → ODS Flattening → Staging → Business View → Star Schema → Self‑Service Layer**。  
我严格筛选了**一定要做**、**高性价比**、**行业通行**的测试，**弱化/忽略“可有可无”的检查**。  
每条都标明**测试名称**、**测试目的**、**在哪儿测（dbt 还是 Databricks）**，并给出简短示例（尽量不冗长，便于直接落地）。

> 约定：
> 
> - **dbt**：指 dbt **generic tests / schema tests / singular tests**（YAML 或 SQL），跑在 Databricks SQL 上。
> - **Databricks**：指 **Databricks SQL**（含 Unity Catalog 元数据级约束/权限）与 **作业编排/告警**能力。
> - 你场景全是 **view**，所以不涉及持久化表的物理约束，测试需更注重**数据质量与一致性**。

---

## 0. 全局（适用于所有层）——必须做的“横切”测试

### 0.1 Source Freshness（源新鲜度）

- **目的**：确保上游数据按预期更新，防止“陈旧数据”继续被消费。
- **在哪儿测**：**dbt**（`source freshness`）。
- **要点**：对 ODS 源（bronze/landing）定义 `loaded_at_field` + SLA。
- **dbt 示例（sources.yml 摘要）**：
    
    sources:
    
      - name: ods
    
        tables:
    
          - name: orders_raw
    
            loaded_at_field: _ingested_at
    
            freshness:
    
              warn_after: {count: 2, period: hour}
    
              error_after: {count: 6, period: hour}
    

### 0.2 Schema Contract（字段契约：必备字段/类型/可空性）

- **目的**：防止上游 schema 演化悄然破坏下游视图（字段消失/类型变化）。
- **在哪儿测**：**dbt**（schema tests + Databricks UC 列类型校验）。
- **要点**：对关键字段设置 `not_null`、类型断言（通过 dbt singular test），并在 UC 锁定字段名/类型。

### 0.3 Key Integrity（业务键完整性）

- **目的**：保证每层的**主业务键**不为空、可用于稳定连接。
- **在哪儿测**：**dbt**。
- **常用**：`not_null` + `unique`（适用于应唯一的业务键或组合键）。

### 0.4 Row‑Level Count Reconciliation（行数/粒度对账）

- **目的**：分层转换不应丢数据或意外膨胀（按业务键或主事实粒度对账）。
- **在哪儿测**：**dbt**（singular test）或 **Databricks SQL** 作业。
- **要点**：按自然键/去重规则对账，而不是盲目全表计数。

---

## 1. ODS Ingestion（落地层 / 原始视图）

### 1.1 Source Schema Sanity（源列存在性/类型合理性）

- **目的**：源到 ODS 视图的**字段映射稳定**。
- **在哪儿测**：**dbt**。
- **测试**：关键列 `exists`（通过 dbt schema test `tests: - not_null` 等）+ 类型检查（singular）。

### 1.2 Duplicate Raw Events Detection（原始事件重复检测）

- **目的**：识别上游重复投递，避免后续层累积。
- **在哪儿测**：**dbt**。
- **测试**：对天然应唯一的字段或 `(natural_key, event_ts)` 作 `unique` 测试（若不唯一，至少发出告警）。

### 1.3 Ingestion Freshness（摄取时效）

- **目的**：确保摄取链路正常（与 0.1 互为验证）。
- **在哪儿测**：**dbt** source freshness + **Databricks** 作业告警（SLA）。

---

## 2. ODS Flattening（半结构化解包/规范化视图）

### 2.1 JSON/Struct Flatten Completeness（展开完整性）

- **目的**：保证关键字段成功展开且**非空率达预期**。
- **在哪儿测**：**dbt**。
- **测试**：对必需展开字段 `not_null`；对于可选字段定义**最低非空率**阈值（singular test）。

### 2.2 Type Conformance After Flatten（类型一致性）

- **目的**：展开后字段类型符合下游契约（如金额统一 decimal(38, 12)）。
- **在哪儿测**：**dbt**（singular 类型断言）+ **Databricks UC** 列类型检查。

### 2.3 Duplicate Collapse（去重规则正确性）

- **目的**：若 Flatten 含去重逻辑（如取最新），确保**每业务键仅一行**。
- **在哪儿测**：**dbt**。
- **测试**：`unique` on business key；若是“取最新”，再做“无并列最大时间戳”断言（singular）。

---

## 3. Staging（轻度清洗/标准化视图）

### 3.1 Business Key Not Null + Uniqueness（业务键必备）

- **目的**：为后续 JOIN 提供稳定锚点。
- **在哪儿测**：**dbt**（`not_null` + `unique`/组合唯一）。

### 3.2 Canonical Transform Correctness（标准化规则正确）

- **目的**：如货币单位、时区、布尔/枚举规范化正确。
- **在哪儿测**：**dbt**（accepted_values、singular 计算校验）。
- **测试**：`accepted_values` 用于状态/枚举；汇率/时区换算提供断言样例（小范围抽样 CASE 验证）。

### 3.3 Referential Readiness（外键可连接性）

- **目的**：Stage 视图中的外键**在下游维表可匹配**（提前发现孤儿记录）。
- **在哪儿测**：**dbt**（`relationships`）。
- **要点**：对即将用于维表连接的字段建立 `relationships` 测试。

---

## 4. Business View（业务视图：指标拼装/宽表）

### 4.1 Join Cardinality & Orphan Check（连接基数与孤儿检查）

- **目的**：保证 JOIN 不产生意外重复（基数爆炸）或孤儿丢失。
- **在哪儿测**：**dbt**（singular）。
- **测试**：
    - **爆炸检测**：输入记录数 vs 输出记录数（按主粒度聚合比对）
    - **孤儿检测**：左表键在右表命中率阈值（如≥99.5%）

### 4.2 Metric Definition Consistency（指标口径一致性）

- **目的**：关键指标（GMV、净额、活跃用户等）符合定义，单位正确。
- **在哪儿测**：**dbt**（singular）+ **Databricks SQL**（核对仪表板汇总/环比稳定性告警）。
- **测试**：对核心 KPI 做小样本**规则断言**（比如负值/超大值/不合业务逻辑时报警）。

### 4.3 Window/Dedup Logic Correctness（窗口/去重逻辑）

- **目的**：业务视图中常含窗口函数（取最新、分组排名等），需验证**唯一性**与**可重复性**。
- **在哪儿测**：**dbt**（singular）。
- **测试**：验证“每业务键仅有 1 行且符合窗口规则”。

---

## 5. Star Schema（维度/事实视图）

### 5.1 Dimension Surrogate Key Stability（维表主键稳定性）

- **目的**：维表键（即便派生）应**唯一 & 非空**。
- **在哪儿测**：**dbt**（`not_null` + `unique`）。

### 5.2 Fact Grain Integrity（事实表粒度完整性）

- **目的**：事实表按设定粒度（如订单行）应**无重复**。
- **在哪儿测**：**dbt**。
- **测试**：对粒度键组合做 `unique`；并验证常量度量不出现**负值/不合逻辑值**。

### 5.3 FK Relationships to Dimensions（事实→维度外键关系）

- **目的**：事实表外键在维表中均可解析（无大量孤儿）。
- **在哪儿测**：**dbt**（`relationships`）。
- **要点**：对每个外键列建立 `relationships`，并设置**最低命中率阈值**（singular 可自定义更严格检查）。

### 5.4 Slowly Changing Logic Omitted（仅当视图实现 SCD）

- **说明**：你全是 view，若不实现 SCD 型版本化，此项忽略；若实现 Type‑2 虚拟 SCD，要验证“同一业务键在同一时间仅一个有效版本”。

---

## 6. Self‑Service Layer（自助分析视图）

### 6.1 Semantic Contract（语义层字段契约）

- **目的**：暴露给业务的语义字段 **名称稳定、类型稳定、含义稳定**。
- **在哪儿测**：**dbt**（schema tests + 描述必填 lint）+ **Databricks UC**（描述/标签/数据分类治理）。
- **测试**：对**所有暴露字段**设 `description` 非空（lint/singular）+ 类型检查。

### 6.2 Access Control & PII Masking（访问控制与敏感数据）

- **目的**：确保自助层遵循数据安全（仅授权组可见，PII 脱敏/遮罩）。
- **在哪儿测**：**Databricks**（Unity Catalog 权限/动态视图/标签治理）。
- **测试**：验证角色权限矩阵；对标识类字段验证**脱敏视图**行为（示例：不同角色查询结果不同）。

### 6.3 Aggregation Correctness at Different Grains（多粒度聚合正确）

- **目的**：业务方在自助层做随意聚合时不致出错（避免重复计数/漏算）。
- **在哪儿测**：**dbt**（singular）+ **Databricks SQL**（样例报表回归）。
- **测试**：对典型聚合路径（天/周/月、客户/区域）做**交叉校验**样例。

---

## 7. 运行与平台级（非功能，但刚需）

### 7.1 Lineage Completeness（血缘完整性）

- **目的**：确保 dbt 血缘图中，所有下游视图来源均可追溯（无“悬空源”）。
- **在哪儿测**：**dbt**（`dbt docs generate` + 审核）+ **Databricks**（Unity Catalog lineage）。

### 7.2 Job Health & SLA（任务健康与 SLA）

- **目的**：失败告警及时、延迟超阈值报警。
- **在哪儿测**：**Databricks**（作业、告警、审计日志）+ **dbt**（`state:modified` 选择性运行）。
- **测试**：演练失败重试与通知链路。

### 7.3 Performance Baseline（性能基线，仅关键查询）

- **目的**：核心视图的关键查询维持在可接受的延迟。
- **在哪儿测**：**Databricks SQL**（QUERY PROFILE、成本基线）。
- **说明**：只对**关键**查询设基线，不做泛化微优化。

---

## 每一层的**最小化落地清单**（便于直接实施）

- **ODS**：Freshness；关键列 not_null；重复检测。
- **Flattening**：关键展开列 not_null；类型一致；去重后唯一。
- **Staging**：业务键 not_null + unique；枚举 accepted_values；关系 `relationships`。
- **Business View**：连接基数不爆炸；孤儿率低；核心指标口径断言。
- **Star Schema**：维表主键 not_null+unique；事实粒度 unique；事实→维度 `relationships`。
- **Self‑Service**：字段描述与类型契约；权限/脱敏验证；多粒度聚合样例通过。
- **平台级**：血缘图完整；作业 SLA 告警；关键查询性能基线。

---

## 简短 dbt 测试示例（YAML 片段）

models:

  - name: stg_orders

    columns:

      - name: order_id

        tests: [not_null, unique]

      - name: order_status

        tests:

          - accepted_values:

              values: ['CREATED','PAID','CANCELLED','REFUNDED']

      - name: customer_id

        tests:

          - relationships:

              to: ref('dim_customer')

              field: customer_id

**行数对账（singular 例子，按日）**

-- tests/reconciliation_stg_vs_ods.sql

with ods as (

  select order_id from {{ source('ods','orders_raw') }} where _ingested_at >= date_sub(current_date, 1)

),

stg as (

  select order_id from {{ ref('stg_orders') }} where order_date >= date_sub(current_date, 1)

)

select

  (select count(_) from stg) as stg_cnt,_

  _(select count(distinct order_id) from ods) as ods_cnt_

_where (select count(_) from stg) <> (select count(distinct order_id) from ods);

---

## 为什么这些是“经典 & 必做”

- 覆盖 **数据新鲜度 / 键完整性 / 连接正确性 / 指标口径 / 粒度一致性 / 权限治理** 六大核心风险。
- 适配 **view-only** 架构（不依赖物理约束），通过 **dbt tests + Databricks SQL/UC** 实现。
- 实战中对 **数据可信度** 和 **报表正确性**影响最大，且维护成本可控。

---

太好了，这些都是**数据工程里最关键、最容易出问题**的测试点。下面我按你提到的每一项，给出**怎么测、放在哪测（dbt / Databricks）**、以及**可直接复用的示例**（以 view-only 架构为前提）。尽量做到“拿去即用”。

> 约定：
> 
> - **dbt generic tests**（YAML 里的 `not_null/unique/relationships/accepted_values`）
> - **dbt singular tests**（放到 `tests/xxx.sql` 的自定义 SQL，**返回有行=失败**）
> - **Databricks SQL**：用于可视化、Job/Alert、Query Profile、SLA 告警
> - **所有示例均以 view 为目标对象**；若你的模型名不同，把 `{{ ref('...') }}` 替换成你的模型。

---

## 1) Duplicate Collapse（去重规则正确性）怎么测试？

**目标**：当你在 Flatten/Stage 做“去重（只留最新/首条）”时，验证**没有复活的重复**、**顺序规则可复现**、**每业务键仅一行**。

### 1.1 dbt —— 唯一性与“没有并列最大时间戳”

**场景**：你用 `row_number() over (partition by natural_key order by event_ts desc, _ingest_seq desc) = 1` 保留最新。

**（A）粒度唯一（generic test）**

models:

  - name: flt_orders   # 你的 flatten 视图名

    columns:

      - name: order_id

        tests: [not_null, unique]

**（B）没有“并列最大”导致不确定性（singular）**

> 若“最新”通过 (event_ts, _ingest_seq) 排序，那不允许同一个 `order_id` 有**相同的排序键**出现多条。

-- tests/no_ties_on_latest.sql

with base as (

  select order_id, event_ts, _ingest_seq, count(*) over(partition by order_id, event_ts, _ingest_seq) as c

  from {{ ref('flt_orders') }}

)

select 1

from base

where c > 1

limit 1;

**含义**：若返回行 → 存在并列最大 → 失败。

**（C）与原始源的去重一致性（按期内对账，singular）**

-- tests/dedup_reconciliation_period.sql

with source_raw as (

  select order_id, max(event_ts) as max_ts

  from {{ source('ods', 'orders_raw') }}

  where event_ts >= date_sub(current_date, 7)

  group by order_id

),

dedup as (

  select order_id, event_ts

  from {{ ref('flt_orders') }}

  where event_ts >= date_sub(current_date, 7)

)

select s.order_id

from source_raw s

left join dedup d on d.order_id = s.order_id and d.event_ts = s.max_ts

where d.order_id is null

limit 1;

**含义**：去重后应保留每个 `order_id` 的**最大 event_ts**；若找不到匹配 → 失败。

---

## 2) singular 计算校验是怎么做的？

**定义**：dbt 的 **singular tests** 就是一段 SQL，**返回任何行即失败**。  
**用法**：把校验逻辑写成“找异常”的查询，保存到 `tests/*.sql`。dbt 会自动执行并以“有行=失败”的规则判定。

**例子**：

- “指标不应为负”：`select * from model where metric < 0 limit 1`
- “分组后计数对不上”：做两个子查询汇总，再 `where left_sum <> right_sum`

> 上面各节的 `tests/*.sql` 示例就是 **singular tests**。

---

## 3) 3.3 Referential Readiness（在 dbt 怎么测？）

**目标**：Stage 层的外键在下游维表**可被解析**（避免孤儿记录进入后续 JOIN）。

### 3.1 dbt relationships（generic test）

models:

  - name: stg_orders

    columns:

      - name: customer_id

        tests:

          - relationships:

              to: ref('dim_customer')

              field: customer_id

**含义**：`stg_orders.customer_id` 必须能在 `dim_customer.customer_id` 找到匹配，**任何一个找不到即失败**。

### 3.2 “无大量孤儿”（允许极少异常）——（singular）

relationships 是“**有一个就 fail**”。为了允许少量合理异常（例如临时晚到），用 anti-join 计数并设置阈值：

-- tests/stg_orders_fk_hit_rate.sql

with o as (

  select customer_id from {{ ref('stg_orders') }}

),

d as (

  select customer_id from {{ ref('dim_customer') }}

),

anti as (

  select o.customer_id

  from o

  left join d using (customer_id)

  where d.customer_id is null

),

stats as (

  select

    (select count(_) from o) as total_rows,_

    _(select count(_) from anti) as orphan_rows

)

select *

from stats

where orphan_rows > total_rows * 0.005;  -- 孤儿率>0.5% 则失败

---

## 4) Join Cardinality（在 Databricks 怎么测？）

**目标**：检测业务宽表/业务视图里的 JOIN 是否引入**重复（基数爆炸）**或**丢失（错误的连接方向/条件）**。

### 4.1 基数爆炸检测（Databricks SQL 查询 + Alert）

-- 假设 business_view = fact_orders join dim_customer

-- 1) 连接前后行数对比（按业务粒度）

with f as (select count(distinct order_line_id) as cnt from fact_order_lines),

j as (

  select count(distinct order_line_id) as cnt

  from business_view_order_lines  -- join 之后的宽表视图

)

select

  (select cnt from j) as after_join,

  (select cnt from f) as before_join

where (select cnt from j) > (select cnt from f) * 1.001;  -- 超过0.1%膨胀则报错

- 在 Databricks SQL 建这个查询 → 配置 **Alert**（非空返回触发告警）。

### 4.2 孤儿丢失检测（命中率）

with f as (select customer_id from fact_order_lines),

d as (select customer_id from dim_customer),

hit as (

  select count(_) as hits_

  _from f join d using (customer_id)_

_),_

_allf as (select count(_) as total from f)

select *

from allf, hit

where hit.hits < allf.total * 0.995; -- 命中率<99.5%报警

> 这些在 dbt 里也能写成 singular test，但**Databricks SQL Alert**更适合持续监控。

---

## 5) 4.2 Metric Definition Consistency（指标口径一致性）怎么做？

**目标**：确保“口径=公式=单位=过滤条件”在各层**一致**；防回归。

### 5.1 固化指标计算为可复用片段（macro/CTE）+ 单元断言（dbt singular）

**示例**：GMV 口径固定为 `sum(case when is_cancelled=0 then item_price*qty else 0 end)`  
建立一个**基准样本**（golden dataset）或**跨层核对**：

-- tests/metric_gmv_consistency.sql

with src as (

  -- 用较低层数据按口径直接聚合（权威做法）

  select date(order_ts) as d,

         sum(case when is_cancelled=0 then item_price*qty else 0 end) as gmv_src

  from {{ ref('stg_order_lines') }}

  group by 1

),

bv as (

  -- 业务视图中现成的 gmv 指标（需要你在视图里有统一口径字段 gmv）

  select date(order_ts) as d, sum(gmv) as gmv_bv

  from {{ ref('business_view_sales') }}

  group by 1

)

select s.d, s.gmv_src, b.gmv_bv

from src s

full outer join bv b using(d)

where coalesce(s.gmv_src,0) <> coalesce(b.gmv_bv,0);

**返回有行=失败**；可按日/周/月跑，能迅速发现口径漂移。

### 5.2 单位/范围断言（负值/异常峰值）

-- tests/metric_non_negative.sql

select 1

from {{ ref('business_view_sales') }}

where gmv < 0

limit 1;

-- tests/metric_outlier_guardrail.sql

with agg as (

  select date(order_ts) as d, sum(gmv) as gmv

  from {{ ref('business_view_sales') }}

  group by 1

),

bounds as (

  select avg(gmv) as mean, stddev_pop(gmv) as s from agg

)

select 1

from agg, bounds

where agg.gmv > bounds.mean + 6*bounds.s  -- 超过 6σ 认为异常（示例阈值）

limit 1;

> 如果你使用 dbt Semantic Layer/metrics，也可在语义层统一定义指标，然后写 cross-check 查询对比两种实现结果。

---

## 6) Window/Dedup Logic Correctness（窗口/去重逻辑正确性）

**目标**：窗口函数常用于“取最新”、“Top‑N”、“分组排名”。要保证**确定性**与**唯一性**。

### 6.1 “取最新记录”确定性（无 ties）

-- tests/window_latest_no_tie.sql

with base as (

  select

    business_key,

    row_number() over (partition by business_key order by event_ts desc, _ingest_seq desc) as rn

  from {{ ref('stg_entities') }}

)

select 1

from base

group by business_key

having sum(case when rn=1 then 1 else 0 end) <> 1  -- 每个key恰好一条rn=1

limit 1;

### 6.2 Top‑N 唯一（Top-1 示例）

-- tests/top1_uniqueness.sql

with ranked as (

  select *, row_number() over (partition by customer_id order by score desc, updated_at desc, id asc) as rn

  from {{ ref('stg_scores') }}

)

select 1

from ranked

group by customer_id

having sum(case when rn=1 then 1 else 0 end) <> 1

limit 1;

> 关键点：**排序键要完整**（确保可重复执行得到相同结果），否则“最新/Top‑1”不稳定。

---

## 7) dbt（relationships）“无大量孤儿”怎么做？

如第 **3.2** 所示，generic `relationships` 是**任一孤儿即失败**；  
若你想容忍极小比例（晚到/边缘数据），就用 **singular anti-join + 阈值** 的写法。

> 建议两者并用：
> 
> - 关键域（比如支付）用 **relationships（零容忍）**。
> - 可晚到域（比如 CRM 延迟同步）用 **阈值版 singular**。

---

## 8) 6.3 Aggregation Correctness at Different Grains（多粒度聚合正确）

**目标**：保证业务在自助层任意聚合不会出错（小计/合计一致、不同粒度 roll‑up 一致）。

### 8.1 Roll‑up 一致性（日→月）

-- tests/rollup_day_to_month.sql

with day as (

  select date(order_ts) as d, sum(gmv) as gmv_d

  from {{ ref('selfserve_sales') }}

  group by 1

),

month_from_day as (

  select date_trunc('month', d) as m, sum(gmv_d) as gmv_m1

  from day group by 1

),

month_direct as (

  select date_trunc('month', order_ts) as m, sum(gmv) as gmv_m2

  from {{ ref('selfserve_sales') }}

  group by 1

)

select m

from month_from_day m1

full join month_direct m2 using(m)

where coalesce(m1.gmv_m1,0) <> coalesce(m2.gmv_m2,0)

limit 1;

### 8.2 维度展开一致性（客户/区域两条路径的合计一致）

-- tests/aggregation_path_consistency.sql

with by_customer as (

  select sum(gmv) as gmv from {{ ref('selfserve_sales') }} group by customer_id

),

by_region as (

  select sum(gmv) as gmv from {{ ref('selfserve_sales') }} group by region_id

)

select 1

where (select sum(gmv) from by_customer) <> (select sum(gmv) from by_region)

limit 1;

> **目的**：发现重复计数（双重计量）或漏算。

---

## 9) Job Health & SLA（任务健康 & SLA）是什么？怎么做？

**目标**：保证**数据新鲜度**、**dbt 作业成功率**和**延迟**在 SLA 内，一旦超出**自动告警**。

### 9.1 在 Databricks 配置 Job + 监控

- 建立一个 Databricks Job（任务流）：运行 `dbt deps && dbt run --select state:modified+ && dbt test`
- **Retry 策略**：失败自动重试（例如 3 次指数退避）
- **通知**：失败/超时发送到 Teams/Email/Webhook

### 9.2 Source Freshness 告警（dbt + Databricks SQL Alert）

- 在 `sources.yml` 定义 `freshness`（你之前已有）
- 运行 `dbt source freshness` 产出结果（artifact）
- 在 Databricks SQL 建一个查询读取 freshness 结果视图（或把 freshness 也做成 singular test），设置 **Alert**

### 9.3 关键数据延迟 / 行数基线 告警（Databricks SQL）

- 写“**延迟**”查询：最新分区/最新事件时间距当前时间的差值，超出阈值返回1
- 写“**行数**”查询：当天行数 < 历史 P50 的 80%（或 < 昨天的 70%）返回1
- 对这些查询设置 **Alert**

**延迟样例**：

-- alert: 最新数据延迟

select 1

from (

  select max(event_ts) as mx from business_view_sales

) x

where x.mx < current_timestamp() - interval 2 hours

limit 1;

**行数基线样例**（简单近似）：

-- alert: 今日行数明显偏低

with today as (

  select count(_) as c from business_view_sales where date(order_ts)=current_date()_

_),_

_yday as (_

  _select count(_) as c from business_view_sales where date(order_ts)=date_sub(current_date(),1)

)

select 1

from today, yday

where today.c < yday.c * 0.7

limit 1;

> **落地建议**：
> 
> - 把“延迟/行数/新鲜度/join 基数爆炸”这些查询统一放到 Databricks SQL Dashboard，给每个查询加 **Alert**。
> - 把 dbt test 的失败也作为 Job 失败事件→通知。

---

## 小结（一张速查表）

- **去重正确性**：`unique` + **无并列最大**（singular）+ 与原始源对账
- **singular 计算校验**：写“找异常”的 SQL（返回行=失败）
- **Referential Readiness**：`relationships` + **孤儿率阈值**（singular anti-join）
- **Join Cardinality（Databricks）**：连接前后行数比、命中率→**SQL + Alert**
- **指标口径一致性**：从低层重算 vs 业务视图对比（singular）；负值/异常峰值护栏
- **窗口/去重正确性**：`row_number()` 的排序键完整；**每 key 恰一条 rn=1**（singular）
- **无大量孤儿**：anti-join + 比例阈值（singular）
- **多粒度聚合正确**：日→月 roll‑up 一致；不同维度路径总和一致（singular）
- **Job Health & SLA**：Databricks Job 重试+通知；Freshness/延迟/行数/基数爆炸 → SQL Alerts

---

如果你把**具体模型名**（比如 `flt_*`, `stg_*`, `dim_*`, `fct_*`, `bv_*`, `selfserve_*`）发给我，我可以直接给你生成一套**可运行的 dbt tests 文件结构**（`schema.yml` + `tests/*.sql`）和**Databricks SQL Alert 查询清单**，你复制粘贴就能用。

