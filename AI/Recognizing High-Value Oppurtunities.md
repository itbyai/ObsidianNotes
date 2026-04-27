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

![[Pasted image 20260427222759.png]]

这页继续讲 **High-Value GenAI Opportunities**，重点是区分：

> **简单 LLM 任务** vs **适合 Agent 的工作流**

虽然 slide 上的 **Task category** 写的是 **Content generation**，但里面的例子其实更偏 **summarization / content generation combined**，也就是“读材料 → 总结 → 生成结构化内容”。

---

## 这页内容翻译

### Task category

任务类别：

> **Content generation**  
> 内容生成

---

### Simple LLM task

简单 LLM 任务：

> **Condensing a single 20-page PDF or a specific meeting transcript into five bullet points**  
> 把一份 20 页 PDF，或者一份指定的会议记录，总结成 5 个 bullet points。

这个是简单任务，因为：

- 输入文件是明确的
    
- 只处理一个 PDF 或一个 transcript
    
- 输出格式明确：5 个 bullet points
    
- 不需要自己找资料
    
- 不需要跨系统搜索
    
- 不需要判断多个团队的历史进展
    

所以这是 **non-agentic / simple LLM task**。

---

### Agent-ready workflow

适合 Agent 的工作流：

> **Scanning a shared drive for all documents related to "Project X", summarizing the evolution of the project over six months, and highlighting unresolved action items across different teams.**

中文意思是：

> 扫描共享盘里所有和 “Project X” 相关的文档，总结这个项目过去 6 个月的发展过程，并找出不同团队之间还没有解决的 action items。

这个任务明显更复杂。

---

## 为什么第二个是 Agent-ready？

因为它不是“给你一个文件，让你总结”。

它需要 agent 自己完成多个步骤：

```text
1. 去 shared drive 里搜索 Project X 相关文件
2. 判断哪些文件真的相关
3. 按时间顺序理解项目变化
4. 总结 6 个月内项目如何演进
5. 找出不同团队的 action items
6. 判断哪些 action items 已经完成，哪些 unresolved
7. 生成最终总结
```

这里面有：

- search / retrieval
    
- multi-document reasoning
    
- timeline synthesis
    
- cross-team comparison
    
- unresolved item detection
    
- structured output generation
    

所以这是典型的 **agent-ready workflow**。

---

## 考试重点 1：单个文件总结 = simple LLM task

如果题目说：

> Summarize this single PDF into five bullets.

或者：

> Summarize this meeting transcript.

通常不需要 agent。  
一个普通 LLM / medium model 就可能够了。

因为它是：

```text
Single input → single summary output
```

---

## 考试重点 2：扫描 shared drive = agentic / agent-ready

如果题目说：

> Scan a shared drive  
> Search across documents  
> Find all documents related to Project X  
> Summarize project evolution over time  
> Identify unresolved action items across teams

这些关键词都说明它不是简单总结，而是一个多步骤工作流。

它需要：

```text
LLM + retrieval/search tool + document access + reasoning + summarization
```

在 Databricks 语境下，很可能关联：

- Vector Search
    
- RAG
    
- Unity Catalog 权限控制
    
- Model Serving
    
- Agent Framework
    
- evaluation
    
- governance
    

---

## Simple vs Agent-ready 对比

|对比点|Simple LLM Task|Agent-ready Workflow|
|---|---|---|
|数据来源|一个指定 PDF / transcript|shared drive 里很多文件|
|是否需要搜索|不需要|需要|
|是否多文档|通常不是|是|
|是否跨时间线|不需要|需要总结 6 个月演进|
|是否跨团队|不需要|需要|
|是否判断 unresolved items|不需要|需要|
|应用类型|Non-agentic|Agentic / Agent-ready|
|模型选择|Medium 常常够|Large / Frontier 更可能|

---

## 这页最容易考的点

考试可能会问：

> A user wants to summarize a single meeting transcript into five bullet points. What type of task is this?

答案：

> **Simple LLM task / non-agentic summarization**

---

也可能问：

> A user wants an AI system to scan a shared drive, find all Project X documents, summarize six months of progress, and identify unresolved action items. What type of application is this?

答案：

> **Agent-ready workflow / agentic application**

因为它需要搜索、筛选、多文档总结、跨团队 action item 分析。

---

## 这页一句话背诵

