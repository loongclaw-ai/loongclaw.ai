---
title: "工具系统"
description: "内置工具：Shell 执行、文件操作和网络访问"
path: "/docs/runtime/tools"
order: 6
---

# 工具系统

LoongClaw 提供内置工具用于与系统和网络交互。

## 概述

| 工具 | 说明 | 安全等级 |
|------|------|----------|
| `shell.exec` | 执行 Shell 命令 | 高风险 |
| `file.read` | 读取文件内容 | 中风险 |
| `file.write` | 写入文件 | 中风险 |
| `browser` | 浏览器自动化 | 中风险 |
| `web` | 获取网页内容 | 低风险 |
| `web_search` | 搜索网络 | 低风险 |

## 安全模型

LoongClaw 采用**默认拒绝**的安全模型：

- **Shell 命令**：只有明确允许的命令才能执行
- **文件访问**：限制在配置的根目录内
- **网络**：可以限制 Web 访问的域名

## Shell 工具

从对话中执行 Shell 命令。

### 配置

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "git", "grep", "find"]
shell_deny = ["rm", "sudo", "chmod"]
```

| 选项 | 说明 |
|------|------|
| `shell_default_mode` | 默认策略：`allow` 或 `deny` |
| `shell_allow` | 白名单命令 |
| `shell_deny` | 黑名单命令 |

### 推荐白名单

```toml
[tools]
shell_allow = [
  # 文件查看
  "ls", "cat", "head", "tail", "less",
  # 搜索
  "grep", "find", "rg",
  # 版本控制
  "git",
  # 实用工具
  "echo", "pwd", "which", "date",
  # 开发
  "cargo", "npm", "python", "node", "go"
]
```

### 使用示例

```
you> 列出当前目录的文件
loongclaw> 我来帮你列出文件。

[调用 shell.exec]
$ ls -la
total 32
drwxr-xr-x  5 user user 4096 Jan 15 10:00 .
drwxr-xr-x  2 user user 4096 Jan 15 09:50 src
-rw-r--r--  1 user user  220 Jan 15 09:50 README.md

当前目录包含：
- src/ 目录
- README.md 文件
```

### 安全限制

- 只有白名单中的命令可以执行
- 管道符（`|`）和重定向（`>`）被阻止
- 后台执行（`&`）被阻止
- 命令有时间和输出限制

## 文件工具

从对话中读写文件。

### 配置

```toml
[tools]
file_root = "/home/user/projects"
```

| 选项 | 说明 |
|------|------|
| `file_root` | 文件操作的根目录 |

### file.read

读取文件内容：

```
you> 读取 src/main.rs 的内容
loongclaw> 我来读取这个文件。

[调用 file.read]
fn main() {
    println!("Hello, world!");
}
```

### file.write

写入文件内容：

```
you> 创建一个打印 hello 的 Python 脚本
loongclaw> 我来创建这个脚本。

[调用 file.write]
已创建：hello.py

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
```

### 安全限制

- 只能访问 `file_root` 下的文件
- 路径穿越（`..`）被阻止
- 根目录外的绝对路径被阻止
- 敏感文件（`.env`、`.key`）被过滤

## 浏览器工具

用于网络交互的浏览器自动化。

### 配置

```toml
[tools.browser]
enabled = true
max_sessions = 8
max_links = 40
max_text_chars = 6000
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `enabled` | `true` | 启用浏览器工具 |
| `max_sessions` | `8` | 最大浏览器会话数 |
| `max_links` | `40` | 最大提取链接数 |
| `max_text_chars` | `6000` | 最大文本字符数 |

### 使用

```
you> 打开 google.com 搜索 "Rust 编程"
loongclaw> 我来帮你搜索。

[调用 browser.navigate]
导航到：https://google.com

[调用 browser.type]
输入：Rust 编程

[调用 browser.click]
点击搜索按钮

找到了 Rust 编程语言的相关结果...
```

