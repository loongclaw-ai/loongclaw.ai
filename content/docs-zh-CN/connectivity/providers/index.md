---
title: "模型提供商"
description: "配置和使用 LLM 模型提供商指南"
path: "/docs/connectivity/providers"
order: 4
---

# 模型提供商

LoongClaw 支持 30+ LLM 提供商，配置方式统一。

## 快速设置

```bash
# 设置 API 密钥
export OPENAI_API_KEY="sk-your-key-here"

# 运行入门
loongclaw onboard --provider openai --non-interactive
```

## 支持的提供商

### OpenAI

```toml
[provider]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
```

**环境变量：** `OPENAI_API_KEY`

**热门模型：**
- `gpt-4o` - 最新旗舰模型
- `gpt-4o-mini` - 快速且经济
- `gpt-4-turbo` - 改进的 GPT-4
- `o1-preview` - 推理模型
- `o1-mini` - 快速推理模型

### Anthropic

```toml
[provider]
kind = "anthropic"
model = "claude-3-5-sonnet-20241022"
api_key_env = "ANTHROPIC_API_KEY"
```

**环境变量：** `ANTHROPIC_API_KEY`

**热门模型：**
- `claude-3-5-sonnet-20241022` - 最新 Claude 3.5 Sonnet
- `claude-3-opus-20240229` - 最强大的 Claude
- `claude-3-haiku-20240307` - 快速高效

### Google Gemini

```toml
[provider]
kind = "gemini"
model = "gemini-1.5-pro"
api_key_env = "GEMINI_API_KEY"
```

**环境变量：** `GEMINI_API_KEY`

**热门模型：**
- `gemini-1.5-pro` - 高级推理
- `gemini-1.5-flash` - 快速响应
- `gemini-pro` - 标准模型

### DeepSeek

```toml
[provider]
kind = "deepseek"
model = "deepseek-chat"
api_key_env = "DEEPSEEK_API_KEY"
```

**环境变量：** `DEEPSEEK_API_KEY`

**热门模型：**
- `deepseek-chat` - 通用模型
- `deepseek-coder` - 代码专用
- `deepseek-reasoner` - 推理模型

### Kimi (Moonshot)

```toml
[provider]
kind = "kimi"
model = "moonshot-v1-8k"
api_key_env = "MOONSHOT_API_KEY"
base_url = "https://api.moonshot.cn"
```

**环境变量：** `MOONSHOT_API_KEY`

**热门模型：**
- `moonshot-v1-8k` - 8K 上下文
- `moonshot-v1-32k` - 32K 上下文
- `moonshot-v1-128k` - 128K 上下文

### Groq

```toml
[provider]
kind = "groq"
model = "llama-3.3-70b-versatile"
api_key_env = "GROQ_API_KEY"
```

**环境变量：** `GROQ_API_KEY`

### Mistral

```toml
[provider]
kind = "mistral"
model = "mistral-large-latest"
api_key_env = "MISTRAL_API_KEY"
```

**环境变量：** `MISTRAL_API_KEY`

### OpenRouter

```toml
[provider]
kind = "openrouter"
model = "anthropic/claude-3.5-sonnet"
api_key_env = "OPENROUTER_API_KEY"
```

**环境变量：** `OPENROUTER_API_KEY`

OpenRouter 通过单一 API 提供多个提供商的访问。

### xAI

```toml
[provider]
kind = "xai"
model = "grok-beta"
api_key_env = "XAI_API_KEY"
```

**环境变量：** `XAI_API_KEY`

### Ollama（本地）

```toml
[provider]
kind = "ollama"
model = "llama3"
base_url = "http://localhost:11434"
```

本地 Ollama 不需要 API 密钥。

**热门模型：**
- `llama3` - Meta Llama 3
- `llama3.1` - Llama 3.1
- `mistral` - Mistral 模型
- `codellama` - Code Llama
- `phi3` - Microsoft Phi-3

### 火山引擎（字节跳动）

```toml
[provider]
kind = "volcengine"
model = "your-model-id"
api_key_env = "ARK_API_KEY"
base_url = "https://ark.cn-beijing.volces.com"
chat_completions_path = "/api/v3/chat/completions"
```

