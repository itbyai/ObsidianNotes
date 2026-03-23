选 **D**。

原因很直接：

- 检索块最大只有 **505 tokens**
    
- 题目强调 **cost 和 latency 优先于 quality**
    
- 所以最有效率的配置就是：
    
    - **context length 刚好匹配 505**
        
    - **model size 最小**
        
    - **embedding dimension 最低**
        

看四个选项里，只有 **D** 是：

- **Context length 505**
    
- **Model size 0.13GB**
    
- **Embedding dimension 384**
    

这最符合“够用就好、成本最低、延迟最低”的目标。

### 为什么不是 A / B / C

- **A**：1024，已经比 chunk size 大一倍多，浪费
    
- **B**：2048，更大，模型也更重
    
- **C**：8192，明显过度配置，成本和延迟都更高
    

### 结论

**最佳答案：D. Context length 505; model size 0.13GB; embedding dimension 384.**

这道题本质考的是：  
**在质量不是第一优先级时，选“最小可行配置”而不是“更强配置”。**
可以，这题核心是在考你：**当业务目标是省钱、低延迟，而不是追求最佳效果时，应该怎么选“刚刚够用”的配置。**

---

## 先看题目给的关键信息

题目说：

- 这是一个 **LLM-powered assistant**
    
- retriever 把文档切成 **最大 505 tokens**
    
- 系统 **cost 和 latency 优先于 quality**
    
- 要选 **most efficient context length configuration**
    

这里最关键的是两句话：

### 1. 文档 chunk 最大只有 505 tokens

意思是一次检索出来的单个块，最多就这么大。

### 2. cost 和 latency 比 quality 更重要

意思是：

- 不追求更强模型
    
- 不追求更长上下文
    
- 不追求更高 embedding 维度
    
- 只要够完成任务就行
    

---

# 为什么答案是 D

## D 选项

- Context length = **505**
    
- Model size = **0.13GB**
    
- Embedding dimension = **384**
    

这代表：

### 1. Context length 正好匹配 chunk 大小

因为 chunk 最大就是 505 tokens，  
那你给 505 的 context window，刚好能装下一个完整 chunk。

不会浪费。

---

### 2. 模型最小

0.13GB 是四个里最小的。

模型越小，通常意味着：

- 推理更快
    
- 内存占用更低
    
- 部署成本更低
    
- 响应延迟更低
    

题目已经说了 cost 和 latency 优先，所以小模型更符合目标。

---

### 3. Embedding dimension 最低

384 也是最小的。

embedding 维度越高，通常意味着：

- 向量更大
    
- 存储更多
    
- 检索计算更多
    
- 成本更高
    
- 可能质量更好，但不一定是必须
    

题目明确说 **不是优先追求质量**，所以低维 embedding 更合理。

---

# 为什么别的选项不合适

---

## A. Context length 1024; model size 0.65GB; embedding 768

这比 D 大很多。

### 问题 1：context length 浪费

chunk 最大只有 505，  
你却给了 1024 的上下文长度。

这就像：

- 你只需要装半瓶水
    
- 却非要买一个更大的桶
    

虽然能装，但浪费资源。

### 问题 2：模型更大

0.65GB 比 0.13GB 大很多，推理更慢、更贵。

### 问题 3：embedding 更高

768 比 384 更大，检索成本也更高。

所以 A 虽然可用，但**不够高效**。

---

## B. Context length 2048; model size 9.8GB; embedding 2560

这个明显更偏“追求效果”的配置，不是“追求效率”的配置。

### 为什么不选

- context 太大，远超 505
    
- model size 非常大
    
- embedding 维度非常高
    

这会带来：

- 更高计算成本
    
- 更高延迟
    
- 更大资源消耗
    

如果题目说“质量优先”，B 可能还有讨论空间。  
但现在题目说的是 **cost 和 latency 优先**，那 B 就太重了。

---

## C. Context length 8192; model size 13.5GB; embedding 4096

这是最夸张的一个。

8192 的上下文长度，对 505-token chunk 来说完全过度配置。

这个选项通常只适合：

- 需要处理超长文档
    
- 需要很多上下文拼接
    
- 对质量要求极高
    

但题目明确不是这种场景。

所以 C 是最不符合题意的。

---

# 这题背后的真正逻辑

这题其实不是单纯在考数字比较，而是在考一个 AI 工程原则：

## 原则：Choose the smallest configuration that satisfies the requirement.

也就是：

**在满足需求的前提下，选最小、最轻、最便宜的配置。**

因为在 AI 系统里：

- 更长 context ≠ 一定更好
    
- 更大模型 ≠ 一定更合适
    
- 更高 embedding 维度 ≠ 一定更值得
    

如果业务目标是：

- 内部 IT helpdesk
    
- 低成本
    
- 低延迟
    
- 够用即可
    

那么工程上最合理的方案就是：  
**不要 over-engineer。**

---

# 一个生活化比喻

你现在要送一个小包裹，最多 5 公斤。

四个方案是：

- A：普通面包车
    
- B：大货车
    
- C：超大型卡车
    
- D：小电动车
    

题目说：

- 成本要低
    
- 速度要快
    
- 包裹不大
    

那当然选 **D**。  
因为 D 已经能完成任务了，再上更大的车，只会更贵、更慢、更浪费。

---

# 为什么 context length 要看 chunk size

retriever 已经把文档切成最大 505 tokens，意味着系统设计上已经决定：

- 每个检索单元不会超过 505
    
- 所以模型不需要超长 context 去处理单块内容
    

如果你用 1024、2048、8192：

- 并不会让单个 505-token chunk magically 变更好
    
- 只会让模型具备处理更长输入的能力
    
- 但这个能力在当前任务里根本没被充分利用
    

所以是**冗余能力**。

---

# embedding dimension 为什么也要选低的

embedding 维度越高，理论上可能表达能力越强，但代价是：

- 向量数据库更大
    
- 检索更慢
    
- 算力消耗更高
    
- 成本更高
    

如果这是一个内部 IT helpdesk，通常目标是：

- 快速回答常见问题
    
- 成本可控
    
- 延迟低
    

不是做高精度语义研究系统。  
所以 **384** 这种更轻量的 embedding 更符合题目要求。

---

# 最终总结

这题的正确思路是：

1. **chunk 最大只有 505**
    
2. 所以 context length 只要能覆盖 505 就够了
    
3. 题目强调 cost 和 latency 优先
    
