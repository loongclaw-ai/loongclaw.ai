---
title: "通信渠道"
description: "配置 CLI、Telegram 和飞书通信渠道"
path: "/docs/connectivity/channels"
order: 5
---

# 通信渠道

LoongClaw 支持多种通信渠道，适用于不同使用场景。

## 概述

| 渠道 | 用途 | 设置难度 |
|------|------|----------|
| CLI | 本地开发、个人使用 | 简单 |
| Telegram | 远程访问、团队协作 | 中等 |
| 飞书/Lark | 企业集成 | 复杂 |

## CLI 渠道

CLI 渠道是默认的命令行界面，用于本地使用。

### 基本用法

```bash
# 启动交互式对话
loongclaw chat

# 命名会话
loongclaw chat --session my-project

# 单次提问
loongclaw ask --message "Python 是什么？"
```

### 配置

```toml
[cli]
enabled = true
system_prompt = "你是 LoongClaw，一个乐于助人的助手。"
exit_commands = ["exit", "quit", "q"]
```

### 自定义系统提示

```toml
[cli]
system_prompt = """
你是 LoongClaw，一个专业的编程助手。

你的优势：
- 精通 Rust、Python、JavaScript、Go
- 提供简洁、准确的代码示例
- 清晰解释技术概念
- 帮助调试和优化
"""
```

### 对话命令

| 命令 | 说明 |
|------|------|
| `/help` | 显示可用命令 |
| `/history` | 显示对话历史 |
| `/exit`、`/quit`、`/q` | 退出对话 |

## Telegram 渠道

启用 Telegram 机器人进行远程访问和通知。

### 设置步骤

