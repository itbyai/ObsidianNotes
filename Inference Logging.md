**Inference Logging** 就是：

**把模型上线以后每一次推理请求和返回结果记录下来。**

最直白地说，就是记录这种东西：

- 用户/系统传了什么输入
    
- 模型返回了什么输出
    
- 请求是否成功
    
- 延迟多长
    
- HTTP 状态码是什么
    
- 有时还会带 trace / 运行时信息
    

在 Databricks 语境里，这通常体现在 **inference tables**。官方说明里写得很明确：它会自动捕获 **model serving endpoint 的 incoming requests 和 outgoing responses**，并把它们记录到 **Unity Catalog Delta table** 里，用于 monitoring、debugging 和 model improvement。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))

## 它不是干什么的

它**不是训练日志**。  
不要和 **MLflow Tracking** 混淆。

- **MLflow Tracking** 记录的是训练/实验阶段的东西：参数、metrics、artifacts、代码版本等。([MLflow AI Platform](https://mlflow.org/docs/latest/ml/tracking/?utm_source=chatgpt.com "ML Experiment Tracking"))
    
- **Inference Logging** 记录的是模型上线以后、真实推理阶段的东西：请求、响应、延迟、状态码等。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))
    

你可以这样记：

- **Training log**：模型怎么被训练出来
    
- **Inference log**：模型上线后怎么被调用、表现怎么样
    

## 为什么要做 Inference Logging

主要有 4 个目的。

第一，**排查线上问题**。  
Databricks 官方特别提到，inference tables 可以记录 HTTP 状态码、request/response JSON、model run times，以及 traces，用来 debug production issues。([Databricks Documentation](https://docs.databricks.com/aws/en/ai-gateway/inference-tables?utm_source=chatgpt.com "Monitor served models using AI Gateway-enabled ..."))

第二，**做监控**。  
比如你可以看：

- 错误率是不是升高了
    
- 延迟是不是变慢了
    
- 某个版本输出是不是异常
    
- 某类输入是不是经常失败
    

第三，**做回放和复盘**。  
有了历史请求和历史输出，你可以对照看：

- 以前这个请求模型怎么答
    
- 新模型对同样请求表现有没有变好
    

Databricks 也明确说 historical data 可以用来比较模型在历史请求上的表现。([Databricks Documentation](https://docs.databricks.com/aws/en/ai-gateway/inference-tables?utm_source=chatgpt.com "Monitor served models using AI Gateway-enabled ..."))

第四，**给监控和评估打基础**。  
如果你后面想做：

- 漂移分析
    
- 质量抽检
    
- 人工反馈闭环
    
- agent trace 排查
    

那 inference logging 基本是前提数据源。Databricks 还提到，对于 gen AI / agent 场景，可以记录 traces，并配合 monitoring 使用。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))

## 在 Databricks 里一般记录到哪里

Databricks 官方现在主要强调两类：

- 旧的 **legacy inference tables**
    
- 新的 **AI Gateway-enabled inference tables**
    

官方已经说明，legacy inference tables 正在退场，Databricks 推荐使用 **AI Gateway-enabled inference tables**，因为它适用于 custom model、foundation model 和 agent serving endpoints。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))

这些日志会落到 **Unity Catalog 的 Delta tables** 里。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))

## 一条最容易理解的例子

假设你有一个客服分类 endpoint。

用户发来请求：

```json
{
  "text": "The left earbud does not charge. Can I get a refund?"
}
```

模型返回：

```json
{
  "label": "refund_request",
  "confidence": 0.94
}
```

Inference logging 可能会把这些一起记下来：

- request_time
    
- endpoint_name
    
- request_json
    
- response_json
    
- latency_ms
    
- status_code
    
- model_version
    
- trace_id
    

以后你就能回答：

- 哪些请求最慢
    
- 哪些请求最容易报错
    
- 哪类文本模型分错最多
    
- 某个版本上线后效果是不是变差了
    

## 一句话总结

**Inference Logging = 记录模型上线后每次推理的输入、输出和运行信息，用来监控、排错、复盘和优化。**  
在 Databricks 里，它通常通过 **inference tables** 落到 Unity Catalog Delta tables 中。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables?utm_source=chatgpt.com "Inference tables for monitoring and debugging models"))

如果你要，我可以下一条继续给你讲 **Inference Logging、Inference Tables、Tracing 三者的区别**。