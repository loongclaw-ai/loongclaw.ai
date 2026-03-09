---
title: "CLI Commands"
description: "Complete reference for LoongClaw command-line interface"
path: "/docs/foundations/commands"
order: 3
---

# CLI Commands

Complete reference for all LoongClaw CLI commands.

## Command Structure

```bash
loongclaw [COMMAND] [OPTIONS]
```

Use `loongclaw --help` for quick help, or `loongclaw <command> --help` for command-specific help.

## Core Commands

### onboard

Guided onboarding for first-time setup.

```bash
loongclaw onboard [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--output <PATH>` | Custom config output path |
| `--force` | Overwrite existing config |
| `--non-interactive` | Skip interactive prompts |
| `--accept-risk` | Accept risk acknowledgement |
| `--provider <NAME>` | Pre-select provider |
| `--model <NAME>` | Pre-select model |
| `--api-key-env <VAR>` | API key environment variable |
| `--personality <NAME>` | Select prompt personality |
| `--memory-profile <NAME>` | Select memory profile |
| `--system-prompt <TEXT>` | Custom system prompt |
| `--skip-model-probe` | Skip provider model probing |

**Examples:**

```bash
# Interactive onboarding
loongclaw onboard

# Non-interactive with provider selection
loongclaw onboard --provider openai --model gpt-4o --non-interactive

# Force overwrite
loongclaw onboard --force
```

### doctor

Run diagnostics and optionally apply fixes.

```bash
loongclaw doctor [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--fix` | Apply safe auto-fixes |
| `--json` | JSON output format |
| `--skip-model-probe` | Skip provider model probing |

**Examples:**

```bash
# Run diagnostics
loongclaw doctor

# Auto-fix issues
loongclaw doctor --fix

# JSON output
loongclaw doctor --json
```

### validate-config

Validate configuration file.

```bash
loongclaw validate-config [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--json` | JSON output format |
| `--output <FORMAT>` | Output format: `text`, `json`, `problem-json` |
| `--locale <LANG>` | Localization language |
| `--fail-on-diagnostics` | Exit with error if diagnostics found |

**Examples:**

```bash
# Validate config
loongclaw validate-config

# JSON output for CI
loongclaw validate-config --json --fail-on-diagnostics
```

### list-models

List available models from configured provider.

```bash
loongclaw list-models [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--json` | JSON output format |

### import

Import configuration from existing setups.

```bash
loongclaw import [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--output <PATH>` | Custom config output path |
| `--force` | Overwrite existing config |
| `--preview` | Print preview without applying |
| `--apply` | Apply import to target |
| `--json` | JSON output |
| `--from <SOURCE>` | Limit to source: `recommended`, `existing`, `codex`, `env` |
| `--source-path <PATH>` | Choose exact detected source path |
| `--provider <NAME>` | Select provider |
| `--include <DOMAINS>` | Reuse only listed domains |
| `--exclude <DOMAINS>` | Exclude listed domains |

## Chat Commands

### chat

Start interactive CLI chat.

```bash
loongclaw chat [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--session <ID>` | Session identifier |
| `--acp` | Use ACP mode |
| `--acp-event-stream` | Stream ACP events |
| `--acp-bootstrap-mcp-server <URL>` | Bootstrap MCP servers |
| `--acp-cwd <PATH>` | Working directory for ACP |

**Examples:**

```bash
# Start default chat
loongclaw chat

# Named session
loongclaw chat --session my-project

# Custom config
loongclaw chat --config /path/to/config.toml
```

### ask

One-shot question without interactive session.

```bash
loongclaw ask --message <TEXT> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--message <TEXT>` | Message to send (required) |
| `--config <PATH>` | Config file path |
| `--session <ID>` | Session identifier |
| `--acp` | Use ACP mode |

**Examples:**

```bash
# Quick question
loongclaw ask --message "What is 2+2?"

# With session
loongclaw ask --message "Continue from before" --session my-project
```

## Channel Commands

### telegram-serve

Start Telegram bot service.

```bash
loongclaw telegram-serve [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--once` | Process one message then exit |
| `--account <ID>` | Telegram account identifier |

**Examples:**