> **一个文件总结 = simple LLM task；  
> 多文件搜索 + 时间线总结 + unresolved action items = agent-ready workflow。**

考试口诀：

```text
single PDF / transcript → simple summarization

shared drive + all related docs + six-month evolution + unresolved action items
→ agent-ready workflow
```


![[Pasted image 20260427223113.png]]



这页讲的是另一个高价值 GenAI 场景：

> **Unstructured Extraction 非结构化信息抽取**

核心考点是：

> **从文本、PDF、合同、发票、邮件等非结构化内容里抽取信息。**  
> 但要区分：简单抽取是 simple LLM task；复杂批量抽取 + 判断 + 标记页面，就变成 agent-ready workflow。

---

## 这页内容翻译

### Task category

任务类别：

> **Unstructured extraction**  
> 非结构化抽取

意思是从没有固定表格结构的内容里抽取关键信息。

比如：

- PDF
    
- invoice 发票
    
- legal contract 合同
    
- email
    
- meeting transcript
    
- scanned document
    
- policy document
    
- customer complaint
    

---

## Simple LLM task

简单 LLM 任务：

> **Pulling a specific name, date, and total amount from a clearly formatted invoice**

中文意思是：

> 从一张格式清晰的发票里，抽取指定的姓名、日期和总金额。

这个很简单，因为：

- 只有一个文件
    
- 格式清楚
    
- 要抽取的字段明确
    
- 不需要复杂判断
    
- 不需要跨多个文档比较
    
- 不需要调用很多工具
    

比如输入是一张 invoice：

```text
Customer Name: John Smith
Invoice Date: 2026-04-20
Total Amount: $1,250.00
```

输出：

```json
{
  "name": "John Smith",
  "date": "2026-04-20",
  "total_amount": "$1,250.00"
}
```

这种通常 **small model** 就可能够了，因为它是 extraction task。

---

## Agent-ready workflow

适合 Agent 的工作流：

> **Extracting all liability clauses from a batch of 50 legal contracts, identifying which ones deviate from the corporate standard, and flagging those specific pages for legal review**

中文意思是：

> 从 50 份法律合同中抽取所有 liability clauses 责任条款，判断哪些条款偏离公司标准，并标记出具体页面，交给法律团队审查。

这个就复杂很多。

它不是简单抽字段，而是要做：

```text
1. 读取 50 份合同
2. 找出每份合同里的 liability clauses
3. 和公司标准条款进行比较
4. 判断哪些条款有偏离
5. 找到偏离条款所在的具体页面
6. 生成法律审查清单
```

所以这是 **agent-ready workflow**。

---

## 为什么第二个是 Agent-ready？

因为它有几个明显特征：

|特征|说明|
|---|---|
|多文档|50 份合同|
|专业领域|法律合同|
|需要判断|是否 deviates from corporate standard|
|需要比较|合同条款 vs 公司标准|
|需要定位证据|flag specific pages|
|高风险|需要 legal review|
|可能需要工具|文档搜索、OCR、RAG、页码定位、标准库查询|

这就不只是 LLM 生成答案，而是一个完整工作流。

---

## 考试重点 1：Unstructured extraction 是什么

**Unstructured extraction** 的重点是：

> 从非结构化文本中抽取结构化字段。

比如：

|非结构化输入|结构化输出|
|---|---|
|发票 PDF|name, date, amount|
|合同|clauses, obligations, dates|
|邮件|sender, intent, due date|
|简历|name, skills, experience|
|医疗记录|diagnosis, medication, date|

考试里如果看到：

> extract fields from documents  
> pull information from PDFs  
> extract clauses from contracts  
> convert unstructured text into structured data

就要想到 **unstructured extraction**。

---

## 考试重点 2：简单抽取 vs 复杂抽取

### 简单抽取

比如：

> 从一张发票里抽取 name、date、total amount。

特点：

```text
single document
clear format
specific fields
low risk
```

模型选择：

> **Small model / Medium model**

---

### 复杂抽取

比如：

> 从 50 份合同中抽取责任条款，比较公司标准，标记异常页面。

特点：

```text
multiple documents
domain-specific
requires comparison
requires judgment
requires evidence
high-stakes
```

模型选择：

> **Large / Frontier model 更可能合适**

架构上可能需要：

```text
LLM + RAG + Vector Search + document parser + evaluation + human review
```

---

## 考试重点 3：法律合同属于 high-stakes

