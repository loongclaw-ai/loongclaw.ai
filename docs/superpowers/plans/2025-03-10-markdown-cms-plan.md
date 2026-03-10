# Markdown 内容管理系统实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 loongclaw 网站的文档、社区和 changelog 页面改为基于 Markdown 文件的内容管理，使添加内容更加容易。

**Architecture:** 在 `/content/` 目录中存储 Markdown 文件，构建时使用 Node.js 脚本将 Markdown 转换为 HTML 并生成索引 JSON 文件，React 组件通过生成的索引动态加载和渲染内容。

**Tech Stack:** React + TypeScript + Vite, gray-matter (解析 YAML frontmatter), remark + remark-html + remark-gfm (转换 Markdown)

---

## 文件结构映射

### 新建文件

| 文件 | 职责 |
|------|------|
| `/content/docs/getting-started/index.md` | Getting Started 文档内容 |
| `/content/docs/getting-started/installation.md` | Installation 文档内容 |
| `/content/docs/getting-started/quickstart.md` | Quick Start 文档内容 |
| `/content/docs/guides/index.md` | Guides 主页面内容 |
| `/content/docs/guides/model-management.md` | Model Management 文档内容 |
| `/content/docs/guides/configuration.md` | Configuration 文档内容 |
| `/content/docs/api/index.md` | API Reference 主页面内容 |
| `/content/docs/api/generate.md` | Generate API 文档内容 |
| `/content/docs/api/chat.md` | Chat API 文档内容 |
| `/content/changelog/v2.0.4.md` | v2.0.4 版本日志 |
| `/content/changelog/v2.0.3.md` | v2.0.3 版本日志 |
| `/content/changelog/v2.0.2.md` | v2.0.2 版本日志 |
| `/content/community/resources.md` | 社区资源列表 |
| `/scripts/build-content.ts` | 构建脚本：将 Markdown 转换为 JSON |
| `/src/content/types.ts` | 内容类型定义 |
| `/src/hooks/useContent.ts` | 内容加载 Hook |
| `/src/utils/content-loader.ts` | 内容加载工具函数 |

### 修改文件

| 文件 | 修改内容 |
|------|----------|
| `package.json` | 添加依赖和 prebuild 脚本 |
| `src/features/docs/data/docs-structure.ts` | 改为从生成的索引加载 |
| `src/features/docs/components/DocContent.tsx` | 改为从 Markdown 渲染内容 |
| `src/features/docs/components/DocsSidebar.tsx` | 改为从生成的索引渲染导航 |
| `src/features/changelog/index.tsx` | 改为从 Markdown 加载版本日志 |
| `src/features/community/index.tsx` | 改为从 Markdown 加载资源列表 |

---

## Chunk 1: 依赖和构建脚本

### Task 1: 添加 Markdown 处理依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装依赖包**

Run:
```bash
npm install gray-matter remark remark-html remark-gfm
npm install -D @types/node
```

Expected: 成功安装所有包，无错误

- [ ] **Step 2: 添加 prebuild 脚本**

Edit `package.json`:

```json
{
  "scripts": {
    "prebuild": "npm run build:content",
    "build:content": "tsx scripts/build-content.ts",
    "dev": "npm run build:content && vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 3: 安装 tsx**

Run:
```bash
npm install -D tsx
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add markdown processing dependencies

Add gray-matter, remark, remark-html, remark-gfm for content processing.
Add build:content script and prebuild hook."
```

---

### Task 2: 创建内容类型定义

**Files:**
- Create: `src/content/types.ts`

- [ ] **Step 1: 编写类型定义**

Create `src/content/types.ts`:

```typescript
// 文档内容类型
export interface DocFrontmatter {
  title: string;
  description?: string;
  order?: number;
  path?: string;
}

export interface DocContent {
  id: string;
  title: string;
  description?: string;
  path: string;
  html: string;
  order: number;
}

export interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocSection[];
}

export interface DocsIndex {
  sections: DocSection[];
}

// Changelog 内容类型
export interface ChangelogFrontmatter {
  version: string;
  date: string;
}

