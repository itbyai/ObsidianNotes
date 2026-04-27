![[Pasted image 20260427224514.png]]

这页讲的是 **Model Evaluation（模型评估）**，是 Databricks GenAI 考试里非常核心的内容。

核心思想：

> **不要只看模型本身有多强，而要看它在你的真实业务场景里效果好不好。**

---

## 这页图是什么意思？

左边是：

> **Raw Model Intelligence**  
> 模型原始能力

右边是：

> **Actual Business Impact**  
> 实际业务价值 / 真实业务影响

中间的桥是：

> **Evaluation**  
> 评估

意思是：

> 模型参数大、benchmark 分数高，不代表它一定能解决你的业务问题。  
> 你需要通过 evaluation，把“模型能力”转化成“业务效果”。

比如一个 frontier model 在通用考试 benchmark 上很强，但在你公司内部政策问答里，如果没有 RAG、没有正确检索、没有 grounded answer，它仍然可能答错。

---

## 这页第一句话：Move from generic benchmarks to metrics based on your specific workflows

中文意思：

> 从通用 benchmark，转向基于你自己具体业务流程的评估指标。

### Generic benchmark 是什么？

就是通用模型排行榜、标准测试集，比如：

- 通用问答能力
    
- 数学推理能力
    
- 代码能力
    
- 多语言能力
    
- benchmark score
    

这些可以参考，但不能完全代表你的业务。

### Specific workflow metrics 是什么？

就是根据你的真实场景设计评估。

比如你做 RAG 问答系统，就要看：

|评估指标|含义|
|---|---|
|**correctness**|答案是否正确|
|**groundedness**|答案是否基于 retrieved chunks|
|**relevance**|是否回答了用户问题|
|**retrieval precision**|找回来的 chunk 是否相关|
|**document recall**|应该找回的文档有没有找回来|
|**latency**|响应速度|
|**cost**|token 成本|
|**safety**|是否有不安全输出|

考试重点：

> **业务场景不同，evaluation metrics 也不同。**

---

## 第二句话：Confidently downgrade from high-cost frontier models

中文意思：

> 通过评估，你可以有信心地从昂贵的 frontier model 降级到更便宜的模型。

这个非常重要。

前面讲过：

> 选择能满足质量要求的最小模型。

但怎么知道 small / medium model 够不够？

答案就是：

> **Evaluation。**

例如：

你测试了两个模型：

|模型|正确率|平均延迟|每月成本|
|---|--:|--:|--:|
|Frontier model|96%|3 秒|$4,000|
|Medium model|94%|1 秒|$500|

如果业务可以接受 94%，那 medium model 可能更好。

所以 evaluation 帮你证明：

> 不一定需要最强模型，也许更便宜的模型已经够好。

---

## 第三句话：Combat hallucinations by using ground truth data

中文意思：

> 使用 ground truth data 来对抗 hallucination。

### Hallucination 是什么？

就是模型一本正经地胡说，生成看起来合理但实际错误的内容。

比如问：

> 公司退款政策是多少天？

模型回答：

> 60 天。

但真实政策是：

> 30 天。

这就是 hallucination。

---

## 什么是 ground truth data？

**Ground truth data** 就是标准答案 / 真实答案 / 人工确认过的正确数据。

比如一组测试题：

```text
Question: What is the refund period?
Expected answer: 30 days.
```

或者：

```text
Input: Invoice PDF
Expected output:
{
  "invoice_date": "2026-04-01",
  "total_amount": "$1,250.00"
}
```

有了 ground truth，就可以比较模型输出和标准答案：

```text
模型答案 vs 正确答案
```

这样才能判断模型到底有没有答对。

考试重点：

> 没有 ground truth，就很难系统性判断模型质量。

---

## 这页提到三种 evaluation techniques

下面这句很关键：

> We will discuss three evaluation techniques: human-in-the-loop, LLM-as-judge, and benchmark evaluations.

也就是三种评估方法：

---

# 1. Human-in-the-loop

中文：

> 人工参与评估 / 人在环评估

意思是让人来判断模型输出好不好。

适合：

- 高风险场景
    
- 法律、医疗、金融、合规
    
- subjective output，比如文案质量、语气、完整性
    
- 早期建立 ground truth 数据集
    

比如法律合同审查：

```text
模型标记某条 liability clause 有风险
→ 法务人员确认是否真的有风险
```

优点：

> 准确、可信、适合高风险。

缺点：

> 慢、贵、不能大规模自动化。

考试里看到 **high-stakes / legal review / compliance / human approval**，通常要想到 **human-in-the-loop**。

---

# 2. LLM-as-judge

中文：

> 用另一个 LLM 作为裁判来评估输出。

比如让一个更强模型判断：

```text
Question: ...
Retrieved context: ...
Model answer: ...

Evaluate whether the answer is correct, grounded, and relevant.
```

它可以打分：

```json
{
  "correctness": 4,
  "groundedness": 5,
  "relevance": 4,
  "explanation": "The answer is mostly correct and supported by the context."
}
```

适合：

- 大规模自动评估
    
- RAG 回答质量检查
    
- 比较多个模型
    
- 回归测试
    
- 快速发现质量下降
    

优点：

> 快、可扩展、适合自动化。

缺点：

> judge model 自己也可能判断错，所以高风险场景仍然需要人工复核。

考试重点：

> **LLM-as-judge 适合 scalable evaluation，但不等于完全替代 human review。**

---

# 3. Benchmark evaluations

中文：

> 基准测试评估

这类评估使用固定测试集或标准 benchmark 来比较模型。

适合：

- 初步比较模型能力
    
- 比较不同模型版本
    
- 快速筛选候选模型
    
- 看通用能力水平
    

但局限是：

> benchmark 分数高，不一定代表你的业务效果好。

所以这页强调：

