![[Pasted image 20260427231237.png]]

这页讲的是 GenAI / LLM 的两个经典问题：

> **Hallucinations 幻觉**  
> **Stale Knowledge 过时知识**

考试里这个点非常重要，因为它直接关联到：**为什么需要 RAG、evaluation、grounding 和 monitoring。**

---

## 1. Hallucinations 是什么？

Slide 上的定义是：

> **When a model generates factually incorrect but highly confident statements**

中文：

> 当模型生成了事实错误、但语气非常自信的回答。

也就是我们常说的：

> **一本正经地胡说。**

比如你问：

> Databricks Vector Search 支持什么 index 类型？

模型如果不知道，但仍然编一个看起来很专业的答案，这就是 hallucination。

再比如：

```text
用户问：公司退款政策是多少天？

真实答案：30 天

模型回答：客户可以在 60 天内申请退款。
```

这就是 hallucination。

---

## 2. Hallucination 的特点

幻觉不是普通的“不知道”。

它的问题是：

|特点|说明|
|---|---|
|事实错误|答案不符合真实情况|
|语气自信|模型不会表现出不确定|
|看起来合理|很容易骗过用户|
|可能无法追溯来源|没有 evidence / citation|
|在高风险场景危险|法律、医疗、金融、合规尤其严重|

所以考试里看到：

- factually incorrect
    
- confident answer
    
- unsupported claim
    
- no grounding
    
- made-up citation
    
- fabricated information
    

都要想到：

> **Hallucination**

---

## 3. Stale Knowledge 是什么？

Slide 上的定义是：

> **Where a model's training data has a fixed cutoff date**

中文：

> 模型训练数据有一个固定截止日期，所以它可能不知道截止日期之后的新信息。

比如模型训练数据截止在某一天，那么它可能不知道：

- 最新产品价格
    
- 最新法律法规
    
- 最新公司政策
    
- 最新文档版本
    
- 最新 Databricks 功能
    
- 最新财报
    
- 最新 API 参数
    
- 最新组织架构
    

这就是 **stale knowledge**，也就是“知识过期”。

---

## 4. Hallucination vs Stale Knowledge 区别

这两个很容易混，但考试可能会区分。

|对比|Hallucination|Stale Knowledge|
|---|---|---|
|中文|幻觉|过时知识|
|本质|模型编了错误答案|模型知识截止，不知道新信息|
|问题原因|生成机制 + 缺少 grounding|训练数据有 cutoff|
|表现|自信地说错|用旧信息回答|
|解决思路|RAG、grounding、evaluation、guardrails|RAG、实时检索、更新数据源|
|例子|编造一个不存在的政策|用旧版政策回答|

一句话区分：

> **Hallucination 是模型乱编；Stale Knowledge 是模型知道的是旧版本。**

---

## 5. 为什么 RAG 可以缓解这两个问题？

RAG 的作用是：

```text
用户问题
→ 检索最新/相关文档
→ 把 retrieved chunks 放进 prompt
→ 模型基于这些上下文回答
```

所以：

### 对 Hallucination

RAG 提供 grounding，让模型有依据回答。

比如 prompt 要求：

> 只基于 retrieved context 回答，如果找不到答案就说不知道。

这样可以减少模型乱编。

### 对 Stale Knowledge

RAG 可以连接最新企业知识库、文档、表、API 或网页。

即使模型训练数据过期，只要 retrieval 拿到的是最新文档，模型就可以基于最新资料回答。

所以考试里常见答案是：

> 如果问题依赖最新信息或企业内部知识，使用 RAG，而不是单纯换更大模型。

---

## 6. 但 RAG 不是万能的

RAG 可以缓解 hallucination 和 stale knowledge，但不能完全消除。

因为 RAG 也可能出问题：

|问题|结果|
|---|---|
|检索错 chunk|模型基于错误上下文回答|
|chunk 太小|上下文不完整|
|chunk 太大|噪音太多，成本高|
|文档本身过期|RAG 也会给旧答案|
|prompt 没约束好|模型仍然可能乱编|
|没有 evaluation|不知道系统是否真的变好|

所以正确做法是：

```text
RAG
+ good chunking
+ good retrieval
+ grounding instruction
+ evaluation
+ monitoring
+ human review for high-risk cases
```

---

## 7. 考试常见问法

### 问法 1

> A model confidently gives an incorrect answer. What is this?

答案：

> **Hallucination**

---

### 问法 2

> A model gives an answer based on outdated training data. What is this?

答案：

> **Stale knowledge**

---

### 问法 3

> How can you reduce hallucinations in an enterprise chatbot?

答案：

> Use RAG with trusted enterprise documents, ground answers in retrieved context, evaluate groundedness/correctness, and use human review for high-risk outputs.

---

### 问法 4

> How can you address stale knowledge?

答案：

> Connect the model to up-to-date data sources using RAG / retrieval / tools instead of relying only on the model’s training data.

---

## 这页一句话背诵

> **Hallucination = confidently wrong.  
> Stale knowledge = outdated because of training cutoff.  
> RAG helps by grounding answers in current, trusted data.**

中文口诀：

```text
模型乱编 → Hallucination

模型知识旧 → Stale Knowledge

解决方向：
RAG + Grounding + Evaluation + Monitoring
```