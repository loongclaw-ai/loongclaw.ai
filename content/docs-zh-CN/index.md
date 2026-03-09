---
title: "文档"
description: "LoongClaw 用户完整指南 - 一个 Rust 编写的 AI 助手框架"
path: "/docs"
---

# LoongClaw 文档

欢迎使用 LoongClaw 文档。LoongClaw 是一个用 Rust 编写的 **AI 助手框架** - 你可以把它理解为自己的 ChatGPT 助手，可以在本地运行、扩展工具、部署到多个渠道。

## 我能用它做什么？

- **个人 AI 助手** - 通过 CLI、Telegram 或飞书与 AI 对话
- **编程助手** - 让 AI 帮你写代码、调试、操作文件
- **团队机器人** - 在 Telegram 或飞书上部署共享 AI 助手
- **研究助手** - 使用网页搜索和浏览器工具收集信息
- **自定义工作流** - 通过技能系统构建自动化流程

## 核心特性

- **多模型支持** - 支持 OpenAI、Anthropic、DeepSeek、Kimi 等 30+ 模型
- **多渠道部署** - 支持 CLI、Telegram、飞书/多维表格
- **安全工具系统** - Shell 执行、文件操作、浏览器自动化、网页抓取
- **持久记忆** - SQLite 会话存储，支持滑动窗口
- **可扩展** - 外部技能系统支持自定义能力

## 快速开始

```bash
# 安装 LoongClaw
curl -fsSL https://raw.githubusercontent.com/loongclaw-ai/loongclaw/main/scripts/install.sh | bash -s -- --onboard

# 设置 API 密钥
export OPENAI_API_KEY="sk-..."

# 开始对话
loongclaw chat
```

## 文档目录

### [快速入门](/docs/foundations/getting-started)
安装、快速开始指南和初始设置。

### [配置](/docs/foundations/configuration)
完整的配置参考，包括模型、渠道、工具和记忆设置。

### [CLI 命令](/docs/foundations/commands)
完整的命令行界面参考。

### [模型提供商](/docs/connectivity/providers)
配置和使用各种 LLM 模型提供商的指南。

### [通信渠道](/docs/connectivity/channels)
设置 CLI、Telegram 和飞书通信渠道。

### [工具系统](/docs/runtime/tools)
内置工具：Shell 执行、文件操作、浏览器自动化和网页抓取。

### [会话与记忆](/docs/runtime/memory)
会话管理、对话历史和记忆配置。

### [技能与 ACP](/docs/orchestration/skills)
外部技能系统和智能体控制平面。

### [故障排除](/docs/operations/troubleshooting)
常见问题、诊断命令和解决方案。

## 适用人群

### 新用户
从 [快速入门](/docs/foundations/getting-started) 开始安装 LoongClaw 并运行你的第一次对话。

### 开发者
查看 [配置](/docs/foundations/configuration) 了解详细配置选项，[工具系统](/docs/runtime/tools) 介绍内置工具。

### 团队用户
了解 [通信渠道](/docs/connectivity/channels) 将 LoongClaw 集成到 Telegram 或飞书进行团队协作。

## 获取帮助

- **CLI 帮助**: `loongclaw --help` 或 `loongclaw <命令> --help`
- **诊断命令**: `loongclaw doctor` 检查系统健康状态
- **GitHub**: [github.com/loongclaw-ai/loongclaw](https://github.com/loongclaw-ai/loongclaw)
- **社区**: [Telegram](https://t.me/loongclaw) | [Discord](https://discord.gg/loongclaw)