我已经帮你从这段 Teams 聊天记录中**提取并过滤出所有可访问的链接、系统入口、SharePoint、Databricks、Power BI、Wiki、DevOps、文档模板等资源链接**，并按类别整理如下，方便你以后直接使用或收藏。

---

# 🔗 一、Databricks Workspace Links（最重要）

这些是你项目环境的 Databricks workspace：

### PROD / TEST / PAT / FA Workspace

|Workspace Name|Link|
|---|---|
|adbehqcbiqhitfae|[https://adb-8211899870830893.13.azuredatabricks.net/login.html?o=8211899870830893](https://adb-8211899870830893.13.azuredatabricks.net/login.html?o=8211899870830893)|
|adbehqcbiqhprodpatae|[https://adb-2287108920287664.4.azuredatabricks.net/aad/auth](https://adb-2287108920287664.4.azuredatabricks.net/aad/auth)|
|dbxwscbitest|[https://adb-1267763138292548.8.azuredatabricks.net/](https://adb-1267763138292548.8.azuredatabricks.net/)|
|dbxwscbipat|[https://adb-3595872111170569.9.azuredatabricks.net/aad/auth](https://adb-3595872111170569.9.azuredatabricks.net/aad/auth)|
|dbxwscbiprod|[https://adb-212645264149012.12.azuredatabricks.net/aad/auth](https://adb-212645264149012.12.azuredatabricks.net/aad/auth)|

---

### PADP Workspace

|Environment|Link|
|---|---|
|PADP workspace|[https://adb-2917076901523537.17.azuredatabricks.net/?o=2917076901523537](https://adb-2917076901523537.17.azuredatabricks.net/?o=2917076901523537)|

---

# 📊 二、Power BI Links

### Dashboard access test

Redirect link:

[https://app.powerbi.com/Redirect?action=OpenDashboard&appId=7f4747f4-229b-4a53-9bc7-cfdc4d0e345](https://app.powerbi.com/Redirect?action=OpenDashboard&appId=7f4747f4-229b-4a53-9bc7-cfdc4d0e345)

---

### Working Power BI Report

Workspace: OCDO - Reporting Portal - DEV

[https://app.powerbi.com/groups/311be31b-f1ab-42b5-a0f6-1f9dc2b4e006/reports/8432edae-af29-440a-bd19](https://app.powerbi.com/groups/311be31b-f1ab-42b5-a0f6-1f9dc2b4e006/reports/8432edae-af29-440a-bd19)

---

# 📂 三、SharePoint / Project Documents Links

---

## PADP Project Files

PADP SAD documentation:

HBCIS Patient Administration Data Platform (PADP) - Project Files - Documents - 02 PADP SAD - All Documents

SharePoint folder (via teams):

[https://healthqld.sharepoint.com/teams/CBIProjects2/Shared%20Documents/](https://healthqld.sharepoint.com/teams/CBIProjects2/Shared%20Documents/)

---

## Synapse → Databricks Migration Test Strategy

[https://healthqld.sharepoint.com/teams/CBIProjects2/Shared%20Documents/](https://healthqld.sharepoint.com/teams/CBIProjects2/Shared%20Documents/)

File name:

```
synapse_to_databricks_test_strategy v0.2.docx
```

---

## Clinical and Business Intelligence Test Strategy Folder

```
Clinical and Business Intelligence Foundations Projects
→ Documents
→ Test Strategy
```

---

## STTM Files Folder

```
Clinical and Business Intelligence Foundations Projects
→ Documents
→ STTM_files
```

---

# 📘 四、Wiki Links

### Testing Framework Wiki

Testing Databricks | CBI Wiki

(Teams internal wiki — accessible via Teams Wiki tab)

---

# 🧪 五、DevOps / Testing / Template Links

---

## DevOps Test Plan

Test Plan:

```
Test Plan 24664
CBI Databricks Migration - Gen 3
```

DevOps URL format:

```
https://dev.azure.com/CBIProgram/
```

---

## ICT Testing Service Template

Testing template repository:

```
ICT Testing Service
```

Includes:

Test Plan Template  
Test Strategy Template  
Test case templates

---

# 📊 六、dbt Testing Dashboard

Elementary dbt demo dashboard:

[https://storage.googleapis.com/elementary_static/elementary_demo.html](https://storage.googleapis.com/elementary_static/elementary_demo.html)

This is VERY useful for:

- test monitoring
    
- anomaly detection
    
- test history
    
- data quality dashboards
    

---

# 📂 七、Source-to-Target Mapping & Test Repository Process Resources

Databricks job mentioned:

```
wf_create_comparative_IM_tests
```

Used with parameters:

```
project = PADP
IM_Project = PADP_Phase_2b
```

CSV example:

```
STTM_PADP_Phase_2b.csv
```

Upload location:

```
Databricks volume
schema: cbi.test
```

---

# 📁 八、SharePoint / Test Plan Template / DevOps Template Folder

Template folder mentioned:

```
CBI DevOps - Documents - Templates
```

Example template:

```
synapse_to_databricks_test_plan - RLSnnn.docx
```

---

# 📧 九、Email / Identity

Your email:

```
a-xiaof@health.qld.gov.au
```

---

# 🧠 十、最重要的5个核心入口（推荐收藏）

如果你只收藏5个，推荐这5个：

---

### 1️⃣ PADP Databricks Workspace

[https://adb-2917076901523537.17.azuredatabricks.net](https://adb-2917076901523537.17.azuredatabricks.net/)

---

### 2️⃣ CBI PROD Workspace

[https://adb-212645264149012.12.azuredatabricks.net](https://adb-212645264149012.12.azuredatabricks.net/)

---

### 3️⃣ Power BI Reporting Portal

[https://app.powerbi.com/groups/311be31b-f1ab-42b5-a0f6-1f9dc2b4e006/reports/8432edae-af29-440a-bd19](https://app.powerbi.com/groups/311be31b-f1ab-42b5-a0f6-1f9dc2b4e006/reports/8432edae-af29-440a-bd19)

---

### 4️⃣ dbt Elementary Dashboard Demo

[https://storage.googleapis.com/elementary_static/elementary_demo.html](https://storage.googleapis.com/elementary_static/elementary_demo.html)

---

### 5️⃣ DevOps Portal

[https://dev.azure.com/CBIProgram/](https://dev.azure.com/CBIProgram/)

---

# 🧾 十一、推荐你整理成浏览器书签结构

推荐结构：

```
CBI Project
 ├ Databricks
 │   ├ PADP workspace
 │   ├ PROD workspace
 │   ├ TEST workspace
 │
 ├ Power BI
 │   ├ Reporting portal
 │
 ├ DevOps
 │   ├ Test plans
 │   ├ Bugs
 │
 ├ SharePoint
 │   ├ PADP docs
 │   ├ Test strategy
 │   ├ Templates
 │
 ├ Wiki
 │   ├ Testing framework
 │
 ├ dbt
 │   ├ Elementary dashboard
```

---

# 如果你愿意，我可以帮你整理成：

- Excel resource inventory
    
- 或 DevOps Testing Resource Register
    
- 或 Databricks Testing Toolkit bookmark template
    

直接可以团队共享使用。