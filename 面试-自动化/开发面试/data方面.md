很棒的问题 — 这些都是面试里常会被问到的“后端+data 层”设计与实现点。下面把 SQL / Cosmos / Redis / Service Bus 这四块按 **要点 + 原理 + 常见编码/部署实践（含示例代码，C# 为主）** 讲清楚，重点给出容易考到的最佳实践（比如 CosmosClient 单例、Service Bus 的幂等/死信处理、Redis 缓存模式、SQL 事务/连接池/索引等）。

# 总体原则（先看这部分，做所有选择时都适用）

- **连接/客户端尽量为单例**（节省连接建立开销，利用连接池）：CosmosClient、ConnectionMultiplexer、ServiceBusClient 都应单例/长生命周期。
- **幂等性**：消息处理必须幂等（使用 messageId 去重表或外键约束）。
- **重试与退避**：对临时网络/服务故障使用指数退避重试（Polly 或 SDK 内置重试）。
- **监控/可观测性**：记录处理延迟、失败率、DLQ（dead-letter）数、RU 消耗、cache hit rate。
    
- **安全**：用 Key Vault / Managed Identity 管理密钥，启用 TLS。
    
- **测试**：单元测试 + 集成测试（本地 emulator/container），对消息系统做端到端测试。
    

---

# 1) SQL（关系型数据库） — 要点与 coding 建议

**要点**

- 使用参数化查询避免 SQL 注入。
    
- 连接池通常由驱动自动管理（在 ADO.NET 中默认开启），不要每次创建新连接而不释放。
    
- 用事务处理一致性（ACID），必要时设置合适的隔离级别。
    
- 索引、查询计划和分页优化是性能关键。
    
- 批量插入/更新使用 bulk API 或批处理语句。
    

**常见模式**

- **Outbox pattern**：在同一 DB 事务中写业务表 + outbox 表，后台 worker 读取 outbox 发消息（避免分布式事务）。
    
- **乐观并发**：用 rowversion/ETag 来实现并发控制。
    

**代码示例（Dapper/ADO.NET）**

```csharp
using (var conn = new SqlConnection(connStr))
{
    await conn.OpenAsync();
    var sql = "INSERT INTO Orders(CustomerId, Amount) VALUES(@CustomerId, @Amount)";
    await conn.ExecuteAsync(sql, new { CustomerId = id, Amount = amt });
}
```

重试（示意，使用 Polly）：

```csharp
var retry = Policy.Handle<SqlException>().WaitAndRetryAsync(3, i => TimeSpan.FromSeconds(Math.Pow(2, i)));
await retry.ExecuteAsync(async () => { /* DB call */ });
```

---

# 2) Cosmos DB（文档 DB / 全局分布） — 要点与 coding 建议

**要点**

- **CosmosClient = 单例**（创建开销大）。
    
- 选择**合理的 partition key**（高基数、均匀分布）。
    
- 了解 RU（吞吐）成本并对查询/写做优化（避免全表扫描）。
    
- 使用 **ETag / IfMatch** 做乐观并发控制。
    
- 考虑一致性级别（强/会话/最终）对延迟和成本的影响。
    
- 缓存常用 Container/Database 对象，避免每次 GetContainer 调用重复开销（容器对象是轻量的但最好复用）。
    

**示例：在 ASP.NET Core 注入单例**

```csharp
// Startup.cs
services.AddSingleton<CosmosClient>(sp =>
{
    var cfg = sp.GetRequiredService<IConfiguration>();
    return new CosmosClient(cfg["Cosmos:Endpoint"], cfg["Cosmos:Key"]);
});
```

**读取/写入示例**

```csharp
var container = cosmosClient.GetContainer(dbId, containerId);
try {
    var res = await container.ReadItemAsync<MyItem>(id, new PartitionKey(pk));
} catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound) { /* ... */ }
```

**乐观并发（ETag）**

```csharp
var read = await container.ReadItemAsync<MyItem>(id, new PartitionKey(pk));
var etag = read.ETag;
var options = new ItemRequestOptions { IfMatchEtag = etag };
await container.ReplaceItemAsync(item, item.Id, new PartitionKey(pk), options);
```

---

# 3) Redis（缓存 / 轻量数据 / 分布式锁 / Streams） — 要点与 coding 建议

**要点**

