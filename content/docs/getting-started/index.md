---
title: "Getting Started"
description: "Install, configure, and run LoongClaw"
path: "/docs/getting-started"
order: 1
---

# Getting Started

This guide will help you install, configure, and run LoongClaw in minutes.

## Prerequisites

- Rust toolchain (1.75+)
- SQLite (if memory-sqlite feature is enabled)

## Installation

### Install from Source

```bash
# Clone the repository
git clone <repository>
cd loongclaw

# Build and install
./scripts/install.sh --prefix ~/.local/bin --setup

# Or build manually
cargo build -p loongclaw-daemon --bin loongclawd --release

# Copy to PATH
cp target/release/loongclawd ~/.local/bin/
```

### Verify Installation

```bash
loongclawd --version
loongclawd --help
```

## Initial Configuration

### 1. Generate Default Configuration

```bash
# Generate default config
loongclawd setup

# Force overwrite existing config
loongclawd setup --force
```

This creates a configuration file at `~/.loongclaw/config.toml`.

### 2. Configure API Key

Set environment variables (recommended approach):

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Or Kimi (Moonshot)
export MOONSHOT_API_KEY="your-kimi-key"

# Or DeepSeek
export DEEPSEEK_API_KEY="your-deepseek-key"
```

### 3. Verify Configuration

```bash
# Verify configuration validity
loongclawd doctor

# Auto-fix issues that can be resolved
loongclawd doctor --fix

# JSON format output
loongclawd doctor --json
```

## Start Chatting

```bash
# Start interactive CLI chat
loongclawd chat

# Use specific configuration
loongclawd chat --config /path/to/config.toml

# Specify session ID
loongclawd chat --session my-session
```

## Next Steps

- Read the [Configuration Guide](/docs/configuration) for detailed configuration options
- Check out [Command Line Tools](/docs/commands) for all available commands
- Learn about [Channel Integration](/docs/channels) to configure Telegram or Feishu