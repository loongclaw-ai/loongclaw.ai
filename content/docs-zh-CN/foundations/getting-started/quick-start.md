---
title: "快速开始"
description: "几分钟内运行你的第一个 LoongClaw 任务"
path: "/docs/foundations/getting-started/quick-start"
order: 2
---

# 快速开始

本指南带你完成安装后的第一个 LoongClaw 任务。

## 准备工作

开始前，请确保：

1. LoongClaw 已安装（见 [快速入门](/docs/foundations/getting-started)）
2. API 密钥已设置在环境变量中
3. 配置文件已生成

## 第一步：验证配置

运行诊断命令验证配置：

```bash
loongclaw doctor
```

预期输出显示所有检查通过：

```
✓ 配置文件已找到
✓ 模型配置有效
✓ API 密钥已配置
✓ 记忆系统就绪
```

如果有检查失败，运行：

```bash
loongclaw doctor --fix
```

## 第二步：第一次对话

启动交互式对话会话：

```bash
loongclaw chat
```

你会看到类似提示：

```
loongclaw chat 已启动 (配置=/home/user/.loongclaw/config.toml)
会话=default (输入 /help 查看命令, /exit 退出)
you>
```

### 尝试简单问题

```
you> 法国的首都是什么？
loongclaw> 法国的首都是巴黎。它以埃菲尔铁塔闻名...
```

### 尝试编程问题

```
you> 写一个检查数字是否为素数的 Python 函数
loongclaw> 这是一个检查素数的 Python 函数：

def is_prime(n):
    """检查数字是否为素数。"""
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

## 第三步：使用单次提问

无需进入交互模式即可提问：

```bash
loongclaw ask --message "解释 TCP 和 UDP 的区别"
```

适用于：
- 脚本中的快速问题
- CI/CD 集成
- 自动化工作流

## 第四步：会话管理

### 创建命名会话

会话为不同目的隔离对话：

```bash
# 工作会话
loongclaw chat --session work

# 项目专用会话
loongclaw chat --session my-project

# 学习会话
loongclaw chat --session python-learning
```

### 会话的好处

- **隔离**: 每个会话有独立的历史
- **持久化**: 对话在重启后保留
- **组织**: 为不同任务分离上下文

## 第五步：使用工具

启用工具后，LoongClaw 可以在对话中使用。在 `~/.loongclaw/config.toml` 中配置：

```toml
[tools]
shell_default_mode = "deny"
shell_allow = ["ls", "cat", "echo", "git"]
```

然后在对话中：

```
you> 列出当前目录的文件
loongclaw> 我来帮你列出文件。

[调用 shell.exec]
$ ls -la
total 32
drwxr-xr-x  5 user user 4096 Jan 15 10:00 .
drwxr-xr-x  2 user user 4096 Jan 15 09:50 src
...

当前目录包含：
- src/ 目录
- README.md 文件
```

## 第六步：列出可用模型

查看提供商支持的模型：

```bash
# 文本格式
loongclaw list-models

# JSON 格式
loongclaw list-models --json
```

## 第七步：查看配置

检查当前配置：

```bash
# 验证配置
loongclaw validate-config

# 查看配置文件
cat ~/.loongclaw/config.toml
```

## 常用工作流

### 代码审查会话

```bash
# 启动代码审查会话
loongclaw chat --session code-review

you> 审查这段代码的潜在问题：
... [粘贴代码]
```

### 学习会话

```bash
# 启动学习会话
loongclaw chat --session rust-learning

you> 解释 Rust 的借用和所有权模型
```

### 快速脚本

```bash
# 单次任务
loongclaw ask --message "生成一个备份目录的 bash 脚本"
```

## 键盘快捷键

| 快捷键 | 操作 |
|--------|------|
| `Enter` | 发送消息 |
| `Shift+Enter` | 换行（多行输入） |
| `Ctrl+C` | 取消当前输入 |
| `Ctrl+D` | 退出对话 |

## 对话命令参考

| 命令 | 说明 |
|------|------|
| `/help` | 显示帮助消息 |
| `/history` | 显示对话历史 |
| `/exit`、`/quit`、`/q` | 退出对话会话 |

## 下一步

完成快速开始后：

1. **[配置模型提供商](/docs/connectivity/providers)** - 设置更多 LLM 提供商
2. **[配置通信渠道](/docs/connectivity/channels)** - 设置 Telegram 或飞书集成
3. **[启用工具](/docs/runtime/tools)** - 配置 Shell、文件和浏览器工具
4. **[记忆设置](/docs/runtime/memory)** - 调整会话和记忆设置

## 故障排除快速指南

### 对话无响应

1. 检查 API 密钥: `echo $OPENAI_API_KEY`
2. 运行诊断: `loongclaw doctor`
3. 检查网络连接

### 工具不工作

1. 验证工具在 `config.toml` 中配置
2. 检查 Shell 命令在允许列表中
3. 运行 `loongclaw validate-config` 检查配置

### 会话历史丢失

1. 验证 SQLite 路径配置
2. 检查数据库文件: `ls ~/.loongclaw/memory.sqlite3`
3. 确认使用相同的会话名称