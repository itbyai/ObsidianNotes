**Ground truth data** 就是：

**被当作“标准答案”或“真实结果”的数据。**

你可以把它理解成：

> 用来判断模型答得对不对、预测准不准的参考基准。

---

## 最简单的例子

### 例子 1：图片分类

你有一张猫的图片。

- 模型预测：`cat`
    
- 真实标签：`cat`
    

这里真实标签 `cat` 就是 **ground truth**。

---

### 例子 2：文本情感分析

一句话：

```text
This product is amazing.
```

人工标注结果是：

```text
positive
```

那这个 `positive` 就是 ground truth。

---

### 例子 3：RAG / 问答

问题：

```text
公司的年假最多能结转多少天？
```

标准答案（来自政策文档并经人工确认）：

```text
最多结转 10 天
```

这个“最多结转 10 天”就是 ground truth answer。

---

# 在不同场景里它是什么意思

## 1. 机器学习里

Ground truth 通常是：

- 真实标签
    
- 人工标注答案
    
- 实际观测结果
    

用来和模型预测做对比。

例如：

- 预测房价 vs 实际成交价
    
- 预测欺诈 vs 最终人工确认是否欺诈
    
- 预测疾病 vs 医生最终诊断
    

---

## 2. RAG / LLM 评估里

Ground truth 通常是：

- 标准答案
    
- 标准参考文档
    
- 人工确认的正确输出
    

例如一个评估集可能长这样：

|question|ground_truth_answer|
|---|---|
|年假可结转多少天|10 天|
|耳机无法充电怎么办|先 reset，再换线，不行则换货|

然后你拿模型输出去对比这些标准答案。

---

## 3. 检索评估里

Ground truth 可以是：

- 对某个 query 来说，哪些文档是“相关文档”
    
- 哪些 chunk 才是应该被召回的
    

例如：

问题：

```text
Delta Lake time travel 是什么？
```

人工标注说这 3 篇文档相关，那这 3 篇就是这个 query 的 ground truth relevant docs。

然后才能算：

- Precision@K
    
- Recall@K
    
- MRR
    
- nDCG
    

---

# 为什么需要 ground truth

因为如果没有它，你就没法客观判断：

- 模型是不是预测对了
    
- RAG 回答是不是靠谱
    
- Retriever 找的文档是不是正确
    
- 新模型是不是比旧模型更好
    

---

# 一句话理解

**Ground truth = 你拿来当“正确答案”的那份真实基准数据。**

---

# 最短记忆版

- 预测值 = 模型说的
    
- ground truth = 真实答案 / 标准答案
    

如果你愿意，我可以下一条继续讲 **ground truth、prediction、label、reference answer** 这几个词的区别。