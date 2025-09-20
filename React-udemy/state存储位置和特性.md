不同类型的 `state` 需要用不同的存储方式，以下是一些典型的 `feature` 及适合的 `state` 存储方法：

---

### ✅ **1. 适合 `useState`（仅组件内存储，刷新后丢失）**

**适用场景**：用户短暂交互的数据，不需要跨组件或页面共享，页面刷新后可以丢失。  
**示例**：

- **表单输入内容（未提交前）**
- **鼠标悬停状态（hover）**
- **模态框（Modal）是否打开**
- **计时器倒计时（如5秒后关闭提示框）**

**示例代码**：

```jsx
function Modal() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>打开弹窗</button>
      {isOpen && <div>弹窗内容</div>}
    </div>
  );
}
```

- **为什么使用 `useState`？**
    - 仅限于当前组件内部，刷新页面后 `state` 重置不会有影响。

---

### ✅ **2. 适合 `useContext`（全局共享，但刷新后丢失）**

**适用场景**：多个组件需要共享的**临时数据**，但刷新页面后可以丢失。  
**示例**：

- **当前登录用户信息（短时间的）**
- **全局主题（深色/浅色）**
- **语言选择**
- **购物车数据（仅限当前 session，不需要持久化）**

**示例代码**：

```jsx
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      切换主题
    </button>
  );
}
```

- **为什么使用 `useContext`？**
    - 适用于全局状态共享，避免 `props drilling`（属性逐层传递）。

---

### ✅ **3. 适合 `localStorage`（长期存储，刷新后保留）**

**适用场景**：用户长期存储的数据，即使关闭浏览器也需要保留。  
**示例**：

- **深色/浅色模式**
- **已完成的任务列表**
- **最近访问的页面**
- **收藏夹**

**示例代码**：

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

function FavoritePage() {
  const [favorites, setFavorites] = usePersistentState("favorites", []);
  return (
    <button onClick={() => setFavorites([...favorites, "新收藏"])}>
      添加收藏
    </button>
  );
}
```

- **为什么使用 `localStorage`？**
    - 用户下次访问仍然能看到已存储的数据。

---

### ✅ **4. 适合 `sessionStorage`（页面刷新不丢失，关闭浏览器后丢失）**

**适用场景**：仅在**当前标签页**生效，浏览器关闭后可以丢失的状态。  
**示例**：

- **当前填写的表单数据**
- **用户临时登录凭证（不安全，建议用 JWT Token）**
- **上次访问的 Tab 页**

**示例代码**：

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

- **为什么使用 `sessionStorage`？**
    - 适合**临时数据**，不需要跨浏览器会话保存。

---

### ✅ **5. 适合 `URL 参数`（页面刷新不丢失，可分享）**

**适用场景**：希望**状态能通过 URL 传递**，支持分享链接。  
**示例**：

- **搜索筛选条件**
- **分页信息**
- **当前选中的 Tab**

**示例代码**：

```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  return (
    <input
      value={keyword}
      onChange={(e) => setSearchParams({ q: e.target.value })}
    />
  );
}
```

- **为什么使用 `URL 参数`？**
    - 允许用户直接复制 `URL` 并访问相同状态的页面。

---

### ✅ **6. 适合 `Redux Persist`（全局状态存储，刷新后保留）**

**适用场景**：复杂应用，全局状态管理需要持久化。  
**示例**：

- **用户登录状态**
- **购物车**
- **应用设置（语言、主题）**

**示例代码**：

```jsx
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
```

- **为什么使用 `Redux Persist`？**
    - 适用于需要持久化的**全局状态**，如用户数据、购物车等。

---

### ✅ **7. 适合 `IndexedDB`（存储大量数据）**

**适用场景**：存储**结构化数据**，适用于离线应用或数据缓存。  
**示例**：

- **离线支持（缓存 API 数据）**
- **存储大文件或图片**
- **存储聊天记录**

**示例代码**：

```jsx
import { openDB } from "idb";

async function saveToDB(key, value) {
  const db = await openDB("app-db", 1, {
    upgrade(db) {
      db.createObjectStore("store");
    },
  });
  await db.put("store", value, key);
}

async function loadFromDB(key) {
  const db = await openDB("app-db", 1);
  return db.get("store", key);
}
```

- **为什么使用 `IndexedDB`？**
    - 适用于**大数据存储**，如缓存 API 数据，甚至用于 PWA（渐进式网页应用）。

---

## 🎯 **总结：不同 `state` 适用的存储方式**

|`state` 类型|推荐存储方式|适用场景|
|---|---|---|
|**短期组件状态**|`useState`|模态框开关、按钮状态|
|**全局临时状态**|`useContext`|主题切换、当前语言|
|**长期存储**|`localStorage`|购物车、用户偏好设置|
|**会话存储**|`sessionStorage`|当前页面临时数据（如表单）|
|**可分享状态**|`URL 参数`|搜索、筛选、分页|
|**全局持久化状态**|`Redux Persist`|用户登录信息、购物车|
|**大数据存储**|`IndexedDB`|API 缓存、离线存储|

如果 `state` 只是短期使用，`useState` 是最佳选择。  
如果 `state` 需要跨组件或跨页面存储，`localStorage` / `Redux Persist` 更合适。  
如果是大量数据，建议 `IndexedDB`。

你具体的需求是什么？我可以帮你选择最佳存储方案！🚀