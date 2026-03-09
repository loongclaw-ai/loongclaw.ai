---
title: "CLI 命令"
description: "LoongClaw 命令行界面完整参考"
path: "/docs/foundations/commands"
order: 3
---

# CLI 命令

LoongClaw 所有 CLI 命令的完整参考。

## 命令结构

```bash
loongclaw [命令] [选项]
```

使用 `loongclaw --help` 获取快速帮助，或 `loongclaw <命令> --help` 获取特定命令帮助。

## 核心命令

### onboard

首次设置的引导式入门。

```bash
loongclaw onboard [选项]
```

| 标志 | 说明 |
|------|------|
| `--output <路径>` | 自定义配置输出路径 |
| `--force` | 覆盖现有配置 |
| `--non-interactive` | 跳过交互式提示 |
| `--accept-risk` | 接受风险确认 |
| `--provider <名称>` | 预选提供商 |
| `--model <名称>` | 预选模型 |
| `--api-key-env <变量>` | API 密钥环境变量 |
| `--personality <名称>` | 选择提示人格 |
| `--memory-profile <名称>` | 选择记忆配置 |
| `--system-prompt <文本>` | 自定义系统提示 |
| `--skip-model-probe` | 跳过提供商模型探测 |

**示例：**

```bash
# 交互式入门
loongclaw onboard

# 非交互式选择提供商
loongclaw onboard --provider openai --model gpt-4o --non-interactive

# 强制覆盖
loongclaw onboard --force
```

### doctor

运行诊断并可选择应用修复。

```bash
loongclaw doctor [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--fix` | 应用安全自动修复 |
| `--json` | JSON 输出格式 |
| `--skip-model-probe` | 跳过提供商模型探测 |

**示例：**

```bash
# 运行诊断
loongclaw doctor

# 自动修复
loongclaw doctor --fix

# JSON 输出
loongclaw doctor --json
```

### validate-config

验证配置文件。

```bash
loongclaw validate-config [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--json` | JSON 输出格式 |
| `--output <格式>` | 输出格式：`text`、`json`、`problem-json` |
| `--locale <语言>` | 本地化语言 |
| `--fail-on-diagnostics` | 发现诊断时退出并报错 |

**示例：**

```bash
# 验证配置
loongclaw validate-config

# CI 用 JSON 输出
loongclaw validate-config --json --fail-on-diagnostics
```

### list-models

列出已配置提供商的可用模型。

```bash
loongclaw list-models [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--json` | JSON 输出格式 |

### import

从现有设置导入配置。

```bash
loongclaw import [选项]
```

| 标志 | 说明 |
|------|------|
| `--output <路径>` | 自定义配置输出路径 |
| `--force` | 覆盖现有配置 |
| `--preview` | 预览而不应用 |
| `--apply` | 应用导入到目标 |
| `--json` | JSON 输出 |
| `--from <来源>` | 限制来源：`recommended`、`existing`、`codex`、`env` |
| `--source-path <路径>` | 选择检测到的确切源路径 |
| `--provider <名称>` | 选择提供商 |
| `--include <域>` | 仅重用列出的域 |
| `--exclude <域>` | 排除列出的域 |

## 对话命令

### chat

启动交互式 CLI 对话。

```bash
loongclaw chat [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--session <ID>` | 会话标识符 |
| `--acp` | 使用 ACP 模式 |
| `--acp-event-stream` | 流式传输 ACP 事件 |
| `--acp-bootstrap-mcp-server <URL>` | 引导 MCP 服务器 |
| `--acp-cwd <路径>` | ACP 工作目录 |

**示例：**

```bash
# 启动默认对话
loongclaw chat

# 命名会话
loongclaw chat --session my-project

# 自定义配置
loongclaw chat --config /path/to/config.toml
```

### ask

单次提问，无需交互会话。

```bash
loongclaw ask --message <文本> [选项]
```

| 标志 | 说明 |
|------|------|
| `--message <文本>` | 要发送的消息（必需） |
| `--config <路径>` | 配置文件路径 |
| `--session <ID>` | 会话标识符 |
| `--acp` | 使用 ACP 模式 |

**示例：**

```bash
# 快速提问
loongclaw ask --message "2+2等于几？"

# 带会话
loongclaw ask --message "继续之前的内容" --session my-project
```

## 渠道命令

### telegram-serve

启动 Telegram 机器人服务。

```bash
loongclaw telegram-serve [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--once` | 处理一条消息后退出 |
| `--account <ID>` | Telegram 账户标识符 |

**示例：**

