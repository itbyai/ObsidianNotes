![[Pasted image 20260427221618.png]]
这页讲的是 **High-Value GenAI Opportunities：高价值 GenAI 应用机会**，这一页聚焦在：

> **Content Generation 内容生成**

并且底部写了：

> **Non-Agentic Applications 非 Agent 型应用**

这是考试里很重要的分类点。

---

## 这页内容翻译

### High-Value GenAI Opportunities

高价值的生成式 AI 应用机会

### Content Generation

内容生成

这页给了三个例子：

|英文|中文|说明|
|---|---|---|
|**Drafting Short Form Copy**|起草短文本内容|根据 brief 生成博客、营销邮件、短文案|
|**Language Localization**|语言本地化|把技术手册翻译成另一种语言，同时保持语气和风格|
|**Product Descriptions**|产品描述生成|根据技术规格生成结构化电商产品描述|

---

## 重点 1：这类属于 Non-Agentic Application

**Non-Agentic Application** 可以理解为：

> 非智能体应用，不需要模型自己规划任务、调用工具、决定下一步。

也就是说，用户给一个明确输入，模型直接生成一个明确输出。

例如：

```text
输入：产品技术参数
输出：产品描述
```

或者：

```text
输入：营销 brief
输出：一封 marketing email
```

模型不需要自己去查系统、调 API、分解复杂任务，也不需要多步执行。

---

## Agentic 和 Non-Agentic 的区别

|类型|特点|例子|
|---|---|---|
|**Non-Agentic**|单步生成，输入明确，输出明确|写邮件、翻译、总结、生成产品描述|
|**Agentic**|多步骤推理，可能调用工具，决定下一步|自动查库存、生成报价、发邮件、更新 CRM|

举个对比：

### Non-Agentic

你说：

> 根据下面的产品参数写一个产品描述。

模型直接写。

### Agentic

你说：

> 帮我分析哪些产品库存低，联系供应商确认交期，并更新采购计划。

这个就复杂了，因为 agent 需要：

1. 查询库存数据
    
2. 判断哪些产品有风险
    
3. 调用供应商系统或邮件工具
    
4. 总结结果
    
5. 可能更新系统
    

这就是 agentic。

---

## 重点 2：Content Generation 通常不需要很强的 Agent

内容生成类任务通常是：

- 输入内容已经给定
    
- 任务目标清楚
    
- 输出格式相对稳定
    
- 不需要外部工具调用
    
- 不需要复杂 planning
    

所以很多时候用 **medium model** 就够了。

不一定要用 frontier model。

---

## 重点 3：这类任务适合 Medium Model

结合前面模型选择：

|任务|推荐模型|
|---|---|
|简单格式转换|Small|
|普通营销邮件生成|Medium|
|产品描述生成|Medium|
|技术文档翻译 + 保持语气|Medium / Large|
|高风险法律文案生成|Large / Frontier|

所以这页最典型的考点是：

> **Content generation is usually a non-agentic GenAI use case and often works well with medium models, depending on quality requirements.**

中文就是：

> 内容生成通常是非 Agent 型 GenAI 应用，很多情况下用中等模型就可以，除非质量要求特别高或任务特别复杂。

---

## 三个例子分别怎么理解

### 1. Drafting Short Form Copy

意思是：根据 brief 写短内容。

比如输入：

```text
目标：推广一个新的跑步鞋
语气：年轻、积极
渠道：Email
长度：150 words
```

输出：

```text
一封营销邮件 / 短博客 / 广告文案
```

这个是典型内容生成。

---

### 2. Language Localization

不是简单 translation。

**Localization 本地化** 比 translation 更进一步。

Translation 是：

> 把英文翻译成中文。

Localization 是：

> 翻译的同时适应当地文化、语气、表达方式、单位、格式和业务习惯。

比如：

- 美国英文 → 澳洲英文
    
- inches → cm
    
- dollars → AUD
    
- holiday → public holiday
    
- 保持品牌语气
    
- 技术术语统一
    

