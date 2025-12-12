# Playwright TypeScript  基础写法示例

下面是一个完整的 Playwright 测试示例，使用 **TypeScript** 编写，涵盖 UI 测试、表单、文件上传、API 测试、截图/录屏、动态等待、并行执行等功能，并标注要点。
注意：**在playwright的项目里，能够使用playwright的配置文件的原因是playwright 测试框架**


```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://example.com',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
  ],
});


// tests/example.spec.ts
import { test, expect, request, Page } from '@playwright/test';

test.describe('Playwright TypeScript 全功能示例', () => {

  // 前置条件：登录
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demo123');
    await page.click('#login-button');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  // 测试用例1：表单提交
  test('表单填写并提交', async ({ page }) => {
    await page.goto('/form');
    await page.fill('#firstName', 'Feng');
    await page.fill('#lastName', 'Xiao');
    await page.check('#subscribeNewsletter');
    await page.click('#submit');
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  // 测试用例2：文件上传
  test('文件上传', async ({ page }) => {
    await page.goto('/upload');
    const filePath = './tests/sample.pdf';
    await page.setInputFiles('#fileInput', filePath);
    await page.click('#uploadBtn');
    await expect(page.locator('text=Upload successful')).toBeVisible();
  });

  // 测试用例3：截图与录屏
  test('截图与录屏示例', async ({ page }) => {
    await page.goto('/dashboard');
    await page.screenshot({ path: 'dashboard.png', fullPage: true });
    // video 会自动在配置里记录
  });

  // 测试用例4：API 调用
  test('调用 API 并验证', async () => {
    const apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
    const response = await apiContext.get('/todos/1');
    expect(response.status()).toBe(200);
    const data = await response.json() as { id: number; title: string; completed: boolean };
    expect(data.id).toBe(1);
    expect(data).toHaveProperty('title');
  });
  
  // 测试用例4: 
import { test, expect, request, APIRequestContext } from '@playwright/test';

test('POST 请求示例，带 headers 和 payload', async () => {
  // 创建 API context
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  // 定义请求体
  const payload = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };

  // 定义请求头
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer my-token', // 如果需要身份认证
  };

  // 发送 POST 请求
  const response = await apiContext.post('/posts', {
    headers: headers,
    data: payload, // 或者使用 `json: payload`，效果相同
  });

  // 断言响应状态码
  expect(response.status()).toBe(201);

  // 解析响应 JSON
  const data = await response.json() as { id: number; title: string; body: string; userId: number };
  expect(data).toHaveProperty('id');
  expect(data.title).toBe('foo');

  // 释放 context
  await apiContext.dispose();
});


  // 测试用例5：动态等待元素
  test('等待元素加载', async ({ page }) => {
    await page.goto('/dynamic');
    const dynamicText = page.locator('#dynamicText');
    await dynamicText.waitFor({ state: 'visible', timeout: 5000 });
    await expect(dynamicText).toHaveText('Loaded!');
  });

  // 测试用例6：并行与隔离示例
  test('不同浏览器并行执行', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Example/);
  });

});

```
## 🔑 要点总结 (TypeScript)

| 功能            | 要点说明                                                              |
| ------------- | ----------------------------------------------------------------- |
| 配置多浏览器        | 在 `playwright.config.ts` 使用 `projects` 定义 Chromium/Firefox/WebKit |
| 并行执行          | 默认 `npx playwright test` 会根据项目/worker 并行执行                        |
| 前置条件          | 使用 `test.beforeEach` 做登录或初始化                                      |
| TypeScript 类型 | `Page`, `APIResponse` 等类型支持智能提示                                   |
| 断言            | `expect(locator).toBeVisible()` 等                                 |
| 表单操作          | `fill`, `click`, `check` 等                                        |
| 文件上传          | `setInputFiles`                                                   |
| 截图/录屏         | `screenshot`, `video` 配置                                          |
| API 测试        | `request.newContext()` 支持 GET/POST/PUT 等                          |
| 等待元素          | `locator.waitFor`，可保证动态内容正确                                       |
| 错误调试          | `trace`, `screenshot` 在失败时保留                                      |


