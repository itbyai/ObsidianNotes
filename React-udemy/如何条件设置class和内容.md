在 React 项目中，可以通过 **条件渲染** 和 **动态 className** 来有条件地显示文本或设置样式。以下是几种常见的方式：

---

## **1. 条件渲染文本**

### **使用三元运算符 (`? :`)**

```jsx
function App({ isLoggedIn }) {
  return <p>{isLoggedIn ? "欢迎回来!" : "请登录"}</p>;
}
```

如果 `isLoggedIn` 为 `true`，显示 `"欢迎回来!"`，否则显示 `"请登录"`。

---

### **使用 `&&` 逻辑运算符**

```jsx
function App({ showMessage }) {
  return <p>{showMessage && "这是一个提示信息"}</p>;
}
```

如果 `showMessage` 为 `true`，则显示 `"这是一个提示信息"`，否则不显示任何内容。

⚠️ **注意：** 如果 `showMessage` 为 `0` 或 `false`，React 会直接跳过渲染。如果 `showMessage` 可能是 `0`，建议用三元运算符。

---

## **2. 条件设置 `className`**

### **使用三元运算符**

```jsx
function App({ isActive }) {
  return <div className={isActive ? "active" : "inactive"}>Hello</div>;
}
```

- 当 `isActive = true` 时，`className="active"`
- 当 `isActive = false` 时，`className="inactive"`

---

### **使用模板字符串**

```jsx
function App({ isPrimary, isLarge }) {
  return <button className={`${isPrimary ? "btn-primary" : "btn-secondary"} ${isLarge ? "btn-large" : ""}`}>按钮</button>;
}
```

- `isPrimary` 控制按钮是 **"btn-primary"** 还是 **"btn-secondary"**
- `isLarge` 控制是否添加 **"btn-large"** 类

---

### **使用 `classnames` 库**

如果 `className` 逻辑复杂，可以使用 `classnames` 第三方库：

```bash
npm install classnames
```

然后在组件中使用：

```jsx
import classNames from "classnames";

function App({ isPrimary, isLarge }) {
  const buttonClass = classNames({
    "btn-primary": isPrimary,
    "btn-secondary": !isPrimary,
    "btn-large": isLarge,
  });

  return <button className={buttonClass}>按钮</button>;
}
```

这样可以更清晰地管理多个条件下的 `className`。

---

## **总结**

- **条件渲染文本**
    - `三元运算符`: `condition ? "显示A" : "显示B"`
    - `&& 运算符`: `condition && "显示文本"`
- **条件设置 `className`**
    - `三元运算符`: `className={condition ? "classA" : "classB"}`
    - `模板字符串`: `className={`${condition1 ? "classA" : ""} ${condition2 ? "classB" : ""}`}`
    - `classnames` 库: 适用于复杂 `className` 逻辑

这些方法可以帮助你在 React 里更灵活地处理 UI 逻辑。🚀