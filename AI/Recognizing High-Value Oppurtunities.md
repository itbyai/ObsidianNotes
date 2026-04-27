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