在 React 中，**Template Literals（模板字符串）**是 JavaScript 提供的一种字符串格式化方式，允许更灵活地构建字符串，尤其是在需要动态插值或处理多行字符串时非常有用。Template Literals 本身是 JavaScript 的特性，但在 React 开发中常用于以下场景：

---

### **Template Literals 基础语法**

1. **声明方式**：用反引号 (`` ` ``) 包裹。
2. **插值**：使用 `${expression}` 的形式插入变量或表达式。
3. **多行字符串**：支持换行符，不需要额外使用 `\n`。

#### 示例

```javascript
const name = "Alice";
const age = 25;

const introduction = `My name is ${name}, and I am ${age} years old.`;
console.log(introduction); // "My name is Alice, and I am 25 years old."
```

---

### **React 中的应用场景**

#### 1. **动态生成类名**

当需要根据某些条件设置动态类名时，可以结合 Template Literals 和 JavaScript 表达式。

```jsx
const isActive = true;
const className = `button ${isActive ? 'active' : ''}`;

return <button className={className}>Click Me</button>;
```

---

#### 2. **动态插值内容**

可以在 JSX 内使用 Template Literals 动态插入内容，比如标题、文本等。

```jsx
const firstName = "John";
const lastName = "Doe";

return <h1>{`Hello, ${firstName} ${lastName}!`}</h1>;
```

---

#### 3. **内联样式**

通过将动态计算的值嵌入到样式属性中。

```jsx
const size = 20;

return <div style={{ fontSize: `${size}px`, color: "blue" }}>Dynamic Style</div>;
```

---

#### 4. **拼接动态的 URL 或资源路径**

当需要动态生成图片路径或 API 请求的 URL 时，Template Literals 非常方便。

```jsx
const userId = 123;
const avatarUrl = `https://example.com/avatars/${userId}.png`;

return <img src={avatarUrl} alt="User Avatar" />;
```

---

#### 5. **多行字符串**

当需要插入多行文本内容时，可以直接在 Template Literals 中换行。

```jsx
const message = `Hello,
This is a multi-line message in React.`;

return <p>{message}</p>;
```

---

### **Template Literals 的优势**

1. **简洁清晰**：不用拼接字符串操作符 (`+`)，代码更易读。
2. **动态插值**：可以插入变量、函数调用、表达式等，灵活性强。
3. **支持多行**：便于处理复杂的文本内容。

在 React 中，Template Literals 是非常常见的工具，与 JSX 的表达式结合，可以大幅提高代码的可读性和灵活性。