![[Pasted image 20260426091337.png]]

这张图是上一张的**进阶版（真正面试会深挖的那一张）**——从“有没有Agent”升级到：

> 👉 **Agent到底由什么组成？每个组件干嘛？**

我帮你按**“能讲架构 + 能答面试 + 能落地设计”**拆清楚。

---

# 一、核心结构（一句话先记住）

> **Agent = LLM（脑） + Tools（手） + Planning（大脑思考） + Memory（记忆）**

这是100%高频考点。

---

# 二、逐个组件拆解（重点）

---

## 1️⃣ LLM（Brain 🧠）

### 图里说的：

- 控制核心逻辑
    
- 决定执行顺序
    
- 可以调用其他模型
    

---

### 本质理解（面试用）：

> LLM ≠ 只是生成文本  
> 👉 是 **决策引擎（Decision Engine）**

---

### 实际职责：

- 解析用户意图
    
- 决定下一步做什么
    
- 选择工具
    
- 生成中间推理（chain of thought / reasoning）
    
- 控制流程走向
    

---

### 你可以这样讲（加分）：

> The LLM acts as the orchestrator that decides what actions to take and in what order.

---

### ⚠️ 常见考点：

- 单LLM vs 多LLM（router / specialist models）
    
- reasoning vs execution model
    

---

---

## 2️⃣ Tools（手 🔧）

### 图里说的：

> External resources via tool calling

---

### 本质：

> LLM自己什么都做不了  
> 👉 必须靠工具“扩展能力”

---

### 常见工具：

|类型|示例|
|---|---|
|数据|SQL / Databricks|
|API|REST / GraphQL|
|计算|Python|
|检索|RAG / vector DB|
|操作|浏览器 / UI automation|

---

### 你熟悉的场景（结合你）：

👉 直接命中你现在工作：

- SQL validation
    
- 数据对账
    
- schema check
    

👉 全都可以变成 Tool

---

### 面试一句话：

> Tools extend the capabilities of the LLM beyond text generation.

---

---

## 3️⃣ Planning（规划 🧭）

### 图里说的：

> Complex goals → manageable tasks

---

### 本质：

> 把一个大任务拆成多个步骤

---

### 举例：

用户说：

> “帮我分析这个股票”

Agent会拆：

1. 获取数据（tool）
    
2. 计算指标（tool）
    
3. 分析趋势（LLM）
    
4. 输出结论
    

---

### 常见实现方式：

- ReAct（最经典）
    
- Plan → Execute → Reflect
    
- Tree of Thoughts（高级考点）
    

---

### 面试一句话：

> Planning decomposes complex tasks into smaller actionable steps.

---

---

## 4️⃣ Memory（记忆 🧠💾）

这是最容易被忽略，但最容易拉开差距的点。

---

### 图里分两类：

### ✅ Short-term memory（短期）

- 当前对话上下文
    
- 当前任务状态
    

👉 类似：

- Chat history
    
- 当前变量状态
    

---

### ✅ Long-term memory（长期）

- 用户偏好
    
- 历史数据
    
- 知识积累
    

👉 类型（面试可能问）：

|类型|说明|
|---|---|
|Episodic|发生过的事情|
|Semantic|知识|
|Procedural|如何做|

---

### 实际实现：

- vector DB（RAG）
    
- DB / cache
    
- file / knowledge base
    

---

### 面试一句话：

> Memory enables the agent to maintain context and improve decision-making over time.

---

---

# 三、图右侧结构（必须能讲）

图右边其实是：

```text
User Request
    ↓
   Agent（核心）
    ├── LLM（决策）
    ├── Tools（执行）
    ├── Planning（拆任务）
    └── Memory（记住）
```

👉 关键点：

> 所有组件围绕 LLM 运转

---

# 四、真正的考点（高级）

---

## 1️⃣ Agent执行循环（超高频）

你必须能说出这个：

```text
1. Understand task
2. Plan
3. Choose tool
4. Execute
5. Observe result
6. Repeat
```

👉 也叫：

> **Agent loop**

---

## 2️⃣ 和传统系统区别

|传统系统|Agent|
|---|---|
|流程写死|动态|
|无记忆|有 memory|
|无决策|有 planning|
|无工具选择|自动 tool calling|

---

## 3️⃣ 为什么要Memory？

👉 没memory会发生：

- 每次都重新理解
    
- 无法连续任务
    
- 无法个性化
    

---

## 4️⃣ Tool + Planning = Agent核心能力

👉 记住一句话：

> 没有tool的agent = chatbot  
> 没有planning的agent = workflow

---

# 五、结合你当前背景（重点）

你现在可以直接升级的方向：

---

## 🔥 把你的数据测试系统 Agent化

例如：

### 现在（Non-agentic）

- 写SQL做对账
    
- 写规则做validation
    

---

### 升级（Agent）

```text
User: “检查这个数据是否有问题”

Agent:
1. 理解schema
2. 自动生成测试SQL
3. 执行SQL（tool）
4. 分析结果
5. 输出问题
```

---

👉 你可以做：

- 自动生成 dbt tests
    
- 自动数据对账
    
- 自动异常分析
    

---

# 六、面试直接可能问的题

---

### ❓Q1：Agent有哪些核心组件？

👉

- LLM
    
- Tools
    
- Planning
    
- Memory
    

---

### ❓Q2：Planning的作用？

👉

> Break down complex tasks into smaller steps.

---

### ❓Q3：Memory分哪几种？

👉

- Short-term
    
- Long-term（episodic / semantic / procedural）
    

---

### ❓Q4：Tool calling为什么重要？

👉

> Because LLM alone cannot interact with external systems.

---

### ❓Q5：Agent loop是什么？

👉

> Plan → Act → Observe → Repeat

---

# 七、一句话总结（记住这个）

> Agent = 会思考（LLM）+ 会用工具（Tools）+ 会拆任务（Planning）+ 会记忆（Memory）

---

如果你要下一步，我可以帮你：

👉 设计一个 **“Databricks + dbt + Agent”完整架构（直接可写进简历）**  
👉 或者做一个 **面试用 system design 答案（高级版）**

你现在这套理解，已经可以开始冲 AI Engineer 了。