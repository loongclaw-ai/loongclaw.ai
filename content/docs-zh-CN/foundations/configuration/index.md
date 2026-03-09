---
title: "配置"
description: "LoongClaw 完整配置参考"
path: "/docs/foundations/configuration"
order: 2
---

# 配置

LoongClaw 使用 TOML 格式的配置文件，支持通过环境变量存储敏感信息。

## 配置文件

**默认位置：** `~/.loongclaw/config.toml`

**自定义位置：** 使用 `--config` 标志：

```bash
loongclaw chat --config /path/to/config.toml
```

## 快速配置

```toml
# ═══════════════════════════════════════════════════════════════
# LoongClaw 配置模板
# ═══════════════════════════════════════════════════════════════

[provider]
kind = "openai"
model = "gpt-4o-mini"
api_key_env = "OPENAI_API_KEY"

[cli]
enabled = true
system_prompt = "你是 LoongClaw，一个乐于助人的助手。"

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

## 配置章节

### [提供商](/docs/connectivity/providers)
配置 OpenAI、Anthropic、DeepSeek 等 30+ LLM 提供商。

### [通信渠道](/docs/connectivity/channels)
设置 CLI、Telegram 和飞书通信渠道。

### [工具系统](/docs/runtime/tools)
配置 Shell 执行、文件操作、浏览器自动化和网页抓取。

### [会话与记忆](/docs/runtime/memory)
会话管理、对话历史和记忆设置。

## 环境变量

### 提供商凭证

| 变量 | 提供商 |
|------|--------|
| `OPENAI_API_KEY` | OpenAI |
| `ANTHROPIC_API_KEY` | Anthropic |
| `DEEPSEEK_API_KEY` | DeepSeek |
| `MOONSHOT_API_KEY` | Kimi/Moonshot |
| `GEMINI_API_KEY` | Google Gemini |

### 渠道凭证

| 变量 | 用途 |
|------|------|
| `TELEGRAM_BOT_TOKEN` | Telegram 机器人令牌 |
| `FEISHU_APP_ID` | 飞书应用 ID |
| `FEISHU_APP_SECRET` | 飞书应用密钥 |

## 配置验证

```bash
# 验证配置
loongclaw validate-config

# JSON 输出
loongclaw validate-config --json
```

## 文件位置

| 路径 | 用途 |
|------|------|
| `~/.loongclaw/config.toml` | 主配置文件 |
| `~/.loongclaw/memory.sqlite3` | 对话记忆数据库 |
| `~/.loongclaw/audit/` | 审计日志目录 |

## 安全最佳实践

### 1. 使用环境变量存储敏感信息

```toml
# ✅ 推荐
api_key_env = "OPENAI_API_KEY"

# ❌ 不推荐
api_key = "sk-your-key-here"
```

### 2. 限制工具权限

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "git"]
file_root = "/home/user/safe-directory"
```

### 3. 设置适当的文件权限

```bash
chmod 600 ~/.loongclaw/config.toml
```