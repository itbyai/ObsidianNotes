error while building:

![[Pasted image 20240715113805.png]]


# .core常用的命令:

在 macOS 上使用 Visual Studio Code (VS Code) 运行 .NET Core 项目时，有一系列常用命令可以帮助你构建、运行、测试和调试项目。以下是一些常用命令和步骤：

### 1. 安装 .NET SDK

确保你已经安装了 .NET SDK。你可以在终端中运行以下命令来验证安装：

```bash
dotnet --version
```

### 2. 安装必需的 VS Code 扩展

确保你已经在 VS Code 中安装了 C# 扩展：
- 打开 VS Code。
- 点击左侧的扩展图标（方块图标）或按 `Ctrl+Shift+X`。
- 搜索 "C#" 并安装由 Microsoft 提供的 C# 扩展。

### 3. 常用的 .NET CLI 命令

#### 创建新项目

```bash
dotnet new console -o MyConsoleApp
cd MyConsoleApp
```

#### 恢复依赖项

如果你有一个现有的项目或解决方案，首先运行以下命令来恢复所有依赖项：

```bash
dotnet restore
```

#### 构建项目

构建项目以确保所有代码编译正确：

```bash
dotnet build
```

#### 运行项目

运行你的应用程序：

```bash
dotnet run
```

#### 添加项目引用

如果你有多个项目，并且需要在项目之间添加引用：

```bash
dotnet add [PROJECT] reference [REFERENCE_PROJECT]
```

例如：

```bash
dotnet add MyApp/MyApp.csproj reference MyLibrary/MyLibrary.csproj
```

#### 运行单元测试

如果你有单元测试项目，可以运行以下命令来执行测试：

```bash
dotnet test
```

### 4. 在 VS Code 中调试

#### 配置调试

当你第一次在 VS Code 中打开一个 .NET 项目时，C# 扩展会提示你添加必要的资产以生成和调试。点击 "Yes"。

#### 手动配置调试

你可以手动配置调试设置。在项目的根目录下创建一个 `.vscode` 文件夹，然后创建或编辑 `launch.json` 文件：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": ".NET Core Launch (console)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "${workspaceFolder}/bin/Debug/net8.0/YourProjectName.dll",
            "args": [],
            "cwd": "${workspaceFolder}",
            "stopAtEntry": false,
            "console": "internalConsole",
            "internalConsoleOptions": "openOnSessionStart",
            "launchBrowser": {
                "enabled": false
            }
        }
    ]
}
```

### 5. 运行和调试测试用例

在 VS Code 中，可以使用 Test Explorer 来运行和调试测试用例。确保你已经安装了 .NET Test Explorer 扩展：
- 打开 VS Code。
- 点击左侧的扩展图标（方块图标）或按 `Ctrl+Shift+X`。
- 搜索 ".NET Test Explorer" 并安装。

在你的项目中运行和调试测试用例：
- 打开测试资源管理器视图。
- 运行或调试所需的测试用例。

### 6. 使用 `dotnet watch` 进行实时重载

在开发过程中，使用 `dotnet watch` 可以自动重建和运行你的应用程序：

```bash
dotnet watch run
```

这样，当你更改代码时，`dotnet watch` 会自动重新编译和运行应用程序。

### 7. 管理依赖项

添加 NuGet 包：

```bash
dotnet add package [PACKAGE_NAME]
```

列出已安装的包：

```bash
dotnet list package
```

### 8. 发布应用程序

构建发布版本的应用程序：

```bash
dotnet publish -c Release -o ./publish
```

这样会在 `./publish` 目录中生成发布版本的应用程序。

### 总结

使用这些命令和步骤，你可以在 macOS 上的 VS Code 中有效地构建、运行、调试和管理 .NET Core 项目。确保安装必要的扩展和 SDK 版本，以便充分利用 VS Code 的功能来开发 .NET Core 应用程序。


# SPECFLOW
要在 Visual Studio Code 中使用 SpecFlow 并享受其完整功能，你需要安装以下插件和配置：

### 1. 安装 SpecFlow 插件

#### SpecFlow for Visual Studio Code

- 打开 Visual Studio Code。
- 点击左侧的扩展图标（方块图标）或按 `Ctrl+Shift+X`。
- 搜索 “SpecFlow” 并安装名为 “Cucumber (Gherkin) Full Support”的插件。这是目前支持 Gherkin 语法和 BDD 功能的插件。

### 2. 安装必要的 .NET 扩展

确保你已经安装了以下 .NET 扩展：

- **C#** by Microsoft：提供 C# 语言的基本支持。
- **.NET Core Test Explorer**：帮助你在 Test Explorer 中运行和调试测试用例。

### 3. 配置 SpecFlow

#### 安装 SpecFlow NuGet 包

在你的 .NET Core 项目中，安装 SpecFlow 和 SpecFlow.NUnit（或者你选择的测试框架）：

```bash
dotnet add package SpecFlow
dotnet add package SpecFlow.NUnit
```

### 4. 配置 SpecFlow in .NET Core Project

你需要确保你的项目正确配置了 SpecFlow：

1. **创建 `specflow.json`** 文件：

在项目根目录创建一个 `specflow.json` 文件，配置 SpecFlow 设置：

```json
{
  "bindingCulture": {
    "name": "en-US"
  },
  "language": {
    "feature": "en"
  },
  "plugins": [
    {
      "name": "SpecFlow.NUnit",
      "type": "Generator"
    },
    {
      "name": "SpecFlow.NUnit",
      "type": "Runtime"
    }
  ]
}
```

2. **创建 Step Definitions**：

确保你有对应于你的 Gherkin 特性的 Step Definitions 文件。例如：

```csharp
using TechTalk.SpecFlow;

namespace YourProject.StepDefinitions
{
    [Binding]
    public class YourStepDefinitions
    {
        [Given(@"I have entered (.*) into the calculator")]
        public void GivenIHaveEnteredIntoTheCalculator(int number)
        {
            // Your code here
        }

        [When(@"I press add")]
        public void WhenIPressAdd()
        {
            // Your code here
        }

        [Then(@"the result should be (.*) on the screen")]
        public void ThenTheResultShouldBeOnTheScreen(int result)
        {
            // Your code here
        }
    }
}
```

### 5. 在 VS Code 中运行和调试测试

1. **打开测试资源管理器**：

确保已经安装了 .NET Core Test Explorer 插件，点击测试图标以打开测试资源管理器视图。

2. **运行和调试 SpecFlow 测试**：

在测试资源管理器中，你可以看到你的 SpecFlow 测试。你可以选择运行或调试特定的测试用例。

### 6. 配置生成特性文件代码隐藏

在项目中添加或更新 `csproj` 文件，确保 SpecFlow 生成代码隐藏文件：

```xml
<ItemGroup>
  <None Update="Features/*.feature">
    <Generator>MSBuild:UpdateDesignTimeXaml</Generator>
    <LastGenOutput>FeatureName.feature.cs</LastGenOutput>
  </None>
</ItemGroup>
```

### 总结

通过安装和配置 SpecFlow 插件、C# 扩展、以及 .NET Core Test Explorer，你可以在 Visual Studio Code 中高效地使用 SpecFlow 进行行为驱动开发 (BDD)。确保你的项目配置正确，并根据需要调整 SpecFlow 的设置和插件。