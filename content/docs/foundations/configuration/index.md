---
title: "Configuration"
description: "Complete configuration reference for LoongClaw"
path: "/docs/foundations/configuration"
order: 2
---

# Configuration

LoongClaw uses TOML format configuration files with environment variable support for secrets.

## Configuration File

**Default location:** `~/.loongclaw/config.toml`

**Custom location:** Use `--config` flag with any command:

```bash
loongclaw chat --config /path/to/config.toml
```

## Quick Configuration

```toml
# ═══════════════════════════════════════════════════════════════
# LoongClaw Configuration Template
# ═══════════════════════════════════════════════════════════════

[provider]
kind = "openai"
model = "gpt-4o-mini"
api_key_env = "OPENAI_API_KEY"

[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."

[telegram]
enabled = false

[feishu]
enabled = false

[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "git"]

[memory]
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12
```

## Configuration Sections

### [Provider](/docs/connectivity/providers)
Configure LLM providers like OpenAI, Anthropic, DeepSeek, and 30+ others.

### [Channels](/docs/connectivity/channels)
Set up CLI, Telegram, and Feishu communication channels.

### [Tools](/docs/runtime/tools)
Configure shell execution, file operations, browser automation, and web fetching.

### [Memory & Sessions](/docs/runtime/memory)
Session management, conversation history, and memory settings.

## Environment Variables

### Provider Credentials

| Variable | Provider |
|----------|----------|
| `OPENAI_API_KEY` | OpenAI |
| `ANTHROPIC_API_KEY` | Anthropic |
| `DEEPSEEK_API_KEY` | DeepSeek |
| `MOONSHOT_API_KEY` | Kimi/Moonshot |
| `GEMINI_API_KEY` | Google Gemini |

### Channel Credentials

| Variable | Purpose |
|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `FEISHU_APP_ID` | Feishu application ID |
| `FEISHU_APP_SECRET` | Feishu application secret |

## Configuration Validation

```bash
# Validate configuration
loongclaw validate-config

# JSON output
loongclaw validate-config --json
```

## Files Location

| Path | Purpose |
|------|---------|
| `~/.loongclaw/config.toml` | Main configuration file |
| `~/.loongclaw/memory.sqlite3` | Conversation memory database |
| `~/.loongclaw/audit/` | Audit logs directory |

## Security Best Practices

### 1. Use Environment Variables for Secrets

```toml
# ✅ Recommended
api_key_env = "OPENAI_API_KEY"

# ❌ Not recommended
api_key = "sk-your-key-here"
```

### 2. Restrict Tool Permissions

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "git"]
file_root = "/home/user/safe-directory"
```

### 3. Set Appropriate Permissions

```bash
chmod 600 ~/.loongclaw/config.toml
```