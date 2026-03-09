---
title: "Channels"
description: "Configure CLI, Telegram, and Feishu communication channels"
path: "/docs/connectivity/channels"
order: 5
---

# Channels

LoongClaw supports multiple communication channels for different use cases.

## Overview

| Channel | Use Case | Setup Difficulty |
|---------|----------|------------------|
| CLI | Local development, personal use | Simple |
| Telegram | Remote access, team collaboration | Medium |
| Feishu/Lark | Enterprise integration | Complex |

## CLI Channel

The CLI channel is the default command-line interface for local use.

### Basic Usage

```bash
# Start interactive chat
loongclaw chat

# Named session
loongclaw chat --session my-project

# One-shot question
loongclaw ask --message "What is Python?"
```

### Configuration

```toml
[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."
exit_commands = ["exit", "quit", "q"]
```

### Custom System Prompt

```toml
[cli]
system_prompt = """
You are LoongClaw, a professional coding assistant.

Your strengths:
- Proficient in Rust, Python, JavaScript, Go
- Provide concise, accurate code examples
- Explain technical concepts clearly
- Help with debugging and optimization
"""
```

### Chat Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/history` | Show conversation history |
| `/exit`, `/quit`, `/q` | Exit the chat |

## Telegram Channel

Enable Telegram bot for remote access and notifications.

### Setup Steps

1. **Create a Telegram Bot**
   - Open Telegram and search for [@BotFather](https://t.me/botfather)
   - Send `/newbot` and follow the instructions
   - Copy the bot token

2. **Configure Environment**
   ```bash
   export TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
   ```

3. **Configure LoongClaw**
   ```toml
   [telegram]
   enabled = true
   bot_token_env = "TELEGRAM_BOT_TOKEN"
   ```

4. **Start the Service**
   ```bash
   loongclaw telegram-serve
   ```

### Configuration Options

```toml
[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"
base_url = "https://api.telegram.org"
polling_timeout_s = 30
allowed_chat_ids = []
```

| Option | Description |
|--------|-------------|
| `enabled` | Enable/disable Telegram channel |
| `bot_token_env` | Environment variable for bot token |
| `base_url` | Telegram API URL (for proxies) |
| `polling_timeout_s` | Long polling timeout |
| `allowed_chat_ids` | Restrict to specific chats |

### Security

**Restrict Access:**

```toml
[telegram]
allowed_chat_ids = [123456789, 987654321]
```

To find your chat ID:
1. Start a chat with your bot
2. Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Look for `chat.id` in the response

**Use Proxy:**

```bash
HTTPS_PROXY=http://proxy.example.com:8080 loongclaw telegram-serve
```

### Commands

```bash
# Start service
loongclaw telegram-serve

# Test single message
loongclaw telegram-serve --once

# Send message from CLI
loongclaw telegram-send --target 123456 --text "Hello!"
```

### Multiple Accounts

```toml
[telegram]
enabled = true
default_account = "main"

[telegram.accounts.main]
bot_token_env = "TELEGRAM_BOT_TOKEN_MAIN"

[telegram.accounts.backup]
bot_token_env = "TELEGRAM_BOT_TOKEN_BACKUP"
```

## Feishu/Lark Channel

Enable Feishu or Lark integration for enterprise environments.

### Prerequisites

1. Feishu/Lark enterprise account
2. Admin access to create applications
3. Public server for webhook (or tunnel)

### Setup Steps

1. **Create Application**
   - Log in to [Feishu Open Platform](https://open.feishu.cn) (or [Lark](https://open.larksuite.com))
   - Create a self-built application
   - Record App ID and App Secret

2. **Configure Permissions**
   Add these permissions:
   - `im:message:send` - Send messages
   - `im:message:receive` - Receive messages
   - `im:chat:readonly` - Read chat info

3. **Configure Events**
   - Enable "Receive Messages" event
   - Set webhook URL: `https://your-server:3000/webhook/feishu`
   - Record Verification Token and Encrypt Key

4. **Set Environment Variables**
   ```bash
   export FEISHU_APP_ID="cli_xxxxxx"
   export FEISHU_APP_SECRET="your-secret"
   export FEISHU_VERIFICATION_TOKEN="your-token"
   export FEISHU_ENCRYPT_KEY="your-key"
   ```

5. **Configure LoongClaw**
   ```toml
   [feishu]
   enabled = true
   domain = "feishu"  # or "lark"
   app_id_env = "FEISHU_APP_ID"
   app_secret_env = "FEISHU_APP_SECRET"
   verification_token_env = "FEISHU_VERIFICATION_TOKEN"
   encrypt_key_env = "FEISHU_ENCRYPT_KEY"
   ```

6. **Start Service**
   ```bash
   loongclaw feishu-serve --bind 0.0.0.0:3000
   ```

### Configuration Options

```toml
[feishu]
enabled = true
domain = "feishu"                    # "feishu" or "lark"
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

### Feishu Subcommands

```bash
# Start webhook server
loongclaw feishu-serve

# Send message
loongclaw feishu-send --receive-id "oc_xxx" --text "Hello!"

# OAuth management
loongclaw feishu auth start
loongclaw feishu auth list
loongclaw feishu whoami

# Document operations
loongclaw feishu doc create --title "My Doc"
loongclaw feishu doc append --url "..." --content "More text"

# Message operations
loongclaw feishu messages history --container-id "oc_xxx"
loongclaw feishu search messages --query "hello"

# Calendar
loongclaw feishu calendar list
```

### Lark Configuration

For Lark (international version):

```toml
[feishu]
enabled = true
domain = "lark"
base_url = "https://open.larksuite.com"
```

## Running Multiple Channels

Enable and run multiple channels simultaneously:

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

Run services in separate terminals:

```bash
# Terminal 1: CLI
loongclaw chat

# Terminal 2: Telegram
loongclaw telegram-serve

# Terminal 3: Feishu
loongclaw feishu-serve
```

Or use a process manager like systemd or supervisor.

## ACP Integration

Enable Agent Control Plane for advanced features:

```toml
[telegram.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"

[feishu.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"
```

## Troubleshooting

### Telegram Not Responding

1. Check bot token: `echo $TELEGRAM_BOT_TOKEN`
2. Verify network: `curl https://api.telegram.org/bot<TOKEN>/getMe`
3. Check logs: `RUST_LOG=debug loongclaw telegram-serve`

### Feishu Webhook Not Working

1. Check port: `lsof -i :3000`
2. Verify tunnel (if using)
3. Check firewall rules
4. Validate tokens: `loongclaw feishu whoami`

### Messages Not Sending

1. Check allowed_chat_ids configuration
2. Verify API credentials
3. Run diagnostics: `loongclaw doctor`