---
title: "Troubleshooting"
description: "Common problem diagnosis and solutions for LoongClaw"
path: "/docs/troubleshooting"
order: 8
---

# Troubleshooting

This guide helps you diagnose and resolve common issues when using LoongClaw.

## Common Issues

### 1. Configuration Not Found

**Error Message:**
```
error: failed to read config /home/user/.loongclaw/config.toml: ...
```

**Causes:**
- Configuration file not generated
- Incorrect configuration file path
- File permission issues

**Solution:**
```bash
# Generate default configuration
loongclawd setup

# Specify configuration file path
loongclawd chat --config /path/to/config.toml

# Check file permissions
ls -la ~/.loongclaw/config.toml
chmod 600 ~/.loongclaw/config.toml
```

---

### 2. Invalid API Key

**Error Message:**
```
error: provider authentication failed
error: invalid api key or insufficient permissions
```

**Causes:**
- Environment variable not set
- Incorrect API Key format
- API Key expired or revoked

**Solution:**
```bash
# Check environment variable
echo $OPENAI_API_KEY

# Check if environment variable is properly exported
env | grep OPENAI

# Re-set environment variable
export OPENAI_API_KEY="sk-..."

# Run diagnostics
loongclawd doctor --fix

# Test model connection
loongclawd list-models
```

---

### 3. Tool Execution Denied

**Error Message:**
```
error: tool execution denied: command not in allowlist
error: tool execution denied: file access denied
```

**Causes:**
- Command not in whitelist
- File path outside allowed range
- Capability not granted

**Solution:**
```bash
# Add command to whitelist in config.toml
[tools]
shell_allowlist = ["echo", "cat", "ls", "your-command"]

# Set correct file root directory
[tools]
file_root = "/home/user/projects"

# Check granted_capabilities in Spec
"granted_capabilities": ["InvokeTool"]
```

---

### 4. Memory Database Locked

**Error Message:**
```
error: database is locked
error: unable to acquire database lock
```

**Causes:**
- Another LoongClaw process is using the database
- Lock file residue from abnormal exit

**Solution:**
```bash
# Find and terminate other LoongClaw processes
ps aux | grep loongclawd
kill -15 <pid>

# Remove lock files
rm ~/.loongclaw/memory.sqlite3-journal
rm ~/.loongclaw/memory.sqlite3-wal

# If problem persists, backup and rebuild database
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3
rm ~/.loongclaw/memory.sqlite3
loongclawd chat  # Will auto-create new database
```

---

### 5. Telegram Connection Failed

**Error Message:**
```
error: failed to connect to Telegram API
error: invalid bot token
```

**Causes:**
- Network connection issues
- Invalid Bot Token
- Proxy configuration issues

**Solution:**
```bash
# Check network connection
curl https://api.telegram.org/bot<token>/getMe

# Verify environment variable
echo $TELEGRAM_BOT_TOKEN

# Check Token format (should contain numbers and letters)
# Example: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Use proxy (if needed)
export HTTPS_PROXY=http://proxy.example.com:8080
loongclawd telegram-serve

# Debug mode
RUST_LOG=debug loongclawd telegram-serve
```

---

### 6. Feishu Webhook Inaccessible

**Error Message:**
```
error: webhook server failed to bind
error: address already in use
```

**Causes:**
- Port already in use
- Firewall restrictions
- Insufficient permissions (port < 1024)

**Solution:**
```bash
# Check port usage
lsof -i :3000
netstat -tlnp | grep 3000

# Use different port
loongclawd feishu-serve --bind "0.0.0.0:8080"

# Check firewall
sudo iptables -L | grep 3000

# Use non-privileged port (>= 1024)
loongclawd feishu-serve --bind "0.0.0.0:8080"
```

---

### 7. Model Response Timeout

**Error Message:**
```
error: request timeout
error: provider response timeout
```

**Causes:**
- Network latency
- Slow model provider response
- Incorrect request parameters

**Solution:**
```toml
# Increase timeout
[provider]
request_timeout_ms = 120000  # 2 minutes

# Reduce retry attempts
retry_max_attempts = 2

# Adjust model parameters
temperature = 0.5
max_tokens = 2048
```

---

### 8. WASM Plugin Load Failed

**Error Message:**
```
error: failed to load wasm plugin
error: wasm module validation failed
```

**Causes:**
- WASM file corrupted
- Version incompatibility
- Memory limitations

**Solution:**
```bash
# Validate WASM file
wasm2wat plugin.wasm > /dev/null && echo "Valid WASM"

# Check file permissions
chmod +x plugin.wasm

# Increase WASM cache capacity
export LOONGCLAW_WASM_CACHE_CAPACITY=64

# Test with example WASM
loongclawd benchmark-wasm-cache --wasm examples/plugins-wasm/secure_echo.wasm
```

---

### 9. Spec Execution Failed

**Error Message:**
```
error: invalid spec: missing required field
error: capability denied
error: spec execution timeout
```

**Causes:**
- Incorrect Spec format
- Missing required fields
- Capability not authorized
- Execution time exceeded TTL

**Solution:**
```bash
# Validate Spec format
loongclawd run-spec --spec my-spec.json --print-audit

# Check required fields
# - pack.pack_id
# - pack.domain
# - pack.version
# - agent_id
# - operation.kind

# Confirm Capability is granted
"granted_capabilities": ["InvokeTool", "InvokeConnector"]

# Increase TTL
"ttl_s": 300
```

---

### 10. Session History Lost

