**Fine-tune model** 中文可以叫：

> **微调模型**

意思是：

> 在一个已经训练好的基础模型上，用你自己的数据继续训练，让它更适合某个特定任务、格式、风格或业务场景。

---

## 一句话理解

普通模型像一个通用员工：

```text
会很多东西，但不一定懂你公司的工作方式。
```

Fine-tuning 就像给这个员工做专项培训：

```text
用你公司的示例、格式、风格、规则继续训练它，
让它以后更稳定地按你的方式输出。
```

---

## Fine-tuning 改的是什么？

Fine-tuning 会影响模型内部的行为，也就是模型参数 / 权重。

它不是每次回答时临时给资料，而是让模型通过训练学会一种模式。

例如你给它很多训练样本：

```text
Input:
Customer complaint: delivery delayed by 3 days.

Expected output:
{
  "category": "delivery_delay",
  "priority": "medium",
  "recommended_action": "apologize_and_check_tracking"
}
```

训练很多类似例子后，模型以后更容易稳定输出这种格式。

---

## Fine-tuning 适合什么？

Fine-tuning 适合这些情况：

|场景|为什么适合|
|---|---|
|固定输出格式|比如永远输出 JSON、分类标签、标准模板|
|特定写作风格|比如品牌语气、客服话术、法律风格|
|特定业务任务|比如投诉分类、意图识别、字段抽取|
|小模型能力增强|让 small/medium model 在特定任务上接近大模型效果|
|大量重复任务|训练后可降低推理成本|

---

## 举个例子

你想让模型把客户邮件分类。

原始邮件：

```text
My order arrived late and the box was damaged.
```

你希望输出：

```json
{
  "intent": "complaint",
  "issue_type": "delivery_damage",
  "priority": "high"
}
```

如果只靠 prompt，模型有时格式不稳定。  
如果用很多类似样本 fine-tune，模型会更稳定地学会：

```text
输入客户邮件 → 输出固定 JSON 分类结果
```

---

## Fine-tuning 不适合什么？

最重要：

> **Fine-tuning 不适合用来更新经常变化的知识。**

比如：

- 最新公司政策
    
- 最新价格
    
- 最新法律法规
    
- 最新产品库存
    
- 最新项目文档
    
- 最新 Databricks 功能
    

这些更适合用 **RAG / Grounding**。

因为如果知识经常变，你不可能每次改文档都重新 fine-tune 模型。

---

## Fine-tuning vs RAG

这个考试非常容易考。

|对比|Fine-tuning|RAG / Grounding|
|---|---|---|
|作用|改变模型行为和输出模式|给模型提供外部知识|
|适合|风格、格式、分类、固定任务|企业文档、最新知识、内部政策|
|数据变化|适合稳定数据|适合经常变化的数据|
|是否改模型参数|是|通常不是|
|更新成本|较高，需要重新训练|较低，更新知识库即可|
|例子|学会固定 JSON 输出|查询公司最新 HR policy|

一句话：

> **知识缺口 → RAG**  
> **行为/格式/风格问题 → Fine-tuning**

---

## Fine-tuning vs Prompting

|对比|Prompting|Fine-tuning|
|---|---|---|
|做法|每次在 prompt 里说明要求|用训练数据让模型学会要求|
|成本|简单、便宜、快|需要训练数据和训练过程|
|稳定性|有时不稳定|通常更稳定|
|适合|先做 POC、简单任务|生产级固定任务、大量重复任务|

通常顺序是：

```text
先 prompt engineering
↓
不够稳定，再考虑 fine-tuning
↓
如果缺知识，用 RAG
```

---

## Databricks 考试里怎么判断？

如果题目说：

> 模型不知道公司内部政策

答案通常不是 fine-tuning，而是：

```text
Use RAG / grounding with enterprise documents.
```

如果题目说：

> 模型输出格式不稳定，想让它长期按照特定结构输出

可以考虑：

```text
Fine-tune the model with examples.
```

如果题目说：

> 想让模型用公司品牌语气写客服回复

可以考虑：

```text
Fine-tuning or prompt templates.
```

---

## 这页核心背诵

> **Fine-tuning means continuing to train a pre-trained model on task-specific examples so it learns a desired behavior, style, or output format.**

中文记法：

> **Fine-tuning = 用自己的样本继续训练基础模型，让它更稳定地完成特定任务。**

考试口诀：

```text
不知道公司知识 → RAG

格式/风格/分类不稳定 → Fine-tuning

先试 prompt
再试 RAG 或 fine-tuning
最后用 evaluation 证明效果
```


