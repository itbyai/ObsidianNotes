## 什么是union type？

在 TypeScript 中，**`union type`（联合类型）** 是指一个变量可以是多种类型中的一种。这允许我们将多个类型联合在一起，使得变量可以接受这些类型中的任何一个。

### 语法
`union type` 使用竖线 `|` 来分隔不同的类型。例如：

```typescript
let value: string | number;
```

在这个例子中，`value` 可以是 `string` 或 `number` 类型中的任何一个。

### 示例
```typescript
let id: string | number;

id = 123;  // 这是有效的，因为 id 可以是 number
id = "ABC";  // 这也是有效的，因为 id 也可以是 string
```

### 使用场景
- 当一个函数或变量需要能够处理多种数据类型时，可以使用联合类型。
- 比如，在处理用户输入时，可能需要接受字符串或数字。

### 联合类型的优点
1. **灵活性**：允许你将多种类型组合在一起，从而增强代码的灵活性。
2. **类型检查**：即使变量可以是多种类型，TypeScript 依然会提供类型检查，确保代码运行时的安全。

### 需要注意的地方
当使用联合类型时，如果你需要调用某些特定于某个类型的方法，你可能需要使用类型检查（如 `typeof` 或 `instanceof`）来确保操作安全。

```typescript
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());  // 如果 id 是字符串，则可以调用字符串方法
  } else {
    console.log(id.toFixed(2));  // 如果 id 是数字，则可以调用数字方法
  }
}
```

## 什么时候使用union type

**`union type`（联合类型）** 在 TypeScript 中非常有用，适用于以下场景：

### 1. **多种可能的输入类型**
当函数、变量或参数可能接受不同的数据类型时，使用 `union type` 可以提高代码的灵活性。例如，一个函数可能需要同时处理数字和字符串输入。

**示例：**
```typescript
function getLength(value: string | number): number {
  if (typeof value === 'string') {
    return value.length;
  } else {
    return value.toString().length;
  }
}
```
在这个例子中，`value` 可以是 `string` 或 `number`，函数根据不同的类型执行不同的操作。

### 2. **可选的不同类型的属性**
有时，你可能会处理的数据结构包含多个可选的不同类型的字段。在这种情况下，`union type` 可以确保你处理多个可能的类型。

**示例：**
```typescript
interface Response {
  data: string | null;
  error: string | null;
}

let response: Response = {
  data: null,
  error: "Network Error"
};
```
在这里，`data` 和 `error` 可以是 `string` 或 `null`，取决于请求结果。

### 3. **API 响应或复杂数据结构**
在处理复杂的 API 响应时，返回的字段可能是多种类型中的一种。比如，在某些 API 中，返回值可能是 `number` 或 `string`，甚至 `boolean`，具体取决于返回的数据内容。

**示例：**
```typescript
type ApiResponse = string | number | boolean;

function handleApiResponse(response: ApiResponse) {
  if (typeof response === 'string') {
    console.log("Received a string: ", response);
  } else if (typeof response === 'number') {
    console.log("Received a number: ", response);
  } else {
    console.log("Received a boolean: ", response);
  }
}
```

### 4. **与第三方库或动态数据的交互**
在使用第三方库或者处理动态数据时，输入的数据类型往往是不确定的。使用 `union type` 可以帮助你处理这种情况。

**示例：**
```typescript
function processEvent(event: MouseEvent | KeyboardEvent) {
  if (event instanceof MouseEvent) {
    console.log("Mouse event detected");
  } else if (event instanceof KeyboardEvent) {
    console.log("Keyboard event detected");
  }
}
```

### 5. **类型扩展**
有时你需要根据不同的操作或状态使用多个类型，这可以让代码更具扩展性和灵活性。

**示例：**
```typescript
type SuccessResponse = { success: true, data: string };
type ErrorResponse = { success: false, error: string };

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.success) {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}
```

### 总结
使用 `union type` 的场景主要有以下几种：
- 当一个变量或函数参数可能有多种数据类型时。
- 处理 API 响应或第三方数据时，不确定返回类型。
- 扩展性需求较大，期望能灵活地应对多种数据类型的变化。
- 为了编写更加灵活且易于维护的代码。

