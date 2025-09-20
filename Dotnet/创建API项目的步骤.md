以下是提取的知识点，并使用 **Obsidian 反向链接格式** 标注：

---

## **C# API 集成测试项目知识点**

- [[创建 Csharp项目# 测试项目]]
    
    - 使用 `.NET CLI` 创建 `xUnit` / `NUnit` / `MSTest` 项目
    - 在 **Visual Studio** 中创建测试项目
- [[添加测试依赖]]
    
    - `FluentAssertions`（更清晰的断言）
    - `Microsoft.Extensions.Configuration.Json`（加载 `appsettings.json`）
    - `RestSharp`（用于 API 测试）
    - `Moq`（模拟 API 响应）
- [[测试项目目录结构]]
    
    - `Fixtures/`（测试夹具）
    - `Helpers/`（辅助工具，如 `ApiClientHelper.cs`）
    - `Models/Configurations/`（配置和数据模型）
    - `RequestBuilders/`（请求构造器）
    - `Tests/`（具体测试用例）
- [[appsettings.json 配置]]
    
    - 存储 API `BaseUrl` 和 `ApiKey`
    - 通过 `Microsoft.Extensions.Configuration` 进行读取
- [[封装 API 请求]]
    
    - 使用 `RestSharp` 发送 API 请求
    - 提供 `SendRequestAsync` 方法
- [[测试夹具（Fixtures）]]
    
    - 通过 `TestFixture` 统一管理资源
    - `Dispose` 方法清理资源
- [[编写 API 测试用例]]
    
    - `Fact` 标注测试方法
    - `ClassFixture<TestFixture>` 共享资源
    - `FluentAssertions` 进行断言
- [[运行测试]]
    
    - 使用 `.NET CLI` 运行：`dotnet test`
    - 在 **Visual Studio** 中运行测试
- [[Git 版本控制]]
    
    - `git init`
    - `git add .`
    - `git commit -m "Initial commit"`
- [[CI/CD 配置]]
    
    - 配置 GitHub Actions 自动化测试
    - `.github/workflows/test.yml` 配置示例

---

这些格式可以直接复制到 **Obsidian** 里使用，方便你在知识库中管理和查询 🚀！