```bash
# Start service
loongclaw telegram-serve

# Test single message
loongclaw telegram-serve --once
```

### telegram-send

Send a Telegram message.

```bash
loongclaw telegram-send --target <ID> --text <TEXT> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--target <ID>` | Target chat ID or username (required) |
| `--text <TEXT>` | Message text (required) |
| `--config <PATH>` | Config file path |
| `--account <ID>` | Telegram account |

### feishu-serve

Start Feishu webhook service.

```bash
loongclaw feishu-serve [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--account <ID>` | Feishu account |
| `--bind <ADDR>` | Bind address (e.g., `0.0.0.0:8080`) |
| `--path <PATH>` | Callback path |

### feishu-send

Send a Feishu message.

```bash
loongclaw feishu-send --receive-id <ID> --text <TEXT> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--receive-id <ID>` | Receiver ID (required) |
| `--text <TEXT>` | Message text |
| `--post-json <JSON>` | Post message JSON |
| `--image-key <KEY>` | Image key |
| `--file-key <KEY>` | File key |
| `--card` | Send as card |
| `--config <PATH>` | Config file path |
| `--account <ID>` | Feishu account |

## Feishu Subcommands

### feishu auth

Manage Feishu OAuth grants.

```bash
# Start OAuth flow
loongclaw feishu auth start [OPTIONS]

# Exchange auth code
loongclaw feishu auth exchange --state <STATE> --code <CODE>

# List stored grants
loongclaw feishu auth list

# Select default grant
loongclaw feishu auth select --open-id <ID>
```

### feishu whoami

Show current Feishu user profile.

```bash
loongclaw feishu whoami [OPTIONS]
```

### feishu doc

Create and manage Feishu documents.

```bash
# Create document
loongclaw feishu doc create --title "My Doc" [OPTIONS]

# Append to document
loongclaw feishu doc append --url <URL> --content <CONTENT>
```

### feishu messages

Manage Feishu messages.

```bash
# Read message history
loongclaw feishu messages history --container-id <ID> [OPTIONS]

# Get message details
loongclaw feishu messages get --message-id <ID>

# Download resource
loongclaw feishu messages resource --message-id <ID> --index <N>
```

### feishu search

Search Feishu content.

```bash
loongclaw feishu search messages --query <QUERY> [OPTIONS]
```

### feishu calendar

Access Feishu calendar.

```bash
# List calendars
loongclaw feishu calendar list [OPTIONS]

# Get free/busy data
loongclaw feishu calendar freebusy --user-id <ID> --start-time <TIME> --end-time <TIME>
```

## Skills Commands

Manage external skills.

```bash
# List skills
loongclaw skills list [OPTIONS]

# Show skill info
loongclaw skills info <SKILL_ID>

# Install skill
loongclaw skills install <PATH> [OPTIONS]

# Install bundled skill
loongclaw skills install-bundled <SKILL_ID>

# Remove skill
loongclaw skills remove <SKILL_ID>
```

### skills policy

Manage skills policy.

```bash
# Show policy
loongclaw skills policy get

# Set policy
loongclaw skills policy set --enabled true --approve-policy-update

# Reset policy
loongclaw skills policy reset --approve-policy-update
```

## Discovery Commands

### channels

List compiled channel surfaces.

```bash
loongclaw channels [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--config <PATH>` | Config file path |
| `--json` | JSON output |

### list-context-engines

List available context engines.

```bash
loongclaw list-context-engines [OPTIONS]
```

### list-memory-systems

List available memory systems.

```bash
loongclaw list-memory-systems [OPTIONS]
```

### list-acp-backends

List available ACP backends.

```bash
loongclaw list-acp-backends [OPTIONS]
```

### list-acp-sessions

List ACP sessions.

```bash
loongclaw list-acp-sessions [OPTIONS]
```

## ACP Commands

### acp-status

Show ACP session status.

```bash
loongclaw acp-status [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--session <ID>` | Session key |
| `--conversation-id <ID>` | Conversation ID |
| `--route-session-id <ID>` | Route session ID |

### acp-observability

Show ACP observability data.

```bash
loongclaw acp-observability [OPTIONS]
```

### acp-event-summary

