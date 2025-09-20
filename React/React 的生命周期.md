
React 的生命周期指的是组件从创建到销毁整个过程中的一系列状态变化。每个阶段都有对应的生命周期方法，可以在适当的时机执行特定的操作。React 的生命周期分为三大阶段：

1. **组件的挂载（Mounting）**
2. **组件的更新（Updating）**
3. **组件的卸载（Unmounting）**

在 `React 16.3` 之后，类组件的生命周期方法发生了一些变化，部分生命周期方法被弃用或有了新名字，重点引入了新的 `getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate`。同时，React Hooks 让函数组件也可以有类似的生命周期行为。

### 1. 组件的挂载（Mounting）
当组件实例被创建并插入到 DOM 中时，会依次调用以下生命周期方法：

- **`constructor()`**：这是类组件的构造函数，在组件被初始化时最先调用。可以在这里初始化状态（`this.state`）或绑定事件处理器。需要注意，不能在此处进行副作用（如 AJAX 请求等）操作。
  
  ```jsx
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  ```

- **`static getDerivedStateFromProps(props, state)`**：这是一个静态方法，每次在组件实例化或接收到新的 `props` 时被调用，作用是根据 `props` 派生新的 `state`。该方法是无副作用的。

  ```jsx
  static getDerivedStateFromProps(props, state) {
    // 根据新的props修改state
    if (props.count !== state.count) {
      return { count: props.count };
    }
    return null; // 不需要更新state
  }
  ```

- **`render()`**：这是最核心的方法，它返回 JSX，用于渲染组件的 UI。`render` 是纯函数，不能在此处执行副作用。

  ```jsx
  render() {
    return <div>{this.state.count}</div>;
  }
  ```

- **`componentDidMount()`**：该方法在组件第一次渲染完成后立即执行，适合在此处执行副作用操作，如 AJAX 请求、订阅事件或操作 DOM 等。这是操作异步任务的常用方法。

  ```jsx
  componentDidMount() {
    // 比如发起网络请求
    fetch('/api/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  ```

### 2. 组件的更新（Updating）
当组件的 `state` 或 `props` 发生变化时，组件会更新并重新渲染，更新阶段包括以下生命周期方法：

- **`static getDerivedStateFromProps(props, state)`**：和挂载阶段一样，更新阶段也会调用这个方法，用来更新 `state`。如果没有基于 `props` 更新 `state` 的需求，可以返回 `null`。

- **`shouldComponentUpdate(nextProps, nextState)`**：这是一个性能优化的关键方法。它在组件接收到新的 `props` 或 `state` 后调用，决定组件是否需要重新渲染。默认返回 `true`，即会进行重新渲染。如果返回 `false`，则阻止组件更新。

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.count !== this.props.count;
  }
  ```

- **`render()`**：与挂载阶段相同，`render` 方法用于返回要展示的 JSX。

- **`getSnapshotBeforeUpdate(prevProps, prevState)`**：该方法在更新 DOM 之前调用，可以获取当前 DOM 的状态。返回值将作为参数传递给 `componentDidUpdate`。

  ```jsx
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 比如返回滚动位置
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.scrollHeight;
    }
    return null;
  }
  ```

- **`componentDidUpdate(prevProps, prevState, snapshot)`**：在组件更新后立即调用。可以在这里进行 DOM 操作或发起新的请求。`snapshot` 是由 `getSnapshotBeforeUpdate` 返回的值。

  ```jsx
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      // 滚动到之前的位置
      this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
    }
  }
  ```

### 3. 组件的卸载（Unmounting）
当组件从 DOM 中移除时，卸载阶段只调用一个生命周期方法：

- **`componentWillUnmount()`**：在组件即将被卸载和销毁之前调用。适合在此处清理定时器、取消订阅或清除其他副作用操作。

  ```jsx
  componentWillUnmount() {
    // 比如清理定时器
    clearInterval(this.timerID);
  }
  ```

### React Hook 中的生命周期替代
在函数组件中，使用 `useEffect` 钩子来模拟类组件的生命周期方法。它可以看作是 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的组合：

```jsx
import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // 模拟componentDidMount和componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    return () => {
      // 模拟componentWillUnmount，清理工作
      console.log('Cleanup...');
    };
  }, [count]); // 依赖count变化触发

  return <div>{count}</div>;
}
```

### Context 传递是否可以实现更多层的传递
通过 **Context API**，可以实现数据在多层组件之间的传递，而不需要逐层通过 `props`。Context 的设计使得组件树中任何深层次的组件都能订阅到上层的 Context 数据。