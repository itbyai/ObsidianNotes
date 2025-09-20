在 **WebdriverIO** 中，元素定位是测试自动化的核心。它本质上继承了 **WebDriver 协议** 和 **W3C 标准** 的选择器能力，同时 WebdriverIO 还扩展了自己的语法。

下面我给你详细列出 WebdriverIO 支持的 **元素定位方法**，并附上 **示例**：

---

## 1. 基于 CSS 选择器

最常用的定位方式，几乎支持所有浏览器。

```js
const elem = await $('div.my-class');
```

---

## 2. 基于 ID

HTML `id` 是唯一的，因此是最稳定的定位方式。

```js
const elem = await $('#username');
```

---

## 3. 基于 Class Name

通过类名定位。

```js
const elem = await $('.login-button');
```

---

## 4. 基于 Tag Name

根据 HTML 标签定位。

```js
const elem = await $('button');
```

---

## 5. 基于 Attribute（属性选择器）

可以组合属性值。

```js
const elem = await $('input[type="email"]');
```

---

## 6. 基于 Text（文本内容）

WebdriverIO 提供了 `=` 和 `*=` 两种方式：

- **精确匹配文本**
    

```js
const elem = await $('=Login');
```

- **模糊匹配文本**
    

```js
const elem = await $('*=Log');
```

---

## 7. 基于 Link Text / Partial Link Text

常用于 `<a>` 链接。

```js
const elem = await $('=Home');     // 完全匹配
const elem = await $('*=Hom');     // 部分匹配
```

---

## 8. 基于 XPath

XPath 是最强大的定位方式，尤其在复杂 DOM 中。

```js
const elem = await $('//div[@id="main"]//button[text()="Submit"]');
```

---

## 9. 基于 Shadow DOM

处理 Web Components 时使用。

```js
const elem = await $('custom-element').shadow$('#inner-button');
```

---

## 10. 基于 React 组件（`@wdio/devtools-service` 或社区插件）

当应用使用 React，可以用组件名定位。

```js
const elem = await $('react=MyButton[prop1="value"]');
```

---

## 11. 基于 Android UIAutomator（移动端专用）

在 Appium + WebdriverIO 中，Android 提供 `android=` 语法。

```js
const elem = await $('android=new UiSelector().text("Login")');
```

---

## 12. 基于 iOS Class Chain / Predicate String（移动端专用）

适用于 iOS 测试。

```js
// iOS Class Chain
const elem = await $('-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]');

// iOS Predicate String
const elem = await $('-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"');
```

---

## 13. 相对定位（W3C WebDriver 新标准）

WebdriverIO 8 开始支持 **relative locator**：

```js
const loginBtn = await $('button=Login');
const label = await browser.findElement('xpath', `//*[text()="Password"]`);
const input = await browser.findElement('relative', { using: 'to right of', value: label });
```

---

✅ **总结**  
WebdriverIO 提供的定位方式包括：

- CSS
    
- ID
    
- Class
    
- Tag
    
- Attribute
    
- Text（= 和 *=）
    
- Link Text
    
- XPath
    
- Shadow DOM
    
- React
    
- Android UIAutomator
    
- iOS Class Chain / Predicate
    
- 相对定位
    

这几乎覆盖了 **Web / 移动端 / 桌面端** 全场景。

---

要不要我帮你画一个 **对比表格（方式 / 适用场景 / 示例）**，这样一眼就能看清哪些定位方式更推荐用？






# CSS 选择器分类和写法

## 1️⃣ 基本选择器

|选择器|描述|示例|
|---|---|---|
|`*`|通配符，选中所有元素|`* { margin:0; }`|
|`element`|标签选择器，选中指定标签|`div {}`|
|`.class`|类选择器，选中带有指定 class 的元素|`.btn {}`|
|`#id`|ID 选择器，选中带有指定 id 的元素|`#main {}`|
|`[attr]`|属性选择器，选中带有指定属性的元素|`[disabled] {}`|
|`[attr=value]`|属性等于某值|`[type=text] {}`|
|`[attr~=value]`|属性包含某个单词（空格分隔）|`[class~=btn] {}`|
|`[attr|=value]`|属性值以指定字符串开头（可选 - 后缀）|
|`[attr^=value]`|属性值以某字符串开头|`[href^="https"] {}`|
|`[attr$=value]`|属性值以某字符串结尾|`[src$=".jpg"] {}`|
|`[attr*=value]`|属性值包含某字符串|`[title*="hello"] {}`|

