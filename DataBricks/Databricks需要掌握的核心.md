要把 Databricks 用到“熟练能扛活”的程度，我建议按 **必须精通（核心能力）→ 深入理解（中高级）→ 了解即可（按需）** 三层来掌握。下面这份清单基本覆盖企业里 80–90% 的实际场景。

---

## 1) 必须精通：日常交付离不开（优先级最高）

### A. Lakehouse 基础：Delta Lake

- Delta 表：`CREATE TABLE`、`MERGE INTO`、`UPDATE/DELETE`、CTAS、分区策略
    
- ACID 与并发：乐观并发控制、冲突场景（多任务写同一表）
    
- 文件布局与性能：Z-Order、OPTIMIZE、VACUUM、数据跳过（data skipping）
    
- 版本与回滚：Time Travel（按版本/时间查、回滚、审计）
    
- schema 处理：schema evolution、schema enforcement、写入时字段变更策略
    

### B. Spark / Databricks SQL：能写、能调、能解释

- DataFrame + Spark SQL 基本功（join、window、聚合、explode、UDF/UDTF 的取舍）
    
- 执行模型：shuffle、广播 join、倾斜（skew）识别与处理
    
- 缓存与重用：cache/persist、避免重复计算
    
- 常见性能问题定位：看 query plan / stage / task 指标，知道“为什么慢”
    

### C. Workspace 与协作交付

- Notebook：参数化、widgets、模块化、Repo 集成、最佳实践（不要把逻辑都写在一个 notebook）
    
- Repos：Git 工作流、分支、PR、环境配置分离（dev/test/prod）
    

### D. 作业编排与生产化：Jobs + 任务依赖

- Jobs（Workflows）：task 依赖、并发控制、重试策略、通知、超时
    
- 参数、环境变量、权限、运行日志与失败排查
    
- 产出可追溯：run id、输入版本、输出表版本（审计）
    

### E. 安全与治理：Unity Catalog（UC）

- Catalog / Schema / Table / Volume 的权限模型（GRANT、ownership）
    
- 行列级安全：RLS/CLS（策略/动态视图/函数）
    
- 身份与访问：service principal、groups、权限继承与最小权限
    
- 数据血缘与审计：能回答“这个指标从哪来、谁改过、谁访问过”
    

---

## 2) 深入理解：做大规模/高可靠平台必备（中高级）

### A. 计算与成本：Clusters / SQL Warehouses

- Cluster 类型：all-purpose vs job cluster
    
- autoscaling、instance 选择、spot、photon、DBU 成本意识
    
- SQL Warehouse：并发、队列、缓存、大小选择、cost/perf tradeoff
    

### B. 数据摄取与流处理

- Auto Loader（cloudFiles）：schema 推断、schema rescue、checkpoint、增量摄取
    
- Structured Streaming：exactly-once 语义、watermark、late data、状态存储
    
- CDC 模式：基于 MERGE 的 upsert、SCD2、事件时间 vs 处理时间
    

### C. 质量与可观测性

- 数据质量框架：Expectations（DLT）、Great Expectations、dbt tests/contract
    
- 数据 SLA/SLO：延迟、完整性、准确性、可用性指标
    
- 运行可观测：Job metrics、log、表级写入/读取审计、失败自动告警
    

### D. 环境隔离与发布

- dev/test/prod 隔离：workspace/catlog 分层、命名规范、权限隔离
    
- 部署：bundle/CI-CD（或至少 Git + Jobs 参数化 + 环境配置）
    
- 回滚策略：数据回滚（delta）、代码回滚（git）、作业版本控制
    

---

## 3) 了解即可：看团队需求再补（按需）

- MLflow / 模型注册与部署（如果你们做 ML）
    
- Feature Store（若做特征工程）
    
- Lakehouse Federation / 外部数据源联邦查询（跨系统场景）
    
- Databricks Apps / Dashboard / Genie（偏分析/BI 场景）
    

---

## 4) 一条“最实用”的掌握路线（建议顺序）

1. **Delta Lake + SQL + 性能**（能把表做好、写得快、查得快）
    
2. **Jobs 生产化 + 失败排查**（能稳定跑、能追溯）
    
3. **Unity Catalog 权限 + RLS/CLS**（能合规交付）
    
4. **Auto Loader/Streaming + CDC**（能处理增量与实时）
    
5. **质量与可观测性 + CI/CD**（能规模化、能长期维护）
    

---

如果你愿意，我可以按你现在的角色（数据平台/QA/治理/工程）给你做一个 **“能力矩阵 + 练习任务清单”**：每个功能配 2–3 个可实操的练习（含 SQL/Notebook/Job/UC 权限/RLS 样例），做完基本就“能上手企业项目”。你更偏 **数据工程** 还是 **平台治理/QA 自动化**？