4. 所以应该选：
    
    - 最短足够的 context
        
    - 最小的 model size
        
    - 最低的 embedding dimension
        
5. 四个选项中，只有 **D** 完全符合这个原则
    

## 最终答案

**D. Context length 505; model size 0.13GB; embedding dimension 384**

这题最想让你记住的一句话是：

**在 AI 工程里，最优方案不一定是最强方案，而是最符合业务目标的方案。**

对，**chunk 的大小**通常就是指：  
把原始文档切分成一个个小片段时，每一片大约有多少 token。

比如一份长文档会被切成：

- chunk 1：420 tokens
    
- chunk 2：505 tokens
    
- chunk 3：380 tokens
    

这里的 **505 tokens** 就表示单个块的上限。

---

# 一、cost 和 latency 跟什么相关

它们和很多因素有关，但在这道题里，最直接相关的是这几个：

## 1. 输入和输出 token 数量

这是最核心的。

### Cost

很多 LLM 都按 token 收费：

- 输入 token 越多，越贵
    
- 输出 token 越多，越贵
    

### Latency

token 越多，模型处理时间通常越长：

- 输入越长，读得越久
    
- 输出越长，生成越久
    

所以：

**更长的 context → 通常更高成本 + 更高延迟**

---

## 2. 模型大小

模型越大，通常：

- 推理更慢
    
- 占用更多显存 / 内存
    
- 运行成本更高
    

比如：

- 小模型回答快、便宜
    
- 大模型更强，但更慢、更贵
    

所以题里看到：

- 0.13GB
    
- 0.65GB
    
- 9.8GB
    
- 13.5GB
    

通常越小越有利于 **low cost / low latency**

---

## 3. Context length

context length 是模型能处理的输入窗口大小。

窗口越大，不代表每次都一定更贵，但通常意味着：

- 模型要支持更长序列处理
    
- 配套资源需求更高
    
- 如果实际每次都塞很多内容进去，成本和延迟都会上升
    

所以在业务上经常是：

**不要盲目选超长 context，够用就好。**

---

## 4. Embedding dimension

这个主要影响的是 **检索阶段** 的成本和速度，而不是生成回答本身。

embedding dimension 越高：

- 向量更长
    
- 存储占用更大
    
- 相似度计算更重
    
- 建索引和检索成本更高
    

例如：

- 384维：更轻量、更快、更便宜
    
- 1536维 / 3072维：表达更强，但更贵
    

所以如果只是做一个内部 helpdesk，而且题目说质量不是第一优先级，那低维 embedding 更合理。

---

## 5. 检索返回多少个 chunks

即使单个 chunk 只有 505 tokens，  
如果你一次检索返回 10 个 chunk，那输入模型的总 token 还是会变大。

比如：

- 1 个 chunk × 505 = 505
    
- 4 个 chunks × 505 = 2020
    

这就会显著影响：

- cost
    
- latency
    

所以真实系统里，不只是 chunk size，**top-k 检索数量**也很关键。

---

# 二、chunk size 到底是什么

是的，你理解得对。

## chunking 就是把文档切块

因为原始文件可能很长，不能整篇都丢给模型，所以先切成小块。

例如一篇知识库文章：

> How to reset your password  
> Step 1...  
> Step 2...  
> Step 3...  
> If MFA fails...

可能会被切成：

- chunk A：前言 + Step 1
    
- chunk B：Step 2 + Step 3
    
- chunk C：MFA 相关说明
    

每个 chunk 可能限制在：

- 200 tokens
    
- 500 tokens
    
- 1000 tokens
    

具体大小由系统设计决定。

---

# 三、为什么要把文件切成 chunk

因为直接把整篇文件塞给模型，通常有几个问题：

## 1. 太长

很多文件很大，整个放进去：

- 贵
    
- 慢
    
- 超出上下文窗口
    

## 2. 检索不精准

如果整篇文章都作为一个向量，用户只问其中一个小问题，检索粒度太粗。

## 3. 容易带入无关信息

切块后，只取最相关的几块，回答更聚焦。

---

# 四、chunk 太大或太小会怎样

这也是 RAG 里很重要的设计点。

## chunk 太大

优点：

- 上下文更完整
    
- 不容易把一句话切断
    

缺点：

- 每次喂给模型的 token 更多
    
- 成本更高
    
- 延迟更高
    
- 可能带入太多无关内容
    

## chunk 太小

优点：

- 更省 token
    
- 更便宜
    
- 检索更细粒度
    

缺点：

- 可能上下文不完整
    
- 一句话被切断，语义丢失
    
- 需要更多 chunks 才能回答问题
    

所以 chunk size 是个平衡问题。

---

# 五、这道题为什么特别强调 505

题目说：

> retriever chunks documents to a maximum of 505 tokens

意思是：

- 单块最大就 505
    
- 你不需要为了处理单块内容，去选 1024、2048、8192 这种更大的 context 配置
    
- 如果你又不追求最高质量，就应该选最贴近实际需要的配置
    

也就是：

**既然块最大只有 505，那 505 的 context length 已经够处理一个块了。**

---

# 六、一个简单流程图帮助你理解

用户提问后，系统大概这样工作：

### 1. 文档预处理

把知识库文件切成 chunk  
例如每块最多 505 tokens

### 2. 向量化

每个 chunk 转成 embedding

### 3. 检索

用户提问后，找最相关的 chunks

### 4. 拼 prompt

把这些 chunks 加进 prompt 里，发给 LLM

### 5. LLM 回答

模型基于问题 + chunks 生成答案

---

# 七、cost 和 latency 在这个流程里分别来自哪里

## Cost 主要来自

- embedding 生成成本
    
- 向量检索存储和计算成本
    
- LLM 输入 token 成本
    
- LLM 输出 token 成本
    
- 模型部署资源成本
    

## Latency 主要来自

- 检索耗时
    
- prompt 组装耗时
    
- 模型推理耗时
    
- 输出生成耗时
    

---

# 八、一句话记忆

## chunk 是什么

**chunk = 把长文档切成一个个小段，每段有一定 token 上限。**

## cost 和 latency 跟什么最相关

最直接相关的是：  
**token 数量、模型大小、embedding 维度、检索返回块数。**

---

# 九、给你一个非常实用的直觉

如果业务目标是：

- 内部知识库
    
- 常见问答
    
- 成本敏感
    
- 响应要快
    

通常设计思路就是：

- chunk 不要太大
    
- top-k 不要太多
    
- embedding 不要过重
    
- 模型不要过大
    