---

## 2️⃣ 组合选择器

|选择器|描述|示例|
|---|---|---|
|`A B`|后代选择器，B 是 A 的任意后代|`div p {}`|
|`A > B`|子元素选择器，B 是 A 的直接子元素|`ul > li {}`|
|`A + B`|相邻兄弟选择器，B 紧跟在 A 后面|`h1 + p {}`|
|`A ~ B`|一般兄弟选择器，B 与 A 有共同父元素|`h1 ~ p {}`|
|`A, B`|多重选择器，选中 A 或 B|`h1, h2, h3 {}`|

---

## 3️⃣ 伪类选择器

|选择器|描述|示例|
|---|---|---|
|`:first-child`|第一个子元素|`li:first-child {}`|
|`:last-child`|最后一个子元素|`li:last-child {}`|
|`:nth-child(n)`|第 n 个子元素（n 可表达式）|`li:nth-child(2) {}`|
|`:nth-last-child(n)`|从后往前第 n 个|`li:nth-last-child(1) {}`|
|`:first-of-type`|第一个指定类型的元素|`p:first-of-type {}`|
|`:last-of-type`|最后一个指定类型|`p:last-of-type {}`|
|`:nth-of-type(n)`|第 n 个指定类型|`p:nth-of-type(3) {}`|
|`:nth-last-of-type(n)`|从后数第 n 个指定类型|`p:nth-last-of-type(2) {}`|
|`:only-child`|唯一子元素|`div:only-child {}`|
|`:only-of-type`|唯一指定类型子元素|`p:only-of-type {}`|
|`:empty`|没有子元素|`div:empty {}`|
|`:not(selector)`|否定选择器|`div:not(.active) {}`|
|`:hover`|鼠标悬停|`a:hover {}`|
|`:focus`|获取焦点|`input:focus {}`|
|`:active`|被激活（按下）|`button:active {}`|
|`:checked`|表单选中|`input:checked {}`|
|`:disabled`|表单禁用|`input:disabled {}`|
|`:enabled`|表单可用|`input:enabled {}`|

---

## 4️⃣ 伪元素选择器

|选择器|描述|示例|
|---|---|---|
|`::before`|元素内容前插入|`p::before { content:"*"; }`|
|`::after`|元素内容后插入|`p::after { content:"."; }`|
|`::first-letter`|首字母|`p::first-letter { font-size:2em; }`|
|`::first-line`|首行|`p::first-line { color:red; }`|
|`::selection`|选中文本|`p::selection { background:yellow; }`|

> 注意：旧版伪元素用单冒号 `:` 也可以（兼容性问题）。

---

## 5️⃣ 结构性选择器（结合伪类）

|选择器|描述|示例|
|---|---|---|
|`:nth-child(odd)` / `:nth-child(even)`|奇数/偶数|`li:nth-child(odd) {}`|
|`:first-of-type` / `:last-of-type`|类型第一个/最后一个|`p:first-of-type {}`|
|`:only-of-type`|唯一类型|`p:only-of-type {}`|

---

## 6️⃣ 属性 + 伪类组合

```css
input[type="text"]:focus { border-color: red; }
ul li:first-child a:hover { color: blue; }
div[class*="container"]:not(.hidden) { display:block; }
```

- 属性选择器和伪类可以组合，增加定位精度。
    

---

## 7️⃣ 总结

CSS 选择器的写法非常多，从**最基础**的 tag/class/id，到**属性选择器**、**组合选择器**、**伪类**、**伪元素**，可以满足各种元素定位需求。

在自动化测试中（WebdriverIO、Playwright 等）：

- 常用的选择器：
    
    - ID `#id` → 唯一最稳
    - class `.class` → 常用
        
    - 标签 + class `div.btn` → 精确
        
    - 属性 `[type="text"]` → 针对表单元素
        
    - 伪类 `:nth-child()` → 定位特定列表项
        
    - 组合选择器 `div > ul > li` → 层级明确
        

---

我可以帮你画一个 **CSS 选择器的树状/层级图**，把 **ID / class / tag / 属性 / 伪类 / 组合** 全部可视化，方便快速查找和记忆。

你希望我画吗？