> 要从 generic benchmarks 走向 specific workflow metrics。

考试重点：

> Benchmark 可以参考，但生产场景更重要的是业务相关 evaluation。

---

## 三种评估方法对比

|Evaluation 方法|适合场景|优点|缺点|
|---|---|---|---|
|**Human-in-the-loop**|高风险、主观质量、法律合规|最可信|慢、贵|
|**LLM-as-judge**|大规模自动评估、RAG 质量检查|快、可扩展|judge 也可能错|
|**Benchmark evaluations**|初步模型比较、通用能力测试|标准化、容易比较|不一定贴合业务|

---

## 考试常见问题

### 问法 1

> 为什么不能只看 benchmark score 来选模型？

答案：

> 因为 benchmark 是通用测试，不一定代表模型在具体业务 workflow 中的表现。应该用业务相关指标进行 evaluation。

---

### 问法 2

> 如何判断是否可以从 frontier model 降级到 cheaper model？

答案：

> 用 evaluation 比较不同模型在真实任务上的 quality、latency 和 cost。如果较小模型满足质量要求，就可以降级。

---

### 问法 3

> 如何减少 hallucination？

答案：

> 使用 ground truth data、RAG grounding、evaluation metrics，比如 correctness 和 groundedness，并结合 human review 或 LLM-as-judge。

---

### 问法 4

> 高风险合规场景应该用什么评估方式？

答案：

> Human-in-the-loop，必要时结合 LLM-as-judge 进行初筛，但最终需要人工确认。

---

## 和前面内容串起来

前面讲模型选择：

```text
Small → 快、便宜
Medium → 质量和成本平衡
Large → 复杂推理
Frontier → 高风险、质量优先
```

但真正决定用哪个，不能靠感觉，要靠：

```text
Evaluation
```

所以完整流程是：

```text
1. 选择候选模型
2. 准备 ground truth / test set
3. 定义业务相关 metrics
4. 比较 quality、cost、latency
5. 选择最小可用模型
6. 持续监控线上表现
```

---

## 这页一句话背诵

> **Evaluation bridges the gap between raw model intelligence and actual business impact.**

中文记法：

> **评估把“模型看起来聪明”变成“业务上真的有用”。**

考试口诀：

```text
Benchmark 只能参考
业务指标才关键

Ground truth 防 hallucination
Evaluation 支持模型降级降成本

高风险 → Human-in-the-loop
大规模自动评估 → LLM-as-judge
初步模型比较 → Benchmark evaluation
```

![[Pasted image 20260427224555.png]]

这页讲的是 **Human-in-the-Loop（人在环 / 人工参与评估）**。

核心意思是：

> 在 GenAI 系统里，不是完全让 AI 自动决定，而是让人参与 **review、edit、validate**，特别适合高风险、高质量要求的场景。

---

## 这页内容翻译

### Human-in-the-Loop

人在环 / 人工参与

使用人工人员来：

|英文|中文|含义|
|---|---|---|
|**Review**|审查|看模型输出是否合理|
|**Edit**|编辑|修改模型生成的内容|
|**Validate**|验证|确认答案是否正确、合规、可用|

### Pros 优点

|英文|中文|含义|
|---|---|---|
|**Trust and safety**|信任和安全|人来把关，降低错误和风险|
|**Nuance and context**|细微差别和上下文|人能理解复杂语境、业务背景、灰色地带|
|**Gold standard**|黄金标准 / 最高可信标准|人工标注或人工判断可以作为 ground truth|

---

## Human-in-the-Loop 是什么？

简单说：

> **AI 先生成结果，人再检查、修改或批准。**

比如：

```text
AI 总结合同风险
→ 法务人员 review
→ 法务人员 edit
→ 法务人员 validate
→ 最终结果才能使用
```

这就叫 Human-in-the-Loop。

---

## 为什么需要 Human-in-the-Loop？

因为 LLM 可能会：

- hallucinate，生成不真实内容
    
- 理解错业务规则
    
- 漏掉重要信息
    
- 生成不合规内容
    
- 对模糊问题判断不准
    

所以在高风险场景里，不能完全依赖 AI。

---

## 典型场景

### 1. 法律合同审查

AI 可以先找出合同里的 liability clauses，但最后要法务确认。

```text
AI: 这 5 页可能有偏离标准条款
Human: 确认是否真的有法律风险
```

---

### 2. 医疗/健康场景

AI 可以辅助总结病例，但医生必须确认。

```text
AI: 总结病人症状和历史记录
Doctor: 判断是否准确、是否可以用于诊疗
```

---

### 3. 合规内容审查

AI 可以检查营销文案是否违反政策，但合规人员最终 approve。

```text
AI: 这段广告语可能夸大效果
Compliance reviewer: 确认并修改
```

---

### 4. 建立 Ground Truth 数据集

人可以给模型输出打分，形成标准答案。

比如：

|Question|Model Answer|Human Rating|
|---|---|---|
|公司退款政策是多少天？|30 days|Correct|
|年假怎么申请？|通过 HR portal|Correct|
|某合同是否合规？|不合规|Needs review|

这些人工判断之后可以作为后续 evaluation 的 gold standard。

---

## 重点词：Gold Standard

**Gold standard** 在考试里很重要。

它不是“黄金标准答案”的文学表达，而是指：

> 最可信、最权威、可以作为评估基准的标准答案。

通常来自：

- 专家标注
    
- 人工审核
    
- 真实业务数据
    
- 已确认的 ground truth
    

比如你要评估一个 RAG 问答系统，需要有一批问题和标准答案：

```text
Question: What is the refund period?
Gold standard answer: 30 days.
```

然后比较模型答案是否接近 gold standard。

---

## Human-in-the-Loop 的优点

### 1. Trust and safety

人参与后，系统更可信、更安全。

尤其适合：

- 法律
    
- 医疗
    
