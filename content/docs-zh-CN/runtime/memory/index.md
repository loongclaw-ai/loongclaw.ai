---
title: "会话与记忆"
description: "会话管理和对话记忆配置"
path: "/docs/runtime/memory"
order: 7
---

# 会话与记忆

LoongClaw 提供基于 SQLite 后端的持久化对话记忆和会话管理。

## 概述

- **持久化**：对话在重启后保留
- **会话**：为不同目的隔离对话
- **滑动窗口**：控制上下文大小
- **记忆配置**：不同的记忆策略

## 快速开始

```bash
# 使用默认会话启动对话
loongclaw chat

# 使用命名会话启动
loongclaw chat --session my-project

# 检查记忆数据库
ls ~/.loongclaw/memory.sqlite3
```

## 会话管理

### 什么是会话？

会话为不同目的隔离对话：

- **不同主题**：工作、个人、学习
- **不同项目**：每个项目有自己的上下文
- **不同工作流**：编程、写作、分析

### 命名会话

```bash
# 工作会话
loongclaw chat --session work

# 项目专用会话
loongclaw chat --session rust-project

# 学习会话
loongclaw chat --session python-learning
```

### 会话隔离

每个会话有：
- 独立的对话历史
- 分离的记忆上下文
- 隔离的工具执行状态

## 记忆配置

### 基本配置

```toml
[memory]
backend = "sqlite"
sqlite_path = "~/.loongclaw/memory.sqlite3"
sliding_window = 12
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `backend` | `"sqlite"` | 记忆后端 |
| `sqlite_path` | `~/.loongclaw/memory.sqlite3` | 数据库路径 |
| `sliding_window` | `12` | 保留的轮数 |
| `profile` | `"window_only"` | 记忆配置 |
| `fail_open` | `true` | 出错时继续 |

### 滑动窗口

滑动窗口控制保留多少上下文：

```toml
[memory]
sliding_window = 12  # 保留最近 12 轮
```

**选择窗口大小：**

| 用途 | 推荐大小 |
|------|----------|
| 快速问答 | 6-8 |
| 代码审查 | 16-20 |
| 长任务 | 24-32 |
| 扩展会话 | 48-64 |

### 记忆配置

```toml
[memory]
profile = "window_only"  # "window_only"、"window_plus_summary"、"profile_plus_window"
```

| 配置 | 说明 |
|------|------|
| `window_only` | 只保留最近 N 轮 |
| `window_plus_summary` | 窗口 + 定期摘要 |
| `profile_plus_window` | 长期配置 + 窗口 |

## 对话设置

### 上下文压缩

```toml
[conversation]
compact_enabled = true
compact_min_messages = 100
compact_trigger_estimated_tokens = 8000
compact_fail_open = true
```

### 轮次循环控制

```toml
[conversation.turn_loop]
max_rounds = 4
max_tool_steps_per_round = 1
max_repeated_tool_call_rounds = 2
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `max_rounds` | `4` | 最大对话轮数 |
| `max_tool_steps_per_round` | `1` | 每轮最大工具调用数 |
| `max_repeated_tool_call_rounds` | `2` | 重复调用的最大轮数 |

## 环境变量

运行时覆盖记忆设置：

```bash
# 自定义数据库路径
LOONGCLAW_SQLITE_PATH=/custom/path/memory.db loongclaw chat

# 调整滑动窗口
LOONGCLAW_SLIDING_WINDOW=20 loongclaw chat

# 覆盖上下文引擎
LOONGCLAW_CONTEXT_ENGINE=custom-engine loongclaw chat

# 覆盖记忆系统
LOONGCLAW_MEMORY_SYSTEM=custom-system loongclaw chat
```

## 数据库管理

### 检查数据库

```bash
# 检查大小
du -h ~/.loongclaw/memory.sqlite3

# 列出会话
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"

# 统计消息数
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT COUNT(*) FROM conversations;"
```

### 清理旧会话

```bash
# 删除特定会话
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE session_id NOT IN ('work', 'personal');
"

# 删除旧消息（30 天前）
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"
```

### 压缩数据库

```bash
# 回收空间
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### 备份数据库

```bash
# 简单备份
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3

# SQLite 备份
sqlite3 ~/.loongclaw/memory.sqlite3 ".backup ~/.loongclaw/memory.backup.sqlite3"
```

### 修复数据库

```bash
# 从损坏的数据库恢复
sqlite3 ~/.loongclaw/memory.sqlite3 ".recover" | sqlite3 ~/.loongclaw/memory.fixed.sqlite3
mv ~/.loongclaw/memory.fixed.sqlite3 ~/.loongclaw/memory.sqlite3
```

## 列出系统

```bash
# 列出上下文引擎
loongclaw list-context-engines --json

# 列出记忆系统
loongclaw list-memory-systems --json
```

## 最佳实践

### 1. 使用有意义的会话名称

```bash
# 推荐
loongclaw chat --session rust-learning
loongclaw chat --session project-xyz-backend

# 避免
loongclaw chat --session a
loongclaw chat --session temp
```

### 2. 选择适当的窗口大小

```toml
# 用于编程任务
[memory]
sliding_window = 20

# 用于快速问答
[memory]
sliding_window = 8
```

### 3. 定期维护

```bash
# 每周清理
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-7 days');
"
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### 4. 备份重要会话

```bash
# 在重大更改之前
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.pre-change.sqlite3
```

## 故障排除

### 数据库锁定

```
error: database is locked
```

**解决方案：**
```bash
# 查找其他进程
ps aux | grep loongclaw

# 删除锁文件
rm ~/.loongclaw/memory.sqlite3-journal
rm ~/.loongclaw/memory.sqlite3-wal
```

### 会话历史丢失

**检查：**
1. SQLite 路径配置
2. 数据库文件是否存在
3. 会话名称是否正确

```bash
# 验证数据库
ls -la ~/.loongclaw/memory.sqlite3

# 检查会话
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"
```

### 数据库过大

**症状：**
- 响应时间慢
- 磁盘使用高

**解决方案：**
```bash
# 检查大小
du -h ~/.loongclaw/memory.sqlite3

# 清理旧数据
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"

# 回收空间
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

### 记忆不持久化

**检查：**
1. `fail_open` 设置
2. 数据库权限
3. 磁盘空间

```bash
# 检查权限
ls -la ~/.loongclaw/

# 检查磁盘空间
df -h ~/.loongclaw/
```