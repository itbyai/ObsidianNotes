在 React 中，`state` 默认情况下**不会**在页面刷新后保持。但你可以使用一些方法来**持久化存储 `state`**，确保页面刷新后数据不会丢失。

---

## ❌ **不能在刷新后保持 `state` 的方法**

以下方法在页面刷新后 `state` 会丢失：

### 1. `useState`（组件内部状态）

```jsx
function MyComponent() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>点击 {count}</button>;
}
```

- **原因**：`useState` 存储在**组件内存**中，页面刷新后组件会重新加载，`state` 会被重置。

### 2. `useContext`（全局状态）

```jsx
const CountContext = React.createContext();
function Parent() {
  const [count, setCount] = React.useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Child />
    </CountContext.Provider>
  );
}
```

- **原因**：`Context` 依赖 `useState`，页面刷新后 `state` 仍然会重置。

### 3. `useReducer`

```jsx
function reducer(state, action) {
  return { count: state.count + 1 };
}

function MyComponent() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return <button onClick={() => dispatch({ type: "increment" })}>点击 {state.count}</button>;
}
```

- **原因**：`useReducer` 本质上和 `useState` 一样，状态存储在内存中，页面刷新后会丢失。

---

## ✅ **可以在刷新后保持 `state` 的方法**

以下方法可以让 `state` 在页面刷新后仍然存在：

### **1. `localStorage`（长期存储，浏览器关闭后仍然存在）**

适用于：用户偏好、购物车、表单数据等。

```jsx
function usePersistentState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function MyComponent() {
  const [count, setCount] = usePersistentState("count", 0);
  return <button onClick={() => setCount(count + 1)}>点击 {count}</button>;
}
```

- **优点**：数据不会丢失，即使用户关闭浏览器、重启电脑。
- **缺点**：只能存储字符串，可能会导致数据过时，无法自动清除。

---

### **2. `sessionStorage`（临时存储，页面关闭后消失）**

适用于：仅在**单个会话**（同一个标签页）内保持的数据，比如临时表单填写内容。

```jsx
function useSessionState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
```

- **优点**：刷新页面不会丢失数据。
- **缺点**：浏览器关闭后数据会丢失。

---

### **3. `URL 参数`（适用于页面状态）**

适用于：分页、筛选、搜索等场景，状态会存储在 `URL` 里，刷新不会丢失。

```jsx
import { useSearchParams } from "react-router-dom";

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const count = searchParams.get("count") || 0;

  return (
    <button
      onClick={() => setSearchParams({ count: Number(count) + 1 })}
    >
      点击 {count}
    </button>
  );
}
```

- **优点**：可以分享 URL 直接进入某个状态（比如 `?count=3`）。
- **缺点**：只能存储字符串，数据结构有限。

---

### **4. `Redux Persist`（持久化 Redux 状态）**

如果你的项目使用 **Redux**，可以用 `redux-persist` 让 `store` 存储在 `localStorage` 或 `sessionStorage` 中。

#### **安装 Redux Persist**

```bash
npm install redux-persist
```

#### **配置 Redux**

```jsx
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
```

#### **使用 Redux Persist**

```jsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyComponent />
      </PersistGate>
    </Provider>
  );
}
```

- **优点**：适用于复杂应用，不需要手动管理 `localStorage`。
- **缺点**：需要学习 Redux 和 `redux-persist`。

---

### **5. `IndexedDB`（适用于大量数据）**

适用于：需要存储**大量**数据（如缓存 API 数据、离线存储）。

```jsx
import { openDB } from "idb";

async function saveToDB(key, value) {
  const db = await openDB("my-database", 1, {
    upgrade(db) {
      db.createObjectStore("store");
    },
  });
  await db.put("store", value, key);
}

async function loadFromDB(key) {
  const db = await openDB("my-database", 1);
  return db.get("store", key);
}
```

- **优点**：适合存储大量结构化数据。
- **缺点**：API 复杂，读取数据需要异步处理。

---

## **总结**

|方法|刷新后 `state` 是否保留？|适用场景|优缺点|
|---|---|---|---|
|`useState`|❌ 不会保留|组件内部状态|刷新后 `state` 丢失|
|`useContext`|❌ 不会保留|全局状态|刷新后 `state` 丢失|
|`localStorage`|✅ 保留|用户偏好、表单、购物车|手动管理存储|
|`sessionStorage`|✅ 保留（仅本次会话）|临时数据、表单|关闭浏览器后丢失|
|`URL 参数`|✅ 保留|页面筛选、分页|只能存储简单数据|
|`Redux Persist`|✅ 保留|Redux 全局状态|需要 Redux|
|`IndexedDB`|✅ 保留|大量数据存储|API 复杂|

如果你需要**持久化状态**，推荐：

1. **简单数据**：`localStorage` / `sessionStorage`
2. **页面参数**：`URL`
3. **全局状态**：`Redux Persist`
4. **大量数据**：`IndexedDB`

你可以根据项目需求选择最合适的方法！ 🚀