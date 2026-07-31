Understood. I can read the uploaded PDF, and I’ll use it as the **scope authority** for your preparation.

The guide covers the exam version live as of **March 18, 2026** and recommends checking again two weeks before your exam in case the objectives change.

For every lesson, I will:

1. **Start from an exact objective in the guide.** I won’t add adjacent topics merely because they seem relevant.
    
2. **Use current Databricks terminology and behavior.** When terminology has changed since the guide was published, I’ll give the current name and also mention the wording you may encounter in the exam guide.
    
3. **Use only official sources:** `docs.databricks.com` and relevant Databricks Academy material.
    
4. **Cite the official documentation page for each major product or behavioral claim.**
    
5. **Clearly label anything I cannot confirm.** I’ll tell you which official documentation section needs verification rather than infer or guess.
    
6. **Keep practice questions tied to the listed objectives**, without presenting invented objectives as exam content.
    

There are already some naming differences worth handling carefully:

- The guide uses **“Mosaic AI Vector Search”** in its objectives. Current Databricks documentation calls the product **Databricks AI Search** and states that it was formerly known as Databricks Vector Search. I’ll normally say **AI Search**, followed by the exam wording where useful.  
    Official source: [AI Search performance guide](https://docs.databricks.com/aws/en/vector-search/vector-search-best-practices) ([Databricks Documentation](https://docs.databricks.com/gcp/en/vector-search/vector-search-best-practices?utm_source=chatgpt.com "AI Search performance guide | Databricks on Google Cloud"))
    
- The guide refers to Agent Bricks **“Multiagent Supervisor.”** Current documentation uses **Supervisor Agent** for the coordinated multi-agent capability.  
    Official source: [Use Supervisor Agent to create a coordinated multi-agent system](https://docs.databricks.com/gcp/en/agents/agent-bricks/multi-agent-supervisor) ([Databricks Documentation](https://docs.databricks.com/gcp/en/agents/agent-bricks/multi-agent-supervisor?utm_source=chatgpt.com "Use Supervisor Agent to create a coordinated multi-agent system | Databricks on Google Cloud"))
    
- For evaluation, I’ll use the current **MLflow 3 for GenAI** APIs and terminology, including `mlflow.genai.evaluate()`, scorers, judges, and tracing.  
    Official sources: [MLflow 3 for GenAI](https://docs.databricks.com/aws/en/mlflow3/genai/) and [Evaluate GenAI apps during development](https://docs.databricks.com/gcp/en/mlflow3/genai/eval-monitor/concepts/eval-harness) ([Databricks Documentation](https://docs.databricks.com/aws/en/mlflow3/genai/?utm_source=chatgpt.com "MLflow 3 for GenAI | Databricks on AWS"))
    

I’ll follow these rules throughout this conversation. This preference was not saved as cross-conversation memory, so it would need to be provided again in a separate new chat.






As of **31 July 2026**, I found **three confirmed product renames** and **seven names that are transitional, ambiguous, or not clearly confirmed as current products**. The comparison is against the guide version live on **18 March 2026**.

## Confirmed renames

|Old name(s) I might use by mistake|Current name|What it does|
|---|---|---|
|**Mosaic AI Vector Search**, **Databricks Vector Search**, **Vector Search**, Vector Search index/endpoint|**Databricks AI Search**; **AI Search index** and **AI Search endpoint**|It creates managed search indexes over Delta tables for vector-similarity, hybrid, and full-text retrieval in applications such as RAG systems. The official documentation explicitly says it was formerly Databricks Vector Search. ([Databricks Documentation](https://docs.databricks.com/aws/en/vector-search/vector-search?utm_source=chatgpt.com "Databricks AI Search \| Databricks on AWS"))|
|**Agent Bricks Multi-Agent Supervisor**, **Multi-Agent Supervisor**, guide spelling **Multiagent Supervisor**|**Supervisor Agent**|It coordinates multiple agents and tools, delegates tasks among them, and synthesizes their outputs into a final response. Databricks formally announced the rename on 5 February 2026. ([Databricks Documentation](https://docs.databricks.com/aws/en/release-notes/product/2026/february?utm_source=chatgpt.com "February 2026 \| Databricks on AWS"))|
|**Genie Spaces**, **Genie Space**, sometimes **AI/BI Genie space**|**Genie Agents**, singular **Genie Agent**|It provides a domain-specific natural-language interface that converts business questions into SQL and returns results tables and visualizations over governed data. Current documentation explicitly states that Genie Agents were formerly known as Genie Spaces. ([Databricks Documentation](https://docs.databricks.com/aws/en/genie-agents/?utm_source=chatgpt.com "Genie Agents \| Databricks on AWS"))|

## Uncertain or transitional terminology

|Old or guide terminology|Current terminology I would use|What it does and why I am uncertain|
|---|---|---|
|**Genie Conversation API**, **conversational API**|**Genie Agents API**, specifically its **Conversation APIs**|It lets applications conduct stateful natural-language data conversations with a Genie Agent, including follow-up questions and conversation history; I found no explicit formal rename notice, although the current documentation page is titled “Use the Genie Agents API.” ([Databricks Documentation](https://docs.databricks.com/gcp/en/genie/conversation-api?utm_source=chatgpt.com "Use the Genie Agents API \| Databricks on Google Cloud"))|
|**Mosaic AI Gateway**, **AI Gateway**|**Unity AI Gateway** for the new central governance layer; **AI Gateway for serving endpoints** for the previous endpoint-scoped implementation|It governs model, agent, and MCP traffic through permissions, routing, rate limits, guardrails, usage monitoring, and request/response logging; this is **not a clean one-to-one rename**, because current documentation distinguishes the new Unity AI Gateway from the previous AI Gateway for serving endpoints. ([Databricks Documentation](https://docs.databricks.com/aws/en/ai-gateway/?utm_source=chatgpt.com "AI governance with Unity AI Gateway \| Databricks on AWS"))|
|**Usage Tables** in the guide’s AI Gateway objective|**Governed usage tables**, usage tracking through **system tables**, including `system.billing.usage` where applicable|They record usage information for monitoring activity and costs; I am unsure whether the capitalized **Usage Tables** in the guide denotes a formal standalone product, because current documentation generally describes a capability or governed/system tables rather than a separately named product. ([Databricks Documentation](https://docs.databricks.com/aws/en/ai-gateway/ai-governance?utm_source=chatgpt.com "AI governance guide \| Databricks on AWS"))|
|**Agent Monitoring**, possibly **Mosaic AI Agent Monitoring**|**MLflow 3 for GenAI production monitoring** or **Monitor apps in production**|It continuously evaluates production traces using scorers and LLM judges to detect quality, safety, and operational problems; I could not find an official statement saying “Agent Monitoring was renamed to MLflow 3,” so this appears to be a capability absorbed into the MLflow 3 lifecycle rather than a confirmed rename. ([Databricks Documentation](https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor?utm_source=chatgpt.com "Evaluate and monitor AI agents \| Databricks on AWS"))|
|**Mosaic AI Agent Framework**, **Agent Framework**|No confirmed single replacement; current documentation commonly uses **AI agents on Databricks** or **custom agents**, with **Databricks Apps** recommended for deployment|It provides the surrounding Databricks capabilities for authoring, tracing, evaluating, deploying, and monitoring custom agents; the term Agent Framework still appears in documentation paths and some current content, so I would not claim that it has formally been renamed. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-framework/author-agent?utm_source=chatgpt.com "Author an AI agent and deploy it on Databricks Apps \| Databricks on AWS"))|
|**Mosaic AI Agent endpoint**, **Agent Framework endpoint**|**Agent deployed on Databricks Apps** for the recommended current approach, or **agent hosted on a Model Serving endpoint** for the older approach|It exposes an authenticated API through which an application can invoke an agent; I could not confirm **Mosaic AI Agent endpoint** as a current formal product name, and current documentation explicitly distinguishes Apps-hosted agents from legacy Model Serving-hosted agents. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-framework/query-agent?utm_source=chatgpt.com "Query an agent deployed on Databricks \| Databricks on AWS"))|
|**Workspace Feature Store**, `databricks-feature-store`, or the guide’s informal **feature store table**|**Databricks Feature Store**, **feature table in Unity Catalog**, and the `databricks-feature-engineering` package|It registers and governs reusable ML features and supports lineage, point-in-time joins, training, batch inference, and online lookup; the guide’s lowercase phrase may be generic, but Workspace Feature Store and the old Python package are deprecated in favor of Unity Catalog and `databricks-feature-engineering`. ([Databricks Documentation](https://docs.databricks.com/gcp/en/machine-learning/feature-store/workspace-feature-store/?utm_source=chatgpt.com "Workspace Feature Store (deprecated) \| Databricks on Google Cloud"))|
|**managed web browser MCP server**|No exact current product confirmed; closest terms are **web search on Databricks**, the Supervisor API’s built-in `databricks_web_search` tool, or an **external web-search MCP server**|It gives an agent access to current public-web information; the exact phrase appears only as an incorrect sample-question option—the guide’s answers select D and E instead—and I could not find that exact managed MCP product in current documentation. ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/web-search?utm_source=chatgpt.com "Web search on Databricks \| Databricks on AWS"))|

The most important exam translation is:

> **Vector Search → AI Search**  
> **Multi-Agent Supervisor → Supervisor Agent**  
> **Genie Spaces → Genie Agents**

For the remaining rows, I would learn both the guide wording and the current terminology because the guide may still test concepts using transitional names.


### Section 1: Design Applications

1. **Prompt design:** Write instructions that make the model return information in the exact structure or format the application needs.
    
2. **Model task selection:** Decide which AI task—such as summarisation, classification, extraction, or generation—best meets the business requirement.
    
3. **Chain design:** Choose and connect the right components so that each step transforms the input into the required final output.
    
4. **Requirements translation:** Convert a business goal into a clear definition of what data the AI pipeline receives and what result it must produce.
    
5. **Tool orchestration:** Decide which tools an agent needs and the order in which it should use them to gather information, reason through the task, or take actions.
    
6. **Agent Bricks selection:** Know when to use Agent Bricks capabilities such as Knowledge Assistant, Supervisor Agent—called “Multiagent Supervisor” in the guide—or Information Extraction instead of building everything manually.
### Section 2: Data Preparation

1. **Chunking:** Choose how to split documents into smaller pieces based on the document structure and the model’s token or context limits.
    
2. **Content cleaning:** Remove irrelevant or low-quality material that could confuse retrieval and reduce the accuracy of a RAG application.
    
3. **Document extraction:** Select the right Python library for reading text and content from the source file format you are given.
    
4. **Preparing Delta tables:** Know the steps and correct order for storing chunked text in Delta Lake tables governed by Unity Catalog.
    
5. **Source selection:** Identify which documents contain the reliable and relevant knowledge needed by the RAG application.
    
6. **Retrieval evaluation:** Use appropriate tools and metrics to measure whether the retriever is returning useful and relevant information.
    
7. **Advanced chunking:** Design more sophisticated chunking approaches when basic fixed-size splitting is not enough for the document structure or retrieval needs.
    
8. **Reranking:** Understand how reranking reorders initially retrieved results so that the most relevant items are placed first.
### Section 3: Application Development

1. **Framework selection:** Choose an appropriate development framework, such as LangChain or a similar tool, for building the generative AI application.
    
2. **Response review:** Examine model answers for common quality and safety problems, such as incorrect, irrelevant, harmful, or poorly written responses.
    
3. **Chunking improvement:** Adjust the document chunking strategy based on the results of model and retrieval evaluations.
    
4. **Prompt enrichment:** Add relevant context to a prompt by identifying important fields, terms, and user intent in the input.
    
5. **Prompt optimisation:** Rewrite or refine a prompt so that the model’s output moves from its current baseline toward the desired result.
    
6. **Guardrails:** Add controls that reduce the risk of unsafe, harmful, inappropriate, or otherwise undesirable model behaviour.
    
7. **LLM selection:** Choose the language model whose capabilities, size, cost, latency, and other characteristics best fit the application.
    
8. **Embedding context length:** Choose an embedding model that can handle the expected document chunks and queries while meeting the application’s quality, cost, and performance goals.
    
9. **Model-card selection:** Use model metadata and model cards in a model hub or marketplace to decide whether a model is suitable for a particular task.
    
10. **Metric-based comparison:** Compare experimental metrics to determine which candidate model performs best for the required task.
    
11. **Agent development:** Use MLflow and Databricks agent-development capabilities to build, trace, evaluate, and manage agentic systems.
    
12. **Evaluation versus monitoring:** Understand that evaluation measures application quality during development or testing, while monitoring tracks its behaviour after deployment.
    
13. **Multi-agent data access:** Allow a multi-agent system to use Genie Agents—called Genie Spaces in the guide—or the conversational API to retrieve governed business data.
### Section 4: Assembling and Deploying Applications

1. **Custom model packaging:** Build an MLflow `pyfunc` model that runs preprocessing before the main chain and post-processing after it.
    
2. **Endpoint security:** Control which users, service principals, and applications can access the resources used by a model serving endpoint.
    
3. **Basic chain implementation:** Write a straightforward sequence of model and processing steps that meets the stated requirements.
    
4. **RAG components:** Identify the model format, embedding model, retriever, dependencies, sample inputs, and model signature needed to package a RAG application.
    
5. **Model registration:** Use MLflow to register a model in Unity Catalog so it can be governed, versioned, and deployed.
    
6. **Search index usage:** Create and query a Databricks AI Search index, called a Vector Search index in the guide, to retrieve relevant information.
    
7. **Serving with Foundation Model APIs:** Know how to expose an LLM application that calls Databricks Foundation Model APIs.
    
8. **AI Search concepts:** Understand the main parts of Databricks AI Search, called Mosaic AI Vector Search in the guide, and how they work together.
    
9. **Batch inference:** Recognize workloads that should process many records together and know when to use the SQL `ai_query()` function.
    
10. **Search configuration:** Choose an AI Search setup based on data size, update frequency, response-time requirements, and cost.
    
11. **Persistent state:** Set up durable storage for information an application must remember or reuse between processing steps or conversations.
    
12. **CI/CD:** Automate safe testing and promotion of search indexes, prompts, and individual agent components across environments.
    
13. **MCP integration:** Choose and connect managed, external, or custom Model Context Protocol servers according to the application’s tool and data-access requirements.
    
14. **Prompt lifecycle:** Version prompts, track their history, and manage how they are tested, promoted, and rolled back.
    
15. **User interface:** Choose an appropriate interactive front end—such as a Databricks App, Slack, or Teams—through which users can work with the agent.