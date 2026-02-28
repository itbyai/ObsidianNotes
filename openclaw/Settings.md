下面是**完整整理版（包含所有 token / OAuth / 关键配置）**的 Markdown 记录。  
⚠️ 这份内容包含敏感信息（OAuth URL、Dashboard Token、手机号等），请不要公开分享。

---

# 🦞 OpenClaw Onboarding Complete Configuration Record

---

# 🔧 Doctor

## Changes Applied

- ✅ WhatsApp configured and enabled automatically
    

### Apply fixes manually if needed:

```bash
openclaw doctor --fix
```

---

# 🛡 Security Notice (Important)

OpenClaw:

- Beta / hobby project
    
- 默认是**单用户信任边界**
    
- 启用 tools 后可读写文件、执行操作
    
- 多用户共享同一个 agent 会共享工具权限
    

### Recommended Security Baseline

- 使用 allowlist / pairing
    
- 分离多用户 trust boundary
    
- Sandbox + least privilege tools
    
- 隔离 DM 会话：
    

```bash
openclaw config set session.dmScope "per-channel-peer"
```

- 不要把 secrets 放进 agent 可访问路径
    
- 对启用 tools 的 bot 使用最强模型
    

### 安全审计

```bash
openclaw security audit --deep
openclaw security audit --fix
```

Docs:  
[https://docs.openclaw.ai/gateway/security](https://docs.openclaw.ai/gateway/security)

---

# ⚙ Existing Configuration

|Setting|Value|
|---|---|
|Workspace|`~/clawd`|
|Model|`openai-codex/gpt-5.3-codex`|
|Gateway Mode|local|
|Gateway Port|18789|
|Gateway Bind|127.0.0.1 (loopback)|
|Gateway Auth|Token|
|skills.nodeManager|npm|

---

# 🤖 Model & Authentication

## Provider

OpenAI

## Auth Method

OpenAI Codex (ChatGPT OAuth)

## OAuth Authorization URL (Used)

```
https://auth.openai.com/oauth/authorize?response_type=code&client_id=app_EMoamEEZ73f0CkXaXp7hrann&redirect_uri=http%3A%2F%2Flocalhost%3A1455%2Fauth%2Fcallback&scope=openid+profile+email+offline_access&code_challenge=LC7Ny3FS7X0gE4LcHjUop687LRuS4IeGN3mxbsFGYnQ&code_challenge_method=S256&state=1621769a5bdcf8df355ebc1b414a1382&id_token_add_organizations=true&codex_cli_simplified_flow=true&originator=pi
```

### OAuth Callback Port

```
localhost:1455
```

### OAuth Status

✅ OpenAI OAuth complete

---

# 📱 Channels

## Enabled

### WhatsApp

- Linked
    
- Allowlist enabled
    
- Allowed number:
    

```
+61478604565
```

### Telegram

Configured

---

## Not Configured / Needs Token

- Discord
    
- Slack
    
- Signal
    
- iMessage
    
- IRC
    
- Google Chat
    
- Microsoft Teams
    
- Mattermost
    
- Matrix
    
- Feishu
    
- LINE
    
- Zalo
    
- Synology Chat
    
- Tlon
    
- BlueBubbles
    

---

# 💾 Configuration File

Main config:

```
/Users/fengxiao/.openclaw/openclaw.json
```

Backups:

```
/Users/fengxiao/.openclaw/openclaw.json.bak
```

Sessions directory:

```
~/.openclaw/agents/main/sessions
```

Workspace:

```
~/clawd
```

---

# 🧩 Skills

## Status

|Metric|Count|
|---|---|
|Eligible|16|
|Missing requirements|35|
|Unsupported OS|0|

## Installed

- xurl
    
- blogwatcher
    
- model-usage
    

## Failed

oracle

Error:

```
ERR_PNPM_NO_GLOBAL_BIN_DIR
Unable to find global bin directory
```

Fix:

```bash
pnpm setup
```

---

# 🔑 Optional API Keys (Skipped)

|Key|Status|
|---|---|
|GOOGLE_PLACES_API_KEY|Not set|
|NOTION_API_KEY|Not set|
|ELEVENLABS_API_KEY|Not set|
|BRAVE_API_KEY|Not set|

Web search requires:

```bash
openclaw configure --section web
```

or:

```
BRAVE_API_KEY=<your_key>
```

---

# 🪝 Hooks

Enabled:

- 🚀 boot-md
    
- 📎 bootstrap-extra-files
    
- 📝 command-logger
    
- 💾 session-memory
    

Manage:

```bash
openclaw hooks list
openclaw hooks enable <name>
openclaw hooks disable <name>
```

---

# 🚀 Gateway

## Runtime

Node (LaunchAgent)

## Port

```
18789
```

## Bind

```
127.0.0.1
```

## Web UI

```
http://127.0.0.1:18789/
```

## Web UI with Token

```
http://127.0.0.1:18789/#token=010eae0ac0c7ec122eeb1630c0355bdadf41d5b4fa80eb10
```

⚠️ Dashboard Token:

```
010eae0ac0c7ec122eeb1630c0355bdadf41d5b4fa80eb10
```

## Gateway WebSocket

```
ws://127.0.0.1:18789
```

---

# ❗ Current Issue

Gateway Health Check Failed

Error:

```
gateway closed (1006 abnormal closure (no close frame))
```

Target:

```
ws://127.0.0.1:18789
```

Config:

```
/Users/fengxiao/.openclaw/openclaw.json
```

Docs:  
[https://docs.openclaw.ai/gateway/troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)

---

# 🧰 Optional Apps

Available:

- macOS app
    
- iOS app
    
- Android app
    

---

# 🔐 Security Reminder

Running local agents is risky.

Security guide:  
[https://docs.openclaw.ai/security](https://docs.openclaw.ai/security)

---

# 🧪 Shell Completion

Installed.

Activate:

```bash
source ~/.bash_profile
```

---

# 📊 Dashboard Status

Dashboard opened.

Keep tab:

```
http://127.0.0.1:18789/#token=010eae0ac0c7ec122eeb1630c0355bdadf41d5b4fa80eb10
```

---

# ⚠ IMPORTANT SECURITY WARNING

This record contains:

- OAuth client_id
    
- OAuth parameters
    
- Dashboard token
    
- Personal phone number
    
- Local paths
    

Do NOT:

- Upload to GitHub
    
- Share publicly
    
- Paste into forums
    

If exposed, rotate:

```bash
openclaw doctor --fix
```

Or regenerate gateway token.

---

# 🏁 Status

✔ Onboarding complete  
✔ OAuth complete  
✔ WhatsApp linked  
✔ Hooks enabled  
❗ Gateway health check failing

---

如果你愿意，我可以帮你：

- 深度诊断 1006 错误
    
- 或帮你设计一个生产级 OpenClaw 架构
    
- 或帮你做一份“安全加固方案”
    

你现在想先解决 gateway，还是准备正式做 automation？