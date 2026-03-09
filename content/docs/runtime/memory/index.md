---
title: "Memory & Sessions"
description: "Session management and conversation memory configuration"
path: "/docs/runtime/memory"
order: 7
---

# Memory & Sessions

LoongClaw provides persistent conversation memory with SQLite backend and session management.

## Overview

- **Persistence**: Conversations saved across restarts
- **Sessions**: Isolate conversations for different purposes
- **Sliding Window**: Control context size
- **Memory Profiles**: Different memory strategies

## Quick Start

```bash
# Start chat with default session
loongclaw chat

# Start with named session
loongclaw chat --session my-project

# Check memory database
ls ~/.loongclaw/memory.sqlite3
```

## Session Management

### What Are Sessions?

Sessions isolate conversations for different purposes:

- **Different topics**: Work, personal, learning
- **Different projects**: Each project has its own context
- **Different workflows**: Coding, writing, analysis

### Named Sessions

```bash
# Work session
loongclaw chat --session work

# Project-specific session
loongclaw chat --session rust-project

# Learning session
loongclaw chat --session python-learning
```

### Session Isolation

Each session has:
- Independent conversation history
- Separate memory context
- Isolated tool execution state

## Memory Configuration

### Basic Configuration

```toml
[memory]
backend = "sqlite"
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12
```

| Option | Default | Description |
|--------|---------|-------------|
| `backend` | `"sqlite"` | Memory backend |
| `sqlite_path` | `~/.loongclaw/memory.sqlite3` | Database path |
| `sliding_window` | `12` | Number of turns to keep |
| `profile` | `"window_only"` | Memory profile |
| `fail_open` | `true` | Continue on errors |

### Sliding Window

The sliding window controls how much context is retained:

```toml
[memory]
sliding_window = 12  # Keep last 12 turns
```

**Choosing Window Size:**

| Use Case | Recommended Size |
|----------|------------------|
| Quick Q&A | 6-8 |
| Code review | 16-20 |
| Long tasks | 24-32 |
| Extended sessions | 48-64 |

### Memory Profiles

```toml
[memory]
profile = "window_only"  # "window_only", "window_plus_summary", "profile_plus_window"
```

| Profile | Description |
|---------|-------------|
| `window_only` | Keep only last N turns |
| `window_plus_summary` | Window + periodic summaries |
| `profile_plus_window` | Long-term profile + window |

## Conversation Settings

### Context Compaction

```toml
[conversation]
compact_enabled = true
compact_min_messages = 100
compact_trigger_estimated_tokens = 8000
compact_fail_open = true
```

### Turn Loop Control

```toml
[conversation.turn_loop]
max_rounds = 4
max_tool_steps_per_round = 1
max_repeated_tool_call_rounds = 2
```

| Option | Default | Description |
|--------|---------|-------------|
| `max_rounds` | `4` | Maximum conversation rounds |
| `max_tool_steps_per_round` | `1` | Maximum tool calls per round |
| `max_repeated_tool_call_rounds` | `2` | Max rounds for repeated calls |

## Environment Variables

Override memory settings at runtime:

```bash
# Custom database path
LOONGCLAW_SQLITE_PATH=/custom/path/memory.db loongclaw chat

# Adjust sliding window
LOONGCLAW_SLIDING_WINDOW=20 loongclaw chat

# Override context engine
LOONGCLAW_CONTEXT_ENGINE=custom-engine loongclaw chat

# Override memory system
LOONGCLAW_MEMORY_SYSTEM=custom-system loongclaw chat
```

## Database Management

### Check Database

```bash
# Check size
du -h ~/.loongclaw/memory.sqlite3

# List sessions
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"

# Count messages
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT COUNT(*) FROM conversations;"
```

### Clean Old Sessions

```bash
# Remove specific sessions
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE session_id NOT IN ('work', 'personal');
"

# Remove old messages (older than 30 days)
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"
```

### Compact Database

```bash
# Reclaim space
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### Backup Database

```bash
# Simple backup
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3

# SQLite backup
sqlite3 ~/.loongclaw/memory.sqlite3 ".backup ~/.loongclaw/memory.backup.sqlite3"
```

### Repair Database

```bash
# Recover from corrupted database
sqlite3 ~/.loongclaw/memory.sqlite3 ".recover" | sqlite3 ~/.loongclaw/memory.fixed.sqlite3
mv ~/.loongclaw/memory.fixed.sqlite3 ~/.loongclaw/memory.sqlite3
```

## Listing Systems

```bash
# List context engines
loongclaw list-context-engines --json

# List memory systems
loongclaw list-memory-systems --json
```

## Best Practices

### 1. Use Meaningful Session Names

```bash
# Good
loongclaw chat --session rust-learning
loongclaw chat --session project-xyz-backend

# Avoid
loongclaw chat --session a
loongclaw chat --session temp
```

### 2. Choose Appropriate Window Size

```toml
# For coding tasks
[memory]
sliding_window = 20

# For quick Q&A
[memory]
sliding_window = 8
```

### 3. Regular Maintenance

```bash
# Weekly cleanup
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-7 days');
"
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### 4. Backup Important Sessions

```bash
# Before major changes
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.pre-change.sqlite3
```

## Troubleshooting

### Database Locked

```
error: database is locked
```

**Solution:**
```bash
# Find other processes
ps aux | grep loongclaw

# Remove lock files
rm ~/.loongclaw/memory.sqlite3-journal
rm ~/.loongclaw/memory.sqlite3-wal
```

### Session History Lost

**Check:**
1. SQLite path configuration
2. Database file exists
3. Session name is correct

```bash
# Verify database
ls -la ~/.loongclaw/memory.sqlite3

# Check sessions
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"
```

### Large Database

**Symptoms:**
- Slow response times
- High disk usage

**Solutions:**
```bash
# Check size
du -h ~/.loongclaw/memory.sqlite3

# Clean old data
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"

# Reclaim space
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### Memory Not Persisting

**Check:**
1. `fail_open` setting
2. Database permissions
3. Disk space

```bash
# Check permissions
ls -la ~/.loongclaw/

# Check disk space
df -h ~/.loongclaw/
```