这是一个**非常关键的问题**，理解清楚 `dbt build`，你基本就“真正懂 dbt 了”。  
我按 **一句话 → 执行动作 → 执行顺序 → 和 run / test 的区别 → 你当前 Databricks 场景怎么理解** 来讲。

---

## 一句话定义（先背下来）

👉 **`dbt build` = 按依赖顺序执行所有「可构建资源」：模型 + 测试 + seed + snapshot**  
👉 **并且是 dbt 官方现在最推荐的统一执行命令**

---

## `dbt build` 到底做了哪些事？

从高层看，dbt 会做 5 件事：

```
解析项目
↓
构建 DAG
↓
按依赖顺序执行资源
↓
执行 SQL / 校验结果
↓
汇总成功或失败
```

---

## 一、`dbt build` 会执行哪些“资源类型”

|资源类型|做什么|是否一定执行|
|---|---|---|
|**Models**|建表 / 视图|✅|
|**Tests**|数据质量校验|✅|
|**Seeds**|CSV → 表|✅|
|**Snapshots**|SCD 变更跟踪|✅|
|**Exposures / Docs**|文档|❌|

---

## 二、`dbt build` 的真实执行顺序（很重要）

dbt **不是简单 run 再 test**，而是**按依赖来**：

### 示例 DAG

```
raw_orders (source)
   ↓
stg_orders
   ↓
fct_orders
   ↓
tests on fct_orders
```

### `dbt build` 实际顺序：

1️⃣ source freshness / source tests  
2️⃣ `stg_orders`（model）  
3️⃣ tests on `stg_orders`  
4️⃣ `fct_orders`（model）  
5️⃣ tests on `fct_orders`

👉 **每个 model 都是：建完 → 立刻测试**

---

## 三、`dbt build` vs 你熟悉的命令

### 1️⃣ `dbt run`

```text
只建模型
不跑测试
```

---

### 2️⃣ `dbt test`

```text
只跑测试
不建模型
```

---

### 3️⃣ `dbt build`（推荐）

```text
run + test + seed + snapshot
而且是依赖顺序执行
```

---

## 四、为什么 dbt 官方推荐 `dbt build`

原因很现实 👇

### ✔ 更安全

- 模型一建完就测试
    
- 早失败，早停
    

### ✔ 更省资源

- 不跑“无效测试”
    
- 上游失败，下游不跑
    

### ✔ 更适合 CI / Databricks

- 少长连接
    
- 少无意义查询
    

---

## 五、你现在 Databricks 场景怎么理解 `dbt build`

### 你看到的行为（结合你日志）

- 多个连接：
    
    - `master`
        
    - `list_catalog`
        
- 先列 catalog / schema
    
- 再执行 model
    
- 再跑 test
    

👉 **这正是 dbt build 的正常行为**

---

## 六、`dbt build` 会不会“什么都跑”？（你很可能关心）

### 默认行为

```bash
dbt build
```

= 跑 **所有可构建资源**

---

### 常用限制方式（非常重要）

#### 只跑一个模型 + 上下游

```bash
dbt build --select my_model+
```

---

#### 只跑改动的

```bash
dbt build --select state:modified+
```

---

#### 跳过测试（调试时）

```bash
dbt build --select my_model --exclude test
```

---

## 七、常见误解（你刚好踩在）

❌ 以为 `dbt build` 只是 `dbt run + dbt test`  
❌ 以为 build 是“一次性全跑完再测试”

✅ 实际是：

> **边建边测，按 DAG**

---

## 八、一个最贴切的类比（好记）

|dbt 命令|类比|
|---|---|
|dbt run|编译代码|
|dbt test|单元测试|
|dbt build|编译 + 单测 + 集成测试|

---

## 九、你当前阶段的实战建议（非常重要）

在你调 Databricks / Python 环境时：

```bash
dbt build --select example.my_model --threads 1
```

原因：

- 快
- 少连接
- 好 debug

---

## 总结一句话（记住）

> **`dbt build` 是 dbt 的“完整构建动作”，它按依赖顺序执行模型、测试、seed 和 snapshot，并在 Databricks 上真正执行所有 SQL。**

如果你愿意，下一步我可以：

- 给你画一个 **dbt build 执行时序图（Databricks 视角）**
- 帮你设计 **适合 Databricks 的 dbt build 参数**
- 或帮你拆解 **build 卡住时如何快速定位是哪一步**

你现在已经问到 dbt 的“核心动作层”了，非常好 👍