## Web 获取工具

从网络 URL 获取内容。

### 配置

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

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `enabled` | `true` | 启用 Web 获取 |
| `allow_private_hosts` | `false` | 允许私有 IP 地址 |
| `allowed_domains` | `[]` | 域名白名单 |
| `blocked_domains` | `[]` | 域名黑名单 |
| `max_bytes` | `1048576` | 最大响应大小 |
| `timeout_seconds` | `15` | 请求超时 |
| `max_redirects` | `3` | 最大重定向次数 |

### 域名限制

```toml
[tools.web]
# 只允许特定域名
allowed_domains = ["docs.python.org", "github.com"]

# 或阻止敏感域名
blocked_domains = ["*.internal.company.com", "localhost"]
```

### 使用

```
you> 获取 https://example.com 的内容
loongclaw> 我来获取这个页面。

[调用 web.fetch]
获取：https://example.com

来自 example.com 的内容：
...
```

## 网络搜索工具

使用搜索引擎搜索网络。

### 配置

```toml
[tools.web_search]
enabled = true
default_provider = "duckduckgo"
timeout_seconds = 30
max_results = 5
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `enabled` | `true` | 启用网络搜索 |
| `default_provider` | `"duckduckgo"` | 提供商：`duckduckgo`、`brave`、`tavily` |
| `timeout_seconds` | `30` | 请求超时 |
| `max_results` | `5` | 最大结果数 |

### 提供商

**DuckDuckGo（默认）：**
```toml
[tools.web_search]
default_provider = "duckduckgo"
```

**Brave Search：**
```toml
[tools.web_search]
default_provider = "brave"
brave_api_key_env = "BRAVE_API_KEY"
```

**Tavily：**
```toml
[tools.web_search]
default_provider = "tavily"
tavily_api_key_env = "TAVILY_API_KEY"
```

### 使用

```
you> 搜索 "如何学习 Rust"
loongclaw> 我来搜索。

[调用 web_search.search]
查询：如何学习 Rust

结果：
1. The Rust Programming Language - rust-lang.org
2. Rust by Example - doc.rust-lang.org
3. Learn Rust - rust-lang.org/learn
...
```

## 会话工具

管理对话会话。

### 配置

```toml
[tools.sessions]
enabled = true
visibility = "children"
list_limit = 100
history_limit = 200
```

## 委托工具

为子任务生成子代理。

### 配置

```toml
[tools.delegate]
enabled = true
max_depth = 1
max_active_children = 5
timeout_seconds = 60
child_tool_allowlist = ["file.read", "file.write"]
allow_shell_in_child = false
```

## 工具审批

配置工具执行的工作流审批：

```toml
[tools.approval]
mode = "disabled"  # "disabled"、"medium_balanced"、"strict"
approved_calls = []
denied_calls = []
```

## 最佳实践

### 1. 最小权限

只启用需要的工具：

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat"]  # 最小集合
file_root = "/home/user/sandbox"
```

### 2. 网络安全

限制网络访问：

```toml
[tools.web]
allow_private_hosts = false
blocked_domains = ["*.internal", "*.local"]
```

### 3. 审计工具使用

启用审计日志：

```toml
[audit]
mode = "fanout"
path = "~/.loongclaw/audit/events.jsonl"
```

## 故障排除

### 命令被拒绝

```
error: tool execution denied: command not in allowlist
```

**解决方案：** 将命令添加到白名单：

```toml
[tools]
shell_allow = ["ls", "cat", "your-command"]
```

### 文件访问被拒绝

```
error: file access denied: path outside allowed root
```

**解决方案：** 检查 `file_root` 配置：

```toml
[tools]
file_root = "/home/user/projects"
```

### Web 获取被阻止

```
error: domain blocked
```

**解决方案：** 更新域名配置：

```toml
[tools.web]
allowed_domains = ["example.com"]
# 或从 blocked_domains 中移除
```