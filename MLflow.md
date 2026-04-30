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


**MLflow** 可以理解为一个 **AI / ML 项目的“实验记录 + 模型管理 + 评估 + 部署追踪”平台**。

在 Databricks 考试语境里，你重点记：

> **MLflow 用来跟踪模型实验、记录参数和指标、管理模型版本、评估模型表现，并支持生产部署治理。**

官方现在也把 MLflow 定位为面向 **agents、LLMs 和 ML models** 的开源 AI engineering platform，用于 debug、evaluate、monitor 和 optimize 生产级 AI 应用。([MLflow AI Platform](https://mlflow.org/?utm_source=chatgpt.com "MLflow - Open Source AI Platform for Agents, LLMs & Models")) Databricks 文档里也说，MLflow on Databricks 提供 experiment tracking、model evaluation、production model registry 和 model deployment tools。([Databricks Documentation](https://docs.databricks.com/aws/en/mlflow/?utm_source=chatgpt.com "MLflow on Databricks"))

---

## 用一句话理解

假设你训练/测试了很多模型：

```text
Model A: accuracy 86%, cost low
Model B: accuracy 91%, cost medium
Model C: accuracy 94%, cost high
```

如果没有 MLflow，你可能靠 Excel、截图、notebook 注释记录。

有了 MLflow，它可以帮你记录：

```text
这次实验用了什么数据
用了什么模型
用了什么参数
结果指标是多少
生成了哪些 artifacts
模型版本是多少
谁批准上线
上线后表现如何
```

---

## MLflow 主要管什么？

### 1. Experiment Tracking：实验跟踪

记录每次实验的：

|内容|例子|
|---|---|
|Parameters|learning rate、temperature、top_k、chunk_size|
|Metrics|accuracy、loss、correctness、groundedness、latency|
|Artifacts|模型文件、图表、评估报告、prompt 文件|
|Code version|哪个 notebook / script 产生的结果|

比如你改了 RAG 的 chunk size：

```text
Run 1: chunk_size = 500, correctness = 82%
Run 2: chunk_size = 800, correctness = 88%
Run 3: chunk_size = 1200, correctness = 85%
```

MLflow 可以把这些 run 记录下来，方便比较。

---

### 2. Model Registry：模型注册和版本管理

**Model Registry** 是 MLflow 很重要的一部分。

它是一个集中式模型仓库，用来管理模型生命周期，包括 lineage、versioning、aliasing、metadata tagging 等。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/model-registry/?utm_source=chatgpt.com "ML Model Registry"))

你可以理解成：

```text
Customer_Churn_Model
  ├── Version 1
  ├── Version 2
  ├── Version 3
  └── Production alias → Version 3
```

它解决的问题是：

> 生产环境到底用的是哪个模型？  
> 新模型效果不好能不能 rollback？  
> 谁注册的？谁批准的？指标是多少？

---

### 3. Model Evaluation：模型评估

MLflow 可以记录模型评估结果，比如：

|GenAI / RAG 指标|含义|
|---|---|
|correctness|答案是否正确|
|groundedness|是否基于 context|
|relevance|是否回答问题|
|safety|是否安全|
|latency|响应速度|
|cost|成本|

这和前面讲的 **Evaluation / Benchmark / LLM-as-Judge** 是连起来的。

---

### 4. Deployment Tracking：部署追踪

模型上线后，MLflow 可以帮助管理：

```text
哪个模型版本上线
什么时候上线
谁批准
部署到哪个 endpoint
线上指标如何
是否需要 rollback
```

---

## MLflow 和 Unity Catalog 怎么区别？

这个考试容易混。

|工具|主要管什么|
|---|---|
|**MLflow**|模型、实验、评估、版本、部署|
|**Unity Catalog**|数据、权限、表、文件、lineage、governance|

简单记：

```text
MLflow 管模型生命周期
Unity Catalog 管数据治理和访问控制
```

在 Databricks 里两者可以结合起来：Unity Catalog 负责统一治理数据和 AI assets，MLflow 负责模型开发、评估和部署生命周期。([Databricks Documentation](https://docs.databricks.com/aws/en/mlflow/?utm_source=chatgpt.com "MLflow on Databricks"))

---

## 和你这页课件的关系

课件说 **Tracks Lineage**，图上写了 **Powered by MLflow**。

这里的意思是：

> MLflow 可以记录模型实验、参数、指标、artifacts、模型版本和部署信息，从而形成 audit trail。

比如出了问题，你可以查：

```text
这个模型是哪次实验产生的？
当时用了什么参数？
评估结果是多少？
模型版本是多少？
谁把它推到 production？
```

---

## 考试怎么记

```text
MLflow = experiment tracking + model evaluation + model registry + deployment tracking
```

中文口诀：

> **MLflow 管模型：记录实验、比较指标、注册模型、管理版本、支持上线追踪。**

如果题目问：

- 记录模型实验参数和指标 → **MLflow Tracking**
    
- 管理模型版本和生命周期 → **MLflow Model Registry**
    
- 比较不同模型表现 → **MLflow Evaluation / Experiments**
    
- 追踪模型从开发到生产 → **MLflow + Model Registry**
    
- 管数据权限、表权限、数据血缘 → **Unity Catalog**