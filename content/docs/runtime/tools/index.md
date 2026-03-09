---
title: "Tools"
description: "Built-in tools for shell execution, file operations, and web access"
path: "/docs/runtime/tools"
order: 6
---

# Tools

LoongClaw provides built-in tools for interacting with your system and the web.

## Overview

| Tool | Description | Security Level |
|------|-------------|----------------|
| `shell.exec` | Execute shell commands | High Risk |
| `file.read` | Read file contents | Medium Risk |
| `file.write` | Write to files | Medium Risk |
| `browser` | Browser automation | Medium Risk |
| `web` | Fetch web content | Low Risk |
| `web_search` | Search the web | Low Risk |

## Security Model

LoongClaw uses a **deny-by-default** security model:

- **Shell commands**: Only explicitly allowed commands can execute
- **File access**: Limited to configured root directory
- **Network**: Can restrict domains for web access

## Shell Tool

Execute shell commands from conversations.

### Configuration

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "git", "grep", "find"]
shell_deny = ["rm", "sudo", "chmod"]
```

| Option | Description |
|--------|-------------|
| `shell_default_mode` | Default policy: `allow` or `deny` |
| `shell_allow` | Commands on the allowlist |
| `shell_deny` | Commands on the denylist |

### Recommended Allowlist

```toml
[tools]
shell_allow = [
  # File inspection
  "ls", "cat", "head", "tail", "less",
  # Search
  "grep", "find", "rg",
  # Version control
  "git",
  # Utilities
  "echo", "pwd", "which", "date",
  # Development
  "cargo", "npm", "python", "node", "go"
]
```

### Usage Example

```
you> List files in the current directory
loongclaw> I'll list the files for you.

[Invoking shell.exec]
$ ls -la
total 32
drwxr-xr-x  5 user user 4096 Jan 15 10:00 .
drwxr-xr-x  2 user user 4096 Jan 15 09:50 src
-rw-r--r--  1 user user  220 Jan 15 09:50 README.md

Current directory contains:
- src/ directory
- README.md file
```

### Security Restrictions

- Only commands in allowlist can execute
- Pipes (`|`) and redirections (`>`) are blocked
- Background execution (`&`) is blocked
- Commands have time and output limits

## File Tools

Read and write files from conversations.

### Configuration

```toml
[tools]
file_root = "/home/user/projects"
```

| Option | Description |
|--------|-------------|
| `file_root` | Root directory for file operations |

### file.read

Read file contents:

```
you> Read the contents of src/main.rs
loongclaw> I'll read that file for you.

[Invoking file.read]
fn main() {
    println!("Hello, world!");
}
```

### file.write

Write content to files:

```
you> Create a Python script that prints hello
loongclaw> I'll create that script.

[Invoking file.write]
Created: hello.py

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
```

### Security Restrictions

- Can only access files under `file_root`
- Path traversal (`..`) is blocked
- Absolute paths outside root are blocked
- Sensitive files (`.env`, `.key`) are filtered

## Browser Tool

Browser automation for web interaction.

### Configuration

```toml
[tools.browser]
enabled = true
max_sessions = 8
max_links = 40
max_text_chars = 6000
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable browser tool |
| `max_sessions` | `8` | Maximum browser sessions |
| `max_links` | `40` | Maximum links to extract |
| `max_text_chars` | `6000` | Maximum text characters |

### Usage

```
you> Open google.com and search for "Rust programming"
loongclaw> I'll help you search.

[Invoking browser.navigate]
Navigating to: https://google.com

[Invoking browser.type]
Typing: Rust programming

[Invoking browser.click]
Clicking search button

Found results about Rust programming language...
```

## Web Fetch Tool

Fetch content from web URLs.

### Configuration

```toml
[tools.web]
enabled = true
allow_private_hosts = false
allowed_domains = []
blocked_domains = []
max_bytes = 1048576
timeout_seconds = 15
max_redirects = 3
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable web fetch |
| `allow_private_hosts` | `false` | Allow private IP addresses |
| `allowed_domains` | `[]` | Whitelist domains |
| `blocked_domains` | `[]` | Blacklist domains |
| `max_bytes` | `1048576` | Maximum response size |
| `timeout_seconds` | `15` | Request timeout |
| `max_redirects` | `3` | Maximum redirects |

### Domain Restrictions

```toml
[tools.web]
# Allow only specific domains
allowed_domains = ["docs.python.org", "github.com"]

# Or block sensitive domains
blocked_domains = ["*.internal.company.com", "localhost"]
```

### Usage

```
you> Fetch the content from https://example.com
loongclaw> I'll fetch that page.

[Invoking web.fetch]
Fetching: https://example.com

Content from example.com:
...
```

## Web Search Tool

Search the web using search engines.

### Configuration

```toml
[tools.web_search]
enabled = true
default_provider = "duckduckgo"
timeout_seconds = 30
max_results = 5
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable web search |
| `default_provider` | `"duckduckgo"` | Provider: `duckduckgo`, `brave`, `tavily` |
| `timeout_seconds` | `30` | Request timeout |
| `max_results` | `5` | Maximum results |

### Providers

**DuckDuckGo (default):**
```toml
[tools.web_search]
default_provider = "duckduckgo"
```

**Brave Search:**
```toml
[tools.web_search]
default_provider = "brave"
brave_api_key_env = "BRAVE_API_KEY"
```

**Tavily:**
```toml
[tools.web_search]
default_provider = "tavily"
tavily_api_key_env = "TAVILY_API_KEY"
```

### Usage

```
you> Search for "how to learn Rust"
loongclaw> I'll search for that.

[Invoking web_search.search]
Query: how to learn Rust

Results:
1. The Rust Programming Language - rust-lang.org
2. Rust by Example - doc.rust-lang.org
3. Learn Rust - rust-lang.org/learn
...
```

## Sessions Tool

Manage conversation sessions.

### Configuration

```toml
[tools.sessions]
enabled = true
visibility = "children"
list_limit = 100
history_limit = 200
```

## Delegate Tool

Spawn child agents for subtasks.

### Configuration

```toml
[tools.delegate]
enabled = true
max_depth = 1
max_active_children = 5
timeout_seconds = 60
child_tool_allowlist = ["file.read", "file.write"]
allow_shell_in_child = false
```

## Tool Approval

Configure approval workflow for tool execution:

```toml
[tools.approval]
mode = "disabled"  # "disabled", "medium_balanced", "strict"
approved_calls = []
denied_calls = []
```

## Best Practices

### 1. Least Privilege

Only enable tools you need:

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat"]  # Minimal set
file_root = "/home/user/sandbox"
```

### 2. Network Security

Restrict web access:

```toml
[tools.web]
allow_private_hosts = false
blocked_domains = ["*.internal", "*.local"]
```

### 3. Audit Tool Usage

Enable audit logging:

```toml
[audit]
mode = "fanout"
path = "~/.loongclaw/audit/events.jsonl"
```

## Troubleshooting

### Command Denied

```
error: tool execution denied: command not in allowlist
```

**Solution:** Add command to allowlist:

```toml
[tools]
shell_allow = ["ls", "cat", "your-command"]
```

### File Access Denied

```
error: file access denied: path outside allowed root
```

**Solution:** Check `file_root` configuration:

```toml
[tools]
file_root = "/home/user/projects"
```

### Web Fetch Blocked

```
error: domain blocked
```

**Solution:** Update domain configuration:

```toml
[tools.web]
allowed_domains = ["example.com"]
# Or remove from blocked_domains
```