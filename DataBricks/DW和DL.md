# Data Warehouse vs Data Lake 区别

下面对 **Data Warehouse (DW)** 和 **Data Lake (DL)** 从多个维度进行系统对比，帮助理解它们的区别和使用场景。

> 注意：为了在 Obsidian 或标准 Markdown 中正确渲染，表格第一列使用了“属性”占位。

---

## 1. 数据类型

| 属性   | Data Warehouse           | Data Lake                         |
| ---- | ------------------------ | --------------------------------- |
| 数据类型 | 结构化数据（表格、行列）为主           | 结构化 + 半结构化 + 非结构化（日志、JSON、图片、视频等） |
| 数据模式 | Schema-on-write（写入时定义模式） | Schema-on-read（读取时解析模式）           |

---

## 2. 数据优化与处理

|属性|Data Warehouse|Data Lake|
|---|---|---|
|存储优化|高度优化（列式存储、压缩、索引、聚簇分区）|原始存储，基本压缩，不做复杂优化|
|查询执行|必须通过 Engine 执行 SQL / BI 查询|可用 Spark、Presto、Athena 等工具直接读取文件|
|处理方式|Batch / BI 报表 / OLAP|Batch + Stream + ML / AI / 数据探索|

---

## 3. 性能与延迟

|属性|Data Warehouse|Data Lake|
|---|---|---|
|查询性能|高（针对分析和聚合优化）|中等或低（依赖外部计算框架处理）|
|实时性|一般靠批量 ETL（分钟到小时级）|支持实时/流处理（需 Spark Streaming、Flink 等）|

---

## 4. 使用成本

|属性|Data Warehouse|Data Lake|
|---|---|---|
|存储成本|高（优化、索引、管理开销大）|低（廉价对象存储即可，如 S3/HDFS）|
|计算成本|Engine 内存 + CPU，按查询付费|弹性计算，分布式框架按需计算|

---

## 5. 数据治理与安全

|属性|Data Warehouse|Data Lake|
|---|---|---|
|权限管理|内置严格权限控制|较灵活，通常依赖外部工具或框架|
|数据质量|强制清洗、ETL 规范|原始存储，可接受脏数据|

---

## 6. 典型应用场景

- **Data Warehouse**
    
    - BI 报表、财务分析、销售趋势、固定 SQL 查询
        
    - 高度结构化、低延迟查询、稳定可靠
        
- **Data Lake**
    
    - 大数据分析、机器学习、日志分析、IoT 数据
        
    - 灵活存储，支持各种新型数据和实验分析
        

---

## 7. 总结

> **Data Warehouse = 结构化 + 高度优化 + SQL 分析为主**  
> **Data Lake = 原始数据 + 灵活存储 + 多种计算框架可用**