```bash
# 启动服务
loongclaw telegram-serve

# 测试单条消息
loongclaw telegram-serve --once
```

### telegram-send

发送 Telegram 消息。

```bash
loongclaw telegram-send --target <ID> --text <文本> [选项]
```

| 标志 | 说明 |
|------|------|
| `--target <ID>` | 目标聊天 ID 或用户名（必需） |
| `--text <文本>` | 消息文本（必需） |
| `--config <路径>` | 配置文件路径 |
| `--account <ID>` | Telegram 账户 |

### feishu-serve

启动飞书 Webhook 服务。

```bash
loongclaw feishu-serve [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--account <ID>` | 飞书账户 |
| `--bind <地址>` | 绑定地址（如 `0.0.0.0:8080`） |
| `--path <路径>` | 回调路径 |

### feishu-send

发送飞书消息。

```bash
loongclaw feishu-send --receive-id <ID> --text <文本> [选项]
```

| 标志 | 说明 |
|------|------|
| `--receive-id <ID>` | 接收者 ID（必需） |
| `--text <文本>` | 消息文本 |
| `--post-json <JSON>` | 富文本消息 JSON |
| `--image-key <KEY>` | 图片 key |
| `--file-key <KEY>` | 文件 key |
| `--card` | 发送为卡片 |
| `--config <路径>` | 配置文件路径 |
| `--account <ID>` | 飞书账户 |

## 飞书子命令

### feishu auth

管理飞书 OAuth 授权。

```bash
# 启动 OAuth 流程
loongclaw feishu auth start [选项]

# 交换授权码
loongclaw feishu auth exchange --state <STATE> --code <CODE>

# 列出存储的授权
loongclaw feishu auth list

# 选择默认授权
loongclaw feishu auth select --open-id <ID>
```

### feishu whoami

显示当前飞书用户资料。

```bash
loongclaw feishu whoami [选项]
```

### feishu doc

创建和管理飞书文档。

```bash
# 创建文档
loongclaw feishu doc create --title "我的文档" [选项]

# 追加到文档
loongclaw feishu doc append --url <URL> --content <内容>
```

### feishu messages

管理飞书消息。

```bash
# 读取消息历史
loongclaw feishu messages history --container-id <ID> [选项]

# 获取消息详情
loongclaw feishu messages get --message-id <ID>

# 下载资源
loongclaw feishu messages resource --message-id <ID> --index <N>
```

### feishu search

搜索飞书内容。

```bash
loongclaw feishu search messages --query <查询> [选项]
```

### feishu calendar

访问飞书日历。

```bash
# 列出日历
loongclaw feishu calendar list [选项]

# 获取忙闲数据
loongclaw feishu calendar freebusy --user-id <ID> --start-time <时间> --end-time <时间>
```

## 技能命令

管理外部技能。

```bash
# 列出技能
loongclaw skills list [选项]

# 显示技能信息
loongclaw skills info <技能ID>

# 安装技能
loongclaw skills install <路径> [选项]

# 安装内置技能
loongclaw skills install-bundled <技能ID>

# 移除技能
loongclaw skills remove <技能ID>
```

### skills policy

管理技能策略。

```bash
# 显示策略
loongclaw skills policy get

# 设置策略
loongclaw skills policy set --enabled true --approve-policy-update

# 重置策略
loongclaw skills policy reset --approve-policy-update
```

## 发现命令

### channels

列出编译的渠道接口。

```bash
loongclaw channels [选项]
```

| 标志 | 说明 |
|------|------|
| `--config <路径>` | 配置文件路径 |
| `--json` | JSON 输出 |

### list-context-engines

列出可用的上下文引擎。

```bash
loongclaw list-context-engines [选项]
```

### list-memory-systems

列出可用的记忆系统。

```bash
loongclaw list-memory-systems [选项]
```

### list-acp-backends

列出可用的 ACP 后端。

```bash
loongclaw list-acp-backends [选项]
```

### list-acp-sessions

列出 ACP 会话。

```bash
loongclaw list-acp-sessions [选项]
```

## ACP 命令

### acp-status

显示 ACP 会话状态。

```bash
loongclaw acp-status [选项]
```

| 标志 | 说明 |
|------|------|
| `--session <ID>` | 会话 key |
| `--conversation-id <ID>` | 对话 ID |
| `--route-session-id <ID>` | 路由会话 ID |

### acp-observability

显示 ACP 可观测性数据。

```bash
loongclaw acp-observability [选项]
```

### acp-event-summary

显示 ACP 事件摘要。

```bash
loongclaw acp-event-summary --session <ID> [选项]
```