- context 不要过长
    

也就是：

**small enough, but sufficient**

---

如果你愿意，我可以下一步继续给你讲清楚：  
**chunk size、chunk overlap、top-k、embedding dimension 之间到底怎么配合。**

对，**0.13GB 这里基本可以理解成模型体积/内存占用级别**，也就是这个模型大概有多“轻”。在这类题里，它不是在考你精确区分“磁盘大小、参数大小、显存占用、运行内存”这些工程细节，而是在表达：

- **0.13GB 很小**
    
- **9.8GB、13.5GB 很大**
    
- 小模型通常更便宜、更快
    

所以你把它理解成“模型资源占用大小”就可以了。

---

# 一、什么原则来切分文档

你问的“区分文档”，这里更准确说是 **切分文档（chunking）**。  
核心原则不是随便按字数砍，而是：

## 1. 按“语义完整性”切

最重要原则是：

**一个 chunk 最好表达一个相对完整的意思。**

比如：

- 一个步骤说明
    
- 一个小节
    
- 一个问答
    
- 一个政策条款
    
- 一个报错处理流程
    

不要把一句话切一半，也不要把本来强相关的内容拆太碎。

### 好的切法

文档里有：

**Reset Password**

1. Go to settings
    
2. Click reset
    
3. Confirm via email
    

这最好切成一个完整块，或者按步骤组。

### 不好的切法

- chunk 1: “Go to set...”
    
- chunk 2: “...tings, click reset...”
    

这样语义断裂，检索效果会差。

---

## 2. 按结构切

优先利用文档原有结构：

- 标题
    
- 小标题
    
- 段落
    
- 列表
    
- 表格
    
- FAQ 问答对
    
- 代码块
    
- policy 条款
    

也就是说，先看文档本身怎么组织，再决定 chunk。

### 例如

一个 IT helpdesk 文档可能是：

- VPN Login Issues
    
- Password Reset
    
- MFA Setup
    
- Software Installation
    

最自然的切法通常就是：  
**按每个小节切，再看长度是否超限。**

---

## 3. 控制 chunk 大小

chunk 不能太大，也不能太小。

### 太大

- 检索时带入很多无关内容
    
- token 成本变高
    
- latency 变高
    

### 太小

- 上下文不完整
    
- 语义容易断裂
    
- 需要检索更多块才能答好
    

所以常见原则是：

**先保证语义完整，再控制在合理 token 范围内。**

比如常见会用：

- 200–400 tokens
    
- 300–500 tokens
    
- 500–800 tokens
    

具体取决于场景。

---

## 4. 相关内容尽量放一起

如果两段内容必须一起看才有意义，就不要拆开。

例如：

### 场景 A：错误码 + 解决方案

- Error 401 means token expired
    
- Re-authenticate using SSO
    

这两句应该尽量在一个 chunk 里。

### 场景 B：问题和答案

FAQ：

- How do I reset my password?
    
- Follow these steps...
    

问和答最好在一起，不然检索回来只有问题没有答案，或者只有答案没有问题。

---

## 5. 尽量减少噪音

不要把完全不相关的信息混在一个 chunk 里。

比如一个 chunk 里同时有：

- password reset
    
- printer issue
    
- leave request
    
- onboarding checklist
    

那 embedding 语义会变杂，检索不精准。

原则就是：

**一个 chunk 最好围绕一个主题。**

---

# 二、常见 chunking 方法

## 1. Fixed-size chunking

按固定 token 数切，比如每 500 tokens 一块。

优点：

- 简单
    
- 实现容易
    

缺点：

- 可能把语义切断
    

---

## 2. Recursive chunking

先按标题、段落、句子去切；如果还太长，再继续往下拆。

这是比较常用、也比较合理的方法。

优点：

- 保留结构
    
- 更自然
    
- 不容易切坏语义
    

---

## 3. Semantic chunking

按语义边界切，而不是纯长度。

例如模型判断：

- 这一段讲 VPN
    
- 下一段讲 MFA  
    那就在这里断开
    

优点：

- 检索质量往往更好
    

缺点：

- 实现更复杂
    
- 成本更高
    

---

# 三、chunk overlap 是什么

有时切块时会让相邻块 **重叠一部分内容**，叫 overlap。

例如：

- chunk 1: token 1–500
    
- chunk 2: token 450–950
    

这样 overlap 了 50 tokens。

## 为什么要 overlap

防止关键信息刚好落在边界，被切断。

### 例子

一句重要话跨在两个 chunk 之间：

- chunk 1 只留了前半句
    
- chunk 2 只留了后半句
    

加 overlap 后，至少有一个 chunk 会保留更完整语义。

## 缺点

- 存储更多
    
- 检索时可能重复
    
- 成本略增
    

所以 overlap 也是平衡。

---

# 四、0.13GB 到底表示什么

你问得很好。更精确地说，它可能代表：

- 模型文件大小
    
- 模型权重大小
    
- 推理资源级别
    
- 近似内存占用
    

在考试题里，你不用扣太细。它只是告诉你：

### 0.13GB

- 很轻量
    
- 更快
    
- 更便宜
    

### 13.5GB

- 很重
    
- 更慢
    
- 更贵
    

所以这道题里它的作用就是让你判断“哪个方案更省资源”。

---

# 五、为什么模型更大通常更贵更慢

因为更大模型通常意味着：

- 参数更多
    
- 计算更多
    
- 占用更多显存/内存
    
- 冷启动更慢
    
- 推理更慢
    

虽然不一定在所有情况下都绝对成立，但在大多数场景下，这是成立的工程直觉。

---

# 六、怎么理解“最合适的切块原则”

你可以记住一个非常实用的顺序：

## 文档切分四原则

**1. 先按结构切**  
标题、段落、FAQ、步骤、表格、代码块

**2. 保持语义完整**  
一个 chunk 讲一个完整主题

**3. 控制大小适中**  
不要太大，不要太小

**4. 需要时加 overlap**  
避免边界切坏内容

---

# 七、举个 helpdesk 文档例子

原文档：

## Password Reset

If you forget your password, go to the self-service portal.  
Use your employee ID and verify with MFA.  
If MFA fails, contact IT support.

## VPN Access

Install the VPN client.  
Login with your corporate credentials.  
If access is denied, check your group policy.

### 比较好的 chunking

**chunk 1**  
Password Reset  
If you forget your password...  
Use your employee ID...  
If MFA fails...

