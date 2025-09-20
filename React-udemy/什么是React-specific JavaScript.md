“**React-specific JavaScript**”指的是——  
在使用 React 时，**你必须掌握的 JavaScript 概念、语法和模式**，这些内容是为 React 开发服务的，但不是 React 独有的，而是它**依赖的 JavaScript 特性或写法**。

---

## 📚 常见的 React-specific JavaScript 包括：

### 1. **JSX（JavaScript + XML）**

- 这是 React 独特的语法扩展：
    

```jsx
const element = <h1>Hello, world!</h1>;
```

- 虽然它长得像 HTML，其实是 JavaScript 语法糖，会被 Babel 编译成：
    

```js
React.createElement('h1', null, 'Hello, world!');
```

👉 所以 JSX 是 React 特有的写法，但底层是标准 JS。

---

### 2. **ES6+ 特性（React 必备）**

React 开发高度依赖以下 ES6+ 的语法：

|特性|示例|
|---|---|
|解构赋值|`const { name } = props;`|
|箭头函数|`const handleClick = () => {...}`|
|模板字符串|`Hello, ${name}`|
|类和继承（少用）|`class MyComponent extends React.Component`|
|`import/export`|`import React from 'react'`|
|默认参数|`function greet(name = 'User') {...}`|
|可选链|`user?.profile?.name`|

---

### 3. **Hooks 用法（React 新语法）**

Hooks 是函数组件中用来“记住状态”和执行副作用的机制：

|Hook|作用|
|---|---|
|`useState()`|设置状态|
|`useEffect()`|副作用处理（如数据请求、事件监听）|
|`useContext()`|跨层级共享状态|
|`useRef()`|获取 DOM 引用|

**这些是 React 中的函数，但你需要用标准 JavaScript 的方式使用它们。**

---

### 4. **事件绑定与处理**

React 事件采用类 HTML 的写法，但背后其实是 JS 函数：

```jsx
<button onClick={handleClick}>点击我</button>
```

注意：函数不能写成 `handleClick()`（这样会立即执行）

---

### 5. **状态驱动的条件渲染与循环**

```jsx
{isLoggedIn ? <UserPanel /> : <LoginPrompt />}
{list.map(item => <li key={item.id}>{item.name}</li>)}
```

使用的是 JS 的条件表达式和数组方法，但在 JSX 中看起来更像模板语言。

---

## ✅ 总结

|名称|是否标准 JS？|React 是否依赖|
|---|---|---|
|JSX|❌（React 特有）|✅ 必须|
|ES6+ 语法|✅|✅ 必须|
|Hooks|✅（是函数）|✅ 必须|
|条件渲染、循环|✅|✅ 高度依赖|
|DOM 事件处理|✅|✅ 不同写法|

所以：

> **React-specific JavaScript = ES6+ 特性 + JSX + React API 使用方式**

如果你已经熟悉现代 JavaScript，再加上一些 JSX 的语法和 React 的模式，就可以快速上手 React。

---

需要我提供一个练习清单或更详细的代码示例来掌握这些概念吗？

---

本回答已追加至 `translation.md` 文件中。