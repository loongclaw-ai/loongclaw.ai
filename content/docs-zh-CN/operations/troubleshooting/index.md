---
title: "故障排除"
description: "常见问题、诊断命令和解决方案"
path: "/docs/operations/troubleshooting"
order: 9
---

# 故障排除

本指南帮助你诊断和解决使用 LoongClaw 时的常见问题。

## 快速诊断

```bash
# 运行完整诊断
loongclaw doctor

# 自动修复问题
loongclaw doctor --fix

# JSON 输出用于脚本
loongclaw doctor --json
```

## 常见问题

### 1. 配置未找到

**错误：**
```
error: failed to read config /home/user/.loongclaw/config.toml
```

**原因：**
- 配置文件未生成
- 配置文件路径不正确
- 文件权限问题

**解决方案：**
```bash
# 生成配置
loongclaw onboard

# 指定自定义路径
loongclaw chat --config /path/to/config.toml

# 检查权限
ls -la ~/.loongclaw/config.toml
chmod 600 ~/.loongclaw/config.toml
```

---

### 2. API 密钥无效

**错误：**
```
error: provider authentication failed
error: invalid api key or insufficient permissions
```

**原因：**
- 环境变量未设置
- API 密钥格式不正确
- API 密钥过期或被撤销

**解决方案：**
```bash
# 检查环境变量
echo $OPENAI_API_KEY

# 验证变量已导出
env | grep OPENAI

# 重新设置环境变量
export OPENAI_API_KEY="sk-..."

# 运行诊断
loongclaw doctor --fix

# 测试连接
loongclaw list-models
```

---

### 3. 工具执行被拒绝

**错误：**
```
error: tool execution denied: command not in allowlist
error: file access denied: path outside allowed root
```

**原因：**
- 命令不在白名单中
- 文件路径在允许目录外
- 未授予能力

**解决方案：**

在 `config.toml` 中添加命令到白名单：

```toml
[tools]
shell_allow = ["echo", "cat", "ls", "your-command"]

# 或使用 allow 模式（不推荐）
shell_default_mode = "allow"
```

设置正确的文件根目录：

```toml
[tools]
file_root = "/home/user/projects"
```

---

### 4. 记忆数据库锁定

**错误：**
```
error: database is locked
```

**原因：**
- 另一个 LoongClaw 进程正在使用数据库
- 异常退出留下的锁文件

**解决方案：**
```bash
# 查找其他进程
ps aux | grep loongclaw

# 如需要则终止
kill -15 <pid>

# 删除锁文件
rm ~/.loongclaw/memory.sqlite3-journal
rm ~/.loongclaw/memory.sqlite3-wal

# 如果持续存在，备份并重建
cp ~/.loongclaw/memory.sqlite3 ~/.loongclaw/memory.backup.sqlite3
rm ~/.loongclaw/memory.sqlite3
```

---

### 5. Telegram 连接失败

**错误：**
```
error: failed to connect to Telegram API
error: invalid bot token
```

**原因：**
- 网络连接问题
- 无效的 Bot Token
- 代理配置问题

**解决方案：**
```bash
# 检查网络
curl https://api.telegram.org/bot<TOKEN>/getMe

# 验证令牌格式（数字:字母）
echo $TELEGRAM_BOT_TOKEN

# 使用代理
HTTPS_PROXY=http://proxy:8080 loongclaw telegram-serve

# 调试模式
RUST_LOG=debug loongclaw telegram-serve
```

---

### 6. 飞书 Webhook 问题

**错误：**
```
error: webhook server failed to bind
error: address already in use
```

**原因：**
- 端口已被占用
- 防火墙限制
- 权限不足

**解决方案：**
```bash
# 检查端口使用
lsof -i :3000

# 使用不同端口
loongclaw feishu-serve --bind "0.0.0.0:8080"

# 检查防火墙
sudo iptables -L | grep 3000
```

---

### 7. 模型响应超时

**错误：**
```
error: request timeout
error: provider response timeout
```

**原因：**
- 网络延迟
- 提供商响应慢
- 模型过载

**解决方案：**

在配置中增加超时：

```toml
[provider]
request_timeout_ms = 120000  # 2 分钟
retry_max_attempts = 3
retry_initial_backoff_ms = 1000
```

---

### 8. 会话历史丢失

**错误：**
```
warning: no conversation history found
```

**原因：**
- SQLite 路径不正确
- 数据库损坏
- 会话 ID 错误