**chunk 2**  
VPN Access  
Install the VPN client...  
Login with your credentials...  
If access is denied...

这样一个主题一个块，检索效果通常会更好。

---

# 八、一句话回答你两个问题

## 什么原则切分文档

**按语义和结构来切，保证每个 chunk 尽量完整表达一个主题，并控制在合理 token 范围内。**

## 0.13GB 是什么

**可以把它理解成模型体积/资源占用大小；数值越小，通常越省成本、越低延迟。**

如果你愿意，我可以下一步继续给你讲一个最实用的版本：  
**RAG 里 chunk size、overlap、top-k 到底怎么一起配。**

通常是**自动化做**，但规则是**人来设计**。

也就是说：

- **你来决定策略**
    
- **程序按策略自动切**
    

不是每次人工一段段去切，那样不现实。真实项目里一般是在文档入库时，由 pipeline 自动完成 chunking。

---

# 一、chunking 到底是谁做

## 1. 人工设计规则

你先决定：

- 按标题切还是按固定长度切
    
- 每块多大
    
- 要不要 overlap
    
- 表格、FAQ、代码块怎么处理
    
- 不同类型文档要不要用不同策略
    

这是工程设计工作，通常由 AI engineer / data engineer / backend engineer 来定。

---

## 2. 系统自动执行

然后程序自动对每个文档做：

1. 读取文档
    
2. 清洗格式
    
3. 按规则切块
    
4. 生成每个 chunk 的 metadata
    
5. 做 embedding
    
6. 存入向量库
    

所以 chunking 通常是**自动化 pipeline 的一部分**。

---

# 二、什么时候需要人工参与

虽然大部分是自动做，但这些情况经常要人工调：

## 1. 文档质量很差

比如：

- PDF 解析后顺序乱了
    
- 表格被打散
    
- 标题识别不出来
    
- OCR 错乱
    

这时要人工修规则，甚至先清洗文档。

## 2. 某类文档特别重要

比如：

- 法规条款
    
- 产品手册
    
- SOP 流程
    
- 合同模板
    

你可能会单独给它定一套 chunking 策略。

## 3. 检索效果不好

如果用户老是搜不到准答案，就要反过来检查：

- chunk 太大了吗
    
- 太小了吗
    
- overlap 不够吗
    
- top-k 太少了吗
    
- embedding 维度不合适吗
    

所以整体上是：

**执行自动化，策略靠人工迭代优化。**

---

# 三、现在讲清楚这四个东西怎么配合

你问的四个核心变量是：

- **chunk size**
    
- **chunk overlap**
    
- **top-k**
    
- **embedding dimension**
    

它们其实是一套联动系统，不是单独看。

---

# 四、先定义一下四个概念

## 1. chunk size

每个文档块有多大，通常按 token 算。

例如：

- 200
    
- 400
    
- 500
    
- 800 tokens
    

---

## 2. chunk overlap

相邻 chunk 重叠多少内容。

例如：

- chunk 1 = 1–500
    
- chunk 2 = 451–950
    

那 overlap 就是 50。

---

## 3. top-k

检索时返回最相关的前几个 chunks。

例如：

- top-1：只取 1 块
    
- top-3：取最相关 3 块
    
- top-5：取 5 块
    

---

## 4. embedding dimension

每个 chunk 被转成多长的向量。

例如：

- 384
    
- 768
    
- 1536
    
- 3072
    

维度越高，表达能力通常更强，但成本更高。

---

# 五、它们之间怎么互相影响

---

## A. chunk size 和 top-k 是强绑定的

这是最重要的一组关系。

### 情况 1：chunk 很大

比如每块 800 tokens。

优点：

- 单块信息更完整
    
- 可能只需要 top-k = 1 或 2
    

缺点：

- 每块带的无关内容更多
    
- 每次送进模型的 token 更多
    
- 成本和延迟更高
    

### 情况 2：chunk 很小

比如每块 150 tokens。

优点：

- 检索更细粒度
    
- 每块更聚焦
    
- 单块更省 token
    

缺点：

- 一个完整答案可能分散在好几块里
    
- 需要更大的 top-k 才能拼齐上下文
    

---

### 直觉公式

**chunk 越小，通常 top-k 需要越大。**  
**chunk 越大，通常 top-k 可以更小。**

---

## B. chunk overlap 和 chunk size 一起决定“语义连续性”

### 为什么需要 overlap

因为信息经常刚好跨边界。

比如一句关键话：

> If MFA verification fails, contact IT to reset your device token.

可能被切成：

- chunk 1: If MFA verification fails...
    
- chunk 2: ...contact IT to reset your device token.
    

这样两边都不完整。

### 有 overlap 后

- chunk 1 和 chunk 2 都会保留一部分边界内容
    
- 检索到任意一块时，更有机会拿到完整语义
    

---

### 但 overlap 不是越大越好

overlap 太大有坏处：

- 向量库里重复内容变多
    
- 检索结果容易重复
    
- 存储和 embedding 成本增加
    
- prompt 里可能塞进重复信息
    

---

### 常见经验

- 小 chunk：overlap 可稍大一点
    
- 大 chunk：overlap 可以适当小一点
    

例如：

- chunk 300，overlap 50
    
- chunk 500，overlap 50–100
    
- chunk 800，overlap 80–120
    

不是死规则，但这是常见思路。

---

## C. embedding dimension 影响检索精度和资源消耗

### 低维 embedding

比如 384

优点：

- 更快
    
- 更便宜
    
- 占用更少存储
    
- 检索更轻量
    

缺点：

- 语义表达能力可能弱一些
    
- 复杂语义区分不够细
    

### 高维 embedding

比如 1536 / 3072

优点：

- 语义区分能力通常更强
    
- 对复杂知识库可能更稳
    

缺点：

- 向量更大
    
- 存储成本更高
    
- 检索计算更重
    
- 延迟可能更高
    

---

### 它和 chunk size 的关系

如果 chunk 很大、语义更杂，那么可能更依赖更强 embedding 才能分辨主题。  
如果 chunk 很小、主题很单一，低维 embedding 也可能够用。

所以：

**chunk 越大越杂，越可能需要更强 embedding。**  
**chunk 越小越纯，embedding 压力相对小一点。**

---

## D. top-k 和 embedding dimension 一起决定“召回 vs 噪音”

### 如果 embedding 较弱

例如 384 维，语义表达一般。

那有时你会通过**增大 top-k** 来弥补：

- 多拿几块
    
- 提高召回概率
    

但问题是：

