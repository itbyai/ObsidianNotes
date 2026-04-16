可以把这两个概念拆开看：

- **Serving Concurrency**：这个 endpoint **同一时刻**最多能并行处理多少个请求
    
- **扩缩容控制**：系统在流量变化时，**怎么增减可用容量**，既保证延迟/QPS，又控制成本
    

在 Databricks 官方文档里，这两者是直接关联的：创建 custom serving endpoint 时，UI 里的 **Compute Scale-out** 就是在配置“这个 served model 同时能处理多少请求”，官方还给了一个非常实用的近似公式：**所需并发数 ≈ QPS × 模型运行时间**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

---

## 1. 什么是 Serving Concurrency

最简单理解：

**并发 = 同时在路上的请求数（in-flight requests）**

它不是“每秒多少请求”，那是 **QPS**。  
但两者关系很紧：

```text
所需并发 ≈ QPS × 平均延迟（秒）
```

Databricks 在创建 endpoint 的说明里就是这么说的：Compute Scale-out 选择的值，应大致等于 **QPS × model run time**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

### 例子 1

如果你的服务平均延迟是 **200ms = 0.2 秒**，目标是 **50 QPS**：

```text
并发 ≈ 50 × 0.2 = 10
```

意思是：

你大概需要能同时处理 **10 个请求**，才能比较平稳地扛住 50 QPS。

### 例子 2

如果你的平均延迟是 **500ms = 0.5 秒**，目标是 **100 QPS**：

```text
并发 ≈ 100 × 0.5 = 50
```

这时并发需求就明显更高。

---

## 2. 为什么并发很重要

如果并发容量太低，会发生几件事：

- 请求开始排队
    
- 延迟明显上升
    
- 流量突发时容易返回 **429 Too Many Requests**
    
- 用户会感觉“服务慢”或“偶尔失败”
    

Databricks 的生产优化文档明确提到：当端点出现 **queuing** 或 **429** 时，就说明你碰到了扩缩容/吞吐瓶颈。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/production-optimization?utm_source=chatgpt.com "Optimize Model Serving endpoints for production"))

---

## 3. Databricks 里并发是怎么配的

### 对 custom model endpoint

Databricks 当前文档里，创建 endpoint 时需要选 **workload_size / scale-out**。官方当前文档给出的范围大致是：

- **Small**：约 **0–4 requests**
    
- **Medium**：约 **8–16 requests**
    
- **Large**：约 **16–64 requests**
    

这些是当前 UI/API 提示的并发容量档位。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints?utm_source=chatgpt.com "Create custom model serving endpoints | Databricks on AWS"))

也就是说，你不是直接输入“QPS”，而是在给每个 served entity 配一个“并发容量级别”。

### 更高并发

如果你需要更高并发，Databricks 现在支持：

- **route optimization**
    
- 某些情况下的 **custom option**
    
- 更高的 provisioned concurrency 上限
    

官方 limits 文档写到，custom model / AI agent endpoint 在启用 route optimization 和 custom option 时，**每模型的 provisioned concurrency 上限是 1024**，workspace 级别是 **4096**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/model-serving-limits "Model Serving limits and regions | Databricks on AWS"))

---

## 4. 什么是扩缩容控制

扩缩容控制说白了就是：

**流量低的时候少开资源，流量高的时候多开资源。**

Databricks 生产优化文档对 provisioned concurrency 的建议很明确：

- **Minimum concurrency**：至少要够扛住基础流量，避免平时也排队
    
- **Maximum concurrency**：要够扛住流量峰值，但不能无限高，否则浪费钱
    
- **Autoscaling**：让系统根据流量自动调节容量。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/production-optimization "Optimize Model Serving endpoints for production | Databricks on AWS"))
    

所以扩缩容控制其实是在回答 3 个问题：

1. **最少保留多少容量**
    
2. **最多允许扩到多少容量**
    
3. **什么时候扩、什么时候缩**
    

---

## 5. 一个很具体的例子

假设你有一个客服分类 endpoint。

### 业务情况

- 平时：20 QPS
    
- 高峰：120 QPS
    
- 平均延迟：250ms = 0.25 秒
    

### 先算并发

平时并发需求：

```text
20 × 0.25 = 5
```

高峰并发需求：

```text
120 × 0.25 = 30
```

### 这意味着什么

你至少需要一个能稳定扛住 **5 左右并发** 的底座，  
高峰时最好能扩到 **30 左右并发**。

如果你把最小容量设太低，比如 1–2，并且又正好碰到高峰：

- 平时都可能开始排队
    
- 扩容来不及
    
- 高峰时容易抖动
    

如果你把最大容量设得太低，比如只能到 10：

- 平时没问题
    
- 高峰时一定积压，延迟飙升甚至 429
    

如果你把最大容量设很高，比如 100，但流量其实最多只需要 30：

- 能扛住
    
- 但成本可能明显浪费
    