**解决方案：**
```bash
# 检查 SQLite 路径
cat ~/.loongclaw/config.toml | grep sqlite_path

# 验证数据库存在
ls -la ~/.loongclaw/memory.sqlite3

# 列出会话
sqlite3 ~/.loongclaw/memory.sqlite3 "SELECT DISTINCT session_id FROM conversations;"

# 修复数据库
sqlite3 ~/.loongclaw/memory.sqlite3 ".recover" | sqlite3 ~/.loongclaw/memory.fixed.sqlite3
```

---

### 9. 性能缓慢

**症状：**
- 响应时间慢
- 内存使用高

**原因：**
- 滑动窗口过大
- 数据库文件过大
- 网络延迟

**解决方案：**

减小滑动窗口：

```toml
[memory]
sliding_window = 8
```

清理数据库：

```bash
# 删除旧数据
sqlite3 ~/.loongclaw/memory.sqlite3 "
  DELETE FROM conversations
  WHERE timestamp < datetime('now', '-30 days');
"

# 压缩数据库
sqlite3 ~/.loongclaw/memory.sqlite3 "VACUUM;"
```

---

### 10. 配置验证错误

**错误：**
```
error: configuration validation failed
```

**解决方案：**
```bash
# 验证配置
loongclaw validate-config

# JSON 输出
loongclaw validate-config --json

# 修复常见问题
loongclaw doctor --fix
```

## 诊断命令

### 系统诊断

```bash
# 完整诊断
loongclaw doctor

# 自动修复
loongclaw doctor --fix

# JSON 输出
loongclaw doctor --json

# 跳过模型探测
loongclaw doctor --skip-model-probe
```

### 配置验证

```bash
# 验证配置
loongclaw validate-config

# JSON 输出
loongclaw validate-config --json

# CI 用问题 JSON
loongclaw validate-config --output problem-json --fail-on-diagnostics
```

### 列出可用资源

```bash
# 可用模型
loongclaw list-models --json

# 上下文引擎
loongclaw list-context-engines --json

# 记忆系统
loongclaw list-memory-systems --json

# ACP 后端
loongclaw list-acp-backends --json

# 渠道
loongclaw channels --json
```

## 日志和调试

### 启用详细日志

```bash
# 调试级别
RUST_LOG=debug loongclaw chat

# 跟踪级别（更详细）
RUST_LOG=trace loongclaw chat

# 特定模块
RUST_LOG=loongclaw_daemon=debug,loongclaw_kernel=trace loongclaw chat
```

### 日志到文件

```bash
# 保存所有日志
RUST_LOG=debug loongclaw chat 2>&1 | tee loongclaw.log

# 只保存错误
RUST_LOG=error loongclaw telegram-serve 2> errors.log
```

## 健康检查清单

遇到问题时逐一检查：

1. **配置存在？**
   ```bash
   ls ~/.loongclaw/config.toml
   ```

2. **环境变量已设置？**
   ```bash
   env | grep API_KEY
   ```

3. **提供商连接正常？**
   ```bash
   loongclaw list-models
   ```

4. **诊断通过？**
   ```bash
   loongclaw doctor
   ```

5. **没有其他进程？**
   ```bash
   ps aux | grep loongclaw
   ```

6. **磁盘空间充足？**
   ```bash
   df -h ~/.loongclaw/
   ```

7. **日志显示错误？**
   ```bash
   RUST_LOG=debug loongclaw <命令>
   ```

## 获取帮助

### CLI 帮助

```bash
# 主帮助
loongclaw --help

# 命令帮助
loongclaw chat --help
loongclaw onboard --help
```

### 在线资源

- **文档**：https://loongclaw.ai/docs
- **GitHub**：https://github.com/loongclaw-ai/loongclaw
- **问题**：https://github.com/loongclaw-ai/loongclaw/issues
- **Telegram**：https://t.me/loongclaw
- **Discord**：https://discord.gg/loongclaw

### 报告问题

报告问题时请包含：

1. **环境信息**
   ```bash
   loongclaw --version
   rustc --version
   uname -a
   ```

2. **配置**（已脱敏）
   ```bash
   cat ~/.loongclaw/config.toml | grep -v "api_key"
   ```

3. **错误日志**
   ```bash
   RUST_LOG=debug loongclaw <命令> 2>&1
   ```

4. **复现步骤**
   - 你做了什么
   - 你期望什么
   - 实际发生了什么