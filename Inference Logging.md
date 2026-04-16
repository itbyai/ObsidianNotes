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


## 如何启用

现在最推荐的是 **AI Gateway-enabled inference tables**。Databricks 已说明：**legacy inference tables** 自 **2026-02-20** 起不能在新/现有端点上再启用，并将在 **2026-04-30** 停止支持；官方建议改用 AI Gateway-enabled inference tables，它适用于 **custom models、foundation models、external models 和 agent endpoints**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/enable-model-serving-inference-tables "Enable inference tables on model serving endpoints using the API | Databricks on AWS"))

**怎么配置**，本质上就是：在 **Serving endpoint** 上打开“自动抓取请求/响应并写入 UC Delta table”的开关，并指定 **catalog + schema**。前提条件是：工作区已启用 **Unity Catalog**，端点创建者和修改者对端点有 **Can Manage**，并且对目标 UC 位置有 **USE CATALOG、USE SCHEMA、CREATE TABLE** 权限；AI Gateway-enabled inference tables 还要求该工作区支持 **serverless compute**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))

在 **UI** 里，新建端点时可以直接开：  
`Serving -> Create serving endpoint -> (AI Gateway 区域) Enable inference tables -> 选择 catalog/schema -> 可选填写 table prefix -> Create`。  
默认表名是 **`<catalog>.<schema>.<endpoint-name>_payload`**；已有端点也可以在端点页里通过 **Edit AI Gateway** 打开这个开关。Databricks 也明确说：**不能指定一个已存在的表** 来复用，系统会自动新建 inference table。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))

如果你是通过 **API** 配置，旧文档里对应字段叫 `auto_capture_config`，在创建端点或更新端点配置时指定 `catalog_name`、`schema_name`、可选的 `table_name_prefix`。例如：

```json
{
  "name": "my-endpoint",
  "config": {
    "served_entities": [
      {
        "entity_name": "catalog.schema.model_name",
        "entity_version": "1",
        "workload_size": "Small",
        "scale_to_zero_enabled": true
      }
    ],
    "auto_capture_config": {
      "catalog_name": "ml",
      "schema_name": "monitoring",
      "table_name_prefix": "my-endpoint"
    }
  }
}
```

创建后，系统会自动创建 **`ml.monitoring.my-endpoint_payload`** 这样的 UC managed table；在响应里也能看到 `payload_table` 名称。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/enable-model-serving-inference-tables "Enable inference tables on model serving endpoints using the API | Databricks on AWS"))

**数据怎么进入**，答案是：**不用你手动插表**。只要端点启用了 inference tables，**所有发到这个 endpoint 的请求和模型返回的响应，都会被自动记录到这张表**。官方写得很直白：端点收到的 **incoming requests** 和 **outgoing responses** 会自动落到 Unity Catalog Delta table。也就是说，数据进入方式不是你 `INSERT`，而是**任何一次 endpoint 调用都会自动写一条或多条日志记录**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))

所以实际流程是：

1. 你先创建并启用 inference tables 的 endpoint。
    
2. 应用程序、Notebook、SQL、REST 客户端去调用这个 endpoint。
    
3. Databricks 自动把这次调用的请求体、响应体、状态码、执行时长等写进 inference table。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))
    

举个最简单的例子：如果你有一个文本分类 endpoint，应用调用它时发：

```json
{
  "dataframe_split": {
    "columns": ["text"],
    "data": [["The left earbud does not charge."]]
  }
}
```

只要这个请求成功打到了 endpoint，inference table 就会自动记录至少这些类型的信息：**请求时间、Databricks request id、可选 client request id、HTTP status code、execution duration、request/response 原始内容**；对 AI agents 还可以记录 **MLflow traces**。([Databricks Docs](https://docs.databricks.com/aws/en/ai-gateway/inference-tables "Monitor served models using AI Gateway-enabled inference tables | Databricks on AWS"))

启用后你可以直接在 **Catalog Explorer** 看表，也可以在 SQL/Notebook 里查：

```sql
SELECT * 
FROM <catalog>.<schema>.<payload_table>;
```

如果要把请求日志和底层服务实体信息关联起来，还可以把 inference table 和 `system.serving.served_entities` 做 join。([Databricks Docs](https://docs.databricks.com/aws/en/ai-gateway/inference-tables "Monitor served models using AI Gateway-enabled inference tables | Databricks on AWS"))

有几个容易踩坑的点：

- **不要改 inference table 的 schema、名字，也不要删表**，否则日志可能停止写入或表损坏。
    
- **不要丢失对 catalog/schema 的权限**，否则 `payload_table` 可能进入 `FAILED` 状态。
    
- 对老式 inference tables 来说，表位置一旦启用后**不支持更改**；对当前 AI Gateway 方案，本质上也是系统自动创建新表，不建议手改。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))
    

一句话总结：

**配置 inference table = 在 serving endpoint 上开启自动日志落表，并指定 UC 的 catalog/schema；数据进入方式 = 任何对这个 endpoint 的实际推理调用，Databricks 都会自动把请求和响应写进那张 Delta 表。** ([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/inference-tables "Inference tables for monitoring and debugging models | Databricks on AWS"))

如果你愿意，我可以下一条直接给你一份 **“Databricks UI 点击路径 + API JSON 示例 + 查询 SQL 示例”** 的完整模板。