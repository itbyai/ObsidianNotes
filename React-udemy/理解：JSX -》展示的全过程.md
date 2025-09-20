html - > react
Babel


在 React 项目中，`JSX` 被转换并呈现为 `UI element` 的完整过程可以分为以下几个关键阶段：

---

## **1. JSX 解析（Compilation）**

JSX 并不是 JavaScript 原生支持的语法，因此在运行前需要被 **Babel** 或 **TypeScript** 编译成普通的 JavaScript 代码。

例如：

```tsx
const element = <h1>Hello, React!</h1>;
```

Babel 会将其转换为：

```js
const element = React.createElement("h1", null, "Hello, React!");
```

**本质上，JSX 只是 `React.createElement` 的语法糖。**

---

## **2. React.createElement 生成 React Element**

`React.createElement` 返回一个 **React 元素（React Element）**，它是一个**轻量级的 JavaScript 对象**，用于描述 UI 的结构：

```js
const element = {
  type: "h1",
  props: { children: "Hello, React!" },
};
```

这时，`element` 只是一个 **虚拟描述**，并未真正创建 DOM 节点。

---

## **3. React 生成 Virtual DOM**

React 通过 `React.createElement` 创建了 **虚拟 DOM（Virtual DOM）** 结构，React 会维护这棵虚拟 DOM 树，用于后续的高效更新：

```js
const virtualDOM = {
  type: "h1",
  props: {
    children: "Hello, React!",
  },
};
```

React 还会用 `Fiber` 架构优化这棵树，以便进行高效的**调度和更新**。

---

## **4. React 调用 ReactDOM.createRoot**

当 `ReactDOM.createRoot` 被调用时，React 会将 **虚拟 DOM 渲染到实际 DOM**：

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<h1>Hello, React!</h1>);
```

**过程：**

1. `ReactDOM.createRoot` 创建 **根 Fiber 树**（Root Fiber）。
2. `root.render` 触发**调度**（Reconciliation），将 `JSX` 转换为 Fiber 结构并计算变化。
3. `ReactDOM` 通过 `DOM API` **创建并更新真实 DOM**。

---

## **5. React 通过 Reconciliation 计算 Diff**

当状态更新时：

```tsx
function Counter() {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

React 不会重新创建整个 UI，而是：

1. 计算新的 `Virtual DOM`。
2. 通过 **Diff 算法** 计算新旧 `Virtual DOM` 的差异（React Fiber）。
3. **最小化更新**，仅修改变化的部分（如按钮 `textContent`）。

---

## **6. React 通过 DOM API 更新 UI**

React 将 **最小差异** 应用到实际 DOM，例如：

```js
document.querySelector("button").textContent = "Count: 1";
```

这样，React 避免了不必要的 DOM 操作，提高了性能。

---

## **完整流程总结**

1. **JSX 解析** → **`React.createElement`**
2. **生成 Virtual DOM**
3. **React 调用 `ReactDOM.createRoot`**
4. **Diff 计算**（Reconciliation）
5. **通过 `DOM API` 更新 UI**

React **以高效的方式** 进行 **JSX → Virtual DOM → Fiber → 真实 DOM 更新**，保证了流畅的 UI 体验。

---

**你在哪个环节有更深入的问题？比如 Fiber、Reconciliation 还是 React 事件处理机制？** 😊