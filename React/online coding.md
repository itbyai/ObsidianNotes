作为 React 新手，有几个在线平台可以帮助你编写、运行和验证 React 代码，这些平台都非常适合学习和理解 React 的基本知识。以下是一些推荐的网站：

### 1. [CodeSandbox](https://codesandbox.io/)
CodeSandbox 是一个强大的在线代码编辑器，支持 React 和其他前端框架。你可以在其中快速创建新的 React 项目，并且它提供了实时预览功能，让你能够立即看到代码的效果。

- 创建新的 React 项目：
  1. 访问 [CodeSandbox](https://codesandbox.io/).
  2. 点击 "Create Sandbox" 按钮。
  3. 选择 "React" 模板。
  4. 开始编写你的 React 代码。

### 2. [CodePen](https://codepen.io/)
CodePen 是另一个流行的在线代码编辑器，支持 HTML、CSS 和 JavaScript。你可以在其中编写 React 代码，并实时预览结果。适合小型示例和组件的开发与测试。

- 创建新的 Pen：
  1. 访问 [CodePen](https://codepen.io/).
  2. 点击右上角的 "Pen" 按钮。
  3. 在 JavaScript 设置中，添加 Babel 编译器，并选择 "Add External Scripts/Pens" 来引入 React 和 ReactDOM。

### 3. [StackBlitz](https://stackblitz.com/)
StackBlitz 是一个现代的在线 IDE，支持包括 React 在内的许多前端框架。它提供了与本地开发环境相似的体验，支持实时预览和强大的代码编辑功能。

- 创建新的 React 项目：
  1. 访问 [StackBlitz](https://stackblitz.com/).
  2. 点击 "Create Project" 按钮。
  3. 选择 "React" 模板。
  4. 开始编写你的 React 代码。

### 4. [JSFiddle](https://jsfiddle.net/)
JSFiddle 是一个在线编辑和测试 HTML、CSS 和 JavaScript 代码的工具。它支持引入 React 和 ReactDOM 库，可以用于快速测试 React 代码。

- 创建新的 Fiddle：
  1. 访问 [JSFiddle](https://jsfiddle.net/).
  2. 在 "External Resources" 中添加 React 和 ReactDOM 的 CDN 链接。
  3. 编写你的 HTML、CSS 和 JavaScript 代码。

### 5. [React Playground](https://react-playground.js.org/)
React Playground 是一个专门用于 React 的在线编辑器，非常适合快速验证和测试 React 组件。

- 访问 [React Playground](https://react-playground.js.org/).
- 在编辑器中编写你的 React 代码，并实时预览结果。

### 示例项目

这些在线平台非常适合学习和实践 React 的基本概念。你可以从以下简单的示例项目开始：

#### 示例 1: 计数器应用
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```

#### 示例 2: 输入框实时显示
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function InputMirror() {
  const [text, setText] = useState('');

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </div>
  );
}

ReactDOM.render(<InputMirror />, document.getElementById('root'));
```

你可以将这些示例代码粘贴到任何上述平台中，进行在线编辑和运行，实时查看效果。通过不断实验和修改这些示例，你将更好地理解 React 的工作原理和基本概念。