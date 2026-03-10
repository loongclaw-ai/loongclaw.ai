---
title: "Documentation"
description: "LoongClaw Documentation - Rust-first Agentic OS Foundation Framework"
path: "/docs"
---

# LoongClaw Documentation

Welcome to the LoongClaw documentation center. LoongClaw is a Rust-first Agentic OS foundation framework focused on stable kernel contracts, strict policy boundaries, and highly pluggable runtime orchestration.

## Core Features

- **Layered Execution Architecture**: Kernel-protocol-application layered design ensuring execution paths pass through capability/policy/audit layers
- **Capability Security Model**: All operations require valid CapabilityToken authorization
- **Audit Trail**: All critical operations generate structured audit events
- **Multi-Provider Support**: OpenAI, Kimi (Moonshot), DeepSeek, Minimax, Anthropic, Volcengine, Ollama, OpenRouter, and more
- **Multi-Channel Support**: CLI, Telegram, Feishu, and more
- **Tool Runtime**: Support for shell execution, file I/O, and other core tools
- **SQLite Persistence**: Sliding window conversation memory
- **WebAssembly Plugins**: Support for WASM component extensions

## Documentation Sections

### [Getting Started](/docs/getting-started)
Installation, configuration, and running your first LoongClaw instance.

### [Features](/docs/features)
Detailed documentation of LoongClaw's core features:
- [Chat](/docs/features/chat) - Interactive chat and session management
- [Tool System](/docs/features/tools) - Built-in tools for system commands and file operations
- [Channel Integration](/docs/features/channels) - CLI, Telegram, and Feishu integration
- [Spec Workflow](/docs/features/spec) - Advanced workflow definition and execution

### [Troubleshooting](/docs/troubleshooting)
Common problems, diagnostic commands, and solutions.

## Architecture Overview

```
┌─────────────────────────────────────┐
│           daemon (loongclawd)        │  ← CLI Entry
├─────────────────────────────────────┤
│              app                     │  ← MVP Implementation
├─────────────────────────────────────┤
│       spec / bench / protocol        │  ← Specification & Benchmarks
├─────────────────────────────────────┤
│            kernel                    │  ← Core Kernel
├─────────────────────────────────────┤
│          contracts                   │  ← Contract Definitions
└─────────────────────────────────────┘
```

## Quick Start

```bash
# 1. Install LoongClaw
./scripts/install.sh --prefix ~/.local/bin --setup

# 2. Initialize configuration
loongclawd setup

# 3. Set API Key
export OPENAI_API_KEY="sk-..."

# 4. Start chatting
loongclawd chat
```

## Community

- [GitHub](https://github.com/loongclaw-ai) - Star, report issues, and contribute
- [Telegram](https://t.me/loongclawai) - Community updates and support
- [Discord](https://discord.gg/loongclaw) - Real-time discussions

## Next Steps

Choose a section from the navigation menu to explore LoongClaw's documentation in detail.
