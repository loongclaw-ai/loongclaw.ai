---
title: "Troubleshooting"
description: "Common issues, diagnostic commands, and solutions"
path: "/docs/operations/troubleshooting"
order: 9
---

# Troubleshooting

This guide helps you diagnose and resolve common issues when using LoongClaw.

## Quick Diagnostics

```bash
# Run full diagnostics
loongclaw doctor

# Auto-fix issues
loongclaw doctor --fix

# JSON output for scripting
loongclaw doctor --json
```

## Common Issues

### 1. Configuration Not Found

**Error:**
```
error: failed to read config /home/user/.loongclaw/config.toml
```

**Causes:**
- Configuration file not generated
- Incorrect configuration file path
- File permission issues

**Solutions:**
```bash
# Generate configuration
loongclaw onboard

# Specify custom path
loongclaw chat --config /path/to/config.toml

# Check permissions
ls -la ~/.loongclaw/config.toml
chmod 600 ~/.loongclaw/config.toml
```

---

### 2. Invalid API Key

**Error:**
```
error: provider authentication failed
error: invalid api key or insufficient permissions
```

**Causes:**
- Environment variable not set
- Incorrect API key format
- API key expired or revoked

**Solutions:**
```bash
# Check environment variable
echo $OPENAI_API_KEY

# Verify variable is exported
env | grep OPENAI

# Re-set environment variable
export OPENAI_API_KEY="sk-..."

# Run diagnostics
loongclaw doctor --fix

# Test connection
loongclaw list-models
```

---

### 3. Tool Execution Denied

**Error:**
```
error: tool execution denied: command not in allowlist
error: file access denied: path outside allowed root
```

**Causes:**
- Command not in allowlist
- File path outside allowed directory
- Capability not granted

**Solutions:**

Add command to allowlist in `config.toml`:

```toml
[tools]
shell_allow = ["echo", "cat", "ls", "your-command"]

# Or use allow mode (not recommended)
shell_default_mode = "allow"
```

Set correct file root:

```toml
[tools]
file_root = "/home/user/projects"
```

---

### 4. Memory Database Locked

**Error:**
```
error: database is locked
```

**Causes:**
- Another LoongClaw process using the database
- Lock file residue from abnormal exit

**Solutions:**
```bash
# Find other processes
ps aux | grep loongclaw

# Terminate if needed
kill -15 <pid>

# Remove lock files
rm ~/.loongclaw/memory.sqlite3-journal
rm ~/.loongclaw/memory.sqlite3-wal

# If persistent, backup and recreate
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3
rm ~/.loongclaw/memory.sqlite3
```

---

### 5. Telegram Connection Failed

**Error:**
```
error: failed to connect to Telegram API
error: invalid bot token
```

**Causes:**
- Network connection issues
- Invalid Bot Token
- Proxy configuration issues

**Solutions:**
```bash
# Check network
curl https://api.telegram.org/bot<TOKEN>/getMe

# Verify token format (numbers:letters)
echo $TELEGRAM_BOT_TOKEN

# Use proxy
HTTPS_PROXY=http://proxy:8080 loongclaw telegram-serve

# Debug mode
RUST_LOG=debug loongclaw telegram-serve
```

---

### 6. Feishu Webhook Issues

**Error:**
```
error: webhook server failed to bind
error: address already in use
```

**Causes:**
- Port already in use
- Firewall restrictions
- Insufficient permissions

**Solutions:**
```bash
# Check port usage
lsof -i :3000

# Use different port
loongclaw feishu-serve --bind "0.0.0.0:8080"

# Check firewall
sudo iptables -L | grep 3000
```

---

### 7. Model Response Timeout

**Error:**
```
error: request timeout
error: provider response timeout
```

**Causes:**
- Network latency
- Slow provider response
- Model overload

**Solutions:**

Increase timeout in configuration:

```toml
[provider]
request_timeout_ms = 120000  # 2 minutes
retry_max_attempts = 3
retry_initial_backoff_ms = 1000
```

---

### 8. Session History Lost

**Error:**
```
warning: no conversation history found
```