- 使用 **ConnectionMultiplexer 单例**（StackExchange.Redis）。
    
- 常见缓存策略：**Cache-Aside（旁路缓存）**、写-through、写-behind。Cache-aside 最常用。
    
- 小心缓存失效导致的缓存击穿、雪崩与穿透：使用互斥锁、加随机 TTL 或 Bloom Filter。
    
- **不要把大对象或敏感数据放到缓存里**；对序列化要一致（JSON, MessagePack）。
    
- 分布式锁要谨慎，若用 RedLock 要了解其局限性。Redis Streams 可做轻量消息队列。
    

**示例（Singleton & Cache-Aside）**

```csharp
// 注册
var mux = ConnectionMultiplexer.Connect(redisConn);
services.AddSingleton<IConnectionMultiplexer>(mux);

// 使用
var db = mux.GetDatabase();
var cached = await db.StringGetAsync(key);
if (cached.IsNull) {
    var value = await LoadFromDbAsync(id);
    await db.StringSetAsync(key, JsonConvert.SerializeObject(value), TimeSpan.FromMinutes(10));
    return value;
} else return JsonConvert.DeserializeObject<MyObj>(cached);
```

---

# 4) Service Bus / Message Queue（消息） — 要点与 coding 建议

**要点**

- **ServiceBusClient 单例**，Processor/Sender 可以按需创建或也复用。
    
- **消息处理必须幂等**：用 MessageId 去重、或在 DB 中展示处理记录（ProcessedMessages）。
    
- 处理失败要区分可重试错误与不可恢复错误，把不可恢复的移入 DLQ（dead-letter）。
    
- 使用批处理、预取（prefetch）、并发控制（MaxConcurrentCalls）来提高吞吐。
    
- 长处理应异步交付到后台 worker，避免阻塞消息处理线程。
    
- 如果需要保证 DB 与消息一致性：使用 Outbox pattern，而不是分布式事务。
    

**示例（Azure.Messaging.ServiceBus）**

```csharp
// 注册单例
services.AddSingleton(sp => new ServiceBusClient(serviceBusConn));

// 创建 processor
var client = sp.GetRequiredService<ServiceBusClient>();
var processor = client.CreateProcessor(queueName, new ServiceBusProcessorOptions { MaxConcurrentCalls = 5 });
processor.ProcessMessageAsync += MessageHandler;
processor.ProcessErrorAsync += ErrorHandler;
await processor.StartProcessingAsync();

async Task MessageHandler(ProcessMessageEventArgs args) {
    var id = args.Message.MessageId;
    var body = args.Message.Body.ToString();
    if (await IsProcessedAsync(id)) {
        await args.CompleteMessageAsync(args.Message);
        return;
    }
    try {
        await ProcessBusinessAsync(body);
        await MarkProcessedAsync(id);
        await args.CompleteMessageAsync(args.Message);
    } catch (TransientException) {
        // 可以让 SDK 重试或 Abandon 留给重试策略
        throw;
    } catch (Exception) {
        await args.DeadLetterMessageAsync(args.Message, "ProcessingFailed", "reason");
    }
}
```

---

# 5) 常见设计模式 & 面试常问点（总结）

- **Singleton clients**：CosmosClient、ConnectionMultiplexer、ServiceBusClient 都应单例。
    
- **Outbox** 用于 DB 与消息的可靠协作。面试会问为什么不用分布式事务（因为复杂、依赖性大，outbox 更常用）。
    
- **Idempotency**：用 MessageId 去重表；避免消息重复处理导致副作用。
    
- **Partitioning**（Cosmos）与 **sharding**（SQL）讨论：如何选 partition key、如何减少跨分区查询。
    
- **Retries & Circuit Breaker**（Polly）：如何对 transient error 做策略。
    
- **Observability**：如何监控 RU 消耗 / cache hit rate / DLQ / processing latency。
    
- **Security**：如何管理 secrets（Key Vault）、如何使用 Managed Identity 连接 Azure 服务。
    
- **性能**：索引、分页、批量写入、Redis TTL、Service Bus prefetch、DB connection pooling。
    

---

如果你想要我把某一块**展开成完整面试答案（例如 Outbox 的流程 + 代码 + 为什么比事务好）**或把示例改成 **Node.js/Java** 版本，我可以直接给你准备好可贴运行的示例代码和关键面试要点。要我先做哪一块更详细？