函数组件（Function Components）是React中用于定义UI逻辑的基本单元。与类组件不同，函数组件更加简洁，易于理解和编写。自React 16.8引入Hooks以来，函数组件也能处理状态和副作用，几乎能完成类组件能做的所有事情。

### 定义函数组件

函数组件是一个接受`props`并返回React元素的JavaScript函数。最基本的函数组件如下：

```javascript
import React from 'react';

function MyComponent(props) {
  return <div>Hello, {props.name}!</div>;
}

export default MyComponent;
```

### 使用`props`

函数组件通过`props`接收传入的数据。`props`是一个对象，包含了父组件传递给子组件的所有数据。

```javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

在使用时，可以这样传递`props`：

```javascript
<Greeting name="Alice" />
```

### 使用状态和Hooks

函数组件通过Hooks来管理状态和副作用。最常用的两个Hooks是`useState`和`useEffect`。

#### `useState`

`useState`是一个Hook，用于在函数组件中添加状态。它返回一个状态变量和一个更新状态的函数。

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

#### `useEffect`

`useEffect`是一个Hook，用于在函数组件中执行副作用操作。它类似于类组件中的生命周期方法（如`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`）。

```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}

export default Timer;
```

### 使用上下文（Context）

上下文（Context）提供了一种在组件树中共享数据的方法，而不需要通过`props`逐层传递。上下文通常用于全局数据，如当前的认证用户、主题或语言。

#### 创建和使用上下文

```javascript
import React, { createContext, useContext } from 'react';

// 创建上下文
const ThemeContext = createContext('light');

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === 'light' ? '#fff' : '#333' }}>Theme Button</button>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeButton />
    </ThemeContext.Provider>
  );
}

export default App;
```

### 自定义Hook

自定义Hook是将逻辑提取到可重用函数中的一种方式。自定义Hook必须以`use`开头，以确保遵循Hook的规则。

```javascript
import { useState, useEffect } from 'react';

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

function Counter() {
  const count = useCounter(0);
  return <div>Count: {count}</div>;
}

export default Counter;
```

### 完整示例

以下是一个完整的React函数组件示例，展示了如何使用状态、效果和上下文。

```javascript
import React, { useState, useEffect, createContext, useContext } from 'react';

// 创建上下文
const CountContext = createContext();

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Count: {count}</div>;
}

function Display() {
  const count = useContext(CountContext);
  return <div>Context Count: {count}</div>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={count}>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Counter />
      <Display />
    </CountContext.Provider>
  );
}

export default App;
```

### 总结

函数组件是React中推荐的定义组件的方式，尤其在引入Hooks之后。通过`useState`管理状态，通过`useEffect`处理副作用，通过上下文共享数据，并且可以创建自定义Hook来重用逻辑，函数组件提供了一种简洁而强大的方式来构建React应用程序。