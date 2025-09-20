**base on props and state**

**"JSX is declarative"（JSX 是声明式的）**的意思是，JSX 允许开发者**直接描述 UI 的最终结构**，而不是指示如何一步步地构建它。换句话说，在 JSX 中，你**声明**你希望 UI 是什么样的，而不是**命令**计算机如何去构建它。

---

### **1. 什么是 Declarative（声明式）？**

声明式编程（Declarative Programming）是一种**描述“做什么”（What to do）**的编程范式，而不是**描述“如何做”（How to do）**。

在 JSX 中，我们**直接描述 UI**，React 负责**如何更新 UI**，而不需要手动操作 DOM。

---

### **2. JSX 如何是声明式的？**

JSX 允许我们编写类似 HTML 的结构，让代码更易读。例如：

```jsx
const App = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  );
};
```

这个 JSX 代码直观地表达了**页面应该是什么样子**。

**如果使用命令式（Imperative）方法实现相同的 UI**，可能会这样写：

```javascript
const div = document.createElement("div");

const h1 = document.createElement("h1");
h1.textContent = "Hello, World!";
div.appendChild(h1);

const p = document.createElement("p");
p.textContent = "Welcome to React";
div.appendChild(p);

document.body.appendChild(div);
```

在命令式方式中，我们需要手动创建元素、修改 `textContent`、将它们添加到 DOM 中，步骤繁琐且容易出错。

而 JSX 方式更直观地描述了**UI 应该是什么样子**，然后 React 负责渲染和更新 UI。

---

### **3. JSX 的声明式特性**

|**特性**|**JSX（声明式）**|**传统 DOM 操作（命令式）**|
|---|---|---|
|**关注点**|UI 的最终结构|如何一步步修改 UI|
|**可读性**|类似 HTML，直观|需要逐步解析代码逻辑|
|**更新方式**|由 React 处理|需要手动更新 DOM|
|**代码量**|简洁、高效|代码繁琐、易出错|

---

### **4. JSX 结合 React 使开发更声明式**

在 React 中，JSX 结合**组件（Component）**和**状态（State）**，使得 UI 更新也变得声明式。例如：

```jsx
const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};
```

在这个示例中：

- 我们**声明**了一个 `p` 标签用于显示 `count`，而不是手动更新 DOM。
- 当 `setCount` 触发时，React **自动更新 UI**，而不需要 `document.getElementById` 这些操作。

如果用命令式方式，每次 `count` 变化时，我们都需要手动操作 DOM 去更新 `<p>` 的内容。

---

### **5. 总结**

✅ JSX **描述 UI**，不关心如何更新它 —— **声明式（Declarative）**  
❌ 传统 DOM 操作手写 `document.createElement()`，手动更新 UI —— **命令式（Imperative）**

React 使用 JSX，让开发者只需关心**页面最终的样子**，而不需要操心**如何更新 DOM**，这就是 JSX **声明式**的本质。