- 金融
    
- 合规
    
- 高价值客户
    
- 生产系统变更
    

考试里看到 **high-stakes**，通常要想到 human-in-the-loop。

---

### 2. Nuance and context

**Nuance** 是“细微差别”。

有些问题不是非黑即白，需要理解上下文。

比如合同条款：

```text
This liability clause is different from the standard template.
```

AI 可能只能判断“不同”，但人可以判断：

- 这个差异是否重要
    
- 是否真的有法律风险
    
- 是否可以接受
    
- 是否需要谈判
    

这就是人类专家的价值。

---

### 3. Gold standard

人工判断可以形成高质量数据，用来：

- 评估模型
    
- 训练评估集
    
- 比较不同模型
    
- 验证 LLM-as-judge 是否靠谱
    
- 作为 regression test 的标准答案
    

---

## 但 Human-in-the-Loop 也有缺点

虽然 slide 上没有写，但考试可能会问 trade-off。

主要缺点是：

|缺点|说明|
|---|---|
|**Slow**|人工审核慢|
|**Expensive**|专家时间贵|
|**Not scalable**|大规模处理困难|
|**Inconsistent**|不同人判断标准可能不一致|
|**Bottleneck**|人工审批可能成为流程瓶颈|

所以它最适合：

> 高风险、高价值、质量要求高的场景。

不适合所有普通低风险任务。

---

## Human-in-the-Loop 和 LLM-as-Judge 的区别

|对比|Human-in-the-Loop|LLM-as-Judge|
|---|---|---|
|谁来评估|人|另一个 LLM|
|可信度|高|中到高|
|成本|高|低很多|
|速度|慢|快|
|可扩展性|差|好|
|适合场景|高风险、复杂判断|大规模自动评估|
|局限|慢、贵|judge model 也可能错|

考试里常见搭配是：

```text
低风险大规模评估 → LLM-as-judge
高风险最终确认 → Human-in-the-loop
```

---

## 考试怎么考？

### 题型 1

> A GenAI system reviews legal contracts and flags risky clauses. What evaluation approach is most appropriate?

答案：

> **Human-in-the-loop**

因为法律合同是高风险场景，需要专家验证。

---

### 题型 2

> Why use human-in-the-loop evaluation?

答案：

> To improve trust and safety, capture nuance and context, and create gold-standard ground truth data.

---

### 题型 3

> What is the downside of human-in-the-loop?

答案：

> It is slower, more expensive, and less scalable than automated evaluation.

---

## 这页一句话背诵

> **Human-in-the-loop means humans review, edit, and validate GenAI outputs, especially for high-stakes tasks where trust, safety, nuance, and gold-standard evaluation matter.**

中文记法：

> **人在环 = AI 先做，人来审、改、确认；适合高风险场景，也是建立标准答案的最好方式。**

考试口诀：

```text
High-stakes → Human-in-the-loop

Review / Edit / Validate → Human involvement

Trust + Safety + Nuance + Gold Standard
→ 人工评估的核心价值
```


![[Pasted image 20260427224726.png]]


这页继续讲 **Human-in-the-Loop（人在环）**，但这一页重点是它的缺点。

核心意思是：

> 人工参与虽然最可信，但不适合所有场景，因为它会带来 **成本、速度、规模化、一致性** 的问题。

---

## 这页内容翻译

### Cons

缺点：

|英文|中文|含义|
|---|---|---|
|**Scalability & cost**|可扩展性和成本问题|人工审核很难大规模处理，而且人力成本高|
|**Latency**|延迟|等人 review 会让流程变慢|
|**Subjectivity and bias**|主观性和偏见|不同人判断标准可能不一致，也可能带有个人偏见|

---

## 1. Scalability & Cost

**Scalability** 是“可扩展性”。

意思是：

> 如果任务量很大，靠人工审核很难扩展。

比如你每天只有 20 份合同要 review，人可以做。

但如果每天有：

```text
10,000 条客服回复
50,000 条产品描述
1,000,000 条评论分类
```

每条都让人审核，就会非常慢、非常贵。

所以 human-in-the-loop 适合：

- 高风险
    
- 高价值
    
- 低到中等数量
    
- 需要专家判断的任务
    

不适合：

- 超大规模
    
- 低风险
    
- 简单重复任务
    

考试里如果看到：

> large-scale evaluation  
> high volume  
> low cost  
> automated assessment

通常不优先选 human-in-the-loop，而更可能选 **LLM-as-judge** 或自动化 evaluation。

---

## 2. Latency

**Latency** 是延迟、等待时间。

如果 AI 输出之后还要等人审核，整个流程就慢了。

比如：

```text
AI 生成合同风险摘要：10 秒
法务人员审核：2 天
```

这在法律场景可以接受，因为风险高。

但如果是在线客服聊天：

```text
用户问问题
AI 回答
每次都等人工审核
```

那用户体验会很差。

所以考试判断：

|场景|是否适合 Human-in-the-loop|
|---|---|
|法律合同审查|适合|
|医疗建议辅助|适合|
|合规审批|适合|
|实时客服问答|不一定适合|
|大规模低风险分类|不适合|
|每秒需要返回结果的系统|不适合|

---

## 3. Subjectivity and Bias

**Subjectivity** 是主观性。  
**Bias** 是偏见。

意思是：

> 不同人对同一个模型输出，可能给出不同评价。

比如模型写了一封营销邮件。

Reviewer A 觉得：

> 很专业，可以用。

Reviewer B 觉得：

> 太正式，不够吸引人。

这就是主观性。

再比如合同风险判断，不同法务人员可能对风险容忍度不同，一个人觉得需要修改，另一个人觉得可以接受。

所以 human evaluation 也不是完美的。

---

## 如何减少主观性和偏见？

考试可能会问如何改进 human-in-the-loop。

