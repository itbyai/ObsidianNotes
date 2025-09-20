在 React 中，`useSelector` 和 `useDispatch` 是 Redux 提供的两个非常重要的 Hook，它们用于在函数组件中访问 Redux 的状态和发送 actions。通过这两个 Hook，开发者可以轻松地与 Redux 状态管理进行交互，而不需要使用类组件或高阶组件（HOC）。

### 1. `useSelector`

`useSelector` 用于从 Redux 存储中获取状态。它接受一个选择器函数作为参数，该函数接收整个 Redux 状态树并返回所需的状态片段。

#### 用法

```javascript
const selectedState = useSelector(selectorFunction);
```

- **selectorFunction**：选择器函数，接收整个 Redux 状态并返回所需的部分。

#### 示例

```javascript
import React from 'react';
import { useSelector } from 'react-redux';

const TodoList = () => {
  // 从 Redux 状态中选择 todos
  const todos = useSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

### 示例解析

1. **导入 Hook**：首先导入 `useSelector` Hook。

2. **获取状态**：使用 `useSelector` 访问 Redux 中的 `todos` 状态。

3. **渲染列表**：通过 `map` 方法渲染待办事项列表。

### 2. `useDispatch`

`useDispatch` 用于获取 Redux 的 `dispatch` 函数，从而能够发送 actions。通过 `dispatch`，可以通知 Redux 进行状态更新。

#### 用法

```javascript
const dispatch = useDispatch();
```

- **dispatch**：返回的函数，用于发送 actions。

#### 示例

```javascript
import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

const AddTodo = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      // 发送 addTodo action
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
```

### 示例解析

1. **导入 Hook 和 action**：导入 `useDispatch` 和要发送的 action（例如 `addTodo`）。

2. **获取 dispatch**：通过 `useDispatch` 获取 `dispatch` 函数。

3. **管理输入值**：使用 `useState` 钩子管理输入框的状态。

4. **发送 action**：在 `handleAddTodo` 函数中，当输入框有值时，调用 `dispatch(addTodo(inputValue))` 发送 action，并清空输入框。

### 综合示例

结合 `useSelector` 和 `useDispatch` 的完整示例，展示如何在一个待办事项应用中使用这两个 Hook。

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from './todoSlice';

const TodoApp = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
```

### 示例解析

1. **使用 `useSelector` 获取待办事项列表**：通过 `useSelector` 获取 Redux 状态中的 `todos`。

2. **使用 `useDispatch` 发送 actions**：通过 `dispatch` 发送 `addTodo` 和 `removeTodo` actions，来添加和移除待办事项。

3. **管理输入框**：使用 `useState` 来管理输入框的状态。

4. **渲染待办事项**：通过 `map` 方法渲染待办事项，并为每个待办事项添加一个移除按钮。

### 小结

- **`useSelector`** 用于从 Redux 中选择状态，简化了状态的访问。
- **`useDispatch`** 用于发送 actions，便于状态更新。
- 结合这两个 Hook，可以轻松实现复杂的状态管理和交互。

通过使用 `useSelector` 和 `useDispatch`，开发者可以更简洁地在函数组件中管理 Redux 状态，提升代码的可读性和可维护性。