- 会带更多噪音
    
- prompt 更长
    
- 成本更高
    
- 模型更容易分心
    

### 如果 embedding 较强

比如 1536 维，语义更准一些。

那可能：

- top-k 可以小一点
    
- 也能拿到高相关内容
    

所以：

**embedding 越弱，可能越依赖 top-k 提高召回。**  
**embedding 越强，top-k 往往可以更保守。**

---

# 六、这四个参数怎么整体配

你可以把它理解成一个平衡表：

|目标|chunk size|overlap|top-k|embedding dimension|
|---|---|---|---|---|
|低成本、低延迟|小到中等|小到中等|小|低到中|
|高质量问答|中等|中等|中到大|中到高|
|长流程文档|中到大|中等|中等|中到高|
|FAQ / helpdesk|小到中等|小|小到中|低到中|

---

# 七、不同业务场景怎么选

---

## 场景 1：内部 IT Helpdesk

特点：

- 问题短
    
- 答案通常集中
    
- 成本和速度重要
    
- 容忍不是最完美，但要快
    

推荐思路：

- chunk size：**250–500**
    
- overlap：**30–80**
    
- top-k：**2–4**
    
- embedding dimension：**384 或 768**
    

因为 helpdesk 文档通常结构清晰，FAQ、步骤、报错处理都比较短。

---

## 场景 2：政策 / 合规 / 法规问答

特点：

- 上下文依赖强
    
- 不能断章取义
    
- 精度重要
    

推荐思路：

- chunk size：**400–800**
    
- overlap：**80–150**
    
- top-k：**3–5**
    
- embedding dimension：**768 或更高**
    

因为条款上下文更重要，不能切太碎。

---

## 场景 3：技术文档 / API 手册

特点：

- 结构化强
    
- 一段一段主题清晰
    
- 有代码块和参数说明
    

推荐思路：

- chunk size：**300–600**
    
- overlap：**50–100**
    
- top-k：**2–5**
    
- embedding dimension：**384–768**
    

---

## 场景 4：长篇报告 / 研究材料

特点：

- 内容长
    
- 主题跨度大
    
- 单块不能太小，否则碎
    

推荐思路：

- chunk size：**600–1000**
    
- overlap：**80–150**
    
- top-k：**3–6**
    
- embedding dimension：**768 或更高**
    

---

# 八、一个最实用的调参方法

真实项目里不要一上来就想“理论最优”，而是这样做：

## Step 1：先定初始值

例如 helpdesk：

- chunk size = 400
    
- overlap = 50
    
- top-k = 3
    
- embedding = 384
    

## Step 2：做测试集

准备 30–100 个真实问题：

- 用户会怎么问
    
- 正确答案在哪个文档里
    

## Step 3：看问题出在哪

### 如果经常“找不到答案”

可能是：

- chunk 太大太杂
    
- embedding 太弱
    
- top-k 太小
    

### 如果“找到很多但很乱”

可能是：

- top-k 太大
    
- chunk 太大带太多噪音
    
- overlap 太大导致重复
    

### 如果“答案老缺半句”

可能是：

- overlap 不够
    
- chunk 太小
    
- 切块破坏了语义完整性
    

---

# 九、一个非常实用的经验规律

## 1. 先定 chunk strategy，再谈 embedding

因为如果 chunk 切得很差，再强的 embedding 也救不回来。

## 2. 先保证检索到，再优化 prompt 长度

先解决 recall，再解决 cost。

## 3. overlap 是补丁，不是主方案

如果你严重依赖大 overlap，说明 chunking 规则本身可能有问题。

## 4. top-k 不宜贪多

不是越大越好。太大常常把 prompt 搞脏。

---

# 十、给你一个简单记忆法

## chunk size

决定“每块装多少内容”

## overlap

防止“边界切坏语义”

## top-k

决定“拿几块给模型看”

## embedding dimension

决定“检索时语义表示的精细度”

---

# 十一、最重要的一句话

这四个参数的配合，本质是在做两个平衡：

## 平衡 1：召回率 vs 噪音

- chunk 小 + top-k 大 = 召回高，但可能更乱
    
- chunk 大 + top-k 小 = 更集中，但可能带太多无关内容
    

## 平衡 2：质量 vs 成本/延迟

- 更大 chunk / 更大 top-k / 更高维 embedding = 质量潜力更高，但更贵更慢
    
- 更小更轻配置 = 更便宜更快，但可能丢信息
    

---

# 十二、给你一个 helpdesk 的起步配置

如果是内部 IT helpdesk，通常可以从这个起步：

- **chunk size: 300–500**
    
- **chunk overlap: 50**
    
- **top-k: 3**
    
- **embedding dimension: 384 或 768**
    

然后根据测试结果微调。

---

如果你愿意，我可以下一步直接给你画一个：  
**“RAG 参数如何联动”的中文图解表**，你一眼就能记住。


可以。我用一个**内部 IT helpdesk** 的真实化例子，把这四个参数怎么一起工作讲清楚，再给你看完整 pipeline。

---

# 先用一个例子

假设公司有一篇知识库文档：

## 文档标题

**Reset Password and MFA Troubleshooting**

正文大概是：

1. If you forget your password, go to the self-service portal.
    
2. Enter your employee ID and registered email.
    
3. Complete MFA verification.
    
4. If MFA fails, reset your device token or contact IT support.
    
5. If your account is locked, wait 15 minutes or ask admin to unlock it.
    

---

# 一、怎么切成 chunks

假设我们设置：

- **chunk size = 40 tokens**
    
- **chunk overlap = 10 tokens**
    

这只是为了演示，真实项目里通常更大。

---

## 切出来可能像这样

### Chunk 1

If you forget your password, go to the self-service portal.  
Enter your employee ID and registered email.  
Complete MFA verification.

### Chunk 2

Enter your employee ID and registered email.  
Complete MFA verification.  
If MFA fails, reset your device token or contact IT support.

### Chunk 3

If MFA fails, reset your device token or contact IT support.  
If your account is locked, wait 15 minutes or ask admin to unlock it.

你会看到：

- chunk 1 和 chunk 2 有重叠
    
- chunk 2 和 chunk 3 也有重叠
    

这个重叠部分就是 **overlap**

---

# 二、embedding 在这里做什么

每个 chunk 都会被转成一个向量。

比如：

- Chunk 1 → 一个 384 维向量
    
- Chunk 2 → 一个 384 维向量
    
- Chunk 3 → 一个 384 维向量
    