**Causes:**
- Incorrect SQLite path
- Database corrupted
- Wrong session ID

**Solutions:**
```bash
# Check SQLite path
cat ~/.loongclaw/config.toml | grep sqlite_path

# Verify database exists
ls -la ~/.loongclaw/memory.sqlite3

# List sessions
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"

# Repair database
sqlite3 ~/.loongclaw/memory.sqlite3 ".recover" | sqlite3 ~/.loongclaw/memory.fixed.sqlite3
```

---

### 9. Slow Performance

**Symptoms:**
- Slow response times
- High memory usage

**Causes:**
- Large sliding window
- Large database file
- Network latency

**Solutions:**

Reduce sliding window:

```toml
[memory]
sliding_window = 8
```

Clean database:

```bash
# Remove old data
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"

# Compact database
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

---

### 10. Configuration Validation Errors

**Error:**
```
error: configuration validation failed
```

**Solutions:**
```bash
# Validate configuration
loongclaw validate-config

# JSON output
loongclaw validate-config --json

# Fix common issues
loongclaw doctor --fix
```

## Diagnostic Commands

### System Diagnostics

```bash
# Full diagnostics
loongclaw doctor

# Auto-fix issues
loongclaw doctor --fix

# JSON output
loongclaw doctor --json

# Skip model probe
loongclaw doctor --skip-model-probe
```

### Configuration Validation

```bash
# Validate config
loongclaw validate-config

# JSON output
loongclaw validate-config --json

# Problem JSON for CI
loongclaw validate-config --output problem-json --fail-on-diagnostics
```

### List Available Resources

```bash
# Available models
loongclaw list-models --json

# Context engines
loongclaw list-context-engines --json

# Memory systems
loongclaw list-memory-systems --json

# ACP backends
loongclaw list-acp-backends --json

# Channels
loongclaw channels --json
```

## Logging and Debugging

### Enable Verbose Logging

```bash
# Debug level
RUST_LOG=debug loongclaw chat

# Trace level (more verbose)
RUST_LOG=trace loongclaw chat

# Specific modules
RUST_LOG=loongclaw_daemon=debug,loongclaw_kernel=trace loongclaw chat
```

### Log to File

```bash
# Save all logs
RUST_LOG=debug loongclaw chat 2>&1 | tee loongclaw.log

# Save only errors
RUST_LOG=error loongclaw telegram-serve 2> errors.log
```

## Health Checklist

Run through this checklist when encountering issues:

1. **Configuration exists?**
   ```bash
   ls ~/.loongclaw/config.toml
   ```

2. **Environment variables set?**
   ```bash
   env | grep API_KEY
   ```

3. **Provider connection works?**
   ```bash
   loongclaw list-models
   ```

4. **Diagnostics pass?**
   ```bash
   loongclaw doctor
   ```

5. **No other processes?**
   ```bash
   ps aux | grep loongclaw
   ```

6. **Disk space available?**
   ```bash
   df -h ~/.loongclaw/
   ```

7. **Logs show errors?**
   ```bash
   RUST_LOG=debug loongclaw <command>
   ```

## Getting Help

### CLI Help

```bash
# Main help
loongclaw --help

# Command help
loongclaw chat --help
loongclaw onboard --help
```

### Online Resources

- **Documentation**: https://loongclaw.ai/docs
- **GitHub**: https://github.com/loongclaw-ai/loongclaw
- **Issues**: https://github.com/loongclaw-ai/loongclaw/issues
- **Telegram**: https://t.me/loongclaw
- **Discord**: https://discord.gg/loongclaw

### Reporting Issues

When reporting an issue, include:

1. **Environment Information**
   ```bash
   loongclaw --version
   rustc --version
   uname -a
   ```

2. **Configuration** (sanitized)
   ```bash
   cat ~/.loongclaw/config.toml | grep -v "api_key"
   ```

3. **Error Logs**
   ```bash
   RUST_LOG=debug loongclaw <command> 2>&1
   ```

4. **Reproduction Steps**
   - What you did
   - What you expected
   - What happened