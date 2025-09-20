#### **方式 1：使用 .NET CLI**

在终端（Command Prompt 或 PowerShell）中执行：

```bash
dotnet new xunit -n ApiIntegrationTests
cd ApiIntegrationTests
```

这将在当前目录创建一个 **xUnit** 测试项目。

如果你想用 **NUnit**：

```bash
dotnet new nunit -n ApiIntegrationTests
cd ApiIntegrationTests
```

如果你想用 **MSTest**：

```bash
dotnet new mstest -n ApiIntegrationTests
cd ApiIntegrationTests

#### **方式 2：使用 Visual Studio**

1. 打开 **Visual Studio**（Windows 或 Mac）。
2. 点击 **"Create a new project"**（创建新项目）。
3. 搜索 **"xUnit Test Project"**、**"NUnit Test Project"** 或 **"MSTest Project"** 选择一个。
4. 设定项目名称为 `ApiIntegrationTests`，选择合适的路径后点击 **创建**。
5. 确保目标框架选择的是 `.NET 6` 或 `.NET 8`（取决于你的项目环境）。
6. 完成后，Visual Studio 会自动生成一个测试类 `UnitTest1.cs`。