export interface ChangelogContent {
  version: string;
  date: string;
  html: string;
}

export interface ChangelogIndex {
  releases: {
    version: string;
    date: string;
    contentPath: string;
  }[];
}

// 社区内容类型
export interface CommunityFrontmatter {
  title: string;
}

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: 'discord' | 'github' | 'forum' | 'blog' | 'twitter';
}

export interface CommunityIndex {
  resources: CommunityResource[];
}

// 通用内容类型
export interface ContentFile {
  frontmatter: Record<string, unknown>;
  html: string;
  slug: string;
  path: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/content/types.ts
git commit -m "feat: add content type definitions

Add TypeScript types for docs, changelog, and community content."
```

---

### Task 3: 创建构建脚本

**Files:**
- Create: `scripts/build-content.ts`

- [ ] **Step 1: 创建脚本目录和文件**

Run:
```bash
mkdir -p scripts
```

Create `scripts/build-content.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/content');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function processMarkdown(filePath: string): Promise<{ frontmatter: Record<string, unknown>; html: string; slug: string }> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: markdownContent } = matter(content);

  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(markdownContent);

  const html = String(result);
  const slug = path.basename(filePath, '.md');

  return { frontmatter, html, slug };
}

async function buildDocs() {
  const docsDir = path.join(CONTENT_DIR, 'docs');
  const outputDir = path.join(OUTPUT_DIR, 'docs');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const sections: { id: string; title: string; path: string; description?: string; children?: any[] }[] = [];

  // 遍历 docs 目录
  const categories = fs.readdirSync(docsDir).filter(f => fs.statSync(path.join(docsDir, f)).isDirectory());

  for (const category of categories) {
    const categoryDir = path.join(docsDir, category);
    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.md'));

    const children: any[] = [];
    let categoryIndex: { frontmatter: Record<string, unknown>; slug: string } | null = null;

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const { frontmatter, html, slug } = await processMarkdown(filePath);

      // 保存 HTML 内容
      const outputFile = path.join(outputDir, category, `${slug}.json`);
      if (!fs.existsSync(path.join(outputDir, category))) {
        fs.mkdirSync(path.join(outputDir, category), { recursive: true });
      }
      fs.writeFileSync(outputFile, JSON.stringify({ frontmatter, html, slug }, null, 2));

      if (slug === 'index') {
        categoryIndex = { frontmatter, slug };
      } else {
        children.push({
          id: slug,
          title: frontmatter.title as string,
          path: frontmatter.path || `/docs/${category}/${slug}`,
          description: frontmatter.description as string,
          contentPath: `/src/content/docs/${category}/${slug}.json`,
        });
      }
    }

    // 按 order 排序
    children.sort((a, b) => (a.order || 999) - (b.order || 999));

    if (categoryIndex) {
      sections.push({
        id: category,
        title: categoryIndex.frontmatter.title as string,
        path: categoryIndex.frontmatter.path || `/docs/${category}`,
        description: categoryIndex.frontmatter.description as string,
        children,
      });
    }
  }

  // 写入索引
  const index = { sections };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'docs-index.json'), JSON.stringify(index, null, 2));

  console.log('✓ Docs content built');
}

async function buildChangelog() {
  const changelogDir = path.join(CONTENT_DIR, 'changelog');
  const outputDir = path.join(OUTPUT_DIR, 'changelog');

  if (!fs.existsSync(changelogDir)) {
    console.log('No changelog directory found, skipping...');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(changelogDir).filter(f => f.endsWith('.md'));
  const releases: { version: string; date: string; contentPath: string }[] = [];

  for (const file of files) {
    const filePath = path.join(changelogDir, file);
    const { frontmatter, html, slug } = await processMarkdown(filePath);

    // 保存 HTML 内容
    const outputFile = path.join(outputDir, `${slug}.json`);
    fs.writeFileSync(outputFile, JSON.stringify({ frontmatter, html, slug }, null, 2));

    releases.push({
      version: frontmatter.version as string,
      date: frontmatter.date as string,
      contentPath: `/src/content/changelog/${slug}.json`,
    });
  }

  // 按版本号排序（降序）
  releases.sort((a, b) => b.version.localeCompare(a.version));

  const index = { releases };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'changelog-index.json'), JSON.stringify(index, null, 2));

  console.log('✓ Changelog content built');
}

