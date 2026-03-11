# LoongClaw 主页设计方案

**日期**: 2026-03-11
**项目**: LoongClaw Website
**目标**: 为主页增加丰富的内容区块，提升用户体验和转化率

---

## 1. 设计目标

### 目标受众
面向终端用户，强调以下核心价值：
- **安全可信**（Capability-based 安全、人工审批、审计追踪）
- **轻量高效**（边缘设备运行、低资源占用）
- **简单易用**（5 分钟上手、CLI 交互、快速部署）

### 内容区块
1. Hero 区域（保留并优化现有）
2. 核心功能展示（新增）
3. 快速开始指南（新增）
4. 架构亮点可视化（新增）
5. 社区/生态展示（新增）

---

## 2. 设计系统

### 视觉风格
**Brutalist Tech + Dark Mode (OLED)**

- **核心特征**: 深色背景、霓虹强调色、终端美学、高对比度
- **字体**: JetBrains Mono / Space Mono（等宽字体，技术感）
- **颜色策略**: Deep Black (#0A0E27) + Neon Accents (#22c55e 绿, #3B82F6 蓝)

### UX 模式
**Minimal Single Column**
- 单一焦点 CTA
- 大量留白
- 移动优先
- 渐进式信息展示

---

## 3. 页面结构

### Section 1: Hero 区域
**位置**: 页面顶部
**现有内容**: 保留并优化

**内容**:
- 大标题: LoongClaw（渐变文字效果）
- 副标题: Rust-first Agentic OS Foundation
- 核心价值主张: "安全、轻量、可扩展的 AI 助手运行时"
- 双 CTA: [Get Started] [View on GitHub]
- 右侧: 动态终端演示（保留现有 TerminalWindow）
- 底部: 技术标签 + 版本徽章

**样式**:
- CyberWires 背景动效（已有）
- 标题渐变效果（Dark: cyan → blue / Light: red gradient）
- StatsMatrix 统计卡片（已有）

---

### Section 2: 核心功能展示
**位置**: Hero 下方
**新增组件**: `FeaturesSection`

**布局**: 3 张卡片横向排列（桌面端）/ 垂直堆叠（移动端）

**卡片内容**:

| 卡片 | 图标 | 标题 | 描述 |
|------|------|------|------|
| 1 | Shield/Lock | 🔒 安全内核 | Capability Token 机制，每调用都需授权，人工审批，审计追踪 |
| 2 | Zap/Bolt | ⚡ 轻量高效 | 边缘设备运行，256MB RAM，<0.4s 冷启动，42 TOK/s |
| 3 | Puzzle/Plug | 🔌 简单扩展 | WASM 插件，多语言支持，7-crate DAG 架构，可替换组件 |

**交互**:
- 悬停时轻微上浮（translateY -4px）+ 阴影加深
- 过渡动画 200ms ease-out
- 图标使用 SVG（Lucide），不使用 emoji

---

### Section 3: 快速开始
**位置**: 功能展示下方
**新增组件**: `QuickStartSection`

**标题**: "5 分钟上手 LoongClaw"

**三步流程展示**:

```
Step 1        Step 2        Step 3
┌──────┐     ┌──────┐     ┌──────┐
│  1   │  →  │  2   │  →  │  3   │
└──────┘     └──────┘     └──────┘
安装          配置           聊天
$ ./install   设置 API Key   $ loongclaw chat
```

**代码块展示**（终端风格）:
```bash
# Clone and install
git clone https://github.com/loongclaw-ai/loongclaw.git
./scripts/install.sh --setup

# Configure
export PROVIDER_API_KEY=sk-...

# Start chatting
loongclaw chat
```

**交互**:
- 代码块支持一键复制
- 步骤指示器有激活状态样式
- 移动端垂直展示，桌面端水平展示

---

### Section 4: 架构亮点
**位置**: 快速开始下方
**新增组件**: `ArchitectureSection`

**标题**: "7-Crate 严格 DAG 架构"

**架构图**（简洁可视化）:
```
              contracts (leaf - zero deps)
                   │
      ┌────────────┼────────────┐
      │            │            │
   kernel      protocol         app
      │            │            │
      └────────────┴────────────┘
                   │
      ┌────────────┼────────────┐
      │            │            │
    spec         bench       daemon
```

**要点列表**:
- ✓ 零循环依赖
- ✓ 稳定内核契约
- ✓ 业务逻辑与核心分离
- ✓ Capability-gated by default

**交互**:
- 使用 CSS Grid 或 SVG 绘制简洁的 DAG 图
- 节点悬停显示 crate 简介 tooltip

---

### Section 5: 社区与生态
**位置**: 架构亮点下方
**新增组件**: `CommunitySection`

**内容**:

1. **GitHub Stars 趋势图**
   - 使用 star-history.com 的嵌入图
   - 链接到 GitHub 仓库

2. **社交链接**
   - GitHub
   - Discord
   - Telegram
   - X (Twitter)
   - Reddit

3. **赞助商展示**
   - Volcengine Logo
   - "Thanks to Volcengine for sponsoring"

4. **贡献指引**
   - "欢迎贡献代码 →"
   - 链接到 CONTRIBUTING.md

---

### Footer
**位置**: 页面底部
**新增组件**: `Footer`

**内容**:
```
© 2026 LoongClaw AI | MIT License | 中文 / English
```

---

## 4. 响应式设计

### 断点

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| Mobile | < 768px | 单列布局，卡片垂直堆叠，终端窗口移到 Hero 下方 |
| Tablet | 768px - 1024px | 双列布局，功能卡片 2+1 排列 |
| Desktop | > 1024px | 完整三列布局，终端窗口在 Hero 右侧 |

### 移动端适配
- Hero 区域：终端窗口移到标题下方
- 功能卡片：垂直堆叠
- 快速开始：垂直步骤展示
- 导航：保持现有 sticky nav

---

## 5. 交互设计规范

### 动画参数
- 微交互: 150-300ms
- 卡片悬停: 200ms ease-out
- 页面滚动: 平滑滚动

### 悬停效果
- 功能卡片: translateY(-4px) + box-shadow
- 按钮: opacity 变化 + 发光效果
- 链接: 颜色过渡

### 无障碍
- 对比度 ≥ 4.5:1
- Focus 状态可见（2-4px outline）
- 支持 prefers-reduced-motion

---

## 6. 组件清单

### 新增组件

| 组件名 | 路径 | 描述 |
|--------|------|------|
| FeaturesSection | `src/features/home/components/FeaturesSection.tsx` | 核心功能展示 |
| FeatureCard | `src/features/home/components/FeatureCard.tsx` | 单个功能卡片 |
| QuickStartSection | `src/features/home/components/QuickStartSection.tsx` | 快速开始指南 |
| StepIndicator | `src/features/home/components/StepIndicator.tsx` | 步骤指示器 |
| CodeBlock | `src/features/home/components/CodeBlock.tsx` | 可复制代码块 |
| ArchitectureSection | `src/features/home/components/ArchitectureSection.tsx` | 架构展示 |
| CommunitySection | `src/features/home/components/CommunitySection.tsx` | 社区展示 |
| SocialLinks | `src/features/home/components/SocialLinks.tsx` | 社交链接 |
| Footer | `src/components/layout/Footer.tsx` | 页脚 |

### 修改组件

| 组件名 | 路径 | 修改内容 |
|--------|------|----------|
| HomePage | `src/features/home/index.tsx` | 添加新 sections |
| HeroSection | `src/features/home/components/HeroSection.tsx` | 优化文案和样式 |

---

## 7. 技术实现

### 依赖
- Lucide React（图标）
- 现有样式系统（CSS 变量）

### 样式方案
- 使用现有 CSS 变量系统
- 保持与现有组件一致的命名规范
- 新增组件专用样式放在组件文件内

### 性能考虑
- 图片懒加载（如有）
- 代码块使用 pre/code 标签，避免额外依赖
- 动画使用 transform/opacity，避免布局抖动

---

## 8. 验收标准

### 视觉验收
- [ ] 所有区块按设计稿实现
- [ ] 深色/浅色主题切换正常
- [ ] 响应式布局在各断点正常
- [ ] 动画效果流畅（60fps）

### 功能验收
- [ ] 代码块复制功能正常
- [ ] 所有链接可点击
- [ ] 悬停效果正常
- [ ] 导航锚点跳转正常

### 无障碍验收
- [ ] 键盘导航完整
- [ ] 屏幕阅读器可读
- [ ] 对比度符合 WCAG AA

---

## 9. 参考资源

### 设计灵感
- UI/UX Pro Max 技能建议
- LoongClaw README.md 内容
- 现有 HeroSection 和 TerminalWindow 组件风格

### 技术参考
- 现有 theme system（CSS 变量）
- CyberWires 背景动效
- StatsMatrix 统计卡片样式

---

**文档版本**: v1.0
**作者**: Claude Code
**状态**: 待实施
