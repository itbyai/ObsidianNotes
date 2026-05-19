这篇 Databricks Learning 文章的核心是：**从 Prompt Engineering 走向 Context Engineering，是把大模型应用从“会聊天”推进到“可靠生产系统”的关键变化。**

## 主要要点

### 1. Prompt Engineering 有明显边界

Prompt Engineering 主要是优化输入指令，例如：

- few-shot examples：给几个例子
    
- persona：让模型扮演某个角色
    
- output format：规定输出格式
    
- Chain of Thought：引导模型分步骤思考
    

但它解决不了几个根本问题：

- **知识截止**：模型不知道训练之后发生的事情。
    
- **幻觉**：没有外部资料时，模型可能编造看似合理的答案。
    
- **缺少私有上下文**：没有企业内部资料时，模型只能给泛泛回答。
    

所以再怎么优化 prompt，也不能让模型知道它本来不知道的事实。

---

### 2. RAG 是解决知识缺口的架构

RAG，也就是 Retrieval Augmented Generation，是从“依赖模型记忆”转向“给模型提供外部上下文”。

典型流程是：

1. **Retrieval**：从知识库、向量数据库里搜索相关资料。
    
2. **Augmentation**：把相关 chunks 放进 prompt/context window。
    
3. **Generation**：模型基于这些资料生成答案。
    

重点：  
**RAG 不是让模型变聪明，而是让模型有正确资料可用。**

---

### 3. RAG 不是越多资料越好

文章强调了一个很重要的问题：**Context Rot**。

如果把大量文档直接塞进 prompt，会出现：

- **Context Poisoning**：无关或冲突信息干扰模型。
    
- **Lost in the Middle**：长上下文中间的信息容易被模型忽略。
    
- 成本增加、延迟增加、回答质量下降。
    

所以 RAG 的重点不是“多取资料”，而是“取对资料”。

---

### 4. Context Engineering 是更高级的系统设计

Context Engineering 不只是写 prompt，而是设计整个输入环境，包括：

- system prompt
    
- conversation history
    
- retrieved data
    
- user constraints
    
- metadata
    
- 工具调用结果
    
- 输出格式要求
    

它的目标是让模型拿到**刚好足够、准确、结构清晰、可信的上下文**。

---

### 5. 好的 System Prompt 应该像行为程序

有效的 system prompt 应该定义：

- **角色**：例如 Databricks Security Architect
    
- **禁止事项**：例如不能提竞品、不能编造答案
    
- **输出格式**：例如 JSON、YAML、Markdown table
    
- **grounding rule**：只能基于提供的 context 回答
    

这比简单说“请认真回答”要可靠得多。

---

### 6. Grounding 和 Metadata Filtering 很关键

文章特别强调：

- 模型必须被要求：**只使用提供的 context chunks 回答**。
    
- 如果 context 里没有答案，就应该说不知道。
    
- 可以用 Unity Catalog metadata 做过滤，例如按年份、权限、数据域过滤。
    

这对企业场景很重要，因为可以避免：

- 用错旧数据
    
- 泄露不该看的数据
    
- 把无关内容混进答案
    
- 模型基于猜测回答
    

---

### 7. 多轮对话需要管理状态

Agent 或长对话系统不能无限保留所有历史，需要策略：

- **Summarization**：把历史对话压缩成摘要。
    
- **Moving Window**：丢弃最旧的信息。
    
- **Selective Persistence**：长期保留关键事实，比如用户、项目、权限、当前任务。
    

这就是 agentic system 里 Context Engineering 的核心。

---

### 8. Context Window 是有限预算

Context window 包括：

- input tokens：指令、历史、检索文档
    
- output tokens：模型生成的回答
    

上下文越大：

- 成本越高
    
- 延迟越高
    
- 模型越容易丢失重点
    

所以要像管理预算一样管理 token。

---

### 9. 优化策略

文章提到几个实用策略：

- **Just-in-Time Retrieval**：需要时再检索，不要一开始塞完整手册。
    
- **Reranking**：先取 top 50，再用 reranker 挑出 top 3–5。
    
- **Metadata Filtering**：先按年份、权限、领域过滤。
    
- **Strict Grounding**：只允许模型基于检索内容回答。
    

---

## 一句话总结

**Prompt Engineering 是优化“怎么问”，RAG 是补充“模型不知道的资料”，Context Engineering 是设计“模型在回答时能看到什么、按什么规则使用这些信息”。**

在生产级 AI 系统里，真正重要的不是写一个很厉害的 prompt，而是构建一个可靠的 context pipeline：  
**取对资料、过滤噪音、控制成本、严格 grounding、管理多轮状态。**