I’ll treat **“Design Applications”** as the Databricks GenAI/AI application-design skill: converting a business requirement into the right combination of **prompt → model → data/tools → orchestration → output**. Everything below is based only on official Databricks documentation. The links point to the exact official doc pages.

## 1. Core concept

A Databricks AI application can be as simple as:

```text
User Input
    ↓
Prompt
    ↓
LLM
    ↓
Response
```

or as complex as:

```text
User
  ↓
Agent
  ├── SQL / structured data
  ├── AI Search / documents
  ├── API / MCP tool
  └── another agent
  ↓
Final response
```

Databricks explicitly describes AI applications as ranging from **simple LLM calls to complex agent systems**. Agents combine a model's general intelligence with organization-specific data, APIs, and tools. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com "Concepts: AI on Databricks | Databricks on AWS"))  
[Official doc: Concepts — AI on Databricks](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com)

The most important design principle is:

> **Start simple and add agentic complexity only when the use case requires it.**

Databricks describes a continuum:

```text
LLM + Prompt
     ↓
Deterministic Chain
     ↓
Single Agent
     ↓
Multi-Agent System
```

Moving to the right gives more flexibility but also more latency, orchestration complexity, debugging difficulty, and potential failure modes. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Agent system design patterns](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

That diagram is probably the single most useful thing to remember for **Design Applications**.

---

# 2. Start from the business requirement

Before choosing an LLM or framework, convert the business requirement into:

```text
Input
→ required knowledge
→ required reasoning/actions
→ output
```

For example:

> "Build an assistant that tells hospital analysts the latest admission statistics."

Translate that into:

```text
Input:
natural-language question

Knowledge:
structured admissions tables

Actions:
query data / calculate aggregates

Output:
natural-language answer + numbers
```

Compare that with:

> "Build an assistant that answers questions about hospital policies."

Now the design becomes:

```text
Input:
natural-language question

Knowledge:
policy PDFs/documents

Action:
retrieve relevant passages

Output:
grounded answer
```

Databricks distinguishes **general intelligence**—what an LLM learned during training—from **data intelligence**, which comes from your organization's tables, APIs, documents, vector indexes, etc. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com "Concepts: AI on Databricks | Databricks on AWS"))  
[Official doc: General intelligence vs data intelligence](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com)

This distinction tells you whether a plain LLM is sufficient.

---

# 3. Choosing the application design

This is the key decision table.

|Requirement|Prefer|
|---|---|
|Generic generation/question answering|LLM + prompt|
|Fixed sequence of known steps|Deterministic chain|
|Need private documents|RAG / Knowledge Assistant|
|Need dynamic choice between tools|Single agent|
|Several independent specialist domains|Multi-agent / Supervisor Agent|
|Extract fields from documents|Information Extraction / `ai_extract`|
|Known SQL-style AI transformation|Task-specific AI Function|
|Need custom prompt/model/output format|`ai_query`|

Databricks officially recommends this progression. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Agent system design patterns](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

Let's examine each.

---

## 4. Design #1 — LLM + prompt

Example:

```text
Input:
"Rewrite this customer complaint professionally."

        ↓

LLM

        ↓

professional text
```

Use it when no proprietary knowledge or external action is needed.

Typical tasks include:

- summarization
    
- rewriting
    
- translation
    
- classification
    
- extraction
    
- generation
    

Databricks provides both task-specific AI Functions and general-purpose `ai_query`. ([Databricks Documentation](https://docs.databricks.com/aws/en/large-language-models/ai-functions?utm_source=chatgpt.com "Enrich data using AI Functions | Databricks on AWS"))  
[Official doc: AI Functions](https://docs.databricks.com/aws/en/large-language-models/ai-functions?utm_source=chatgpt.com)

For example, there are purpose-built functions including `ai_translate`, `ai_summarize`, `ai_classify`, `ai_extract`, `ai_parse_document`, and others. ([Databricks Documentation](https://docs.databricks.com/aws/en/large-language-models/ai-functions?utm_source=chatgpt.com "Enrich data using AI Functions | Databricks on AWS"))  
[Official doc: AI Functions — task-specific functions](https://docs.databricks.com/aws/en/large-language-models/ai-functions?utm_source=chatgpt.com)

### When NOT to use an agent

Suppose the requirement is:

> Translate customer comments into English.

You do **not** need:

```text
Agent
→ reason
→ choose translation tool
→ translate
```

Use:

```sql
ai_translate(...)
```

Databricks recommends starting with a task-specific AI Function when one already matches the objective. ([Databricks Documentation](https://docs.databricks.com/aws/en/large-language-models/ai-query "Use ai_query | Databricks on AWS"))  
[Official doc: When to use ai_query](https://docs.databricks.com/aws/en/large-language-models/ai-query?utm_source=chatgpt.com)

---

# 5. Prompt design

Suppose the requirement is:

> Extract severity and category from support tickets.

A weak prompt:

```text
Analyze this ticket.
```

A better design clearly defines:

```text
ROLE
TASK
INPUT
RULES
OUTPUT
```

For example:

```text
You classify support tickets.

For the provided ticket:

1. Assign category:
   LOGIN
   BILLING
   PERFORMANCE
   OTHER

2. Assign priority:
   LOW
   MEDIUM
   HIGH

3. Explain the result briefly.

Ticket:
{ticket}
```

But if downstream software requires JSON, don't rely solely on:

```text
"Return JSON."
```

Databricks supports **structured outputs**, where the application specifies a JSON schema using `response_format`. ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/structured-outputs "Structured outputs on Databricks | Databricks on AWS"))  
[Official doc: Structured outputs on Databricks](https://docs.databricks.com/aws/en/machine-learning/model-serving/structured-outputs?utm_source=chatgpt.com)

So:

```text
Prompt formatting
```

and:

```text
machine-enforced output schema
```

are different things.

That distinction is important.

---

# 6. Design #2 — Deterministic chain

Suppose your application always does:

```text
Question
   ↓
Retrieve documents
   ↓
Insert documents into prompt
   ↓
LLM
   ↓
Answer
```

There is no reason for an LLM to decide:

> "Should I retrieve documents?"

You already know the answer is yes.

This is a **deterministic chain**.

Databricks defines deterministic chains as workflows in which the developer specifies which tools/models run, in what order, and with which parameters. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Deterministic chain](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

Advantages include:

```text
predictable
auditable
easy to test
usually lower latency
```

while the main disadvantage is reduced flexibility. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Deterministic chain advantages and considerations](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

---

# 7. RAG is often a deterministic chain

A simple RAG system does:

```text
User Question
      ↓
Retrieve
      ↓
Relevant Documents
      ↓
Augment Prompt
      ↓
LLM
      ↓
Answer
```

Databricks describes the fundamental RAG stages as:

```text
Retrieval
Augmentation
Generation
```

([Databricks Documentation](https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation?utm_source=chatgpt.com "RAG (Retrieval Augmented Generation) on Databricks | Databricks on AWS"))  
[Official doc: RAG on Databricks](https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation?utm_source=chatgpt.com)

Use RAG when the application needs information that is:

```text
proprietary
domain-specific
frequently changing
```

rather than relying only on the LLM's pretrained knowledge. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation?utm_source=chatgpt.com "RAG (Retrieval Augmented Generation) on Databricks | Databricks on AWS"))  
[Official doc: RAG use cases](https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation?utm_source=chatgpt.com)

---

# 8. Design #3 — Single-agent system

Now imagine the requirement:

> Build an IT assistant.

Users might ask:

```text
"What is our password policy?"
```

or:

```text
"Check whether server ABC is running."
```

or:

```text
"Open a support ticket."
```

The workflow isn't fixed.

The application must decide:

```text
question
   ↓
LLM reasons
   ↓
which tool?
   ├── knowledge search
   ├── server status API
   └── ticket API
```

That's where a **single agent** makes sense.

Databricks describes a single-agent system as one where an LLM dynamically decides which tools to use, when to make additional model calls, and when to stop. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Single-agent system](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

Databricks describes this pattern as a good default or "sweet spot" for many enterprise use cases because it offers dynamic behavior without full multi-agent complexity. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Single-agent advantages](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

---

# 9. Tools: knowledge versus action

Think of agent tools in two categories.

### Knowledge tools

```text
search documentation
query SQL
query vector index
retrieve customer record
```

### Action tools

```text
send email
create ticket
update record
call API
run code
```

Databricks defines tools as capabilities beyond text generation, including searching documents, querying tables, calling external APIs, and running code. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-framework/agent-tool?utm_source=chatgpt.com "MCPs and agent tools | Databricks on AWS"))  
[Official doc: MCPs and agent tools](https://docs.databricks.com/aws/en/agents/agent-framework/agent-tool?utm_source=chatgpt.com)

A tool should ideally perform a **well-defined task with clear inputs and outputs**. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com "Concepts: AI on Databricks | Databricks on AWS"))  
[Official doc: Agent tools concept](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com)

Example:

```python
get_order_status(order_id)
```

is much better than:

```python
do_customer_stuff(input)
```

because the model can understand when and how to invoke it.

---

# 10. Tool ordering

Sometimes tool order should be deterministic.

Example:

```text
get_customer()
      ↓
get_orders(customer_id)
      ↓
check_return_policy(order)
      ↓
create_return(order)
```

You probably don't want an LLM to randomly execute:

```text
create_return()
```

before checking eligibility.

But another system might require dynamic reasoning:

```text
Question
 ↓
Agent
 ├─ maybe search documentation
 ├─ maybe query database
 ├─ maybe call API
 └─ maybe ask user for clarification
```

The design question is therefore:

> **Does the workflow itself require intelligence?**

If no:

```text
chain
```

If yes:

```text
agent
```

This is exactly the distinction Databricks makes between deterministic chains and agent systems. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Chains vs agents](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

---

# 11. Unity Catalog functions as tools

Suppose you have:

```text
customer_id
```

and need:

```sql
SELECT ...
FROM customers
WHERE customer_id = ?
```

You can expose a Unity Catalog function as an agent tool.

Databricks specifically recommends Unity Catalog functions for **structured retrieval where the query is already known and the agent provides parameters**. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/custom-agents/create-custom-tool?utm_source=chatgpt.com "Create agent tools using Unity Catalog functions | Databricks on AWS"))  
[Official doc: Create agent tools using Unity Catalog functions](https://docs.databricks.com/aws/en/agents/custom-agents/create-custom-tool?utm_source=chatgpt.com)

For many other integrations, Databricks recommends MCP servers or implementing the logic directly in agent code. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/custom-agents/create-custom-tool?utm_source=chatgpt.com "Create agent tools using Unity Catalog functions | Databricks on AWS"))  
[Official doc: UC functions vs MCP servers](https://docs.databricks.com/aws/en/agents/custom-agents/create-custom-tool?utm_source=chatgpt.com)

---

# 12. Design #4 — Multi-agent

Now suppose the application covers:

```text
Finance
HR
IT
Sales
Legal
```

You could create one enormous agent with:

```text
40 tools
huge system prompt
many unrelated instructions
```

but this becomes difficult to manage.

Instead:

```text
                  Supervisor
                     ↓
     ┌───────────────┼───────────────┐
     ↓               ↓               ↓
Finance Agent     HR Agent       IT Agent
```

Databricks recommends multi-agent designs when you have distinct domains, specialized contexts, or a tool set too large for a single agent to manage comfortably. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Multi-agent systems](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

---

# 13. Supervisor Agent

Databricks has a managed **Supervisor Agent** for this pattern.

It can coordinate things including:

```text
Genie Agents
agent endpoints
Unity Catalog functions
MCP servers
custom agents
```

and delegate work between them. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-bricks/multi-agent-supervisor?utm_source=chatgpt.com "Use Supervisor Agent to create a coordinated multi-agent system | Databricks on AWS"))  
[Official doc: Supervisor Agent](https://docs.databricks.com/aws/en/agents/agent-bricks/multi-agent-supervisor?utm_source=chatgpt.com)

Conceptually:

```text
Question:
"Analyze sales decline and determine whether customer complaints increased."

               Supervisor
               /        \
              /          \
      Sales Agent      Support Agent
          ↓                 ↓
       SQL data         ticket data
              \           /
               \         /
              synthesis
                  ↓
                answer
```

That's a good Supervisor use case because there are genuinely different specialist domains.

---

# 14. Knowledge Assistant

Use **Knowledge Assistant** primarily for domain-specific question-answering over organizational knowledge.

Databricks categorizes Knowledge Assistant as a guided way to build and optimize domain-specific QA chatbots. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents?utm_source=chatgpt.com "Build agents on Databricks | Databricks on AWS"))  
[Official doc: Build agents on Databricks](https://docs.databricks.com/aws/en/agents?utm_source=chatgpt.com)

Conceptually:

```text
Company PDFs
Policies
Documentation
       ↓
Knowledge Assistant
       ↓
"How does our leave policy work?"
```

So if an exam/business requirement says:

> "Users need to ask natural-language questions over a collection of company documents."

Think:

```text
Knowledge Assistant
```

before thinking:

```text
custom multi-agent architecture
```

---

# 15. Information Extraction

Information Extraction solves a very different problem.

Input:

```text
Invoice PDF
```

Output:

```json
{
  "invoice_id": "...",
  "vendor": "...",
  "amount": 1250,
  "date": "..."
}
```

Databricks Information Extraction converts unstructured text/documents into structured information according to a defined schema. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-bricks/info-extraction?utm_source=chatgpt.com "Information Extraction | Databricks on AWS"))  
[Official doc: Information Extraction](https://docs.databricks.com/aws/en/agents/agent-bricks/info-extraction?utm_source=chatgpt.com)

It is appropriate for things such as contracts, invoices, and records where known fields must be extracted. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-bricks/info-extraction?utm_source=chatgpt.com "Information Extraction | Databricks on AWS"))  
[Official doc: Information Extraction examples](https://docs.databricks.com/aws/en/agents/agent-bricks/info-extraction?utm_source=chatgpt.com)

So:

```text
Question answering over documents
        → Knowledge Assistant

Extract fields from documents
        → Information Extraction
```

This distinction is worth memorizing.

---

# 16. Model task selection

Another Design Applications question is:

> What type of model operation does the application need?

Databricks Foundation Model APIs distinguish at least:

```text
Chat
Completion
Embedding
```

Chat supports conversation-style requests; completion generates responses from prompts; embedding converts strings into numerical embedding vectors. ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/api-reference?utm_source=chatgpt.com "Foundation model REST API reference | Databricks on AWS"))  
[Official doc: Foundation Model REST API](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/api-reference?utm_source=chatgpt.com)