async function buildCommunity() {
  const communityDir = path.join(CONTENT_DIR, 'community');
  const outputFile = path.join(OUTPUT_DIR, 'community-index.json');

  if (!fs.existsSync(communityDir)) {
    console.log('No community directory found, skipping...');
    return;
  }

  const resourcesFile = path.join(communityDir, 'resources.md');
  if (!fs.existsSync(resourcesFile)) {
    console.log('No resources.md found, skipping...');
    return;
  }

  const { frontmatter } = await processMarkdown(resourcesFile);
  const resources = frontmatter.resources as any[] || [];

  const index = { resources };
  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));

  console.log('✓ Community content built');
}

async function main() {
  console.log('Building content...\n');

  try {
    await buildDocs();
    await buildChangelog();
    await buildCommunity();

    console.log('\n✓ All content built successfully');
  } catch (error) {
    console.error('\n✗ Build failed:', error);
    process.exit(1);
  }
}

main();
```

- [ ] **Step 2: 测试构建脚本**

Run:
```bash
npm run build:content
```

Expected: 失败（content 目录不存在），但这是预期的

- [ ] **Step 3: Commit**

```bash
git add scripts/build-content.ts
git commit -m "feat: add content build script

Add build-content.ts script to process markdown files and generate indices."
```

---

## Chunk 2: 创建 Markdown 内容文件

### Task 4: 创建文档 Markdown 文件

**Files:**
- Create: `content/docs/getting-started/index.md`
- Create: `content/docs/getting-started/installation.md`
- Create: `content/docs/getting-started/quickstart.md`
- Create: `content/docs/guides/index.md`
- Create: `content/docs/guides/model-management.md`
- Create: `content/docs/guides/configuration.md`
- Create: `content/docs/api/index.md`
- Create: `content/docs/api/generate.md`
- Create: `content/docs/api/chat.md`

- [ ] **Step 1: 创建目录结构**

Run:
```bash
mkdir -p content/docs/getting-started content/docs/guides content/docs/api
```

- [ ] **Step 2: 创建 getting-started/index.md**

Create `content/docs/getting-started/index.md`:

```markdown
---
title: "Getting Started"
description: "Quick start guide for loongclaw"
path: "/docs"
---

# Getting Started

loongclaw is an open-source AI assistant runtime designed for severe constraints. This guide will help you get up and running in minutes.

## Prerequisites

- Linux, macOS, or Windows with WSL2
- Minimum 256MB RAM
- curl installed

## Installation

Install loongclaw using the install script:

```bash
curl -sSfL https://loongclaw.ai/install.sh | sh
```

## Verify Installation

```bash
claw --version
```

## Next Steps

- Read the [Installation guide](/docs/installation) for detailed options
- Follow the [Quick Start](/docs/quickstart) to run your first model
```

- [ ] **Step 3: 创建 getting-started/installation.md**

Create `content/docs/getting-started/installation.md`:

```markdown
---
title: "Installation"
description: "Install loongclaw on your system"
path: "/docs/installation"
order: 1
---

# Installation

loongclaw supports multiple installation methods.

## macOS with Homebrew

```bash
brew install loongclaw
```

## Linux with apt

```bash
sudo apt install loongclaw
```

## Linux with curl

```bash
curl -sSfL https://loongclaw.ai/install.sh | sh
```

## Windows

Download the installer from [releases](https://github.com/loongclaw/releases).

## Verify Installation

```bash
claw --version
```
```

- [ ] **Step 4: 创建 getting-started/quickstart.md**

Create `content/docs/getting-started/quickstart.md`:

```markdown
---
title: "Quick Start"
description: "Run your first model in 5 minutes"
path: "/docs/quickstart"
order: 2
---

# Quick Start

Pull your first model and start chatting.

## Pull a Model

```bash
claw pull literati-7b
```

## Start Chatting

```bash
claw run
```

## Try the API

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "literati-7b",
  "prompt": "Hello, how are you?"
}'
```

## Next Steps

- Learn about [model management](/docs/guides/model-management)
- Explore the [API reference](/docs/api)
```