常见方法是：

1. 制定清晰评分标准
    
2. 使用 rubric
    
3. 多人评审同一批样本
    
4. 计算一致性
    
5. 使用专家 reviewer
    
6. 对 reviewer 做培训
    
7. 把人工结果沉淀成 gold standard dataset
    

### Rubric 是什么？

**Rubric** 就是评分规则 / 评价标准。

比如评估一个 RAG 回答：

|维度|评分标准|
|---|---|
|Correctness|答案是否正确|
|Groundedness|是否基于给定 context|
|Completeness|是否完整|
|Relevance|是否回答问题|
|Safety|是否安全合规|

有了 rubric，人评估时就不会完全凭感觉。

---

## 考试最容易考的点

### 问法 1

> What is a major disadvantage of human-in-the-loop evaluation?

答案：

> It is costly, hard to scale, increases latency, and can be subjective or biased.

---

### 问法 2

> When is human-in-the-loop not ideal?

答案：

> Large-scale, low-risk, real-time, high-throughput tasks.

---

### 问法 3

> How can subjectivity in human evaluation be reduced?

答案：

> Use clear rubrics, consistent guidelines, multiple reviewers, and gold-standard datasets.

---

## Human-in-the-loop 的完整优缺点

|优点|缺点|
|---|---|
|最可信|慢|
|适合高风险|贵|
|能理解上下文和细微差别|难扩展|
|可作为 gold standard|可能主观、有偏见|
|适合法律、医疗、合规|不适合实时大规模任务|

---

## 这页一句话背诵

> **Human-in-the-loop is trustworthy but slow, expensive, hard to scale, and can be subjective.**

中文记法：

> **人在环最可靠，但贵、慢、难规模化，而且人的判断也可能不一致。**

考试口诀：

```text
高风险、高价值 → Human-in-the-loop

大规模、低延迟、低成本 → 不适合纯人工评估

人工评估要配 rubric，减少主观性和 bias
```


![[Pasted image 20260427224816.png]]

这页讲的是 **LLM-as-Judge**，也就是：

> **用一个 LLM 当“裁判”，来评估另一个 LLM 的输出质量。**

它是 GenAI 评估里非常重要的考点，尤其适合 **大规模自动化评估**。

---

## 这页内容翻译

### LLM-as-Judge

使用一个 “judge” 模型，这个模型会：

|英文|中文|含义|
|---|---|---|
|**Grades other models**|给其他模型打分|判断另一个模型回答得好不好|
|**Uses rubrics**|使用评分标准|按照明确规则评价|
|**Provides detailed justification**|提供详细理由|不只是给分，还解释为什么这样打分|

### Pros 优点

|英文|中文|含义|
|---|---|---|
|**Explainable verdicts**|可解释的判断结果|能说明为什么答案好或不好|
|**Extreme scalability & lower cost**|极强可扩展性和更低成本|比人工评估快很多、便宜很多|
|**Elimination of human fatigue**|消除人工疲劳|不会像人一样审多了疲劳、走神|

---

## LLM-as-Judge 是怎么工作的？

假设你有一个 RAG 问答系统。

用户问题：

```text
What is the company refund policy?
```

你的模型回答：

```text
Customers can request a refund within 60 days.
```

但 retrieved context 里写的是：

```text
Refunds are allowed within 30 days of purchase.
```

这时可以让另一个更强的 LLM 当 judge：

```text
Question: What is the company refund policy?

Context:
Refunds are allowed within 30 days of purchase.

Model Answer:
Customers can request a refund within 60 days.

Evaluate the answer based on correctness, groundedness, and relevance.
```

Judge model 可能输出：

```json
{
  "correctness": 1,
  "groundedness": 1,
  "relevance": 4,
  "justification": "The answer is relevant to the question, but it incorrectly states 60 days instead of the 30 days provided in the context."
}
```

这就是 **LLM-as-Judge**。

---

## 什么是 rubric？

**Rubric** 就是评分规则 / 评价标准。

比如评估一个 RAG 答案，可以用这些 rubric：

|维度|评分内容|
|---|---|
|**Correctness**|答案是否正确|
|**Groundedness**|答案是否基于提供的 context|
|**Relevance**|是否回答了用户问题|
|**Completeness**|是否完整|
|**Safety**|是否安全、合规|

如果没有 rubric，judge model 可能会凭感觉打分；有了 rubric，评估会更稳定、更可重复。

---

## 为什么 LLM-as-Judge 有用？

### 1. Explainable verdicts

它不只是说：

> 这个答案 3 分。

它还会解释：

> 为什么是 3 分，哪里错了，哪里没有引用 context，哪里不完整。

这对调试 RAG 很有用。

比如你能知道问题出在：

- retrieval 没找对 chunk
    
- 模型没有正确使用 context
    
- prompt 不够清楚
    
- 模型 hallucination
    
- 输出格式不符合要求
    

---

### 2. Extreme scalability & lower cost

人工评估 10,000 条答案很慢、很贵。

LLM-as-Judge 可以自动批量评估：

```text
10,000 个问题
→ 10,000 个模型答案
→ judge model 自动评分
→ 输出质量报告
```

所以它适合：

- 大规模模型比较
    
- RAG regression test
    
- prompt 版本比较
    
- 模型升级前后对比
    
- 生产监控
    

---

### 3. Elimination of human fatigue

人评估久了会疲劳，标准可能变松或变严。

比如：

```text
第 1 条认真看
第 100 条开始疲劳
第 1000 条可能随便点
```

LLM 不会因为疲劳导致判断不稳定。

当然，LLM-as-Judge 也不是绝对完美，它只是比人工更容易规模化。

---

## 和 Human-in-the-Loop 的区别

