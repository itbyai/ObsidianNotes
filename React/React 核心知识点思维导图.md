---
mindmap-plugin: basic
---

# React 核心知识点

## 1. **React 基础概念**

### JSX (JavaScript XML)

#### [[JSX 的语法]]

#### [[JSX 和 JavaScript 的关系]]

### 组件 (Component)

#### [[函数组件 (Functional Components)]]

#### [[类组件 (Class Components)]]

#### [[组件的可复用性]]

#### [[组件的组合 (Composition)]]

#### [[组件的嵌套]]

### [[`Props` 和 `State`]]

#### [[`Props` 的传递]]

#### [[不变性 (Immutability)]]

#### [[状态 `State` 和状态管理]]

#### [[单向数据流]]

### 虚拟 DOM

#### [[React 的 Diff 算法]]

#### [[DOM 更新优化]]

## 2. **React 生命周期（Class Components）**

### [[挂载阶段（Mounting）]]

#### `constructor()`

#### `getDerivedStateFromProps()`

#### `render()`

#### `componentDidMount()`

### [[更新阶段（Updating）]]

#### `shouldComponentUpdate()`

#### `render()`

#### `getSnapshotBeforeUpdate()`

#### `componentDidUpdate()`

### [[卸载阶段（Unmounting）]]

#### `componentWillUnmount()`

### [[错误处理（Error Handling）]]

#### [[`componentDidCatch()`]]

#### [[`getDerivedStateFromError()`]]

## 3. **Hooks**

### [[`useState`]]

### [[`useEffect`]]

### [[`useContext`]]

### [[`useReducer`]]

### [[`useRef`]]

### [[`useCallback`]]

### [[`useMemo`]]

### [[`useLayoutEffect`]]

### [[自定义 Hooks (Custom Hooks)]]

## 4. **React Router**

### [[路由的基本配置]]

### [[动态路由]]

### [[嵌套路由]]

### [[路由参数（Path Parameters）]]

### [[路由守卫]]

## 5. **Context API**

### [[创建 Context (`createContext`)]]

### [[`Provider` 和 `Consumer`]]

### [[跨组件数据传递]]

### [[useContext Hook]]

## 6. **State 管理**

### [[内部状态管理]]

#### [[`useState`]]

#### [[`useReducer`]]

### [[外部状态管理工具]]

#### Redux

##### [[`createStore`]]

##### [[`reducers`]]

##### [[`dispatch`]]

##### [[中间件 (Middleware)]]

##### [[`useSelector` 和 `useDispatch`]]

#### [[MobX]]

#### [[Recoil]]

## 7. **事件处理**

### [[合成事件（Synthetic Event）]]

### [[事件绑定]]

### [[事件对象]]

### [[受控组件与非受控组件]]

## 8. **性能优化**

### [[`shouldComponentUpdate`]]

### [[`React.memo`]]

### [[`useMemo`]]

### [[`useCallback`]]

### [[懒加载 (Lazy Loading)]]

### [[React 的代码分割 (Code Splitting)]]

### [[Concurrent Mode（并发模式）]]

## 9. **表单处理**

### [[受控组件（Controlled Components）]]

### [[非受控组件（Uncontrolled Components）]]

### [[表单验证]]

### [[Ref 处理表单]]

## 10. **服务端渲染（SSR）**

### [[Next.js]]

### [[ReactDOMServer]]

### [[同构应用（Isomorphic App）]]

## 11. **React 开发工具与生态**

### [[Create React App (CRA)]]

### [[Webpack 与 Babel]]

### [[React DevTools]]

### [[TypeScript 和 React]]

### [[Lint 工具（ESLint）]]

### [[测试工具（Jest, React Testing Library, Enzyme）]]

## 12. **Styling & CSS-in-JS**

### [[CSS 模块]]

### [[Styled Components]]

### [[Emotion]]

### [[Sass 和 Less 集成]]