Think:

```text
Generate answer
→ chat / generation

Semantic search
→ embedding

RAG
→ embeddings/retrieval + generation
```

Don't choose an embedding model to generate an answer.

Embeddings produce vectors, not natural-language responses. ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/api-reference?utm_source=chatgpt.com "Foundation model REST API reference | Databricks on AWS"))  
[Official doc: Embeddings API](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/api-reference?utm_source=chatgpt.com)

---

# 17. When to use `ai_query`

`ai_query` is the general-purpose option when you want explicit control over:

```text
model
prompt
model parameters
output format
```

([Databricks Documentation](https://docs.databricks.com/aws/en/large-language-models/ai-query "Use ai_query | Databricks on AWS"))  
[Official doc: ai_query](https://docs.databricks.com/aws/en/large-language-models/ai-query?utm_source=chatgpt.com)

But Databricks explicitly recommends starting with a task-specific AI Function if one already matches your problem. ([Databricks Documentation](https://docs.databricks.com/aws/en/large-language-models/ai-query "Use ai_query | Databricks on AWS"))  
[Official doc: When to use ai_query](https://docs.databricks.com/aws/en/large-language-models/ai-query?utm_source=chatgpt.com)

So:

```text
Translate
→ ai_translate

Extract structured fields
→ ai_extract

Classify
→ ai_classify

Custom reasoning/prompt
→ ai_query
```

is a useful decision pattern.

---

# 18. Common mistakes

The most common design error is **over-engineering**.

### Mistake: using multi-agent immediately

Bad:

```text
simple FAQ
   ↓
Supervisor
   ↓
5 agents
   ↓
10 tools
```

Better:

```text
LLM
```

or:

```text
Knowledge Assistant
```

Databricks explicitly recommends starting simple and adding complexity gradually. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Practical advice for agent design](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

### Mistake: making a dynamic agent for a fixed pipeline

If every request always follows:

```text
retrieve → prompt → generate
```

use a deterministic chain.

You gain predictability and easier testing. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Deterministic chains](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

### Mistake: giving an agent every available tool

Databricks advises giving agents only the tools and context they require instead of large amounts of irrelevant context or APIs. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Agent development guidance](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

### Mistake: ignoring loops

Tool-calling agents can repeatedly invoke tools or get stuck in loops. Databricks recommends iteration limits or timeouts. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Single-agent considerations](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

### Mistake: using free-form text when downstream code expects structure

Use structured output such as JSON Schema instead. Databricks supports schema-constrained output through `response_format` / `responseFormat`. ([Databricks Documentation](https://docs.databricks.com/aws/en/machine-learning/model-serving/structured-outputs "Structured outputs on Databricks | Databricks on AWS"))  
[Official doc: Structured outputs](https://docs.databricks.com/aws/en/machine-learning/model-serving/structured-outputs?utm_source=chatgpt.com)

### Mistake: assuming the LLM knows company data

Use RAG, SQL tools, Genie, Knowledge Assistant, etc., when your application depends on organization-specific data. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com "Concepts: AI on Databricks | Databricks on AWS"))  
[Official doc: Data intelligence](https://docs.databricks.com/aws/en/agents/concepts?utm_source=chatgpt.com)

---

# 19. One runnable Databricks example

This example demonstrates three Design Applications ideas simultaneously:

```text
business requirement
↓
prompt
↓
model
↓
defined output schema
```

Run it in Databricks SQL or a SQL notebook cell:

```sql
WITH tickets AS (
  SELECT *
  FROM VALUES
    ('Customer cannot log in after resetting their password.')
  AS t(ticket_text)
)

SELECT
  ticket_text,

  ai_query(
    'databricks-gpt-oss-20b',

    'Classify this support ticket.
     Determine:
     - category
     - priority
     - short reason

     Ticket: ' || ticket_text,

    responseFormat =>
      'STRUCT<
         category:STRING,
         priority:STRING,
         reason:STRING
       >'
  ) AS classification

FROM tickets;
```

Databricks documents `ai_query` as a general-purpose AI Function that invokes Model Serving/Foundation Model endpoints, and it supports `responseFormat` for structured output from chat foundation models. ([Databricks Documentation](https://docs.databricks.com/aws/en/sql/language-manual/functions/ai_query "ai_query function | Databricks on AWS"))  
[Official doc: ai_query function reference](https://docs.databricks.com/aws/en/sql/language-manual/functions/ai_query?utm_source=chatgpt.com)

The official documentation shows the same DDL-style structured-output pattern:

```sql
responseFormat =>
'STRUCT<...>'
```

([Databricks Documentation](https://docs.databricks.com/aws/en/sql/language-manual/functions/ai_query "ai_query function | Databricks on AWS"))  
[Official example: Enforce output schema with structured output](https://docs.databricks.com/aws/en/sql/language-manual/functions/ai_query?utm_source=chatgpt.com)

Your result will conceptually be something like:

```text
classification
------------------------------------------------
category  = LOGIN
priority  = MEDIUM
reason    = Password reset followed by login failure
```

The exact generated values can vary because they are model-generated.

---

# 20. The mental model I would memorize

For **Design Applications**, ask these questions in order:

```text
1. What does the user provide?
          ↓
2. What must the system return?
          ↓
3. Does the LLM already know enough?
      YES ───────→ Prompt / AI Function
      NO
      ↓
4. What data is missing?
      ├── documents → RAG / Knowledge Assistant
      ├── structured data → SQL / UC tool / Genie
      └── external system → MCP/API tool
          ↓
5. Is the workflow fixed?
      YES → deterministic chain
      NO
      ↓
6. Does one domain handle it?
      YES → single agent
      NO  → Supervisor / multi-agent
```

That reasoning closely follows Databricks's recommended simple-to-complex agent-design continuum. ([Databricks Documentation](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com "Agent system design patterns | Databricks on AWS"))  
[Official doc: Agent system design patterns](https://docs.databricks.com/aws/en/agents/agent-system-design-patterns?utm_source=chatgpt.com)

### One-line summary

**Design Applications = choosing the simplest architecture that transforms the required input into the required output, while adding proprietary data, tools, and agent autonomy only when the business requirement actually needs them.**

The official docs I found fully support the concepts above. I did **not** use third-party blogs/forums, and I have avoided making claims about Databricks Academy course text that I could not independently verify from publicly accessible Academy materials.