如果 **embedding dimension = 384**，那每个 chunk 最后就会变成长度为 384 的数字数组。

这个向量不是给人读的，而是给系统做“语义相似度计算”的。

---

# 三、用户提问时怎么工作

假设用户问：

> I can’t complete MFA when resetting my password. What should I do?

系统先把这个问题也做 embedding，然后去向量库里找最相近的 chunks。

---

## 如果 top-k = 1

系统只取最相关的 1 个 chunk。

可能取到：

### Chunk 2

Enter your employee ID and registered email.  
Complete MFA verification.  
If MFA fails, reset your device token or contact IT support.

这已经足够回答了。

---

## 如果 top-k = 2

系统取前 2 个最相关的 chunks。

可能取到：

### Chunk 2

Enter your employee ID and registered email.  
Complete MFA verification.  
If MFA fails, reset your device token or contact IT support.

### Chunk 3

If MFA fails, reset your device token or contact IT support.  
If your account is locked, wait 15 minutes or ask admin to unlock it.

这样模型上下文更完整，但也更长了。

---

# 四、这四个参数怎么互相配合

现在正式讲它们的配合逻辑。

---

## 1. chunk size 决定“每块放多少信息”

### chunk size 小

例如 100–200 tokens

优点：

- 一块只讲一个小点
    
- 检索更精准
    
- 每块更便宜
    

缺点：

- 一个完整答案可能被拆成多块
    
- 需要更高 top-k
    

### chunk size 大

例如 600–800 tokens

优点：

- 单块更完整
    
- 可能 top-k 不需要太大
    

缺点：

- 容易混入无关信息
    
- 输入 LLM 的 token 更多
    
- 成本更高
    

---

## 2. overlap 决定“边界信息会不会丢”

如果没有 overlap，可能出现这种问题：

### Chunk 1

Complete MFA verification.

### Chunk 2

If MFA fails, reset your device token...

这样如果用户问的是“MFA fails怎么办”，chunk 1 不够，chunk 2 又缺上文。

有 overlap 后，关键信息会同时出现在相邻块里，更容易检索到完整内容。

### overlap 太小

- 边界信息丢失
    

### overlap 太大

- 内容重复太多
    
- 向量库变胖
    
- top-k 结果容易重复
    

---

## 3. top-k 决定“给模型看几块”

### top-k 小

比如 1–2

优点：

- prompt 短
    
- 成本低
    
- latency 低
    

缺点：

- 如果信息分散，可能拿不全
    

### top-k 大

比如 5–8

优点：

- 召回更全
    

缺点：

- prompt 更长
    
- 噪音更多
    
- 成本更高
    
- 模型更容易被干扰
    

---

## 4. embedding dimension 决定“检索表达力”

### 低维

比如 384

优点：

- 更快
    
- 更便宜
    
- 存储更省
    

缺点：

- 语义区分能力可能一般
    

### 高维

比如 1536

优点：

- 语义表达通常更强
    

缺点：

- 更贵
    
- 检索更重
    
- 存储更大
    

---

# 五、最关键的联动关系

## 关系 1

**chunk size 小 → top-k 往往要更大**

因为信息被拆散了。

例子：

如果把“password reset”和“MFA fail handling”拆得很碎，用户一个问题可能要拿 3 块才能拼齐答案。

---

## 关系 2

**chunk size 大 → top-k 可以更小**

因为单块内容更完整。

但坏处是每块也更“杂”，容易带进无关信息。

---

## 关系 3

**overlap 是对 chunk size 的补偿**

如果 chunk 偏小，通常更需要 overlap。  
如果 chunk 已经很大，overlap 可以适当小一点。

---

## 关系 4

**embedding 较弱时，常常需要靠 top-k 弥补**

比如 384 维不够精细，可能检索第一名不是最理想，那就拿 top-3，提高召回率。

但这样成本会上去。

---

## 关系 5

**embedding 越强，不代表可以乱切 chunk**

chunking 设计差，embedding 再强也救不回来。  
所以顺序通常是：

**先把 chunking 设计好，再微调 embedding 和 top-k。**

---

# 六、给你几个具体配置例子

---

## 场景 A：内部 IT helpdesk

特点：

- 问题短
    
- 文档结构清晰
    
- 成本和速度优先
    

推荐起点：

- **chunk size: 300–500**
    
- **overlap: 50**
    
- **top-k: 3**
    
- **embedding dimension: 384 或 768**
    

为什么这样配：

- 300–500 足够装下一个 FAQ 或一个步骤段落
    
- overlap 50 防止边界丢信息
    
- top-k 3 通常能拿到足够上下文
    
- 384/768 兼顾成本和效果
    

---

## 场景 B：法规 / 政策文档

特点：

- 不能断章取义
    
- 上下文依赖强
    

推荐起点：

- **chunk size: 500–800**
    
- **overlap: 80–120**
    
- **top-k: 3–5**
    
- **embedding dimension: 768 或更高**
    

为什么：

- 需要更完整上下文
    
- overlap 要更大，防止切坏条款逻辑
    
- top-k 也要稍多一点
    

---

## 场景 C：API / 技术文档

特点：

- 结构化好
    
- 一段通常讲一个概念
    

推荐起点：

- **chunk size: 300–600**
    
- **overlap: 50–80**
    
- **top-k: 2–4**
    
- **embedding dimension: 384–768**
    

---

# 七、完整 pipeline 长什么样

下面是一个典型 RAG pipeline。

## 阶段 1：文档接入

来源可能是：

- PDF
    
- Word
    
- Confluence
    
- Notion
    
- HTML
    
- 数据库
    
- FAQ 表格
    

---

## 阶段 2：文档解析

把文档转成可处理文本，同时保留 metadata：

- title
    
- section heading
    
- source file
    
- page number
    
- updated time
    
- doc type
    

---

## 阶段 3：清洗

处理这些问题：

- 去掉乱码
    
- 修复换行
    
- 清理页眉页脚
    
- 识别标题和段落
    
- 处理表格/列表/代码块
    

---

## 阶段 4：chunking

按照规则切块：

- chunk size
    
- overlap
    
- 按标题/段落/语义边界切
    

输出像这样：

- chunk_id
    
- chunk_text
    
- source_doc
    
- section
    
- page
    
- token_count
    

---

## 阶段 5：embedding

对每个 chunk 生成向量：

- chunk_text → embedding vector
    

然后存到向量数据库里。

---

## 阶段 6：索引与存储

存入：

