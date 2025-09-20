## **使用 RestSharp 进行服务端测试的完整流程**

### **🔹 RestSharp 介绍**

RestSharp 是一个 .NET 库，用于在 C# 代码中进行 **HTTP 请求**。它广泛用于：

- **API 测试**（如集成测试、端到端测试）
- **微服务之间的通信**
- **第三方 API 调用**（如支付、OAuth 授权）

---

## **📌 流程概述**

使用 RestSharp 进行服务端测试的完整流程通常包括：

1. **安装 RestSharp**
2. **初始化 RestClient**
3. **构造请求（Request）**
4. **发送请求并处理响应（Response）**
5. **断言结果**
6. **使用 RestSharp 处理各种 HTTP 请求**
7. **使用 RestSharp 进行身份验证**
8. **使用 RestSharp 进行错误处理与重试**

---

## **🔹 1. 安装 RestSharp**

在 .NET 项目中使用 NuGet 安装：

```sh
dotnet add package RestSharp
```

或者在 **Visual Studio** 的 **NuGet 包管理器**中搜索 `RestSharp` 并安装。

---

## **🔹 2. 初始化 RestClient**

```csharp
using RestSharp;

var client = new RestClient("https://api.example.com/");
```

- 这里的 `RestClient` 是 API 请求的**基础对象**，所有的请求都会通过这个 `client` 发送。

---

## **🔹 3. 构造请求（Request）**

```csharp
var request = new RestRequest("users/{id}", Method.Get);
request.AddUrlSegment("id", 123);
```

- 这里 `RestRequest` 代表一个 API 调用。
- `Method.Get` 代表 HTTP **GET** 请求。
- `AddUrlSegment("id", 123)` 表示把 `{id}` 替换为 **123**，最终的请求 URL 变成：
    
    ```
    https://api.example.com/users/123
    ```
    

---

## **🔹 4. 发送请求并处理响应（Response）**

```csharp
var response = await client.ExecuteAsync(request);

if (response.IsSuccessful)
{
    Console.WriteLine($"Response: {response.Content}");
}
else
{
    Console.WriteLine($"Error: {response.StatusCode} - {response.ErrorMessage}");
}
```

- `ExecuteAsync(request)` 发送请求，并等待响应。
- `response.IsSuccessful` 检查是否 **200 OK**。
- `response.Content` 包含 API 返回的数据（通常是 JSON）。
- `response.StatusCode` 获取 HTTP 状态码，如 `404 Not Found`、`500 Internal Server Error`。

---

## **🔹 5. 断言结果（在测试中使用）**

在 **单元测试** 或 **集成测试** 中，我们可以使用 `xUnit` 或 `NUnit` 进行断言：

```csharp
using Xunit;

var response = await client.ExecuteAsync(request);

Assert.True(response.IsSuccessful, "API 请求失败");
Assert.Equal(200, (int)response.StatusCode);
Assert.Contains("username", response.Content);
```

---

## **🔹 6. 发送各种 HTTP 请求**

### **（1）GET 请求**

```csharp
var request = new RestRequest("users/{id}", Method.Get);
request.AddUrlSegment("id", 123);
var response = await client.ExecuteAsync(request);
```

### **（2）POST 请求**

```csharp
var request = new RestRequest("users", Method.Post);
request.AddJsonBody(new { name = "John", age = 30 });
var response = await client.ExecuteAsync(request);
```

### **（3）PUT 请求**

```csharp
var request = new RestRequest("users/{id}", Method.Put);
request.AddUrlSegment("id", 123);
request.AddJsonBody(new { name = "John Updated" });
var response = await client.ExecuteAsync(request);
```

### **（4）DELETE 请求**

```csharp
var request = new RestRequest("users/{id}", Method.Delete);
request.AddUrlSegment("id", 123);
var response = await client.ExecuteAsync(request);
```

---

## **🔹 7. 发送带身份验证的请求**

### **（1）使用 API Key**

```csharp
var request = new RestRequest("secure-data", Method.Get);
request.AddHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN");
var response = await client.ExecuteAsync(request);
```

### **（2）使用 Basic Auth**

```csharp
client.Authenticator = new HttpBasicAuthenticator("username", "password");
```

### **（3）使用 OAuth 2.0**

```csharp
client.Authenticator = new OAuth2AuthorizationRequestHeaderAuthenticator("YOUR_ACCESS_TOKEN", "Bearer");
```

---

## **🔹 8. 处理错误与重试**

### **（1）处理 404、500 等错误**

```csharp
var response = await client.ExecuteAsync(request);

if (!response.IsSuccessful)
{
    Console.WriteLine($"请求失败: {response.StatusCode}");
    Console.WriteLine($"错误信息: {response.ErrorMessage}");
}
```

### **（2）添加重试策略**

使用 `Polly` 进行自动重试：

```csharp
using Polly;

var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .OrResult<RestResponse>(r => !r.IsSuccessful)
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(2));

var response = await retryPolicy.ExecuteAsync(() => client.ExecuteAsync(request));
```

- **如果请求失败，最多重试 3 次，每次等待 2 秒。**

---

## **🔹 9. 在单元测试中使用 Mock**

在 `xUnit` 或 `NUnit` 测试中，可以使用 **Moq** 来模拟 API 响应：

```csharp
using Moq;
using RestSharp;

var mockClient = new Mock<IRestClient>();

mockClient
    .Setup(c => c.ExecuteAsync(It.IsAny<RestRequest>()))
    .ReturnsAsync(new RestResponse { StatusCode = System.Net.HttpStatusCode.OK, Content = "{\"success\":true}" });

var response = await mockClient.Object.ExecuteAsync(new RestRequest("test"));
Assert.True(response.IsSuccessful);
```

这样，我们可以**不真正调用 API**，而是**模拟 API 响应**。

---

## **📌 总结**

|步骤|说明|
|---|---|
|**1. 安装 RestSharp**|通过 NuGet 安装|
|**2. 初始化 RestClient**|创建 `RestClient` 连接 API|
|**3. 构造请求**|`RestRequest` 负责配置请求|
|**4. 发送请求**|`ExecuteAsync()` 发送请求|
|**5. 断言结果**|在测试中使用 `Assert`|
|**6. 支持所有 HTTP 请求**|`GET` / `POST` / `PUT` / `DELETE`|
|**7. 处理身份验证**|支持 `API Key` / `Basic Auth` / `OAuth 2.0`|
|**8. 处理错误与重试**|使用 `Polly` 添加重试|
|**9. 在测试中使用 Mock**|使用 `Moq` 模拟 API|

🚀 **使用 RestSharp 可以帮助你高效地测试 API，并轻松集成到 .NET 项目中！**


