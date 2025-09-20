JSX（JavaScript XML）是 **React** 中用于描述 UI 结构的语法，它允许你在 JavaScript 代码中编写类似 HTML 的结构。JSX 不是 JavaScript 的一部分，而是由 Babel 编译成 `React.createElement()` 调用的 JavaScript 代码。

在使用 JSX 时，需要遵守一些规则，下面是详细的介绍。

---

# **1. JSX 的基本规则**

JSX 主要基于 JavaScript 语法，但也有一些特殊的规则。

## **1.1 JSX 必须有单一根元素**

在 JSX 中，所有的代码必须被包裹在 **一个父元素** 之内，例如 `<div>` 或 `<>`（Fragment）。

✅ **正确示例：**

```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>Welcome to JSX</p>
  </div>
);
```

✅ **使用 `React.Fragment`（简写 `<>`）：**

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome to JSX</p>
  </>
);
```

❌ **错误示例（多个根元素）：**

```jsx
return (
  <h1>Hello</h1>
  <p>Welcome to JSX</p>
); // ❌ 这里有两个根元素，JSX 不允许
```

---

## **1.2 JSX 需要使用 `className` 而不是 `class`**

因为 `class` 是 JavaScript 的关键字，在 JSX 中使用 **`className`** 来代替 `class`。

✅ **正确示例：**

```jsx
return <div className="container">Hello JSX</div>;
```

❌ **错误示例：**

```jsx
return <div class="container">Hello JSX</div>; // ❌ 会报错
```

---

## **1.3 JSX 属性必须使用驼峰命名（camelCase）**

HTML 中的 **`onclick`、`onchange`** 在 JSX 中需要写成 **`onClick`、`onChange`**。

✅ **正确示例：**

```jsx
return <button onClick={handleClick}>Click Me</button>;
```

❌ **错误示例：**

```jsx
return <button onclick={handleClick}>Click Me</button>; // ❌ 不符合 JSX 语法
```

对于 `inline style`，需要用 **对象** 并采用 `camelCase`：

✅ **正确示例：**

```jsx
return <div style={{ backgroundColor: 'blue', fontSize: '16px' }}>Styled Text</div>;
```

❌ **错误示例：**

```jsx
return <div style="background-color: blue; font-size: 16px;">Styled Text</div>; // ❌ JSX 不支持这种写法
```

---

## **1.4 JSX 允许插入 JavaScript 表达式**

JSX 允许使用 `{}` 插入 JavaScript 表达式（但 **不能** 直接使用 `if/else` 或 `for` 语句）。

✅ **正确示例（变量、计算、函数调用）：**

```jsx
const name = "Alice";
return <h1>Hello, {name}!</h1>;
```

```jsx
const a = 5, b = 10;
return <p>Sum: {a + b}</p>;
```

```jsx
return <p>{new Date().toLocaleTimeString()}</p>;
```

❌ **错误示例（if 语句）：**

```jsx
return <p>{ if (true) "Hello" }</p>; // ❌ JSX 不能直接写 if 语句
```

✅ **正确示例（使用三元运算符 `? :`）：**

```jsx
const isLoggedIn = true;
return <h1>{isLoggedIn ? "Welcome Back" : "Please Sign In"}</h1>;
```

---

## **1.5 在 JSX 中渲染列表**

JSX 需要使用 `.map()` 方法来渲染数组，并且 **每个子元素都需要唯一的 `key`**。

✅ **正确示例：**

```jsx
const fruits = ["Apple", "Banana", "Cherry"];
return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
```

❌ **错误示例（缺少 `key`）：**

```jsx
{fruits.map((fruit) => <li>{fruit}</li>)} // ❌ React 会提示警告：Each child should have a unique "key" prop
```

---

## **1.6 JSX 中的 `boolean` 属性**

在 JSX 里，布尔值的属性 **可以省略 `={true}`**，只写属性名即可表示 `true`。

✅ **正确示例：**

```jsx
<input type="checkbox" defaultChecked />
<button disabled>Click</button>
```

等价于：

```jsx
<input type="checkbox" defaultChecked={true} />
<button disabled={true}>Click</button>
```

❌ **错误示例：**

```jsx
<input type="checkbox" defaultChecked="true" /> // ❌ "true" 是字符串，而不是布尔值
```

---

# **2. JSX 进阶规则**

### **2.1 事件处理**

JSX 事件绑定方式与 JavaScript 类似，但要使用 **驼峰命名**。

✅ **正确示例（事件绑定）：**

```jsx
function handleClick() {
  alert("Button clicked!");
}