**Error Message:**
```
warning: no conversation history found
session history is empty
```

**Causes:**
- Incorrect SQLite path configuration
- Database file corrupted
- Session ID mismatch

**Solution:**
```bash
# Check SQLite path configuration
cat ~/.loongclaw/config.toml | grep sqlite_path

# Verify database file exists
ls -la ~/.loongclaw/memory.sqlite3

# Check session ID
# Default session name is "default"
loongclawd chat --session my-session

# View database content (using sqlite3)
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT * FROM conversations LIMIT 5;"

# Repair database
sqlite3 ~/.loongclaw/memory.sqlite3 ".recover" | sqlite3 ~/.loongclaw/memory.fixed.sqlite3
mv ~/.loongclaw/memory.fixed.sqlite3 ~/.loongclaw/memory.sqlite3
```

---

## Diagnostic Commands

### Complete System Diagnostics

```bash
# Run complete diagnostics
loongclawd doctor

# Auto-fix resolvable issues
loongclawd doctor --fix

# JSON format output (for scripting)
loongclawd doctor --json

# Skip model probe (quick diagnosis)
loongclawd doctor --skip-model-probe
```

### Configuration Validation

```bash
# Validate configuration file
loongclawd validate-config --config ~/.loongclaw/config.toml

# JSON output format
loongclawd validate-config --json

# Problem JSON format (suitable for CI)
loongclawd validate-config --output problem-json --fail-on-diagnostics

# Specify locale
loongclawd validate-config --locale en
```

### View Current Configuration

```bash
# View configuration file content
cat ~/.loongclaw/config.toml

# View environment variables
env | grep -E "(OPENAI|MOONSHOT|DEEPSEEK|TELEGRAM|FEISHU)"

# Check binary path
which loongclawd
ls -la $(which loongclawd)

# View version information
loongclawd --version
```

---

## Logging and Debugging

### Enable Verbose Logging

```bash
# Set log level
export RUST_LOG=debug
export RUST_LOG=trace  # More verbose

# Run command
loongclawd chat

# Or for specific modules
export RUST_LOG=loongclaw_daemon=debug,loongclaw_kernel=trace
```

### Log Output to File

```bash
# Save logs to file
RUST_LOG=debug loongclawd chat 2>&1 | tee loongclaw.log

# Save only errors
RUST_LOG=error loongclawd telegram-serve 2> errors.log
```

### Core Dump

If program crashes, enable core dump:

```bash
# Enable core dump
ulimit -c unlimited

# Run command
loongclawd chat

# Analyze core dump (after crash)
gdb $(which loongclawd) core
```

---

## Performance Issues

### Slow Response

**Possible Causes:**
1. Sliding window set too large
2. Network connection issues
3. Slow model provider response
4. Slow database queries

**Optimization Suggestions:**

```toml
# Reduce sliding window
[memory]
sliding_window = 8

# Optimize provider configuration
[provider]
request_timeout_ms = 30000
retry_max_attempts = 2
retry_initial_backoff_ms = 500

# Use faster model
model = "gpt-4o-mini"  # Faster than gpt-4
```

### High Memory Usage

**Optimization Suggestions:**

```bash
# Reduce WASM cache capacity
export LOONGCLAW_WASM_CACHE_CAPACITY=16

# Reduce sliding window
LOONGCLAW_SLIDING_WINDOW=8 loongclawd chat

# Use custom SQLite path (on disk with sufficient memory)
LOONGCLAW_SQLITE_PATH=/mnt/fast-disk/memory.sqlite3 loongclawd chat
```

### Large Database File

```bash
# Check database size
du -h ~/.loongclaw/memory.sqlite3

# Clean old session data
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations 
  WHERE timestamp < datetime('now', '-30 days');
"

# Compact database
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

---

## Getting Help

### Command Help

```bash
# Main help
loongclawd --help

# Subcommand help
loongclawd chat --help
loongclawd doctor --help
loongclawd validate-config --help

# View all subcommands
loongclawd --help | grep -E "^    [a-z]"
```

### Online Resources

- Official Documentation: https://loongclaw.ai/docs
- GitHub Issues: https://github.com/loongclaw/issues
- Community Support: https://t.me/loongclawai

### Reporting Issues

When submitting an issue, please provide:

1. **Environment Information**
   ```bash
   loongclawd --version
   rustc --version
   uname -a
   ```

2. **Configuration File** (sanitized)
   ```bash
   cat ~/.loongclaw/config.toml | grep -v "api_key"
   ```

3. **Error Logs**
   ```bash
   RUST_LOG=debug loongclawd <command> 2>&1
   ```

4. **Reproduction Steps**
   - Detailed description of operation steps
   - Expected behavior
   - Actual behavior

---

## Quick Checklist

Check order when encountering issues:

1. ✅ Does configuration file exist?
   ```bash
   ls ~/.loongclaw/config.toml
   ```

2. ✅ Are environment variables set?
   ```bash
   env | grep API_KEY
   ```

3. ✅ Can connect to provider?
   ```bash
   loongclawd list-models
   ```

4. ✅ Does diagnostic check pass?
   ```bash
   loongclawd doctor
   ```

5. ✅ Are other processes occupying?
   ```bash
   ps aux | grep loongclawd
   ```

6. ✅ Is disk space sufficient?
   ```bash
   df -h ~/.loongclaw/
   ```

7. ✅ Are there detailed errors in logs?
   ```bash
   RUST_LOG=debug loongclawd <command>
   ```
