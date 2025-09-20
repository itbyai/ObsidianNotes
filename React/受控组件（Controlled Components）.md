在 React 中，**受控组件**（Controlled Components）是指通过 React 的状态管理来控制表单元素（如输入框、选择框等）值的方式。这种模式使得表单的状态完全由 React 控制，提供了更强的可控性和可预测性。

### 受控组件的主要特点

1. **状态管理**：受控组件的值由 React 的状态管理（如 `useState`）控制，确保 UI 和状态的一致性。
2. **可预测性**：用户输入的内容总是与组件的状态相匹配，便于调试和维护。
3. **集中控制**：可以方便地在一个地方处理表单的逻辑，比如验证和提交。

### 如何使用受控组件

受控组件通常包括以下几个步骤：

1. **初始化状态**：使用 `useState` 钩子来初始化组件的状态。
2. **设置输入元素的值**：将输入元素的 `value` 属性绑定到状态变量。
3. **处理变化事件**：为输入元素添加 `onChange` 事件处理程序，以更新状态。

### 示例：基本的受控组件

以下是一个基本的受控组件示例，展示了如何处理单个输入框的值。

```jsx
import React, { useState } from 'react';

const ControlledInput = () => {
  // 初始化状态
  const [inputValue, setInputValue] = useState('');

  // 处理输入变化
  const handleChange = (event) => {
    setInputValue(event.target.value); // 更新状态
  };

  // 处理表单提交
  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止默认提交行为
    alert(`Submitted Value: ${inputValue}`); // 显示输入值
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input Value:
        <input
          type="text"
          value={inputValue} // 绑定状态值
          onChange={handleChange} // 绑定变化事件
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledInput;
```

### 示例解析

1. **初始化状态**：使用 `useState` 钩子创建一个状态变量 `inputValue`，初始化为空字符串。

2. **设置值**：在 `<input>` 元素中，`value={inputValue}` 使输入框的值与 `inputValue` 状态绑定，确保输入框始终显示当前状态的值。

3. **处理变化**：`onChange={handleChange}` 事件处理程序在输入框内容变化时被调用，更新状态以反映新的输入值。

4. **表单提交**：`handleSubmit` 函数处理表单的提交事件，使用 `event.preventDefault()` 来阻止默认的表单提交行为，并显示当前输入的值。

### 示例：多个受控组件

在一个更复杂的场景中，可能会有多个输入元素，比如姓名和电子邮件。

```jsx
import React, { useState } from 'react';

const ControlledForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // 处理输入变化
  const handleChange = (event) => {
    const { name, value } = event.target; // 解构事件目标
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // 更新对应的状态
    }));
  };

  // 处理表单提交
  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止默认提交行为
    alert(`Name: ${formData.name}, Email: ${formData.email}`); // 显示输入数据
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name" // 指定输入框名称
          value={formData.name} // 绑定状态
          onChange={handleChange} // 绑定变化事件
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email" // 指定输入框名称
          value={formData.email} // 绑定状态
          onChange={handleChange} // 绑定变化事件
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
```

### 示例解析

1. **多个状态**：使用一个对象 `formData` 来存储多个输入框的状态（姓名和电子邮件）。

2. **动态处理**：在 `handleChange` 函数中，使用 `name` 属性来识别哪个输入框被更改，从而更新对应的状态。这样可以避免为每个输入框编写单独的事件处理函数。

3. **显示输入值**：在提交表单时，使用 `alert` 显示输入的姓名和电子邮件。

### 优势

- **状态一致性**：所有输入框的值均由状态管理，确保输入与状态一致，便于调试。
- **集中控制逻辑**：可以集中处理表单的验证、格式化等逻辑。
- **易于扩展**：随着需求的变化，可以轻松地添加更多的输入框，而无需重构整个表单。

### 小结

受控组件是 React 中处理表单输入的推荐方法，通过状态管理来控制输入元素的值，提高了组件的可控性和可预测性。通过适当地使用受控组件，开发者可以更轻松地实现复杂的表单逻辑，提高用户体验。