好的 👍 我来帮你系统梳理一下 **Playwright `page` 里 selector 的写法**。

在 Playwright 里，`page.locator()` / `page.$()` / `page.getByXXX()` 等方法都需要传 **selector**，Playwright 的选择器语法比纯 CSS 丰富很多，可以组合使用。

---

## 1. **基本选择器类型**

### (1) **CSS 选择器**

```ts
await page.click('button.submit');
await page.fill('input[name="username"]', 'testuser');
```

- 和浏览器里原生的 CSS 选择器一致。
- 支持类名、ID、属性选择器、组合选择器等。
**具体的做法**
    - 首先了解dom，然后根据dom的语法再写css selector，逐级的或者什么办法

---

### (2) **Text 选择器**

```ts
await page.click('text=Login');
await page.click('text="Sign in"');
```

- `text=...`：选择 **包含指定可见文字** 的元素。
    
- 支持大小写敏感/不敏感匹配。
    

---

### (3) **XPath 选择器**

```ts
await page.click('//button[@id="submit"]');
```

- 直接写 XPath 表达式。
    
- 一般不推荐（可读性差，容易 brittle）。
    

---

### (4) **Role / Accessibility 选择器**

```ts
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
```

- 基于 **ARIA role + accessible name** 的语义化选择器。
    
- 可读性最好，推荐做最佳实践。
    

---

### (5) **Test Id / Data 属性选择器**

```ts
await page.getByTestId('login-button').click();
```

- 对应 DOM 上 `data-testid="login-button"` 的元素。
    
- 建议在测试代码里 **统一用 data-testid** 提高稳定性。
    

---

## 2. **Playwright 提供的高级语法**

### (1) **嵌套选择器**

```ts
await page.locator('.form').locator('button.submit').click();
```

- 可以链式写法，逐层缩小范围。
    

---

### (2) **组合选择器**

```ts
await page.locator('form >> text=Submit');
await page.locator('section >> css=button.primary');
```

- `>>` 表示组合不同选择器引擎。
    

---

### (3) **nth / 位置选择**

```ts
await page.locator('button').nth(2).click();  // 第三个按钮
await page.locator('li >> nth=0');           // 第一个 li
```

---

### (4) **Has / HasText**

```ts
await page.locator('div.card', { hasText: 'Active' });
await page.locator('ul >> li', { has: page.locator('button.delete') });
```

- `hasText`: 元素包含指定文本。
    
- `has`: 元素内包含某个子元素。
    

---

### (5) **Filter / first / last**

```ts
await page.locator('button').first().click();
await page.locator('button').last().click();
await page.locator('button').filter({ hasText: 'Cancel' }).click();
```

---

## 3. **最佳实践推荐顺序**

Playwright 官方推荐：

1. **优先用语义化选择器**
    
    - `getByRole`, `getByLabel`, `getByText`
        
    - 可读性强、维护性好
        
2. **其次用 data-testid**
    
    - 稳定，不受 UI 改动影响
        
3. **再考虑 CSS 选择器**
    
    - 简单场景也可以直接用
        
4. **尽量避免 XPath**
    
    - 除非页面结构特殊
        

---

👉 总结：  
Playwright 支持 **CSS、Text、XPath、Role、TestId、组合/嵌套/过滤** 等多种写法。  
**最佳实践是：语义化优先（Role/Label/Text），其次 TestId，最后才是 CSS/XPath。**

---

要不要我帮你画一份 **Playwright selector 对照表**（不同写法 → 示例 → 使用场景），方便你做速查？