所以考试里看到 **localization**，不要只理解成“翻译”，它还包括文化和语境适配。

---

### 3. Product Descriptions

意思是根据技术参数生成电商描述。

输入可能是：

```text
Screen size: 34 inch
Resolution: 3440 x 1440
Refresh rate: 100Hz
USB-C: 96W
Panel: IPS
```

输出可能是：

```text
This 34-inch WQHD IPS monitor is designed for productivity, offering wide-screen multitasking, smooth 100Hz performance, and USB-C power delivery...
```

这是非常典型的 GenAI 商业场景。

---

## 考试可能怎么问？

### 题型 1

> A company wants to generate product descriptions from structured technical specifications. What type of GenAI use case is this?

答案：

> **Content generation / Non-agentic application**

---

### 题型 2

> A marketing team wants to generate short emails based on a campaign brief. Which model type is likely appropriate?

答案倾向：

> **Medium model**，因为它平衡质量和成本，适合内容生成。

---

### 题型 3

> Does this require an agent?

答案：

> 通常不需要。因为它是明确输入到明确输出，不需要工具调用和多步骤规划。

---

## 这页可以这样背

> **Content generation = Non-agentic, usually single-step, input-to-output generation.**

中文记法：

> **内容生成 = 非 Agent 应用，通常是给定输入，生成文本输出。**

考试口诀：

```text
写文案、翻译本地化、产品描述
→ Content Generation
→ Non-Agentic
→ 通常 Medium Model 就够
```


![[Pasted image 20260427221741.png]]

这页和上一页是对比关系：

上一页是 **Content Generation - Non-Agentic Applications**  
这一页是 **Content Generation - Agentic Applications**

核心区别是：

> 这页的内容生成，不只是“给我一个输入，我生成一段文字”，而是模型需要**自己规划步骤、查询信息、调用工具、交叉验证、再生成结果**。  
> 所以它属于 **Agentic Applications 智能体应用**。

---

## 这页内容翻译

标题：

> **High-Value GenAI Opportunities**  
> 高价值 GenAI 机会

分类：

> **Content Generation**  
> 内容生成

但底部写的是：

> **Agentic Applications**  
> 智能体型应用

这页有三个例子：

|应用|中文|说明|
|---|---|---|
|**Hyper-Personalized Outreach**|高度个性化外联邮件|根据某个人的职业经历，生成定制化三封邮件序列|
|**Autonomous Competitor Research**|自动化竞争对手研究|搜索网页、分析竞品发布、综合社交舆情、生成 sales battlecard|
|**Compliance-Aware Content Review**|合规感知内容审查|批量审查营销材料，对照法律数据库，生成修改建议|

---

## 重点 1：为什么这页是 Agentic？

因为它们不是简单生成文本，而是有明显的 **多步骤任务链**。

比如 **Autonomous Competitor Research**：

```text
1. 搜索竞品产品发布信息
2. 搜索社交媒体或市场反馈
3. 整理竞品优势和劣势
4. 总结客户情绪
5. 生成 sales battlecard
```

这里模型不只是“写一篇文章”，而是要：

- decide what to search
    
- call tools
    
- gather evidence
    
- synthesize information
    
- produce final content
    

这就是 agentic。

---

## 重点 2：Agentic Application 的典型特征

考试里看到这些关键词，就要想到 **Agentic Application**：

|关键词|含义|
|---|---|
|autonomous|自动执行|
|multi-step|多步骤|
|tool use|调用工具|
|search the web|搜索网页|
|cross-reference|交叉比对|
|synthesize|综合分析|
|draft revisions|起草修改建议|
|plan and execute|规划并执行|
|interact with systems|和外部系统交互|

一句话：

> **如果模型需要自己决定下一步、调用工具、处理多个信息源，这就是 agentic。**

---

## 例子 1：Hyper-Personalized Outreach

这不是普通邮件生成。

普通邮件生成是：

```text
根据这个 brief 写一封邮件
```

这是 non-agentic。

