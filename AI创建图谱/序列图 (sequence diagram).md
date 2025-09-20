// Comment at the top of a .cs or .md file for Copilot to read
/**
 * Goal: Generate a Mermaid sequence diagram showing the end-to-end request flow for a specific API operation.
 * 
 * Requirements:
 * 1. Analyze the actual code flow in the controllers and services
 * 2. Create a sequenceDiagram showing:
 *    - Client request to API endpoint
 *    - Controller to Service interactions
 *    - Service to Repository/Search service calls
 *    - Database/external service queries
 *    - Return flow with responses
 * 3. Use proper sequence diagram syntax with participants and message arrows
 * 4. Show the actual method calls and data flow
 * 5. Include error handling flows if relevant
 * 
 * Structure:
 * - Use sequenceDiagram syntax
 * - Define participants (Client, API, Service, Repository, Database, etc.)
 * - Show synchronous calls with ->>
 * - Show return values with -->>
 * - Use descriptive labels for each interaction
 * - Follow the clean architecture layers from the codebase
 * 
 * Trace a specific operation like:
 * - Order times calculation workflow
 * - Delivery segment search process  
 * - Delivery rule management flow
 * - Any CRUD operation end-to-end
 * 
 * Scan the actual controller actions and service methods to get the real flow.
 */
Generate a Mermaid sequence diagram (sequenceDiagram) showing the complete request flow:

1. Trace the actual code execution path from API to database
2. Show participants: Client, API Controller, Services, Repositories, Database
3. Include:
   - HTTP request/response
   - Service method calls
   - Repository queries
   - Database operations
   - External service calls
4. Use proper Mermaid syntax:
   - participant definitions
   - Synchronous calls: A->>B
   - Return responses: B-->>A
   - Descriptive message labels

Focus on a specific operation like:
- POST /ordertimes/calculate flow
- GET delivery segments workflow
- Delivery rule creation process

Analyze the controller actions and service implementations to show the real execution sequence.

更简洁的版本：
Create a Mermaid sequence diagram for [specific API operation]:

- Show end-to-end flow from client request to database response
- Include all layers: Controller → Service → Repository → Database
- Use actual class and method names from the codebase
- Show both request flow (->>) and response flow (-->>)
- Include external service calls if any

Example operation: POST /ordertimes/calculate
**关键要素：**

- ✅ 明确指定 `sequenceDiagram` 语法
- ✅ 要求分析实际代码执行路径
- ✅ 指定参与者（Client, API, Service, Repository, Database）
- ✅ 指定消息箭头语法（`->>` 和 `-->>`）
- ✅ 要求包含具体的 API 操作
- ✅ 强调遵循清洁架构层级
- ✅ 要求使用真实的类名和方法名

这样的 prompt 会让 Copilot 分析您的控制器、服务和仓储层的实际代码，生成准确反映代码执行流程的序列图，符合您的 clean architecture 和 SOLID 原则。