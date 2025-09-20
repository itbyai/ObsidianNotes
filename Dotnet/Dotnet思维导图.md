---
mindmap-plugin: basic
---



# .NET Core 创建 RESTful 服务端程序 - 关键知识

## 1. 基础知识
- **ASP.NET Core 基础**
  - 项目结构
  - 启动文件（Startup.cs、Program.cs）
  - 中间件（Middleware）
  - 路由（Routing）

## 2. RESTful API 基础
- **RESTful 架构风格**
  - 资源的定义与URL设计
  - 无状态通信
  - 标准的HTTP方法（GET, POST, PUT, DELETE, PATCH）
- **控制器与路由**
  - [ApiController]特性
  - 路由属性（[Route]、[HttpGet], [HttpPost] 等）

## 3. 数据处理
- **模型（Models）**
  - 创建数据模型
  - 数据验证与绑定
- **DTO（数据传输对象）**
  - DTO模式的应用
  - AutoMapper使用
- **依赖注入**
  - 使用 DI 注入服务
  - Repository 模式

## 4. 数据库交互
- **Entity Framework Core**
  - DbContext 配置
  - 数据库迁移（Migrations）
  - LINQ 查询
  - 异步操作（async/await）
  
## 5. 请求与响应
- **模型绑定与验证**
  - 请求参数的模型绑定
  - 模型验证（DataAnnotations）
- **响应格式化**
  - 返回标准化的JSON格式
  - 状态码设置（Status Codes）
  - 使用 IActionResult

## 6. 安全与认证
- **身份验证与授权**
  - ASP.NET Core Identity
  - JWT（JSON Web Token）认证
- **跨域资源共享（CORS）**
  - 启用和配置 CORS

## 7. 日志与异常处理
- **日志系统**
  - 集成 ILogger 进行日志记录
- **异常处理**
  - 全局异常处理
  - 错误响应格式化

## 8. 性能优化
- **数据缓存**
  - 内存缓存（Memory Cache）
  - 分布式缓存（Redis）
- **分页与排序**
  - RESTful API中的分页、排序与过滤

## 9. 部署与发布
- **Docker 容器化**
  - 创建 Dockerfile
  - 多阶段构建
- **CI/CD**
  - 持续集成与发布
- **云部署**
  - 部署到 Azure、AWS 等云服务

## 10. 高级主题
- **版本控制**
  - API 版本控制策略
- **HATEOAS**
  - 增强 RESTful API 的自描述性