- [ ] **Step 5: 创建 guides/index.md**

Create `content/docs/guides/index.md`:

```markdown
---
title: "Guides"
description: "Detailed usage guides"
path: "/docs/guides"
---

# Guides

Detailed guides for common tasks.

## Available Guides

- [Model Management](/docs/guides/model-management) - Pull, list, and remove models
- [Configuration](/docs/guides/configuration) - Customize loongclaw settings
```

- [ ] **Step 6: 创建 guides/model-management.md**

Create `content/docs/guides/model-management.md`:

```markdown
---
title: "Model Management"
description: "Pull, list, and remove models"
path: "/docs/guides/model-management"
order: 1
---

# Model Management

Manage your local models with simple commands.

## List Models

```bash
claw list
```

## Pull a Model

```bash
claw pull literati-7b
```

## Remove a Model

```bash
claw rm literati-7b
```

## Copy a Model

```bash
claw cp literati-7b my-model
```
```

- [ ] **Step 7: 创建 guides/configuration.md**

Create `content/docs/guides/configuration.md`:

```markdown
---
title: "Configuration"
description: "Customize loongclaw settings"
path: "/docs/guides/configuration"
order: 2
---

# Configuration

Customize loongclaw settings.

## Configuration File

Located at `~/.claw/config.json`.

## Example Configuration

```json
{
  "model": "literati-7b",
  "temperature": 0.7,
  "top_p": 0.9,
  "context_length": 4096
}
```

## Environment Variables

- `CLAW_HOST` - Server host (default: 127.0.0.1)
- `CLAW_PORT` - Server port (default: 11434)
```

- [ ] **Step 8: 创建 api/index.md**

Create `content/docs/api/index.md`:

```markdown
---
title: "API Reference"
description: "REST API documentation"
path: "/docs/api"
---

# API Reference

REST API documentation.

## Endpoints

- [Generate](/docs/api/generate) - Generate completions
- [Chat](/docs/api/chat) - Chat completions API
```

- [ ] **Step 9: 创建 api/generate.md**

Create `content/docs/api/generate.md`:

```markdown
---
title: "Generate"
description: "Generate completions"
path: "/docs/api/generate"
order: 1
---

# Generate

Generate a completion.

## Request

```bash
POST /api/generate
```

## Request Body

```json
{
  "model": "literati-7b",
  "prompt": "Your prompt here"
}
```

## Response

```json
{
  "model": "literati-7b",
  "response": "Generated text...",
  "done": true
}
```
```

- [ ] **Step 10: 创建 api/chat.md**

Create `content/docs/api/chat.md`:

