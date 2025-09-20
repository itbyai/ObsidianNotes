以下是你的 YAML 文件转换为 Markdown 格式的内容：

````markdown
# YAML 文件关键步骤分析

## **变量 (variables)**
```yaml
variables:
  - group: 'CMRC-Global - Services.Checkout'
  - group: 'CMRC-Global - Infra.AKS'
  - group: 'CMRC - Platform.Pipeline'

  # This is the namespace of your team, which will only be used in SBX and CI
  - name: AKS.Cluster.Namespace.SBX
    value: cap

  - name: AKS.Cluster.Namespace.CI
    value: cap
````

- 变量组 (`group`) 用于引用预定义的全局变量。
- `AKS.Cluster.Namespace.SBX` 和 `AKS.Cluster.Namespace.CI` 定义了在 SBX 和 CI 环境下的 Kubernetes 命名空间。

---

## **资源 (resources)**

```yaml
resources:
  repositories:
    - repository: templates
      type: GitHub
      endpoint: dominos-dpe
      name: dominos-dpe/Platform.Pipeline
      ref: refs/tags/v21.1.1
```

- **引用了 GitHub 仓库** `dominos-dpe/Platform.Pipeline` 作为 `templates` 。
- **版本** 使用 `v21.1.1`，可以在 [Atlassian Wiki](https://dominos.atlassian.net/wiki/spaces/PF/pages/4728095340/Releases) 获取最新版本。

---

## **触发器 (trigger)**

```yaml
trigger:
- master
```

- **当 `master` 分支有更新时触发该 Pipeline**。

---

## **继承 (extends)**

```yaml
extends:
  template: base-platform-pipeline.yml@templates
  parameters:
    buildPlatform: dotnet8
    buildOptions:
      continueOnLintError: false
    checkCoverage:
      policy: forceImprovement
      coverageThreshold: '80'
    deploymentPlatforms:
      - platform: aks
        subscription: cmrc
        helmChartVersion: $(aks-service-helmchart-version)
    imposterServices:
      - service-checkout
      - service-fulfillment
      - service-orders
      - service-payments-adyen
      - service-pricing
      - service-storemenu
```

### **继承的模板**

- 继承 `base-platform-pipeline.yml@templates` 作为 CI/CD 基础模板。

### **参数**

- `buildPlatform: dotnet8` → 使用 `.NET 8` 作为构建平台。
- `buildOptions.continueOnLintError: false` → **Lint 错误会中断构建**。
- `checkCoverage.policy: forceImprovement` → **强制代码覆盖率改进**。
- `checkCoverage.coverageThreshold: '80'` → **最低代码覆盖率 80%**。
- `deploymentPlatforms`:
    - **部署到 `AKS`** (`Azure Kubernetes Service`)，使用 `cmrc` 订阅。
    - **Helm Chart 版本** 从 `$(aks-service-helmchart-version)` 变量获取。
- `imposterServices`:
    - 依赖的模拟服务：
        - `service-checkout`
        - `service-fulfillment`
        - `service-orders`
        - `service-payments-adyen`
        - `service-pricing`
        - `service-storemenu`

---

## **备注 (notes)**

```yaml
# notes:
#   some-variables-are-not-included-in-pipeline: |
#       There are plenty of variables listed in the old release pipeline:
#       https://dominos-au.visualstudio.com/OneDigital/_releaseDefinition?definitionId=414&_a=definition-variables.
#       The list below are the ones we couldn't find any usage or reference, thus they are not copied
#       here to avoid confusion.
```

- 旧版 Pipeline (`OneDigital` release pipeline) **包含很多未使用的变量**，未被复制到当前 Pipeline 以减少混乱。

---

## **忽略的变量 (ignored)**

```yaml
# ignored:
#   - var-name: AdyenProviderClientKey
#   - var-name: AdyenProviderClientUrl
#   - var-name: App.Locust.EnvironmentName
#   - var-name: App.Locust.TestClass
#   - var-name: App.OrdersServiceBusConnectionString
#   - var-name: App.Version
#   - var-name: ASPNETCORE_ENVIRONMENT
#   - var-name: CyberSourceProviderClientKey
#   - var-name: CyberSourceProviderClientUrl
#   - var-name: FeaturesServiceClientKey
#   - var-name: FeaturesServiceClientUrl
#   - var-name: FulfillmentClientKey
#   - var-name: FulfillmentClientUrl
#   - var-name: GMOProviderClientApiKey
#   - var-name: GMOProviderClientBaseUrl
#   - var-name: GMOProviderClientUrl
#   - var-name: GMOProviderSecretKey
#   - var-name: HostName
#   - var-name: LogLevel
#   - var-name: LoyaltyIntegrationServiceClientKey
#   - var-name: OnTimeCookingClientKey
#   - var-name: OnTimeCookingClientUrl
#   - var-name: OrderServiceClientKey
#   - var-name: OrderServiceClientUrl
#   - var-name: OrderTimerClientKey
#   - var-name: OrderTimerClientUrl
#   - var-name: PayPalProviderClientKey
#   - var-name: PayPalProviderClientUrl
#   - var-name: PricingClientUrl
#   - var-name: StoreMenuClientKey
#   - var-name: StoreNo
#   - var-name: UseProdAzureServiceUrls
```

- **这些变量在旧版 Pipeline 存在，但在当前 Pipeline 没有使用**，因此被忽略。

```yaml
#   - var-group: FlexCyberSourceClientSettings - Test Sandbox
#   - var-group: CI - Common
#   - var-group: PreProd - AUE - Azure Keys
#   - var-group: Stage - AU - Legacy-EmailsServiceBaseUrl
#   - var-group: Stage - AU - Legacy-CouponsServiceBaseUrl
#   - var-group: Stage - AU - Legacy-OfflinePaymentsServiceBaseUrl
#   - var-group: Stage - EU - Legacy-OfflinePaymentsServiceBaseUrl
```

- **这些变量组 (`var-group`) 也未被使用**。

---

## **总结**

1. **变量 (`variables`)**
    
    - 主要用于管理环境相关的配置，如 AKS 命名空间 (`SBX` 和 `CI`)。
2. **资源 (`resources`)**
    
    - 依赖 `dominos-dpe/Platform.Pipeline` GitHub 仓库，版本 `v21.1.1`。
3. **触发器 (`trigger`)**
    
    - 仅在 `master` 分支变更时触发 CI/CD。
4. **继承 (`extends`)**
    
    - 继承 `base-platform-pipeline.yml`，并传递：
        - `.NET 8` 作为构建平台
        - **Lint 失败中断构建**
        - **代码覆盖率强制改进，最低 80%**
        - **部署到 AKS**
        - **依赖多个 `imposterServices`**
5. **忽略的变量 (`ignored`)**
    
    - 旧版 Pipeline 里未使用的变量和变量组未被复制。

---

📌 **下一步建议** 如果你想深入了解：

- **完整 CI/CD 逻辑** → 需要查看 `base-platform-pipeline.yml` 的内容。
- **部署逻辑** → 需要检查 `aks-service-helmchart-version` 变量的定义来源。

---

```