|对比|Human-in-the-Loop|LLM-as-Judge|
|---|---|---|
|谁来评估|人|LLM|
|可信度|高，尤其是专家|中到高，看 judge model 能力|
|成本|高|较低|
|速度|慢|快|
|可扩展性|差|很强|
|适合场景|高风险最终确认|大规模自动评估|
|缺点|慢、贵、主观|judge model 也可能判断错|

考试里要记：

> **LLM-as-Judge 适合大规模自动化评估，但高风险场景不能完全替代人工审核。**

---

## 考试最容易考的点

### 问法 1

> What is LLM-as-Judge?

答案：

> 使用一个 LLM 根据 rubric 来评估另一个模型的输出，并给出评分和解释。

---

### 问法 2

> When should you use LLM-as-Judge?

答案：

> 当你需要 scalable、lower-cost、automated evaluation，比如批量评估 RAG 答案、比较多个模型、做 regression testing。

---

### 问法 3

> What are the benefits?

答案：

> 可解释、可扩展、成本低、减少人工疲劳。

---

### 问法 4

> Does LLM-as-Judge replace human review?

答案：

> 不完全。它适合自动化评估和初筛；高风险、法律、医疗、合规场景仍然需要 human-in-the-loop。

---

## 这页一句话背诵

> **LLM-as-Judge uses a judge model and rubrics to grade model outputs at scale, with explanations, lower cost, and less human fatigue.**

中文记法：

> **LLM-as-Judge = 让一个更强/专门的模型当裁判，按评分标准批量评估其他模型的答案。**

考试口诀：

```text
Human-in-the-loop
→ 最可信，但慢、贵、难扩展

LLM-as-Judge
→ 自动化、可扩展、成本低、有解释

High-risk final approval
→ 仍然需要人
```

![[Pasted image 20260427224948.png]]


这页继续讲 **LLM-as-Judge**，但重点是它的缺点。

核心意思是：

> LLM-as-Judge 很适合大规模自动评估，但它本身也是一个模型，所以也会有偏见、误判、不稳定和可复现性问题。

---

## 这页内容翻译

### Cons 缺点

1. **Inherent model biases**  
    模型固有偏见，包括：
    
    - **Verbosity bias**：偏好更长、更详细的回答
        
    - **Positional bias**：偏好出现在某个位置的答案
        
    - **Ecosystem bias**：偏好自己生态或自己厂商的模型输出
        
2. **Lack of human intuition**  
    缺少人类直觉
    
3. **Version drift and reproducibility**  
    模型版本漂移和可复现性问题
    

---

# 1. Inherent model biases 模型固有偏见

LLM-as-Judge 的最大问题是：

> 它不是绝对客观的裁判，它也有自己的偏见。

## Verbosity bias

**Verbosity** 是“啰嗦、详细程度”。

**Verbosity bias** 的意思是：

> Judge model 可能更喜欢长答案，觉得长答案更完整、更专业，即使长答案未必更正确。

比如：

### Answer A

```text
Refund period is 30 days.
```

### Answer B

```text
According to the company refund policy, customers may request a refund within 30 days of purchase, provided they meet the eligibility conditions and submit the required documentation through the appropriate channel.
```

如果问题只是问：

> What is the refund period?

其实 Answer A 已经对了。

但 LLM judge 可能给 Answer B 更高分，因为它看起来更完整、更正式。

考试重点：

> 长答案不一定更好，LLM judge 可能偏好 verbose answer。

---

## Positional bias

**Positional bias** 是“位置偏见”。

意思是：

> 当 judge 比较多个答案时，它可能偏好第一个答案，或者偏好最后一个答案，而不是完全根据质量判断。

比如 prompt 里给它：

```text
Answer A: ...
Answer B: ...
Which answer is better?
```

有些 judge model 可能天然更倾向选 A，或者更倾向选 B。

所以为了减少 positional bias，可以：

- 随机交换答案顺序
    
- 多次评估取平均
    
- 用 pairwise comparison
    
- 不要只跑一次 judge
    

---

## Ecosystem bias

**Ecosystem bias** 是“生态偏见”。

意思是：

> Judge model 可能更偏好来自同一模型家族、同一厂商、同一风格的回答。

比如用某个厂商的 frontier model 当 judge，它可能更喜欢和自己风格类似的回答。

这在比较不同模型时很重要。

考试重点：

> 用 LLM-as-Judge 比较不同模型时，要小心 judge model 的偏向性。

---

# 2. Lack of human intuition 缺少人类直觉

LLM judge 可以按照 rubric 打分，但它没有真正的人类业务经验、法律判断、医疗判断或组织上下文。

比如合同审查：

AI 可以判断：

> 这个 liability clause 和标准模板不一样。

但它未必能判断：

- 这个差异在真实谈判中是否可接受
    
- 这个客户是否属于战略客户
    
- 这个风险是否业务上可以承担
    
- 公司以往是否接受过类似条款
    

这些需要人类专家的判断。

所以：

> LLM-as-Judge 适合自动化评估，但不能完全替代专家判断。

特别是：

- legal
    
- medical
    
- financial
    
- compliance
    
- safety-critical
    
- high-stakes scenarios
    

这些场景最终仍然需要 **human-in-the-loop**。

---

# 3. Version drift and reproducibility

这个是考试里很容易考的点。

## Version drift 是什么？

**Version drift** 是模型版本漂移。

意思是：

> 今天 judge model 的判断，和下个月同一个 judge model 的判断，可能不一样。

因为模型供应商可能更新了模型版本。

比如你今天用 judge model 评估：

```text
Model A score: 4.5
Model B score: 4.2
```

两个月后，同样的数据再跑一次：

```text
Model A score: 4.1
Model B score: 4.4
```

结果变了。

这就会影响生产评估和回归测试。

---

## Reproducibility 是什么？

**Reproducibility** 是可复现性。

意思是：

> 同样输入、同样设置，能不能得到同样结果。

