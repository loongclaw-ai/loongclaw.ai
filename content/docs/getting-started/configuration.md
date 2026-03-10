---
title: "Configuration Guide"
description: "Detailed explanation of LoongClaw configuration files"
path: "/docs/configuration"
order: 2
---

# Configuration Guide

LoongClaw uses TOML format configuration files, defaulting to `~/.loongclaw/config.toml`.

## Configuration File Structure

```toml
# ═══════════════════════════════════════════════════════════════
# LoongClaw Configuration Template
# ═══════════════════════════════════════════════════════════════
# Security tip: Use *_env fields to reference environment variables,
# do not write secrets directly into the configuration

[provider]
# Provider type
kind = "openai"
model = "gpt-4o-mini"
api_key_env = "OPENAI_API_KEY"
temperature = 0.7
request_timeout_ms = 60000

[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."

[telegram]
enabled = false
bot_token_env = "TELEGRAM_BOT_TOKEN"

[feishu]
enabled = false

[tools]
shell_allowlist = ["echo", "cat", "ls", "pwd", "grep"]

[memory]
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12
```

## Provider Configuration

### Supported Providers

| Provider | kind Value | Default API Key Environment Variable |
|----------|------------|--------------------------------------|
| OpenAI | openai | OPENAI_API_KEY |
| Moonshot(Kimi) | kimi | MOONSHOT_API_KEY |
| DeepSeek | deepseek | DEEPSEEK_API_KEY |
| MiniMax | minimax | MINIMAX_API_KEY |
| Anthropic | anthropic | ANTHROPIC_API_KEY |
| Volcengine | volcengine | VOLCENGINE_API_KEY |
| Ollama | ollama | - |
| OpenRouter | openrouter | OPENROUTER_API_KEY |
| xAI | xai | XAI_API_KEY |
| Zhipu | zhipu | ZHIPU_API_KEY |
| Z.ai | zai | ZAI_API_KEY |

### Provider Parameters

```toml
[provider]
# Required: Provider type
kind = "openai"

# Required: Model name
model = "gpt-4o-mini"

# Optional: Write API Key directly (not recommended)
# api_key = "sk-..."

# Recommended: API Key environment variable name
api_key_env = "OPENAI_API_KEY"

# Optional: Custom base URL
# base_url = "https://api.openai.com"
# chat_completions_path = "/v1/chat/completions"

# Optional: Reasoning effort (supported by some providers)
# reasoning_effort = "medium"

# Request parameters
temperature = 0.7
# max_tokens = 4096
request_timeout_ms = 60000
retry_max_attempts = 3
retry_initial_backoff_ms = 500
retry_max_backoff_ms = 8000

# Custom request headers
[provider.headers]
# X-Custom-Header = "value"
```

## CLI Channel Configuration

```toml
[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."
exit_commands = ["exit", "quit", "/exit"]
```

## Telegram Channel Configuration

```toml
[telegram]
enabled = true
bot_token_env = "TELEGRAM_BOT_TOKEN"
base_url = "https://api.telegram.org"
polling_timeout_s = 30
allowed_chat_ids = []  # Optional: restrict specific chats
```

## Feishu Channel Configuration

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

## Tools Configuration

```toml
[tools]
# Shell command whitelist
shell_allowlist = ["echo", "cat", "ls", "pwd", "grep", "find", "head", "tail"]
# File operation root directory (defaults to current directory)
# file_root = "/home/user/projects"
```

## Memory Configuration

```toml
[memory]
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12  # Keep the last 12 conversation rounds
```

## Conversation Configuration

```toml
[conversation.turn_loop]
max_rounds = 4
max_tool_steps_per_round = 1
max_repeated_tool_call_rounds = 2
max_ping_pong_cycles = 2
max_same_tool_failure_rounds = 2
max_followup_tool_payload_chars = 8000
max_followup_tool_payload_chars_total = 32000
```

## Configuration Validation

```bash
# Validate configuration file
loongclawd validate-config --config ~/.loongclaw/config.toml

# JSON output format
loongclawd validate-config --json

# Problem JSON format (suitable for CI)
loongclawd validate-config --output problem-json --fail-on-diagnostics
```

## Environment Variable Overrides

You can override configuration at runtime using environment variables:

```bash
# Override SQLite path
LOONGCLAW_SQLITE_PATH=/custom/path/memory.db loongclawd chat

# Override sliding window size
LOONGCLAW_SLIDING_WINDOW=20 loongclawd chat

# Adjust WASM cache capacity
LOONGCLAW_WASM_CACHE_CAPACITY=64 loongclawd benchmark-wasm-cache
```
