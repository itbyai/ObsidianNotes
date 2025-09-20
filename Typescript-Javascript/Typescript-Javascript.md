TypeScript 和 JavaScript 的主要差别可以从几个方面来理解：

---

## 1. **类型系统**

- **JavaScript**：动态类型语言（Dynamic Typing），变量的类型在运行时才确定，可以随时改变。
    
    ```javascript
    let x = 10; // number
    x = "hello"; // 也可以变成 string，不会报错
    ```
    
- **TypeScript**：静态类型语言（Static Typing，类型可选），在编译阶段就会检查类型是否匹配。
    
    ```typescript
    let x: number = 10;
    x = "hello"; // ❌ 编译时报错
    ```
    

---

## 2. **编译与运行**

- **JavaScript**：直接运行在浏览器或 Node.js 中，无需编译。
    
- **TypeScript**：需要先编译为 JavaScript，再运行。编译器（`tsc`）会检查语法和类型。
    

---

## 3. **面向对象支持**

- **JavaScript**：支持类和对象（ES6 之后），但缺少接口、抽象类等更严格的 OOP 特性。
    
- **TypeScript**：增强了 OOP，支持接口、泛型、枚举、抽象类、访问修饰符（public/private/protected）等。
    
    ```typescript
    interface User {
      name: string;
      age: number;
    }
    
    class Person implements User {
      constructor(public name: string, public age: number) {}
    }
    ```
    

---

## 4. **开发体验**

- **JavaScript**：更灵活，学习门槛低，但大型项目中容易出错。
    
- **TypeScript**：配合编辑器（VS Code 等），有智能提示、代码补全、类型检查，开发体验更好，特别适合中大型项目。
    

---

## 5. **生态兼容性**

- **JavaScript**：浏览器原生支持。
    
- **TypeScript**：完全兼容 JavaScript，可以逐步迁移（TS 文件里也能写纯 JS 代码）。
    

---

## 总结表格

|特性|JavaScript|TypeScript|
|---|---|---|
|**类型系统**|动态类型|静态类型（可选）|
|**编译**|无需编译|需编译成 JavaScript|
|**面向对象**|基础支持（class）|强化支持（接口、泛型、枚举、修饰符等）|
|**错误发现时机**|运行时|编译时（提前发现错误）|
|**适用场景**|小型、快速开发|中大型项目、多人协作、可维护性更高|

---

👉 一句话总结：  
**TypeScript 是 JavaScript 的超集，增加了静态类型检查和更强大的语法工具，使得代码更健壮、更易维护。**

要不要我给你画一个 **“JS vs TS 开发流程对比图”**，直观展示它们的区别？