1. **创建 Telegram 机器人**
   - 打开 Telegram 搜索 [@BotFather](https://t.me/botfather)
   - 发送 `/newbot` 并按指示操作
   - 复制机器人令牌

2. **配置环境变量**
   ```bash
   export TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
   ```

3. **配置 LoongClaw**
   ```toml
   [telegram]
   enabled = true
   bot_token_env = "TELEGRAM_BOT_TOKEN"
   ```

4. **启动服务**
   ```bash
   loongclaw telegram-serve
   ```

### 配置选项

```toml
[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"
base_url = "https://api.telegram.org"
polling_timeout_s = 30
allowed_chat_ids = []
```

| 选项 | 说明 |
|------|------|
| `enabled` | 启用/禁用 Telegram 渠道 |
| `bot_token_env` | 机器人令牌的环境变量 |
| `base_url` | Telegram API URL（用于代理） |
| `polling_timeout_s` | 长轮询超时 |
| `allowed_chat_ids` | 限制特定聊天 |

### 安全

**限制访问：**

```toml
[telegram]
allowed_chat_ids = [123456789, 987654321]
```

获取聊天 ID：
1. 与你的机器人开始对话
2. 访问：`https://api.telegram.org/bot<TOKEN>/getUpdates`
3. 在响应中查找 `chat.id`

**使用代理：**

```bash
HTTPS_PROXY=http://proxy.example.com:8080 loongclaw telegram-serve
```

### 命令

```bash
# 启动服务
loongclaw telegram-serve

# 测试单条消息
loongclaw telegram-serve --once

# 从 CLI 发送消息
loongclaw telegram-send --target 123456 --text "你好！"
```

### 多账户

```toml
[telegram]
enabled = true
default_account = "main"

[telegram.accounts.main]
bot_token_env = "TELEGRAM_BOT_TOKEN_MAIN"

[telegram.accounts.backup]
bot_token_env = "TELEGRAM_BOT_TOKEN_BACKUP"
```

## 飞书/Lark 渠道

启用飞书或 Lark 集成用于企业环境。

### 前提条件

1. 飞书/Lark 企业账号
2. 创建应用的管理员权限
3. 公网服务器用于 Webhook（或隧道）

### 设置步骤

1. **创建应用**
   - 登录 [飞书开放平台](https://open.feishu.cn)（或 [Lark](https://open.larksuite.com)）
   - 创建自建应用
   - 记录 App ID 和 App Secret

2. **配置权限**
   添加这些权限：
   - `im:message:send` - 发送消息
   - `im:message:receive` - 接收消息
   - `im:chat:readonly` - 读取聊天信息

3. **配置事件**
   - 启用"接收消息"事件
   - 设置 Webhook URL：`https://your-server:3000/webhook/feishu`
   - 记录 Verification Token 和 Encrypt Key

4. **设置环境变量**
   ```bash
   export FEISHU_APP_ID="cli_xxxxxx"
   export FEISHU_APP_SECRET="your-secret"
   export FEISHU_VERIFICATION_TOKEN="your-token"
   export FEISHU_ENCRYPT_KEY="your-key"
   ```

5. **配置 LoongClaw**
   ```toml
   [feishu]
   enabled = true
   domain = "feishu"  # 或 "lark"
   app_id_env = "FEISHU_APP_ID"
   app_secret_env = "FEISHU_APP_SECRET"
   verification_token_env = "FEISHU_VERIFICATION_TOKEN"
   encrypt_key_env = "FEISHU_ENCRYPT_KEY"
   ```

6. **启动服务**
   ```bash
   loongclaw feishu-serve --bind 0.0.0.0:3000
   ```

### 配置选项

```toml
[feishu]
enabled = true
domain = "feishu"                    # "feishu" 或 "lark"
app_id_env = "FEISHU_APP_ID"
app_secret_env = "FEISHU_APP_SECRET"
verification_token_env = "FEISHU_VERIFICATION_TOKEN"
encrypt_key_env = "FEISHU_ENCRYPT_KEY"
base_url = "https://open.feishu.cn"
webhook_bind = "0.0.0.0:3000"
webhook_path = "/webhook/feishu"
receive_id_type = "chat_id"
allowed_chat_ids = []
ignore_bot_messages = true
```

### 飞书子命令

```bash
# 启动 Webhook 服务器
loongclaw feishu-serve

# 发送消息
loongclaw feishu-send --receive-id "oc_xxx" --text "你好！"

# OAuth 管理
loongclaw feishu auth start
loongclaw feishu auth list
loongclaw feishu whoami

# 文档操作
loongclaw feishu doc create --title "我的文档"
loongclaw feishu doc append --url "..." --content "更多内容"

# 消息操作
loongclaw feishu messages history --container-id "oc_xxx"
loongclaw feishu search messages --query "你好"

# 日历
loongclaw feishu calendar list
```

### Lark 配置

对于 Lark（国际版）：

```toml
[feishu]
enabled = true
domain = "lark"
base_url = "https://open.larksuite.com"
```

## 运行多个渠道

同时启用和运行多个渠道：

```toml
[cli]
enabled = true

[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"

[feishu]
enabled = true
app_id_env = "FEISHU_APP_ID"
```

在不同终端运行服务：

```bash
# 终端 1：CLI
loongclaw chat

# 终端 2：Telegram
loongclaw telegram-serve

# 终端 3：飞书
loongclaw feishu-serve
```

或使用 systemd 或 supervisor 等进程管理器。

## ACP 集成

为渠道启用 Agent Control Plane 高级功能：

```toml
[telegram.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"

[feishu.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"
```

## 故障排除

### Telegram 无响应

1. 检查机器人令牌：`echo $TELEGRAM_BOT_TOKEN`
2. 验证网络：`curl https://api.telegram.org/bot<TOKEN>/getMe`
3. 检查日志：`RUST_LOG=debug loongclaw telegram-serve`

### 飞书 Webhook 不工作

1. 检查端口：`lsof -i :3000`
2. 验证隧道（如果使用）
3. 检查防火墙规则
4. 验证令牌：`loongclaw feishu whoami`

### 消息发送失败

1. 检查 allowed_chat_ids 配置
2. 验证 API 凭证
3. 运行诊断：`loongclaw doctor`