如果你希望 **不管测试成功或失败都生成截图/录屏/trace**，可以在 Playwright 中手动在测试里触发，而不是依赖配置里的 `only-on-failure`。下面是 TypeScript 的完整示例：

```ts
import { test, expect } from '@playwright/test';

test('无论成功失败都生成截图/录屏/trace', async ({ page, context }) => {
  // 启动 tracing（包含截图和 DOM snapshot）
  await context.tracing.start({ screenshots: true, snapshots: true });

  // 访问页面
  await page.goto('/dashboard');

  // 截图
  await page.screenshot({ path: 'dashboard_always.png', fullPage: true });

  // 执行测试断言
  await expect(page.locator('text=Welcome')).toBeVisible();

  // 停止 tracing 并保存
  await context.tracing.stop({ path: 'trace_always.zip' });

  // 如果 context 配置了 video，Playwright 会自动生成视频
  // 也可以手动触发：await context.close(); video 会被保存
});
```
三种触发：Tracing, screenshot, video
tracing tra

# Playwright 三种调试/记录功能触发方式对比

Playwright 提供 **Screenshot、Video、Tracing** 三种不同方式来捕获测试运行信息，它们的触发方式、输出和用途有所不同：

| 功能             | 触发方式                                                                                                                     | 输出文件                 | 是否自动生成                            | 用途            |                              |               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------- | ------------- | ---------------------------- | ------------- |
| **Screenshot** | 1. 手动调用 `page.screenshot({ path, fullPage })`<br>2. 配置文件 `use.screenshot: 'only-on-failure'` 自动触发失败截图                    | PNG                  | 可选，配置可自动                          | 静态图片，快速查看页面状态 |                              |               |
| **Video**      | 1. 配置 `use.video: 'on'                                                                                                   | 'retain-on-failure'  | 'off'`<br>2. BrowserContext 创建时启用 | WebM          | 自动生成（每个 context）             | 动态回放测试操作，全程录像 |
| **Tracing**    | 1. 手动调用 `context.tracing.start({ screenshots, snapshots })` + `context.tracing.stop({ path })`<br>2. 配置 `use.trace: 'on' | 'retain-on-failure'` | ZIP trace 文件                      | 可选，配置可自动      | 回放操作步骤、DOM 快照、调试失败，可包含截图但非视频 |               |

---

## 🔹 触发对比总结

1. **Screenshot**
   - 触发灵活，可单步捕获页面。
   - 输出静态图片。
   - 可结合 `only-on-failure` 自动触发。

2. **Video**
   - 基于 context 自动录制。
   - 输出视频，可回放整个测试过程。
   - 不能手动捕获特定步骤，需要在 context 创建时启用。

3. **Tracing**
   - 手动启动和停止，生成 trace 文件。
   - 可包含操作步骤、DOM 快照和截图，但不是视频。
   - 适合调试失败或分析测试流程。
   - 如何回放？npx playwright show-trace trace.zip 打开Trace Viewer

---

## 🔹 建议使用场景

| 场景 | 推荐方式 |
|------|----------|
| 快速查看页面状态 | Screenshot |
| 调试失败或分析交互流程 | Tracing |
| 回放整个测试操作 | Video |
| 想对所有测试生成记录（不论成功失败） | Video + Screenshot + Tracing（手动或配置） |

> 小结：三者各有侧重点。Screenshot 是静态的，Video 是动态回放，Tracing 是结构化操作记录（可回放和调试 DOM/事件），触发方式不同，但可以组合使用。

# 如何把自动化测试代码集成到pipeline里边
可以把测试代码集成到 CI/CD pipeline 中，实现自动化执行、报告生成和质量控制。下面我给出一个结构化的方案，适用于常见的 GitHub Actions、GitLab CI/CD 或 Jenkins 等 pipeline 工具。

