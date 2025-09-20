好的 👍 我帮你整理了一张 **Playwright vs Cypress vs WebdriverIO vs Selenium** 的对比表格，你面试时可以直接拿来讲，很清晰：

---

# 📊 测试框架对比表

|特性/框架|**Playwright**|**Cypress**|**WebdriverIO**|**Selenium**|
|---|---|---|---|---|
|**底层原理**|直接控制浏览器（Chromium/Firefox/WebKit）|直接控制浏览器（主要 Chromium 内核）|基于 WebDriver 协议（封装更好）|基于 WebDriver 协议|
|**支持浏览器**|Chromium, Firefox, WebKit (Safari 引擎)|Chromium, Firefox (有限), Edge|所有 WebDriver 支持的浏览器|所有主流浏览器|
|**支持语言**|JS/TS, Python, Java, .NET|仅 JS/TS|JS/TS|几乎所有语言 (Java, Python, C#, JS 等)|
|**执行速度**|快（无 WebDriver 中间层）|快（直接驱动浏览器）|中等（取决于 WebDriver 通信）|慢（多一层通信）|
|**等待机制**|内置智能等待（自动 retry）|内置智能等待|需要自己配置（比 Selenium 好）|主要靠显式/隐式等待|
|**多标签/多窗口**|✅ 支持|❌ 不支持/有限|✅ 支持|✅ 支持|
|**网络拦截/Mock**|✅ 内置支持|✅ 内置支持|✅ 插件支持|❌ 不支持（需额外库）|
|**移动端测试**|✅ 支持（模拟 + 设备控制）|❌ 不支持|✅ 结合 Appium|✅ 结合 Appium|
|**生态/插件**|新兴但发展快|活跃，前端测试友好|历史久，插件丰富|历史最久，生态庞大|
|**易用性**|现代、简洁|上手最快（前端开发者最爱）|配置稍复杂|学习曲线大，写起来繁琐|
|**典型场景**|前端 E2E + API + 跨浏览器|前端应用 E2E（SPA）|Web + 移动端测试|大型企业级通用自动化|

---

# 🎯 总结

- **Playwright** → 现代化、跨浏览器、跨语言，速度快，稳定性高
    
- **Cypress** → 上手最容易，最适合前端团队，但浏览器支持有限
    
- **WebdriverIO** → 生态丰富，适合需要 Web + 移动端一体化的团队
    
- **Selenium** → 老牌框架，生态大，但慢且写法过时，逐渐被替代
    

---




flowchart TB
    A[Web Test Frameworks] --> B[Playwright]
    A --> C[Cypress]
    A --> D[WebdriverIO]
    A --> E[Selenium]

    B --> B1[底层: 直接驱动浏览器]
    B --> B2[浏览器: Chromium/Firefox/WebKit]
    B --> B3[语言: JS/TS, Python, Java, .NET]
    B --> B4[等待: 自动等待(更稳)]
    B --> B5[特性: 网络拦截/Mock; 多页签/多窗口; CI友好]
    B --> B6[场景: 现代Web E2E, 跨浏览器]

    C --> C1[底层: 直接驱动(以Chromium为主)]
    C --> C2[浏览器: Chromium; (有限)Firefox]
    C --> C3[语言: JS/TS]
    C --> C4[等待: 自动等待]
    C --> C5[限制: 多标签/多窗口较弱]
    C --> C6[场景: 前端团队, SPA快速E2E]

    D --> D1[底层: WebDriver协议(高层封装)]
    D --> D2[浏览器: WebDriver覆盖的全部]
    D --> D3[语言: JS/TS]
    D --> D4[生态: 插件丰富, 可配合Appium]
    D --> D5[场景: Web + 移动端一体化]

    E --> E1[底层: WebDriver协议]
    E --> E2[浏览器: 全平台广泛支持]
    E --> E3[语言: 几乎所有主流语言]
    E --> E4[生态: 最大, 历史最久]
    E --> E5[代价: 速度慢, 等待需手动, 易flaky]

mindmap
  root((Web Test Frameworks))
    Playwright
      底层: 直接驱动浏览器
      浏览器: Chromium / Firefox / WebKit
      语言: JS/TS, Python, Java, .NET
      等待机制: 自动等待, 更少flaky
      特点: 网络拦截/Mock, 多页签/多窗口, CI友好
      适用: 现代Web E2E, 跨浏览器
    Cypress
      底层: 直接驱动(以Chromium为主)
      浏览器: Chromium, (有限)Firefox
      语言: JS/TS
      等待机制: 自动等待
      限制: 多标签/多窗口较弱
      适用: 前端团队, SPA快速E2E
    WebdriverIO
      底层: WebDriver协议(高层封装)
      浏览器: 所有WebDriver支持
      语言: JS/TS
      特点: 插件生态丰富, 可配合Appium
      适用: Web+移动端一体化
    Selenium
      底层: WebDriver协议
      浏览器: 全平台广泛支持
      语言: 几乎所有主流语言
      特点: 生态最大, 历史最久
      代价: 速度慢, 等待需手动配置, 易flaky

