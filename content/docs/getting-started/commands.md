---
title: "Command Line Tools"
description: "Complete reference for LoongClaw CLI commands"
path: "/docs/commands"
order: 3
---

# Command Line Tools

LoongClaw provides rich command-line tools for configuration, execution, diagnostics, and management.

## Core Commands

### setup - Initialize Configuration

```bash
loongclawd setup                          # Generate default config
loongclawd setup --force                  # Force overwrite
loongclawd setup --output /path/to/config.toml  # Specify output path
```

### onboard - Guided Configuration

Interactive guidance through initial configuration:

```bash
loongclawd onboard                        # Interactive guidance
loongclawd onboard --non-interactive      # Non-interactive mode
loongclawd onboard --accept-risk          # Accept risk warnings
loongclawd onboard --provider kimi        # Specify provider
loongclawd onboard --model moonshot-v1-8k # Specify model
```

### doctor - Diagnostic Check

```bash
loongclawd doctor                         # Run diagnostics
loongclawd doctor --fix                   # Auto-fix issues
loongclawd doctor --json                  # JSON output
loongclawd doctor --skip-model-probe      # Skip model probing
```

### list-models - List Available Models

```bash
loongclawd list-models                    # Text format
loongclawd list-models --json             # JSON format
```

### chat - Interactive Chat

```bash
loongclawd chat                           # Default configuration
loongclawd chat --config /path/to/config.toml
loongclawd chat --session my-session      # Specify session ID
```

#### Chat Commands

| Command | Description |
|---------|-------------|
| /help | Show help |
| /history | Show current session history |
| /exit | Exit chat |

### validate-config - Configuration Validation

```bash
loongclawd validate-config
loongclawd validate-config --json
loongclawd validate-config --locale en
loongclawd validate-config --fail-on-diagnostics
```

## Kernel Debug Commands

### demo - Run Demo

```bash
loongclawd demo                           # Run end-to-end guided demo
```

### run-task - Execute Task

```bash
loongclawd run-task --objective "Analyze code" --payload '{"repo": "user/repo"}'
```

### invoke-connector - Invoke Connector

```bash
loongclawd invoke-connector --operation notify --payload '{"channel": "ops", "message": "hello"}'
```

### audit-demo - Audit Demo

```bash
loongclawd audit-demo                     # Demonstrate audit lifecycle
```

### init-spec - Generate Spec Template

```bash
loongclawd init-spec                      # Generate loongclaw.spec.json
loongclawd init-spec --output my-spec.json
```

### run-spec - Execute Spec

```bash
loongclawd run-spec --spec examples/spec/tool-search.json
loongclawd run-spec --spec my-spec.json --print-audit  # Print audit logs
```

## Channel Service Commands

### telegram-serve - Start Telegram Service

```bash
# Start after setting environment variable
export TELEGRAM_BOT_TOKEN="your-bot-token"
loongclawd telegram-serve

# Single poll mode
loongclawd telegram-serve --once
```

### feishu-serve - Start Feishu Service

```bash
loongclawd feishu-serve

# Custom binding
loongclawd feishu-serve --bind "0.0.0.0:8080" --path "/custom/webhook"
```

### feishu-send - Send Feishu Message

```bash
loongclawd feishu-send --receive-id "chat_id_value" --text "Hello from LoongClaw"
loongclawd feishu-send --receive-id "chat_id_value" --text '{"title": "Card", "content": "..."}' --card
```

## Benchmark Commands

### benchmark-programmatic-pressure - Programmatic Pressure Test

```bash
# Run pressure benchmark
loongclawd benchmark-programmatic-pressure

# Specify matrix file
loongclawd benchmark-programmatic-pressure --matrix my-matrix.json

# Enable regression check
loongclawd benchmark-programmatic-pressure --enforce-gate

# Compare with baseline
loongclawd benchmark-programmatic-pressure --baseline baseline.json
```

### benchmark-wasm-cache - WASM Cache Test

```bash
# Run WASM cache benchmark
loongclawd benchmark-wasm-cache --wasm examples/plugins-wasm/secure_echo.wasm

# Enable performance gate
loongclawd benchmark-wasm-cache --enforce-gate

# Custom iteration counts
loongclawd benchmark-wasm-cache --cold-iterations 8 --hot-iterations 24
```

## Quick Command Reference

| Command | Purpose |
|---------|---------|
| `loongclawd --help` | Show main help |
| `loongclawd --version` | Show version |
| `loongclawd setup` | Initialize configuration |
| `loongclawd onboard` | Guided configuration |
| `loongclawd doctor` | Diagnostic check |
| `loongclawd chat` | Interactive chat |
| `loongclawd list-models` | List available models |
| `loongclawd validate-config` | Validate configuration |
| `loongclawd demo` | Run demo |
| `loongclawd run-spec` | Execute Spec |
| `loongclawd telegram-serve` | Start Telegram |
| `loongclawd feishu-serve` | Start Feishu |
| `loongclawd feishu-send` | Send Feishu message |

## Getting Help

```bash
loongclawd --help                    # Main help
loongclawd chat --help               # Subcommand help
loongclawd validate-config --help    # Specific command help
```
