在 `pytest` 中，`@pytest.fixture` 装饰器用于定义测试夹具（fixtures），用于在测试中提供共享的、可重用的测试资源。`scope` 参数用于定义夹具的生命周期。以下是 `@pytest.fixture(scope="module")` 的详细解释及其用法：

### `scope` 参数

`scope` 参数用于控制夹具的生命周期。可以设置为以下值：

- **`"function"`**（默认值）：每个测试函数调用夹具时，夹具都会被创建和销毁一次。
- **`"class"`**：每个测试类调用夹具时，夹具只会被创建和销毁一次。
- **`"module"`**：每个测试模块（即一个文件）调用夹具时，夹具只会被创建和销毁一次。
- **`"package"`**：每个测试包（即一个目录下的所有测试模块）调用夹具时，夹具只会被创建和销毁一次。
- **`"session"`**：测试会话（即整个测试运行）期间调用夹具时，夹具只会被创建和销毁一次。

### 示例：`scope="module"`

使用 `scope="module"` 可以确保夹具在一个模块中只被创建一次，并在模块中的所有测试函数中共享。这对于需要在多个测试之间共享相同的设置或资源很有用，例如在测试中启动一个浏览器实例，并在所有测试中复用该实例。

#### 示例代码

```python
import pytest
from playwright.sync_api import sync_playwright

# 定义一个模块级别的夹具
@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # 启动浏览器
        yield browser  # 供测试使用
        browser.close()  # 测试完成后关闭浏览器

# 定义一个函数级别的夹具
@pytest.fixture
def page(browser):
    page = browser.new_page()  # 创建一个新页面
    yield page  # 供测试使用
    page.close()  # 测试完成后关闭页面

# 测试函数
def test_example(page):
    page.goto('https://example.com')
    page.screenshot(path='example.png')
    assert page.title() == "Example Domain"
```

### 解释

- **`browser` 夹具**：
  - **生命周期**：在整个模块中只被创建一次，并在所有测试函数中共享。
  - **用途**：启动和关闭浏览器实例。
  - **实现**：使用 `sync_playwright()` 启动浏览器，并在模块结束后关闭浏览器。

- **`page` 夹具**：
  - **生命周期**：每个测试函数调用时创建和销毁一个新页面。
  - **用途**：为每个测试函数提供一个新的页面实例。
  - **实现**：从共享的 `browser` 夹具创建新页面，并在测试完成后关闭页面。

### 使用场景

- **共享资源**：当多个测试函数需要使用相同的资源（如数据库连接、浏览器实例等）时，可以使用 `scope="module"` 来提高效率。
- **性能优化**：避免重复创建和销毁昂贵的资源（如浏览器实例），减少测试运行时间。

通过使用 `scope="module"`，可以更有效地管理测试资源，并确保测试的性能和可靠性。