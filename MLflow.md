MLflow 是一个**开源的 AI / 机器学习生命周期管理平台**。  
它不是模型本身，也不是训练算法；它更像一套“管理模型开发到上线全过程”的工具。MLflow 官方现在把它定位为面向 **agents、LLMs 和传统 ML 模型** 的平台，提供实验跟踪、评估、模型管理、部署，以及对 GenAI 的 tracing、prompt 管理和 observability。([MLflow AI Platform](https://mlflow.org/?utm_source=chatgpt.com "MLflow - Open Source AI Platform for Agents, LLMs & Models"))

最容易理解的说法是：

- 你训练了很多版模型，不知道哪版参数最好
    
- 你上线了模型，不知道它从哪次实验来的
    
- 你想把模型分享给团队、做版本管理、再部署成 API
    

MLflow 就是用来解决这些问题的。官方把它的核心能力分成几块：**Tracking、Models、Registry、Deployment/Serving**；对 LLM/Agent 场景，还扩展了 tracing、evaluation、prompt management 等能力。([MLflow AI Platform](https://mlflow.org/docs/latest/?utm_source=chatgpt.com "MLflow Documentation | MLflow AI Platform"))

你可以把 MLflow 理解成 4 个最核心模块：

**1. Experiment Tracking**  
记录每次实验的参数、指标、代码版本和输出文件，方便比较不同运行结果。官方对 Tracking 的定义就是：记录参数、代码版本、metrics 和 artifacts，并提供 UI 查看。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/tracking/?utm_source=chatgpt.com "ML Experiment Tracking"))

**2. Model Packaging / Models**  
把模型按统一格式保存下来，方便加载和部署。你前面问到的 `pyfunc` 就属于这里，它提供统一的 Python 模型接口。MLflow 官方把它作为标准模型封装方式之一。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/deployment/?utm_source=chatgpt.com "ML Model Serving"))

**3. Model Registry**  
把模型集中注册、做版本管理、打标签、加别名、记录元数据。官方对 Model Registry 的定义是一个集中式模型仓库和 API/UI，用来管理模型全生命周期，并支持 lineage、versioning、aliasing 和 tagging。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/model-registry/?utm_source=chatgpt.com "ML Model Registry"))

**4. Deployment / Serving**  
把模型部署到本地、云环境、Kubernetes 或其他服务目标。官方说明 MLflow 提供部署工具，可以把模型部署到多种目标环境。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/deployment/?utm_source=chatgpt.com "ML Model Serving"))

如果放到你现在的 Databricks / AI 工程语境里，最常见的用法通常是：

- 训练或调试模型时，用 **Tracking** 记实验
    
- 确定某版模型可用后，用 **Models / PyFunc** 封装
    
- 再注册到 **Registry / Unity Catalog** 管理版本和权限
    
- 最后部署成 **Serving endpoint** 或批量推理服务
    

这也是 Databricks 上“Managed MLflow”常见的工作流。([Databricks](https://www.databricks.com/product/managed-mlflow?utm_source=chatgpt.com "Agent Tracing & AI Observability Tools | Managed MLflow"))

一句最短总结：

**MLflow = 用来管理模型和 AI 应用从实验、记录、封装、注册到部署的一整套平台。**  
它对传统 ML 很有用，对现在的 LLM / Agent 也同样适用。([MLflow AI Platform](https://mlflow.org/?utm_source=chatgpt.com "MLflow - Open Source AI Platform for Agents, LLMs & Models"))

如果你愿意，我可以下一条继续给你讲：**MLflow Tracking、PyFunc、Registry 三者到底分别是干什么的**。