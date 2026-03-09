---
title: "Providers"
description: "Guide to configuring and using LLM providers"
path: "/docs/connectivity/providers"
order: 4
---

# Providers

LoongClaw supports 30+ LLM providers with unified configuration.

## Quick Setup

```bash
# Set your API key
export OPENAI_API_KEY="sk-your-key-here"

# Run onboarding
loongclaw onboard --provider openai --non-interactive
```

## Supported Providers

### OpenAI

```toml
[provider]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
```

**Environment Variable:** `OPENAI_API_KEY`

**Popular Models:**
- `gpt-4o` - Latest flagship model
- `gpt-4o-mini` - Fast and affordable
- `gpt-4-turbo` - GPT-4 with improvements
- `o1-preview` - Reasoning model
- `o1-mini` - Fast reasoning model

### Anthropic

```toml
[provider]
kind = "anthropic"
model = "claude-3-5-sonnet-20241022"
api_key_env = "ANTHROPIC_API_KEY"
```

**Environment Variable:** `ANTHROPIC_API_KEY`

**Popular Models:**
- `claude-3-5-sonnet-20241022` - Latest Claude 3.5 Sonnet
- `claude-3-opus-20240229` - Most capable Claude
- `claude-3-haiku-20240307` - Fast and efficient

### Google Gemini

```toml
[provider]
kind = "gemini"
model = "gemini-1.5-pro"
api_key_env = "GEMINI_API_KEY"
```

**Environment Variable:** `GEMINI_API_KEY`

**Popular Models:**
- `gemini-1.5-pro` - Advanced reasoning
- `gemini-1.5-flash` - Fast responses
- `gemini-pro` - Standard model

### DeepSeek

```toml
[provider]
kind = "deepseek"
model = "deepseek-chat"
api_key_env = "DEEPSEEK_API_KEY"
```

**Environment Variable:** `DEEPSEEK_API_KEY`

**Popular Models:**
- `deepseek-chat` - General purpose
- `deepseek-coder` - Code specialized
- `deepseek-reasoner` - Reasoning model

### Kimi (Moonshot)

```toml
[provider]
kind = "kimi"
model = "moonshot-v1-8k"
api_key_env = "MOONSHOT_API_KEY"
base_url = "https://api.moonshot.cn"
```

**Environment Variable:** `MOONSHOT_API_KEY`

**Popular Models:**
- `moonshot-v1-8k` - 8K context
- `moonshot-v1-32k` - 32K context
- `moonshot-v1-128k` - 128K context

### Groq

```toml
[provider]
kind = "groq"
model = "llama-3.3-70b-versatile"
api_key_env = "GROQ_API_KEY"
```

**Environment Variable:** `GROQ_API_KEY`

### Mistral

```toml
[provider]
kind = "mistral"
model = "mistral-large-latest"
api_key_env = "MISTRAL_API_KEY"
```

**Environment Variable:** `MISTRAL_API_KEY`

### OpenRouter

```toml
[provider]
kind = "openrouter"
model = "anthropic/claude-3.5-sonnet"
api_key_env = "OPENROUTER_API_KEY"
```

**Environment Variable:** `OPENROUTER_API_KEY`

OpenRouter provides access to multiple providers through a single API.

### xAI

```toml
[provider]
kind = "xai"
model = "grok-beta"
api_key_env = "XAI_API_KEY"
```

**Environment Variable:** `XAI_API_KEY`

### Ollama (Local)

```toml
[provider]
kind = "ollama"
model = "llama3"
base_url = "http://localhost:11434"
```

No API key required for local Ollama.

**Popular Models:**
- `llama3` - Meta Llama 3
- `llama3.1` - Llama 3.1
- `mistral` - Mistral model
- `codellama` - Code Llama
- `phi3` - Microsoft Phi-3

### Volcengine (ByteDance)

```toml
[provider]
kind = "volcengine"
model = "your-model-id"
api_key_env = "ARK_API_KEY"
base_url = "https://ark.cn-beijing.volces.com"
chat_completions_path = "/api/v3/chat/completions"
```

