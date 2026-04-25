The scope of this project will be to change how data is acquired through to ODS and incrementally migrate data products by data set and Power BI Reports.  The DBT code currently used for Synapse will be migrated and updated to be able to execute on databricks without error. This project will also include any downstream reporting or product that feeds of this data.  E.g. Power BI Reports, Extracts, AI models.

major change is dbt code change - repo - code change stuff
dbt code - synapse
dbt code - databricks
 E.g. Power BI Reports, Extracts, AI models.
 ESM model regression
 what is the relationship ods dv and im  - ods ->DV/BV, ODS to IM, DV/BV to IM
 compare between synapse and databricks
 copy back from databricks to synapse
 not sure what is ai layer test - Any AI Layers that are trained off in scope data migration
![[Pasted image 20260106101201.png]]
# Test Plan – Scope & Test Coverage

## 1. ICT Assets in Scope

### Description

This section defines all ICT assets included in the testing scope for the Synapse to Databricks migration and hybrid operation.

### Assets Include

- Azure Synapse Analytics
- Azure Databricks (Workspaces, Clusters, SQL Warehouses)
- Azure Data Lake Storage (Raw / Curated Zones)
- Power BI (Datasets, Reports, Gateways)
- Supporting orchestration tools (ADF / Jobs / Pipelines)
- Security & Access Control (AAD, Unity Catalog where applicable)

### Test Considerations

- Asset availability and environment parity (Dev / Test / Prod)
- Connectivity and permissions between assets
- Cost and capacity implications during parallel runs

---

## 2. Features in Scope for Testing

### Description

Functional and non-functional features impacted by the migration and hybrid data processing.

### Features Include

- Data ingestion
- Transformation logic
- Incremental loads
- Data validation and reconciliation
- Reporting and analytics consumption
- AI / ML dependent layers

### Test Considerations

- Feature parity between Synapse and Databricks
- Regression risk for existing consumers
- Backward compatibility during transition phases

---

## 3. Source and Operational Data Store (ODS)

### Description

Source systems feeding the Operational Data Store and downstream layers.

### Test Considerations

- Source data completeness and freshness
- Schema drift handling
- Data quality rules at ingestion

---

## 4. Source to ODS Testing

_(Including interim points accessible from Databricks, e.g. raw data)_

### Scope

- Source → Raw zone (Databricks)
- Source → ODS (Synapse & Databricks)

### Test Types

- Row count validation
- Schema and data type validation
- Business key integrity
- Incremental load correctness
- Late arriving / changed data

---

## 5. Operational Data Store (Subset)

### Description

Testing will be conducted on defined ODS subsets suitable for equivalent comparison.

### Test Considerations

- Representative data volume
- Inclusion of edge cases
- Referential integrity within subset

---

## 6. Creating Suitable Equivalent Testing Data

### Description

Equivalent ODS data subsets will be created on both Synapse and Databricks.

### Expectations

- Identical data content across platforms
- Equivalent structures and constraints
- Consistent keys and timestamps

### Downstream Impact

- Expect equivalent data in:
    - Data Vault (DV)
    - Information Model (IM)

---

## 7. Enterprise Data Warehouse

_(Data Vault & Business Vault)_

### Scope

- ODS → Data Vault
- ODS → Business Vault

### Test Types

- Hub, Link, Satellite validation
- Hash key consistency
- Change detection logic
- Historical tracking accuracy

---

## 8. Data Comparison

_(Parallel comparison between Synapse and Databricks – EDW)_

### Description

Parallel data comparison to ensure equivalence between platforms.

### Comparison Methods

- Row counts
- Hash totals
- Attribute-level comparison
- Exception reporting

---

## 9. Information Mart (IM)

### Scope

- DV/BV → IM transformations
- ODS → IM direct paths (where applicable)

### Test Considerations

- Business rule correctness
- Aggregation accuracy
- Performance benchmarks

---

## 10. Data Comparison

_(Parallel comparison between Synapse and Databricks – IM)_

### Validation Includes

- Metric-level reconciliation
- Dimensional integrity
- Historical vs current snapshots

---

## 11. Information Mart Copy-Back

