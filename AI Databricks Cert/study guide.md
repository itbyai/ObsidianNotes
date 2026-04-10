# Databricks Certified Generative AI Engineer Associate

## Hands-On Lab Guide

**37 Labs · 8 Modules · Every Exam Objective Covered**

Prepare for the [Databricks Certified Generative AI Engineer Associate](https://www.databricks.com/learn/certification/genai-engineer-associate) exam  
**(March 18, 2026 version)**  
through progressive hands-on labs covering every exam objective.

**Estimated completion:** 4 weeks (~1–2 hours/day)

---

# Contents

- [1. Program Overview](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#1-program-overview)
    
- [2. Quick Start](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#2-quick-start)
    
- [3. Learning Workflow](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#3-learning-workflow)
    
- [4. Repository Structure](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#4-repository-structure)
    
- [5. Databricks UI Navigation Map](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#5-databricks-ui-navigation-map)
    
- [6. Module Guide](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#6-module-guide)
    
    - [Module 00 — Foundations](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-00--foundations)
        
    - [Module 01 — Design Applications (14%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-01--design-applications-14)
        
    - [Module 02 — Data Preparation (14%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-02--data-preparation-14)
        
    - [Module 03 — Application Development (30%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-03--application-development-30)
        
    - [Module 04 — Assembling & Deploying (22%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-04--assembling--deploying-22)
        
    - [Module 05 — Governance (8%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-05--governance-8)
        
    - [Module 06 — Evaluation & Monitoring (12%)](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-06--evaluation--monitoring-12)
        
    - [Module 07 — Capstone Project](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#module-07--capstone-project)
        
- [7. 4-Week Study Schedule](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#7-4-week-study-schedule)
    
- [8. Exam Objective → Lab Cross-Reference](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#8-exam-objective--lab-cross-reference)
    
- [9. Key Resources](https://chatgpt.com/c/69d8f118-3f08-83a1-abcc-d1df4f98a6a9#9-key-resources)
    

---

# 1. Program Overview

## What this guide is

This guide is a complete hands-on learning path for the **Databricks Certified Generative AI Engineer Associate** exam.

It is designed to help you pass the exam by working through:

- **37 labs**
    
- **8 modules**
    
- **Every exam objective**
    

The program is structured as a practical lab curriculum rather than a theory-only study guide.

---

## Recommended pacing

|Duration|Recommended Effort|
|---|---|
|**4 weeks**|**~1–2 hours/day**|

---

## What you will learn

Across this guide, you will build practical skills in:

- Prompt design and chain architecture
    
- Document extraction and chunking
    
- Vector search and RAG pipelines
    
- LangChain and Databricks integrations
    
- Agents, guardrails, and PII handling
    
- MLflow evaluation and monitoring
    
- Deployment, serving, governance, and CI/CD
    

---

# 2. Quick Start

## Environment Reference

|Item|Value|
|---|---|
|**Catalog**|`workspace`|
|**Schema**|`workspace.genai_labs`|
|**Model**|`databricks-meta-llama-3-3-70b-instruct`|
|**Start here**|`00_foundations/00_aws_setup_cost_guardrails.ipynb`|

---

# 3. Learning Workflow

## Copy-paste workflow

1. Open a lab notebook in this repo (locally or on GitHub)
    
2. In Databricks, click **Workspace** in the left nav → navigate to your folder
    
3. Create a new notebook: click **+** → **Notebook**
    
4. Name it to match the lab (for example, `01_workspace_orientation`)
    
5. Copy each code cell from the lab into the Databricks notebook
    
6. Run cells with `Shift+Enter`
    

> **Instructor Note**  
> Each lab tells you exactly which Databricks UI tab to open and what to click.

> **Important**  
> SQL labs (`.sql` files) should be run in the **SQL Editor** instead of a notebook.

---

# 4. Repository Structure

```text
Databricks-Certified-Generative-AI-Engineer-Associate/
│
├── 00_foundations/                          # Platform basics (no GenAI yet)
│   ├── 00_aws_setup_cost_guardrails.ipynb      START HERE
│   ├── 01_workspace_orientation.ipynb
│   ├── 02_unity_catalog_basics.ipynb
│   └── 03_first_llm_call.ipynb
│
├── 01_design_applications/                 # Prompt design & architecture (14%)
│   ├── 01_prompt_engineering.ipynb
│   ├── 02_model_task_selection.ipynb
│   ├── 03_chain_design.ipynb
│   └── 04_agent_bricks.ipynb
│
├── 02_data_preparation/                    # Document-to-vector pipeline (14%)
│   ├── 01_document_extraction.ipynb
│   ├── 02_chunking_strategies.ipynb
│   ├── 03_delta_lake_pipeline.ipynb
│   ├── 04_retrieval_evaluation.ipynb
│   └── 05_reranking.ipynb
│
├── 03_application_development/             # LangChain, agents, guardrails (30%)
│   ├── 01_langchain_on_databricks.ipynb
│   ├── 02_prompt_augmentation.ipynb
│   ├── 03_guardrails_and_pii.ipynb
│   ├── 04_embedding_model_selection.ipynb
│   ├── 05_model_selection_from_hub.ipynb
│   ├── 06_agent_framework.ipynb
│   └── 07_multi_agent_genie.ipynb
│
├── 04_assembling_deploying/                # End-to-end deployment (22%)
│   ├── 01_pyfunc_chain.ipynb
│   ├── 02_vector_search_index.ipynb
│   ├── 03_rag_deployment_pipeline.ipynb
│   ├── 04_foundation_model_apis.ipynb
│   ├── 04b_persistent_memory.ipynb
│   ├── 05_batch_inference_ai_query.sql
│   ├── 06_cicd_agent_components.ipynb
│   ├── 07_mcp_servers.ipynb
│   ├── 08_apps_and_interfaces.ipynb
│   └── 09_code_your_own_agent.ipynb
│
├── 05_governance/                          # PII, licensing, compliance (8%)
│   ├── 01_pii_masking_guardrails.ipynb
│   └── 02_data_licensing.ipynb
│
├── 06_evaluation_monitoring/               # Evaluate & monitor in production (12%)
│   ├── 01_mlflow_rag_evaluation.ipynb
│   ├── 02_llm_judges_and_scorers.ipynb
│   ├── 03_inference_tables_monitoring.ipynb
│   ├── 04_ai_gateway.ipynb
│   └── 05_sme_feedback_loop.ipynb
│
└── 07_capstone/                            # Full integration project
    └── full_rag_agent_app.ipynb
```

---

# 5. Databricks UI Navigation Map

Every lab tells you where to click.  
Use the map below as your interface reference during the course.

|Menu Item|Where It's Used|
|---|---|
|**Catalog**|All labs — Unity Catalog is the backbone|
|**Compute**|Module 00 — create and manage clusters|
|**Playground**|Modules 00, 01 — prototype prompts interactively|
|**Discover (Beta)**|Module 01 — explore available models and datasets|
|**Marketplace**|Module 01 — browse and install models|
|**SQL Editor**|Modules 02, 04 — write and run SQL against Delta tables|
|**SQL Warehouses**|Module 02 — the compute layer for SQL workloads|
|**Queries**|Module 02 — save and reuse SQL queries|
|**Query History**|Module 02 — inspect past SQL executions|
|**Data Ingestion**|Module 02 — ingest source documents into Databricks|
|**Features**|Module 03 — feature store for structured retrieval data|
|**Experiments**|Modules 03, 06 — MLflow experiment runs and evaluations|
|**Models**|Module 04 — Unity Catalog model registry|
|**Serving**|Module 04 — deploy and manage model endpoints|
|**Jobs & Pipelines**|Module 04 — scheduling index sync pipelines|
|**Runs**|Module 04 — view pipeline and job run history|
|**AI Gateway (Beta)**|Module 06 — rate limiting, inference tables, usage tracking|
|**Dashboards**|Module 06 — visualize evaluation and monitoring metrics|
|**Alerts**|Module 06 — set alerts on monitoring metric thresholds|
|**Genie**|Module 03 — natural language queries over structured data|

---

# 6. Module Guide

## Module 00 — Foundations

> **UI:** Compute, Catalog, Playground  
> **Estimated time:** ~2 hours

### Purpose

Get comfortable with Databricks before touching GenAI tooling.  
No GenAI concepts yet — pure platform orientation.

### Labs

|Lab|What You'll Do|
|---|---|
|**00-00: AWS Setup & Cost Guardrails**|Configure billing alerts, set spending limits, understand cost drivers|
|**00-01: Workspace Orientation**|Create a cluster, run a notebook, read/write Delta tables, understand classic vs serverless compute|
|**00-02: Unity Catalog Basics**|Navigate the 3-level namespace (`catalog.schema.table`), create your personal schema, learn GRANT/REVOKE|
|**00-03: Your First LLM Call**|Use the Playground, export code to a notebook, call the Foundation Model API via OpenAI SDK|

---

## Module 01 — Design Applications (14%)

> **UI:** Playground, Discover, Marketplace  
> **Exam weight:** ~6 questions

### Purpose

Translate business requirements into AI pipeline designs and prompts.

### Labs

|Lab|What You'll Do|
|---|---|
|**01-01: Prompt Engineering**|Zero-shot, few-shot, chain-of-thought prompting; structured output (JSON); system prompts; temperature effects|
|**01-02: Model Task Selection**|NLP task taxonomy (summarization, classification, QA, feature extraction, token classification); BoW vs TF-IDF vs embeddings deep dive; NER & POS tagging|
|**01-03: Chain Design**|Pipeline architecture (retriever -> prompt -> LLM -> parser); ReAct agent pattern; Router chain intent routing|
|**01-04: Agent Bricks**|Knowledge Assistant, Multiagent Supervisor, Information Extraction; match scenarios to brick types|

---

## Module 02 — Data Preparation (14%)

> **UI:** SQL Editor, Queries, Query History, SQL Warehouses, Data Ingestion, Catalog  
> **Exam weight:** ~6 questions

### Purpose

Build the document-to-vector pipeline that powers RAG applications.

### Labs

|Lab|What You'll Do|
|---|---|
|**02-01: Document Extraction**|`pytesseract` (images), `pypdf` (PDFs), `beautifulsoup4` (HTML); filter headers/footers; Feature Store for structured data|
|**02-02: Chunking Strategies**|Fixed-size, structure-aware, token-based, hierarchical (parent-child); chunk size vs precision trade-offs|
|**02-03: Delta Lake Pipeline**|Full extract -> clean -> chunk -> Delta pipeline; Change Data Feed for Vector Search sync|
|**02-04: Retrieval Evaluation**|Precision@K, Recall@K, MRR, MAP@K, nDCG, context relevancy, context sufficiency|
|**02-05: Re-ranking**|Two-stage retrieval: vector search (50 candidates) -> cross-encoder re-ranker (top 5)|

---

## Module 03 — Application Development (30%)

> **UI:** Playground, Genie, Features, Experiments  
> **Exam weight:** ~14 questions — the heaviest section

### Purpose

Build real LangChain chains, guardrails, and agents on Databricks.

### Labs

|Lab|What You'll Do|
|---|---|
|**03-01: LangChain on Databricks**|`ChatDatabricks` chains; LLMChain vs LCEL; RAG chain ordering; `RunnableParallel` multi-modal; `MessagesPlaceholder` multi-turn; `RunnableSequence`; `CallbackHandler`|
|**03-02: Prompt Augmentation**|Core RAG pattern (retrieve -> inject -> generate); user session data enrichment|
|**03-03: Guardrails and PII**|Input guardrails (prompt injection detection); PII masking (emails, phones, credit cards); output validation|
|**03-04: Embedding Model Selection**|Context length, embedding dimension, model size trade-offs; cosine similarity vs Levenshtein vs Jaccard|
|**03-05: Model Selection from Hub**|Model cards; license, params, benchmarks (MMLU, HumanEval, MT-Bench); multilingual tokenization|
|**03-06: Agent Framework**|`@tool` decorator, `create_tool_calling_agent()`, `AgentExecutor`; MLflow tracing; Unity Catalog registration|
|**03-07: Multi-Agent & Genie**|Genie for structured queries; feature tables; query routing; evaluation vs monitoring|

---

## Module 04 — Assembling & Deploying (22%)

> **UI:** Models, Serving, Jobs & Pipelines, Runs, Catalog  
> **Exam weight:** ~10 questions

### Purpose

Deploy your RAG application end-to-end on Databricks.

### Labs

|Lab|What You'll Do|
|---|---|
|**04-01: PyFunc Chain**|Wrap RAG pipeline in MLflow PyFunc with pre/post-processing; log to MLflow|
|**04-02: Vector Search Index**|Delta Sync vs Direct Vector Access; ANN vs hybrid queries; `.query()` and `.similarity_search()` API|
|**04-03: RAG Deployment Pipeline**|Full deploy sequence (chunk -> Delta -> index -> chain -> MLflow -> UC -> endpoint); access control|
|**04-04: Foundation Model APIs**|Pay-per-token vs provisioned throughput; HIPAA compliance; fine-tuned model support|
|**04-04b: Persistent Memory**|Delta-backed conversation memory; agent state checkpointing; buffer vs summary vs structured memory|
|**04-05: Batch Inference**|`ai_query()` SQL function for offline enrichment of large datasets|
|**04-06: CI/CD**|MLflow Prompt Registry; component tests; dev -> staging -> prod environment promotion|
|**04-07: MCP Servers**|Managed (UC functions), external (Slack/GitHub), custom; governed tool access|
|**04-08: Apps & Interfaces**|Databricks Apps, Slack, Teams, REST API; conversational wrappers|
|**04-09: Code Your Own Agent**|Agent app templates; OpenAI Agents SDK; MLflow AgentServer; `databricks apps deploy`; local dev with `uv`; framework comparison|

---

## Module 05 — Governance (8%)

> **UI:** Catalog (permissions), SQL Editor  
> **Exam weight:** ~4 questions

### Purpose

Small section but governance concepts appear in questions across all domains.

### Labs

|Lab|What You'll Do|
|---|---|
|**05-01: PII Masking & Guardrails**|Static preprocessing (recommended) vs inference-time instructions vs full exclusion|
|**05-02: Data Licensing**|Apache 2.0, MIT, CC BY, CC BY-NC, CC BY-SA, proprietary; GDPR implications|

---

## Module 06 — Evaluation & Monitoring (12%)

> **UI:** Experiments, AI Gateway, Dashboards, Alerts  
> **Exam weight:** ~5 questions

### Purpose

Evaluate quality before deployment, monitor it after.

### Labs

|Lab|What You'll Do|
|---|---|
|**06-01: MLflow RAG Evaluation**|`mlflow.genai.evaluate()` with built-in scorers; ground-truth vs reference-free; quality root-cause sequence|
|**06-02: LLM Judges & Scorers**|`Guidelines` class; custom Python scorers; ROUGE-L, BLEU, human preference metrics|
|**06-03: Inference Tables & Monitoring**|Log requests/responses to Delta; Agent Monitoring; dashboards|
|**06-04: AI Gateway**|Rate limiting; inference tables; usage tables; alerts|
|**06-05: SME Feedback Loop**|Export -> annotate -> golden dataset -> re-evaluate -> promote|

---

## Module 07 — Capstone Project

> **UI:** All of the above  
> **Estimated time:** 4–6 hours

### Purpose

Build a complete, production-grade customer support agent for **"Fabrikam Industrial Supplies"** that integrates every skill from the previous modules.

### Capstone Scope

- RAG with Vector Search over company knowledge base
    
- Real-time order lookup via Unity Catalog tool
    
- PII masking + input guardrails
    
- PyFunc packaging with pre/post-processing
    
- Unity Catalog registration + Model Serving endpoint
    
- Inference tables from day one
    
- Component tests before deployment
    
- MLflow evaluation against golden dataset
    
- AI Gateway rate limiting and usage tracking
    

---

# 7. 4-Week Study Schedule

|Week|Modules|Focus|Exam Weight|
|---|---|---|---|
|**Week 1**|00 + 01 + 02|Platform foundations, prompt design, data pipeline|28%|
|**Week 2**|03|Application development — the heaviest domain|30%|
|**Week 3**|04 + 05|Deployment, governance, CI/CD|30%|
|**Week 4**|06 + 07 + review|Evaluation, monitoring, capstone, practice questions|12%|

---

# 8. Exam Objective → Lab Cross-Reference

## Section 1 — Design Applications (14%)

|Exam Objective|Lab(s)|
|---|---|
|Design prompts for formatted responses|01-01, 03-02|
|Select model tasks for business requirements|01-02|
|Feature extraction (BoW, TF-IDF, embeddings)|01-02|
|Token classification (NER, POS tagging)|01-02|
|Select chain components|01-03|
|Router chain pattern|01-03|
|Agent Bricks (Knowledge Assistant, Multiagent Supervisor, Info Extraction)|01-04|

---

## Section 2 — Data Preparation (14%)

|Exam Objective|Lab(s)|
|---|---|
|Identify needed source documents for RAG|02-01|
|Document extraction (`pytesseract`, `pypdf`, `beautifulsoup4`)|02-01|
|Feature Store for structured data|02-01|
|Chunking strategies and trade-offs|02-02|
|Write chunks to Delta Lake / Unity Catalog|02-03|
|Retrieval evaluation metrics (Precision@K, MRR, nDCG)|02-04|
|Re-ranking|02-05|

---

## Section 3 — Application Development (30%)

|Exam Objective|Lab(s)|
|---|---|
|LangChain on Databricks (`ChatDatabricks`)|03-01|
|LLMChain (legacy) vs LCEL|03-01|
|`RunnableParallel` and multi-modal chains|03-01|
|`RunnableSequence`|03-01|
|`ChatPromptTemplate` + `MessagesPlaceholder`|03-01|
|`CallbackHandler`|03-01|
|RAG chain ordering (query -> retriever -> prompt -> LLM)|03-01|
|Prompt augmentation / RAG pattern|03-02|
|Guardrails and PII masking|03-03, 05-01|
|Embedding model selection|03-04|
|Cosine similarity vs other distance metrics|03-04|
|Model selection from hub / model cards|03-05|
|Multilingual tokenization|03-05|
|Agent Framework with MLflow tracing|03-06|
|`@tool` decorator, `AgentExecutor`|03-06|
|Multi-agent systems / Genie Spaces|03-07|
|Evaluation vs monitoring phases|03-07, 06-01|

---

## Section 4 — Assembling & Deploying (22%)

|Exam Objective|Lab(s)|
|---|---|
|PyFunc chain with pre/post-processing|04-01|
|Vector Search index creation and querying|04-02|
|Vector Search `.query()` / `.similarity_search()` API|04-02|
|RAG deployment sequence|04-03|
|Endpoint access control (service principals, tokens, GRANT)|04-03|
|Foundation Model API types (pay-per-token vs provisioned)|04-04|
|Persistent datastore for memory and structured information|04-04b|
|Batch inference with `ai_query()`|04-05|
|CI/CD best practices (prompts, indexes, environments)|04-06|
|MCP servers (managed / external / custom)|04-07|
|Apps and user-facing interfaces|04-08|
|Code Your Own Agent (agent templates, MLflow AgentServer, `databricks apps deploy`)|04-09|

---

## Section 5 — Governance (8%)

|Exam Objective|Lab(s)|
|---|---|
|PII masking approaches (static preprocessing vs inference-time)|05-01|
|Data licensing and legal risk (CC BY-NC, CC BY-SA, GDPR)|05-02|

---

## Section 6 — Evaluation & Monitoring (12%)

|Exam Objective|Lab(s)|
|---|---|
|MLflow evaluation with built-in scorers|06-01|
|LLM judges, `Guidelines`, custom scorers|06-02|
|ROUGE-L, BLEU, human preference metrics|06-02|
|Inference tables and Agent Monitoring|06-03|
|AI Gateway (rate limiting, usage tables, inference tables)|06-04|
|SME feedback loop|06-05|

---

# 9. Key Resources

|Resource|Link|
|---|---|
|Official exam guide (March 2026)|[Databricks Certification Page](https://www.databricks.com/learn/certification/genai-engineer-associate)|
|Databricks Academy (free courses)|[Databricks Training](https://www.databricks.com/learn/training)|
|Vector Search docs|[Databricks Vector Search Documentation](https://docs.databricks.com/aws/en/vector-search/vector-search)|
|MLflow GenAI docs|[MLflow GenAI Documentation](https://mlflow.org/docs/latest/genai)|
|Foundation Model APIs|[Databricks Foundation Model APIs](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/)|
|Agent Framework|[Databricks Agent Framework](https://docs.databricks.com/aws/en/generative-ai/agent-framework/)|
|LangChain + Databricks|[LangChain Databricks Integration](https://python.langchain.com/docs/integrations/providers/databricks/)|
|Unity Catalog docs|[Databricks Unity Catalog Documentation](https://docs.databricks.com/aws/en/data-governance/unity-catalog/)|

---

## Built for learning by doing

_Every lab runs in Databricks — no local setup required._