

## 核心提示词模板

```
请为我创建一个完整的 Python Locust 负载测试项目，要求模仿企业级微服务测试架构。

### 项目架构要求：
1. **多环境支持** - 支持 CI/Stage/Prod 环境配置
2. **微服务测试覆盖** - 包含多个独立的微服务测试模块
3. **数据驱动测试** - 支持外部数据文件和参数化
4. **自动化报告** - 集成邮件报告和图表生成
5. **分布式部署** - 支持云端部署和分布式执行
```

## 目录结构要求

### 项目根目录
```
project_root/
├── locustfile.py              # 主入口文件，导入所有测试类
├── config.yaml               # 多环境配置文件
├── requirements.txt          # Python依赖
├── README.md                # 项目文档
├── .gitignore               # Git忽略文件
├── report_email.py          # 邮件报告生成
├── test_services.py         # 手动测试脚本
├── test_bff.py             # BFF层测试脚本
```

### 测试用例目录
```
├── tests/
│   ├── __init__.py
│   ├── locust_extension.py  # Locust扩展基类
│   ├── services_orders.py   # 订单服务测试
│   ├── services_customers.py # 客户服务测试
│   ├── services_payments.py  # 支付服务测试
│   ├── services_inventory.py # 库存服务测试
│   ├── services_notifications.py # 通知服务测试
│   ├── bff_mobile.py       # 移动端BFF测试
│   ├── bff_web.py          # Web端BFF测试
│   └── integration_*.py    # 集成测试
```

### 工具函数目录
```
├── helpers/
│   ├── __init__.py
│   ├── config.py           # 配置解析
│   ├── utilities.py        # 通用工具
│   ├── json_client.py      # JSON客户端
│   ├── graph_client.py     # GraphQL客户端
│   ├── web_client.py       # Web客户端
│   ├── line_graph.py       # 线图生成
│   ├── bar_graph.py        # 柱图生成
│   └── enums.py            # 枚举定义
```

### 测试数据目录
```
├── data/
│   ├── users.csv           # 用户数据
│   ├── products.csv        # 产品数据
│   ├── stores.csv          # 门店数据
│   ├── test_accounts.csv   # 测试账户
│   └── vouchers.csv        # 优惠券数据
```

### 请求载荷目录
```
├── payloads/
│   ├── services/           # 微服务载荷
│   │   ├── orders/        # 订单相关载荷
│   │   │   ├── create_order.json
│   │   │   ├── update_order.json
│   │   │   └── cancel_order.json
│   │   ├── customers/     # 客户相关载荷
│   │   │   ├── register.json
│   │   │   ├── login.json
│   │   │   └── profile.json
│   │   └── payments/      # 支付相关载荷
│   │       ├── initiate_payment.json
│   │       └── process_payment.json
│   ├── graphql_payloads/  # GraphQL查询
│   │   ├── user_query.gql
│   │   ├── order_query.gql
│   │   ├── menu_query.gql
│   │   └── variables/     # 变量文件
│   │       ├── user_variables.json
│   │       └── order_variables.json
│   └── sql/              # SQL查询
│       ├── user_queries.sql
│       └── order_queries.sql
```

### 邮件模板目录
```
├── templates/
│   ├── base.html         # 基础模板
│   ├── header.html       # 头部模板
│   ├── body.html         # 主体模板
│   ├── signature.html    # 签名模板
│   ├── company_logo.png  # 公司Logo
│   └── signature.png     # 签名图片
```

### 结果分析目录
```
├── results/
│   ├── comparison.py     # 结果对比
│   ├── thresholds.py     # 阈值定义
│   ├── outcome.py        # 结果判定
│   └── deviations.py     # 偏差分析
```

### 数据库操作目录
```
├── databases/
│   ├── dynamo_worker.py  # DynamoDB操作
│   ├── cosmos_worker.py  # CosmosDB操作
│   ├── decimal_encoder.py # 数字编码器
│   └── format_results.py # 结果格式化
```

### 部署配置目录
```
└── deployment/
    └── app/
        ├── templates/    # 部署模板
        │   └── app-deploy.yaml
        └── parameters/   # 部署参数
            └── app-deploy.json
```

## 技术特性要求

