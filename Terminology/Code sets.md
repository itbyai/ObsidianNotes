“**Code sets**” 这个词在**医疗、政府、数据标准化、系统集成**等领域非常常见，它的概念很重要，但本质其实很简单。

下面我用**最容易理解的方式**解释什么是 code sets、为什么要用、在你现在接触的 ERD / Logic Modelling 中它代表什么。

---

# 🟣 **什么是 Code Sets？（最简单的定义）**

**Code Sets = 预定义的、标准化的、可重复使用的“值列表”。**

这些列表中的每个值通常有：

- **Code（代码）**
- **Description（描述）**

### 👉 它们作用是：

**用标准化的、统一的、可控的方式定义可选值，避免系统里出现乱七八糟的字符串。**

---

# 🟢 **简单例子：**

### Example 1：Appointment Status Code Set

|Code|Description|
|---|---|
|BOOKED|已预约|
|ARRIVED|已到达|
|COMPLETED|完成|
|CANCELLED|取消|

这就是一个 code set。  
所有系统都必须从这个列表中选一个值，不能随便写文字。

---

# 🟡 **Code Sets 在医疗系统中更常见：**

例如：

### Referral Category Code Set

|Code|Meaning|
|---|---|
|CARD|Cardiology（心脏科）|
|DERM|Dermatology（皮肤科）|
|ENT|耳鼻喉|

### Appointment Type Code Set

|Code|Meaning|
|---|---|
|NEW|初诊|
|FUP|复诊|
|PROC|Procedure（手术/操作）|

这些在医院系统互通（PAS、HIS、EMR、Scheduling）时非常重要。

---

# 🔵 **为什么要用 Code Sets？**

### 1️⃣ **保证数据一致性**

避免出现：

- “Cancelled”
- “cancel”
- “C”
- “已取消”

这些全是指同一件事，但写法不同 → 数据会乱。

---

### 2️⃣ **保证跨系统集成可用**

不同系统之间必须使用标准值。

比如一个系统写 “Complete”，另一个写 “Done”，就会集成失败。

---

### 3️⃣ **便于业务规则验证**

很多规则依赖 Code，如：

- “只有 NEW referral 才能创建 Appointment”
- “只有 COMPLETED 状态才生成报告”

---

### 4️⃣ **便于逻辑建模与数据建模**

Logic model 通常不会列字段细节，但会引用 code sets。

---

# 🟠 **Code Sets 在你现在的 ERD 中的作用是什么？**

你的 ER 图里有实体，如：

- Outpatient Referral
- Outpatient Appointment
- Referral Category History
- Referral Status History
- Wait List Transfer
- Clinic Template

这些实体内部一定有字段，例如：

- Referral Status
- Appointment Type
- Referral Category
- Priority
- Outcome

这些字段的可选值 **全部来自 code sets**。

### 👉 也就是说：

**ERD 里不会写出字段的具体可选值，但会告诉你哪些地方会用到 code sets。**

---

# 🟣 **什么时候讨论 Code Sets？**

你之前问：字段不在这个会上讨论，那 Code Sets 呢？  
答案如下：

## ✔ 在 Conceptual / High-level Logical Meeting

不讨论 code sets 的具体值  
（因为这个会上只讨论实体和关系）

## ✔ 在 Logic Modelling Meeting

会确定 **哪些字段需要 code sets**  
（例如：Appointment.status 需要用 Status Code Set）

## ✔ 在 Data Modelling 或 Dictionary Meeting

会讨论 **每个 code set 的具体值**  
（例如：BOOKED、ARRIVED、CANCELLED）

---

# 🧩 **用你的案例总结一下**

举例：

### Referral 实体 ↓

字段：ReferralStatus  
→ 使用 “Referral Status Code Set”

### Appointment 实体 ↓

字段：AppointmentType  
→ 使用 “Appointment Type Code Set”

### Provider ↓

字段：ProviderRole  
→ 使用 “Provider Role Code Set”

这些 code sets 会在逻辑模型中出现，但不会在概念模型中展开。

---

# ⭐ 用一句话总结：

> **Code Sets 是系统中用于字段取值的标准化列表，确保不同模块、不同系统在处理业务值时使用一致、可控、可管理的代码和描述。**

---

如果你愿意，我还能帮你：

### ✔ 总结一个“本项目可能需要哪些 Code Sets 的清单”

### ✔ 举例你 ER 图中每个实体常见会使用哪些 Code Sets

### ✔ 解释 Code Sets / Reference Data / Lookup Tables 它们之间的区别

需要继续吗？