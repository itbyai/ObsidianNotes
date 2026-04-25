![[Pasted image 20260426090837.png]]

这张图其实是**AI Agent（智能体系统）最核心的一张入门+面试高频图**，基本可以拆成3层来理解：**概念 → 架构差异 → 考点**。我给你按“能考、能用、能讲清”的方式拆一下。

---

# 一、核心概念（必须掌握）

## 1️⃣ Non-agentic（非智能体）

关键词：**固定流程 / deterministic**

本质是：

> LLM 只是一个“函数”，整个流程是人为写死的

典型形式：

- Prompt → LLM → 输出
    
- 或 pipeline：
    
    ```
    Prompt → Step1 → Step2 → Output
    ```
    

特点：

- 流程固定（hardcoded）
    
- 顺序固定
    
- 没有“决策能力”
    
- 每次执行结果基本一致（deterministic）
    

👉 类似你现在做的数据pipeline / ETL测试流程

---

## 2️⃣ Agentic（智能体）

关键词：**自主决策 / 动态执行 / tool calling**

本质是：

> LLM 不只是执行，而是“决定下一步做什么”

核心能力：

- Planning（规划）
    
- Tool calling（调用工具）
    
- Reflection（反思）
    
- Iteration（迭代）
    

流程变成：

```
User Prompt
   ↓
Agent（LLM）
   ↓（决定）
Action 1（可能调用工具）
   ↓
Action 2（再决策）
   ↓
Final Output
```

👉 类似：

- AutoGPT
    
- LangChain Agent
    
- OpenAI function calling / MCP
    

---

# 二、图里真正的区别（重点考点）

## 对比总结（面试高频）

|维度|Non-agentic|Agentic|
|---|---|---|
|控制方式|人写死流程|AI决定流程|
|行为|固定|动态|
|是否可规划|❌|✅|
|是否可调用工具|❌（预定义）|✅（自主选择）|
|是否迭代|❌|✅|
|稳定性|高|低|
|灵活性|低|高|

---

## 图里每个点逐条解释（可能被问）

### 左边（Non-agentic）

### ✅ Hardcoded prompt response

👉 Prompt写死，例如：

```python
response = llm("Summarize this text")
```

---

### ✅ Fixed pipelines

👉 类似你现在做的：

- dbt → SQL → BI → 输出
    

---

### ✅ Deterministic actions

👉 输入一样 → 输出几乎一样

---

---

### 右边（Agentic）

### ✅ Planning and execution by AI

👉 LLM会先想：

- 我需要做什么？
    
- 用什么工具？
    

---

### ✅ Tool calling by AI

👉 重点考点（一定会问）

例如：

- 调数据库
    
- 调API
    
- 调Python
    
- 调浏览器
    

👉 这就是你之前问的：

> MCP / tool calling 本质

---

### ✅ Non-deterministic actions

👉 同一个问题：

- 路径可能不同
    
- 结果可能不同
    

---

### ✅ Iterative workflows

👉 会循环：

```
思考 → 行动 → 观察 → 再思考
```

👉 经典模式：

- ReAct（Reason + Act）
    

---

# 三、隐藏知识点（真正考点）

## 1️⃣ Agent = LLM + Tools + Memory + Loop

标准结构：

```
Agent
 ├── LLM（大脑）
 ├── Tools（手）
 ├── Memory（记忆）
 └── Loop（循环决策）
```

---

## 2️⃣ Agent 和 Workflow 的本质区别

👉 面试一句话：

> Workflow = predefined graph  
> Agent = dynamic decision-making system

---

## 3️⃣ Agent 为什么更强？

因为可以：

- 不知道路径 → 自己探索
    
- 不知道数据 → 自己查
    
- 不知道工具 → 自己选
    

---

## 4️⃣ 但为什么企业还用 Non-agentic？

👉 很关键（面试加分）

|原因|说明|
|---|---|
|可控|agent 不可预测|
|成本|agent 会多次调用|
|稳定性|agent 可能走错|
|审计|agent难追踪|

👉 所以现实是：

> 80% 系统 = workflow  
> 20% = agent增强

---

# 四、结合你背景（重点理解）

你现在做的数据/测试，本质是：

👉 **Non-agentic system**

例如：

- schema check
    
- reconciliation
    
- pipeline validation
    

---

未来升级方向：

👉 Agent化：

比如：

- 自动发现数据异常
    
- 自动生成测试SQL
    
- 自动决定验证路径
    

---

# 五、面试可能直接问的问题

### ❓Q1：什么是Agent？

👉

> An agent is an AI system that can plan, decide actions, and iteratively execute tasks using tools.

---

### ❓Q2：Agent vs workflow区别？

👉

> Workflow is predefined, while agent dynamically decides actions.

---

### ❓Q3：Agent核心组件？

👉

- LLM
    
- Tools
    
- Memory
    
- Planning loop
    

---

### ❓Q4：什么时候不用Agent？

👉

- 需要稳定性
    
- 流程固定
    
- 可预测性要求高
    

---

### ❓Q5：Agent的风险？

👉

- hallucination
    
- tool misuse
    
- cost explosion
    
- unpredictability
    

---

# 六、一句话总结（记住这个就够了）

> Non-agentic = “我告诉AI怎么做”  
> Agentic = “AI自己决定怎么做”

---

如果你要，我可以帮你把这个延伸成：

- **系统设计面试答案（高级版）**
    
- **结合你PADP数据测试 → Agent方案设计**
    
- 或者 **OpenClaw / 多Agent架构怎么落地**
    

这个图其实已经是你转AI Engineer最核心的一步了。