---
title: "Channel Integration"
description: "Configuration and usage of CLI, Telegram, Feishu, and other channels"
path: "/docs/channels"
order: 6
---

# Channel Integration

LoongClaw supports multiple communication channels, including CLI, Telegram, and Feishu.

## Supported Channels

| Channel | Description | Use Case |
|---------|-------------|----------|
| CLI | Command-line interactive interface | Local development, debugging |
| Telegram | Telegram Bot | Remote access, team collaboration |
| Feishu | Feishu application | Enterprise environment, office integration |

## CLI Channel

The CLI channel is the default enabled interactive command-line interface.

### Configuration

```toml
[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."
exit_commands = ["exit", "quit", "/exit"]
```

### Parameter Description

| Parameter | Type | Description |
|-----------|------|-------------|
| `enabled` | boolean | Whether to enable CLI channel |
| `system_prompt` | string | System prompt defining the AI assistant's role |
| `exit_commands` | array | List of commands to exit chat |

### Usage

```bash
# Start CLI chat
loongclawd chat

# Use specific configuration
loongclawd chat --config /path/to/config.toml

# Specify session ID
loongclawd chat --session my-session
```

### Custom System Prompt

```toml
[cli]
system_prompt = """
You are LoongClaw, a professional coding assistant.
- Proficient in Rust, Python, JavaScript, and other programming languages
- Provide concise, accurate code examples
- Use clear language when explaining technical concepts
"""
```

## Telegram Channel

Interact with LoongClaw through Telegram Bot API.

### Prerequisites

1. Have a Telegram account
2. Create a Telegram Bot (via @BotFather)
3. Obtain the Bot Token

### Configuration

```toml
[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"
base_url = "https://api.telegram.org"
polling_timeout_s = 30
allowed_chat_ids = []  # Optional: restrict specific chats
```

### Parameter Description

| Parameter | Type | Description |
|-----------|------|-------------|
| `enabled` | boolean | Whether to enable Telegram channel |
| `bot_token` | string | Bot Token (not recommended to write directly) |
| `bot_token_env` | string | Bot Token environment variable name (recommended) |
| `base_url` | string | Telegram API base URL |
| `polling_timeout_s` | number | Polling timeout in seconds |
| `allowed_chat_ids` | array | List of allowed chat IDs (empty means allow all) |

### Start Service

```bash
# Set environment variable
export TELEGRAM_BOT_TOKEN="your-bot-token-here"

# Start Telegram service
loongclawd telegram-serve

# Single poll mode (for testing)
loongclawd telegram-serve --once
```

### Security Recommendations

1. **Store Token in Environment Variables**
   
   ```bash
   # ✅ Recommended
   export TELEGRAM_BOT_TOKEN="your-token"
   
   # ❌ Not recommended
   # Write bot_token = "your-token" directly in config.toml
   ```

2. **Restrict Allowed Chat IDs**
   
   ```toml
   [telegram]
   allowed_chat_ids = [123456789, 987654321]
   ```

3. **Use HTTPS Proxy (Optional)**
   
   ```bash
   HTTPS_PROXY=http://proxy.example.com:8080 loongclawd telegram-serve
   ```

### Usage Workflow

1. Create Bot (via @BotFather)
2. Obtain Bot Token
3. Configure `TELEGRAM_BOT_TOKEN` environment variable
4. Enable Telegram channel in `config.toml`
5. Run `loongclawd telegram-serve`
6. Search for your Bot in Telegram and start chatting

## Feishu Channel

Integrate with enterprise Feishu applications.

### Prerequisites

1. Have a Feishu enterprise account
2. Create a Feishu application
3. Obtain application credentials

### Configuration

```toml
[feishu]
enabled = true
base_url = "https://open.feishu.cn"
webhook_bind = "0.0.0.0:3000"
webhook_path = "/webhook/feishu"
receive_id_type = "chat_id"
ignore_bot_messages = true
allowed_chat_ids = []
app_id_env = "FEISHU_APP_ID"
app_secret_env = "FEISHU_APP_SECRET"
verification_token_env = "FEISHU_VERIFICATION_TOKEN"
encrypt_key_env = "FEISHU_ENCRYPT_KEY"
```

### Parameter Description

| Parameter | Type | Description |
|-----------|------|-------------|
| `enabled` | boolean | Whether to enable Feishu channel |
| `base_url` | string | Feishu Open Platform API address |
| `webhook_bind` | string | Webhook service binding address |
| `webhook_path` | string | Webhook path |
| `receive_id_type` | string | Receive ID type (chat_id/open_id/union_id/user_id) |
| `ignore_bot_messages` | boolean | Whether to ignore messages from other bots |
| `allowed_chat_ids` | array | List of allowed chat IDs |
| `app_id_env` | string | App ID environment variable name |
| `app_secret_env` | string | App Secret environment variable name |
| `verification_token_env` | string | Verification Token environment variable name |
| `encrypt_key_env` | string | Encrypt Key environment variable name |

### Environment Variable Setup

