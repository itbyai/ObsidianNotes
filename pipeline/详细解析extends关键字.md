在 Azure DevOps Pipelines 的 YAML 文件中，`extends` 关键字用于**继承**（或**复用**）一个现有的 YAML 模板，并在当前 Pipeline 文件中应用它。

---

## **1. `extends` 的作用**

- **复用代码**：避免重复写相同的 `stages`、`jobs` 和 `steps`。
- **保持一致性**：多个 Pipeline 共享同一个模板，确保相同的构建、测试、部署逻辑。
- **简化管理**：修改模板即可影响所有使用它的 Pipeline，而不用逐个修改。

---

## **2. 语法**

```yaml
extends:
  template: <模板路径>
  parameters:
    <参数名>: <参数值>
```

- `template`：指定要继承的 YAML 文件（可以是本地或远程存储库）。
- `parameters`：传递给模板的参数，模板会根据参数执行不同的逻辑。

---

## **3. 示例**

### **(1) 使用本地模板**

**`pipeline.yml`（主 Pipeline）**

```yaml
extends:
  template: build-template.yml
  parameters:
    buildPlatform: 'dotnet8'
    checkCoverage: true
```

**`build-template.yml`（模板文件）**

```yaml
parameters:
  buildPlatform: 'dotnet6'
  checkCoverage: false

stages:
  - stage: Build
    jobs:
      - job: BuildJob
        steps:
          - script: echo "Building for platform $(buildPlatform)"
          - script: echo "Code coverage check is $(checkCoverage)"
```

📌 **解析**：

- `pipeline.yml` 继承 `build-template.yml`，并传递参数 `buildPlatform: dotnet8`、`checkCoverage: true`。
- `build-template.yml` 里默认的 `dotnet6` 被 `dotnet8` 覆盖，`checkCoverage` 变成 `true`。

---

### **(2) 使用远程模板**

如果模板文件存储在 GitHub 仓库，可以这样继承：

```yaml
extends:
  template: base-platform-pipeline.yml@templates
  parameters:
    buildPlatform: dotnet8
    deploymentPlatforms:
      - platform: aks
        subscription: cmrc
```

其中：

- `@templates` 表示 `base-platform-pipeline.yml` 来自 `resources.repositories` 里定义的 `templates` 仓库：

```yaml
resources:
  repositories:
    - repository: templates
      type: GitHub
      endpoint: dominos-dpe
      name: dominos-dpe/Platform.Pipeline
      ref: refs/tags/v21.1.1
```

---

## **4. `extends` vs `template`**

Azure DevOps 里还有另一个关键字 `template`，它们的区别如下：

|关键字|用途|
|---|---|
|`extends`|继承整个 Pipeline 模板，覆盖 `stages`、`jobs`、`steps`|
|`template`|只引入 `stages`、`jobs` 或 `steps`，不能覆盖完整的 Pipeline|

---

## **5. `extends` 的局限性**

- **只能继承一个模板**（不能多重继承）。
- **不支持 `variables`（变量组）**，需要在 `parameters` 里传递参数。
- **继承的模板不能引用 `stages`、`jobs` 之外的 `steps`**，否则会报错。

---

## **6. 你的 Pipeline 里的 `extends`**

你的 YAML 文件里：

```yaml
extends:
  template: base-platform-pipeline.yml@templates
  parameters:
    buildPlatform: dotnet8
    deploymentPlatforms:
      - platform: aks
        subscription: cmrc
```

📌 **意思是**：

1. **继承** `base-platform-pipeline.yml`（来自 `dominos-dpe/Platform.Pipeline` 仓库）。
2. **传递参数**：
    - `buildPlatform` 设为 `dotnet8`。
    - `deploymentPlatforms` 指定 `aks` 和 `cmrc` 订阅。
3. **完整的 Pipeline 逻辑在 `base-platform-pipeline.yml`**，需要去这个文件查看 `stages` 和 `jobs`。

---

## **7. 总结**

- `extends` 让 YAML 继承一个 Pipeline 模板。
- 传递 `parameters`，让模板执行不同的逻辑。
- **你的 YAML 只是入口**，真正的 CI/CD 逻辑在 `base-platform-pipeline.yml`。
- 需要去 `base-platform-pipeline.yml` 里找 `stages`、`jobs`，才能看到完整的 CI/CD 流程。

如果你要搞清楚你的 Pipeline **具体做了什么**，建议去 `dominos-dpe/Platform.Pipeline` 仓库里找 `base-platform-pipeline.yml`，看看它是如何组织 `stages`、`jobs` 和 `steps` 的。