LLM 本身有随机性，如果没有控制好：

- model version
    
- prompt version
    
- temperature
    
- evaluation rubric
    
- test dataset
    
- retrieval context
    

评估结果就可能不稳定。

考试重点：

> 做 LLM-as-Judge 时，要尽量固定模型版本、prompt、rubric、测试集和参数。

---

## 如何减少这些问题？

考试里可以这样答：

|问题|缓解方法|
|---|---|
|Verbosity bias|明确 rubric，不奖励无关长答案|
|Positional bias|随机答案顺序，多次评估|
|Ecosystem bias|使用多个 judge model 或人工抽样校验|
|Lack of intuition|高风险场景加入 human-in-the-loop|
|Version drift|固定模型版本，记录 evaluation 配置|
|Reproducibility|固定 prompt、rubric、temperature、test set|

---

## LLM-as-Judge 的完整优缺点

|优点|缺点|
|---|---|
|可大规模自动评估|judge model 自己也有 bias|
|成本低于人工|可能偏好长答案|
|速度快|可能有位置偏见|
|能给解释|可能缺少业务直觉|
|不会疲劳|模型版本变化会影响结果|
|适合 regression testing|可复现性需要控制|

---

## 和 Human-in-the-Loop 的关系

最好的方式通常不是二选一，而是组合使用：

```text
LLM-as-Judge 做大规模自动评估
↓
发现低分或高风险 case
↓
Human-in-the-loop 做人工复核
```

比如：

- 普通客服问答：LLM-as-Judge 批量评估
    
- 法律合同风险：LLM-as-Judge 初筛，法务最终确认
    
- RAG 系统上线前：LLM judge 跑 regression test，人抽样复核
    

---

## 考试常见问法

### 问法 1

> What is a limitation of LLM-as-Judge?

答案：

> It can have inherent model biases, lack human intuition, and suffer from version drift or reproducibility issues.

---

### 问法 2

> What is verbosity bias?

答案：

> The judge may prefer longer, more detailed answers even when they are not more correct.

---

### 问法 3

> What is positional bias?

答案：

> The judge may prefer answers based on their position in the prompt, such as first or last, rather than quality.

---

### 问法 4

> How do you handle high-stakes evaluation?

答案：

> Use LLM-as-Judge for scalable initial evaluation, but keep human-in-the-loop for final validation.

---

## 这页一句话背诵

> **LLM-as-Judge is scalable and cheap, but it can be biased, lack human intuition, and suffer from model version drift, so high-risk evaluations still need human review.**

中文记法：

> **LLM 当裁判很快、很便宜、能规模化，但它也会偏、会变、不一定懂业务，所以高风险场景还要人来把关。**

考试口诀：

```text
LLM-as-Judge 优点：
快、便宜、可扩展、有解释

LLM-as-Judge 缺点：
模型偏见、缺少人类直觉、版本漂移、可复现性问题

高风险最终判断：
Human-in-the-loop
```


![[Pasted image 20260427225203.png]]

这页讲的是 **Benchmark Evaluations（基准评估 / 基准测试）**。

核心意思是：

> 用一套固定的测试集和指标，给模型或 GenAI 应用建立一个“客观基线”，方便比较、回归测试和优化成本/延迟。

---

## 这页内容翻译

### Benchmark evaluations 可以帮助你：

|英文|中文|含义|
|---|---|---|
|**Establish an objective baseline**|建立客观基线|先知道当前模型表现是多少分|
|**Identify critical weaknesses**|识别关键弱点|找出模型在哪些任务上表现差|

### 优点 Pros：

|英文|中文|含义|
|---|---|---|
|**Rapid regression testing**|快速回归测试|模型、prompt、RAG 改动后快速验证有没有变差|
|**Cost and latency optimization**|成本和延迟优化|比较不同模型是否更便宜、更快且质量还能接受|
|**Operational consistency**|运营一致性|用固定标准持续评估，保证生产质量稳定|

---

## 什么是 Benchmark Evaluation？

**Benchmark evaluation** 就是：

> 用固定问题、固定答案、固定评分方式，来评估模型表现。

比如你有一个 RAG 问答系统，你准备 100 个标准问题：

```text
Question 1: What is the refund policy?
Expected answer: Refunds are allowed within 30 days.

Question 2: How do employees request annual leave?
Expected answer: Through the HR portal.
```

然后每次模型或 prompt 改动后，都跑这 100 个问题，看结果有没有变好或变差。

---

## 重点 1：Establish an objective baseline

**Objective baseline** 可以理解为：

> 一个客观的起点分数 / 当前表现基准。

比如你第一次测试系统：

|指标|当前结果|
|---|--:|
|Correctness|82%|
|Groundedness|88%|
|Average latency|2.5 秒|
|Average cost|$0.03 / request|

这就是 baseline。

以后你换模型、改 prompt、改 chunk size、改 top-k retrieval，都要和这个 baseline 比。

---

## 重点 2：Identify critical weaknesses

Benchmark 可以帮你发现模型的薄弱点。

比如整体正确率是 85%，看起来还行，但细分后发现：

|问题类型|正确率|
|---|--:|
|简单 FAQ|95%|
|政策问答|88%|
|多文档比较|60%|
|数字计算|45%|

这说明模型不是所有地方都差，而是：

> 多文档比较和数字计算是 critical weaknesses。

考试里要知道：

> Benchmark 不只是给一个总分，更重要是帮助你发现具体哪里不行。

---

## 重点 3：Rapid regression testing

这个特别像你做 QA automation 的概念。

**Regression testing** 就是：

> 系统改动后，确认原来能工作的功能没有坏掉。

在 GenAI 里，改动可能包括：

- 换模型
    
- 改 prompt
    
- 改 system instruction
    
- 改 chunk size
    
- 改 embedding model
    
- 改 vector search top-k
    
