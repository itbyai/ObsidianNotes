
## 🧠 一、C#最小核心（必须掌握）

只要掌握下面这些语法，你就能写出功能完备的 Selenium 测试。

### 1️⃣ 基本语法与结构

```csharp
// Hello World
Console.WriteLine("Hello Selenium");
```

- `using` 导入命名空间
- `namespace` 和 `class` 的概念
- `Main()` 入口点（测试框架中通常不写）
    

📘 学会后要理解结构：

```csharp
namespace DemoTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello!");
        }
    }
}
```

---

### 2️⃣ 变量与数据类型

```csharp
int count = 10;
string name = "Dominos";
bool isActive = true;
```

---

### 3️⃣ 条件与循环

```csharp
if (count > 0)
{
    Console.WriteLine("Positive");
}
else
{
    Console.WriteLine("Zero or negative");
}

for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
```

---

### 4️⃣ 方法（函数）

```csharp
void Login(string user, string pass)
{
    Console.WriteLine($"Logging in {user}");
}
```

---

### 5️⃣ 类与对象（面向对象的最小子集）

```csharp
public class LoginPage
{
    public void Login(string user, string pass)
    {
        // driver.FindElement...
    }
}
```

要理解：

- `public` / `private`
    
- `new` 的用法
    
- 对象方法调用
    

---

### 6️⃣ 集合与列表（查找多个元素时常用）

```csharp
List<string> items = new List<string>() { "Pizza", "Drinks", "Sides" };
foreach (var item in items)
{
    Console.WriteLine(item);
}
```

---

### 7️⃣ 异常处理（try-catch）

```csharp
try
{
    driver.FindElement(By.Id("invalid")).Click();
}
catch (NoSuchElementException e)
{
    Console.WriteLine("Element not found");
}
```

---

## 🧩 二、Selenium核心（只要这些就能跑）

### 1️⃣ 初始化WebDriver

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("https://dominos.com.au");
```

---

### 2️⃣ 元素定位

```csharp
driver.FindElement(By.Id("username")).SendKeys("testuser");
driver.FindElement(By.Name("password")).SendKeys("123456");
driver.FindElement(By.CssSelector("button.login")).Click();
```

常用定位：

- `By.Id`
    
- `By.Name`
    
- `By.XPath`
    
- `By.CssSelector`
    
- `By.ClassName`
    

---

### 3️⃣ 等待（同步）

```csharp
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
```

或使用显式等待：

```csharp
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(d => d.FindElement(By.Id("menu")));
```

---

### 4️⃣ 常见操作

```csharp
driver.Navigate().Back();
driver.SwitchTo().Frame("frame1");
driver.SwitchTo().Alert().Accept();
driver.Quit();
```

---

### 5️⃣ 测试断言（使用NUnit或xUnit）

```csharp
using Xunit;

public class LoginTests
{
    [Fact]
    public void Login_ShouldSucceed()
    {
        IWebDriver driver = new ChromeDriver();
        driver.Navigate().GoToUrl("https://dominos.com.au");
        Assert.Contains("Domino", driver.Title);
        driver.Quit();
    }
}
```

---

## 🧪 三、组合成一个完整的自动化测试例子

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Xunit;

public class DominosTests
{
    [Fact]
    public void Can_Open_HomePage()
    {
        IWebDriver driver = new ChromeDriver();
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

        driver.Navigate().GoToUrl("https://www.dominos.com.au");
        string title = driver.Title;

        Assert.Contains("Domino", title);

        driver.Quit();
    }
}
```

✅ 这个就已经是一个完整的自动化测试了。

---

## ⚙️ 四、扩展建议（下一步学这些）

- Page Object Model（POM）
    
- 数据驱动测试（Data-driven）
    
- 并行测试（xUnit parallel）
    
- CI/CD 集成（GitHub Actions / Azure DevOps）
    

---

## 🎯 总结：最小学习集合表

|模块|内容|示例|
|---|---|---|
|C#语法|class, method, if, loop, list, try-catch|✅|
|Selenium核心|ChromeDriver, FindElement, Click, SendKeys|✅|
|等待机制|Implicit & Explicit wait|✅|
|测试框架|xUnit `[Fact]`, Assert|✅|
|结构组织|Page Object Model（了解）|🔜|

---

如果你愿意，我可以帮你生成一个：  
📘「C# Selenium 最小学习项目模板」—— 包含一个 `DominosTest.cs` 文件 + 项目结构说明 + 依赖列表，一键运行。

要我帮你生成这个项目模板吗？