# Markdown 内容管理系统设计

## 概述

将 loongclaw 网站的文档页面、社区页面和 changelog 页面改为基于 Markdown 文件的内容管理，使添加和更新内容更加容易。

## 目标

1. **分离内容与代码** - 内容存储在 Markdown 文件中，不直接嵌入代码
2. **易于添加内容** - 只需添加 Markdown 文件即可创建新页面
3. **支持元数据** - 通过 YAML frontmatter 存储标题、描述、顺序等信息
4. **构建时处理** - 在构建时将 Markdown 转换为优化的 JSON 格式

## 文件结构

```
/content/
├── docs/
│   ├── getting-started/
│   │   ├── index.md
│   │   ├── installation.md
│   │   └── quickstart.md
│   ├── guides/
│   │   ├── index.md
│   │   ├── model-management.md
│   │   └── configuration.md
│   └── api/
│       ├── index.md
│       ├── generate.md
│       └── chat.md
├── changelog/
│   ├── v2.0.4.md
│   ├── v2.0.3.md
│   └── v2.0.2.md
└── community/
    ├── resources.md
    └── showcase.md

/src/
├── content/                    # 生成的索引和转换后的内容
│   ├── docs-index.json
│   ├── changelog-index.json
│   └── community-index.json
└── features/
    └── docs/
        └── hooks/
            └── useContent.ts
```

## Markdown 文件格式

每个 Markdown 文件包含 YAML frontmatter 和正文：

```markdown
---
title: "Getting Started"
description: "Quick start guide for loongclaw"
order: 1
path: "/docs/getting-started"
---

# Getting Started

loongclaw is an open-source AI assistant runtime...

## Prerequisites

- Linux, macOS, or Windows with WSL2
- Minimum 256MB RAM
```

## 构建脚本

创建一个 Node.js 脚本 `scripts/build-content.js`：

1. 读取 `/content` 下的所有 `.md` 文件
2. 解析 YAML frontmatter
3. 将 Markdown 转换为 HTML（使用 `remark` / `remark-html`）
4. 生成索引文件（`docs-index.json` 等）
5. 输出到 `/src/content/`

构建脚本会在 `npm run build` 之前自动运行（通过 `package.json` 的 `prebuild` 脚本）。

## 生成的索引格式

### docs-index.json

```json
{
  "sections": [
    {
      "id": "getting-started",
      "title": "Getting Started",
      "path": "/docs",
      "children": [
        {
          "id": "installation",
          "title": "Installation",
          "path": "/docs/installation",
          "contentPath": "/src/content/docs/getting-started/installation.json"
        }
      ]
    }
  ]
}
```

### changelog-index.json

```json
{
  "releases": [
    {
      "version": "v2.0.4",
      "date": "2025-03-10",
      "contentPath": "/src/content/changelog/v2.0.4.json"
    }
  ]
}
```

## 内容加载机制

使用 React Hook 按需加载内容：

```typescript
// src/hooks/useContent.ts
function useContent(contentPath: string) {
  // - 根据当前路径从索引中查找对应内容
  // - 懒加载 JSON 内容
  // - 缓存已加载内容
  // - 返回 { content, loading, error }
}
```

## 组件更新

### DocsSidebar

- 从 `docs-index.json` 生成导航
- 支持嵌套结构
- 高亮当前选中项

### DocContent

- 接收 HTML 内容并渲染
- 支持代码高亮（使用现有 CodeBlock 组件）
- 处理内部链接

### ChangelogPage

- 从 `changelog-index.json` 读取版本列表
- 按版本分组展示
- 支持版本对比

### CommunityPage

- 从 `community-index.json` 读取资源列表
- 动态生成社区资源卡片

## 依赖项

需要添加以下 npm 包：

```json
{
  "gray-matter": "^4.0.3",
  "remark": "^15.0.0",
  "remark-html": "^16.0.0",
  "remark-gfm": "^4.0.0"
}
```

## 工作流程

### 添加新文档页面

1. 在 `/content/docs/` 下创建新的 `.md` 文件
2. 添加 YAML frontmatter（title, description, order, path）
3. 编写 Markdown 内容
4. 运行 `npm run build`（或自动构建）
5. 新页面自动出现在导航中

### 更新内容

1. 编辑对应的 `.md` 文件
2. 重新构建即可

### 添加 Changelog 条目

1. 在 `/content/changelog/` 下创建新的版本文件（如 `v2.0.5.md`）
2. 按照约定格式编写变更内容
3. 重新构建

## 扩展性

此设计支持未来的扩展：

- **搜索功能** - 索引包含所有内容的文本，便于实现搜索
- **标签系统** - 可在 frontmatter 中添加 tags 字段
- **多语言** - 可添加 `/content/en/`, `/content/zh/` 等目录
- **草稿模式** - 通过 frontmatter 中的 `draft: true` 控制

## 验收标准

- [ ] 所有现有内容迁移到 Markdown 文件
- [ ] 构建脚本成功生成索引文件
- [ ] Docs 页面正确渲染 Markdown 内容
- [ ] Changelog 页面正确渲染版本历史
- [ ] Community 页面正确渲染资源列表
- [ ] 添加新 Markdown 文件后自动出现在对应页面
- [ ] 代码高亮正常工作
- [ ] 导航链接正常工作
