
---

mindmap-plugin: basic

---


# AWS 学习思维导图

## 1. 计算 (Compute)
- **EC2 (Elastic Compute Cloud)**
  - 实例类型：t2, m5, c5...
  - 启动/停止/扩展
  - 安全组 & Key Pair
- **Lambda**
  - 无服务器计算
  - 事件触发
  - 支持多种语言
- **Elastic Beanstalk**
  - 应用部署平台
  - 自动扩展和负载均衡
- **ECS / EKS**
  - 容器服务
  - ECS: AWS 原生
  - EKS: Kubernetes 管理

## 2. 存储 (Storage)
- **S3 (Simple Storage Service)**
  - 对象存储
  - Bucket & 权限
  - 生命周期管理
- **EBS (Elastic Block Store)**
  - 块存储
  - 挂载到 EC2
- **EFS (Elastic File System)**
  - 文件存储
  - 多实例共享
- **Glacier**
  - 冷存储
  - 归档与备份

## 3. 数据库 (Database)
- **RDS (Relational Database Service)**
  - MySQL, PostgreSQL, Oracle
  - 自动备份与高可用
- **DynamoDB**
  - NoSQL
  - 高性能、低延迟
- **Aurora**
  - 高性能关系型数据库
  - 兼容 MySQL / PostgreSQL
- **Redshift**
  - 数据仓库
  - 分析大数据

## 4. 网络 (Networking)
- **VPC (Virtual Private Cloud)**
  - 子网、路由表、NAT
  - 网络隔离
- **Route 53**
  - DNS 服务
  - 域名解析 & 健康检查
- **ELB (Elastic Load Balancer)**
  - 负载均衡
  - 支持 HTTP/HTTPS/TCP
- **CloudFront**
  - CDN 服务
  - 静态 & 动态内容加速

## 5. DevOps & 管理 (DevOps & Management)
- **CloudFormation**
  - 基础设施即代码
  - 模板化部署
- **CloudWatch**
  - 监控日志
  - 告警和指标
- **CodePipeline / CodeBuild / CodeDeploy**
  - CI/CD 流水线
  - 自动构建与部署
- **IAM (Identity and Access Management)**
  - 用户与权限管理
  - 角色与策略

## 6. 安全 (Security)
- **KMS (Key Management Service)**
  - 数据加密
  - 密钥管理
- **Secrets Manager**
  - 管理数据库密码、API Key
- **Shield / WAF**
  - 防护 DDoS 攻击
  - Web 应用防火墙

## 7. 分析 & AI (Analytics & AI)
- **Athena**
  - 查询 S3 数据
  - 无服务器 SQL
- **EMR**
  - 大数据处理
  - Hadoop / Spark
- **SageMaker**
  - 机器学习模型训练和部署
- **QuickSight**
  - 数据可视化

## 8. 其他
- **SNS (Simple Notification Service)**
  - 消息通知
  - 发布/订阅模式
- **SQS (Simple Queue Service)**
  - 消息队列
  - 异步处理
- **Step Functions**
  - 工作流编排
  - 任务自动化