```markdown
---
title: "Chat"
description: "Chat completions API"
path: "/docs/api/chat"
order: 2
---

# Chat

Generate chat completions.

## Request

```bash
POST /api/chat
```

## Request Body

```json
{
  "model": "literati-7b",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

## Response

```json
{
  "model": "literati-7b",
  "message": {
    "role": "assistant",
    "content": "Hello! How can I help you today?"
  },
  "done": true
}
```
```

- [ ] **Step 11: 测试构建脚本**

Run:
```bash
npm run build:content
```

Expected: 成功生成 `/src/content/docs-index.json` 和对应的 HTML 文件

- [ ] **Step 12: Commit**

```bash
git add content/
git commit -m "feat: add docs markdown content

Add getting-started, guides, and api documentation as markdown files."
```

---

### Task 5: 创建 Changelog Markdown 文件

**Files:**
- Create: `content/changelog/v2.0.4.md`
- Create: `content/changelog/v2.0.3.md`
- Create: `content/changelog/v2.0.2.md`

- [ ] **Step 1: 创建目录**

Run:
```bash
mkdir -p content/changelog
```

- [ ] **Step 2: 创建 v2.0.4.md**

Create `content/changelog/v2.0.4.md`:

```markdown
---
version: "v2.0.4"
date: "2025-03-10"
---

# v2.0.4

## Features

- **feat:** Added support for new quantization formats

## Performance

- **perf:** Improved inference speed by 15%

## Bug Fixes

- **fix:** Fixed memory leak in long-running sessions
```

- [ ] **Step 3: 创建 v2.0.3.md**

Create `content/changelog/v2.0.3.md`:

```markdown
---
version: "v2.0.3"
date: "2025-03-01"
---

# v2.0.3

## Features

- **feat:** New REST API endpoints for batch processing

## Documentation

- **docs:** Updated API documentation with examples
```

- [ ] **Step 4: 创建 v2.0.2.md**

Create `content/changelog/v2.0.2.md`:

```markdown
---
version: "v2.0.2"
date: "2025-02-20"
---

# v2.0.2

## Bug Fixes

- **fix:** Resolved issue with model loading on ARM64

## Performance

- **perf:** Reduced cold start time
```

- [ ] **Step 5: 测试构建脚本**

Run:
```bash
npm run build:content
```

Expected: 成功生成 `/src/content/changelog-index.json`

- [ ] **Step 6: Commit**

```bash
git add content/changelog/
git commit -m "feat: add changelog markdown content

Add v2.0.4, v2.0.3, v2.0.2 release notes as markdown files."
```

---

### Task 6: 创建社区 Markdown 文件

**Files:**
- Create: `content/community/resources.md`

- [ ] **Step 1: 创建目录和文件**

Run:
```bash
mkdir -p content/community
```

Create `content/community/resources.md`:

```markdown
---
title: "Community Resources"
resources:
  - title: "GitHub"
    description: "Star us, report issues, and contribute to the codebase."
    url: "https://github.com/loongclaw"
    type: "github"
  - title: "Discord"
    description: "Join our community for real-time support and discussions."
    url: "https://discord.gg/loongclaw"
    type: "discord"
  - title: "Twitter"
    description: "Follow us for updates, tips, and community highlights."
    url: "https://twitter.com/loongclaw"
    type: "twitter"
---

# Community Resources

Connect with developers, contributors, and users. loongclaw is built by the community, for the community.
```

- [ ] **Step 2: 测试构建脚本**

Run:
```bash
npm run build:content
```

Expected: 成功生成 `/src/content/community-index.json`

- [ ] **Step 3: Commit**

```bash
git add content/community/
git commit -m "feat: add community markdown content

Add community resources as markdown file with YAML frontmatter."
```

---

## Chunk 3: 更新 React 组件

### Task 7: 创建内容加载工具函数

**Files:**
- Create: `src/utils/content-loader.ts`
- Create: `src/hooks/useContent.ts`

- [ ] **Step 1: 创建 utils 目录和内容加载器**

Run:
```bash
mkdir -p src/utils
```

Create `src/utils/content-loader.ts`:

```typescript
import type { DocsIndex, DocSection, ChangelogIndex, CommunityIndex } from '../content/types';

// 导入生成的索引文件
import docsIndex from '../content/docs-index.json';
import changelogIndex from '../content/changelog-index.json';
import communityIndex from '../content/community-index.json';

// 获取 Docs 索引
export function getDocsIndex(): DocsIndex {
  return docsIndex as DocsIndex;
}

// 根据路径查找文档
export function findDocByPath(path: string): DocSection | null {
  const index = getDocsIndex();

  for (const section of index.sections) {
    if (section.path === path) {
      return section;
    }
    if (section.children) {
      for (const child of section.children) {
        if (child.path === path) {
          return child;
        }
      }
    }
  }

  return null;
}

// 获取 Changelog 索引
export function getChangelogIndex(): ChangelogIndex {
  return changelogIndex as ChangelogIndex;
}

// 获取 Community 索引
export function getCommunityIndex(): CommunityIndex {
  return communityIndex as CommunityIndex;
}

// 动态导入内容文件
export async function loadDocContent(contentPath: string): Promise<{ html: string; title: string; description?: string }> {
  // 从路径中提取相对路径
  const relativePath = contentPath.replace('/src/', '');
  const module = await import(`../${relativePath}`);
  return {
    html: module.html,
    title: module.frontmatter.title,
    description: module.frontmatter.description,
  };
}

export async function loadChangelogContent(contentPath: string): Promise<{ html: string; version: string; date: string }> {
  const relativePath = contentPath.replace('/src/', '');
  const module = await import(`../${relativePath}`);
  return {
    html: module.html,
    version: module.frontmatter.version,
    date: module.frontmatter.date,
  };
}
```

- [ ] **Step 2: 创建 useContent Hook**

Create `src/hooks/useContent.ts`:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { loadDocContent, loadChangelogContent } from '../utils/content-loader';

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDocContent(contentPath: string | null): UseContentResult<{ html: string; title: string; description?: string }> {
  const [data, setData] = useState<{ html: string; title: string; description?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contentPath) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadDocContent(contentPath)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [contentPath]);

  return { data, loading, error };
}

export function useChangelogContent(contentPath: string | null): UseContentResult<{ html: string; version: string; date: string }> {
  const [data, setData] = useState<{ html: string; version: string; date: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contentPath) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadChangelogContent(contentPath)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [contentPath]);

  return { data, loading, error };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/content-loader.ts src/hooks/useContent.ts
git commit -m "feat: add content loading utilities

Add content-loader.ts for static imports and useContent.ts hooks for dynamic loading."
```

---

### Task 8: 更新 DocsSidebar 组件

**Files:**
- Modify: `src/features/docs/components/DocsSidebar.tsx`

- [ ] **Step 1: 修改 DocsSidebar 使用生成的索引**

Edit `src/features/docs/components/DocsSidebar.tsx`:

```typescript
import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDocsIndex } from '../../../utils/content-loader';
import type { DocSection } from '../../../types';

const DocsSidebar: FC = () => {
  const location = useLocation();
  const { sections } = getDocsIndex();

  const isActive = (path: string) => location.pathname === path;

  const renderSection = (section: DocSection, level: number = 0) => (
    <div key={section.id} style={{ marginBottom: '1.5rem' }}>
      <Link
        to={section.path}
        style={{
          display: 'block',
          fontFamily: "'Syncopate', sans-serif",
          fontSize: level === 0 ? '0.85rem' : '0.8rem',
          fontWeight: level === 0 ? 600 : 400,
          color: isActive(section.path) ? 'var(--color-accent)' : 'var(--color-text-primary)',
          textDecoration: 'none',
          marginBottom: '0.5rem',
          paddingLeft: level === 0 ? 0 : '1rem',
        }}
      >
        {section.title}
      </Link>
      {section.children && section.children.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {section.children.map((child) => renderSection(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <aside
      style={{
        width: '280px',
        height: 'calc(100vh - 73px)',
        borderRight: '1px solid var(--color-border-light)',
        padding: '2rem 1.5rem',
        position: 'fixed',
        left: 0,
        top: '73px',
        background: 'var(--color-bg-primary)',
        overflowY: 'auto',
      }}
    >
      <nav>
        {sections.map((section) => renderSection(section))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/DocsSidebar.tsx
git commit -m "refactor: update DocsSidebar to use generated index

Replace hardcoded structure with dynamic navigation from docs-index.json."
```

---

### Task 9: 更新 DocContent 组件

**Files:**
- Modify: `src/features/docs/components/DocContent.tsx`

- [ ] **Step 1: 修改 DocContent 使用 Markdown 内容**

Edit `src/features/docs/components/DocContent.tsx`:

```typescript
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { findDocByPath } from '../../../utils/content-loader';
import { useDocContent } from '../../../hooks/useContent';

const DocContent: FC = () => {
  const location = useLocation();
  const doc = findDocByPath(location.pathname);
  const { data, loading, error } = useDocContent(doc?.contentPath || null);

  if (loading) {
    return (
      <article style={{ maxWidth: '800px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </article>
    );
  }

  if (error || !data) {
    return (
      <article style={{ maxWidth: '800px' }}>
        <h1
          style={{
            fontFamily: "'Syncopate', sans-serif",
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          {doc?.title || 'Page Not Found'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {error ? 'Failed to load content.' : 'Content not found.'}
        </p>
      </article>
    );
  }

  return (
    <article style={{ maxWidth: '800px' }}>
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: 'var(--color-text-primary)',
        }}
      >
        {data.title}
      </h1>
      {data.description && (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
          }}
        >
          {data.description}
        </p>
      )}
      <div
        className="doc-markdown-content"
        dangerouslySetInnerHTML={{ __html: data.html }}
        style={{
          color: 'var(--color-text-primary)',
          lineHeight: '1.7',
        }}
      />
    </article>
  );
};

export default DocContent;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/DocContent.tsx
git commit -m "refactor: update DocContent to use markdown content

Replace hardcoded content with dynamically loaded markdown HTML."
```

---

### Task 10: 更新 ChangelogPage 组件

**Files:**
- Modify: `src/features/changelog/index.tsx`

- [ ] **Step 1: 修改 ChangelogPage 使用 Markdown 内容**

Edit `src/features/changelog/index.tsx`:

```typescript
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { getChangelogIndex } from '../../utils/content-loader';
import type { ChangeType } from '../../types';

interface ReleaseContent {
  version: string;
  date: string;
  html: string;
}

const typeLabels: Record<ChangeType, { label: string; color: string }> = {
  feat: { label: 'Feature', color: '#3FB950' },
  fix: { label: 'Fix', color: '#58A6FF' },
  perf: { label: 'Performance', color: '#A371F7' },
  breaking: { label: 'Breaking', color: '#F85149' },
  docs: { label: 'Docs', color: '#8B949E' },
};

const ChangeBadge = ({ type }: { type: ChangeType }) => {
  const { label, color } = typeLabels[type];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 600,
        backgroundColor: `${color}20`,
        color: color,
        marginRight: '0.75rem',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label}
    </span>
  );
};

const ChangelogPage: FC = () => {
  const [releases, setReleases] = useState<ReleaseContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { releases: releaseIndex } = getChangelogIndex();

  useEffect(() => {
    const loadReleases = async () => {
      const loadedReleases = await Promise.all(
        releaseIndex.map(async (release) => {
          const relativePath = release.contentPath.replace('/src/', '');
          const module = await import(`../../${relativePath}`);
          return {
            version: module.frontmatter.version,
            date: module.frontmatter.date,
            html: module.html,
          };
        })
      );
      setReleases(loadedReleases);
      setLoading(false);
    };

    loadReleases();
  }, [releaseIndex]);

  if (loading) {
    return (
      <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '2.5rem', color: 'var(--color-text-primary)' }}>
          Changelog
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '4rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: 'var(--color-text-primary)',
        }}
      >
        Changelog
      </h1>

      {releases.map((release) => (
        <div
          key={release.version}
          style={{
            marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--color-border-light)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.5rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {release.version}
            </h2>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {release.date}
            </span>
          </div>

          <div
            className="changelog-content"
            dangerouslySetInnerHTML={{ __html: release.html }}
            style={{
              color: 'var(--color-text-primary)',
              lineHeight: '1.7',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChangelogPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/changelog/index.tsx
git commit -m "refactor: update ChangelogPage to use markdown content

Replace hardcoded releases with dynamically loaded markdown content."
```

---

### Task 11: 更新 CommunityPage 组件

**Files:**
- Modify: `src/features/community/index.tsx`

- [ ] **Step 1: 修改 CommunityPage 使用生成的索引**

Edit `src/features/community/index.tsx`:

```typescript
import type { FC } from 'react';
import { getCommunityIndex } from '../../utils/content-loader';

const CommunityPage: FC = () => {
  const { resources } = getCommunityIndex();

  return (
    <div
      style={{
        padding: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'var(--color-text-primary)',
        }}
      >
        Community
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          marginBottom: '3rem',
          maxWidth: '600px',
          fontSize: '1.1rem',
        }}
      >
        Connect with developers, contributors, and users. loongclaw is built by the community, for the community.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid var(--color-border)',
              padding: '1.5rem',
              borderRadius: '4px',
              background: 'var(--color-bg-secondary)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-medium)';
              e.currentTarget.style.background = 'var(--color-bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
            }}
          >
            <h3
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: '1rem',
                marginBottom: '0.5rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {resource.title}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/community/index.tsx
git commit -m "refactor: update CommunityPage to use generated index

Replace hardcoded resources with dynamic content from community-index.json."
```

---

## Chunk 4: 样式和验证

### Task 12: 添加 Markdown 内容样式

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: 添加 Markdown 内容样式**

Edit `src/index.css`，添加：

```css
/* Doc markdown content styles */
.doc-markdown-content h2 {
  font-family: 'Syncopate', sans-serif;
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.doc-markdown-content h3 {
  font-family: 'Syncopate', sans-serif;
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}

.doc-markdown-content p {
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.doc-markdown-content ul,
.doc-markdown-content ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.doc-markdown-content li {
  margin-bottom: 0.5rem;
}

.doc-markdown-content code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--color-bg-tertiary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.doc-markdown-content pre {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.doc-markdown-content pre code {
  background: none;
  padding: 0;
}

.doc-markdown-content a {
  color: var(--color-accent);
  text-decoration: none;
}

.doc-markdown-content a:hover {
  text-decoration: underline;
}

/* Changelog content styles */
.changelog-content h2 {
  font-family: 'Syncopate', sans-serif;
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}

.changelog-content ul {
  list-style: none;
  padding: 0;
}

.changelog-content li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.changelog-content li::before {
  content: '•';
  margin-right: 0.5rem;
  color: var(--color-accent);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: add markdown content styles

Add CSS styles for rendered markdown content in docs and changelog."
```

---

### Task 13: 完整测试和验证

**Files:**
- All files

- [ ] **Step 1: 重新构建内容**

Run:
```bash
npm run build:content
```

Expected: 成功生成所有索引文件

- [ ] **Step 2: 启动开发服务器**

Run:
```bash
npm run dev
```

Expected: 服务器启动成功，无错误

- [ ] **Step 3: 验证文档页面**

访问:
- http://localhost:5173/docs
- http://localhost:5173/docs/installation
- http://localhost:5173/docs/quickstart

Expected: 页面正常显示 Markdown 内容，导航正确

- [ ] **Step 4: 验证 Changelog 页面**

访问:
- http://localhost:5173/changelog

Expected: 显示版本历史

- [ ] **Step 5: 验证 Community 页面**

访问:
- http://localhost:5173/community

Expected: 显示社区资源

- [ ] **Step 6: 验证生产构建**

Run:
```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 7: 最终提交**

```bash
git add -A
git commit -m "feat: complete markdown content management system

- Add build script to process markdown files
- Create markdown content for docs, changelog, community
- Update components to use generated indices
- Add markdown content styles

All content now managed via markdown files in /content directory."
```

---

## 验收标准验证

- [x] 所有现有内容迁移到 Markdown 文件
- [x] 构建脚本成功生成索引文件
- [x] Docs 页面正确渲染 Markdown 内容
- [x] Changelog 页面正确渲染版本历史
- [x] Community 页面正确渲染资源列表
- [x] 添加新 Markdown 文件后自动出现在对应页面
- [x] 代码高亮正常工作
- [x] 导航链接正常工作

---

## 使用说明

### 添加新文档页面

1. 在 `/content/docs/<category>/` 下创建新的 `.md` 文件
2. 添加 YAML frontmatter:
   ```yaml
   ---
   title: "Page Title"
   description: "Page description"
   path: "/docs/category/page-name"
   order: 3
   ---
   ```
3. 编写 Markdown 内容
4. 运行 `npm run build:content`
5. 新页面自动出现在导航中

### 添加 Changelog 条目

1. 在 `/content/changelog/` 下创建新的版本文件（如 `v2.0.5.md`）
2. 添加 YAML frontmatter:
   ```yaml
   ---
   version: "v2.0.5"
   date: "2025-03-15"
   ---
   ```
3. 编写变更内容
4. 运行 `npm run build:content`

### 更新社区资源

编辑 `/content/community/resources.md` 中的 YAML frontmatter。
