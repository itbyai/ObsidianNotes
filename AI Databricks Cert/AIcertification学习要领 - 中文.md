
# Databricks Generative AI Engineer Associate 学习整理版（Part 1）

## 一、考试整体框架

这份材料提到考试主要分成 6 大板块，本文覆盖前 4 个大块的主要内容：

1. **Design Applications** — 应用设计
    
2. **Data Preparation** — 数据准备
    
3. **Application Development** — 应用开发
    
4. **Assembling and Deploying Apps** — 组装与部署
    
5. **Governance** — 治理
    
6. **Evaluation and Monitoring** — 评估与监控
    

这个认证主要考察你是否能在 Databricks 上设计并实现 **LLM 应用、RAG 应用、链式调用、模型部署、向量检索、MLflow 生命周期管理，以及 Unity Catalog 治理**。

---

# 二、清洗后的核心知识点

## 1. 应用设计 Design Applications

### 1.1 Prompt 设计

核心目标是让模型输出**明确、稳定、格式正确**的结果。

应掌握：

- 清晰指令：明确告诉模型要做什么
    
- 上下文：给足背景信息
    
- 输入内容：说明模型要处理什么
    
- 输出格式：例如 JSON、表格、固定字段
    
- 使用分隔符：例如 `###`、```、`[]`、`{}` 区分说明和上下文
    
- 减少幻觉：直接要求“不知道就说不知道”
    
- Zero-shot / Few-shot / Prompt Chaining
    

可记成一句话：  
**好 Prompt = 指令清晰 + 上下文充分 + 输入明确 + 输出格式固定**

---

### 1.2 根据业务需求选择模型任务

先不要急着选模型，要先拆业务目标。

步骤：

1. 明确业务目标
    
2. 将目标拆成子任务
    
3. 给每个子任务匹配模型能力
    
4. 决定这些任务的顺序和关系
    
5. 再选择合适模型和框架
    

例如客服场景可以拆成：

- 情感分析
    
- FAQ 检索
    
- 回复生成
    

重点不是“选哪个最强模型”，而是：  
**业务目标 → 任务拆解 → 模型能力映射**

---

### 1.3 Chain / Agent 组件选择

一个完整链路通常包含：

- Prompt
    
- Retriever
    
- Tool / Function Calling
    
- LLM
    
- 可能还有后处理逻辑
    

常见框架：

- LangChain
    
- LlamaIndex
    
- OpenAI Agents
    

你要知道的不是框架 API 细节，而是：  
**一个链是怎么由“检索 + 工具 + 推理 + 输出”拼起来的。**

---

### 1.4 把业务目标翻译成 AI Pipeline 的输入输出

考试可能不直接问代码，而是问：

- 输入是什么？
    
- 输出是什么？
    
- 中间需要哪些处理步骤？
    
- 哪个模型最适合？
    

需要考虑：

- 数据质量
    
- 模型性能 / 成本 / 速度
    
- 组件之间如何集成
    
- 如何测试与优化
    

---

### 1.5 Tool / Agent 的推理与动作排序

这是 Agent 设计的重点。

关键模式：

- **ReAct**：Reason → Act → Observe
    
- **Tool Use / Function Calling**
    
- **Planning**
    
- **Multi-Agent Collaboration**
    

你要会判断：

- 这是单步任务还是多步任务
    
- 哪些工具先用，哪些后用
    
- 检索工具和执行工具如何组合
    

---

## 2. 数据准备 Data Preparation

### 2.1 Chunking 策略

Chunking 是 RAG 非常核心的考点。

常见策略：

- 按句子/段落/章节切
    
- 固定 token 数切
    
- 带上下文摘要的 chunking
    
- 窗口式 chunking
    

考虑因素：

- 模型上下文窗口大小
    
- 文档结构
    
- 检索精度 vs 上下文完整性
    
- 是否要保留前后文
    

原则：

- **小 chunk**：更利于精准检索
    
- **大 chunk**：保留更多上下文
    
- 需要通过实验找平衡点
    

---

### 2.2 清理无关内容，提升 RAG 质量

源文档中很多内容会干扰检索质量，需要清洗。

要去掉的典型噪音：

- 广告
    
- 页眉页脚
    
- 导航栏
    
- 无关结构化文本
    
- 错别字或格式噪音
    

目的：  
**减少无关信息进入 embedding 和 retrieval 流程。**

---

### 2.3 文档抽取工具选择

不同文档格式适合不同提取方式。

原文提到的方向包括：

- PDF 文本提取工具
    
- OCR 工具（图片型文档需要）
    
- 适合不同格式的内容抽取库
    

考试重点不是背包名，而是理解：

- 文本型 PDF：直接抽取
    
- 扫描件 / 图片型 PDF：OCR
    
- HTML / doc / 其他结构化文档：选对应解析器
    

---

### 2.4 Chunk 后写入 Delta Lake / Unity Catalog

标准流程可整理为：

1. 文档提取文本
    
2. 清洗文本
    
3. 切 chunk
    
4. 计算 embedding
    
5. 写入 Delta 表
    
6. 注册到 Unity Catalog
    
7. 后续供 Vector Search 使用
    

还要知道：

- 可以用工作流自动更新
    
- 可以用 Delta Live Tables 做编排
    
- 数据治理和元数据管理由 Unity Catalog 承担
    

---

### 2.5 选择 RAG 所需的知识源文档

要选：

- 相关性高的
    
- 质量高的
    
- 准确、完整、可靠的
    
- 覆盖面足够广的
    

不是“文档越多越好”，而是：  
**知识源要对任务真正有帮助。**

---

### 2.6 Prompt/Response Pair 选择

这是训练或评估数据视角。

要看：

- 是否和任务一致
    
- 是否上下文充分
    
- 是否无偏差、无明显错误
    
- 标签是否清晰
    

例如：

- 情感分析：正向 / 负向 / 中性
    
- 问答：事实型 / 观点型 / 建议型
    

---

### 2.7 检索效果评估

原文强调几个重要指标：

- Context Precision
    
- Context Recall
    
- Faithfulness
    
- Answer Relevancy
    
- Answer Correctness
    

还提到：

- 可用 MLflow 做评估
    
- 可用 LLM-as-a-Judge
    
- 区分 Offline Evaluation 和 Online Evaluation
    
- 某些任务可用 BLEU / ROUGE 等专项指标
    

考试常见思路：  
**检索质量不好，不一定是模型问题，可能是 chunking、embedding、知识源、prompt 或 retriever 的问题。**

---

## 3. 应用开发 Application Development

### 3.1 构建检索与抽取工具

你需要知道一个典型 RAG 数据准备链路包括：

- 文档抽取
    
- chunking
    
- embedding
    
- 存储到向量库
    
- 检索返回上下文
    

难点：

- 文档结构复杂
    
- 图片与文本混合
    
- 逻辑段落不能被随意打断
    

---

### 3.2 选择 LangChain 或类似框架

重点不是“某个框架最强”，而是：

- 它是否能串起 prompt、memory、retriever、tools、LLM
    
- 是否方便与 Databricks 集成
    
- 是否支持向量检索、链路管理、部署
    

---

### 3.3 Prompt 格式如何影响模型输出

Prompt 的写法会直接影响：

- 是否跑题
    
- 是否幻觉
    
- 是否格式正确
    
- 是否能更好利用检索到的上下文
    

常见提升方式：

- 加上下文
    
- 加输出格式要求
    
- 明确角色和任务
    
- 给示例
    

---

### 3.4 定性评估回复质量和安全性

不只是看“答没答出来”，还要看：

- 是否有幻觉
    
- 是否有偏见
    
- 是否不完整
    
- 是否泄露敏感信息
    
- 是否存在安全风险
    

---

### 3.5 根据模型与检索表现调整 Chunking

Chunking 不应一次定死，而应根据实验调整。

你要会理解：

- Chunk 太小，可能上下文不够
    
- Chunk 太大，可能检索不精准
    
- 最终方案要靠评估指标和实际任务验证
    

---

### 3.6 Prompt Augmentation

即把检索到的额外上下文注入 prompt。

本质就是：  
**用户问题 + 相关上下文 + 指令模板 → 更准确的回答**

这是 RAG 的核心套路之一。

---

### 3.7 调整 Prompt 让输出从“基础版”变成“目标版”

通过以下方式优化输出：

- 更明确的指令
    
- 限定风格
    
- 限定格式
    
- Few-shot 示例
    
- 调整温度等参数
    

---

### 3.8 Guardrails 与 Metaprompt

两个高频考点：

#### Guardrails

用于阻止负面结果：

- 系统提示限制
    
- 安全过滤器
    
- 专门安全模型
    

#### Metaprompt

用于降低：

- 幻觉
    
- 私密数据泄露
    
- 不合规输出
    

你要理解：  
**Prompt 是引导，Guardrail 是约束。**

---

### 3.9 Agent Prompt Template 与 Function Exposure

Agent 类题目常见考法：

- 如何在 prompt 中暴露可用函数
    
- 如何让模型知道每个工具是做什么的
    
- 如何让模型按正确格式调用工具
    

---

### 3.10 选择最佳 LLM / Embedding Model

选型维度包括：

- 任务类型
    
- 准确率
    
- 成本
    
- 推理速度
    
- 上下文长度
    
- 是否开源
    
- 部署要求
    
- 合规要求
    

Embedding model 还要考虑：

- 文档长度
    
- 查询长度
    
- chunk 大小
    
- 上下文窗口
    
- 检索精度
    

---

### 3.11 从 Model Hub / Marketplace 选模型

要会看：

- model card
    
- metadata
    
- 适用任务
    
- 限制条件
    
- 授权方式
    
- 性能指标
    

---

### 3.12 根据实验指标选模型

不是靠感觉选，而是根据实验数据：

- 通用指标
    
- 任务专项指标
    
- 不同模型对比结果
    
- 准确率 / 成本 / 延迟的平衡
    

---

## 4. 组装与部署 Assembling and Deploying Applications

### 4.1 用 pyfunc 封装链路

MLflow pyfunc 很重要。

作用：

- 把模型封装成统一 Python 接口
    
- 包含前处理和后处理
    
- 方便部署和复用
    

前处理可能包括：

- 清洗输入
    
- 格式转换
    
- 特征准备
    

后处理可能包括：

- 格式化输出
    
- 过滤内容
    
- 转换成目标结构
    

---

### 4.2 模型服务端点的权限控制

考试会考安全与权限。

要点：

- endpoint access control
    
- RBAC
    
- Unity Catalog 治理
    
- 最小权限原则
    
- 访问日志监控
    

---

### 4.3 编写简单链路

你要知道简单 chain 的构成：

- 输入
    
- prompt 模板
    
- LLM
    
- 输出
    

如果带检索，则再加：

- retriever
    
- embeddings
    
- vector store
    

---

### 4.4 RAG 应用最基本组件

一个基础 RAG 应用通常需要：

- LLM / model flavor
    
- Embedding model
    
- Retriever
    
- Vector store / index
    
- Dependencies
    
- Input examples
    
- Model signature
    

这部分非常像“搭积木”，考试喜欢问缺哪一块。

---

### 4.5 用 MLflow 注册模型到 Unity Catalog

要掌握的概念：

- 模型注册
    
- 版本管理
    
- 生命周期管理
    
- 与 Unity Catalog 集成
    
- 权限与血缘跟踪
    

你不一定要死记代码，但要知道流程：

1. log model
    
2. register model
    
3. 在 UC 中管理版本
    
4. 加载并推理
    
5. 批量或实时使用
    

---

### 4.6 RAG 部署步骤排序

一个基础 RAG 应用部署顺序可整理为：

1. 准备源文档
    
2. 提取与清洗内容
    
3. Chunk
    
4. 生成 embedding
    
5. 写入 Delta
    
6. 创建 Vector Search Index
    
7. 选择生成模型
    
8. 组装 retriever + LLM chain
    
9. 部署 serving endpoint
    
10. 提供实时查询能力
    

---

### 4.7 创建与查询 Vector Search Index

需要理解：

- Index 通常基于 embeddings 构建
    
- 可与 Delta 表同步
    
- 支持近似最近邻检索
    
- 可通过 REST API 或 Python SDK 查询
    
- 与 Unity Catalog 集成治理
    

---

### 4.8 使用 Foundation Model APIs 提供服务

考试会考：

- 如何通过 Databricks 提供的大模型 API 进行服务
    
- 如何部署 endpoint
    
- 如何处理请求
    
- 如何配置资源和扩缩容
    

---

### 4.9 服务 RAG 所需资源

主要包括：

- 计算资源：CPU / GPU
    
- 存储资源：Delta 表、embeddings、索引
    
- 检索资源：Vector Search
    
- 日志监控：Inference Logging
    
- 伸缩能力：应对不同负载
    

---

# 三、这份材料里可删掉的“无关/低价值内容”

下面这些对备考帮助不大，已经建议忽略：

- 作者自我介绍、资历背书
    
- “Databricks is the best platform...” 这类宣传性话术
    
- Medium 订阅/关注/链接引导
    
- “更多视频”、“Stay tuned for part 2” 之类运营内容
    
- 零碎代码片段中与考试概念无关的实现细节
    
- 一些框架名的堆砌但没有区分适用场景的部分
    

---

# 四、真正值得你记住的高频主线

如果你要快速抓重点，可以只记下面这 10 条：

1. **好 Prompt 的四要素**：指令、上下文、输入、输出格式
    
2. **业务需求先拆任务，再选模型**
    
3. **RAG 核心链路**：文档 → 清洗 → chunk → embedding → 向量检索 → prompt augmentation → LLM 输出
    
4. **Chunking 直接影响检索质量**
    
5. **需要清洗文档噪音，否则 RAG 质量会下降**
    
6. **检索评估要看 precision / recall / faithfulness / relevancy / correctness**
    
7. **Guardrails 和 Metaprompt 用于控制风险、减少幻觉、避免泄露**
    
8. **基础 RAG 组件**：embedding model、retriever、vector index、LLM、dependencies、signature
    
9. **MLflow + Unity Catalog** 用于模型注册、版本管理、治理与部署
    
10. **Databricks 部署重点**：Vector Search、Serving Endpoint、Foundation Model APIs、权限控制、监控日志
    

---



# Databricks Generative AI Engineer Associate

## Cleaned Study Notes (Part 2)

## 1. Governance

### 1.1 Use masking techniques as guardrails

这一部分的核心是：为了避免敏感信息泄露，同时兼顾系统性能，需要在数据和推理流程中使用合适的 **masking** 技术。文中提到的典型方法包括：

- tokenization
    
- anonymization
    
- pseudonymization
    

这些 masking 可以应用在多个阶段：

- 输入预处理阶段
    
- 数据存储阶段
    
- 模型推理阶段
    

重点不是只记术语，而是理解：  
**masking 是一种 guardrail，用来减少隐私泄露和合规风险，同时要兼顾性能目标。**

---

### 1.2 Guardrails against malicious user input

这一点主要是防御恶意输入，尤其是 GenAI 应用中常见的：

- prompt injection
    
- harmful input
    
- inappropriate content
    
- malicious manipulation of context
    

文中提到的 guardrail techniques 包括：

- input validation
    
- context-aware filtering
    
- prompt sanitization
    

还特别提到可以学习 **Llama Guard** 这一类安全模型。  
核心理解是：

**Guardrails 不只是防止“说错话”，还包括防御恶意用户故意操纵模型行为。**  
同时 guardrails 需要持续测试和更新，因为攻击方式会不断变化。

---

### 1.3 Mitigating problematic text in RAG data sources

如果 RAG 的知识源本身存在问题，比如：

- bias
    
- misinformation
    
- inappropriate content
    

那么即使模型本身不错，最终输出也可能有问题。文中给出的方向包括：

- text normalization
    
- offensive term filtering
    
- domain-specific stopword lists
    
- using more reputable / moderated external data sources
    

重点是：  
**问题文本治理要尽可能前移，在数据源阶段处理，而不是只依赖模型阶段兜底。**

---

### 1.4 Legal and licensing requirements for data sources

这一点偏治理与合规，主要是防止使用数据时引发法律风险。

需要注意：

- 了解数据集的 license
    
- 确认 intended use 是否被许可
    
- 对数据来源和 license 做记录
    
- 必要时与 legal 团队确认
    
- 定期审计数据使用情况
    

考试层面的关键理解是：  
**不仅要关心数据质量，也要关心数据是否“能合法使用”。**  
这在 Databricks Marketplace 或外部数据源选择时尤其重要。

---

## 2. Evaluation and Monitoring

### 2.1 Select an LLM based on quantitative evaluation metrics

这一部分强调：模型选择不能只靠直觉，要基于量化指标。

文中提到的重要指标包括：

- Context Precision
    
- Context Recall
    
- Faithfulness
    
- Answer Relevancy
    
- Answer Correctness
    

此外，还要考虑：

- 模型大小与架构的权衡
    
- 小模型：更快、更便宜
    
- 大模型：通常更强，但成本更高
    
- 实时应用与批处理应用的成本差异
    

文中还提到 **LLM-as-a-Judge** 的一些实践建议，例如：

- 用较小的评分尺度，例如 1–3 或 1–5
    
- 给评分示例和理由
    
- 使用 additive scoring
    
- 高 token 上限模型更适合做复杂评估
    

核心思想是：  
**模型选型 = 质量指标 + 成本 + 延迟 + 部署场景的平衡。**

---

### 2.2 Select monitoring metrics for a deployment scenario

部署后要持续监控，不然模型上线以后出问题很难及时发现。

文中提到应关注的指标包括：

- latency
    
- throughput
    
- accuracy
    
- resource utilization
    

对于 LLM / RAG 应用，还要特别关注：

- context precision
    
- relevancy
    
- faithfulness
    

并建议通过 MLflow 等工具持续记录与可视化这些指标。  
还提到可以借助：

- alerts
    
- dashboards
    
- automated notifications
    

来提升监控能力。

重点理解：  
**传统 ML 监控指标和 LLM 特有质量指标都要看。**

---

### 2.3 Evaluate RAG performance using MLflow

这一点比较直接：  
MLflow 可以用来评估 RAG 应用，并比较不同模型版本、参数配置、检索策略的效果。

MLflow 可用于记录：

- parameters
    
- metrics
    
- artifacts
    

所以它不只是做实验管理，也能成为 **RAG evaluation workflow** 的核心工具。  
考试常见考点是理解 MLflow 在 RAG 场景中的作用，而不是死记某段代码。

---

### 2.4 Use inference logging to assess deployed RAG applications

这是非常重要的一点。上线后的 RAG 应用不能只看“能不能回答”，还要通过推理日志分析真实表现。

文中提到 inference logging 可以记录：

- input queries
    
- retrieved contexts
    
- generated outputs
    
- optional ground-truth labels
    

这些日志可用于：

- 分析延迟
    
- 评估准确性和相关性
    
- 发现异常模式
    
- 跟踪长期表现趋势
    
- 设置关键指标告警
    

文中还提到 inference tables 可用于自动记录，并支持对 PII、输入规则等做处理。  
这说明 **inference logging 是生产环境评估和持续优化的重要基础。**

---

### 2.5 Understand Databricks monitoring types

文中列了 3 种 monitoring 类型：

#### 1. Time series

适用于按时间窗口观察数据质量指标的变化趋势。

#### 2. InferenceLog

适用于记录模型请求日志的表。  
每一行通常表示一次请求，包含：

- timestamp
    
- model input
    
- prediction
    
- optional ground truth
    

这种监控适合看模型在生产中的表现变化。

#### 3. Snapshot

适用于其他类型的表。  
它会对整张表做数据质量监控，每次 refresh 都处理整个表。

此外，文中提到可以通过 Unity Catalog table 的 **Quality tab** 开启 Monitoring，也给了使用 SDK 创建 monitor 的代码示例。  
考试层面更重要的是理解三种监控模式分别适合什么场景。

---

### 2.6 Use Databricks features to control LLM cost

成本控制是 GenAI 应用落地中的关键问题。

文中提到的主要思路包括：

- 选择合适大小的模型
    
- 优化检索策略
    
- 对非实时任务采用 batch processing
    
- 跟踪资源使用情况
    
- 利用 auto-scaling
    
- 使用 resource tagging 进行资源管理
    

这部分的核心逻辑是：

**成本控制不是只靠换便宜模型，而是要从模型、检索、调度、资源分配几个层面一起优化。**

---

# 3. 可以清理掉的无关内容

以下内容对考试复习帮助不大，可以忽略：

- Medium 订阅和邮箱输入提示
    
- 作者推广内容
    
- “stay tuned” 类运营文案
    
- 某些零散代码细节本身
    
- 重复强调“学习某某 solution”但没有展开的表述
    

---

# 4. 这部分真正要记住的高频主线

如果压缩成最重要的几点，可以记下面这些：

1. **Governance 不只是权限控制，还包括隐私保护、恶意输入防御、问题文本治理、数据 license 合规。**
    
2. **Masking 是 guardrail 的一部分，用于减少敏感信息泄露。**
    
3. **Prompt injection 和恶意输入需要通过 input validation、filtering、sanitization 等方式防御。**
    
4. **RAG 的问题很多源于知识源本身，因此数据源治理很重要。**
    
5. **模型选型要基于量化评估指标，而不是只看模型大小或名气。**
    
6. **监控不只看 latency 和 throughput，还要看 LLM 特有指标，如 faithfulness、relevancy、context precision。**
    
7. **MLflow 是 RAG 评估和版本比较的重要工具。**
    
8. **Inference logging / inference tables 是生产环境持续评估的关键基础。**
    
9. **Databricks monitoring 有 Time series、InferenceLog、Snapshot 三类。**
    
10. **LLM 成本控制要从模型、检索、批处理、自动扩缩容、资源管理多方面入手。**
    

---

# 5. 一句话总结

这部分内容的主旨可以概括为：

**Databricks GenAI Engineer Associate 的后半部分重点考察你是否能在真实生产环境中，安全、合规、可监控、可评估、可控成本地运行 LLM 和 RAG 应用。**