但这页的例子是：

```text
根据某个人的 career history，生成三段式个性化 email sequence
```

它可能需要：

- 读取候选人的履历
    
- 找出职业亮点
    
- 判断对方可能感兴趣的内容
    
- 设计三封邮件的顺序
    
- 每封邮件语气和重点不同
    

所以它更像一个销售/招聘外联 agent。

---

## 例子 2：Autonomous Competitor Research

这个最典型是 Agentic。

因为它明确写了：

> **Searches the web**  
> 搜索网页

> **Synthesizes social sentiment**  
> 综合社交舆情

> **Drafts a sales battlecard**  
> 起草销售战卡

这说明模型要调用外部工具或检索系统，不是只靠自己生成。

**Sales battlecard** 是销售团队用来对比竞争对手的材料，通常包括：

- 竞争对手产品特点
    
- 我们的优势
    
- 对方的弱点
    
- 客户常见异议
    
- 销售应答话术
    
- 定价或市场定位对比
    

考试如果问这个场景需要什么，答案通常会偏向：

> Agent + tools + retrieval/search + evaluation + governance

---

## 例子 3：Compliance-Aware Content Review

这个也很典型。

它不是简单让模型“改一下文案”，而是：

```text
1. 审查一批 marketing assets
2. 对照 legal database
3. 找出不合规内容
4. 生成修改建议
5. 给 creative team 使用
```

这里有两个重点：

### 第一，它需要外部知识源

比如法律数据库、合规政策、公司内部规则。

所以可能需要：

> RAG / Vector Search / governed data source

### 第二，它是 high-stakes 场景

因为合规审查出错可能带来法律风险。

所以模型选择可能不是 small/medium，而更可能是：

> Large / Frontier model + strict evaluation + human review

---

## 这页和上一页的关键区别

|对比点|Non-Agentic Content Generation|Agentic Content Generation|
|---|---|---|
|输入|用户直接给材料|可能需要自己查资料|
|步骤|单步|多步骤|
|工具调用|通常不需要|经常需要|
|规划能力|不重要|很重要|
|例子|写邮件、翻译、产品描述|竞品研究、合规审查、个性化营销序列|
|模型选择|Medium 常常够用|Large / Frontier 更常见|
|风险|较低|更高，需要监控和评估|

---

## Databricks 考试怎么考？

### 题型 1：判断是不是 Agentic

如果题目说：

> A system searches the web, gathers competitor information, summarizes customer sentiment, and drafts a sales battlecard.

答案：

> **Agentic application**

因为它有搜索、综合、多步骤、生成最终内容。

---

### 题型 2：选择模型

如果只是：

> Generate a product description from provided specifications.

可能是：

> Medium model，non-agentic content generation。

但如果是：

> Search competitor websites, analyze sentiment, compare positioning, and generate a sales battlecard.

更可能是：

> Large model / Frontier model，agentic application。

---

### 题型 3：选择架构

这种 agentic content generation 通常需要：

```text
LLM
+ tools
+ retrieval/search
+ external/internal data sources
+ evaluation
+ governance
+ human-in-the-loop when high risk
```

在 Databricks 语境下，可能关联：

- Model Serving
    
- Vector Search
    
- Unity Catalog governance
    
- MLflow / Agent Evaluation
    
- Mosaic AI Agent Framework
    
- tool calling
    
- governed data access
    

---

## 这页可以这样背

> **Agentic content generation = 内容生成 + 自主执行 + 多步骤 + 工具调用。**

中文记法：

> 如果只是写内容，是 non-agentic。  
> 如果要自己查资料、分析、判断、调用工具、再写内容，就是 agentic。

考试口诀：

```text
写邮件 / 翻译 / 产品描述
→ Non-Agentic Content Generation

搜索竞品 / 分析舆情 / 合规审查 / 生成修改建议
→ Agentic Content Generation
```


![[Pasted image 20260427221917.png]]
这页是在讲：**同一个 GenAI 应用方向，比如 Summarization / Content Generation，可以有简单版，也可以有 Agent 版。**

