---
title: "Tool System"
description: "Guide to using LoongClaw built-in tools"
path: "/docs/tools"
order: 5
---

# Tool System

LoongClaw has a powerful built-in tool runtime that supports safe execution of system commands and file operations.

## Overview

LoongClaw provides the following core tools:

| Tool | Description | Purpose |
|------|-------------|---------|
| `shell.exec` | Execute Shell commands | Run system commands, query information |
| `file.read` | Read files | Read code, configs, logs, etc. |
| `file.write` | Write files | Create or modify files |

## Tool Execution Modes

Tools can be executed in two modes:

1. **Direct Mode**: Bypasses the kernel, suitable for internal calls
2. **Kernel Mode**: Goes through kernel capability checks and auditing, suitable for production

## shell.exec - Execute Shell Commands

### Configuration

Configure allowed commands whitelist in `config.toml`:

```toml
[tools]
shell_allowlist = ["echo", "cat", "ls", "pwd", "grep", "find", "head", "tail", "wc", "sort", "uniq"]
```

### Usage Example

Request command execution in chat:

```bash
you> List files in current directory
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

### Tool Invocation Format

```json
{
  "name": "shell_exec",
  "arguments": {
    "command": "ls",
    "args": ["-la", "/home/user"],
    "cwd": "/home/user"
  }
}
```

### Parameter Description

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | string | Yes | Command to execute |
| `args` | array | No | Command arguments |
| `cwd` | string | No | Working directory |

### Security Restrictions

- Only commands in whitelist are allowed
- Pipes, redirections and other shell features are not supported
- Command execution has time limits
- Output size is limited

### Recommended Whitelist

```toml
[tools]
# Basic commands
shell_allowlist = [
  "echo",      # Output text
  "cat",       # View file contents
  "ls",        # List directory
  "pwd",       # Show current path
  "grep",      # Text search
  "find",      # File search
  "head",      # View file beginning
  "tail",      # View file end
  "wc",        # Count lines/words
  "sort",      # Sort
  "uniq",      # Remove duplicates
  "ps",        # View processes
  "df",        # Disk usage
  "du",        # Directory size
  "curl",      # HTTP requests
  "git"        # Git operations
]
```

## file.read - Read Files

### Configuration

```toml
[tools]
# File operation root directory (defaults to current directory)
file_root = "/home/user/projects"
```

### Usage Example

```bash
you> Read the contents of README.md
loongclaw> I'll read the README.md file.

[Invoking file.read]
```

### Tool Invocation Format

```json
{
  "name": "file_read",
  "arguments": {
    "path": "README.md",
    "max_bytes": 4096,
    "offset": 0
  }
}
```

### Parameter Description

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | Yes | File path (relative to file_root) |
| `max_bytes` | number | No | Max bytes to read (default 4096) |
| `offset` | number | No | Starting offset (default 0) |

### Security Restrictions

- Can only read files under `file_root`
- `..` or absolute paths are prohibited
- File size limits apply
- Sensitive files are automatically filtered

## file.write - Write Files

### Configuration

Shares the same `file_root` configuration with `file.read`:

```toml
[tools]
file_root = "/home/user/projects"
```

### Usage Example

```bash
you> Create a Python file with a sorting function
loongclaw> I'll create a Python file with a sorting function.

[Invoking file.write]
```

### Tool Invocation Format

```json
{
  "name": "file_write",
  "arguments": {
    "path": "sort_example.py",
    "content": "def bubble_sort(arr):\n    \"\"\"\n    Bubble sort algorithm implementation.\n    \n    Args:\n        arr: List to be sorted\n    \n    Returns:\n        Sorted list\n    \"\"\"\n    n = len(arr)\n    for i in range(n):
    for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr\n\n\nif __name__ == \"__main__\":\n    data = [64, 34, 25, 12, 22, 11, 90]\n    print(f\"Original array: {data}\")\n    sorted_data = bubble_sort(data.copy())\n    print(f\"Sorted: {sorted_data}\")\n",
    "create_dirs": true,
    "overwrite": false
  }
}
```

### Parameter Description

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | Yes | File path (relative to file_root) |
| `content` | string | Yes | File content |
| `create_dirs` | boolean | No | Auto-create directories (default false) |
| `overwrite` | boolean | No | Overwrite existing file (default false) |

### Security Restrictions

- Can only write under `file_root`
- `..` or absolute paths are prohibited
- Overwriting critical config files is prohibited
- File size limits apply

## Combining Tools

For complex tasks, tools can be used together:

```bash
you> Create a Python project structure with src directory and __init__.py
loongclaw> I'll help you create a Python project structure.

Step 1: Create directory structure
[Invoking shell.exec]
$ mkdir -p myproject/src

Step 2: Create __init__.py
[Invoking file.write]
Path: myproject/src/__init__.py
Content: # myproject package

Step 3: Create main.py
[Invoking file.write]
Path: myproject/src/main.py
Content: 
def main():
    print("Hello from myproject!")

if __name__ == "__main__":
    main()

Step 4: Verify structure
[Invoking shell.exec]
$ ls -la myproject/src/
total 16
drwxr-xr-x 2 user user 4096 Jan 15 10:00 .
drwxr-xr-x 3 user user 4096 Jan 15 10:00 ..
-rw-r--r-- 1 user user   26 Jan 15 10:00 __init__.py
-rw-r--r-- 1 user user   83 Jan 15 10:00 main.py

Python project structure created successfully!
```

## Troubleshooting

### Command Denied

```
error: tool execution denied: command not in allowlist
```

**Solution**: Add command to whitelist in `config.toml`:

```toml
[tools]
shell_allowlist = ["echo", "cat", "ls", "your-command"]
```

### File Access Denied

```
error: file access denied: path outside allowed root
```

**Solution**: Check `file_root` configuration to ensure target file is within allowed directory:

```toml
[tools]
file_root = "/home/user/projects"
```

### File Already Exists

```
error: file already exists: use overwrite=true to replace
```

**Solution**: Explicitly specify overwrite option, or choose a different filename.

## Best Practices

### 1. Principle of Least Privilege

Only configure necessary commands and directories:

```toml
[tools]
# Configure according to actual needs
shell_allowlist = ["ls", "cat", "grep"]
file_root = "/home/user/safe-projects"
```

### 2. Use Relative Paths

Use paths relative to `file_root` in chat:

```bash
you> Read src/main.py  # ✅ Recommended
you> Read /home/user/projects/src/main.py  # ❌ Not recommended
```

### 3. Read Large Files in Batches

For large files, use `offset` and `max_bytes` to read in batches:

```json
{
  "name": "file_read",
  "arguments": {
    "path": "large_file.log",
    "max_bytes": 4096,
    "offset": 0
  }
}
```

### 4. Verify Tool Invocations

Enable audit logging in production:

```bash
loongclawd run-spec --spec my-spec.json --print-audit
```

## Advanced Configuration

### Custom Tool Behavior

```toml
[tools]
# Shell command configuration
shell_allowlist = ["echo", "cat", "ls"]
shell_timeout_ms = 30000  # Command execution timeout
shell_max_output_bytes = 65536  # Max output size

# File operation configuration
file_root = "/home/user/projects"
file_max_size_bytes = 1048576  # Max file size (1MB)
file_allow_extensions = [".py", ".js", ".ts", ".md", ".txt"]  # Allowed file extensions
file_deny_extensions = [".env", ".key", ".pem"]  # Denied file extensions
```