- vector DB（如 pgvector / Pinecone / Weaviate / FAISS）
    
- metadata store
    

---

## 阶段 7：用户提问

用户输入问题：

> My MFA fails during password reset. What should I do?

---

## 阶段 8：query embedding

把问题也转成向量。

---

## 阶段 9：retrieval

根据向量相似度搜索：

- top-k = 3
    
- 返回最相关 chunks
    

例如返回：

- chunk 2
    
- chunk 3
    
- chunk 1
    

---

## 阶段 10：prompt assembly

把这些 chunk 拼到 prompt 里，例如：

- system prompt
    
- user question
    
- retrieved context
    

---

## 阶段 11：LLM generation

LLM 根据这些内容生成回答。

---

## 阶段 12：post-processing

可能再做：

- 格式化
    
- 引用来源
    
- 安全审查
    
- 结构化输出
    

---

# 八、你可以把 pipeline 简化记成这样

## 离线阶段

**document → parse → clean → chunk → embed → index**

## 在线阶段

**question → embed → retrieve top-k chunks → prompt → LLM answer**

---

# 九、给你一个完整小例子

## 配置

- chunk size = 400
    
- overlap = 50
    
- top-k = 3
    
- embedding dimension = 384
    

## 文档

IT support article about password reset and MFA

## 用户问题

“I forgot my password and MFA verification keeps failing.”

## 系统流程

1. 文档早已被切成多个 400-token chunks
    
2. 每个 chunk 已经做了 384维 embedding
    
3. 用户问题也做 embedding
    
4. 向量库返回最相关 3 个 chunks
    
5. 把这 3 个 chunks 拼进 prompt
    
6. LLM 输出：
    
    - go to self-service portal
        
    - use employee ID
        
    - if MFA fails, reset device token or contact IT
        
    - if account is locked, wait 15 minutes
        

---

# 十、实际项目里怎么调

如果回答经常“不完整”：

- 增大 chunk size
    
- 或增加 overlap
    
- 或增大 top-k
    

如果回答经常“太啰嗦、带很多无关内容”：

- 减小 chunk size
    
- 或减小 top-k
    
- 或减少 overlap
    

如果检索经常“不准”：

- 先检查 chunking 是否合理
    
- 再考虑 embedding model / embedding dimension
    
- 最后再调 top-k
    

---

# 十一、最实用的一句话

这四个参数的本质是在平衡：

**信息完整性、检索准确率、prompt 长度、成本、延迟。**

一个很好记的起步公式是：

### 对多数企业知识库

- **chunk size: 300–500**
    
- **overlap: 50**
    
- **top-k: 3**
    
- **embedding: 384 或 768**
    

这是一个很常见的起点。

如果你愿意，我下一步可以给你画一个**非常直观的 ASCII 流程图**，把整个 RAG pipeline 和这四个参数标在图上。

可以，我用一个很具体的例子，把这几个概念一次讲清楚。

---

# 一、生成每个 chunk 的 metadata 是干什么的

**metadata = 每个 chunk 的“标签信息”或“附加信息”**

它不是 chunk 的正文内容，而是描述这个 chunk 是什么、从哪里来的、属于谁、何时更新之类的信息。

## 常见 metadata 包括

- `chunk_id`
    
- `document_id`
    
- `document_title`
    
- `source`
    
- `section_title`
    
- `page_number`
    
- `created_at / updated_at`
    
- `language`
    
- `doc_type`
    
- `token_count`
    
- `permissions / department / tenant`
    

## 为什么需要 metadata

主要有 4 个用途。

### 1. 让检索结果可追踪

你检索到一段话后，要知道它来自：

- 哪个文件
    
- 哪一页
    
- 哪个章节
    

不然模型回答完，你都不知道出处。

### 2. 方便做过滤

比如你只想搜：

- IT 文档
    
- 2025 年后的文档
    
- 某个部门可见的文档
    

这就要靠 metadata 来过滤。

### 3. 方便展示引用

比如最终回答里显示：

- 来源：Employee IT Handbook
    
- Section: Password Reset
    
- Page 12
    

这也是 metadata 的作用。

### 4. 方便维护和更新

如果原文档更新了，你可以根据 `document_id` 或 `source` 找到旧 chunks，删掉再重建。

---

## 举个例子

原文档：

**Employee IT Handbook.pdf**

里面有一节：

**Section: Password Reset**

正文：

> If MFA fails, reset your device token or contact IT support.

切完之后，某个 chunk 可能是：

### chunk_text

“If MFA fails, reset your device token or contact IT support.”

### metadata

```json
{
  "chunk_id": "chunk_102",
  "document_id": "doc_8",
  "document_title": "Employee IT Handbook",
  "section_title": "Password Reset",
  "page_number": 12,
  "source": "handbook_2025.pdf",
  "token_count": 18,
  "department": "IT",
  "updated_at": "2026-03-01"
}
```

这就是 metadata。

---

# 二、做 embedding 是干什么的

**embedding = 把一段文本变成一个向量（数字数组）**

这个向量的作用是：  
让机器能比较“语义上像不像”。

因为机器不能直接很好地理解：

- “reset password”
    
- “forgot my password”
    
- “password recovery”
    

这些词虽然不完全一样，但意思接近。  
embedding 的作用就是把意思接近的文本，映射到向量空间里彼此更接近的位置。

---

## 为什么要做 embedding

因为 RAG 检索不是只看关键词，而是看**语义相似度**。

比如用户问：

> I can’t log in because I forgot my password.

知识库里可能没有这句原话，只有：

> Use the self-service portal to reset your password.

如果只靠关键词匹配，未必很好找。  
如果做了 embedding，系统能知道这两句语义相关。

---

## 举例

### 文本 A

“Reset your password using the self-service portal.”

### 文本 B

“I forgot my password and cannot log in.”

这两句字面不同，但意思接近。  
embedding 模型会把它们变成两个向量，比如：

- A → `[0.12, -0.44, 0.78, ...]`
    
- B → `[0.10, -0.41, 0.80, ...]`
    

这些数字你不用人工看懂，系统会用它们算相似度。  
如果两个向量很近，就表示语义接近。

---

# 三、什么是 top-k

**top-k = 检索时取“最相关的前 k 个 chunks”**

- top = 最靠前的
    
- k = 数量
    

比如：

- top-1 = 取最相关 1 个
    
- top-3 = 取最相关 3 个
    
- top-5 = 取最相关 5 个
    

---

## 举个例子

