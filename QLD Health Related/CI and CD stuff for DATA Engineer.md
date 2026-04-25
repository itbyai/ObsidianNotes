![[Pasted image 20251211095159.png]]

Here is a **clear explanation of the entire process** shown in your diagram, and **exactly which steps require testing**.  
This is a common **Git + dbt + CI/CD workflow** used in data engineering.

I will describe it step-by-step in plain, easy language.

---

# ✅ **1. Main Branch (Production / Source of Truth)**
- This is the **clean, stable**, production-ready dbt code.
- All code must pass tests before being merged into `main`.
- Daily and ad-hoc tests run on this branch to ensure it’s always healthy.
### **Testing required here?**
✔ Yes – automated daily/ad-hoc dbt tests on main  
✔ Yes – must ensure no model breaks in production

---
# ✅ **2. Create Branch (Feature Branch)**
A developer (or data engineer) pulls from main to create a new branch for their work.
Example branch:

```
feature/add_new_mapping
```

### **Testing required here?**

❌ No automated tests needed at branch creation  
(Because no changes exist yet.)

---

# ✅ **3. Make Changes (Save, Commit, Sync)**

Developer modifies:

- dbt models
- SQL transformations
- Schema YAML (tests)
- Documentation
- Source definitions

They commit and push the changes.

### **Testing required here?**

✔ Developer should run tests locally (recommended but optional)

- `dbt run -m <model>`
- `dbt test`  
    ❌ Not required by pipeline, but _good practice_

---

# ✅ **4. Create Pull Request (PR)**

Developer submits a PR from feature branch → main.
This triggers the CI pipeline.

### **Testing required here?**

✔ Yes – PR is the main automated testing point.

---

# 🧪 **5. CI Job Triggered (Slim CI)**

This is the most important testing stage.
Slim CI performs:

### **a. Webhook triggers dbt build**

```
dbt build -s state:modified+
```

Meaning:

- Detect only **changed models**
- Run those models
- Run all downstream models that depend on them
- Run **tests** on all of them
- Build results in a **temporary schema** (usually suffixed with PR#)

### **b. Tests run automatically**

The CI job executes:

- Schema tests (unique, not null, relationships)
- Data tests
- Custom tests
- SQL compilation checks
- Model materialization checks

---

# 🚫 **6. Merge Will Only Happen If All Tests Pass**

If tests fail:

- PR cannot be merged
- Developer must fix issues in their branch

If tests pass:

- PR can be merged to main

### **Testing required here?**

✔ Mandatory automated CI/dbt tests  
✔ This is where bugs are caught before main is polluted

---

# 🔁 **7. Main Branch After Merge**

Once code is merged:

- Daily tests run on entire project
- Ad-hoc runs can be triggered as needed

These ensure:

- No regressions
- Production integrity

---

# 🔍 **Summary of Required Testing at Each Stage**

|Stage|Testing Required?|Type of Testing|
|---|---|---|
|**Create branch**|❌ No|None|
|**Make changes**|⚠️ Optional|Developer local dbt test (recommended)|
|**Create Pull Request**|✔ Mandatory|CI Slim tests|
|**CI Job (Slim CI)**|✔ Mandatory|Automated dbt build + test (modified and downstream models)|
|**Merge to Main**|✔ Required (must pass CI tests)|CI gate|
|**Main branch after merge**|✔ Daily/ad-hoc|Full model tests on main|

---

# ⭐ **What YOU Need to Test**

Based on the workflow, the **core testing responsibilities** are:

## **1. PR-Level dbt Tests (CI Slim Run)**

- Validate only changed models + dependencies
- Ensure new code does not break existing lineage
- Confirm schema tests pass:
    - unique
    - not null
    - relationships
    - accepted values
- Confirm new models build correctly in temp schema

## **2. Full Tests on Main Branch**

- After merge, daily scheduled runs validate:
    - All models compile
    - No regressions
    - Production pipeline is stable

## **3. Data Quality Testing**

(Optional but recommended)

- Profile data after changes
- Validate row counts in new tables
- Validate source-to-target mapping rules
- Ensure logic transformations are correct

## **4. Manual Tests for Functional Logic**

If PR introduces complex logic:

- Validate business rules
- Validate data correctness
- Confirm outputs match expected results

---

# 🎯 **Simple Explanation**

Think of it like this:

|Step|Who Tests?|Goal|
|---|---|---|
|Developer changes code|Developer|Local test, optional|
|Developer opens PR|CI Pipeline|Must pass tests|
|Merge to main|Automated|Must be clean|
|Daily runs|Automated|Ensure production stays healthy|

---

# 🔥 Final Answer

**The testing you MUST do is:**

### ✔ CI tests for every PR (Slim CI)

### ✔ Daily tests on the main branch

### ✔ Data quality & functional testing for new/changed models

### ✔ Dependency (downstream) testing to ensure no model breaks

This ensures dbt models are correct, reliable, and safe before going to production.