Show ACP event summary.

```bash
loongclaw acp-event-summary --session <ID> [OPTIONS]
```

### acp-dispatch

Evaluate ACP dispatch policy.

```bash
loongclaw acp-dispatch [OPTIONS]
```

### acp-doctor

Run ACP backend diagnostics.

```bash
loongclaw acp-doctor [OPTIONS]
```

## Runtime Commands

### runtime-snapshot

Create runtime snapshot.

```bash
loongclaw runtime-snapshot [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--output <PATH>` | Output file path |
| `--label <TEXT>` | Snapshot label |
| `--experiment-id <ID>` | Experiment ID |
| `--parent-snapshot-id <ID>` | Parent snapshot ID |

### runtime-restore

Restore runtime snapshot.

```bash
loongclaw runtime-restore --snapshot <PATH> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--snapshot <PATH>` | Snapshot path (required) |
| `--apply` | Apply changes (dry-run by default) |

### runtime-experiment

Manage runtime experiments.

```bash
# Start experiment
loongclaw runtime-experiment start --snapshot <PATH> --output <PATH> --mutation-summary <TEXT>

# Finish experiment
loongclaw runtime-experiment finish --run <PATH> --result-snapshot <PATH> --decision <DECISION>

# Show experiment
loongclaw runtime-experiment show --run <PATH>

# Compare experiment
loongclaw runtime-experiment compare --run <PATH>

# Restore experiment
loongclaw runtime-experiment restore --run <PATH> --stage <STAGE>
```

### runtime-capability

Manage runtime capabilities.

```bash
# Propose capability
loongclaw runtime-capability propose --run <PATH> --output <PATH> --target <TARGET>

# Review capability
loongclaw runtime-capability review --candidate <PATH> --decision <DECISION>

# Show capability
loongclaw runtime-capability show --candidate <PATH>
```

## Safe Lane Commands

### safe-lane-summary

Show safe-lane event summary.

```bash
loongclaw safe-lane-summary --session <ID> [OPTIONS]
```

## Spec Commands

### init-spec

Generate spec template.

```bash
loongclaw init-spec [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--output <PATH>` | Output file path |

### run-spec

Execute spec workflow.

```bash
loongclaw run-spec --spec <PATH> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--spec <PATH>` | Spec file path (required) |
| `--print-audit` | Print audit trail |

## Benchmark Commands

### benchmark-programmatic-pressure

Run programmatic pressure benchmark.

```bash
loongclaw benchmark-programmatic-pressure [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--matrix <PATH>` | Benchmark matrix file |
| `--baseline <PATH>` | Baseline report for comparison |
| `--output <PATH>` | Output report path |
| `--enforce-gate` | Fail if regression detected |

### benchmark-wasm-cache

Run WASM cache benchmark.

```bash
loongclaw benchmark-wasm-cache [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--wasm <PATH>` | WASM file to benchmark |
| `--output <PATH>` | Output report path |
| `--cold-iterations <N>` | Cold iterations |
| `--hot-iterations <N>` | Hot iterations |
| `--enforce-gate` | Fail if speedup below threshold |

### benchmark-memory-context

Run memory context benchmark.

```bash
loongclaw benchmark-memory-context [OPTIONS]
```

## Demo Commands

### demo

Run end-to-end bootstrap demo.

```bash
loongclaw demo
```

### run-task

Execute a task through kernel+harness.

```bash
loongclaw run-task --objective <TEXT> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--objective <TEXT>` | Task objective (required) |
| `--payload <JSON>` | JSON payload |

### invoke-connector

Invoke connector operation.

```bash
loongclaw invoke-connector --operation <NAME> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--operation <NAME>` | Operation name (required) |
| `--payload <JSON>` | JSON payload |

### audit-demo

Demonstrate audit lifecycle.

```bash
loongclaw audit-demo
```

## Global Options

| Flag | Description |
|------|-------------|
| `--help` | Show help |
| `--version` | Show version |

## Getting Help

```bash
# Main help
loongclaw --help

# Command-specific help
loongclaw chat --help
loongclaw onboard --help

# View all commands
loongclaw --help | grep -E "^    [a-z]"
```