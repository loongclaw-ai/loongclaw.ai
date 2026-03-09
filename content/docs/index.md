---
title: "Documentation"
description: "Complete user guide for LoongClaw - an AI assistant framework built in Rust"
path: "/docs"
---

# LoongClaw Documentation

Welcome to LoongClaw documentation. LoongClaw is an **AI assistant framework** built in Rust - think of it as your own ChatGPT-like assistant that you can run locally, extend with tools, and deploy across multiple channels.

## What Can I Use It For?

- **Personal AI Assistant** - Chat with AI through CLI, Telegram, or Feishu
- **Code Assistant** - Let AI help with coding, debugging, and file operations
- **Team Bot** - Deploy a shared AI assistant for your team on Telegram or Feishu
- **Research Helper** - Use web search and browser tools to gather information
- **Custom Workflows** - Build automated workflows with the skills system

## What is LoongClaw?

LoongClaw is more than a simple chat interface. It's a comprehensive platform with:

- **Governance-native execution** - Capability tokens, policy decisions, approval requests, and audit events built into core execution paths
- **Multi-provider support** - OpenAI, Anthropic, DeepSeek, Kimi, Gemini, and 30+ other LLM providers
- **Multi-channel delivery** - CLI, Telegram, and Feishu/Lark integration out of the box
- **Secure tool runtime** - Shell execution, file operations, browser automation, and web fetching with security controls
- **Persistent memory** - SQLite-based sliding window memory with session isolation
- **Extensible skills** - External skills system for custom capabilities

## Quick Start

```bash
# Install LoongClaw
curl -fsSL https://raw.githubusercontent.com/loongclaw-ai/loongclaw/main/scripts/install.sh | bash -s -- --onboard

# Set your API key
export OPENAI_API_KEY="sk-..."

# Start chatting
loongclaw chat
```

## Documentation Sections

### [Getting Started](/docs/foundations/getting-started)
Installation, quick start guide, and initial setup walkthrough.

### [Configuration](/docs/foundations/configuration)
Complete configuration reference for providers, channels, tools, and memory.

### [CLI Commands](/docs/foundations/commands)
Comprehensive command-line interface reference.

### [Providers](/docs/connectivity/providers)
Guide to configuring and using different LLM providers.

### [Channels](/docs/connectivity/channels)
Set up CLI, Telegram, and Feishu communication channels.

### [Tools](/docs/runtime/tools)
Built-in tools for shell execution, file operations, browser automation, and web fetching.

### [Memory & Sessions](/docs/runtime/memory)
Session management, conversation history, and memory configuration.

### [Skills & ACP](/docs/orchestration/skills)
External skills system and Agent Control Plane for advanced workflows.

### [Troubleshooting](/docs/operations/troubleshooting)
Common issues, diagnostic commands, and solutions.

## Who Is This For?

### For New Users
Start with [Getting Started](/docs/foundations/getting-started) to install LoongClaw and run your first chat session. The [Quick Start](/docs/foundations/getting-started/quick-start) guide walks you through the essential steps.

### For Developers
Explore the [Configuration](/docs/foundations/configuration) section for detailed configuration options. The [Tools](/docs/runtime/tools) documentation covers the built-in tool system for extending LoongClaw's capabilities.

### For Teams
Learn about [Channels](/docs/connectivity/channels) to integrate LoongClaw with Telegram and Feishu for team collaboration. The [Skills & ACP](/docs/orchestration/skills) section covers advanced workflow orchestration.

## Architecture Overview

```
┌─────────────────────────────────────┐
│           daemon (loongclaw)         │  ← CLI Entry
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

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Provider** | 30+ LLM providers with unified configuration |
| **Multi-Channel** | CLI, Telegram, Feishu/Lark integration |
| **Tool System** | Shell, file, browser, web tools with security controls |
| **Memory** | SQLite persistence with sliding window |
| **Skills** | External skills with policy control |
| **ACP** | Agent Control Plane for advanced orchestration |

## Getting Help

- **CLI Help**: `loongclaw --help` or `loongclaw <command> --help`
- **Diagnostics**: `loongclaw doctor` for system health check
- **GitHub**: [github.com/loongclaw-ai/loongclaw](https://github.com/loongclaw-ai/loongclaw)
- **Community**: [Telegram](https://t.me/loongclaw) | [Discord](https://discord.gg/loongclaw)