**环境变量：** `ARK_API_KEY` 或 `VOLCENGINE_API_KEY`

### 通义千问（阿里云百炼）

```toml
[provider]
kind = "qwen"
model = "qwen-turbo"
api_key_env = "DASHSCOPE_API_KEY"
```

**环境变量：** `DASHSCOPE_API_KEY`

### 智谱 AI

```toml
[provider]
kind = "zhipu"
model = "glm-4"
api_key_env = "ZHIPUAI_API_KEY"
```

**环境变量：** `ZHIPUAI_API_KEY`

### 其他提供商

| 提供商 | `kind` | 环境变量 |
|--------|--------|----------|
| AWS Bedrock | `bedrock` | `AWS_BEARER_TOKEN_BEDROCK` |
| Cerebras | `cerebras` | `CEREBRAS_API_KEY` |
| Cohere | `cohere` | `COHERE_API_KEY` |
| Fireworks | `fireworks` | `FIREWORKS_API_KEY` |
| Minimax | `minimax` | `MINIMAX_API_KEY` |
| Nvidia | `nvidia` | `NVIDIA_API_KEY` |
| Perplexity | `perplexity` | `PERPLEXITY_API_KEY` |
| Together | `together` | `TOGETHER_API_KEY` |
| 千帆（百度） | `qianfan` | `QIANFAN_API_KEY` |
| SiliconFlow | `siliconflow` | `SILICONFLOW_API_KEY` |
| StepFun | `stepfun` | `STEP_API_KEY` |
| Venice | `venice` | `VENICE_API_KEY` |
| Vercel AI Gateway | `vercel_ai_gateway` | `AI_GATEWAY_API_KEY` |
| BytePlus | `byteplus` | `BYTEPLUS_API_KEY` |
| Cloudflare | `cloudflare_ai_gateway` | `CLOUDFLARE_API_KEY` |

## 多提供商配置

定义多个提供商并在它们之间切换：

```toml
# 主 OpenAI 配置
[providers.openai-main]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
default_for_kind = true

# Anthropic 备用
[providers.anthropic-backup]
kind = "anthropic"
model = "claude-3-5-sonnet-20241022"
api_key_env = "ANTHROPIC_API_KEY"

# 本地 Ollama
[providers.local]
kind = "ollama"
model = "llama3"
base_url = "http://localhost:11434"

# 选择活跃提供商
active_provider = "openai-main"
```

## 自定义端点

配置自定义 API 端点：

```toml
[provider]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
base_url = "https://your-proxy.example.com"
chat_completions_path = "/v1/chat/completions"
```

## 列出可用模型

```bash
# 列出已配置提供商的模型
loongclaw list-models

# JSON 输出
loongclaw list-models --json
```

## 提供商特定功能

### 推理强度

对于支持推理的模型（如 o1）：

```toml
[provider]
reasoning_effort = "medium"  # none, minimal, low, medium, high, xhigh
```

### 温度

控制响应随机性：

```toml
[provider]
temperature = 0.7  # 0.0（确定性）到 2.0（创造性）
```

### 最大令牌数

限制响应长度：

```toml
[provider]
max_tokens = 4096
```

## 故障排除

### 认证失败

```
error: provider authentication failed
```

**解决方案：**
1. 验证 API 密钥：`echo $OPENAI_API_KEY`
2. 在提供商控制台检查密钥有效性
3. 确保密钥具有正确的权限

### 模型未找到

```
error: model not found
```

**解决方案：**
1. 运行 `loongclaw list-models` 查看可用模型
2. 更新配置中的模型名称

### 速率限制

```
error: rate limit exceeded
```

**解决方案：**
1. 降低请求频率
2. 升级 API 等级
3. 配置重试：

```toml
[provider]
retry_max_attempts = 5
retry_initial_backoff_ms = 1000
```

### 超时

```
error: request timeout
```

**解决方案：**
```toml
[provider]
request_timeout_ms = 120000  # 2 分钟
```