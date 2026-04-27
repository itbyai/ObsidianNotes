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