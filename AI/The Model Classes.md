![[Pasted image 20260427170638.png]]


这页 **The Model Classes** 的核心考点不是让你背“多少参数算 small / medium / large”，而是考你：**面对一个 GenAI/RAG/Agent 场景，应该选什么级别的模型，以及为什么。** Databricks 官方考试说明也强调会考“选择合适的 models、tools、approaches”，并覆盖 Vector Search、Model Serving、MLflow、Unity Catalog 等 Databricks 工具。([Databricks](https://www.databricks.com/learn/certification/genai-engineer-associate "Databricks Certified Generative AI Engineer Associate | Databricks"))

## 这页要记住的主线

|Model Class|中文理解|典型特点|考试常见判断|
|---|---|---|---|
|**Small Models**|小模型|便宜、快、低延迟、适合高并发|简单分类、抽取、路由、格式化、批量处理|
|**Medium Models**|中等模型|成本和能力平衡|普通企业问答、简单 RAG、一般总结、结构化输出|
|**Large Models**|大模型|推理更强、理解复杂指令更好，但成本/延迟更高|复杂 RAG、多步骤任务、代码、复杂总结、工具调用|
|**Frontier Models**|前沿模型/最强模型|当前最先进，效果最好，但通常最贵、最慢、治理要求更高|高难推理、复杂 agent planning、关键业务场景、做 LLM judge/evaluator|

一句话记忆：

> **能用小模型解决，就不要上 frontier model；但必须用 evaluation 证明质量够。**

## 最容易考的点 1：模型选择 trade-off

考试会给你一个场景，让你判断选哪个模型。

例如：

**场景 A：每天要处理 100 万条客户评论，只做情感分类。**  
优先考虑 **small / medium model**，因为任务简单、量大，重点是 cost 和 latency。

**场景 B：法律合同问答，需要结合公司内部文档，回答必须有依据。**  
不是单纯换大模型，而是优先考虑 **RAG + 合适模型 + grounding/evaluation**。RAG 适合 proprietary、frequently changing、domain-specific 信息。([Databricks Documentation](https://docs.databricks.com/aws/en/generative-ai/retrieval-augmented-generation "RAG (Retrieval Augmented Generation) on Databricks | Databricks on AWS"))

**场景 C：复杂 agent，需要分解任务、调用多个工具、做多步推理。**  
更可能需要 **large / frontier model**，因为 agent 的核心是模型能 reason、plan、decide which tools to call。Databricks 文档也把 agent 描述为能接收请求、推理下一步、调用工具并返回结果的系统。([Databricks Documentation](https://docs.databricks.com/gcp/en/generative-ai/guide/concepts/ "Concepts: Generative AI on Databricks | Databricks on Google Cloud"))

## 最容易考的点 2：不要把“大模型”当万能答案

很多题的陷阱是：  
“质量不好怎么办？”  
很多人第一反应是换更大的模型，但考试更喜欢系统性思路：

1. 先优化 prompt / system instruction
    
2. 如果缺少企业知识，用 **RAG**
    
3. 如果行为/格式/领域风格不稳定，考虑 fine-tuning
    
4. 用 evaluation 比较不同模型
    
5. 在质量、成本、延迟之间做 trade-off
    

Databricks Foundation Model APIs 支持快速访问 Databricks 托管的 foundation models，也支持比较模型、替换生产模型、结合 vector index 构建 RAG。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/ "Databricks Foundation Model APIs | Databricks on AWS"))

## 最容易考的点 3：Databricks 里的 serving 方式

这个一定要记：

|模式|什么时候用|
|---|---|
|**Pay-per-token**|实验、POC、快速开始，不想自己部署|
|**Provisioned throughput**|生产、高吞吐、性能保证、fine-tuned model、安全/合规要求|
|**AI Functions / batch inference**|批量推理，比如对大量表数据做分类、总结、抽取|
|**External models**|使用 OpenAI、Anthropic 等外部模型，但通过 Databricks 做集中治理|

Databricks 官方文档明确说 Foundation Model APIs 有 pay-per-token、provisioned throughput、AI Functions optimized models；其中 provisioned throughput 推荐用于生产、高吞吐、性能保证、fine-tuned models 或额外安全要求。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/ "Databricks Foundation Model APIs | Databricks on AWS")) Model Serving 也支持 pay-per-token、AI Functions、provisioned throughput 和 external models 等方式。([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview "Supported foundation models on Mosaic AI Model Serving | Databricks on AWS"))

## 最容易考的点 4：RAG 场景下模型大小怎么选

RAG 不是“模型越大越好”。RAG 的质量取决于：

- 文档是否切分好
    
- embedding / vector search 是否准确
    
- retrieval 是否召回正确 chunk
    
- prompt 是否把 context 用好
    
- 模型是否能 grounded answer
    
- evaluation 是否覆盖真实问题
    

Databricks 对 RAG 的定义是：先 retrieval，拿到外部知识；再 augmentation，把支持数据和用户问题合成 prompt；最后 generation，让 LLM 生成答案。([Databricks Documentation](https://docs.databricks.com/aws/en/generative-ai/retrieval-augmented-generation "RAG (Retrieval Augmented Generation) on Databricks | Databricks on AWS"))

考试判断可以这样记：

> **知识缺口 → RAG；能力缺口 → 更大模型或 fine-tuning；质量验证 → evaluation。**

## 最容易考的点 5：Evaluation 指标

这页虽然讲模型分类，但考试通常会接着问：你怎么知道这个模型够不够好？

Databricks 推荐关注 RAG/GenAI 的质量、成本和延迟指标，包括 retrieval 的 precision/recall、response 的 correctness、relevance、groundedness、safety，以及 token count 和 latency。([Databricks Documentation](https://docs.databricks.com/aws/en/generative-ai/tutorials/ai-cookbook/evaluate-assess-performance "Assess performance: Metrics that matter | Databricks on AWS"))

要记这些关键词：

- **correctness**：答案对不对
    
- **groundedness**：有没有基于 retrieved context，是否 hallucination
    
- **relevance_to_query**：是否回答了问题
    
- **chunk relevance / precision**：取回来的 chunks 是否相关
    
- **document recall**：该取回的文档有没有取回来
    
- **safety**：有没有 harmful content
    
- **latency_seconds**：响应速度
    
- **token count / cost**：成本
    

## 考试答题套路

看到题目时，按这个顺序想：

1. **任务复杂度高不高？**  
    简单分类/抽取 → small/medium；复杂推理/agent → large/frontier。
    
2. **是否需要公司内部知识？**  
    需要 → RAG + Vector Search，而不是只换大模型。
    
3. **是否是生产场景？**  
    POC → pay-per-token；生产高吞吐 → provisioned throughput。
    
4. **是否需要治理？**  
    需要考虑 Unity Catalog、permissions、lineage、access control、model governance。
    
5. **如何证明效果？**  
    用 MLflow / Agent Evaluation，看 correctness、groundedness、latency、cost。
    

## 你可以这样背

**Small = fast and cheap**  
**Medium = balanced**  
**Large = better reasoning**  
**Frontier = best capability, highest cost/risk**

考试最核心的一句话：

> **Choose the smallest model that meets quality requirements, validate with evaluation, and deploy with the right Databricks serving/governance pattern.**


![[Pasted image 20260427214432.png]]

这页讲的是 **Small Models 小模型**。在 Databricks GenAI 考试里，这个点主要考：**什么时候应该用小模型，而不是一上来就用大模型 / frontier model。**

## 这页内容翻译

**Small Models**

参数数量：

> 大约 **7B–13B parameters**

特点：

> **Fast**：速度快  
> **Inexpensive**：成本低

适合：

> **Extraction**：信息抽取  
> **Formatting**：格式整理  
> **Simple Q&A**：简单问答

---

## 什么是 parameters？

**Parameters = 模型参数**，可以简单理解为模型“学到的内部权重”。

参数越多，一般代表模型容量越大，理解和推理能力可能更强，但通常也会：

- 更贵
    
- 更慢
    
- 需要更多计算资源
    
- 部署成本更高
    

这里的 **7B–13B** 里的 **B = Billion = 十亿**。

所以：

|写法|含义|
|---|---|
|7B|70 亿参数|
|13B|130 亿参数|

小模型不是说“很弱”，而是说它适合做**任务明确、逻辑简单、格式稳定**的工作。

---

## Small Models 适合什么场景？

### 1. Extraction 信息抽取

比如从文本里抽取字段：

```text
Customer name: John Smith
Order ID: 12345
Delivery date: 2026-05-01
```

你让模型输出：

```json
{
  "customer_name": "John Smith",
  "order_id": "12345",
  "delivery_date": "2026-05-01"
}
```

这种任务不需要很强推理，用小模型就够了。

---

### 2. Formatting 格式转换

比如把自然语言转成固定格式：

原文：

```text
Please book a meeting with David next Monday at 10am.
```

输出：

```json
{
  "action": "book_meeting",
  "person": "David",
  "date": "next Monday",
  "time": "10am"
}
```

或者把一段内容改成 Markdown、JSON、SQL template、email format。

这种也是小模型常见用途。

---

### 3. Simple Q&A 简单问答

比如：

> What is the capital of France?

或者基于很短的一段上下文回答：

```text
The refund period is 30 days.
```

问题：

> How long is the refund period?

答案：

> 30 days.

这种简单问答不需要 frontier model。

---

## 考试最容易考的点

### 考点 1：小模型的优势是 cost + latency

看到题里出现这些关键词，要想到 small model：

- high volume
    
- low latency
    
- cost-sensitive
    
- simple task
    
- structured extraction
    
- formatting
    
- classification
    
- routing
    
- simple Q&A
    

比如题目问：

> 公司每天要处理几百万条日志，只需要判断是否包含错误类型，应该选什么模型？

答案倾向：

> Small model，因为任务简单、数据量大、需要低成本和高速度。

---

### 考点 2：不要用大模型浪费成本

考试很可能会考这种陷阱：

> 为了提高系统效果，是否应该直接使用 frontier model？

不一定。

正确思路通常是：

> 先选择能满足质量要求的最小模型，然后用 evaluation 验证效果。

也就是：

```text
small model 能达到质量要求
→ 用 small model

small model 不够
→ 再考虑 medium / large / frontier
```

---

### 考点 3：小模型不适合复杂推理

小模型不太适合：

- 多步骤复杂 reasoning
    
- 复杂 agent planning
    
- 复杂代码生成
    
- 复杂法律/医疗/金融分析
    
- 长上下文复杂总结
    
- 需要深度理解多个文档的 RAG
    

这些场景更可能需要 **large model** 或 **frontier model**。

---

## 和 RAG 的关系

在 RAG 里，小模型也可以用，但要看任务复杂度。

例如：

|RAG 场景|小模型是否合适|
|---|---|
|从 retrieved chunks 里抽取日期、名字、金额|合适|
|根据短 chunk 回答简单问题|合适|
|多文档比较、复杂总结、冲突判断|可能不够|
|法律合同复杂推理|通常需要更大模型|

所以考试里不要看到 RAG 就一定选大模型。  
关键还是看：

> retrieved context 是否简单？问题是否简单？答案是否容易从 chunk 中直接找到？

---

## 这页可以这样背

**Small models = fast, cheap, good for simple structured tasks.**

中文就是：

> 小模型速度快、成本低，适合抽取、格式化、分类、简单问答；但不适合复杂推理和复杂 agent。


![[Pasted image 20260427214754.png]]


这页讲的是 **Medium Models（中等模型）**。它在考试里重点考：**质量和成本的平衡**。

## 这页内容翻译

**Medium Models**

参数数量：

> 大约 **30B–70B parameters**

特点：

> **Balance quality and cost**  
> 在回答质量和使用成本之间取得平衡

适合：

> **Support**：客服支持、业务支持、内部知识问答  
> **Content generation**：内容生成，比如邮件、总结、文案、说明文字

---

## Medium Models 是什么水平？

可以理解为：

> **比 small model 更聪明，但还没有 large/frontier model 那么贵。**

它不是最强的模型，但已经可以处理很多实际业务场景。

比如：

|模型类型|特点|
|---|---|
|Small Models|快、便宜，适合简单任务|
|Medium Models|质量和成本平衡，适合一般企业应用|
|Large Models|更强推理，适合复杂任务|
|Frontier Models|当前最强，但贵、慢、治理要求高|

---

## Medium Models 适合什么场景？

### 1. Support 支持类场景

这里的 **support** 通常可以理解为：

- customer support 客服
    
- IT support 内部技术支持
    
- HR support 人力资源问答
    
- business support 业务支持
    
- knowledge base Q&A 知识库问答
    

比如员工问：

> How do I request annual leave?

系统从公司政策里找答案，然后回答。

这种场景比简单 Q&A 复杂一点，因为可能需要：

- 理解用户问题
    
- 从文档中找相关内容
    
- 总结成自然语言
    
- 保持语气清楚、专业
    

所以 medium model 比 small model 更合适。

---

### 2. Content generation 内容生成

比如：

- 写邮件
    
- 写产品介绍
    
- 写 FAQ
    
- 总结会议纪要
    
- 改写文本
    
- 生成客服回复
    
- 生成知识库文章
    

例如你给它一些要点：

```text
Product delay: 2 weeks
Reason: supplier issue
Customer impact: minimal
```

让它生成一封英文邮件：

```text
Hi customer,

We would like to inform you that the delivery will be delayed by approximately two weeks due to a supplier-related issue...
```

这种内容生成任务通常需要比 small model 更好的语言组织能力，所以 medium model 比较合适。

---

## 考试重点 1：Medium model = balanced choice

看到题里出现这些关键词，要想到 **medium model**：

- balance quality and cost
    
- general-purpose business task
    
- support chatbot
    
- customer service
    
- content generation
    
- summarisation
    
- internal knowledge assistant
    
- not too simple, not highly complex
    

比如题目说：

> 公司想做一个内部 HR 问答助手，要求回答质量不错，但成本也要控制。应该选什么模型？

答案倾向：

> Medium model。

因为它比 small model 更能理解自然语言，也比 frontier model 成本低。

---

## 考试重点 2：Medium model 常用于普通 RAG

普通企业 RAG 应用里，medium model 很常见。

例如：

```text
Company documents
→ chunks
→ embeddings
→ vector search
→ retrieve relevant chunks
→ medium model generates answer
```

如果问题是：

> What is the refund policy?

或者：

> Summarise the onboarding steps for new employees.

这种通常不需要 frontier model。

但是如果是：

> Compare three legal contracts, identify contradictions, and recommend negotiation risks.

那 medium model 可能不够，需要 large 或 frontier model。

---

## 考试重点 3：Medium 不一定比 Small 永远好

这是考试常见陷阱。

如果任务只是：

- 分类
    
- 抽取字段
    
- 格式转换
    
- 简单判断 yes/no
    

那 small model 可能就够了。

比如：

> 从 100 万条订单评论里提取 order number 和 delivery date。

这个用 small model 更合理，因为：

- 任务简单
    
- 数据量大
    
- 成本敏感
    
- 不需要复杂推理
    

所以不要看到 medium 更强就一定选 medium。

---

## Small vs Medium 怎么区分？

|场景|更适合|
|---|---|
|抽取字段|Small|
|格式转换|Small|
|简单分类|Small|
|简单 Q&A|Small|
|客服机器人|Medium|
|内部知识库问答|Medium|
|邮件生成|Medium|
|普通总结|Medium|
|普通 RAG 回答|Medium|
|复杂推理、多步骤 agent|Large / Frontier|

---

## 这页可以这样背

> **Medium models = balance between quality and cost.**

中文记法：

> **中等模型 = 不太贵，效果也不错，适合普通企业级问答、客服支持和内容生成。**

考试答题时可以这样想：

```text
任务太简单 → small model
普通业务问答 / 内容生成 → medium model
复杂推理 / 多步骤任务 → large model
最高难度 / 关键业务 → frontier model
```

![[Pasted image 20260427215922.png]]

这页讲的是 **Frontier Models（前沿模型 / 最先进模型）**。

它的考试重点是：

> **Frontier model 不是日常默认选择，而是用于高风险、高复杂度、质量优先于成本的场景。**

---

## 这页内容翻译

**Frontier Models**

意思是：

> **State-of-the-art**  
> 当前最先进、最强的一类模型

最适合：

> **High-stakes scenarios where quality outweighs cost**  
> 高风险场景，并且回答质量比成本更重要

---

## Frontier Models 是什么？

Frontier models 可以理解为：

> 当前能力最强的一批模型，比如推理、理解、代码、复杂规划、多模态能力都非常强。

它们通常比 large model 还强，但也通常：

- 成本最高
    
- 延迟更高
    
- 调用更贵
    
- 治理要求更高
    
- 需要更严格的评估和监控
    

所以考试里不要理解成：

> frontier model = 永远最好的选择

更准确是：

> frontier model = 当质量、安全性、复杂推理能力比成本更重要时才用。

---

## 什么是 High-stakes scenarios？

**High-stakes** 的意思是：**高风险 / 高影响 / 不能轻易出错的场景**。

比如：

|场景|为什么是 high-stakes|
|---|---|
|医疗建议辅助|错误可能影响病人安全|
|金融风险分析|错误可能造成重大损失|
|法律合同分析|错误可能带来法律风险|
|安全事件响应|错误判断可能扩大事故|
|企业高层决策支持|影响战略和资金投入|
|复杂代码迁移|错误可能影响生产系统|
|复杂 agent 自动执行任务|错误工具调用可能造成严重后果|

---

## Frontier Model 适合什么任务？

### 1. 复杂推理

例如：

> 根据多个政策文件、历史案例和业务规则，判断这个特殊案例是否应该批准。

这不是简单找答案，而是要做：

- 多文档理解
    
- 条件判断
    
- 风险分析
    
- 逻辑推理
    
- 解释原因
    

---

### 2. 复杂 Agent Planning

Agent 场景里，模型可能需要决定：

- 下一步做什么
    
- 调用哪个工具
    
- 什么时候查询数据
    
- 什么时候让人确认
    
- 如何处理异常结果
    

这种情况下，如果任务复杂、风险高，frontier model 更合适。

---

### 3. LLM Judge / Evaluation

考试里也可能问：

> 用什么模型评估其他模型输出质量？

通常可以用更强的模型作为 **judge model**，也就是让 frontier / strong model 来评估：

- correctness
    
- groundedness
    
- relevance
    
- safety
    
- completeness
    

因为 judge 本身需要很强的理解和判断能力。

---

## 关键词：quality outweighs cost

这句话很重要。

**Outweighs** 的意思是：

> 比……更重要 / 权重大于……

所以：

> quality outweighs cost

意思是：

> 质量比成本更重要。

比如普通客服机器人，成本很重要，不一定用 frontier model。

但如果是医疗、法律、金融、生产事故排查，错误代价很高，这时：

> 多花钱用更强模型是合理的。

---

## 考试常见判断

看到这些关键词，要想到 **Frontier Models**：

- state-of-the-art
    
- high-stakes
    
- mission-critical
    
- quality outweighs cost
    
- highest accuracy required
    
- complex reasoning
    
- complex agent
    
- safety-critical
    
- legal / medical / financial
    
- judge model
    
- very ambiguous or sensitive task
    

---

## 和 Large Models 的区别

Large model 已经可以处理复杂任务。

Frontier model 更强调：

> **最强能力 + 高质量要求 + 高风险场景。**

|类型|适合|
|---|---|
|Large Model|复杂任务、模糊任务、多步骤推理|
|Frontier Model|高风险、高价值、质量必须优先的复杂任务|

举例：

|场景|更适合|
|---|---|
|普通多文档总结|Large|
|内部知识库复杂问答|Large|
|医疗/法律/金融高风险分析|Frontier|
|生产事故自动诊断建议|Frontier|
|作为 LLM judge 评估其他模型答案|Frontier|
|普通客服回复|Medium，不一定用 Frontier|

---

## 考试陷阱

### 陷阱 1：看到“最先进”就选它

不一定。

如果题目强调：

- low cost
    
- high volume
    
- simple extraction
    
- formatting
    
- low latency
    

那 frontier model 反而不是最佳选择。

---

### 陷阱 2：只靠 frontier model 解决知识问题

如果模型不知道公司内部知识，换成 frontier model 也不一定能解决。

比如：

> 问公司内部政策、合同、数据库字段定义。

更正确的是：

> 用 RAG，把内部文档作为 context 给模型。

也就是：

```text
知识缺口 → RAG
能力缺口 → 更强模型
质量要求极高 → Frontier + Evaluation
```

---

## 这页可以这样背

> **Frontier models = state-of-the-art models for high-stakes tasks where quality matters more than cost.**

中文记法：

> **前沿模型 = 当前最强模型，用在高风险、高价值、质量优先于成本的场景。**

考试口诀：

```text
简单抽取 → Small
普通客服 / 内容生成 → Medium
复杂推理 / 模糊任务 → Large
高风险 / 质量压倒成本 → Frontier
```


![[Pasted image 20260427220606.png]]


这页是前面几页的总结：**如何选择模型**。

核心意思是：

> 选模型不是直接选最强的，而是按优先级逐层判断：  
> **先看任务复杂度和质量要求，再看成本和延迟，最后看隐私和部署限制。**

---

## 这页内容翻译

标题：

> **Model Selection Considerations**  
> 模型选择时要考虑的因素

### Minimum level：最低要求 / 第一层考虑

- **Complexity of the task**  
    任务复杂度
    
- **Quality needs**  
    质量要求
    

### Second level：第二层考虑

- **Cost**  
    成本
    
- **Latency**  
    延迟 / 响应速度
    

### The “Deal Breaker”：一票否决因素

- **Privacy**  
    隐私
    
- **Deployment constraints**  
    部署限制
    

---

## 重点 1：Minimum level 是先判断“能不能完成任务”

这里的 **minimum level** 不是“最低级模型”，而是说：

> 首先要选一个至少能完成任务、达到质量要求的模型级别。

比如：

|任务|可能最低可用模型|
|---|---|
|抽取字段、格式转换|Small|
|普通客服问答、内容生成|Medium|
|复杂推理、多文档分析|Large|
|高风险、质量压倒成本|Frontier|

考试里经常考这个逻辑：

> 不要一上来选最强模型，而是选 **minimum capable model**。  
> 也就是“能满足质量要求的最小模型”。

---

## 重点 2：Complexity of the task 任务复杂度

任务越复杂，需要的模型越强。

### 简单任务

例如：

- 提取姓名、日期、金额
    
- 判断评论是 positive 还是 negative
    
- 把文本转换成 JSON
    
- 简单 Q&A
    

适合：

> **Small model**

---

### 中等任务

例如：

- 普通客服机器人
    
- HR 政策问答
    
- 总结一段文档
    
- 写邮件、写产品介绍
    

适合：

> **Medium model**

---

### 复杂任务

例如：

- 多文档比较
    
- 复杂业务规则判断
    
- 复杂 RAG
    
- agent 规划下一步
    
- 代码生成
    
- 模糊问题分析
    

适合：

> **Large model**

---

### 高风险任务

例如：

- 医疗、法律、金融
    
- 生产事故诊断
    
- 高层决策支持
    
- 关键系统自动化 agent
    

适合：

> **Frontier model**

---

## 重点 3：Quality needs 质量要求

同样的任务，如果质量要求不同，模型选择也不同。

比如都是客服：

|场景|模型选择|
|---|---|
|普通 FAQ，错了也可以人工纠正|Medium|
|VIP 客户投诉处理，错误会影响公司声誉|Large / Frontier|
|法律合规类回答，不能乱说|Frontier + RAG + Evaluation|

所以考试里看到：

- high accuracy required
    
- quality is more important than cost
    
- high-stakes
    
- mission critical
    

就要考虑更强模型。

---

## 重点 4：Cost 成本是第二层考虑

当几个模型都能满足质量要求时，再比较成本。

比如：

Small、Medium、Large 都能完成一个简单分类任务，那么应该优先选：

> **Small model**

因为它：

- 更便宜
    
- 更快
    
- 更适合大批量处理
    

考试里这句话很重要：

> **Choose the smallest model that meets the quality requirement.**

中文就是：

> 选择能满足质量要求的最小模型。

---

## 重点 5：Latency 延迟也是第二层考虑

**Latency** 就是响应速度。

比如用户问一句话，模型多久返回答案。

|场景|延迟要求|
|---|---|
|实时客服聊天|要低延迟|
|用户点击页面生成推荐|要低延迟|
|夜间批量总结 100 万条评论|可以慢一点|
|后台离线分析|延迟不太重要|

如果题目说：

- real-time
    
- interactive
    
- low latency
    
- high throughput
    

通常不要选太大的模型，除非质量必须如此。

---

## 重点 6：Deal Breaker 是“一票否决”

这页最重要的词是：

> **Deal Breaker**

意思是：

> 即使模型质量好、成本能接受，只要违反这个条件，就不能用。

这里有两个一票否决因素：

### 1. Privacy 隐私

如果数据很敏感，比如：

- 医疗数据
    
- 个人身份信息 PII
    
- 财务数据
    
- 公司机密
    
- 法律合同
    
- 内部商业数据
    

那你不能随便把数据发给外部模型。

考试里如果看到：

> Data cannot leave the company environment.

或者：

> Sensitive customer data must remain within Databricks governance boundary.

那模型选择要考虑：

- 是否可以用 Databricks-hosted model
    
- 是否需要私有部署
    
- 是否需要 Unity Catalog 权限控制
    
- 是否不能使用 external model
    

---

### 2. Deployment constraints 部署限制

Deployment constraints 就是部署上的限制，比如：

- 公司只能用某些 approved models
    
- 不能调用外部 API
    
- 必须部署在特定 cloud region
    
- 必须满足数据驻留要求
    
- 必须用 provisioned throughput
    
- 必须支持高并发
    
- 必须符合安全审计要求
    

比如：

> 公司政策禁止把数据发送到第三方 API。

那即使 frontier model 效果最好，也不能选外部 frontier model。

这就是 **deal breaker**。

---

## 考试答题顺序

看到模型选择题，可以按这个顺序判断：

```text
1. 任务复杂吗？
2. 质量要求高吗？
3. 有没有内部知识？如果有，是否需要 RAG？
4. 哪个最小模型能满足质量？
5. 在满足质量的模型里，哪个成本更低？
6. 延迟是否满足要求？
7. 是否有隐私、合规、部署限制？
```

---

## 这页可以这样背

> **First: task complexity and quality.  
> Second: cost and latency.  
> Deal breaker: privacy and deployment constraints.**

中文记法：

> **先看能不能做好，再看贵不贵、快不快，最后看能不能合规部署。**

考试口诀：

```text
简单任务 → Small
普通业务 → Medium
复杂推理 → Large
高风险质量优先 → Frontier

但最终还要检查：
成本、延迟、隐私、部署限制
```


![[Pasted image 20260427221334.png]]
这页讲的是 **Model Cost Comparison：模型成本对比**。

核心考点是：

> **同样的请求量、同样的 token 数量，换不同模型，成本可能差很多。**

---

## 这页在比较什么？

图里左边和右边的使用量几乎一样：

|项目|数值|
|---|---|
|Input tokens per request|3500|
|Output tokens per request|300|
|Queries per minute|12|
|Requests per month|518,400|
|Total tokens per month|1,969,920,000|

但是模型不同：

|左边|右边|
|---|---|
|gpt-5-global|gpt-5-nano-global|
|每月约 $3,823.18|每月约 $152.89|

差距大约是：

> **25 倍左右**

所以这页想表达：

> 模型越强，不一定越适合。成本会随着模型等级大幅上升。

---

## 这里的 Cost of Ownership 是什么意思？

**Cost of Ownership** 可以理解为：

> 使用这个模型的总体成本。

在 Databricks 里，模型成本可能和这些因素有关：

- 选择哪个模型
    
- 每次请求输入多少 token
    
- 每次请求输出多少 token
    
- 每分钟多少请求
    
- 每月请求量
    
- cloud region
    
- serving 方式
    
- DBU usage
    

---

## 什么是 input tokens / output tokens？

### Input tokens

就是你发给模型的内容，包括：

- 用户问题
    
- system prompt
    
- instruction
    
- retrieved chunks
    
- chat history
    
- metadata
    
- formatting examples
    

在 RAG 里，**retrieved chunks 会明显增加 input tokens**。

例如：

```text
用户问题：100 tokens
系统提示词：500 tokens
RAG retrieved chunks：3000 tokens
```

那么 input tokens 可能就是 3600 左右。

---

### Output tokens

就是模型生成的答案。

比如模型回答得越长，output tokens 越多。

```text
短答案 → output tokens 少
长报告 → output tokens 多
代码生成 → output tokens 可能很多
```

考试里要知道：

> **输入越长、输出越长，成本越高。**

---

## 这页最重要的考试点

### 1. 不要默认选最强模型

如果任务只是：

- 简单抽取
    
- 格式转换
    
- 简单分类
    
- 简单问答
    

用 expensive model 会浪费钱。

正确思路是：

> **Choose the smallest model that meets the quality requirement.**

中文：

> 选择能满足质量要求的最小模型。

---

### 2. RAG 会增加成本

RAG 不是免费的。

因为 RAG 会把 retrieved chunks 放进 prompt，导致 input tokens 增加。

比如：

```text
没有 RAG：
用户问题 100 tokens

有 RAG：
用户问题 100 tokens
+ retrieved chunks 3000 tokens
= 3100 input tokens
```

所以 RAG 成本优化也很重要：

- chunk 不要太大
    
- top-k 不要取太多
    
- retrieved context 要相关
    
- prompt 不要太长
    
- 不要把整份文档都塞进去
    

---

### 3. Output tokens 也会影响成本

如果你让模型每次生成很长答案：

```text
Please provide a detailed 2000-word explanation...
```

成本会比短答案高很多。

所以生产系统里通常会限制：

- max tokens
    
- answer length
    
- response format
    
- summarisation level
    

---

### 4. 请求量越大，模型选择越关键

如果只是每天 100 次调用，成本可能还好。

但如果是：

- 每分钟 12 次
    
- 每月 50 万次请求
    
- 每次几千 tokens
    

那模型选择会直接影响预算。

这就是这页图的重点：

> 同样的 traffic，用大模型和 nano/small model，月成本可能差几十倍。

---

## 考试里怎么判断？

如果题目说：

> 公司有大量请求，需要控制成本，同时任务比较简单。

答案通常是：

> 使用 small / nano model，而不是 large / frontier model。

如果题目说：

> 高风险场景，质量比成本更重要。

答案才可能是：

> 使用 frontier model，并配合 evaluation 和 governance。

---

## 结合前面几页的口诀

```text
简单任务 + 大量请求 + 成本敏感
→ Small / Nano model

普通业务支持 + 内容生成
→ Medium model

复杂推理 / 多文档分析
→ Large model

高风险 / 质量压倒成本
→ Frontier model
```

这页可以这样背：

> **模型成本 = 模型价格 × token 用量 × 请求量。  
> RAG 会增加 input tokens，长答案会增加 output tokens。  
> 所以生产中要用最小可用模型，并控制 prompt、chunk 和输出长度。**