- 改 reranker
    
- 改 temperature
    
- 改 serving endpoint
    

每次改完都跑 benchmark，看质量有没有下降。

比如：

```text
Before prompt change:
Correctness = 86%

After prompt change:
Correctness = 78%
```

这说明 prompt 改坏了。

所以 benchmark evaluation 可以作为 GenAI 系统的自动化回归测试。

---

## 重点 4：Cost and latency optimization

Benchmark 不只是看质量，也可以帮你优化成本和速度。

比如你测试三个模型：

|模型|Correctness|Latency|Cost|
|---|--:|--:|--:|
|Frontier model|96%|4 秒|高|
|Large model|94%|2 秒|中|
|Medium model|91%|1 秒|低|

如果业务要求是：

> Correctness ≥ 90%

那 medium model 就可能是最佳选择，因为它满足质量要求，同时成本低、速度快。

这和前面那句连起来：

> **Choose the smallest model that meets the quality requirement.**

没有 benchmark，你就没有证据证明可以降级模型。

---

## 重点 5：Operational consistency

**Operational consistency** 是生产环境里很重要的概念。

意思是：

> 不是今天测一下就结束，而是要持续用同一套标准监控模型表现。

比如每次上线前都跑：

```text
Benchmark test suite
↓
Correctness >= 90%
Groundedness >= 90%
Latency <= 2 seconds
Cost <= target threshold
```

如果低于阈值，就不能上线。

这就把 GenAI 系统变成一个可管理、可测试、可监控的生产系统。

---

## Benchmark Evaluation 的局限

虽然 slide 这页讲的是优点，但考试也可能考缺点。

Benchmark 的问题是：

|局限|说明|
|---|---|
|可能不贴合真实业务|通用 benchmark 不一定代表你的 workflow|
|容易被过度优化|模型可能只在测试集上表现好|
|不能完全评价开放式输出|文案、创意、复杂判断很难只靠固定答案|
|可能忽略上下文变化|企业知识和业务规则会变|
|不能完全替代人工评估|高风险场景还要 human-in-the-loop|

所以 benchmark 很有用，但不能单独依赖。

---

## 和前面三种 Evaluation 的关系

|方法|最适合|
|---|---|
|**Human-in-the-loop**|高风险、专家判断、建立 gold standard|
|**LLM-as-Judge**|大规模自动评分、解释性评估|
|**Benchmark Evaluation**|固定测试集、回归测试、模型比较、成本延迟优化|

可以组合使用：

```text
Human experts 创建 gold standard
↓
Benchmark test set 固定下来
↓
LLM-as-Judge 批量评分
↓
每次模型/prompt/RAG 改动都做 regression test
```

---

## Databricks 考试重点

这页常见考法：

### 问法 1

> 为什么要做 benchmark evaluation？

答案：

> 建立客观 baseline，发现关键弱点，并支持快速回归测试、成本和延迟优化、生产一致性。

---

### 问法 2

> 换了更便宜的模型后，如何确认质量没有下降？

答案：

> 用 benchmark evaluation / regression test 比较新旧模型在固定测试集上的表现。

---

### 问法 3

> 为什么不能只看 generic benchmark？

答案：

> 因为通用 benchmark 不一定反映具体业务 workflow，应该建立业务相关的 benchmark 和 metrics。

---

## 这页一句话背诵

> **Benchmark evaluation uses a fixed test set to establish a baseline, find weaknesses, and support fast regression testing, cost optimization, latency optimization, and operational consistency.**

中文记法：

> **Benchmark Evaluation = 固定测试集 + 客观基线 + 快速回归测试 + 成本/延迟优化 + 生产稳定性。**

考试口诀：

```text
Human-in-the-loop
→ 最可信，但慢、贵

LLM-as-Judge
→ 可扩展、自动评分

Benchmark Evaluation
→ 固定测试集、建 baseline、做 regression testing
```


![[Pasted image 20260427225929.png]]


这页讲的是 **Synthetic Data Generation（合成数据生成）**，在 Databricks GenAI 考试里，重点通常放在：

> **用 AI 自动生成 evaluation dataset / test cases，用来评估 RAG 或 Agent 的质量。**

