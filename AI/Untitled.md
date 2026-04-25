![[Pasted image 20260426092311.png]]

这张图是**最接近“面试决策题 / 系统设计题”的一页**，核心不是讲概念，而是：

> 👉 **什么时候用 Agent？什么时候不要用？**

如果你能把这张图讲清楚，基本已经是**AI Engineer / Solution Architect 水平**了。

---

# 一、这张图的核心结论（先给你答案）

> ❗不是所有问题都要用 Agent  
> 👉 **大多数场景：Non-agentic 更好**

---

# 二、逐行拆解（带面试表达）

---

## 🟢 1️⃣ Core Philosophy（核心理念）

|Non-agentic|Agentic|
|---|---|
|线性（linear）|非线性（non-linear）|
|人控制|AI自主|
|可预测|不可预测|

---

### 🔥 面试说法：

> Non-agentic systems follow predefined workflows, while agentic systems dynamically decide actions based on goals.

---

---

## 🟡 2️⃣ Best For（最关键考点🔥）

---

### ✅ Non-agentic适合：

> “If-This-Then-That”

👉 也就是你现在做的：

- 数据校验规则
    
- schema validation
    
- dbt tests
    
- pipeline
    

---

👉 特点：

```text
规则清晰
流程固定
结果可预测
```

---

---

### ✅ Agentic适合：

> Open-ended tasks（开放问题）

👉 特点：

```text
目标清晰，但路径不确定
需要探索
需要多轮决策
```

---

👉 关键词：

> Reason → Act → Observe loop

---

### 🔥 面试关键句：

> Use agents when the problem is open-ended and cannot be solved with a fixed workflow.

---

---

## 🔵 3️⃣ Key Advantages（重点）

---

### 🟢 Non-agentic优势

- 💰 Low cost（便宜）
    
- ⚡ High speed（快）
    
- 🎯 Consistency（稳定）
    
- 🔍 Easy governance（好审计）
    

---

👉 非常关键（企业最看重）：

> 可控性

---

---

### 🔴 Agentic优势

---

#### 1️⃣ Reasoning capability

👉 能根据情况调整策略

---

#### 2️⃣ Tool integration

👉 自动调用：

- API
    
- DB
    
- Web
    

---

#### 3️⃣ Proactive action（重点🔥）

👉 不等人指令，自己推进任务

---

### 🔥 面试一句话：

> Agents can adapt, use tools, and proactively move toward a goal.

---

---

## 🟣 4️⃣ Typical Tasks（非常实用）

---

### 🟢 Non-agentic

- 翻译
    
- summarization
    
- 模板生成
    

👉 本质：

> 单步任务

---

---

### 🔴 Agentic

👉 这个例子很关键：

> 写Python → 分析数据 → 找异常 → 出报告

---

👉 这是：

```text
多步骤 + 决策 + 执行
```

---

---

# 三、这张图最重要的“隐藏结论”（面试加分🔥）

---

## ❗ 1️⃣ Agent ≠ 默认选择

👉 很多人会犯的错误：

> “能用AI就用Agent”

❌ 错

---

👉 正确：

```text
简单问题 → workflow
复杂问题 → agent
```

---

---

## ❗ 2️⃣ 成本 vs 智能 的trade-off

|维度|Non-agentic|Agent|
|---|---|---|
|成本|低|高|
|稳定|高|低|
|智能|低|高|

---

👉 面试加分句：

> There is a trade-off between control and flexibility.

---

---

## ❗ 3️⃣ 企业真实策略（很重要🔥）

👉 不是二选一，而是：

> **Hybrid（混合）**

---

### 真实架构：

```text
Workflow（主流程）
   ↓
Agent（处理复杂部分）
```

---

👉 举例：

- 固定ETL → workflow
    
- 异常分析 → agent
    

---

---

# 四、结合你（重点）

你现在的工作几乎全是：

## 🟢 Non-agentic

- dbt tests
    
- SQL validation
    
- reconciliation
    

---

👉 但可以升级：

---

## 🔥 Hybrid架构（你可以直接讲）

```text
数据pipeline（workflow）
    ↓
异常检测
    ↓
Agent分析原因
    ↓
生成报告
```

---

👉 你就从：

> QA Engineer

升级成：

> AI-driven Data Quality Engineer

---

---

# 五、面试会怎么问（真实）

---

## ❓Q1：什么时候用Agent？

👉 标准答案：

> When tasks are open-ended, require reasoning, and involve multiple steps or tool interactions.

---

---

## ❓Q2：什么时候不用Agent？

👉

> When tasks are deterministic, well-defined, and require high consistency.

---

---

## ❓Q3：Agent最大问题是什么？

👉

- cost
    
- unpredictability
    
- debugging difficulty
    

---

---

## ❓Q4：企业如何落地？

👉

> Use a hybrid approach combining workflows and agents.

---

---

# 六、你可以直接用的面试回答（高级版）

---

👉 如果问：

**“How do you choose between agentic and non-agentic systems?”**

你可以这样答：

> I choose non-agentic workflows for deterministic, repeatable tasks where consistency and cost efficiency are critical. However, for open-ended problems that require reasoning, tool usage, and iterative decision-making, I would use an agentic approach. In practice, I prefer a hybrid architecture where agents are used selectively to handle complex or ambiguous parts of the workflow.

---

---

# 七、一句话总结（必须记住）

> Agent不是更高级的workflow，而是用来解决workflow解决不了的问题。

---

---

如果你下一步想冲更高阶，我可以帮你：

👉 设计一个 **你当前工作场景的Hybrid Agent架构（可写进简历）**  
👉 或者帮你准备一套 **AI Engineer面试题（针对你背景定制）**

你现在已经不是“学AI”，而是可以开始“用AI设计系统”了。