```markdown
# 将测试代码集成到 Pipeline 的方法

## 1. 准备测试环境
1. **保证依赖完整**
   - 使用 `package.json`（Node.js）、`requirements.txt`（Python）、`Gemfile`（Ruby）等管理测试依赖。
   - 确保 pipeline 能安装这些依赖，例如：
     ```bash
     npm ci
     pip install -r requirements.txt
     ```
2. **配置环境变量**
   - 对于 API key、数据库连接、URL 等敏感信息使用 pipeline 的 Secret/Environment 功能。

## 2. 编写可在 CI/CD 中执行的测试脚本
1. **命令行可执行**
   - 保证测试框架可以通过命令行运行，例如：
     ```bash
     npx playwright test
     pytest tests/
     npm test
     ```
2. **生成报告**
   - 配置测试框架生成 JUnit、HTML 或 JSON 报告，以便 pipeline 读取：
     ```bash
     npx playwright test --reporter=html
     pytest --junitxml=report.xml
     ```

## 3. 在 Pipeline 中添加测试步骤
- **GitHub Actions 示例**
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '18'
        - run: npm ci
        - run: npx playwright install --with-deps
        - run: npx playwright test --reporter=html
        - name: Upload Test Report
          uses: actions/upload-artifact@v3
          with:
            name: test-report
            path: playwright-report/
```

- **GitLab CI/CD 示例**
    
    ```yaml
    stages:
      - test
    
    test_job:
      stage: test
      image: node:18
      script:
        - npm ci
        - npx playwright install --with-deps
        - npx playwright test --reporter=html
      artifacts:
        paths:
          - playwright-report/
    ```
    

## 4. 可选优化

1. **并行执行**
    - Playwright、pytest 等支持多线程/worker，可加快 pipeline 执行速度。
2. **条件执行**
    
    - 仅在特定分支或 PR 上运行测试。
3. **失败处理**
    - pipeline 可根据测试结果中断后续步骤，保证质量门控。
4. **集成代码覆盖率**
    - 将 coverage 结果上传到 pipeline 仪表盘（如 Codecov）。

## 5. 常见注意事项

- 保证 pipeline 与本地测试环境一致，避免环境差异导致假阳性。
- 对 UI 测试，可以在无头模式下执行，或者使用 Docker 容器/云服务。
- 对 API 测试，确保测试数据可控且不会影响生产环境。

```

如果你希望，我可以帮你写一个**完整的 GitHub Actions pipeline 模板**，把 Playwright API、UI 测试和报告生成都整合在一起。  

你希望我直接写这个模板吗？
```


好的，我帮你整理一个 **Azure Pipeline 与 GitHub Actions 的对比表**，重点对比 YAML 语法和关键字差异，方便你迁移或选择。


## 示例对比

# Azure Pipeline vs GitHub Actions 对比

| 特性 | Azure Pipelines | GitHub Actions | 说明 |
|------|----------------|----------------|------|
| **触发方式** | `trigger` / `pr` | `on` | Azure 用 `trigger` 指定分支，GitHub 用 `on` 支持更多事件 |
| **并行/矩阵** | `jobs` + `strategy: matrix` | `jobs` + `strategy: matrix` | 两者都支持矩阵，但语法略有差异 |
| **作业隔离** | 每个 `job` 默认隔离 | 每个 `job` 默认隔离 | 相似，但 GitHub Actions 默认使用 runner 池 |
| **执行环境** | `pool: vmImage` | `runs-on` | Azure 指定 `ubuntu-latest`、`windows-latest` 等，GitHub 类似 |
| **步骤/脚本** | `steps:` + `script:` / `task:` | `steps:` + `run:` / `uses:` | Azure 支持 `task`（内置任务），GitHub 用 `uses` 引用 Action |
| **缓存依赖** | `task: CacheBeta@1` / `cache:` | `uses: actions/cache@v3` | GitHub 语法更简洁 |
| **环境变量** | `variables:` | `env:` | Azure `variables` 可全局或 job 级别，GitHub Actions 使用 `env:` |
| **Secrets** | `variables` + `isSecret: true` | `secrets` | GitHub Actions 使用 `${{ secrets.NAME }}` |
| **工件/报告** | `publish: artifact` | `uses: actions/upload-artifact@v3` | 两者都支持上传构建产物 |
| **条件执行** | `condition:` | `if:` | Azure 使用 `condition: succeeded()`，GitHub Actions 使用 `if: success()` 或自定义表达式 |
| **模板/复用** | `extends` / `template` | `jobs` + `uses:` | Azure 支持 YAML 模板，GitHub Actions 支持复用 Action 或 composite Action |
| **内置任务/Action** | Azure DevOps Tasks | GitHub Actions Marketplace | Azure 内置任务丰富，GitHub 依赖社区 Action |