核心考点是：

> **判断一个任务到底是 simple LLM task，还是 agent-ready workflow。**

---

## 这页内容翻译

标题：

> **Example High-Value GenAI Opportunities**  
> 高价值 GenAI 应用机会示例

### 1. Task category

任务类别：

> **Summarization**  
> 总结 / 摘要

也就是说，这一类任务本质上属于“把信息读完后总结出来”。

---

### 2. Simple LLM task

简单 LLM 任务：

> **Drafting a single blog post based on a provided brief.**  
> 根据一个已经提供好的 brief，起草一篇博客文章。

这个任务很简单，因为：

- 用户已经提供了内容方向
    
- 不需要搜索外部资料
    
- 不需要调用工具
    
- 不需要多步骤规划
    
- 模型直接根据输入生成输出
    

所以它是 **non-agentic**，普通 LLM 就可以做。

---

### 3. Agent-ready workflow

适合 Agent 的工作流：

> **Researching a topic across 10 websites, synthesizing findings, and drafting a multi-part whitepaper.**  
> 跨 10 个网站研究一个主题，综合发现，然后起草一份多部分的白皮书。

这个就明显更复杂，因为它需要：

1. 决定要搜索哪些网站
    
2. 阅读多个信息源
    
3. 提取重点
    
4. 比较不同来源
    
5. 综合结论
    
6. 组织成多部分 whitepaper
    
7. 可能还要引用来源、检查冲突信息
    

所以这个是 **agent-ready workflow**。

---

## Simple LLM Task vs Agent-ready Workflow

|对比|Simple LLM Task|Agent-ready Workflow|
|---|---|---|
|任务步骤|单步|多步骤|
|输入材料|已经给好了|需要自己去找|
|工具调用|通常不需要|可能需要搜索、检索、数据库、API|
|推理复杂度|低到中等|中到高|
|例子|根据 brief 写一篇博客|调研 10 个网站后写白皮书|
|模型选择|Medium 常常够用|Large / Frontier 更合适|
|应用类型|Non-agentic|Agentic / Agent-ready|

---

## 什么叫 Agent-ready？

**Agent-ready** 不是说它一定已经是 agent，而是说：

> 这个任务很适合被设计成 agent 工作流。

因为它可以拆成多个步骤，并且每一步都可以由模型或工具完成。

比如这个 whitepaper 任务可以拆成：

```text
Step 1: Search websites
Step 2: Extract useful information
Step 3: Compare and synthesize findings
Step 4: Draft outline
Step 5: Write each section
Step 6: Review and refine
```

这就是 agent 的典型模式：

> **plan → use tools → gather information → reason → generate output**

---

## 考试重点 1：看是否需要外部信息

如果题目说：

> based on a provided brief

一般是 simple LLM task。

如果题目说：

> research across websites / query databases / search documents / cross-reference sources

一般就是 agent-ready 或 RAG/agentic workflow。

---

## 考试重点 2：看是否多步骤

单步：

```text
输入 brief → 输出 blog post
```

多步骤：

```text
搜索 → 阅读 → 总结 → 综合 → 写 whitepaper → 审查
```

多步骤通常更偏 agent。

---

## 考试重点 3：模型选择不同

### 简单博客生成

可能用：

> **Medium model**

因为它属于普通内容生成，质量和成本平衡即可。

### 多网站调研 + 白皮书

可能用：

> **Large model / Frontier model**

因为它需要复杂理解、综合分析、多步骤规划。

如果是高风险行业，比如法律、医疗、金融，还需要：

> **RAG / tools + evaluation + governance + human review**

---

## 这页可以这样背

> **Same category, different complexity.**

中文就是：

> 同样是“总结/内容生成”，简单任务可以直接 LLM 完成；复杂任务需要 agent workflow。

考试口诀：

```text
provided brief → single output
= Simple LLM task

research multiple sources → synthesize → multi-part output
= Agent-ready workflow
```