◇  Doctor changes ──────────────────────────────╮
│                                               │
│  WhatsApp configured, enabled automatically.  │
│                                               │
├───────────────────────────────────────────────╯
│
◇  Doctor ──────────────────────────────────────────────╮
│                                                       │
│  Run "openclaw doctor --fix" to apply these changes.  │
│                                                       │
├───────────────────────────────────────────────────────╯
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
██░▄▄▄░██░▄▄░██░▄▄▄██░▀██░██░▄▄▀██░████░▄▄▀██░███░██
██░███░██░▀▀░██░▄▄▄██░█░█░██░█████░████░▀▀░██░█░█░██
██░▀▀▀░██░█████░▀▀▀██░██▄░██░▀▀▄██░▀▀░█░██░██▄▀▄▀▄██
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
                  🦞 OPENCLAW 🦞                    
 
┌  OpenClaw onboarding
│
◇  Security ────────────────────────────────────────────────────────────────────╮
│                                                                               │
│  Security warning — please read.                                              │
│                                                                               │
│  OpenClaw is a hobby project and still in beta. Expect sharp edges.           │
│  By default, OpenClaw is a personal agent: one trusted operator boundary.     │
│  This bot can read files and run actions if tools are enabled.                │
│  A bad prompt can trick it into doing unsafe things.                          │
│                                                                               │
│  OpenClaw is not a hostile multi-tenant boundary by default.                  │
│  If multiple users can message one tool-enabled agent, they share that        │
│  delegated tool authority.                                                    │
│                                                                               │
│  If you’re not comfortable with security hardening and access control, don’t  │
│  run OpenClaw.                                                                │
│  Ask someone experienced to help before enabling tools or exposing it to the  │
│  internet.                                                                    │
│                                                                               │
│  Recommended baseline:                                                        │
│  - Pairing/allowlists + mention gating.                                       │
│  - Multi-user/shared inbox: split trust boundaries (separate                  │
│    gateway/credentials, ideally separate OS users/hosts).                     │
│  - Sandbox + least-privilege tools.                                           │
│  - Shared inboxes: isolate DM sessions (`session.dmScope: per-channel-peer`)  │
│    and keep tool access minimal.                                              │
│  - Keep secrets out of the agent’s reachable filesystem.                      │
│  - Use the strongest available model for any bot with tools or untrusted      │
│    inboxes.                                                                   │
│                                                                               │
│  Run regularly:                                                               │
│  openclaw security audit --deep                                               │
│  openclaw security audit --fix                                                │
│                                                                               │
│  Must read: https://docs.openclaw.ai/gateway/security                         │
│                                                                               │
├───────────────────────────────────────────────────────────────────────────────╯
│
◇  I understand this is personal-by-default and shared/multi-user use requires 
lock-down. Continue?
│  Yes
│
◇  Onboarding mode
│  QuickStart
│
◇  Existing config detected ──────────╮
│                                     │
│  workspace: ~/clawd                 │
│  model: openai-codex/gpt-5.3-codex  │
│  gateway.mode: local                │
│  gateway.port: 18789                │
│  gateway.bind: loopback             │
│  skills.nodeManager: npm            │
│                                     │
├─────────────────────────────────────╯
│
◇  Config handling
│  Update values
│
◇  QuickStart ─────────────────────────────╮
│                                          │
│  Keeping your current gateway settings:  │
│  Gateway port: 18789                     │
│  Gateway bind: Loopback (127.0.0.1)      │
│  Gateway auth: Token (default)           │
│  Tailscale exposure: Off                 │
│  Direct to chat channels.                │
│                                          │
├──────────────────────────────────────────╯
│
◇  Model/auth provider
│  OpenAI
│
◇  OpenAI auth method
│  OpenAI Codex (ChatGPT OAuth)
│
◇  OpenAI Codex OAuth ─────────────────────────────────────────────╮
│                                                                  │
│  Browser will open for OpenAI authentication.                    │
│  If the callback doesn't auto-complete, paste the redirect URL.  │
│  OpenAI OAuth uses localhost:1455 for the callback.              │
│                                                                  │
├──────────────────────────────────────────────────────────────────╯
│
Open: https://auth.openai.com/oauth/authorize?response_type=code&client_id=app_EMoamEEZ73f0CkXaXp7hrann&redirect_uri=http%3A%2F%2Flocalhost%3A1455%2Fauth%2Fcallback&scope=openid+profile+email+offline_access&code_challenge=LC7Ny3FS7X0gE4LcHjUop687LRuS4IeGN3mxbsFGYnQ&code_challenge_method=S256&state=1621769a5bdcf8df355ebc1b414a1382&id_token_add_organizations=true&codex_cli_simplified_flow=true&originator=pi
◇  OpenAI OAuth complete
│
◇  Default model
│  Keep current (openai-codex/gpt-5.3-codex)
│
◇  Channel status ────────────────────────────╮
│                                             │
│  Telegram: configured                       │
│  WhatsApp (default): linked                 │
│  Discord: needs token                       │
│  Slack: needs tokens                        │
│  Signal: needs setup                        │
│  signal-cli: missing (signal-cli)           │
│  iMessage: needs setup                      │
│  imsg: missing (imsg)                       │
│  IRC: not configured                        │
│  Google Chat: not configured                │
│  Feishu: install plugin to enable           │
│  Google Chat: install plugin to enable      │
│  Nostr: install plugin to enable            │
│  Microsoft Teams: install plugin to enable  │
│  Mattermost: install plugin to enable       │
│  Nextcloud Talk: install plugin to enable   │
│  Matrix: install plugin to enable           │
│  BlueBubbles: install plugin to enable      │
│  LINE: install plugin to enable             │
│  Zalo: install plugin to enable             │
│  Zalo Personal: install plugin to enable    │
│  Synology Chat: install plugin to enable    │
│  Tlon: install plugin to enable             │
│                                             │
├─────────────────────────────────────────────╯
│
◇  How channels work ───────────────────────────────────────────────────────────╮
│                                                                               │
│  DM security: default is pairing; unknown DMs get a pairing code.             │
│  Approve with: openclaw pairing approve <channel> <code>                      │
│  Public DMs require dmPolicy="open" + allowFrom=["*"].                        │
│  Multi-user DMs: run: openclaw config set session.dmScope "per-channel-peer"  │
│  (or "per-account-channel-peer" for multi-account channels) to isolate        │
│  sessions.                                                                    │
│  Docs: channels/pairing  │
│                                                                               │
│  Telegram: simplest way to get started — register a bot with @BotFather and   │
│  get going.                                                                   │
│  WhatsApp: works with your own number; recommend a separate phone + eSIM.     │
│  Discord: very well supported right now.                                      │
│  IRC: classic IRC networks with DM/channel routing and pairing controls.      │
│  Google Chat: Google Workspace Chat app with HTTP webhook.                    │
│  Slack: supported (Socket Mode).                                              │
│  Signal: signal-cli linked device; more setup (David Reagans: "Hop on         │
│  Discord.").                                                                  │
│  iMessage: this is still a work in progress.                                  │
│  Feishu: 飞书/Lark enterprise messaging with doc/wiki/drive tools.            │
│  Nostr: Decentralized protocol; encrypted DMs via NIP-04.                     │
│  Microsoft Teams: Bot Framework; enterprise support.                          │
│  Mattermost: self-hosted Slack-style chat; install the plugin to enable.      │
│  Nextcloud Talk: Self-hosted chat via Nextcloud Talk webhook bots.            │
│  Matrix: open protocol; install the plugin to enable.                         │
│  BlueBubbles: iMessage via the BlueBubbles mac app + REST API.                │
│  LINE: LINE Messaging API bot for Japan/Taiwan/Thailand markets.              │
│  Zalo: Vietnam-focused messaging platform with Bot API.                       │
│  Zalo Personal: Zalo personal account via QR code login.                      │
│  Synology Chat: Connect your Synology NAS Chat to OpenClaw with full agent    │
│  capabilities.                                                                │
│  Tlon: decentralized messaging on Urbit; install the plugin to enable.        │
│                                                                               │
├───────────────────────────────────────────────────────────────────────────────╯
│
◇  Select channel (QuickStart)
│  WhatsApp (QR link)
│
◇  WhatsApp already configured. What do you want to do?
│  Modify settings
│
◇  WhatsApp already linked. Re-link now?
│  No
│
◇  WhatsApp number ────────────────────────────────────────────────╮
│                                                                  │
│  We need the sender/owner number so OpenClaw can allowlist you.  │
│                                                                  │
├──────────────────────────────────────────────────────────────────╯
│
◇  Your personal WhatsApp number (the phone you will message from)
│  +61478604565
│
◇  WhatsApp allowlist ────────────────╮
│                                     │
│  Allowlist mode enabled.            │
│  - allowFrom includes +61478604565  │
│                                     │
├─────────────────────────────────────╯
│
◇  Selected channels ─────────────────────────────────────────────────────────╮
│                                                                             │
│  WhatsApp — works with your own number; recommend a separate phone + eSIM.  │
│  Docs: whatsapp       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────╯
Config overwrite: /Users/fengxiao/.openclaw/openclaw.json (sha256 6026b7861b29b9fa6d3878f96ff4ef18c192936c3c4932adfb025971d2259a2f -> 5c692d0eb24e1177da2c6c25ae1ca5810411d9949f7ff65f2ba0dc9ce51afd39, backup=/Users/fengxiao/.openclaw/openclaw.json.bak)
Updated ~/.openclaw/openclaw.json
Workspace OK: ~/clawd
Sessions OK: ~/.openclaw/agents/main/sessions
│
◇  Skills status ─────────────╮
│                             │
│  Eligible: 16               │
│  Missing requirements: 35   │
│  Unsupported on this OS: 0  │
│  Blocked by allowlist: 0    │
│                             │
├─────────────────────────────╯
│
◇  Configure skills now? (recommended)
│  Yes
│
◇  Install missing skill dependencies
│  📰 blogwatcher, 📊 model-usage, 🧿 oracle, 𝕏 xurl
│
◇  Preferred node manager for skill installs
│  pnpm
│
◇  Installed xurl
│
◇  Install failed: oracle (exit 1) — Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory sho…
ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory

Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
Tip: run `openclaw doctor` to review skills + requirements.
Docs: https://docs.openclaw.ai/skills
│
◇  Installed blogwatcher
│
◇  Installed model-usage
│
◇  Set GOOGLE_PLACES_API_KEY for goplaces?
│  No
│
◇  Set NOTION_API_KEY for notion?
│  No
│
◇  Set ELEVENLABS_API_KEY for sag?
│  No
│
◇  Hooks ──────────────────────────────────────────────────────────────────╮
│                                                                          │
│  Hooks let you automate actions when agent commands are issued.          │
│  Example: Save session context to memory when you issue /new or /reset.  │
│                                                                          │
│  Learn more: https://docs.openclaw.ai/automation/hooks                   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Enable hooks?
│  🚀 boot-md, 📎 bootstrap-extra-files, 📝 command-logger, 💾 
│  session-memory
│
◇  Hooks Configured ─────────────────────────────────────────────────╮
│                                                                    │
│  Enabled 4 hooks: boot-md, bootstrap-extra-files, command-logger,  │
│  session-memory                                                    │
│                                                                    │
│  You can manage hooks later with:                                  │
│    openclaw hooks list                                             │
│    openclaw hooks enable <name>                                    │
│    openclaw hooks disable <name>                                   │
│                                                                    │
├────────────────────────────────────────────────────────────────────╯
Config overwrite: /Users/fengxiao/.openclaw/openclaw.json (sha256 5c692d0eb24e1177da2c6c25ae1ca5810411d9949f7ff65f2ba0dc9ce51afd39 -> 4df8410ae6d541fca71bca63f41543d72e7d7c663b47cdc724578822a7babe1e, backup=/Users/fengxiao/.openclaw/openclaw.json.bak)
│
◇  Gateway service runtime ────────────────────────────────────────────╮
│                                                                      │
│  QuickStart uses Node for the Gateway service (stable + supported).  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯
│
◇  Gateway service already installed
│  Restart
│
◓  Restarting Gateway service…..Restarted LaunchAgent: gui/501/ai.openclaw.gateway
◇  Gateway service restarted.
│
◇  
Health check failed: gateway closed (1006 abnormal closure (no close frame)): no close reason
  Gateway target: ws://127.0.0.1:18789
  Source: local loopback
  Config: /Users/fengxiao/.openclaw/openclaw.json
  Bind: loopback
│
◇  Health check help ────────────────────────────────╮
│                                                    │
│  Docs:                                             │
│  https://docs.openclaw.ai/gateway/health           │
│  https://docs.openclaw.ai/gateway/troubleshooting  │
│                                                    │
├────────────────────────────────────────────────────╯
Control UI assets missing; building (ui:build, auto-installs UI deps)…
│
◇  Optional apps ────────────────────────╮
│                                        │
│  Add nodes for extra features:         │
│  - macOS app (system + notifications)  │
│  - iOS app (camera/canvas)             │
│  - Android app (camera/canvas)         │
│                                        │
├────────────────────────────────────────╯
│
◇  Control UI ─────────────────────────────────────────────────────────────────────╮
│                                                                                  │
│  Web UI: http://127.0.0.1:18789/                                                 │
│  Web UI (with token):                                                            │
│  http://127.0.0.1:18789/#token=010eae0ac0c7ec122eeb1630c0355bdadf41d5b4fa80eb10  │
│  Gateway WS: ws://127.0.0.1:18789                                                │
│  Gateway: not detected (gateway closed (1006 abnormal closure (no close          │
│  frame)): no close reason)                                                       │
│  Docs: https://docs.openclaw.ai/web/control-ui                                   │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────╯
│
◇  Workspace backup ────────────────────────────────────────╮
│                                                           │
│  Back up your agent workspace.                            │
│  Docs: https://docs.openclaw.ai/concepts/agent-workspace  │
│                                                           │
├───────────────────────────────────────────────────────────╯
│
◇  Security ──────────────────────────────────────────────────────╮
│                                                                 │
│  Running agents on your computer is risky — harden your setup:  │
│  https://docs.openclaw.ai/security                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────╯
│
◇  Shell completion ──────────────────────────────────────────────╮
│                                                                 │
│  Shell completion installed. Restart your shell or run: source  │
│  ~/.bash_profile                                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────╯
│
◇  Dashboard ready ────────────────────────────────────────────────────────────────╮
│                                                                                  │
│  Dashboard link (with token):                                                    │
│  http://127.0.0.1:18789/#token=010eae0ac0c7ec122eeb1630c0355bdadf41d5b4fa80eb10  │
│  Opened in your browser. Keep that tab to control OpenClaw.                      │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────╯
│
◇  Web search (optional) ───────────────────────────────────────────────────╮
│                                                                           │
│  If you want your agent to be able to search the web, you’ll need an API  │
│  key.                                                                     │
│                                                                           │
│  OpenClaw uses Brave Search for the `web_search` tool. Without a Brave    │
│  Search API key, web search won’t work.                                   │
│                                                                           │
│  Set it up interactively:                                                 │
│  - Run: openclaw configure --section web                                  │
│  - Enable web_search and paste your Brave Search API key                  │
│                                                                           │
│  Alternative: set BRAVE_API_KEY in the Gateway environment (no config     │
│  changes).                                                                │
│  Docs: https://docs.openclaw.ai/tools/web                                 │
│                                                                           │
├───────────────────────────────────────────────────────────────────────────╯
│
◇  What now ─────────────────────────────────────────────────────────────╮
│                                                                        │
│  What now: https://openclaw.ai/showcase ("What People Are Building").  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────╯
│
└  Onboarding complete. Dashboard opened; keep that tab to control OpenClaw.