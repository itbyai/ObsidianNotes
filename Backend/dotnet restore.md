在使用.NET Core命令行工具时，`dotnet restore`是用于还原项目依赖项和工具的命令。你可以通过一些参数来指定源、列出源、设置源的密码等。以下是相关的命令和步骤：

### 1. `dotnet restore` 基本命令

```bash
dotnet restore
```
```bash
dotnet restore -v diag
```
这将还原项目文件夹中的所有项目的依赖项。

### 2. 更改 NuGet 源

你可以使用 `--source` 选项指定自定义的 NuGet 源：

```bash
dotnet restore --source https://custom-nuget-source.com/v3/index.json
```

### 3. 列出当前的 NuGet 源

你可以使用 `nuget` 命令行工具来列出当前配置的 NuGet 源。首先确保你安装了 `nuget.exe`，然后运行：

```bash
nuget sources list
```

这将列出所有当前配置的 NuGet 源。

### 4. 添加新的 NuGet 源

使用 `nuget sources add` 命令可以添加新的 NuGet 源：

```bash
nuget sources add -Name CustomSource -Source https://custom-nuget-source.com/v3/index.json
```

### 5. 删除 NuGet 源

使用 `nuget sources remove` 命令可以删除现有的 NuGet 源：

```bash
nuget sources remove -Name CustomSource
```

### 6. 设置 NuGet 源的密码

如果你的 NuGet 源需要认证，你可以使用 `nuget sources update` 命令来设置用户名和密码：

```bash
nuget sources update -Name CustomSource -Source https://custom-nuget-source.com/v3/index.json -Username your_username -Password your_password
```

### 7. 使用 `nuget.config` 文件

你还可以通过编辑或创建 `nuget.config` 文件来配置 NuGet 源及其认证信息。`nuget.config` 文件通常位于解决方案目录或用户配置目录中。以下是一个示例配置文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="CustomSource" value="https://custom-nuget-source.com/v3/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <CustomSource>
      <add key="Username" value="your_username" />
      <add key="ClearTextPassword" value="your_password" />
    </CustomSource>
  </packageSourceCredentials>
</configuration>
```

### 8. 使用环境变量设置 NuGet 源的认证信息

你可以通过环境变量设置 NuGet 源的用户名和密码，以避免在 `nuget.config` 文件中明文存储密码。设置环境变量的方法因操作系统而异：

- **Windows**：
  ```powershell
  setx NUGET_AUTHENTICATION_USERNAME your_username
  setx NUGET_AUTHENTICATION_PASSWORD your_password
  ```

- **Linux/macOS**：
  ```bash
  export NUGET_AUTHENTICATION_USERNAME=your_username
  export NUGET_AUTHENTICATION_PASSWORD=your_password
  ```

然后，在你的 `nuget.config` 文件中引用这些环境变量：

```xml
<packageSourceCredentials>
  <CustomSource>
    <add key="Username" value="%NUGET_AUTHENTICATION_USERNAME%" />
    <add key="ClearTextPassword" value="%NUGET_AUTHENTICATION_PASSWORD%" />
  </CustomSource>
</packageSourceCredentials>
```

通过这些命令和配置，你可以更好地管理你的 NuGet 源和认证信息，确保你的项目依赖项能够顺利还原。