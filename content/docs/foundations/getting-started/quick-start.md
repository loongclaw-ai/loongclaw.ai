---
title: "Quick Start"
description: "Run your first LoongClaw tasks in minutes"
path: "/docs/foundations/getting-started/quick-start"
order: 2
---

# Quick Start

This guide walks you through your first LoongClaw tasks after installation.

## Prerequisites

Before starting, ensure you have:

1. LoongClaw installed (see [Getting Started](/docs/foundations/getting-started))
2. An API key set in environment variables
3. Configuration file generated

## Step 1: Verify Setup

Run the diagnostic command to verify your setup:

```bash
loongclaw doctor
```

Expected output shows all checks passing:

```
✓ Configuration file found
✓ Provider configuration valid
✓ API key configured
✓ Memory system ready
```

If any check fails, run:

```bash
loongclaw doctor --fix
```

## Step 2: Your First Chat

Start an interactive chat session:

```bash
loongclaw chat
```

You'll see a prompt like:

```
loongclaw chat started (config=/home/user/.loongclaw/config.toml)
session=default (type /help for commands, /exit to quit)
you>
```

### Try a Simple Question

```
you> What is the capital of France?
loongclaw> The capital of France is Paris. It's known for the Eiffel Tower...
```

### Try a Coding Question

```
you> Write a Python function to check if a number is prime
loongclaw> Here's a Python function to check if a number is prime:

def is_prime(n):
    """Check if a number is prime."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True
```

## Step 3: Use One-Shot Ask

For quick questions without entering interactive mode:

```bash
loongclaw ask --message "Explain the difference between TCP and UDP"
```

This is useful for:
- Quick questions in scripts
- CI/CD integrations
- Automated workflows

## Step 4: Session Management

### Create Named Sessions

Sessions isolate conversations for different purposes:

```bash
# Work session
loongclaw chat --session work

# Project-specific session
loongclaw chat --session my-project

# Learning session
loongclaw chat --session python-learning
```

### Session Benefits

- **Isolation**: Each session has independent history
- **Persistence**: Conversations saved across restarts
- **Organization**: Separate contexts for different tasks

## Step 5: Using Tools

LoongClaw can use built-in tools when enabled. Configure tools in `~/.loongclaw/config.toml`:

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "echo", "git"]
```

Then in chat:

```
you> List files in the current directory
loongclaw> I'll list the files for you.

[Invoking shell.exec]
$ ls -la
total 32
drwxr-xr-x  5 user user 4096 Jan 15 10:00 .
drwxr-xr-x  2 user user 4096 Jan 15 09:50 src
...

The current directory contains:
- src/ directory
- README.md file
```

## Step 6: List Available Models

Check which models are available from your provider:

```bash
# Text format
loongclaw list-models

# JSON format
loongclaw list-models --json
```

## Step 7: View Configuration

Inspect your current configuration:

```bash
# Validate configuration
loongclaw validate-config

# View config file
cat ~/.loongclaw/config.toml
```

## Common Workflows

### Code Review Session

```bash
# Start a code review session
loongclaw chat --session code-review

you> Review this code for potential bugs:
... [paste code]
```

### Learning Session

```bash
# Start a learning session
loongclaw chat --session rust-learning

you> Explain Rust's borrowing and ownership model
```

### Quick Script

```bash
# One-shot task
loongclaw ask --message "Generate a bash script to backup a directory"
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line (multi-line input) |
| `Ctrl+C` | Cancel current input |
| `Ctrl+D` | Exit chat |

## Chat Commands Reference

| Command | Description |
|---------|-------------|
| `/help` | Show help message |
| `/history` | Show conversation history |
| `/exit`, `/quit`, `/q` | Exit chat session |

## Next Steps

Now that you've completed the quick start:

1. **[Configure Providers](/docs/connectivity/providers)** - Set up additional LLM providers
2. **[Configure Channels](/docs/connectivity/channels)** - Set up Telegram or Feishu integration
3. **[Enable Tools](/docs/runtime/tools)** - Configure shell, file, and browser tools
4. **[Memory Settings](/docs/runtime/memory)** - Adjust session and memory settings

## Troubleshooting Quick Start

### Chat Doesn't Respond

1. Check your API key: `echo $OPENAI_API_KEY`
2. Run diagnostics: `loongclaw doctor`
3. Check network connectivity

### Tools Not Working

1. Verify tools are configured in `config.toml`
2. Check shell commands are in the allow list
3. Run `loongclaw validate-config` to check configuration

### Session History Missing

1. Verify SQLite path in configuration
2. Check database file exists: `ls ~/.loongclaw/memory.sqlite3`
3. Ensure you're using the same session name