_(Databricks → Synapse)_

### Scenario Description

Loads and transformations are executed in Databricks, with IM data copied back to Synapse.

### Test Considerations

- Data fidelity during copy-back
    
- Load idempotency
    
- Timing and dependency management
    
- Downstream consumer impact
    

---

## 12. Power BI Report

### Scope

- Semantic models
    
- Measures and calculated columns
    
- Report visuals and filters
    

---

## 13. Parallel and Functional Testing (Power BI)

### Test Types

- Parallel report comparison (Synapse vs Databricks)
    
- Functional validation against business expectations
    
- Performance and refresh validation
    

---

## 14. Databricks-Specific Testing (Regression)

### Focus Areas

- Databricks job orchestration
    
- Cluster behaviour and scaling
    
- SQL Warehouse performance
    
- Notebook logic regression
    

---

## 15. Left-to-Right Data Flow Validation

### Paths Covered

- ODS → DV/BV
    
- ODS → IM
    
- DV/BV → IM
    

### Test Objectives

- End-to-end lineage validation
    
- Data completeness across hops
    
- Transformation correctness
    

---

## 16. Power BI on Databricks IM

### Scope

- Direct consumption from Databricks IM
    
- Connectivity and authentication
    
- Performance and refresh behaviour
    

---

## 17. Databricks IM to Power BI Report

### Validation Includes

- Dataset refresh success
    
- Measure parity with Synapse-based reports
    
- User access and RLS behaviour
    

---

## 18. AI Layers

### Scope

- AI / ML models trained on in-scope data
    

### Test Considerations

- Training data equivalence
    
- Model output consistency
    
- Impact of migrated data on predictions
    

---

## 19. Incremental Decommissioning of Synapse

### Description

Validation of phased Synapse decommissioning following successful production verification.

### Test Activities

- Confirm no active dependencies
    
- Validate fallback and rollback readiness
    
- Monitor performance and usage metrics
    

---

## 20. Post-Phase Production Verification & Cost Controls

### Requirement

After each phase of production verification testing:

- Target Synapse data assets must be:
    
    - Turned off **OR**
        
    - Data Warehouse Units (DWUs) reduced
        

### Validation

- Confirm asset state changes
    
- Validate no unintended service disruption
    
- Capture cost and capacity metrics
    

---

## ✅ 建议你在 Test Plan 里额外加的两节（强烈推荐）

### Risks & Mitigations

- Dual-run cost
    
- Data divergence
    
- Consumer impact during copy-back
    

### Entry / Exit Criteria

- Entry: data readiness, access, environments aligned
    
- Exit: reconciliation passed, reports signed off, Synapse assets scaled down
    

---

![[Pasted image 20260106101212.png]]
下面我把**这张图对应的“总体步骤（End-to-End Test Flow）”系统性拆解出来**，并且**严格对齐你图里的 1–8 编号**，方便你**直接写进 Test Plan / Test Approach / Test Phases**。

我会分三层来讲：  
1️⃣ **一句话总览**  
2️⃣ **按步骤（1–8）详细分析**  
3️⃣ **测试阶段视角（适合 Test Plan 章节）**

---

# 一、总体一句话概览（Executive Summary）

> 本测试通过 **Synapse 与 Databricks 的并行运行（parallel run）**，从 **Source → ODS → ODS Subset → DV → IM → Power BI** 全链路验证 **数据等价性、功能一致性与回归风险**，并最终支持 **逐步下线（decommission）Synapse**。

---

# 二、按图中编号的“总体步骤分析”

## Step 1️⃣ Source → ODS（Databricks 新摄取方式验证）

**目标**

- 验证 Databricks 采用的新 ingestion 方法是否正确、完整、可复用
    

**核心关注**

- 数据是否完整加载
    
- Schema / 数据类型是否一致
    
- 增量 & CDC 行为是否符合预期
    

**测试类型**

- Row count
    
- Schema compare
    
- Incremental load validation
    

👉 **这是 Databricks 的“入口信任点”**

---

## Step 2️⃣ 创建等价的 ODS Data Subsets（Synapse & Databricks）

**目标**