```bash
export FEISHU_APP_ID="cli_xxxxxx"
export FEISHU_APP_SECRET="xxxxxx"
export FEISHU_VERIFICATION_TOKEN="xxxxxx"
export FEISHU_ENCRYPT_KEY="xxxxxx"  # Optional, required when encryption is enabled
```

### Start Service

```bash
# Start with default configuration
loongclawd feishu-serve

# Custom binding address and path
loongclawd feishu-serve --bind "0.0.0.0:8080" --path "/custom/webhook"
```

### Send Messages

```bash
# Send plain text message
loongclawd feishu-send --receive-id "oc_xxxxxx" --text "Hello from LoongClaw"

# Send card message
loongclawd feishu-send \
  --receive-id "oc_xxxxxx" \
  --text '{"title": "System Status", "content": "All services running normally"}' \
  --card
```

### Feishu Application Configuration Steps

1. **Create Application**
   - Log in to Feishu Open Platform
   - Create an enterprise self-built application
   - Record App ID and App Secret

2. **Configure Permissions**
   - Add required permissions:
     - `im:message:send`
     - `im:message:receive`
     - `im:chat:readonly`

3. **Configure Event Subscription**
   - Enable "Receive Messages" event
   - Set request URL: `http://your-server:3000/webhook/feishu`
   - Record Verification Token and Encrypt Key

4. **Publish Application**
   - Create version and submit for review
   - Add application to target groups

### Security Recommendations

1. **Use HTTPS**
   
   Production environments should use HTTPS reverse proxy:
   
   ```
   [Nginx] --https--> [loongclawd feishu-serve]
   ```

2. **Verify Token**
   
   Be sure to configure `verification_token_env` to verify the authenticity of Feishu requests.

3. **Encrypt Communication**
   
   It is recommended to enable Encrypt Key to ensure encrypted transmission of message content.

## Running Multiple Channels Simultaneously

LoongClaw supports enabling multiple channels at the same time:

```toml
[cli]
enabled = true

[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"

[feishu]
enabled = false  # Temporarily disabled
```

### Channel Selection Logic

1. **CLI Channel**: User actively runs `loongclawd chat`
2. **Telegram Channel**: Start `loongclawd telegram-serve`
3. **Feishu Channel**: Start `loongclawd feishu-serve`

Each channel runs independently, sharing the same configuration and memory database.

## Channel Comparison

| Feature | CLI | Telegram | Feishu |
|---------|-----|----------|--------|
| Installation Difficulty | Simple | Medium | Complex |
| Network Requirements | Local | Internet | Internet |
| Use Case | Personal development | Personal/Small team | Enterprise |
| Message Format | Plain text | Supports Markdown | Supports rich text cards |
| Group Support | No | Yes | Yes |
| Message History | SQLite | SQLite | SQLite |
| Security | High | Medium | High |

## Troubleshooting

### Telegram Connection Failed

```
error: failed to connect to Telegram API
```

**Possible Causes**:
1. Network connection issues
2. Invalid Bot Token
3. Proxy configuration issues

**Solution**:
```bash
# Check network
curl https://api.telegram.org/bot<token>/getMe

# Check environment variable
echo $TELEGRAM_BOT_TOKEN

# Use proxy
HTTPS_PROXY=http://proxy:8080 loongclawd telegram-serve
```

### Feishu Webhook Inaccessible

```
error: webhook server failed to bind
```

**Possible Causes**:
1. Port already in use
2. Firewall restrictions
3. Insufficient permissions

**Solution**:
```bash
# Check port usage
lsof -i :3000

# Use another port
loongclawd feishu-serve --bind "0.0.0.0:8080"
```

### Messages Not Responding

**Checklist**:
1. Is the channel enabled?
2. Are environment variables set correctly?
3. Is the API Key valid?
4. Are you in the allowed chat IDs list?

### Debug Mode

Enable verbose logging to troubleshoot issues:

```bash
RUST_LOG=debug loongclawd telegram-serve
RUST_LOG=debug loongclawd feishu-serve
```

## Best Practices

### 1. Environment Separation

Use different configuration files for different environments:

```bash
# Development environment
loongclawd chat --config ~/.loongclaw/config.dev.toml

# Production environment
loongclawd telegram-serve --config ~/.loongclaw/config.prod.toml
```

### 2. Session Isolation

Different channels use different session IDs:

```toml
[memory]
# CLI and Telegram use different session prefixes
# Actual session ID format: {channel}:{session}
# For example: cli:default, telegram:default
```

### 3. Monitoring and Logging

```bash
# Use systemd to manage services
sudo systemctl enable loongclaw-telegram
sudo systemctl start loongclaw-telegram

# View logs
sudo journalctl -u loongclaw-telegram -f
```

### 4. Backup Configuration

```bash
# Backup configuration files and environment variables
cp ~/.loongclaw/config.toml ~/.loongclaw/config.toml.backup
env | grep -E "^(TELEGRAM|FEISHU|OPENAI)" > ~/.loongclaw/env.backup
```