这页里的 **legal contracts** 很关键。

法律场景通常属于 high-stakes，因为错误可能导致：

- 合同风险
    
- 合规风险
    
- 财务损失
    
- 法律责任
    

所以这种场景不应该完全自动化放行，通常需要：

> **human-in-the-loop**

也就是 AI 先帮忙找出风险和页面，但最后由法律人员确认。

---

## Simple vs Agent-ready 对比

|对比点|Simple LLM Task|Agent-ready Workflow|
|---|---|---|
|例子|从一张发票抽取姓名、日期、金额|从 50 份合同抽取责任条款并比较标准|
|文件数量|单个文件|多个文件|
|格式|清晰格式|复杂合同文本|
|是否需要判断|基本不需要|需要判断偏离标准|
|是否需要外部标准|不需要|需要 corporate standard|
|风险|低|高|
|模型|Small / Medium|Large / Frontier|
|是否需要人工复核|不一定|通常需要|

---

## 这页一句话背诵

> **单张发票抽字段 = simple extraction；  
> 多份合同抽条款 + 对比标准 + 标记风险页面 = agent-ready workflow。**

考试口诀：

```text
single clear invoice → simple LLM extraction

50 legal contracts + compare against corporate standard + flag pages
→ agent-ready workflow / high-stakes extraction
```


![[Pasted image 20260427223815.png]]

这页是 **GenAI Tool Selection Decision Tree：选择 GenAI 工具/方案的决策树**。

核心不是背具体工具，而是学会判断：

> 这个任务到底适不适合用 GenAI？  
> 如果适合，是用普通 LLM、RAG、Agent，还是传统规则/SQL/ML 更合适？

---

## 这页 5 个问题逐个解释

### 1. Can output quality be measured clearly?

中文：

> 输出质量能不能被清楚衡量？

这是第一步。

如果你做一个 GenAI 应用，必须能判断它好不好。比如：

|任务|能否衡量|
|---|---|
|从发票抽取金额|可以，对比真实金额|
|总结会议纪要|可以，用人工评分或 LLM judge|
|回答政策问题|可以，看是否 grounded、correct|
|写一篇“更有创意”的文章|比较难衡量，但可以用人工标准|

考试重点：

> 如果质量无法衡量，就很难上线生产。  
> GenAI 项目需要 evaluation。

常见 evaluation 指标包括：

- correctness：答案是否正确
    
- groundedness：是否基于资料回答
    
- relevance：是否回答了问题
    
- completeness：是否完整
    
- safety：是否安全
    
- latency：响应速度
    
- cost：成本
    

---

### 2. Does the task require deterministic accuracy?

中文：

> 这个任务是否要求确定性准确？

**Deterministic accuracy** 的意思是：

> 每次都必须得到完全确定、完全准确的结果。

比如：

|任务|是否需要 deterministic accuracy|
|---|---|
|计算 GST 金额|是|
|判断订单是否超过信用额度|是|
|数据库 join / count / sum|是|
|发票金额字段抽取|比较需要|
|写营销文案|不需要|
|总结客户反馈|不完全需要|

考试重点：

> 如果任务需要 100% 精确、可重复、可验证，通常优先用 SQL、规则、传统代码，而不是让 LLM 自由生成。

例如：

```text
计算 total_sales = quantity * price
```

这个不应该让 LLM 来“猜”，应该用 SQL / Python / business rule。

但 LLM 可以用来：

```text
解释为什么 total_sales 下降
总结销售异常原因
把结果写成业务报告
```

所以：

> 计算用传统工具，解释和生成用 GenAI。

---

### 3. Does the task involve language understanding or generation?

中文：

> 这个任务是否涉及语言理解或语言生成？

这是判断是否适合 GenAI 的关键。

如果任务包括：

- 读文档
    
- 理解自然语言问题
    
- 总结内容
    
- 写邮件
    
- 翻译
    
- 改写
    
- 抽取文本信息
    
- 生成解释
    
- 和用户对话
    

那就很适合 LLM。

例如：

|任务|适合工具|
|---|---|
|写客户邮件|LLM|
|总结会议记录|LLM|
|从合同里找责任条款|LLM / RAG|
|查询数据库销售额|SQL|
|根据销售额写分析说明|LLM|

考试判断：

> 涉及自然语言理解或生成 → LLM 有价值。  
> 纯数字计算、纯规则判断 → 不一定需要 LLM。

