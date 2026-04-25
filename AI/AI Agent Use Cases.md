![[Pasted image 20260426092033.png]]


这张图开始从“原理”转向**“落地应用（use cases）”**，也是面试里最容易被问的：

> 👉 **Agent到底用在哪？能解决什么业务问题？**

但这张图其实讲得很“浅”，我帮你把它**升级成可面试、可落地、可写简历的版本**。

---

# 一、这张图的本质（先说结论）

> 👉 Agent的三大落地方向：

1. **文档理解（IDP）**
    
2. **知识检索（RAG）**
    
3. **AI + ML决策系统（智能自动化）**
    

---

# 二、逐个拆解（+真实业务 +你能用的点）

---

## 🟢 1️⃣ Intelligent Document Processing（IDP）

> 从“文档”里提取结构化信息

---

### 图里说的：

> extract insights from documents at scale

---

### 本质：

```text
非结构化数据 → 结构化数据
```

---

### 典型场景：

- 发票识别（Invoice）
    
- 医疗记录（你现在这个领域🔥）
    
- 合同解析
    
- PDF → 表格
    

---

### Agent怎么参与？

不是简单OCR，而是：

```text
1. 读取文档（tool）
2. 理解结构（LLM）
3. 提取字段
4. 校验逻辑
5. 输出结构化数据
```

---

### 🔥 结合你（重点）

👉 你可以直接讲：

- PADP / 医疗数据文件
    
- HBCIS flattening
    
- schema mapping
    

---

👉 升级为：

> Document Processing Agent  
> 自动解析医疗文件 → 对应DER → 输出标准表结构

---

### 面试一句话：

> Agents can extract structured insights from unstructured documents using reasoning and validation.

---

---

## 🟡 2️⃣ Knowledge Base + Search（RAG）

> 这是目前最常见的Agent落地

---

### 图里说的：

> search and retrieval

---

### 本质：

```text
用户问题 → 检索知识 → 生成答案
```

---

### 核心技术：

- Vector DB
    
- Embedding
    
- RAG（Retrieval Augmented Generation）
    

---

### Agent vs 普通RAG区别：

👉 普通RAG：

- 查一次 → 回答
    

👉 Agent：

```text
查 → 判断不够 → 再查 → 再组合
```

---

### 典型场景：

- 企业知识库（Confluence / SharePoint）
    
- 技术文档问答
    
- 医疗指南查询
    
- 内部SOP查询
    

---

### 🔥 结合你

👉 你可以做：

- 数据字典 Agent（DER + BRS）
    
- 测试策略问答
    
- SQL规则解释
    

---

👉 例如：

> “这个字段是什么意思？”

Agent：

- 查DER
    
- 查BRS
    
- 合并解释
    

---

### 面试一句话：

> Agents enhance RAG by iteratively retrieving and refining information.

---

---

## 🔴 3️⃣ Machine Learning + AI（高级）

> 真正“赚钱”的方向

---

### 图里说的：

> combine ML + GenAI

---

### 本质：

```text
预测 + 决策 + 执行
```

---

### 典型结构：

```text
ML model（预测）
↓
Agent（决策）
↓
Action（执行）
```

---

### 典型场景：

|场景|说明|
|---|---|
|Supply chain（你🔥）|预测库存 → 自动调货|
|Fraud detection|检测异常 → 自动处理|
|Trading|模型预测 → Agent执行|
|医疗|风险预测 → 推荐行动|

---

### 🔥 结合你（非常关键）

👉 你现在就是黄金场景：

---

## Supply Planning Agent

```text
1. ML预测需求
2. Agent分析库存
3. Agent调用系统（SAP / API）
4. 自动生成采购/调拨
```

---

👉 这就是：

> AI-driven decision system

---

### 面试一句话：

> Agents can orchestrate ML predictions and take autonomous actions.

---

---

# 三、这三类的本质区别（面试高频）

|类型|核心能力|是否用Agent|
|---|---|---|
|文档处理|提取|可选|
|知识检索|查找|推荐|
|ML + AI|决策执行|必须|

---

👉 关键理解：

> 越靠右 → 越需要Agent

---

---

# 四、隐藏考点（很重要）

---

## 1️⃣ 这其实是AI成熟度分层

```text
Level 1：Extract（文档）
Level 2：Answer（知识）
Level 3：Act（决策）
```

---

👉 面试说这个直接加分

---

---

## 2️⃣ Agent价值在哪里？

👉 不是在：

- 文档处理
    
- 搜索
    

👉 真正价值在：

> 自动决策 + 自动执行

---

---

## 3️⃣ 为什么RAG要升级成Agent？

👉 因为：

- 一次检索不够
    
- 信息不完整
    
- 需要推理
    

---

---

# 五、结合你（最重要部分）

你可以把自己定位成：

---

## 🔥 AI + Data + Agent工程师

你可以讲3个项目方向：

---

### 1️⃣ Data QA Agent（短期就能做）

- 自动生成SQL测试
    
- 自动对账
    
- 自动异常分析
    

---

---

### 2️⃣ Knowledge Agent（中期）

- DER / BRS / Data dictionary问答
    
- SQL解释
    
- 测试规则生成
    

---

---

### 3️⃣ Supply Chain Agent（高价值🔥）

- 需求预测（ML）
    
- 库存分析（Agent）
    
- 自动决策（调货/采购）
    

---

---

# 六、面试会怎么问

---

## ❓Q1：Agent常见use cases？

👉 标准答：

- Document processing
    
- Knowledge retrieval (RAG)
    
- Decision automation (ML + AI)
    

---

---

## ❓Q2：哪个最有商业价值？

👉

> Decision-making systems combining ML and agents.

---

---

## ❓Q3：RAG和Agent区别？

👉

|RAG|Agent|
|---|---|
|单次检索|多轮|
|无决策|有决策|
|无执行|可执行|

---

---

# 七、一句话总结（记住）

> Agent的终极价值不是“理解信息”，而是“基于信息做决策并执行”。

---

---

如果你要下一步，我可以帮你：

👉 设计一个**Supply Chain Agent系统（你直接能拿去面试）**  
👉 或者做一个**Data QA Agent（Databricks + dbt + LLM）完整架构**

你现在已经到“可以转AI Engineer”的关键节点了。