### acp-dispatch

评估 ACP 调度策略。

```bash
loongclaw acp-dispatch [选项]
```

### acp-doctor

运行 ACP 后端诊断。

```bash
loongclaw acp-doctor [选项]
```

## 运行时命令

### runtime-snapshot

创建运行时快照。

```bash
loongclaw runtime-snapshot [选项]
```

| 标志 | 说明 |
|------|------|
| `--output <路径>` | 输出文件路径 |
| `--label <文本>` | 快照标签 |
| `--experiment-id <ID>` | 实验 ID |
| `--parent-snapshot-id <ID>` | 父快照 ID |

### runtime-restore

恢复运行时快照。

```bash
loongclaw runtime-restore --snapshot <路径> [选项]
```

| 标志 | 说明 |
|------|------|
| `--snapshot <路径>` | 快照路径（必需） |
| `--apply` | 应用更改（默认为预览） |

### runtime-experiment

管理运行时实验。

```bash
# 开始实验
loongclaw runtime-experiment start --snapshot <路径> --output <路径> --mutation-summary <文本>

# 结束实验
loongclaw runtime-experiment finish --run <路径> --result-snapshot <路径> --decision <决定>

# 显示实验
loongclaw runtime-experiment show --run <路径>

# 比较实验
loongclaw runtime-experiment compare --run <路径>

# 恢复实验
loongclaw runtime-experiment restore --run <路径> --stage <阶段>
```

### runtime-capability

管理运行时能力。

```bash
# 提议能力
loongclaw runtime-capability propose --run <路径> --output <路径> --target <目标>

# 审核能力
loongclaw runtime-capability review --candidate <路径> --decision <决定>

# 显示能力
loongclaw runtime-capability show --candidate <路径>
```

## 安全通道命令

### safe-lane-summary

显示安全通道事件摘要。

```bash
loongclaw safe-lane-summary --session <ID> [选项]
```

## 规范命令

### init-spec

生成规范模板。

```bash
loongclaw init-spec [选项]
```

| 标志 | 说明 |
|------|------|
| `--output <路径>` | 输出文件路径 |

### run-spec

执行规范工作流。

```bash
loongclaw run-spec --spec <路径> [选项]
```

| 标志 | 说明 |
|------|------|
| `--spec <路径>` | 规范文件路径（必需） |
| `--print-audit` | 打印审计跟踪 |

## 基准测试命令

### benchmark-programmatic-pressure

运行程序化压力基准测试。

```bash
loongclaw benchmark-programmatic-pressure [选项]
```

| 标志 | 说明 |
|------|------|
| `--matrix <路径>` | 基准测试矩阵文件 |
| `--baseline <路径>` | 用于比较的基准报告 |
| `--output <路径>` | 输出报告路径 |
| `--enforce-gate` | 检测到回归时失败 |

### benchmark-wasm-cache

运行 WASM 缓存基准测试。

```bash
loongclaw benchmark-wasm-cache [选项]
```

| 标志 | 说明 |
|------|------|
| `--wasm <路径>` | 要测试的 WASM 文件 |
| `--output <路径>` | 输出报告路径 |
| `--cold-iterations <N>` | 冷启动迭代次数 |
| `--hot-iterations <N>` | 热启动迭代次数 |
| `--enforce-gate` | 加速低于阈值时失败 |

### benchmark-memory-context

运行内存上下文基准测试。

```bash
loongclaw benchmark-memory-context [选项]
```

## 演示命令

### demo

运行端到端引导演示。

```bash
loongclaw demo
```

### run-task

通过内核+工具执行任务。

```bash
loongclaw run-task --objective <文本> [选项]
```

| 标志 | 说明 |
|------|------|
| `--objective <文本>` | 任务目标（必需） |
| `--payload <JSON>` | JSON 载荷 |

### invoke-connector

调用连接器操作。

```bash
loongclaw invoke-connector --operation <名称> [选项]
```

| 标志 | 说明 |
|------|------|
| `--operation <名称>` | 操作名称（必需） |
| `--payload <JSON>` | JSON 载荷 |

### audit-demo

演示审计生命周期。

```bash
loongclaw audit-demo
```

## 全局选项

| 标志 | 说明 |
|------|------|
| `--help` | 显示帮助 |
| `--version` | 显示版本 |

## 获取帮助

```bash
# 主帮助
loongclaw --help

# 特定命令帮助
loongclaw chat --help
loongclaw onboard --help

# 查看所有命令
loongclaw --help | grep -E "^    [a-z]"
```