### 关键技术特性
1. **Locust扩展类** - 创建HttpLocustExtended基类，集成性能监控
2. **配置驱动** - YAML配置支持多环境、多地区
3. **GraphQL支持** - 完整的GraphQL查询和变量管理
4. **任务序列** - 支持TaskSequence和TaskSet两种模式
5. **缓存检测** - 响应头分析、时间模式检测
6. **错误处理** - break_flow机制和异常恢复
7. **性能监控** - 实时数据收集和DynamoDB存储
8. **邮件报告** - HTML模板、图表生成、SendGrid集成
9. **数据参数化** - CSV文件驱动的测试数据
10. **云端部署** - AWS ECS/EKS部署支持

### 代码风格要求
- **Python最佳实践** - PEP8规范、类型注解
- **模块化设计** - 单一职责、低耦合
- **配置外置** - 所有环境相关配置通过YAML管理
- **错误处理** - 完善的异常处理和日志记录
- **文档完备** - 详细的README和代码注释

### 测试场景设计
1. **单一服务测试** - 独立的API性能测试
2. **业务流程测试** - 完整的用户旅程模拟
3. **压力测试** - 高并发场景验证
4. **稳定性测试** - 长时间运行验证
5. **集成测试** - 跨服务依赖测试

## 特定功能增强提示词

### 微服务测试模块生成
```
为每个微服务生成独立的测试类，要求：
- 继承自HttpLocustExtended基类
- 支持TaskSequence顺序执行和TaskSet随机执行
- 包含完整的CRUD操作测试
- 支持缓存检测和性能监控
- 错误处理和流程中断机制

示例服务：订单服务、客户服务、支付服务、库存服务、通知服务
```

### 配置系统生成
```
创建多层级配置系统：
- 环境配置（CI/Stage/Prod）
- 地区配置（AU/US/EU/JP）
- 服务端点配置（LoadBalancers/Services）
- API密钥管理（ApiKeys）
- 测试阈值配置（Thresholds）
- 邮件配置（Email）
- 数据库配置（Dynamo/Cosmos）
```

### 数据管理系统
```
创建测试数据管理系统：
- CSV文件数据加载
- 随机数据生成
- 数据池管理
- 参数化测试支持
- 多地区数据适配
```

### 报告系统生成
```
创建完整的报告系统：
- Jinja2 HTML模板
- matplotlib图表生成
- SendGrid邮件发送
- 性能阈值比较
- 历史数据对比
- 失败原因分析
```

## 业务场景定制提示词

### 电商平台负载测试
```
针对电商平台特点，添加以下测试场景：
- 用户注册登录流程
- 商品搜索浏览
- 购物车操作
- 订单结算支付
- 库存管理
- 促销活动
- 客户服务
```

### 金融服务负载测试
```
针对金融服务特点，添加以下测试场景：
- 账户验证
- 交易处理
- 风控检测
- 报表生成
- 合规检查
- 安全认证
```

## 部署和监控提示词

### 部署配置
```
创建完整的部署和监控方案：

部署配置：
- Docker容器化
- Kubernetes部署
- AWS ECS/EKS支持
- CI/CD集成
- 环境变量管理

监控集成：
- Prometheus指标收集
- Grafana仪表板
- CloudWatch日志
- 实时告警
- 性能基线对比

自动化流程：
- GitHub Actions集成
- 定时测试执行
- 自动报告发送
- 失败自动重试
- 结果归档存储
```

## 完整使用示例

```
请基于以上要求，为一个在线食品配送平台（类似Domino's）创建完整的负载测试项目，包含：

1. 10个微服务测试模块：
   - 用户认证服务
   - 门店搜索服务
   - 菜单服务
   - 购物车服务
   - 订单服务
   - 支付服务
   - 配送跟踪服务
   - 通知服务
   - 客户服务
   - 优惠券服务

2. 3种测试模式：
   - 单一API性能测试
   - 完整用户购买流程测试
   - 高峰期混合场景测试

3. 多地区支持：
   - 澳大利亚（AU）
   - 美国（US）
   - 日本（JP）
   - 欧洲（EU）

4. 完整的CI/CD集成：
   - GitHub Actions工作流
   - 自动化测试执行
   - 性能报告生成
   - 失败告警机制

请确保代码质量达到生产级别标准，包含完整的文档和示例配置。
```

## 额外要求

### 项目质量标准
- 企业级的可维护性
- 高度的可扩展性
- 生产环境的实用性
- 完整的错误处理
- 详细的性能监控
- 自动化的报告生成

### 文档要求
- 详细的README文档
- API接口说明
- 配置参数说明
- 部署操作指南
- 故障排查手册
- 最佳实践指南

这些提示词将帮助AI Agent生成一个与Domino's负载测试项目结构和功能相似的完整项目框架。