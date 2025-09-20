CSS选择器是用于选择HTML文档中特定元素的模式或规则。通过选择器，可以指定哪些HTML元素将会应用某个或某些样式。CSS选择器可以基于元素的标签名、类、ID、属性等进行选择。

以下是一些常见的CSS选择器及其示例：

1. **元素选择器（Element Selector）**：选择特定的HTML元素。

   示例：
   ```css
   p {
       color: blue;
   }
   ```
   这个选择器会选择所有段落 `<p>` 元素，并将它们的文字颜色设置为蓝色。

2. **类选择器（Class Selector）**：选择具有特定类的元素。

   示例：
   ```css
   .highlight {
       background-color: yellow;
   }
   ```
   这个选择器会选择所有具有 `highlight` 类的元素，并将它们的背景颜色设置为黄色。

3. **ID选择器（ID Selector）**：选择具有特定ID的元素。

   示例：
   ```css
   #header {
       font-size: 24px;
   }
   ```
   这个选择器会选择具有 `header` ID 的元素，并将它们的字体大小设置为24像素。

4. **后代选择器（Descendant Selector）**：选择某个元素的后代元素。

   示例：
   ```css
   div p {
       font-style: italic;
   }
   ```
   这个选择器会选择所有在 `<div>` 元素内部的段落 `<p>` 元素，并将它们的字体样式设置为斜体。

5. **属性选择器（Attribute Selector）**：选择具有特定属性的元素。

   示例：
   ```css
   input[type="text"] {
       border: 1px solid #ccc;
   }
   ```
   这个选择器会选择所有 `type` 属性为 `text` 的输入元素，并将它们的边框样式设置为灰色实线。

6. **伪类选择器（Pseudo-class Selector）**：选择特定状态的元素。

   示例：
   ```css
   a:hover {
       color: red;
   }
   ```
   这个选择器会选择鼠标悬停在链接上时的 `<a>` 元素，并将它们的文字颜色设置为红色。

通过组合使用这些选择器，可以精确地选择文档中的特定元素，并应用相应的样式。

# 组合选择器

CSS选择器可以通过多种方式组合，从而创建不同类型的选择器。以下是一些常见的CSS选择器组合类型：

1. **后代选择器（Descendant Selector）**：选择指定元素的后代元素。使用空格分隔。

```css
.container p {
    /* 选择所有位于容器元素内的 <p> 元素 */
}
```

2. **子元素选择器（Child Selector）**：选择指定元素的直接子元素。使用 ">" 分隔。

```css
ul > li {
    /* 选择所有 <ul> 元素的直接子元素 <li> */
}
```

3. **相邻兄弟选择器（Adjacent Sibling Selector）**：选择紧接在指定元素后的同级元素。使用 "+" 分隔。

```css
h2 + p {
    /* 选择紧接在 <h2> 元素后的同级 <p> 元素 */
}
```

4. **通用兄弟选择器（General Sibling Selector）**：选择指定元素后的所有同级元素。使用 "~" 分隔。

```css
h2 ~ p {
    /* 选择所有紧接在 <h2> 元素后的同级 <p> 元素 */
}
```

5. **组合选择器（Compound Selector）**：组合多个选择器来选择特定元素。

```css
.container p.red-text {
    /* 选择所有位于容器元素内且具有类名为 red-text 的 <p> 元素 */
}
```

这些是常见的CSS选择器组合类型，它们可以根据不同的需求组合使用，以选择特定的HTML元素，并根据需要应用样式。