**Environment Variable:** `ARK_API_KEY` or `VOLCENGINE_API_KEY`

### Qwen (Alibaba DashScope)

```toml
[provider]
kind = "qwen"
model = "qwen-turbo"
api_key_env = "DASHSCOPE_API_KEY"
```

**Environment Variable:** `DASHSCOPE_API_KEY`

### Zhipu AI

```toml
[provider]
kind = "zhipu"
model = "glm-4"
api_key_env = "ZHIPUAI_API_KEY"
```

**Environment Variable:** `ZHIPUAI_API_KEY`

### Other Providers

| Provider | `kind` | Env Variable |
|----------|--------|--------------|
| AWS Bedrock | `bedrock` | `AWS_BEARER_TOKEN_BEDROCK` |
| Cerebras | `cerebras` | `CEREBRAS_API_KEY` |
| Cohere | `cohere` | `COHERE_API_KEY` |
| Fireworks | `fireworks` | `FIREWORKS_API_KEY` |
| Minimax | `minimax` | `MINIMAX_API_KEY` |
| Nvidia | `nvidia` | `NVIDIA_API_KEY` |
| Perplexity | `perplexity` | `PERPLEXITY_API_KEY` |
| Together | `together` | `TOGETHER_API_KEY` |
| Qianfan (Baidu) | `qianfan` | `QIANFAN_API_KEY` |
| SiliconFlow | `siliconflow` | `SILICONFLOW_API_KEY` |
| StepFun | `stepfun` | `STEP_API_KEY` |
| Venice | `venice` | `VENICE_API_KEY` |
| Vercel AI Gateway | `vercel_ai_gateway` | `AI_GATEWAY_API_KEY` |
| BytePlus | `byteplus` | `BYTEPLUS_API_KEY` |
| Cloudflare | `cloudflare_ai_gateway` | `CLOUDFLARE_API_KEY` |

## Multiple Provider Profiles

Define multiple providers and switch between them:

```toml
# Primary OpenAI config
[providers.openai-main]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
default_for_kind = true

# Anthropic fallback
[providers.anthropic-backup]
kind = "anthropic"
model = "claude-3-5-sonnet-20241022"
api_key_env = "ANTHROPIC_API_KEY"

# Local Ollama
[providers.local]
kind = "ollama"
model = "llama3"
base_url = "http://localhost:11434"

# Select active provider
active_provider = "openai-main"
```

## Custom Endpoints

Configure custom API endpoints:

```toml
[provider]
kind = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
base_url = "https://your-proxy.example.com"
chat_completions_path = "/v1/chat/completions"
```

## Listing Available Models

```bash
# List models from configured provider
loongclaw list-models

# JSON output
loongclaw list-models --json
```

## Provider-Specific Features

### Reasoning Effort

For models that support reasoning (like o1):

```toml
[provider]
reasoning_effort = "medium"  # none, minimal, low, medium, high, xhigh
```

### Temperature

Control response randomness:

```toml
[provider]
temperature = 0.7  # 0.0 (deterministic) to 2.0 (creative)
```

### Max Tokens

Limit response length:

```toml
[provider]
max_tokens = 4096
```

## Troubleshooting

### Authentication Failed

```
error: provider authentication failed
```

**Solutions:**
1. Verify API key: `echo $OPENAI_API_KEY`
2. Check key validity in provider dashboard
3. Ensure key has correct permissions

### Model Not Found

```
error: model not found
```

**Solutions:**
1. Run `loongclaw list-models` to see available models
2. Update model name in configuration

### Rate Limiting

```
error: rate limit exceeded
```

**Solutions:**
1. Reduce request frequency
2. Upgrade API tier
3. Configure retries:

```toml
[provider]
retry_max_attempts = 5
retry_initial_backoff_ms = 1000
```

### Timeout

```
error: request timeout
```

**Solutions:**
```toml
[provider]
request_timeout_ms = 120000  # 2 minutes
```