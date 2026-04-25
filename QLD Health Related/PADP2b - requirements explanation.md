
### 1️⃣ 单一 statewide 视图

> The solution must provide a single view of statewide HBCIS data sourced from multiple HBCIS databases

意思：

- 多个 HBCIS 实例（不同 HHS）
    
- 统一整合成一个 statewide 数据视图
    
- 消除 silo
    

在技术上意味着：

- 统一 schema
    
- 标准化字段
    
- 解决重复 ID 问题
    
- 可能需要 surrogate keys
    

---

### 2️⃣ 建立建模翻译层（业务视图）

> modelled translation layer to align raw HBCIS data with business functions

意思：

不能直接用 raw HBCIS 表。

必须：

- ODS → Flattened → Business Views
    
- 按业务域建模（Patient / Inpatient / Finance 等）
    

这是典型的：

> Semantic Layer / Business Layer

---

### 3️⃣ 支持财务报表

必须能支撑：

- Trial Balance by Class
    
- Trial Balance by Name
    
- Long Stay Patients
    

这意味着：

- GL 逻辑正确
    
- 金额汇总规则正确
    
- Patient LOS 计算准确
    

---

### 4️⃣ 支持 Bed Management 报表

说明：

- 必须支持 operational reporting
    
- 实时床位使用
    
- Inpatient flow
    

---

### 5️⃣ 维护每日 snapshot（床位）

意味着：

- 需要 snapshot table
    
- SCD 或 daily fact
    
- 时间维度建模
    

---

# 二、地理与参考数据增强类

---

### 6️⃣–12️⃣ 地理编码（SSB）

系统必须：

- ingest geocoded addresses
    
- 每天更新
    
- 赋值到 Business Views
    

具体包括：

|分类|含义|
|---|---|
|Lat / Long|地理坐标|
|SA2/3/4|ABS 统计区域|
|ARIA|偏远指数|
|SEIFA|社会经济指数|

这是：

> 数据增强（Data Enrichment）

意味着你要做：

- 外部数据集 join
    
- 定期更新
    
- 地址匹配逻辑
    

---

### 13️⃣ QMPI 赋 EUID

可选：

- 引入 statewide unique identifier
    
- 解决 patient 跨系统重复问题
    

属于：

> Master Data Integration

---

### 14️⃣ CRDS 赋值

CRDS = Corporate Reference Data System

意味着：

- 所有参考数据必须统一
    
- 不能 hardcode
    

---

# 三、数据版本与刷新

---

### 15️⃣ 提供最新版本记录

必须：

- 不提供旧版本
    
- 需要 CDC / latest flag
    
- 或使用 Delta merge
    

---

### 16️⃣ 每小时刷新

6am–6pm 每小时

意味着：

- pipeline scheduling
    
- SLA
    
- refresh metadata
    

---

### 17️⃣ 刷新频率不可随意改变

属于：

- Governance control
    
- Change management
    

---

# 四、安全与访问控制

---

### 18️⃣ 不做 HBCIS user mapping

明确 scope 排除项。

---

### 19️⃣ 可提供数据质量反馈机制

可选增强功能。

---

### 20️⃣ 支持自助报表

必须：

- Power BI
    
- Excel
    

意味着：

- semantic model
    
- dataset exposure
    

---

### 21️⃣ 控制访问不同组件

必须：

- 控制 ODS
    
- 控制 Business Views
    
- 控制 semantic model
    

这是：

> 多层访问控制

---

### 22️⃣ 基于权限控制数据

意味着：

- Row Level Security
    
- 可能 Column Level Security
    

---

# 五、非功能性要求（NFR）

---

### Performance

支持 10+4 用户（初期）

意味着：

- Load test
    
- Query response time
    

---

### Scalability

未来 HHS 增长也能承载。

---

### Security (AD Groups)

必须：

- 用标准 AD group
    
- 不允许 adhoc 访问
    

---

### Usability

UAT 满意度衡量。

---

### Maintainability

必须：

- Coding standards
    
- 平台规范
    

---

### Support Model

必须：

- 有 BAU 团队
    
- SLA
    

---

### Monitoring

必须有：

- Code failure alert
    
- Data load alert
    
- Power BI refresh alert
    

---

### Data Quality Reporting

必须：

- Last refresh date
    
- Row count comparison
    
- Unexpected values
    

这其实是：

> 数据质量 dashboard requirement

---

### Audit Tracking

必须记录：

- 谁查了什么
    
- 查了多久
    
- 查了哪些表
    

属于：

> 监管级别要求

---

### Recoverability

必须：

- 备份 Bed Management snapshot
    
- 可恢复
    

---

# 总结一句话

这整套 Requirements 描述的是一个：

> 企业级、州级统一数据平台（Lakehouse + Semantic Layer + Security + Governance + SLA）的完整能力要求。

它不仅是数据仓库项目。

它是：

- 数据整合
    
- 业务建模
    
- 地理增强
    
- 安全治理
    
- 运维监控
    
- 审计合规
    
- SLA 管控
    
- 灾备能力
    

的综合系统。

---

如果你愿意，我可以帮你：

- 🔹 把这些 requirements 按 Architecture Layer 重新分组
    
- 🔹 或帮你画一个 High-Level Architecture 对应关系图
    
- 🔹 或帮你分析哪些 requirement 在技术实现上最复杂（从你现在 Databricks 角度）
    

你现在是做 Design Review，还是准备 Technical Test Strategy？