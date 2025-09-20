check node and npm
install node and npm
check appium
if not install appium
verify appium is availabel on the system
run command appium to get information
install appium doctor
run command to see available drivers
install appium driver
run appium driver


👌 我来帮你把这些步骤 **细化成可直接在 macOS 终端里执行的命令**，并且每一步解释清楚作用。你照着从上到下执行，就能完成 Appium 环境的搭建与验证。

---

# 🔧 macOS 安装和检查 Appium 的步骤

### 1. **检查 Node.js 和 npm 是否已安装**

```bash
node -v
npm -v
```

- 如果两个命令都能输出版本号（如 `v18.x.x` / `9.x.x`），说明已经安装。
    
- 如果报错 `command not found`，需要安装 Node.js。
    

---

### 2. **安装 Node.js 和 npm（如果没有）**

推荐用 [Homebrew](https://brew.sh/) 安装（macOS 常用包管理工具）：

```bash
brew install node
```

安装完后再确认：

```bash
node -v
npm -v
```

---

### 3. **检查是否安装了 Appium**

```bash
appium -v
```

- 如果输出版本号（如 `2.x.x`），说明已安装。
    
- 如果提示 `command not found`，继续下一步安装。
    

---

### 4. **安装 Appium（如果没有）**

```bash
npm install -g appium
```

再验证：

```bash
appium -v
```

---

### 5. **验证 Appium 是否可用**

运行 Appium 命令：

```bash
appium
```

- 如果安装正常，会打印出 Appium 的欢迎信息、版本号、监听端口（默认 4723）。
    
- 按 `Ctrl + C` 停止服务。
    

---

### 6. **安装 Appium Doctor（检查环境依赖）**

```bash
npm install -g appium-doctor
```

运行检查：

```bash
appium-doctor
```

- 它会输出环境诊断信息（比如 ANDROID_HOME / JAVA_HOME / Xcode 等是否配置正确）。
    
- 确保所有必需项都是绿色 ✅。
    

---

### 7. **查看可用的驱动（drivers）**

```bash
appium driver list
```

- 输出会显示已安装和可安装的驱动，比如：
    
    - `uiautomator2` → Android
        
    - `xcuitest` → iOS
        
    - `mac2` → macOS
        
    - `mac2` → macOS
        
---

### 8. **安装需要的驱动**

示例：安装 Android 和 iOS 驱动

```bash
appium driver install uiautomator2
appium driver install xcuitest
```

再次确认：

```bash
appium driver list
```

---

### 9. **运行指定驱动（验证安装成功）**

Appium v2 的驱动需要单独运行：

- 启动 Android 驱动：
    

```bash
appium --use-driver=uiautomator2
```

- 启动 iOS 驱动：
    

```bash
appium --use-driver=xcuitest
```

如果能正常启动，就说明 Appium 和驱动都安装完成 🎉。

---

⚡ 总结一下执行顺序（最常用命令）：

```bash
node -v
npm -v
brew install node   # 如果没安装
appium -v
npm install -g appium
appium -v
appium
npm install -g appium-doctor
appium-doctor
appium driver list
appium driver install uiautomator2
appium --use-driver=uiautomator2
```

---

要不要我帮你写一个 **一键安装+检查的 shell 脚本**？这样你直接运行，就能自动完成 Node.js / Appium / Appium Doctor / Drivers 的安装和验证。


好的 👍 我来整理一下 **`appium` 命令常用的参数**，这些参数主要用在启动 Appium Server 的时候，控制监听地址、端口、日志、驱动等。

---

# 🔹 Appium 命令常用参数

运行方式：

```bash
appium [参数]
```

---

## 1. **通用参数**

|参数|示例|说明|
|---|---|---|
|`--port` 或 `-p`|`appium -p 4725`|指定 Appium Server 的端口号（默认 4723）。|
|`--address`|`appium --address 0.0.0.0`|指定监听的 IP 地址（默认 0.0.0.0，表示所有网卡）。|
|`--log` 或 `-l`|`appium -l ./appium.log`|把日志输出到指定文件。|
|`--log-level`|`appium --log-level debug`|设置日志级别（error, warn, info, debug, trace）。|
|`--use-plugins`|`appium --use-plugins=element-wait`|指定要启用的插件。|

---

## 2. **会话相关参数**

|参数|示例|说明|
|---|---|---|
|`--session-override`|`appium --session-override`|允许覆盖已有的 session（否则已有 session 时会报错）。|
|`--base-path`|`appium --base-path /wd/hub`|修改 WebDriver 的请求路径，默认是 `/`. 一些旧的客户端可能需要 `/wd/hub`。|

---

## 3. **安全/调试参数**

|参数|示例|说明|
|---|---|---|
|`--relaxed-security`|`appium --relaxed-security`|关闭安全限制，允许执行 `execute_script` 等敏感命令。|
|`--allow-cors`|`appium --allow-cors`|允许跨域请求，通常在前端工具或远程调用时需要。|
|`--log-timestamp`|`appium --log-timestamp`|日志里带上时间戳。|
|`--log-no-colors`|`appium --log-no-colors`|日志输出不带颜色（适合保存文件）。|

---

## 4. **Driver/Plugin 管理**

|参数|示例|说明|
|---|---|---|
|`appium driver list`||列出所有可用的 driver。|
|`appium driver install <driver-name>`|`appium driver install uiautomator2`|安装 driver（Android/iOS/Web 等）。|
|`appium driver run <driver-name>`|`appium driver run uiautomator2`|单独运行某个 driver。|
|`appium plugin list`||查看已安装的插件。|
|`appium plugin install`|`appium plugin install element-wait`|安装插件。|

---

## 5. **实用参数**

|参数|示例|说明|
|---|---|---|
|`--tmp`|`appium --tmp /tmp/appium`|指定 Appium 临时文件存放路径。|
|`--session-timeout`|`appium --session-timeout 300`|Session 超时时间（秒）。|
|`--allow-insecure`|`appium --allow-insecure chromedriver_autodownload`|开启某些不安全的功能（比如自动下载 ChromeDriver）。|
|`--deny-insecure`|`appium --deny-insecure some-feature`|禁用不安全的功能。|

---

# 🔹 常用启动示例

1. **启动默认服务（端口 4723）**
    

```bash
appium
```

2. **指定端口和 IP**
    

```bash
appium --address 127.0.0.1 --port 4725
```

3. **带日志文件和调试模式**
    

```bash
appium -p 4723 -l ./appium.log --log-level debug
```

4. **兼容旧的 `/wd/hub` 路径**
    

```bash
appium --base-path /wd/hub
```

5. **放宽安全限制 + 自动下载 ChromeDriver**
    

```bash
appium --relaxed-security --allow-insecure chromedriver_autodownload
```

---

要不要我帮你整理一份 **Mac + Windows 下 Appium 常用命令 + 参数清单表格**，做成一份 cheatsheet（速查表），方便你平时测试的时候快速查找？