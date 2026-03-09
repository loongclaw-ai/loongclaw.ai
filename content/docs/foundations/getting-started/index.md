---
title: "Getting Started"
description: "Install, configure, and run LoongClaw in minutes"
path: "/docs/foundations/getting-started"
order: 1
---

# Getting Started

This guide helps you install, configure, and start using LoongClaw quickly.

## Overview

LoongClaw provides multiple ways to get started:

1. **Guided Onboarding** (Recommended) - Interactive setup wizard
2. **Manual Installation** - Build from source
3. **Migration** - Import from existing AI assistant setups

## Prerequisites

Before installing LoongClaw, ensure you have:

- **Operating System**: Linux, macOS, or Windows
- **Rust Toolchain** (for source builds): Rust 1.75+
- **API Key**: An API key from your preferred LLM provider

## Installation Methods

### Method 1: Install Script (Recommended)

The install script downloads the matching binary from GitHub Releases, verifies its SHA256 checksum, and can launch guided onboarding.

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

### Method 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/loongclaw-ai/loongclaw.git
cd loongclaw

# Install with onboarding
bash scripts/install.sh --source --onboard

# Or build manually
cargo install --path crates/daemon
```

### Method 3: Cargo Install

```bash
cargo install --git https://github.com/loongclaw-ai/loongclaw loongclaw-daemon
```

## Verify Installation

After installation, verify LoongClaw is working:

```bash
# Check version
loongclaw --version

# Show help
loongclaw --help

# List available commands
loongclaw --help | grep -E "^    [a-z]"
```

## Guided Onboarding

LoongClaw provides an interactive onboarding wizard to help you get started quickly:

```bash
loongclaw onboard
```

The onboarding wizard will:

1. **Detect existing setups** - Find existing AI assistant configurations
2. **Select a provider** - Choose from supported LLM providers
3. **Configure credentials** - Set up API keys securely
4. **Generate configuration** - Create the config file

### Onboarding Options

| Flag | Description |
|------|-------------|
| `--non-interactive` | Skip interactive prompts |
| `--provider <name>` | Pre-select a provider (openai, anthropic, kimi, etc.) |
| `--model <name>` | Pre-select a model |
| `--force` | Overwrite existing configuration |
| `--skip-model-probe` | Skip provider model probing |

### Example: Non-Interactive Setup

```bash
# Set API key environment variable
export OPENAI_API_KEY="sk-your-key-here"

# Run onboarding non-interactively
loongclaw onboard --provider openai --model gpt-4o --non-interactive
```

## Set Up API Credentials

LoongClaw uses environment variables for API credentials (recommended approach):

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

# Other providers (see Providers documentation for full list)
```

### Why Environment Variables?

- **Security**: Credentials don't appear in config files
- **Flexibility**: Easy to switch between environments
- **CI/CD**: Works naturally with deployment pipelines

## First Chat

After setup, start your first chat:

```bash
# Start interactive chat
loongclaw chat

# Or use one-shot ask
loongclaw ask --message "Hello, how can you help me?"
```

### Chat Commands

Inside the chat session, use these commands:

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/history` | Show conversation history |
| `/exit` or `/quit` | Exit the chat |

## Health Check

Run diagnostics to verify your setup:

```bash
# Run diagnostics
loongclaw doctor

# Auto-fix issues
loongclaw doctor --fix

# JSON output
loongclaw doctor --json
```

## Configuration File Location

LoongClaw stores configuration in:

| Item | Default Location |
|------|------------------|
| Config file | `~/.loongclaw/config.toml` |
| Memory database | `~/.loongclaw/memory.sqlite3` |
| Audit logs | `~/.loongclaw/audit/` |

### Using Custom Config Path

```bash
# Specify custom config file
loongclaw chat --config /path/to/config.toml

# Validate configuration
loongclaw validate-config --config /path/to/config.toml
```

## Migrate from Other Tools

If you're migrating from another AI assistant setup:

```bash
# Discover migration candidates
loongclaw import --preview

# Import from detected source
loongclaw import --from existing --apply
```

See [Migration](#migration) for detailed instructions.

## Next Steps

- **[Quick Start](/docs/foundations/getting-started/quick-start)** - Run your first AI tasks
- **[Configuration](/docs/foundations/configuration)** - Learn about all configuration options
- **[Providers](/docs/connectivity/providers)** - Configure your preferred LLM provider
- **[Tools](/docs/runtime/tools)** - Enable and configure built-in tools

## Common Issues

### Installation Fails

1. Check your internet connection
2. Verify you have write permissions to the install directory
3. Try running with `--source` flag to build from source

### API Key Not Recognized

1. Verify the environment variable is set: `echo $OPENAI_API_KEY`
2. Check the variable name matches your provider
3. Ensure the key is valid and not expired

### Configuration Not Found

Run `loongclaw onboard` to generate a configuration file, or create one manually:

```bash
loongclaw onboard --force
```

## Getting Help

- Use `loongclaw --help` for CLI help
- Use `loongclaw doctor` for diagnostics
- Visit [GitHub Issues](https://github.com/loongclaw-ai/loongclaw/issues) for bug reports
- Join [Telegram](https://t.me/loongclaw) for community support