系统里有 5 个 chunks：

### Chunk 1

How to reset your password

### Chunk 2

How to set up MFA

### Chunk 3

VPN login troubleshooting

### Chunk 4

Printer configuration

### Chunk 5

Account locked and unlock steps

用户提问：

> I forgot my password and MFA is not working.

系统算完相似度后，可能得到排序：

1. Chunk 1 — 0.92
    
2. Chunk 2 — 0.88
    
3. Chunk 5 — 0.80
    
4. Chunk 3 — 0.41
    
5. Chunk 4 — 0.12
    

如果 **top-k = 2**，就只返回：

- Chunk 1
    
- Chunk 2
    

如果 **top-k = 3**，就返回：

- Chunk 1
    
- Chunk 2
    
- Chunk 5
    

---

# 四、四个概念一起举例

你想看的是这四个：

- chunk size
    
- chunk overlap
    
- top-k
    
- embedding dimension
    

我用同一个例子说明。

---

## 原始文档

假设这段内容：

> If you forget your password, go to the self-service portal. Enter your employee ID and registered email. Complete MFA verification. If MFA fails, reset your device token or contact IT support. If your account is locked, wait 15 minutes or ask admin to unlock it.

---

## 1. chunk size 是什么

**chunk size = 每个 chunk 最多放多少 token**

比如设置：

### 情况 A：chunk size = 20 tokens

那这段文档会被切得比较碎。

可能变成：

#### Chunk 1

If you forget your password, go to the self-service portal.

#### Chunk 2

Enter your employee ID and registered email. Complete MFA verification.

#### Chunk 3

If MFA fails, reset your device token or contact IT support.

#### Chunk 4

If your account is locked, wait 15 minutes or ask admin to unlock it.

这就是 chunk size 小。

---

### 情况 B：chunk size = 50 tokens

那可能只切成 2 块，甚至 1 块。

#### Chunk 1

If you forget your password... Complete MFA verification...

#### Chunk 2

If MFA fails... account is locked...

这就是 chunk size 大。

---

## 2. chunk overlap 是什么

**chunk overlap = 相邻 chunk 重叠多少 token**

假设：

- chunk size = 20
    
- overlap = 5
    

那么：

### Chunk 1

If you forget your password, go to the self-service portal. Enter your employee ID...

### Chunk 2

Enter your employee ID... Complete MFA verification. If MFA fails...

你会发现：  
“Enter your employee ID...”  
这部分同时出现在 chunk 1 和 chunk 2。

这就是 overlap。

---

## 为什么要 overlap

防止重要内容刚好被切在边界上。

比如一句最关键的话：

> If MFA fails, reset your device token...

如果正好被切断，没有 overlap 就容易丢失完整语义。

---

## 3. top-k 是怎么和它们一起工作的

假设系统里最后有 4 个 chunks：

- Chunk 1：password reset
    
- Chunk 2：MFA verification
    
- Chunk 3：MFA fails handling
    
- Chunk 4：account locked
    

用户问题是：

> MFA fails when I reset my password. What should I do?

检索后相似度可能是：

- Chunk 3 → 0.95
    
- Chunk 2 → 0.84
    
- Chunk 1 → 0.81
    
- Chunk 4 → 0.52
    

### 如果 top-k = 1

只返回 Chunk 3  
优点：快、便宜  
缺点：上下文可能不够完整

### 如果 top-k = 3

返回 Chunk 3 + Chunk 2 + Chunk 1  
优点：更完整  
缺点：token 更多，成本更高

---

## 4. embedding dimension 是什么

**embedding dimension = 向量有多少维**

比如：

- 384 维
    
- 768 维
    
- 1536 维
    

### 类比理解

你可以把它想成“描述语义的坐标数量”。

- 384维：较轻量
    
- 768维：更细一些
    
- 1536维：更丰富，但更重
    

---

## 举例

同一句文本：

> If MFA fails, reset your device token.

如果用：

### 384维 embedding

会变成一个长度为 384 的数组

### 1536维 embedding

会变成一个长度为 1536 的数组

维度越高，通常：

- 表达力更强一些
    
- 存储更多
    
- 检索更重
    
- 成本更高
    

---

# 五、这四个到底怎么配合

现在把四个放在一起看。

---

## 组合例子 1：低成本 helpdesk

- chunk size = 300
    
- overlap = 50
    
- top-k = 3
    
- embedding dimension = 384
    

适合：

- FAQ
    
- 内部 IT 支持
    
- 成本敏感
    
- 响应要快
    

### 含义

- 每块内容适中
    
- 重叠少量，防止切坏
    
- 取 3 块，通常够回答
    
- 向量维度不高，便宜
    

---

## 组合例子 2：更高质量法规问答

- chunk size = 700
    
- overlap = 100
    
- top-k = 4
    
- embedding dimension = 768
    

适合：

- 合规
    
- 政策
    
- 法律条款
    
- 上下文依赖强
    

### 含义

- 每块更大，保留更多上下文
    
- overlap 更大，避免条款断裂
    
- top-k 多一点，确保召回
    
- embedding 更强一些
    

---

# 六、一个特别简单的理解法

## chunk size

决定“每一块装多少文字”

## chunk overlap

决定“相邻块重复多少，避免切坏句子”

## top-k

决定“检索时拿前几块给模型”

## embedding dimension

决定“每块文本用多复杂的向量去表示语义”

---

# 七、一个完整流程小例子

## 文档入库时

1. 读入 Employee IT Handbook
    
2. 切成 4 个 chunks
    
3. 给每个 chunk 加 metadata
    
4. 每个 chunk 做 embedding
    
5. 存入向量库
    

## 用户提问时

问题：

> I forgot my password and MFA keeps failing.

系统做：

1. 把问题做 embedding
    
2. 去向量库找最相近的 chunks
    
3. 按 top-k 取前 3 个
    
4. 拼到 prompt 里给 LLM
    
5. 生成回答
    

---

# 八、最关键的一句话

## metadata 是干什么的

**让 chunk 可追踪、可过滤、可引用、可管理**

## embedding 是干什么的

**把文本变成向量，方便做语义检索**

## top-k 是什么

**检索时取最相关的前 k 个 chunks**

## 四个参数怎么配

**它们一起平衡：信息完整性、检索准确率、成本和延迟**

如果你愿意，我下一步可以直接给你画一个非常直观的 **RAG 示例表格**，把一个文档切成 chunks、附上 metadata、再展示 top-k 检索结果。