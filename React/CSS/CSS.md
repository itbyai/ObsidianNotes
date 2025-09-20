CSS有三种主要的使用方式：

1. **内联样式（Inline Styles）**：内联样式是直接应用于HTML元素的样式。这意味着在HTML标记中使用`style`属性来定义样式。内联样式会覆盖外部样式表和内部样式表中的相同样式。

   示例：
   ```html
   <p style="color: blue; font-size: 16px;">这是一个使用内联样式的段落。</p>
   ```

2. **内部样式表（Internal Stylesheet）**：内部样式表是定义在HTML文档内部的样式表。它通过`<style>`标签在HTML文档的`<head>`部分中定义，其中包含CSS样式规则。内部样式表只会影响包含它的HTML文档。

   示例：
   ```html
   <head>
       <style>
           p {
               color: red;
               font-size: 18px;
           }
       </style>
   </head>
   <body>
       <p>这是一个使用内部样式表的段落。</p>
   </body>
   ```

3. **外部样式表（External Stylesheet）**：外部样式表是单独的CSS文件，可以在多个HTML文档中共享。通过`<link>`标签将外部样式表链接到HTML文档中。外部样式表有利于样式的集中管理和维护，并且能够提高页面加载速度。

   示例：
   ```html
   <!-- 在HTML文档中引用外部样式表 -->
   <head>
       <link rel="stylesheet" type="text/css" href="styles.css">
   </head>
   <body>
       <p>这是一个使用外部样式表的段落。</p>
   </body>
   ```

这三种方式各有优劣，根据具体情况选择最适合的方式来组织和管理CSS样式。