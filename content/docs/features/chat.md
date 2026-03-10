---
title: "Chat"
description: "LoongClaw interactive chat and session management"
path: "/docs/chat"
order: 4
---

# Chat

LoongClaw provides powerful interactive chat functionality with multi-session management and persistent storage.

## Basic Usage

Start interactive CLI chat:

```bash
$ loongclawd chat
loongclaw chat started (config=/home/user/.loongclaw/config.toml, memory=/home/user/.loongclaw/memory.sqlite3)
session=default (type /help for commands, /exit to quit)
you> Hello!
loongclaw> Hello! I'm happy to serve you. What can I help you with?
```

## Startup Options

```bash
# Use default configuration
loongclawd chat

# Use specific configuration file
loongclawd chat --config /path/to/config.toml

# Specify session ID
loongclawd chat --session my-session

# Specify working directory
loongclawd chat --file-root /path/to/workdir
```

## Chat Commands

The following commands can be used during chat:

| Command | Description |
|---------|-------------|
| `/help` | Show help information |
| `/history` | Show current session history |
| `/exit` or `/quit` | Exit chat |

### View History Example

```bash
you> /history
[2024-01-15T10:30:00Z] user: Hello!
[2024-01-15T10:30:05Z] assistant: Hello! I'm happy to serve you...
[2024-01-15T10:30:10Z] user: Can you write a Python function for me?
[2024-01-15T10:30:15Z] assistant: Of course! What kind of function do you need?
```

## Session Management

### Session Persistence

Sessions use SQLite persistent storage with multi-session isolation:

```bash
# Work session
loongclawd chat --session work

# Personal session
loongclawd chat --session personal

# Project-specific session
loongclawd chat --session project-xyz
```

Each session has independent conversation history stored in the SQLite database.

### Session Isolation

Conversation history is completely isolated between different sessions:

- `work` session: Work-related conversations
- `personal` session: Personal chats
- `project-xyz` session: Technical discussions for specific projects

## Memory Mechanism

### Sliding Window

Uses sliding window mechanism by default to manage conversation history:

```toml
[memory]
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12  # Keep the last 12 conversation rounds
```

### How It Works

- Only keeps the last N rounds of conversation (configured by `sliding_window`)
- Automatically cleans old data to control database size
- Each session is stored independently

### Environment Variable Overrides

```bash
# Use custom database path
LOONGCLAW_SQLITE_PATH=/custom/path/memory.db loongclawd chat

# Increase sliding window size
LOONGCLAW_SLIDING_WINDOW=20 loongclawd chat
```

## Tool Invocation

During chat, LoongClaw can invoke configured tools:

```bash
you> List files in the current directory
loongclaw> I'll help you list files in the current directory.

[Invoking shell.exec]
$ ls -la
total 32
drwxr-xr-x  5 user user 4096 Jan 15 10:00 .
drwxr-xr-x  2 user user 4096 Jan 15 09:50 src
drwxr-xr-x  2 user user 4096 Jan 15 09:50 docs
-rw-r--r--  1 user user  220 Jan 15 09:50 README.md

Current directory contains:
- src/ directory
- docs/ directory
- README.md file
```

## Configuration Options

### CLI Configuration

```toml
[cli]
enabled = true
system_prompt = "You are LoongClaw, a helpful assistant."
exit_commands = ["exit", "quit", "/exit"]
```

### Conversation Loop Configuration

```toml
[conversation.turn_loop]
max_rounds = 4                                    # Max conversations per round
max_tool_steps_per_round = 1                      # Max tool invocations per round
max_repeated_tool_call_rounds = 2                 # Max rounds for repeated tool calls
max_ping_pong_cycles = 2                          # Max ping-pong cycles
max_same_tool_failure_rounds = 2                  # Max failures for the same tool
max_followup_tool_payload_chars = 8000           # Max chars for follow-up tool payload
max_followup_tool_payload_chars_total = 32000    # Total max chars for follow-up tool payload
```

## Multi-line Input

Supports multi-line input (use Shift+Enter for new lines):

```bash
you> Please write a Python function for me,
... requirements:
... 1. Accept a list parameter
... 2. Return max and min values from the list
... 3. Handle empty list case
loongclaw> Here's a Python function that meets your requirements:

def get_min_max(numbers):
    """
    Return min and max values from the list.
    
    Args:
        numbers: List of numbers
    
    Returns:
        tuple: (min_value, max_value) or None (if list is empty)
    """
    if not numbers:
        return None
    return min(numbers), max(numbers)
```

## Best Practices

### 1. Use Meaningful Session Names

```bash
# Good practice
loongclawd chat --session python-learning
loongclawd chat --session project-debug

# Avoid
loongclawd chat --session a
loongclawd chat --session temp
```

### 2. Regularly Clean Old Sessions

Since SQLite files can grow, it's recommended to periodically clean up unnecessary session data:

```bash
# Backup before cleaning
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3
sqlite3 ~/.loongclaw/memory.sqlite3 "DELETE FROM conversations WHERE session_id NOT IN ('work', 'personal');"
```

### 3. Configure Appropriate Sliding Window

Adjust sliding window size based on usage scenarios:

```toml
# Code review: needs more context
[memory]
sliding_window = 20

# Daily Q&A: smaller window is sufficient
[memory]
sliding_window = 8
```

## Troubleshooting

### Database is Locked

```bash
error: database is locked
```

Solution: Close other LoongClaw processes or delete the lock file:

```bash
rm ~/.loongclaw/memory.sqlite3-journal
```

### Session History Lost

Check if SQLite path configuration is correct:

```bash
# View current configuration
cat ~/.loongclaw/config.toml | grep sqlite_path

# Verify database file exists
ls -la ~/.loongclaw/memory.sqlite3
```

### Slow Chat Response

Possible causes:
1. Sliding window set too large
2. Network connection issues
3. Model provider response slow

Optimization suggestions:

```toml
[memory]
sliding_window = 8  # Reduce window size

[provider]
request_timeout_ms = 30000  # Reduce timeout
retry_max_attempts = 2      # Reduce retry attempts
```
