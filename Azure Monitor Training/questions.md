![[Pasted image 20250325131513.png]]
该图展示了 **Azure Monitor 的架构**，将其分为 **数据源（Data Sources）**、**数据平台（Data Platform）** 和 **消费（Consumption）** 三个主要部分。以下是详细解析：

### **1. 数据源（Data Sources）**

Azure Monitor 收集来自不同来源的数据，包括：

- **应用/工作负载（Apps / Workloads）**
- **基础设施（Infrastructure）**（如虚拟机、容器等）
- **Azure 平台（Azure Platform）**（Azure 资源本身的数据）
- **自定义数据源（Custom Sources）**（用户定义的数据源）

### **2. 数据平台（Data Platform）**

数据进入 Azure Monitor 后，分为以下几种类型进行存储和处理：

- **Metrics（指标）**：度量系统性能的数据，如 CPU 使用率、内存消耗等。
- **Logs（日志）**：详细的事件记录，可用于故障排查和分析。
- **Traces（追踪）**：分布式应用的跟踪信息。
- **Changes（更改）**：Azure 资源的变更历史。

此外，SCOM（System Center Operations Manager）托管实例可与 Azure Monitor 集成，用于数据库和 Ops Console 的管理。

### **3. 消费（Consumption）**

Azure Monitor 提供多种方式来可视化和使用这些监控数据：

- **Insights（洞察）**：监控应用程序、容器、虚拟机和网络。
- **Visualize（可视化）**：
    - Workbooks（工作簿）
    - Dashboards（仪表盘）
    - Power BI（商业智能工具）
    - Grafana（开源可视化工具）
- **Analyze（分析）**：
    - Metric Explorer（指标分析）
    - Log Analytics（日志分析）
    - Change Analysis（变更分析）
- **Respond（响应）**：
    - AIOps（AI 运维）
    - Alerts and Actions（告警和自动化响应）
    - Autoscale（自动扩展）

### **4. 集成（Integrate）**

Azure Monitor 可与多个外部系统集成，包括：

- **Event Hubs**（事件中心）
- **Azure Storage**（Azure 存储）
- **Managed Partners**（托管合作伙伴）
- **Import / Export APIs**（数据导入/导出 API）
- **Logic Apps**（逻辑应用）
- **Functions**（无服务器计算）
- **Azure DevOps**（CI/CD 集成）
- **GitHub**（代码托管和 CI/CD）

#### **总结**

Azure Monitor 是一个完整的监控和日志管理解决方案，能够收集、存储、分析并可视化 Azure 资源和应用的数据，同时支持多种集成方式，帮助开发者和运维团队提高系统可观测性。


![Uploaded image](https://files.oaiusercontent.com/file-7B6NVk53pYc9CSKwnDX1vX?se=2025-03-25T03%3A34%3A57Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dimage.png&sig=r65yqxChxEgufeAo7VH6BNCOJ2fP4JqloGXq/u//d%2B0%3D)

###### ChatGPT

该图片展示了 **Azure Monitor 的可用性（Availability）**，重点强调了 **Log Analytics** 和 **Application Insights** 这两个功能的 **区域可用性（Regional Availability）**。

### **主要内容解析**

1. **Azure Monitor 的功能（Features）**
    
    - **Log Analytics**（日志分析）
    - **Application Insights**（应用监控）
    - **Activity Log**（活动日志）
    - **Metrics**（指标）
    - **Diagnostic Logs**（诊断日志）
    - **AutoScale**（自动扩展）
    - **Action Groups**（操作组）
    - **Alerts（告警）**
    - **Alerts（Classic 旧版告警）**
2. **区域支持**
    
    - 这些 Azure Monitor 功能并非在所有区域都可用，而是 **受区域可用性限制**，需要查看支持的 Azure 区域。
    - 表格中提供了 **不同地区（Azure Stack Hub、Africa、Asia Pacific、Australia、Brazil、Canada）** 对应的功能支持情况，打勾（✔）表示该区域支持该功能。
3. **最新的可用性查询**
    
    - 提供了一个 **Azure 官方链接**，可实时查询 Azure Monitor 在全球各个区域的可用性： **[https://azure.microsoft.com/en-us/global-infrastructure/services/?products=monitor&regions=all](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=monitor&regions=all)**

### **总结**

Azure Monitor 的核心功能（如 **Log Analytics 和 Application Insights**）在不同 Azure 区域的支持情况不同。用户在使用这些功能前，应先查询最新的区域可用性，以确保其在目标区域可用。


hot manner 
retension period
Archieve
![[Pasted image 20250325134206.png]]
该图片展示了 **Azure Monitor 采集的数据类别（Data Collected）**，主要分为以下五个层级：

### **Azure Monitor 采集的数据类型**

1. **Application monitoring data**（应用监控数据）
    
    - 监控应用程序的性能、请求、异常、依赖项等。
    - 通过 **Application Insights** 进行采集和分析。
2. **Guest OS monitoring data**（来宾操作系统监控数据）
    
    - 监控 Azure 虚拟机（VM）或容器内部的操作系统性能、事件日志、CPU/内存使用率等。
    - 通过 **Azure Monitor Agent（AMA）** 或 **Log Analytics** 采集数据。
3. **Azure resource monitoring data**（Azure 资源监控数据）
    
    - 监控 Azure 资源（如 VM、存储账户、数据库、负载均衡器）的运行状态和性能指标。
    - 依赖 **Azure Metrics** 和 **Azure Resource Manager（ARM）** 提供数据。
4. **Azure subscription monitoring data**（Azure 订阅监控数据）
    
    - 监控 Azure 订阅级别的操作，包括策略合规性、成本管理、RBAC（角色访问控制）等。
    - 主要使用 **Azure Policy**、**Azure Cost Management** 及 **Activity Logs**。
5. **Azure tenant monitoring data**（Azure 租户监控数据）
    
    - 监控跨订阅和租户级别的管理操作，例如 **Azure Active Directory（Azure AD）** 活动、身份验证日志、全局策略等。
    - 依赖 **Azure AD Logs** 和 **Microsoft Defender for Cloud**。

### **总结**

Azure Monitor 通过多个层级的数据采集能力，为用户提供全面的监控能力，帮助分析应用、基础设施、订阅和租户级别的性能、健康状况和安全性。