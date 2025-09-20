在 Azure Pipelines 中，使用 `extends` 引用的模板文件如果位于不同的 **repo** 中，不需要手动克隆到本地。Azure Pipelines 提供了对跨仓库模板文件引用的支持，您可以直接通过配置引用其他仓库中的 YAML 模板文件，而不需要先将其克隆到本地。

### 如何引用其他仓库的 YAML 文件？

Azure Pipelines 允许在 `extends` 语句中指定来自其他仓库的模板文件。您只需要确保在 YAML 文件中指定正确的仓库资源，并使用合适的路径引用该模板。

#### 示例：引用其他仓库中的模板

假设您有一个模板文件 `build-template.yml` 存储在 GitHub 上的某个仓库中，并希望在 Azure Pipeline 中使用它。您可以按照以下方式进行配置：

##### 1. **在 YAML 文件中定义 `resources` 和 `extends`**：

```yaml
resources:
  repositories:
    - repository: templates
      type: GitHub
      endpoint: <GitHub endpoint name>
      name: <organization>/<repository-name>
      ref: refs/tags/v1.0.0 # 或者具体的 branch 名

trigger:
- master

extends:
  template: build-template.yml@templates
  parameters:
    buildPlatform: 'dotnet8'
    deploymentPlatform: 'aks'
```

#### 解释：

- **`resources.repositories`** 部分：这定义了一个名为 `templates` 的外部 GitHub 仓库资源，并指定该仓库的 GitHub 端点、仓库名称以及引用的版本（例如，标签或分支）。
- **`template`**：这里的 `build-template.yml@templates` 是引用外部仓库中名为 `build-template.yml` 的模板文件，`@templates` 表示这个文件来自于 `templates` 仓库资源。
- **`parameters`**：将需要的参数传递给模板，`buildPlatform` 和 `deploymentPlatform` 是我们在模板中定义的参数。

#### 2. **GitHub 仓库访问设置**：

- **endpoint**：您需要在 Azure Pipelines 中配置 GitHub 的访问权限，即通过 Azure Pipelines 与 GitHub 的连接。这个连接可以是个人访问令牌（Personal Access Token, PAT），确保 Azure Pipelines 有权限访问目标仓库。

### 使用 GitHub 和其他源的模板注意事项：

- **权限问题**：确保 Azure Pipelines 有权限访问其他仓库，尤其是在涉及私有仓库时，您需要在 `resources` 中指定适当的访问令牌或凭证。
    
- **模板路径**：确保引用的模板文件路径在目标仓库中是正确的。路径应该相对于该仓库的根目录。
    

### 总结

通过 `extends` 引用其他仓库的 YAML 文件时，Azure Pipelines 会自动从远程仓库拉取模板并执行相应的任务，您不需要手动克隆这些仓库。只需确保配置了正确的仓库资源并具有适当的权限即可。这使得 CI/CD 管道更加灵活，能在多个仓库之间共享模板，减少了冗余配置。