这份 Markdown 文档结构清晰，适用于文档化、分享或团队内部讨论。你可以直接复制粘贴到你的 **Obsidian、GitHub Wiki 或 Confluence** 里使用。
```

📌 这是一个原始的yaml文件：
```把下面的内容转化成markdonwn的格式
查看一下整个yaml的流程找到这个yaml文件的关键步骤：
variables:
  - group: 'CMRC-Global - Services.Checkout'
  - group: 'CMRC-Global - Infra.AKS'
  - group: 'CMRC - Platform.Pipeline'

  # This is the namespace of your team, which will only be used in SBX and CI
  - name: AKS.Cluster.Namespace.SBX
    value: cap

  # This is the namespace of your team, which will only be used in SBX and CI
  - name: AKS.Cluster.Namespace.CI
    value: cap

resources:
  repositories:
    - repository: templates
      type: GitHub
      endpoint: dominos-dpe
      name: dominos-dpe/Platform.Pipeline
      ref: refs/tags/v21.1.1 # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/4728095340/Releases

trigger:
- master

extends:
  template: base-platform-pipeline.yml@templates
  parameters:
    buildPlatform: dotnet8
    buildOptions:
      continueOnLintError: false
    checkCoverage:
      policy: forceImprovement
      coverageThreshold: '80'
    deploymentPlatforms:
      - platform: aks
        subscription: cmrc
        helmChartVersion: $(aks-service-helmchart-version)
    imposterServices:
      - service-checkout
      - service-fulfillment
      - service-orders
      - service-payments-adyen
      - service-pricing
      - service-storemenu

# notes:
#   some-variables-are-not-included-in-pipeline: |
#       There are plenty of variables listed in the old release pipeline:
#       https://dominos-au.visualstudio.com/OneDigital/_releaseDefinition?definitionId=414&_a=definition-variables.
#       The list below are the ones we couldn't find any usage or reference, thus they are not copied
#       here to avoid confusion.
#   ignored:
#     - var-name: AdyenProviderClientKey
#     - var-name: AdyenProviderClientUrl
#     - var-name: App.Locust.EnvironmentName
#     - var-name: App.Locust.TestClass
#     - var-name: App.OrdersServiceBusConnectionString
#     - var-name: App.Version
#     - var-name: ASPNETCORE_ENVIRONMENT
#     - var-name: CyberSourceProviderClientKey
#     - var-name: CyberSourceProviderClientUrl
#     - var-name: FeaturesServiceClientKey
#     - var-name: FeaturesServiceClientUrl
#     - var-name: FulfillmentClientKey
#     - var-name: FulfillmentClientUrl
#     - var-name: GMOProviderClientApiKey
#     - var-name: GMOProviderClientBaseUrl
#     - var-name: GMOProviderClientUrl
#     - var-name: GMOProviderSecretKey
#     - var-name: HostName
#     - var-name: LogLevel
#     - var-name: LoyaltyIntegrationServiceClientKey
#     - var-name: OnTimeCookingClientKey
#     - var-name: OnTimeCookingClientUrl
#     - var-name: OrderServiceClientKey
#     - var-name: OrderServiceClientUrl
#     - var-name: OrderTimerClientKey
#     - var-name: OrderTimerClientUrl
#     - var-name: PayPalProviderClientKey
#     - var-name: PayPalProviderClientUrl
#     - var-name: PricingClientUrl
#     - var-name: StoreMenuClientKey
#     - var-name: StoreNo
#     - var-name: UseProdAzureServiceUrls
#     - var-group: FlexCyberSourceClientSettings - Test Sandbox
#     - var-group: CI - Common
#     - var-group: PreProd - AUE - Azure Keys
#     - var-group: Stage - AU - Legacy-EmailsServiceBaseUrl
#     - var-group: Stage - AU - Legacy-CouponsServiceBaseUrl
#     - var-group: Stage - AU - Legacy-OfflinePaymentsServiceBaseUrl
#     - var-group: Stage - EU - Legacy-OfflinePaymentsServiceBaseUrl
```