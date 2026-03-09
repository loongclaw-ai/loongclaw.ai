---
title: "技能与 ACP"
description: "外部技能系统和智能体控制平面"
path: "/docs/orchestration/skills"
order: 8
---

# 技能与 ACP

LoongClaw 提供外部技能系统和智能体控制平面（ACP）用于高级工作流。

## 外部技能

外部技能通过自定义功能扩展 LoongClaw 的能力。

### 配置

```toml
[external_skills]
enabled = false
require_download_approval = true
allowed_domains = []
blocked_domains = []
install_root = ""
auto_expose_installed = false
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `enabled` | `false` | 启用外部技能 |
| `require_download_approval` | `true` | 下载需要审批 |
| `allowed_domains` | `[]` | 允许的技能域名 |
| `blocked_domains` | `[]` | 阻止的技能域名 |
| `install_root` | - | 安装目录 |
| `auto_expose_installed` | `false` | 自动暴露已安装技能 |

### 管理技能

```bash
# 列出已安装技能
loongclaw skills list

# 显示技能详情
loongclaw skills info <skill-id>

# 从目录安装技能
loongclaw skills install ./my-skill

# 安装内置技能
loongclaw skills install-bundled browser-preview

# 移除技能
loongclaw skills remove <skill-id>
```

### 技能策略

管理外部技能的运行时策略：

```bash
# 显示当前策略
loongclaw skills policy get

# 更新策略
loongclaw skills policy set \
  --enabled true \
  --allow-domain github.com \
  --approve-policy-update

# 重置为默认
loongclaw skills policy reset --approve-policy-update
```

### 策略选项

| 标志 | 说明 |
|------|------|
| `--enabled` | 启用/禁用外部技能 |
| `--require-download-approval` | 下载需要审批 |
| `--auto-expose-installed` | 自动暴露已安装技能 |
| `--allow-domain` | 添加允许域名 |
| `--clear-allowed-domains` | 清除允许域名 |
| `--block-domain` | 添加阻止域名 |
| `--clear-blocked-domains` | 清除阻止域名 |

### 浏览器预览

启用浏览器预览功能：

```bash
loongclaw skills enable-browser-preview
```

## 智能体控制平面（ACP）

ACP 为智能体工作流提供高级编排。

### 配置

```toml
[acp]
enabled = false
backend = ""
default_agent = "codex"
allowed_agents = []
max_concurrent_sessions = 10
session_idle_ttl_ms = 600000
startup_timeout_ms = 60000
turn_timeout_ms = 300000
bindings_enabled = false
emit_runtime_events = false
```

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `enabled` | `false` | 启用 ACP |
| `backend` | - | 后端 ID |
| `default_agent` | `"codex"` | 默认智能体 |
| `allowed_agents` | `[]` | 允许的智能体 ID |
| `max_concurrent_sessions` | `10` | 最大并发会话 |
| `session_idle_ttl_ms` | `600000` | 会话空闲超时 |
| `startup_timeout_ms` | `60000` | 启动超时 |
| `turn_timeout_ms` | `300000` | 轮次超时 |
| `bindings_enabled` | `false` | 启用绑定 |
| `emit_runtime_events` | `false` | 发出运行时事件 |

### ACP 调度

```toml
[acp.dispatch]
enabled = true
conversation_routing = "per_channel"
allowed_channels = []
allowed_account_ids = []
bootstrap_mcp_servers = []
working_directory = ""
```

### ACP 后端

为 ACP 配置后端：

```toml
[acp.backends.acpx]
enabled = true

[acp.backends.acpx.mcp_server]
command = "/path/to/mcp-server"
args = []
env = {}
```

### 使用 ACP

在对话中启用 ACP：

```bash
# 使用 ACP 启动对话
loongclaw chat --acp

# 带事件流
loongclaw chat --acp --acp-event-stream

# 带 MCP 服务器
loongclaw chat --acp --acp-bootstrap-mcp-server "http://localhost:8080/mcp"

# 带工作目录
loongclaw chat --acp --acp-cwd /path/to/project
```

### ACP 命令

```bash
# 列出 ACP 后端
loongclaw list-acp-backends --json

# 列出 ACP 会话
loongclaw list-acp-sessions --json

# 显示会话状态
loongclaw acp-status --session my-session

# 显示可观测性数据
loongclaw acp-observability --json

# 显示事件摘要
loongclaw acp-event-summary --session my-session

# 评估调度策略
loongclaw acp-dispatch --channel telegram

# 运行诊断
loongclaw acp-doctor --backend http
```

### 渠道 ACP 配置

为特定渠道启用 ACP：

```toml
[telegram.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"

[feishu.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"
```

## 运行时快照

创建和恢复运行时状态以实现可重现性。

### 创建快照

```bash
# 创建快照
loongclaw runtime-snapshot \
  --label "baseline" \
  --output snapshot.json

# 带实验 ID
loongclaw runtime-snapshot \
  --label "experiment-1" \
  --experiment-id "exp-001" \
  --output snapshot.json
```

### 恢复快照

```bash
# 预览恢复（预览）
loongclaw runtime-restore --snapshot snapshot.json

# 应用恢复
loongclaw runtime-restore --snapshot snapshot.json --apply
```

## 运行时实验

跟踪实验及其结果。

### 开始实验

```bash
loongclaw runtime-experiment start \
  --snapshot baseline.json \
  --output experiment.json \
  --mutation-summary "添加了功能 X"
```

### 结束实验

```bash
loongclaw runtime-experiment finish \
  --run experiment.json \
  --result-snapshot result.json \
  --decision approve
```

### 查看实验

```bash
# 显示实验详情
loongclaw runtime-experiment show --run experiment.json

# 与快照比较
loongclaw runtime-experiment compare --run experiment.json --snapshot baseline.json

# 恢复实验状态
loongclaw runtime-experiment restore --run experiment.json --stage baseline --apply
```

## 运行时能力

提议和审核能力变更。

### 提议能力

```bash
loongclaw runtime-capability propose \
  --run experiment.json \
  --output capability.json \
  --target model
```

### 审核能力

```bash
loongclaw runtime-capability review \
  --candidate capability.json \
  --decision approve
```

### 查看能力

```bash
loongclaw runtime-capability show --candidate capability.json
```

## 安全通道

监控安全通道执行。

```bash
# 显示事件摘要
loongclaw safe-lane-summary --session my-session

# JSON 输出
loongclaw safe-lane-summary --session my-session --json
```

## 故障排除

### 技能不加载

**检查：**
1. 配置中启用了技能
2. 域名未被阻止
3. 安装路径存在

```bash
loongclaw skills list --json
```

### ACP 不工作

**检查：**
1. 配置中启用了 ACP
2. 已配置后端
3. 运行诊断

```bash
loongclaw acp-doctor --json
```

### 快照恢复失败

**检查：**
1. 快照文件存在且有效
2. 目标配置兼容
3. 使用 `--apply` 标志实际应用更改