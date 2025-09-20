在 **C#** 中，你**不需要自己实现 `ServiceCollection`**，因为它已经由 **.NET** 提供，你只需要**直接使用**即可。它是 **ASP.NET Core 依赖注入（DI）** 机制的基础，你可以在控制台应用、Web 应用等各种场景中使用它来管理依赖。

---

## **🔹 1. 直接使用 `ServiceCollection`**

`ServiceCollection` 是 **Microsoft.Extensions.DependencyInjection** 提供的一个 **内置 DI 容器**，你可以直接使用它注册、管理和解析服务。

### **📌 示例：在控制台应用中使用**

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;

// 定义接口
public interface IMessageService
{
    void SendMessage(string message);
}

// 具体实现
public class EmailService : IMessageService
{
    public void SendMessage(string message)
    {
        Console.WriteLine($"📩 Email Sent: {message}");
    }
}

class Program
{
    static void Main()
    {
        // 1️⃣ 创建 `ServiceCollection`
        var services = new ServiceCollection();

        // 2️⃣ 注册依赖（Transient/Scoped/Singleton）
        services.AddTransient<IMessageService, EmailService>();

        // 3️⃣ 构建 `ServiceProvider`
        var serviceProvider = services.BuildServiceProvider();

        // 4️⃣ 获取实例 & 调用方法
        var messageService = serviceProvider.GetRequiredService<IMessageService>();
        messageService.SendMessage("Hello, DI!");

        // ✅ 完成，整个过程就是这么简单！
    }
}
```

### **🛠 运行结果**

```
📩 Email Sent: Hello, DI!
```

---

## **🔹 2. `ServiceCollection` 生命周期管理**

在 `ServiceCollection` 中，你可以选择**不同的生命周期**来管理实例的创建：

|作用域|方法|说明|
|---|---|---|
|瞬态（Transient）|`AddTransient<TInterface, TImplementation>()`|每次请求都创建一个新实例|
|作用域（Scoped）|`AddScoped<TInterface, TImplementation>()`|在同一作用域（如 HTTP 请求）内共享同一个实例|
|单例（Singleton）|`AddSingleton<TInterface, TImplementation>()`|应用程序生命周期内只创建一次实例|

### **📌 示例：不同生命周期的对比**

```csharp
// 瞬态（每次获取都是新实例）
services.AddTransient<IMessageService, EmailService>();

// 作用域（在相同作用域内共享）
services.AddScoped<IMessageService, EmailService>();

// 单例（整个应用生命周期内只有一个实例）
services.AddSingleton<IMessageService, EmailService>();
```

---

## **🔹 3. 在 ASP.NET Core 中使用**

在 `ASP.NET Core` 里，`ServiceCollection` 是框架的一部分，你可以直接在 **`Program.cs` 或 `Startup.cs`** 里使用 **`builder.Services`** 进行依赖注入。

### **📌 示例：ASP.NET Core 6+**

```csharp
var builder = WebApplication.CreateBuilder(args);

// 1️⃣ 注册服务
builder.Services.AddScoped<IMessageService, EmailService>();

var app = builder.Build();

// 2️⃣ 解析依赖
app.MapGet("/", (IMessageService messageService) =>
{
    messageService.SendMessage("Welcome to ASP.NET Core!");
    return "Message sent!";
});

app.Run();
```

---

## **🔹 4. 通过构造函数注入服务**

在 `ASP.NET Core` 里，注册好的 `ServiceCollection` 服务可以通过 **构造函数注入** 直接使用。

### **📌 示例：在 Controller 里使用**

```csharp
public class HomeController : Controller
{
    private readonly IMessageService _messageService;

    // 通过构造函数注入服务
    public HomeController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public IActionResult Index()
    {
        _messageService.SendMessage("HomeController message.");
        return View();
    }
}
```

---

## **🔹 5. 扩展 `ServiceCollection` 使代码更整洁**

你可以创建 **扩展方法** 来组织 `ServiceCollection` 注册逻辑，使 `Program.cs` 或 `Startup.cs` 更简洁。

### **📌 示例：创建 ServiceExtensions**

```csharp
public static class ServiceExtensions
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<IMessageService, EmailService>();
        return services;
    }
}
```

### **📌 在 `Program.cs` 中使用**

```csharp
builder.Services.AddCustomServices();
```

---

## **🔹 6. 结论**

✅ **你不需要自己实现 `ServiceCollection`**，它是 **.NET 依赖注入（DI）** 的一部分。  
✅ 直接使用 **`ServiceCollection`** 注册、管理和解析依赖。  
✅ 适用于 **控制台应用、ASP.NET Core Web API、MVC** 等项目。  
✅ 提供 **Transient、Scoped、Singleton** 三种生命周期管理。  
✅ **推荐使用扩展方法** 统一管理 `ServiceCollection`，提高可维护性。

你可以直接复制示例代码试试看！如果有更具体的需求，欢迎继续讨论 😊🚀