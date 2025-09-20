# driver.contexts() / driver.switch_to.context()



## 1️⃣ 什么是 WebView？

- 移动 App 里有两种常见页面：
    
    - **Native 界面**：用 iOS (Swift/Objective-C) 或 Android (Java/Kotlin) 原生控件写的界面，比如按钮、输入框。
        
    - **WebView 界面**：其实是一个内嵌的浏览器（小窗口），里面加载的是网页 (HTML/JS/CSS)。  
        👉 常见在 **登录页、支付页、广告、H5 活动页面**。
        

举例：  
你打开一个银行的 App → 首页是原生的 → 点击“支付” → 打开一个 H5 界面（WebView） → 这部分就不再是原生控件了。

---

## 2️⃣ 为什么要切换？

- **Appium 默认只能操作 Native 上的控件**。
    
- 如果一个按钮或输入框是放在 WebView 中，Appium 在默认模式下是“看不到”的。
    

所以：

- 在 **Native 模式**：可以用 `find_element_by_accessibility_id` / `find_element_by_id`。
    
- 在 **WebView 模式**：要用 **Selenium WebDriver 的 DOM 定位方式**（XPath, CSS selector）。
    

👉 也就是说：**切换后才能在 WebView 里操作 DOM 元素**。

---

## 3️⃣ 怎么切换？

```python
# 获取当前所有可用上下文
contexts = driver.contexts  
print(contexts)
# 输出可能是：['NATIVE_APP', 'WEBVIEW_com.example.app']

# 切换到 WebView
driver.switch_to.context('WEBVIEW_com.example.app')

# 现在就可以用 Web 的定位方式找元素了
element = driver.find_element(By.CSS_SELECTOR, "button.login")
element.click()

# 操作完再切回原生
driver.switch_to.context('NATIVE_APP')
```

---

## 4️⃣ 为什么很重要？

- 很多 App 是 **混合应用 (Hybrid App)**，既有 Native 界面，也有 WebView 页面。
    
- 如果不会切换上下文，就只能测 Native 的部分，WebView 的功能完全无法覆盖。
    
- 常见的面试问题：
    
    - “你在测试 Appium 时，怎么定位 WebView 里的元素？”
        
    - “如果 WebView 没有出现在 driver.contexts 里怎么办？”（答案：可能要先启用 `setWebContentsDebuggingEnabled(true)`，或配置 chromedriver）
        

---

✅ 总结：

- `driver.contexts`：查看当前 App 里有哪些“上下文”（Native / WebView）。
    
- `driver.switch_to.context()`：在不同上下文之间切换。
    
- 必须这么做，因为 **Native 定位和 WebView 定位用的是完全不同的机制**。
    

---

