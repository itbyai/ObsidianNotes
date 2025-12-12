Here’s a **detailed comparison** of **Network Interception/Mocking** between WebDriverIO (WDIO) and Playwright:

---

# Network Interception / Mocking

|Aspect|WebDriverIO|Playwright|
|---|---|---|
|**Support**|❌ Not built into WebDriver protocol. Needs **third-party libraries** like `wdio-intercept-service` or custom proxy setups.|✅ Built-in. Can intercept requests/responses, modify them, or mock APIs directly in code.|
|**Mechanism**|Interception is done **outside the browser**, usually via a proxy server that captures traffic or by using plugins that hook into WebDriver commands.|Intercepts network at the **browser protocol level** (CDP / WebKit / Firefox remote protocol), allowing full access to requests and responses in real-time.|
|**API Simplicity**|Limited and often plugin-dependent. Example: using `wdio-intercept-service` to stub a request.|Very straightforward. Playwright provides `page.route()` and `request` events directly.|
|**Capabilities**|- Can spy on requests/responses||

- Can mock some endpoints if supported by plugin
    
- Harder to simulate network conditions like latency or offline | - Full control:
    
    - Block or modify requests
        
    - Mock API responses
        
    - Simulate latency, offline, or throttling
        
    - Inspect request headers, query params, response body |  
        | **Granularity** | Typically at the **HTTP request level**, sometimes requires additional configuration to match URLs or methods. | High granularity: can intercept **any request** from page, including JS fetch/XHR, CSS, images, or API calls. |  
        | **Use Case Example** | Test an app without hitting real backend by stubbing API responses (requires plugin). | Test API error handling by mocking responses, simulate slow network, or modify payloads on the fly. |  
        | **Setup Complexity** | Medium to high — must install & configure plugin or proxy; may require server configuration. | Low — built-in APIs, just add `page.route()` or `page.on('request')`. |  
        | **Debugging** | Harder — requires proxy logs or plugin output to see requests. | Easy — Playwright Trace + `page.route` callback shows intercepted requests and responses. |
        

---

## Example Usage

### 1️⃣ WDIO (using `wdio-intercept-service` plugin)

```js
// pseudo-code example
const { browser } = require('webdriverio');

browser.url('/login');
const intercept = browser.mock('**/api/login**', { method: 'POST' });
intercept.respond({ status: 200, body: { token: 'fake-token' } });

browser.$('#submit').click();
// The request is mocked
```

**Notes:**

- Requires plugin installation.
    
- Limited functionality compared to Playwright.
    

---

### 2️⃣ Playwright (native interception)

```ts
import { test } from '@playwright/test';

test('network mock', async ({ page }) => {
  // Intercept API request
  await page.route('**/api/login', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'fake-token' })
    });
  });

  await page.goto('https://example.com/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('#submit');

  // The API request was intercepted and mocked
});
```

**Advantages:**

- No third-party plugins.
    
- Can intercept any network request.
    
- Can simulate latency, offline mode, or modify responses dynamically.
    

---

## 🔹 Why These Differences Exist

1. **WebDriver Protocol**
    
    - Designed to send commands like `click()`, `getText()`, `setValue()` to the browser.
        
    - No built-in way to capture or modify network traffic.
        
    - Must rely on external services/plugins.
        
2. **Playwright / CDP**
    
    - Directly communicates with browser via **WebSocket / DevTools Protocol**.
        
    - Can intercept **all network events** inside the browser.
        
    - Provides **native API** for mocking and modifying requests.
        

---

## 🔹 Practical Implications

|Scenario|WDIO|Playwright|
|---|---|---|
|Test API error handling without backend|Requires plugin setup|Native, simple|
|Simulate slow network or offline mode|Difficult, may need proxy|Easy, built-in `page.route()` + `network conditions`|
|Debug network requests in real-time|Hard, logs only|Easy, can see requests and responses in trace|
|CI/CD mocking|Works but plugin dependent|Works out-of-the-box, lightweight|

---

✅ **Summary**

- **WDIO**: Network mocking is possible but **requires plugins or proxies**; more setup, less flexibility.
    
- **Playwright**: Native support with **direct API access**, easier to mock, intercept, or simulate complex network conditions.
    

---

If you want, I can make a **diagram showing WDIO vs Playwright network interception flow**, so you can visualize why WDIO needs a proxy/plugin and Playwright does it directly.

Do you want me to make that diagram?