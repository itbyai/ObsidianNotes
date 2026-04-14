可以，把这 4 步理解成一条“**从模型资产，到线上 API**”的发布链路：

**Unity Catalog 里的注册模型** 是“正式资产”，  
**Serving endpoint** 是“对外服务入口”，  
**模型版本 / alias** 是“这次入口到底指向哪个模型实现”，  
**REST API** 是“外部系统怎么调它”。 Databricks 官方把 Models in Unity Catalog 定位为治理和部署模型的推荐方式，而 Model Serving 则把注册模型托管成可调用的 REST endpoint。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

---

## 第 1 步：先把模型注册成 `catalog.schema.model`

这一步的本质不是“上线”，而是先把模型变成 Unity Catalog 里的一个正式对象。  
它的全名是三层命名，比如：

```text
prod.ml_team.sentiment_model
```

这里：

- `prod` 是 catalog
    
- `ml_team` 是 schema
    
- `sentiment_model` 是模型名
    

Databricks 官方说明，Models in Unity Catalog 是托管版的 MLflow Model Registry，带有集中访问控制、审计、血缘和跨工作区发现能力；创建新注册模型时，需要 `USE CATALOG`、`USE SCHEMA`，以及 `CREATE MODEL` 或 `CREATE FUNCTION` 权限。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

如果你用 MLflow 3，默认 registry URI 就是 `databricks-uc`；否则常见做法是先显式指定：

```python
import mlflow
mlflow.set_registry_uri("databricks-uc")
```

然后把模型注册进去。Databricks 文档把这作为接入 Unity Catalog 的标准配置步骤。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

你可以把这一步理解成：

> “先给模型一个正式身份证和正式地址。”

它此时已经是 UC 里的正式模型对象了，但还**不是**可被外部系统直接调用的在线 API。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

---

## 第 2 步：在 Serving 里创建 endpoint

这一步才是把“注册模型”变成“可在线调用的服务”。

Databricks 官方说明，创建 custom model serving endpoint 有 3 种主要方式：

- Serving UI
    
- REST API
    
- MLflow Deployments SDK
    

在 UI 里，流程是：

1. 进入 **Serving**
    
2. 点击 **Create serving endpoint**
    
3. 给 endpoint 取一个名字
    
4. 在 **Served entities** 里选择模型来源是 **Unity Catalog**
    
5. 选择要服务的模型和模型版本
    
6. 选择流量比例、CPU/GPU、规模等
    
7. 创建 endpoint。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))
    

这一步做完之后，你会得到一个 endpoint，比如：

```text
sentiment-prod-endpoint
```

此时它的意思是：

> “Databricks 帮你准备了一个在线服务入口，这个入口后面要挂一个或多个具体模型版本。”

要注意一个非常重要的细节：  
**endpoint 运行时使用的是创建该 endpoint 的身份**。Databricks 官方明确写到，这个身份在 endpoint 创建后不能变；它会用自己的权限去访问 Unity Catalog 里的模型和其他 UC 资源。如果这个身份没有访问所需 UC 资源的权限，endpoint 可能无法正常工作，通常要删掉并用有权限的用户或 service principal 重新建。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

所以这一步不仅是“创建服务”，也是“确定服务以后用谁的身份去访问 UC 模型”。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

---

## 第 3 步：endpoint 背后绑定某个模型版本，或通过 alias 选当前目标版本

这一步最容易混淆。

### 情况 A：直接绑定具体版本

最直接的做法是让 endpoint 指向一个**明确的版本号**。  
Databricks 在创建 endpoint 的 REST API 示例里，`served_entities` 里会写：

- `entity_name`
    
- `entity_version`
    

例如：

```json
{
  "name": "sentiment-prod-endpoint",
  "config": {
    "served_entities": [
      {
        "entity_name": "prod.ml_team.sentiment_model",
        "entity_version": "3",
        "workload_size": "Small",
        "scale_to_zero_enabled": true
      }
    ]
  }
}
```

Databricks 文档中展示的结构也是这个思路：`entity_name` 指向 `catalog.schema.model`，`entity_version` 指向某一个具体版本。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

这意味着：

> 这个 endpoint 当前固定服务 **第 3 版模型**。

如果你以后想切到 version 4，就要**更新 endpoint 配置**。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

---

### 情况 B：通过 alias 决定“当前目标版本”

在 Unity Catalog 里，Databricks 推荐用 **alias** 来表达部署语义，而不是旧式的 stage。官方明确说明，**UC 模型不支持 stages**，推荐用 alias。比如：

- `Champion` 表示当前生产版本
    
- `Candidate` 表示待发布版本
    

alias 是一个“可变名字”，它可以重新指向不同的模型版本。比如今天：

- `Champion -> version 3`
    

明天你验证通过后改成：

- `Champion -> version 4` ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))
    

Databricks 官方给的 MLflow Client 示例就是：

```python
from mlflow import MlflowClient

client = MlflowClient()
client.set_registered_model_alias("prod.ml_team.iris_model", "Champion", 1)
client.set_registered_model_alias("prod.ml_team.iris_model", "Champion", 2)
champion_version = client.get_model_version_by_alias("prod.ml_team.iris_model", "Champion")
```

这说明 alias 本身不是新模型，而是“模型版本的别名指针”。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

---

### 关键理解：Serving endpoint 最终服务的还是“具体版本”

这是很多人一开始会误解的点。

Databricks 文档对**批量推理**明确支持直接按 alias 加载，例如：

```python
model_uri = "models:/prod.ml_team.iris_model@Champion"
champion_version = mlflow.pyfunc.load_model(model_uri)
```

