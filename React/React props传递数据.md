在React中，使用props（属性）是将数据从一个组件传递到另一个组件的主要方式。父组件可以通过props将数据传递给其子组件，子组件则可以通过访问props来使用这些数据。props在React中是只读的，子组件不能修改它们。

### 使用props传递数据的步骤

1. **定义父组件**：在父组件中定义要传递的数据，并通过JSX语法将这些数据作为属性传递给子组件。

2. **定义子组件**：在子组件中，通过参数或`props`对象访问传递的数据。

3. **渲染子组件**：在父组件的JSX中渲染子组件，并传递相应的props。

### 示例

下面是一个完整的示例，展示如何在React中使用props将数据从父组件传递给子组件。

**ParentComponent.js**

```javascript
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  // 定义要传递给子组件的数据
  const message = 'Hello from Parent Component';
  const user = {
    name: 'John Doe',
    age: 30
  };

  return (
    <div>
      <h1>Parent Component</h1>
      {/* 通过props将数据传递给子组件 */}
      <ChildComponent message={message} user={user} />
    </div>
  );
}

export default ParentComponent;
```

**ChildComponent.js**

```javascript
import React from 'react';

function ChildComponent(props) {
  // 通过props访问传递的数据
  const { message, user } = props;

  return (
    <div>
      <h2>Child Component</h2>
      <p>{message}</p>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default ChildComponent;
```

### 详细步骤解析

1. **父组件中定义数据**：
   ```javascript
   const message = 'Hello from Parent Component';
   const user = {
     name: 'John Doe',
     age: 30
   };
   ```

2. **通过JSX传递props**：
   ```javascript
   <ChildComponent message={message} user={user} />
   ```
   这里，父组件`ParentComponent`通过JSX语法将`message`和`user`作为属性传递给子组件`ChildComponent`。

3. **子组件中接收props**：
   ```javascript
   function ChildComponent(props) {
     const { message, user } = props;
     // ...
   }
   ```
   子组件`ChildComponent`通过函数参数`props`接收传递过来的数据，并通过对象解构提取出具体的属性`message`和`user`。

4. **使用props**：
   ```javascript
   return (
     <div>
       <h2>Child Component</h2>
       <p>{message}</p>
       <p>Name: {user.name}</p>
       <p>Age: {user.age}</p>
     </div>
   );
   ```
   子组件在渲染过程中使用传递过来的props数据。

### 使用默认props

你还可以为组件定义默认props，当父组件没有传递某个props时，使用默认值。

```javascript
ChildComponent.defaultProps = {
  message: 'Default Message',
  user: {
    name: 'Default Name',
    age: 0
  }
};
```

### 使用PropTypes进行类型检查

React提供了PropTypes来进行props类型检查，确保传递的数据类型正确。

```javascript
import PropTypes from 'prop-types';

ChildComponent.propTypes = {
  message: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  })
};
```

### 总结

- **props是从父组件传递到子组件的数据**，子组件通过props接收数据，并在渲染时使用这些数据。
- **props是只读的**，子组件不能修改props。
- 可以使用默认props和PropTypes来定义props的默认值和类型检查。