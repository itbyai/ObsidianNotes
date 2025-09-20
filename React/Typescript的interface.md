在 TypeScript 中，`interface` 是一种定义对象结构的方式，用来描述对象的形状。它指定了对象有哪些属性以及这些属性的类型。`interface` 可以用来约束类、函数、数组等，使得代码在编译时就能发现类型错误，从而提高代码的可靠性和可维护性。

### TypeScript 中的 `interface`

1. **基本定义**:
   ```typescript
   interface Person {
     name: string;
     age: number;
   }

   const john: Person = {
     name: "John",
     age: 30,
   };
   ```

   在上面的例子中，`Person` 接口定义了一个具有 `name` 和 `age` 属性的对象结构，`john` 对象必须符合这个结构。

2. **可选属性**:
   ```typescript
   interface Person {
     name: string;
     age?: number; // age 是可选的
   }

   const jane: Person = {
     name: "Jane",
   };
   ```

   使用 `?` 可以定义可选属性。在这个例子中，`age` 属性是可选的。

3. **只读属性**:
   ```typescript
   interface Point {
     readonly x: number;
     readonly y: number;
   }

   let p1: Point = { x: 10, y: 20 };
   // p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property.
   ```

   `readonly` 关键字用于定义只读属性，一旦初始化后就不能再修改。

4. **函数类型**:
   ```typescript
   interface SearchFunc {
     (source: string, subString: string): boolean;
   }

   const mySearch: SearchFunc = function (source, subString) {
     return source.includes(subString);
   };
   ```

   接口也可以用来定义函数类型，指定函数的参数类型和返回值类型。

5. **索引签名**:
   ```typescript
   interface StringArray {
     [index: number]: string;
   }

   let myArray: StringArray = ["Bob", "Fred"];
   let myStr: string = myArray[0];
   ```

   索引签名用于描述那些通过索引访问的对象或数组类型。

6. **继承接口**:
   ```typescript
   interface Shape {
     color: string;
   }

   interface Square extends Shape {
     sideLength: number;
   }

   let square: Square = {
     color: "blue",
     sideLength: 10,
   };
   ```

   接口可以继承另一个接口，从而扩展其属性。

### `interface` 和 Contract 的关系

在软件开发中，`contract`（契约）是指系统各部分之间的约定或协议，定义了如何进行交互。它确保各部分按照预期方式进行合作，减少耦合，提高系统的可维护性和可测试性。

在 TypeScript 中，`interface` 就相当于一个契约：

- **定义约束**: `interface` 明确了对象的结构和行为契约，规定了对象应该具有的属性和方法。这种明确的约束有助于在开发过程中防止错误，提高代码的健壮性。
- **实现约定**: 当一个类实现某个接口时，它必须遵循接口定义的契约，确保所有接口要求的属性和方法都得到实现。
  
  ```typescript
  interface Printable {
    print(): void;
  }

  class Document implements Printable {
    print() {
      console.log("Document content");
    }
  }
  ```

  在这个例子中，`Document` 类实现了 `Printable` 接口，必须提供 `print` 方法，这就是类对接口契约的实现。

- **提高代码可读性和可维护性**: 使用接口定义契约有助于代码的可读性，使其他开发者能清晰地了解对象的结构和行为。

总结来说，TypeScript 中的 `interface` 是一种强大的工具，用来定义对象的结构和行为，起到了类似契约的作用，确保代码在不同部分之间的交互符合预期，减少错误，提升代码质量和可维护性。