Databricks 官方文档里也把它放在 **Agent Evaluation / Evaluation dataset** 相关内容下：可以从文档中自动生成有代表性的 evaluation set，帮助快速评估 agent，并覆盖更多测试场景。([Databricks Documentation](https://docs.databricks.com/aws/en/generative-ai/agent-evaluation/synthesize-evaluation-set?utm_source=chatgpt.com "Synthesize evaluation sets | Databricks on AWS"))

---

## 这页内容翻译

标题：

> **Synthetic Data Generation**  
> 合成数据生成

副标题：

> **Databricks Synthetic Data Generation API**  
> Databricks 合成数据生成 API

右边四个点：

|英文|中文|解释|
|---|---|---|
|**Rapid dataset creation**|快速创建数据集|快速生成测试问题、标准答案、对话样本等|
|**Proprietary grounding**|基于企业专有知识生成|根据公司内部文档、知识库、业务资料生成测试数据|
|**SME optimization**|领域专家优化|Subject Matter Expert 可以审核、改进生成的数据|
|**Seamless integration**|无缝集成|和 Databricks Agent Evaluation / MLflow evaluation workflow 集成|

---

## Synthetic Data 是什么？

**Synthetic data** 就是：

> 不是从真实用户那里直接收集来的数据，而是由系统或模型“生成出来”的数据。

在 GenAI 评估里，最常见的是生成：

- 测试问题
    
- 标准答案
    
- 多轮对话
    
- 用户意图
    
- 边界场景
    
- RAG 问答样本
    
- Agent 任务样本
    

例如你有一批公司政策文档，系统可以自动生成类似这样的 evaluation set：

```text
Document: Refund Policy

Synthetic Question:
What is the refund period for online purchases?

Expected Answer:
Customers can request a refund within 30 days of purchase.
```

这样你就不用人工从零开始写 100 个测试问题。

---

## 重点 1：Rapid dataset creation

这是最直接的好处：

> 快速生成 evaluation dataset。

以前要人工做评估集，需要业务专家一条条写：

```text
问题
标准答案
相关文档
评分标准
```

非常慢。

Synthetic Data Generation 可以根据已有文档自动生成一批测试样本。

这对考试很重要，因为前面一直说：

> GenAI 不能只靠感觉上线，必须有 evaluation。

但 evaluation 需要数据集。Synthetic data 就是帮助你快速构建这个数据集。

---

## 重点 2：Proprietary grounding

**Proprietary** 是“企业专有的”。  
**Grounding** 是“基于可靠上下文”。

**Proprietary grounding** 的意思是：

> 合成数据不是凭空乱编，而是基于企业自己的文档、知识库、业务规则来生成。

比如你公司有：

- HR policy
    
- legal contract templates
    
- product manuals
    
- internal SOP
    
- project documents
    
- clinical / finance / supply chain business rules
    

系统可以从这些文档里生成测试问题和答案。

这很适合 RAG/Agent 评估，因为你的 GenAI 应用本来就是要回答这些内部知识问题。

---

## 重点 3：SME optimization

**SME = Subject Matter Expert**  
中文是：

> 领域专家 / 业务专家

比如：

|领域|SME 可能是谁|
|---|---|
|法律合同|Legal counsel|
|医疗数据|Clinician / clinical analyst|
|供应链|Supply planner / demand planner|
|财务|Finance manager|
|数据平台|Data owner / BA / QA lead|

Synthetic data 生成后，不代表一定完美。SME 可以：

- 审核问题是否真实
    
- 修改标准答案
    
- 增加边界场景
    
- 删除不合理问题
    
- 标注高风险场景
    
- 把 synthetic data 变成更可靠的 gold standard
    

所以它不是完全替代人工，而是：

> AI 先生成草稿，SME 再优化。

---

## 重点 4：Seamless integration

这里指它可以和 Databricks 的 GenAI evaluation workflow 结合。

比如流程可以是：

```text
内部文档
→ Synthetic Data Generation
→ Evaluation Dataset
→ 用来测试 RAG / Agent
→ MLflow / Agent Evaluation 记录结果
→ 比较模型、prompt、retrieval 配置
```

Databricks 文档也提到，synthetic generation API 和 Agent Evaluation 集成，用来生成代表性的 evaluation set，从而减少完全人工标注的成本。([Databricks Documentation](https://docs.databricks.com/aws/en/release-notes/product/2024/december?utm_source=chatgpt.com "December 2024 | Databricks on AWS"))

---

## 考试重点：Synthetic Data 主要解决什么问题？

它主要解决：

> evaluation dataset 不够的问题。

很多 GenAI 项目失败，不是因为没有模型，而是因为：

- 没有测试集
    
- 没有标准答案
    
- 不知道模型回答好不好
    
- 没有办法比较模型 A 和模型 B
    
- 没有办法做 regression testing
    

Synthetic Data Generation 可以快速生成一批初始测试数据，让你开始评估。

---

## 和前面 Evaluation 的关系

你可以这样串起来记：

```text
Human-in-the-loop
→ 人工评估，最可信，但慢、贵

LLM-as-Judge
→ 自动评分，快、便宜、可扩展

Benchmark Evaluation
→ 固定测试集，做 baseline 和 regression testing

Synthetic Data Generation
→ 快速生成 benchmark / evaluation dataset
```

也就是说：

> Synthetic Data Generation 是 evaluation 的“数据来源之一”。

---

## 但要注意：Synthetic Data 不等于真实数据

考试可能会考缺点。

Synthetic data 有风险：

|风险|说明|
|---|---|
|不够真实|生成的问题可能不像真实用户会问的问题|
|偏向文档表面内容|可能只生成简单问题，覆盖不到复杂场景|
|可能遗漏边界场景|比如异常输入、冲突文档、权限问题|
|可能继承模型偏见|生成数据的模型本身可能有 bias|
|不能完全替代人工|高风险场景仍需 SME / human review|

所以正确说法不是：

> 有 synthetic data 就够了。

而是：

> synthetic data 可以快速启动 evaluation，但需要 SME 审核，并最好结合真实 production traces / real user questions。

---

## 考试常见问法

### 问法 1

> Why use synthetic data generation for GenAI evaluation?

答案：

> To rapidly create evaluation datasets, especially when manually labeled data is limited or expensive.

---

### 问法 2

> What does proprietary grounding mean?

答案：

> Synthetic questions and answers are generated from enterprise-specific documents or knowledge sources, not generic public data.

---

### 问法 3

> Does synthetic data replace human evaluation?

答案：

> No. It helps create datasets quickly, but SMEs should review and refine them, especially for high-stakes use cases.

---

### 问法 4

> Where does synthetic data fit in the evaluation workflow?

答案：

> It can be used to build benchmark/evaluation datasets for testing RAG or Agent applications, then combined with LLM-as-judge, human review, and regression testing.

---

## 这页一句话背诵

> **Synthetic Data Generation helps quickly create evaluation datasets grounded in enterprise knowledge, which SMEs can refine and Databricks can integrate into the evaluation workflow.**

中文记法：

> **合成数据生成 = 根据企业文档快速生成测试问题和标准答案，用来评估 RAG / Agent；但需要业务专家审核，不能盲信。**

考试口诀：

```text
没有 evaluation dataset
→ 用 Synthetic Data Generation 快速生成

企业内部文档
→ proprietary grounding

专家审核优化
→ SME optimization

用于模型比较和回归测试
→ Benchmark / Agent Evaluation
```