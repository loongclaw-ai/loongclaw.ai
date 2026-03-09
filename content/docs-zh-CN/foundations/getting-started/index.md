---
title: "快速入门"
description: "几分钟内安装、配置并运行 LoongClaw"
path: "/docs/foundations/getting-started"
order: 1
---

# 快速入门

本指南帮助你快速安装、配置并开始使用 LoongClaw。

## 概述

LoongClaw 提供多种入门方式：

1. **引导式入门**（推荐）- 交互式设置向导
2. **手动安装** - 从源码构建
3. **迁移** - 从现有 AI 助手配置导入

## 系统要求

安装 LoongClaw 前，请确保你有：

- **操作系统**: Linux、macOS 或 Windows
- **Rust 工具链**（源码构建需要）: Rust 1.75+
- **API 密钥**: 你选择的 LLM 提供商的 API 密钥

## 安装方式

### 方式一：安装脚本（推荐）

安装脚本会从 GitHub Releases 下载匹配的二进制文件，验证 SHA256 校验和，并启动引导式入门。

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/loongclaw-ai/loongclaw/main/scripts/install.sh | bash -s -- --onboard
```

**Windows (PowerShell):**

```powershell
$script = Join-Path $env:TEMP "loongclaw-install.ps1"
Invoke-WebRequest https://raw.githubusercontent.com/loongclaw-ai/loongclaw/main/scripts/install.ps1 -OutFile $script
pwsh $script -Onboard
```

### 方式二：从源码构建

```bash
# 克隆仓库
git clone https://github.com/loongclaw-ai/loongclaw.git
cd loongclaw

# 带引导安装
bash scripts/install.sh --source --onboard

# 或手动构建
cargo install --path crates/daemon
```

### 方式三：Cargo 安装

```bash
cargo install --git https://github.com/loongclaw-ai/loongclaw loongclaw-daemon
```

## 验证安装

安装后，验证 LoongClaw 是否正常工作：

```bash
# 检查版本
loongclaw --version

# 显示帮助
loongclaw --help

# 列出可用命令
loongclaw --help | grep -E "^    [a-z]"
```

## 引导式入门

LoongClaw 提供交互式入门向导帮助你快速开始：

```bash
loongclaw onboard
```

入门向导将：

1. **检测现有配置** - 查找现有 AI 助手配置
2. **选择模型提供商** - 从支持的 LLM 提供商中选择
3. **配置凭证** - 安全设置 API 密钥
4. **生成配置** - 创建配置文件

### 入门选项

| 选项 | 说明 |
|------|------|
| `--non-interactive` | 跳过交互式提示 |
| `--provider <名称>` | 预选提供商（openai、anthropic、kimi 等） |
| `--model <名称>` | 预选模型 |
| `--force` | 覆盖现有配置 |
| `--skip-model-probe` | 跳过模型探测 |

### 示例：非交互式设置

```bash
# 设置 API 密钥环境变量
export OPENAI_API_KEY="sk-your-key-here"

# 非交互式运行入门
loongclaw onboard --provider openai --model gpt-4o --non-interactive
```

## 设置 API 凭证

LoongClaw 使用环境变量存储 API 凭证（推荐方式）：

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# DeepSeek
export DEEPSEEK_API_KEY="sk-..."

# Kimi (Moonshot)
export MOONSHOT_API_KEY="your-kimi-key"

# Gemini
export GEMINI_API_KEY="your-gemini-key"
```

### 为什么使用环境变量？

- **安全性**: 凭证不会出现在配置文件中
- **灵活性**: 方便在不同环境间切换
- **CI/CD**: 与部署流水线无缝集成

## 第一次对话

设置完成后，开始你的第一次对话：

```bash
# 启动交互式对话
loongclaw chat

# 或使用单次提问
loongclaw ask --message "你好，你能帮我做什么？"
```

### 对话命令

在对话会话中，可以使用以下命令：

| 命令 | 说明 |
|------|------|
| `/help` | 显示可用命令 |
| `/history` | 显示对话历史 |
| `/exit` 或 `/quit` | 退出对话 |

## 健康检查

运行诊断命令验证配置：

```bash
# 运行诊断
loongclaw doctor

# 自动修复问题
loongclaw doctor --fix

# JSON 输出
loongclaw doctor --json
```

## 配置文件位置

LoongClaw 配置存储在：

| 项目 | 默认位置 |
|------|----------|
| 配置文件 | `~/.loongclaw/config.toml` |
| 记忆数据库 | `~/.loongclaw/memory.sqlite3` |
| 审计日志 | `~/.loongclaw/audit/` |

### 使用自定义配置路径

```bash
# 指定自定义配置文件
loongclaw chat --config /path/to/config.toml

# 验证配置
loongclaw validate-config --config /path/to/config.toml
```

## 从其他工具迁移

如果你从其他 AI 助手迁移：

```bash
# 发现迁移候选
loongclaw import --preview

# 从检测的源导入
loongclaw import --from existing --apply
```

## 下一步

- **[快速开始](/docs/foundations/getting-started/quick-start)** - 运行你的第一个 AI 任务
- **[配置](/docs/foundations/configuration)** - 了解所有配置选项
- **[模型提供商](/docs/connectivity/providers)** - 配置你喜欢的 LLM 提供商
- **[工具系统](/docs/runtime/tools)** - 启用和配置内置工具

## 常见问题

### 安装失败

1. 检查网络连接
2. 确认对安装目录有写入权限
3. 尝试使用 `--source` 选项从源码构建

### API 密钥未识别

1. 验证环境变量已设置: `echo $OPENAI_API_KEY`
2. 检查变量名是否与提供商匹配
3. 确认密钥有效且未过期

### 配置未找到

运行 `loongclaw onboard` 生成配置文件，或手动创建：

```bash
loongclaw onboard --force
```

## 获取帮助

- 使用 `loongclaw --help` 获取 CLI 帮助
- 使用 `loongclaw doctor` 进行诊断
- 访问 [GitHub Issues](https://github.com/loongclaw-ai/loongclaw/issues) 报告问题
- 加入 [Telegram](https://t.me/loongclaw) 获取社区支持