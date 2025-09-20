在 VS Code 上创建一个 **新的 MCP Agent**（主要用于本地 AI/自动化任务、Playwright/MCP 流程等）通常涉及以下几个核心步骤。我帮你总结成一个完整的流程：

---

## 1️⃣ 安装与准备

1. **安装 VS Code**（最新版）
    
2. **安装相关扩展**：
    
    - **Copilot / Copilot Chat**（如果你的 MCP agent依赖 AI）
        
    - **MCP Agent 扩展**（如果官方提供）
        
3. **确保环境依赖**：
    
    - Node.js / Python / .NET 等（根据 MCP agent 具体实现）
        
    - 本地浏览器驱动（Playwright / Chromium / WebKit / Firefox 等）
        

---

## 2️⃣ 创建 user data folder

- MCP agent 需要一个 **工作目录**来存储 agent 配置、缓存和日志。
    
- 路径建议：
    
    - Mac/Linux: `/Users/<username>/.vscode/mcp-agent/`
        
    - Windows: `C:\Users\<username>\.vscode\mcp-agent\`
        
- 只需要是空文件夹，VS Code 会自动生成子目录和文件。
    

---

## 3️⃣ 创建 Custom Chat Mode 文件（agent 配置文件）

1. 在 VS Code 里选择 **“Create New Custom Chat Mode File”**
    
2. 填写必要信息：
    
    - **name/title**：Agent 名字（如 `Playwright Driver`）
        
    - **description**：功能描述
        
    - **instructions / systemPrompt**：定义 agent 行为
        
        - 例如：`You are an MCP agent that executes browser testing commands via Playwright.`
            
    - **context**（可选）：是否访问当前文件、workspace 或选中的代码
        
3. 保存为 JSON 文件到 **user data folder** 内
    

---

## 4️⃣ 启动 MCP Agent

- 打开 VS Code Terminal 或通过扩展命令启动：
    
    - 让 agent 读取 custom chat mode 文件
        
    - 让 agent 初始化 Playwright / MCP Server 驱动环境
        
- 验证 agent 是否成功运行：
    
    - 输出日志（console）
        
    - 或者尝试下发一个简单任务（比如打开网页）
        

---

## 5️⃣ 测试与调试

1. 使用 **Copilot Chat 或自定义命令**调用 MCP agent
    
2. 给 agent 下达任务：
    
    - 示例：打开网页、点击按钮、抓取元素
        
3. 检查 agent 执行是否正确、日志是否记录异常
    

---

## 6️⃣ 持续优化

- 更新 custom chat mode 中的 **instructions/systemPrompt**，让 agent 更智能
    
- 配置更多上下文数据（workspace 文件、浏览器状态等）
    
- 如果是团队使用，可将 user data folder 统一存放到共享位置
    

---

### ✅ 小结

在 VS Code 上创建新的 MCP agent 可以理解为 **三步走**：

1. **环境准备**（VS Code、扩展、浏览器驱动、user data folder）
    
2. **配置 agent**（创建 custom chat mode 文件，定义行为和上下文）
    
3. **运行 & 调试**（启动 agent、下发任务、查看日志）
    

---

如果你想，我可以帮你画一个 **VS Code + MCP Agent 创建与运行流程图（Mermaid 图）**，把每一步的依赖和顺序直观展示出来。



```mermaid
flowchart TB
    A[开始：安装 VS Code] --> B[安装扩展]
    B --> B1[Copilot / Copilot Chat]
    B --> B2[MCP Agent 扩展（如果有）]
    B --> C[准备环境依赖]
    C --> C1[Node.js / Python / .NET]
    C --> C2[浏览器驱动（Playwright / Chromium 等）]
    C --> D[创建 User Data Folder]
    D --> E[创建 Custom Chat Mode 文件]
    E --> E1[填写 name / title]
    E --> E2[填写 description]
    E --> E3[填写 instructions / systemPrompt]
    E --> E4[选择 context（可选）]
    E --> F[启动 MCP Agent]
    F --> F1[读取 custom chat mode 配置]
    F --> F2[初始化 Playwright / MCP Server]
    F --> G[测试与调试]
    G --> G1[下发简单任务（打开网页、抓取元素）]
    G --> G2[检查日志 & 执行结果]
    G --> H[持续优化]
    H --> H1[更新 instructions/systemPrompt]
    H --> H2[增加上下文数据]
    H --> H3[团队共享 user data folder（可选）]
    H --> I[完成：MCP Agent 可正常运行]
