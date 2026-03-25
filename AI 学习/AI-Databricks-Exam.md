![[Pasted image 20260325215424.png]]
这题最合适选 **C. Feature Serving**。

原因是 Databricks 的 **Feature Serving / Online Feature Store** 就是用来给在线应用和实时模型提供**低延迟、最新的特征数据**，官方文档明确写了它支持 **real-time serving**、**automatic feature lookup**，以及把 Databricks 里的数据提供给外部模型或应用。题目里说的“把最新比分和比赛事件喂给 LLM 分析”，本质上就是要把**新鲜数据实时送到模型侧**，这更符合 Feature Serving 的定位。 ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/feature-store/feature-function-serving?utm_source=chatgpt.com "Feature Serving endpoints | Databricks on AWS"))

其他选项为什么不对：

- **DatabricksIQ**：偏自然语言问数仓/BI 助手，不是实时数据喂给 LLM 的数据服务层。
    
- **Foundation Model APIs**：这是调用大模型本身的接口，负责“用模型”，不是负责把**实时业务数据**持续供给模型。
    
- **AutoML**：是自动建模训练工具，不是实时数据供给工具。 ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/databricks/machine-learning/feature-store/?utm_source=chatgpt.com "Databricks Feature Store"))
    

所以这题答案是：**C. Feature Serving**。

你要的话，我也可以顺手把这题和 **Foundation Model APIs** 为什么容易混淆，给你拆成考试版记忆法。