- 在两个平台创建**完全等价**的 ODS 子集，作为后续所有并行测试的基线
    

**关键原则**

- 同一业务范围
    
- 同一时间窗口
    
- 同一业务主键（BK）
    

**为什么重要**

> 没有等价 ODS Subset，后面的 DV / IM / PBI 对比都是“伪对比”

---

## Step 3️⃣ ODS Subset 等价性对比（Synapse vs Databricks）

**目标**

- 确认两个平台的 ODS Subset **数据内容一致**
    

**对比方式**

- 行数
    
- Hash total
    
- 关键字段值
    
- Null / 默认值行为
    

👉 **这是“平台无关性”的第一道闸门**

---

## Step 4️⃣ 构建并部署 DBT Code（DV & IM）

**目标**

- 使用同一套 DBT 逻辑在两个平台构建：
    
    - Data Vault (DV)
        
    - Information Mart (IM)
        

**测试关注**

- 模型是否成功运行
    
- 增量模型是否正确
    
- 依赖关系是否一致
    

👉 **这一步是“逻辑一致性”的基础**

---

## Step 5️⃣ DV & IM 等价性验证（Synapse vs Databricks）

**目标**

- 确认 **业务语义层** 在两个平台完全一致
    

### DV 层

- Hub / Link / Satellite 行为
    
- Hash key 一致性
    
- 历史记录（SCD）
    

### IM 层

- 指标
    
- 维度
    
- 聚合结果
    

👉 **这是最关键的业务验证点**

---

## Step 6️⃣ Power BI 报表部署（两套后端）

**目标**

- Power BI 同时连接：
    
    - Synapse IM
        
    - Databricks IM
        

**关注点**

- 数据模型
    
- 刷新策略
    
- RLS / 权限
    

---

## Step 7️⃣ Power BI 报表等价性验证

**目标**

- 从“业务用户视角”验证两套平台的输出完全一致
    

**验证内容**

- KPI 数值
    
- 汇总 & 明细 drill-down
    
- 过滤器 / slicer 行为
    

👉 **这是最终“用户验收层”的等价性验证**

---

## Step 8️⃣ Left-to-Right 回归测试（Databricks）

**目标**

- 在 Databricks 上执行 **端到端（Left → Right）回归测试**
    

**覆盖路径**

- ODS → DV
    
- ODS → IM
    
- DV → IM
    

**特点**

- 基于 subset（keys only）
    
- 轻量、可重复、可自动化
    

👉 **这是为“长期稳定运行”准备的回归保护网**

---

# 三、从 Test Plan 角度看的“阶段划分”

你在 Test Plan 里可以这样写（非常 AO7 / Enterprise）👇

## Phase 1 – Ingestion & ODS Validation

- Step 1
    
- Step 2
    
- Step 3
    

🎯 目标：**确保输入数据可信**

---

## Phase 2 – Transformation & Warehouse Validation

- Step 4
    
- Step 5
    

🎯 目标：**确保业务逻辑等价**

---

## Phase 3 – Analytics & Reporting Validation

- Step 6
    
- Step 7
    

🎯 目标：**确保业务消费层无感知迁移**

---

## Phase 4 – Regression & Operational Readiness

- Step 8
    

🎯 目标：**支持长期运行 + Synapse 逐步退役**

---

# 四、你这张图“隐含但非常专业的点”（加分）

你这套流程实际上已经体现了：

- ✅ Parallel Run Strategy
    
- ✅ Data Equivalence Testing
    
- ✅ Regression Strategy（subset + keys）
    
- ✅ Consumer-first validation（Power BI）
    
- ✅ Decommission Readiness
    

如果你愿意，下一步我可以帮你：

- 🧪 **把 1–8 每一步拆成 Test Scenarios 表**
    
- 📊 **补一张 Test Coverage Matrix（层 × 测试类型）**
    
- ✍️ **直接帮你写 Test Plan 的 “Approach & Phases” 章节**
    
- 🧠 **加上 AI Layer / Copy-back to Synapse 的扩展步骤**
    

你可以直接说：  
👉「我要下一步写 **Test Plan 正文**，还是先补 **测试用例结构**？」