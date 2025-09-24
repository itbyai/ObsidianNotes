


# Locust 性能测试 思维导图

## 1. 基础概念
- 什么是 Locust
  - 基于 Python 的性能测试工具
  - 使用协程（gevent）模拟用户
  - 支持分布式和可扩展
- 使用场景
  - Web API 压测
  - 系统并发验证
  - 性能瓶颈定位

## 2. 安装与环境
- Python 环境准备
- 安装 Locust
  - `pip install locust`
- 启动命令
  - `locust -f locustfile.py`

## 3. 核心组成
- locustfile.py
  - 定义用户行为
- HttpUser
  - 模拟用户
- 任务集（tasks）
  - @task 装饰器
  - 权重（task weighting）
- 运行配置
  - 用户数 (users)
  - 生成速率 (spawn rate)
  - 运行时间

## 4. 编写测试脚本
- 定义用户类
  - 继承 `HttpUser`
- 定义任务
  - `@task` 函数
- 等待时间
  - between(min, max)
- 示例
  - GET 请求
  - POST 请求
  - 参数化请求

## 5. 执行与监控
- Web UI
  - http://localhost:8089
  - 设置用户数、启动速率
  - 实时图表 & 统计
- 命令行执行
  - `--headless`
  - `--users`
  - `--spawn-rate`
  - `--run-time`
- 分布式运行
  - Master 节点
  - Worker 节点

## 6. 结果分析
- 关键指标
  - 请求数 (RPS)
  - 响应时间分布
  - 成功率 / 错误率
- 报告导出
  - CSV
  - JSON
- 瓶颈定位
  - 慢请求
  - 高错误接口

## 7. 最佳实践
- 合理设计场景
  - 模拟真实用户行为
- 参数化测试数据
- 分布式部署
- 持续集成 (CI/CD) 集成
  - GitHub Actions
  - Jenkins
  - GitLab CI
- 与监控工具联动
  - Prometheus
  - Grafana

## 8. 高级特性
- 自定义事件 (events)
- 钩子函数 (setup/teardown)
- 动态用户行为
- 与外部系统结合
  - 数据库
  - 消息队列
  - 认证系统