### Azure Pipeline
```yaml
trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  NODE_VERSION: '18'

jobs:
  build:
    steps:
      - checkout: self
      - task: NodeTool@0
        inputs:
          versionSpec: $(NODE_VERSION)
      - script: npm ci
      - script: npm test
````

### GitHub Actions

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_VERSION: 18
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - run: npm ci
      - run: npm test
```

# 常用的Playwright 的page的方法

Playwright 的 API 很丰富，不可能在一条回答里“列出全部”，但我可以给你一个相对全面的整理，涵盖最常用的 `page` / `locator` / `request` / `frame` 等操作方法，以及一些变体／高级用法。你也可以以后参考官方文档。

下面按类别分类：

---

## 1. `page` 相关常用操作（Page API）

（在 Playwright 文档 “Page | Playwright API reference” 中有完整列表） ([playwright.dev](https://playwright.dev/docs/api/class-page?utm_source=chatgpt.com "Page | Playwright"))

| 功能类别          | 方法 / 操作                                                                                                     | 作用 / 说明                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 导航 / 加载       | `page.goto(url, options)`                                                                                   | 导航到某个 URL                                                                                                                                      |
|               | `page.reload(options)`                                                                                      | 刷新页面                                                                                                                                           |
|               | `page.waitForLoadState(state, options)`                                                                     | 等待页面加载到某个状态（如 `"load"`, `"domcontentloaded"`, `"networkidle"`）                                                                                 |
|               | `page.waitForURL(urlOrPredicate, options)`                                                                  | 等待 URL 变成某个值或满足某个条件                                                                                                                            |
| 截图 / 导出       | `page.screenshot(options)`                                                                                  | 截取全页或局部截图                                                                                                                                      |
|               | `page.pdf(options)`                                                                                         | 导出为 PDF（在支持的环境中）                                                                                                                               |
| 元素定位 / 操作     | `page.locator(selector, options)`                                                                           | 获取一个或多个元素的 `Locator`                                                                                                                           |
|               | `page.click(selector, options)`                                                                             | 直接点击某元素                                                                                                                                        |
|               | `page.fill(selector, value, options)`                                                                       | 给 input / textarea 填值                                                                                                                          |
|               | `page.type(selector, text, options)`                                                                        | 模拟打字（带延时）                                                                                                                                      |
|               | `page.selectOption(selector, values, options)`                                                              | 选择 `<select>` 下拉项                                                                                                                              |
|               | `page.check(selector, options)` / `page.uncheck(selector, options)`                                         | 勾选 / 取消复选框 / 单选框                                                                                                                               |
|               | `page.isVisible(selector, options)` / `page.isHidden(...)` / `page.isEnabled(...)` / `page.isDisabled(...)` | 判断元素状态                                                                                                                                         |
| 属性 / 文本读取     | `page.innerText(selector, options)`                                                                         | 获取元素内部文本（不含子元素标签）                                                                                                                              |
|               | `page.textContent(selector, options)`                                                                       | 获取元素的文本内容                                                                                                                                      |
|               | `page.getAttribute(selector, name, options)`                                                                | 读取元素某个属性的值                                                                                                                                     |
| 脚本执行 / JS 交互  | `page.evaluate(pageFunction, ...args)`                                                                      | 在页面上下文执行 JS 代码并返回结果                                                                                                                            |
|               | `page.evaluateHandle(pageFunction, ...args)`                                                                | 返回一个 JS 对象句柄（可进一步操作）                                                                                                                           |
|               | `page.addInitScript(script[, arg])`                                                                         | 在页面加载前注入脚本（每次导航或 frame attach 时都会执行）                                                                                                           |
| 弹窗 / 新窗口 / 弹出 | `page.waitForEvent(event, options)`                                                                         | 等待某个事件，例如 “popup”, “dialog” 等                                                                                                                  |
|               | `page.waitForPopup()` 或监听 `page.on('popup', ...)`                                                           | 捕获页面打开的新窗口 / 弹出                                                                                                                                |
| 网络 / 路由拦截     | `page.route(urlOrPredicate, handler)`                                                                       | 拦截 / 修改 / mock 某些网络请求 ([playwright.dev](https://playwright.dev/docs/mock?utm_source=chatgpt.com "Mock APIs \| Playwright"))                    |
|               | `page.unroute(urlOrPredicate)`                                                                              | 取消拦截路由                                                                                                                                         |
| 上下文 / 多页面     | `page.context()`                                                                                            | 获取所在的 BrowserContext                                                                                                                           |
|               | `page.close()`                                                                                              | 关闭该页                                                                                                                                           |
|               | `page.waitForSelector(selector, options)`                                                                   | 等待某个 selector 出现 / 可用                                                                                                                          |
|               | `page.on(event, handler)` / `page.once(event, handler)`                                                     | 监听页面发出的各种事件（如请求、响应、错误等）                                                                                                                        |
|               | `page.request`                                                                                              | 用于发送 API 请求或管理 HTTP 请求（在支持的版本中） ([playwright.dev](https://playwright.dev/docs/api-testing?utm_source=chatgpt.com "API testing \| Playwright")) |

---

## 2. `Locator` / 元素交互常用 API

`locator` 是 Playwright 推荐的用于定位元素和执行操作的对象。有关详细操作在 “Locator - Playwright API reference” 中有说明 ([playwright.dev](https://playwright.dev/docs/api/class-locator?utm_source=chatgpt.com "Locator - playwright.dev"))，也在 “Actions” 指南中有讲 ([playwright.dev](https://playwright.dev/docs/input?utm_source=chatgpt.com "Actions - playwright.dev"))。

|操作|方法|说明|
|---|---|---|
|点击 / 交互|`locator.click(options)`|点击该元素|
|双击|`locator.dblclick(options)`|双击元素|
|鼠标操作|`locator.hover(options)`|鼠标悬停|
|输入 / 填充|`locator.fill(value, options)`|清空并输入文本|
|键盘操作|`locator.press(key, options)`|模拟按键操作|
|组合按键|`locator.type(text, options)`|模拟输入（有延时）|
|选项 / 下拉|`locator.selectOption(values, options)`|选择 `<select>` 的选项|
|勾选 / 取消|`locator.check(options)` / `locator.uncheck(options)`|勾选 / 取消选中|
|断言 / 等待|`locator.waitFor(options)`|等待定位到元素或状态|
|层级 / 链式定位|`locator.locator(selector)`|在已有 locator 上再次筛选 / 嵌套定位 ([runebook.dev](https://runebook.dev/en/articles/playwright/api/class-locator/locator-locator?utm_source=chatgpt.com "Playwright - locator.locator - Runebook.dev"))|
|批量 / 数组|`locator.all()`|返回多个 locator（如果匹配多个元素）|
|获取文本 / 属性|`locator.textContent()` / `locator.innerText()` / `locator.getAttribute(name)`|读取元素内容或属性|
|计数 / 数量|`locator.count()`|多个匹配元素的数量|
|判断状态|`locator.isVisible()` / `locator.isEnabled()`, etc.|判断元素状态|

---

## 3. `request` / API 层面的操作

Playwright 不仅能操作页面，还能直接发送 HTTP 请求（API 测试），在其文档 “API testing” 有介绍 ([playwright.dev](https://playwright.dev/docs/api-testing?utm_source=chatgpt.com "API testing | Playwright"))：

|方法|作用|
|---|---|
|`request.get(url, options)`|发送 GET 请求|
|`request.post(url, options)`|发送 POST 请求|
|`request.put(...)`, `request.delete(...)`, `request.patch(...)`|各种 HTTP 方法支持|
|`request.fetch(...)`|通用请求接口|
|`response.status()`, `response.json()`, `response.text()`, etc.|处理返回结果|

---

## 4. `frame` / `frameLocator` 操作

如果页面有嵌套 iframe，你可能需要操作 `frame` 或 `frameLocator`：

- `page.frame(nameOrUrlOrPredicate)` | 获取子 frame
- `frame.locator(...)` | 在该 frame 内进行定位
- `page.frameLocator(selector)` | 在指定 frame 里用 locator 快速定位
- 然后对该 locator 调用 click / fill / 等方法

---

## 5. 其他补充 / 高级 / 辅助操作

- `page.waitForTimeout(ms)` | 等待固定毫秒数（不推荐频繁用）
- `page.waitForFunction(fn, args, options)` | 等待某条件函数为真
    
- `page.addScriptTag(...)` / `page.addStyleTag(...)` | 动态添加 JS / CSS
    
- `page.setViewportSize(width, height)` | 设置视窗大小
    
- `page.setContent(html, options)` | 直接设置页面内容
    
- `page.setExtraHTTPHeaders(headers)` | 设置额外 HTTP 头
    
- `page.setUserAgent(str)` | 设置 user agent
    
- 浏览器 / context 操作：如 `browser.newContext()`, `context.clearCookies()`, `context.grantPermissions()`, `context.storageState()`, `context.route()` 等
    
- `page.evaluateOnNewDocument(...)` | 在每次页面加载/刷新之前执行脚本
    
- `page.keyboard` / `page.mouse` 对象上的操作（keydown, keyup, move, down, up 等）
    
- 文件上传 / 下载：`locator.setInputFiles(files)` / 监听 `page.on('download', ...)` 等
    

---

## 📚 官方文档 & 查找方法

- Page API 方法清单： [Page | Playwright API reference](https://playwright.dev/docs/api/class-page) ([playwright.dev](https://playwright.dev/docs/api/class-page?utm_source=chatgpt.com "Page | Playwright"))
- Locator API 详细方法： [Locator | Playwright API reference](https://playwright.dev/docs/api/class-locator) ([playwright.dev](https://playwright.dev/docs/api/class-locator?utm_source=chatgpt.com "Locator - playwright.dev"))
- Input / 表单 / 操作指南 “Actions” 部分： [Actions - Playwright Guides](https://playwright.dev/docs/input) ([playwright.dev](https://playwright.dev/docs/input?utm_source=chatgpt.com "Actions - playwright.dev"))
- API 请求 / 接口测试： [API testing | Playwright](https://playwright.dev/docs/api-testing) ([playwright.dev](https://playwright.dev/docs/api-testing?utm_source=chatgpt.com "API testing | Playwright")) 
- 路由拦截 / mock： [Mock APIs | Playwright Guides](https://playwright.dev/docs/mock) ([playwright.dev](https://playwright.dev/docs/mock?utm_source=chatgpt.com "Mock APIs | Playwright"))
    

---

如果你愿意的话，我可以为你 **生成一个最新版（TypeScript 用法）的 Playwright 函数速查表**（Excel / Markdown 格式），你可以随时查。要吗？
在 **Playwright** 里：

- 每个方法（例如 `page.click()`, `page.fill()`, `locator.type()`, `page.goto()` 等）都可以接收一个 **options 对象**，形式就是 JSON（在 TypeScript/JavaScript 中就是一个普通的对象字面量）。
    
- 不同方法的 `options` 字段 **完全不同**，有些参数相似（如 `timeout`, `force`），但也有各自专属的配置。
    
- 所以想全面掌握，必须查 **Playwright 官方 API 文档**。
    

---

### 📌 举个例子对比

```ts
// click 的 options
await page.click('#login', { button: 'right', clickCount: 2, delay: 100 });

// fill 的 options
await page.fill('#username', 'fengxiao', { timeout: 5000, force: true });

// type 的 options
await page.type('#username', 'fengxiao', { delay: 200 });
```

可以看到：

- `click` 有 `button`, `clickCount`, `position` 等。
    
- `fill` 没有 `button`，但有 `force`, `timeout`。
    
- `type` 有 `delay`，用于输入速度控制。
    

---

### 📖 官方文档入口（强烈推荐收藏）

Playwright 团队提供了非常清晰的 API 参考，按方法分类，里面会列出所有 `options` 的字段：

- [Playwright API Reference – `Page`](https://playwright.dev/docs/api/class-page)
    
- [Playwright API Reference – `Locator`](https://playwright.dev/docs/api/class-locator)
    
- [Playwright API Reference – `Expect`](https://playwright.dev/docs/test-assertions)
    

---

### 🧭 小技巧

1. **定位方法差异**：
    
    - `page.method()`：直接对整个页面操作。
    - `locator.method()`：推荐方式，先定位元素再操作，稳定性更好。
        
2. **TS/JS 智能提示**：  
    如果你用 TypeScript，编辑器（VS Code）会自动提示 `options` 的所有字段和类型，非常方便。
    
3. **搜索方式**：  
    在文档中搜索 `methodName(options)`，就能快速跳到该方法的所有参数说明。
    

---

# **browser / context / page** 三个不需要import的类

## 1️⃣ Browser（浏览器实例）

**作用**：控制整个浏览器，负责启动和关闭浏览器，可以管理多个浏览器上下文。

**典型函数**：

|函数|功能|
|---|---|
|`browser.newContext(options?)`|创建新的浏览器上下文（类似独立的浏览器窗口，隔离 Cookie / localStorage）|
|`browser.close()`|关闭整个浏览器|
|`browser.browserType()`|获取浏览器类型（chromium/firefox/webkit）|
|`browser.version()`|获取浏览器版本|

**关键点**：

- 一个 browser 可以包含多个 context
    
- context 之间互相隔离，适合并行测试或多用户模拟
    

---

## 2️⃣ BrowserContext（浏览器上下文）

**作用**：类似浏览器窗口/用户会话，用于隔离不同测试的状态（Cookie、缓存、localStorage），在 context 里可以创建多个 page。

**典型函数**：

|函数|功能|
|---|---|
|`context.newPage()`|创建新的 page（标签页）|
|`context.close()`|关闭整个 context（所有 page 都会关闭）|
|`context.addCookies(cookies)`|设置 cookies|
|`context.clearCookies()`|清除 cookies|
|`context.grantPermissions(permissions, options?)`|授权权限（如 geolocation、notifications）|
|`context.storageState(path?)`|保存当前上下文状态到文件（用于登录状态复用）|

**关键点**：

- 多个 page 在同一个 context 内共享 cookies / localStorage
    
- 不同 context 之间数据互相隔离
    
- 常用于模拟不同用户会话
    

---

## 3️⃣ Page（浏览器标签页）

**作用**：操作网页内容，执行用户行为（点击、输入、导航等），也是 Playwright 的主要测试对象。

**典型函数**：

|函数|功能|
|---|---|
|`page.goto(url)`|打开网页|
|`page.click(selector, options?)`|点击元素|
|`page.fill(selector, value, options?)`|填写输入框|
|`page.type(selector, value)`|模拟打字|
|`page.locator(selector)`|定位元素，返回 locator 对象|
|`page.waitForSelector(selector)`|等待元素出现|
|`page.screenshot(options?)`|截图|
|`page.pdf(options?)`|生成 PDF|
|`page.evaluate(pageFunction)`|执行 JS 脚本|
|`page.content()`|获取页面 HTML|
|`page.title()`|获取页面标题|
|`page.url()`|获取当前 URL|

**关键点**：

- Page 是最贴近用户操作的对象
    
- 所有 UI 自动化动作（点击、输入、截图）都在 page 上执行
    

---

## 4️⃣ 功能区分总结

|对象|主要作用|功能范围|
|---|---|---|
|Browser|控制整个浏览器|启动/关闭浏览器、创建多个 context|
|BrowserContext|独立用户会话|隔离状态、创建多个 page、管理 cookies / 权限|
|Page|操作页面|导航、点击、输入、截图、执行 JS|

---

💡 **思路**：

- **Browser** → 启动/关闭浏览器
    
- **Context** → 隔离环境，多用户或多会话
    
- **Page** → 具体页面操作，执行 UI 测试或交互
    

---

如果你需要，我可以帮你画一个 **Browser → Context → Page 的层级与函数作用图**，把常用方法直观标注出来，方便记忆和对比。

你希望我画吗？