---

### 4. Does the task require synthesis or open-ended output?

中文：

> 这个任务是否需要综合分析，或者开放式输出？

**Synthesis** 是“综合、归纳、整合”。

比如：

```text
阅读 10 篇文章，综合出市场趋势。
```

这不是简单抽取，而是要：

- 阅读多个来源
    
- 找共同点
    
- 比较差异
    
- 组织观点
    
- 生成结论
    

**Open-ended output** 是开放式输出，比如：

- 写一篇报告
    
- 生成建议
    
- 起草白皮书
    
- 总结项目演进
    
- 给出风险分析
    

考试重点：

> 如果任务需要综合多个信息源并生成开放式内容，GenAI 很适合。  
> 如果还需要搜索、调用工具、多步骤执行，那可能需要 Agent。

比如：

|场景|类型|
|---|---|
|根据一个 brief 写博客|Simple LLM task|
|搜索 10 个网站后写白皮书|Agent-ready workflow|
|总结一个 PDF|Simple LLM task|
|扫描 shared drive 找项目资料并总结 6 个月变化|Agentic workflow|

---

### 5. Does the task depend on proprietary enterprise knowledge?

中文：

> 这个任务是否依赖企业内部专有知识？

**Proprietary enterprise knowledge** 指公司内部知识，比如：

- 内部政策
    
- 产品文档
    
- 合同模板
    
- SOP
    
- 数据字典
    
- 客户资料
    
- 项目文档
    
- 会议纪要
    
- 业务规则
    
- Databricks 表结构和字段定义
    

如果任务依赖这些内部知识，单靠基础模型不够。

这时通常需要：

> **RAG / Vector Search / governed data access**

也就是：

```text
企业文档
→ chunk
→ embedding
→ vector index
→ retrieve relevant chunks
→ LLM answer
```

考试重点：

> 问内部知识，不是直接换更大模型，而是用 RAG。

比如：

> “我们公司 PADP Phase 2b Power BI validation 要测什么？”

模型本身不知道你们内部文档，所以需要 RAG 找相关文档，再回答。

---

## 这页背后的决策逻辑

可以这样理解：

```text
1. 质量能不能衡量？
   不能 → 不适合直接上线，需要先定义 evaluation

2. 是否要求确定性准确？
   是 → 优先 SQL / rules / code / traditional ML
   否 → 可以考虑 LLM

3. 是否涉及语言理解或生成？
   是 → LLM 有价值

4. 是否需要综合分析或开放式输出？
   是 → LLM / Agent 更有价值

5. 是否依赖企业内部知识？
   是 → RAG / Vector Search / governed data source
```

---

## 和 Databricks 工具怎么对应？

|判断结果|可能选择的 Databricks 方案|
|---|---|
|简单文本生成|Foundation Model / Model Serving|
|批量抽取、总结|AI Functions / batch inference|
|内部文档问答|Vector Search + RAG|
|复杂多步骤任务|Agent Framework / tool calling|
|需要质量验证|MLflow Evaluation / Agent Evaluation|
|需要权限治理|Unity Catalog|
|需要生产部署|Model Serving / provisioned throughput|

---

## 考试最常见陷阱

### 陷阱 1：所有任务都用 LLM

错。

如果是确定性计算，比如：

```sql
select sum(revenue) from sales
```

应该用 SQL，不是 LLM。

---

### 陷阱 2：内部知识问答直接用更大模型

错。

如果模型缺少企业内部知识，应优先考虑：

> RAG，而不是单纯换 frontier model。

---

### 陷阱 3：Agent 用在简单任务上

错。

如果只是：

```text
把这个 PDF 总结成 5 点
```

普通 LLM 就够了，不需要 Agent。

---

### 陷阱 4：没有 evaluation 就上线

错。

GenAI 应用需要能衡量质量，否则无法判断是否满足业务要求。

---

## 这页一句话背诵

> **先判断任务是否可评估；如果需要确定性准确，用传统工具；如果涉及语言理解/生成，用 LLM；如果需要内部知识，用 RAG；如果需要多步骤搜索、判断、执行，用 Agent。**

考试口诀：

```text
确定性计算 → SQL / Rules / Code

语言理解和生成 → LLM

企业内部知识 → RAG

多步骤 + 工具调用 + 自主执行 → Agent

质量验证 → Evaluation
```