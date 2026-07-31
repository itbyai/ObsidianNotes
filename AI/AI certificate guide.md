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