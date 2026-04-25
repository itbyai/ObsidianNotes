非常好 👍  
你这个思路已经是“工程化使用 AI”了，而不是临时问问题。

我给你一个 **可复用的高级 Prompt 模板**，以后你只要替换需求内容，就可以自动生成：

- ✅ Happy Path
    
- ❌ Negative Path
    
- ⚠ Exception Cases
    
- ✅ 企业级数据测试覆盖
    
- ✅ Excel 可直接粘贴格式
    
- ✅ Steps 带换行
    
- ✅ Tab 分隔
    
- ✅ 可用于 ADO / SIT / UAT
    

---

# ✅ 可复用 Prompt 模板（直接保存起来）

下面这段是你以后可以直接用的 Prompt：

---

```
You are a senior data QA engineer working on enterprise data integration projects.

Based on the requirement below, design comprehensive test cases.

Requirements:
- Include Happy Path
- Include Negative Path
- Include Exception Cases
- Cover data completeness, consistency, schema validation, reconciliation, deduplication, incremental loads, historical handling, lineage, and performance where applicable
- Think like an enterprise data integration tester (EDW / Databricks / Lakehouse context)

Output Format Requirements:
- Output in TAB-separated format (so it can be pasted directly into Excel)
- Columns must be exactly in this order:
  Title
  Steps
  Priority
  Assigned To
  Tags
  Area Path
  Iteration Path
  Description
  Precondition
- Steps must:
  - Be clearly numbered
  - Each step on a new line
  - Entire Steps column must be wrapped in double quotes
- Do NOT use markdown table
- Do NOT add explanations outside the table
- Ensure format is clean for direct Excel paste

Default Values:
- Priority: Must (unless clearly performance or optional scenario)
- Assigned To: PADP team
- Tags: N01, N04
- Area Path: Functional\Database
- Iteration Path: PR.1

Requirement:
<PASTE YOUR REQUIREMENT HERE>
```

---

# 🔥 如果你想要“更高级自动推理版本”

可以用这个增强版 Prompt：

```
Act as an enterprise-level data integration test architect.

Generate a complete data test suite for the requirement below.

You must:
- Identify test categories automatically
- Generate structured Happy Path, Negative Path, and Exception Cases
- Include reconciliation logic
- Include schema validation
- Include cross-source consistency checks
- Include duplicate resolution validation
- Include incremental load validation
- Include late-arriving data scenarios
- Include failure and rollback scenarios
- Include performance considerations if relevant

Output strictly in TAB-separated format for Excel import.

Steps column must:
- Be multi-line
- Numbered
- Wrapped in double quotes
- Contain no extra tabs

Do not include markdown.
Do not include commentary.

Requirement:
<INSERT REQUIREMENT>
```

---

# 🧠 为什么这个 Prompt 有效？

因为它：

1. 指定角色（Senior Data QA / Architect）
    
2. 指定测试类型
    
3. 指定覆盖维度
    
4. 指定输出格式
    
5. 指定默认字段
    
6. 指定 Excel 兼容规则
    
7. 限制输出干扰信息
    

AI 就不会乱发挥。

---

# 🎯 你以后用法是：

复制 Prompt  
替换 Requirement  
直接生成

---

# 🚀 如果你愿意

我可以再帮你做一个：

- 🔥 专门针对 Databricks 的测试用例 Prompt
    
- 🔥 专门针对 Data Dictionary 验证的 Prompt
    
- 🔥 专门针对 Logical Model 校验的 Prompt
    
- 🔥 或一个“万能数据测试 Prompt 工具包”
    

你想升级成哪个级别？