但对 **Model Serving endpoint**，Databricks 官方的说法是：

> 你可以写一个部署工作流，先通过 alias 取到当前版本，再调用 model serving REST API，把 endpoint 更新成服务这个版本。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

也就是说，在你问的这条链路里，更准确的理解是：

- **alias 用来决定“本次应该发哪个版本”**
    
- **endpoint 最终还是更新成服务一个具体版本**
    

所以流程通常是：

1. `Champion` 当前指向 version 3
    
2. 部署脚本查 alias，得到 3
    
3. 把 endpoint 更新成 `entity_version = "3"`
    
4. 以后 `Champion` 改成 4
    
5. 部署脚本再次运行
    
6. endpoint 被更新成 `entity_version = "4"` ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))
    

这就是“通过 alias 拿当前目标版本”的真实含义。

---

## 第 4 步：外部系统调用 endpoint 的 REST API

当 endpoint 准备好后，外部系统就不需要直接碰 Unity Catalog 模型对象了，它只需要调 endpoint。

Databricks 官方说明，custom model endpoint 的调用方式包括：

- Serving UI
    
- SQL 的 `ai_query`
    
- REST API
    
- MLflow Deployments SDK
    

其中外部系统最常见的是 **REST API**。对应接口是：

```text
POST /serving-endpoints/{name}/invocations
```

官方文档明确写了这个路径。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))

同时，官方还强调：

- 调 REST API 需要 Databricks API token
    
- 生产环境推荐用 **machine-to-machine OAuth**
    
- 测试和开发更推荐用 service principal 的 token，而不是个人用户 token。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))
    

所以外部系统调用时，本质是在做这件事：

```http
POST /serving-endpoints/sentiment-prod-endpoint/invocations
Authorization: Bearer <token>
Content-Type: application/json
```

请求体则要符合模型接受的 scoring 格式。Databricks 对 custom models 的文档里说明了多种 accepted formats，比如 DataFrame scoring。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))

如果是一个典型的 pandas / MLflow 风格模型，常见 payload 会长得像这样：

```json
{
  "dataframe_split": {
    "columns": ["text"],
    "data": [["This product is great"]]
  }
}
```

Databricks 官方在 “Query serving endpoints for custom models” 中就是按 DataFrame scoring 的方式来说明请求格式的。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))

---

## 把 4 步连起来看

你可以把整条链看成这样：

### 1）注册模型

把模型放进 Unity Catalog，变成正式资产：

```text
prod.ml_team.sentiment_model
```

这里解决的是：

- 治理
    
- 权限
    
- 版本
    
- 发现
    
- 审计。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))
    

### 2）创建 endpoint

在 Serving 里创建一个服务入口，比如：

```text
sentiment-prod-endpoint
```

这里解决的是：

- 把模型变成在线服务
    
- 配置算力、扩缩容、流量等。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))
    

### 3）决定 endpoint 指向哪个版本

可以直接写死 `version 3`，也可以通过 `Champion` alias 查出当前版本，再把 endpoint 更新成那个版本。  
这里解决的是：

- 发布控制
    
- 升级切换
    
- 灰度/推广逻辑。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))
    

### 4）外部系统调用 REST API

业务系统、前端、批处理、其他应用都调这个 endpoint。  
这里解决的是：

- 把模型能力暴露成统一 API。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))
    

---

## 一个很实用的“生产思维”

你不要把 endpoint 想成“模型本体”，而应该想成：

**endpoint 是门牌号，模型版本是屋里当前住的人。**

- `catalog.schema.model` 是这套房产在 UC 里的正式档案
    
- `version 3` / `version 4` 是具体住户
    
- `Champion` 是“当前主住户”的称号
    
- `endpoint` 是对外的门牌号
    
- 外部系统只认门牌号，不关心屋里具体换了谁。这个“屋里换了谁”的动作，通常由你的部署流程根据 alias 去完成。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))
    

---

## 一套最小的代码骨架

### 注册和设置 alias

```python
import mlflow
from mlflow import MlflowClient

mlflow.set_registry_uri("databricks-uc")

client = MlflowClient()

# 假设模型已经注册为 prod.ml_team.sentiment_model
client.set_registered_model_alias(
    "prod.ml_team.sentiment_model",
    "Champion",
    3
)
```

这个 alias 现在表示：`Champion -> version 3`。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

### 部署脚本里解析 alias

```python
champion = client.get_model_version_by_alias(
    "prod.ml_team.sentiment_model",
    "Champion"
)

model_name = champion.name
model_version = champion.version
```

Databricks 官方文档给的 serving 工作流示例就是这个思路。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

### 创建或更新 endpoint 时写入具体版本

概念上会是：

```json
{
  "name": "sentiment-prod-endpoint",
  "config": {
    "served_entities": [
      {
        "entity_name": "prod.ml_team.sentiment_model",
        "entity_version": "3"
      }
    ]
  }
}
```

这个字段结构来自 Databricks 的 custom serving endpoint 配置。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

### 外部调用

```http
POST /serving-endpoints/sentiment-prod-endpoint/invocations
```

带 token 和 JSON 输入。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints "Query serving endpoints for custom models | Databricks on AWS"))

---

## 最后一句最适合记忆的话

**Unity Catalog 负责“管理模型”，Serving endpoint 负责“暴露模型”，alias 负责“决定该上哪个版本”，REST API 负责“让外部系统调用这个版本”。** ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/ "Manage model lifecycle in Unity Catalog | Databricks on AWS"))

你要的话，我下一条可以直接给你画一个 **注册模型 → alias → endpoint → API 调用** 的流程图版 Markdown。