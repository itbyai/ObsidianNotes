


在 Azure Pipelines 中，定义的变量和 `namespace` 有着明确的生命周期、作用范围和管理方式。它们的使用和消失依赖于不同的上下文，以下是详细的说明：

### 1. **变量的定义与生命周期**

#### 变量定义

在 Azure Pipelines 中，变量可以在多个地方定义：

- **Pipeline 层级变量**：定义在 YAML 文件中的 `variables` 部分。
- **Job 层级变量**：定义在 `job` 部分的 `variables` 中，作用范围局限于该 Job。
- **Step 层级变量**：在某个特定的步骤中定义，作用范围仅限于该步骤。
- **环境变量**：在步骤中通过 `env` 字段定义的环境变量，仅在当前步骤中有效。

#### 变量的生命周期

变量的生命周期从它们被定义开始，到 Pipeline 执行完成为止。具体来说：

- **在 YAML 文件中定义的变量**：
    - 如果在 `variables` 部分定义，它们在整个 Pipeline 执行过程中有效，且可以在所有 Job 和步骤中引用。
- **Job 层级变量**：
    - 只在该 Job 的范围内有效，一旦 Job 执行结束，该变量将不再有效。
- **Step 层级变量**：
    - 仅在该步骤执行时有效，一旦步骤完成，变量消失。

#### 变量的引用

可以在 YAML 文件的任何地方引用变量。引用的方式有：

- **直接使用变量**：例如，`$(variableName)`，这种方式会引用已定义的 Pipeline 变量。
- **在命令中引用**：比如 `echo $(variableName)` 会输出变量的值。
- **环境变量**：在步骤中通过 `env` 定义并引用。

#### 变量的作用范围

- **Pipeline 层级变量**：在整个 Pipeline 中有效，包括所有 Job 和步骤。
- **Job 层级变量**：只在当前 Job 内有效。
- **Step 层级变量**：只在当前 Step 内有效。

#### 什么时候变量会消失

变量会在以下情况消失：

- **Pipeline 执行完成后**：所有定义的变量会在 Pipeline 执行完成后消失，无法跨 Pipeline 使用。
- **Job 执行完成后**：Job 中定义的变量只在该 Job 中有效，一旦 Job 执行完成，这些变量就消失了。
- **Step 执行完成后**：Step 中定义的变量只在该 Step 执行时有效，Step 执行结束，变量失效。

### 2. **Namespace 的生命周期与作用范围**

在 Azure Pipelines 中，`namespace` 通常是与 Kubernetes 相关的资源定义，用于标识特定的部署环境、集群或者特定的资源隔离。它与变量的作用范围不同。

#### Namespace 定义与引用

- **定义 Namespace**：通常是通过环境配置或 Kubernetes 配置来定义。它可以是一个在 Kubernetes 集群中创建的命名空间，用来将不同的资源（如 Pods、Services 等）进行逻辑隔离。
- **在 YAML 文件中引用 Namespace**：可以在 `deployment` 步骤中指定 `namespace`，例如使用 Helm 部署时指定要部署的 `namespace`。

#### Namespace 的生命周期与作用范围

- **Kubernetes Namespace**：它的生命周期由 Kubernetes 集群控制，与 Pipeline 的生命周期无关。当你在 YAML 文件中引用 Kubernetes 命名空间时，它在集群中保持有效，直到您手动删除它。
- **Pipeline 变量中的 Namespace**：如果在变量中定义了与 Namespace 相关的值（如 `AKS.Cluster.Namespace.SBX`），它将作为变量在 Pipeline 中有效，直到 Pipeline 执行完毕。

#### 变量与 Namespace 的交互

如果你在 YAML 中使用了与 `namespace` 相关的变量（如 `AKS.Cluster.Namespace.SBX`），那么这些变量会在整个 Pipeline 执行过程中生效，直到执行完成后消失。

### 3. **如何管理和引用变量与 Namespace**

#### 管理变量

Azure Pipelines 提供了两种管理变量的方式：

1. **在 YAML 中定义**：通过 `variables` 定义，在 Pipeline 运行时自动生效。
2. **在 UI 中定义**：在 Azure DevOps 项目的 Pipeline 页面中，可以通过 UI 设置变量，这些变量会自动与 Pipeline 配合使用。

#### 引用变量

- 在 YAML 文件中引用变量时，使用 `$(variableName)` 的语法来获取变量的值。比如：
    
    ```yaml
    steps:
      - script: echo $(MY_VARIABLE)
        displayName: 'Display variable'
    ```
    

#### 引用 Namespace

在 Kubernetes 相关步骤中，通常使用 `namespace` 来指定资源的目标命名空间。例如：

```yaml
steps:
  - task: Kubernetes@1
    displayName: 'Kubectl apply'
    inputs:
      kubernetesServiceConnection: '$(K8S_CONNECTION)'
      namespace: '$(AKS.Cluster.Namespace.SBX)'  # 引用定义的变量
      command: apply
      arguments: '-f $(System.DefaultWorkingDirectory)/deployment.yaml'
```

### 4. **总结：变量与 Namespace 生命周期**

- **变量**：在 Azure Pipelines 中，变量的生命周期从定义时开始，到 Pipeline 执行完成为止。它们可以在不同的作用范围内（Pipeline、Job、Step）定义和使用。
- **Namespace**：与 Kubernetes 资源相关的命名空间通常由集群本身管理，而与 Pipeline 中的变量关联的 Namespace，在 Pipeline 执行过程中有效，执行完成后消失。

Azure Pipelines 提供了强大的变量管理和作用范围控制机制，可以灵活地定义、引用和管理不同生命周期和作用范围的变量。