这就是为什么 Databricks 文档会强调：  
**min 要够 baseline，max 要够 spike，autoscaling 用来动态平衡。** ([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/production-optimization "Optimize Model Serving endpoints for production | Databricks on AWS"))

---

## 6. Scale to zero 和扩缩容是什么关系

很多人会把这两个混在一起，其实不完全一样。

### Autoscaling

是在“**有流量**”的前提下，动态加减容量。

### Scale to zero

是在“**长时间没流量**”时，直接缩到 0。

Databricks 当前文档说明：

- **Scale to zero** 会在 endpoint **30 分钟无请求**后缩到 0
    
- 再次来请求时会有 **cold start**
    
- 从 0 拉起来通常 **10–20 秒**，有时可能更久
    
- **不建议生产环境**依赖它来保证稳定响应。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/custom-models "Custom models overview | Databricks on AWS"))
    

所以：

- **扩缩容** 是在线调节
    
- **scale to zero** 是彻底休眠
    

### 实战建议

如果是开发/测试环境：

- 可以开 scale to zero，省钱
    

如果是生产环境、低延迟要求高：

- 通常关掉 scale to zero
    
- 保留一个最小容量，避免冷启动
    

Databricks 官方也明确提醒：对需要持续可用性或稳定响应时间的生产负载，不要用 scale to zero。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/custom-models "Custom models overview | Databricks on AWS"))

---

## 7. Route optimization 和扩缩容有什么关系

它不是“扩缩容”本身，但会显著影响你能扛的并发和 QPS。

Databricks 官方写得很明确：

- route optimization 会优化网络路径
    
- 带来更高 QPS 和更低、更稳定的延迟
    
- 适合 **>200 QPS**
    
- 适合对延迟要求严格的生产系统。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/production-optimization "Optimize Model Serving endpoints for production | Databricks on AWS"))
    

当前官方 limits 里：

- **非 route optimized**：workspace 级别 QPS 只有 **200**，而且官方说这更适合小型开发场景
    
- **route optimized**：endpoint/workspace 级别都可到 **300,000 QPS**
    
- 额外开销延迟可低于 **20ms**。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/model-serving-limits "Model Serving limits and regions | Databricks on AWS"))
    

所以如果你服务是：

- 真正线上高流量
    
- 多用户并发
    
- 严格 SLA
    

那 route optimization 往往是第一优先级。

---

## 8. 怎么判断你现在该调哪里

### 现象 1：延迟高，但 CPU/GPU 并不忙

先看是不是：

- 网络路径问题
    
- 客户端并发过低/过高
    
- route optimization 没开
    

### 现象 2：一到高峰就排队或 429

优先看：

- 最大并发上限是不是太低
    
- autoscaling 范围是不是太窄
    
- baseline min concurrency 是不是太小
    

### 现象 3：平时几乎没人用，但成本高

优先看：

- minimum concurrency 是否设太高
    
- 是否能开启 scale to zero（仅限非严格生产）
    
- workload_size 是否 oversized
    

### 现象 4：第一次请求特别慢，后面还好

这通常是：

- scale to zero 触发了冷启动
    
- endpoint 从 0 扩回来
    

Databricks 明确说 first request after scale-to-zero 会经历 cold start。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/custom-models "Custom models overview | Databricks on AWS"))

---

## 9. 一套最实用的配置思路

### 开发 / 测试环境

目标：便宜优先

- 小 workload
    
- scale to zero 开启
    
- route optimization 通常不用
    
- 接受冷启动
    

### 一般生产环境

目标：稳定优先

- min concurrency 能覆盖 baseline
    
- max concurrency 能覆盖常见峰值
    
- 关闭 scale to zero
    
- 高流量时开启 route optimization
    

### 高流量、低延迟生产

目标：SLA 优先

- route optimization 开启
    
- 明确做 load test
    
- 按 `QPS × latency` 估算并发
    
- 适当预留冗余
    
- 如果接近上限，申请更高 concurrency / limits
    

Databricks 的生产优化文档也建议：遇到高查询量、严格延迟要求、排队或 429、以及成本平衡问题时，就应该系统性优化 endpoint。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/production-optimization?utm_source=chatgpt.com "Optimize Model Serving endpoints for production"))

---

## 10. 最短总结

### Serving Concurrency

是 **“同一时刻能处理多少请求”**。  
估算公式：

```text
Concurrency ≈ QPS × Avg Latency
```

### 扩缩容控制

是 **“最少保留多少容量、最多扩到多少容量、是否自动调节”**。

### Scale to zero

是 **“长时间没流量时彻底缩到 0”**，省钱但会冷启动，不适合要求稳定响应的生产系统。([Databricks Docs](https://docs.databricks.com/aws/en/machine-learning/model-serving/create-manage-serving-endpoints "Create custom model serving endpoints | Databricks on AWS"))

如果你愿意，我可以下一条继续给你做一张 **Serving Concurrency / QPS / Latency / Autoscaling / Scale-to-zero 的关系图**。