return <button onClick={handleClick}>Click Me</button>;
```

❌ **错误示例：**

```jsx
<button onclick="handleClick()">Click Me</button> // ❌ 不符合 JSX 语法
```

---

### **2.2 JSX 可以使用 `&&` 进行条件渲染**

可以用 `&&` 运算符简化 `if` 判断。

✅ **正确示例：**

```jsx
const isLoggedIn = true;
return <div>{isLoggedIn && <p>Welcome back!</p>}</div>;
```

等价于：

```jsx
if (isLoggedIn) {
  return <p>Welcome back!</p>;
} else {
  return null;
}
```

❌ **错误示例（`if` 不能直接用在 JSX）：**

```jsx
return <div>{if (isLoggedIn) { <p>Welcome back!</p>; }}</div>; // ❌ JSX 不能直接使用 if 语句
```

---

### **2.3 JSX 可以传递子组件**

可以直接在组件标签中传递内容作为 **`children`**。

✅ **正确示例：**

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

return (
  <Card>
    <h2>Title</h2>
    <p>Content inside the card</p>
  </Card>
);
```

等价于：

```jsx
<Card children={<><h2>Title</h2><p>Content inside the card</p></>} />
```

---

# **总结**

|规则|说明|
|---|---|
|**单一根元素**|JSX 代码必须包裹在一个父元素内 (`<div>` 或 `<>` Fragment)|
|**使用 `className`**|不能用 `class`，必须使用 `className`|
|**属性驼峰命名**|`onClick`、`backgroundColor`|
|**JS 表达式用 `{}`**|`{name}`、`{a + b}`|
|**渲染列表要 `key`**|`fruits.map(fruit => <li key={id}>{fruit}</li>)`|
|**布尔值属性**|`<button disabled />`|
|**事件绑定**|`onClick={handleClick}`|
|**`&&` 进行条件渲染**|`{isLoggedIn && <p>Welcome back!</p>}`|

这些就是 **JSX 的核心规则**，掌握这些，你就可以写出更流畅的 React 组件了 🚀。

![[Pasted image 20250204220445.png]]
图片内容总结如下：

### **JSX 的基本规则**

1. JSX 的工作方式类似 HTML，但通过 `{}` 进入“JavaScript 模式”，用于文本或属性。
2. 可以在 `{}` 中放置 JavaScript 表达式，例如：引用变量、创建数组或对象、调用 `.map()`、使用三元运算符等。
3. 不允许直接使用语句（如 `if`/`else`、`for`、`switch` 等）。
4. JSX 最终会生成 JavaScript 表达式：
    - 示例：
        
        ```jsx
        const el = <h1>Hello React!</h1>;
        ```
        
        等价于：
        
        ```js
        const el = React.createElement("h1", null, "Hello React!");
        ```
        
5. 可以嵌套其他 JSX 片段。
6. JSX 可以写在组件中的任意位置，例如 `if`/`else` 内部，赋值给变量或传递给函数。
7. 每个 JSX 代码块只能有一个根元素。若需要多个根元素，请使用 `<React.Fragment>` 或简写 `<>`。

---

### **JSX 与 HTML 的差异**

8. `className` 替代 HTML 中的 `class`。
9. `htmlFor` 替代 HTML 中的 `for`。
10. 所有标签必须闭合，例如 `<img />` 或 `<br />`。
11. 所有事件处理程序和其他属性名需要使用小驼峰命名法，例如 `onClick` 或 `onMouseOver`。
    - **例外**：`aria-*` 和 `data-*` 属性使用 HTML 风格的短横线。
12. CSS 内联样式的写法为：
    
    ```jsx
    {{ style }}
    ```
    
    其中 `style` 是变量，需引用对象。
13. CSS 属性名同样需要小驼峰命名法。
14. 注释需要放在 `{}` 中，因为它们是 JavaScript。

如果需要更多补充，请告知！