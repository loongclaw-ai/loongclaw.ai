# LoongClaw 主页内容丰富化实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为主页增加丰富的内容区块，包括功能展示、快速开始指南、架构可视化、社区展示和页脚。

**Architecture:** 采用组件化设计，每个 section 为独立组件，通过 HomePage 组合。使用现有 CSS 变量系统保持一致性，Lucide React 提供图标。

**Tech Stack:** React + TypeScript + CSS 变量 + Lucide React

**参考文档:** [设计规范](../specs/2026-03-11-loongclaw-homepage-design.md)

---

## 文件结构

### 新增文件

| 文件 | 责任 |
|------|------|
| `src/features/home/components/FeaturesSection.tsx` | 核心功能展示区域，包含 3 个功能卡片 |
| `src/features/home/components/FeatureCard.tsx` | 单个功能卡片组件 |
| `src/features/home/components/QuickStartSection.tsx` | 快速开始指南区域 |
| `src/features/home/components/StepIndicator.tsx` | 步骤指示器组件 |
| `src/features/home/components/CodeBlock.tsx` | 可复制代码块组件 |
| `src/features/home/components/ArchitectureSection.tsx` | 架构可视化区域 |
| `src/features/home/components/CommunitySection.tsx` | 社区展示区域 |
| `src/features/home/components/SocialLinks.tsx` | 社交链接组件 |
| `src/components/layout/Footer.tsx` | 页脚组件 |

### 修改文件

| 文件 | 修改内容 |
|------|----------|
| `src/features/home/index.tsx` | 导入并渲染所有新 sections |
| `src/features/home/components/HeroSection.tsx` | 微调样式，与新设计保持一致 |
| `src/App.css` 或 `src/index.css` | 添加 section 通用样式和动画 |

---

## Chunk 1: 基础组件和工具函数

### Task 1: 安装 Lucide React 图标库

**文件:**
- 修改: `package.json`

- [ ] **Step 1: 安装依赖**

```bash
npm install lucide-react
```

- [ ] **Step 2: 验证安装**

```bash
npm list lucide-react
```

Expected: `lucide-react@^0.x.x`

- [ ] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "deps: add lucide-react for icons"
```

---

### Task 2: 创建 CodeBlock 组件（可复制代码块）

**文件:**
- 创建: `src/features/home/components/CodeBlock.tsx`

**设计规范:**
- 终端风格外观
- 支持一键复制
- 深色/浅色主题适配
- 使用现有 CSS 变量

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/CodeBlock.tsx
import type { FC } from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-tertiary)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.5rem',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre
        style={{
          padding: '1rem',
          margin: 0,
          overflow: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: 'var(--color-text-primary)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/CodeBlock.tsx
git commit -m "feat: add CodeBlock component with copy functionality"
```

---

### Task 3: 创建 StepIndicator 组件

**文件:**
- 创建: `src/features/home/components/StepIndicator.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/StepIndicator.tsx
import type { FC } from 'react';

interface StepIndicatorProps {
  steps: { number: number; title: string; description: string }[];
  activeStep?: number;
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, activeStep = 1 }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {steps.map((step, index) => {
        const isActive = step.number === activeStep;
        const isCompleted = step.number < activeStep;

        return (
          <div
            key={step.number}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              flex: 1,
            }}
          >
            {/* Step number circle */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                background: isActive
                  ? 'var(--color-accent)'
                  : isCompleted
                  ? 'var(--color-success)'
                  : 'var(--color-bg-tertiary)',
                color: isActive || isCompleted
                  ? 'var(--color-bg-primary)'
                  : 'var(--color-text-muted)',
                border: `2px solid ${
                  isActive
                    ? 'var(--color-accent)'
                    : isCompleted
                    ? 'var(--color-success)'
                    : 'var(--color-border)'
                }`,
                transition: 'all 0.3s ease',
              }}
            >
              {step.number}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '2px',
                  background: isCompleted
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                  marginLeft: '60px',
                  marginTop: '20px',
                }}
              />
            )}

            {/* Title */}
            <span
              style={{
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              {step.title}
            </span>

            {/* Description */}
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.75rem',
                textAlign: 'center',
                maxWidth: '150px',
              }}
            >
              {step.description}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/StepIndicator.tsx
git commit -m "feat: add StepIndicator component for multi-step flows"
```

---

## Chunk 2: Feature 相关组件

### Task 4: 创建 FeatureCard 组件

**文件:**
- 创建: `src/features/home/components/FeatureCard.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/FeatureCard.tsx
import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  details,
}) => {
  return (
    <div
      className="feature-card"
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          background: 'var(--color-bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent)',
        }}
      >
        <Icon size={24} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Details list */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {details.map((detail, index) => (
          <li
            key={index}
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
              }}
            />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/FeatureCard.tsx
git commit -m "feat: add FeatureCard component for feature showcase"
```

---

### Task 5: 创建 FeaturesSection 组件

**文件:**
- 创建: `src/features/home/components/FeaturesSection.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/FeaturesSection.tsx
import type { FC } from 'react';
import { Shield, Zap, Puzzle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Shield,
    title: '安全内核',
    description:
      'Capability Token 机制，每调用都需授权，人工审批，审计追踪',
    details: [
      'Capability-based policy engine',
      'Human approval gates',
      'JSONL SIEM export',
      'Denylist precedence',
    ],
  },
  {
    icon: Zap,
    title: '轻量高效',
    description: '边缘设备运行，256MB RAM，<0.4s 冷启动，42 TOK/s',
    details: [
      'Raspberry Pi 4 compatible',
      '256 MB RAM footprint',
      '< 0.4s cold boot',
      '42 TOK/s inference',
    ],
  },
  {
    icon: Puzzle,
    title: '简单扩展',
    description: 'WASM 插件，多语言支持，7-crate DAG 架构，可替换组件',
    details: [
      'WASM runtime execution',
      'Multi-language plugins',
      '7-crate strict DAG',
      'Pluggable adapters',
    ],
  },
];

const FeaturesSection: FC = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          核心特性
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          安全、轻量、可扩展的 AI 助手运行时
        </p>
      </div>

      {/* Feature cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/FeaturesSection.tsx
git commit -m "feat: add FeaturesSection with 3 feature cards"
```

---

## Chunk 3: QuickStart 相关组件

### Task 6: 创建 QuickStartSection 组件

**文件:**
- 创建: `src/features/home/components/QuickStartSection.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/QuickStartSection.tsx
import type { FC } from 'react';
import StepIndicator from './StepIndicator';
import CodeBlock from './CodeBlock';

const steps = [
  { number: 1, title: '安装', description: 'Clone and run install script' },
  { number: 2, title: '配置', description: 'Set your API key' },
  { number: 3, title: '聊天', description: 'Start chatting' },
];

const installCode = `# Clone the repository
git clone https://github.com/loongclaw-ai/loongclaw.git
cd loongclaw

# Run install script (Linux/macOS)
./scripts/install.sh --setup

# Or Windows PowerShell
pwsh ./scripts/install.ps1 -Setup`;

const configCode = `# Set your provider API key
export PROVIDER_API_KEY=sk-...

# Or configure via setup command
loongclaw setup`;

const chatCode = `# Start interactive chat
loongclaw chat

# Or run diagnostics
loongclaw doctor --fix`;

const QuickStartSection: FC = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          5 分钟上手
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          简单三步，开始你的 LoongClaw 之旅
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ marginBottom: '3rem' }}>
        <StepIndicator steps={steps} activeStep={1} />
      </div>

      {/* Code blocks grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              1
            </span>
            安装
          </h3>
          <CodeBlock code={installCode} language="bash" />
        </div>

        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              2
            </span>
            配置
          </h3>
          <CodeBlock code={configCode} language="bash" />
        </div>

        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              3
            </span>
            运行
          </h3>
          <CodeBlock code={chatCode} language="bash" />
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/QuickStartSection.tsx
git commit -m "feat: add QuickStartSection with step-by-step guide"
```

---

## Chunk 4: Architecture 组件

### Task 7: 创建 ArchitectureSection 组件

**文件:**
- 创建: `src/features/home/components/ArchitectureSection.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/ArchitectureSection.tsx
import type { FC } from 'react';

const crates = [
  {
    name: 'contracts',
    role: 'Shared types, capability model. Zero deps',
    level: 0,
    color: 'var(--color-accent)',
  },
  {
    name: 'kernel',
    role: 'Policy engine, audit, capability tokens',
    level: 1,
    deps: ['contracts'],
    color: '#3B82F6',
  },
  {
    name: 'protocol',
    role: 'Transport contracts, typed routing',
    level: 1,
    color: '#22c55e',
  },
  {
    name: 'app',
    role: 'Providers, tools, channels, memory',
    level: 2,
    deps: ['contracts', 'kernel'],
    color: '#F97316',
  },
  {
    name: 'spec',
    role: 'Execution spec runner',
    level: 2,
    deps: ['contracts', 'kernel', 'protocol'],
    color: '#A855F7',
  },
  {
    name: 'bench',
    role: 'Benchmark harness',
    level: 2,
    deps: ['contracts', 'kernel', 'spec'],
    color: '#EC4899',
  },
  {
    name: 'daemon',
    role: 'CLI binary (loongclawd)',
    level: 3,
    deps: ['all'],
    color: '#EF4444',
  },
];

const highlights = [
  '零循环依赖 - 严格的 DAG 结构',
  '稳定内核契约 - contracts crate 零内部依赖',
  '业务逻辑与核心分离 - extension planes 架构',
  'Capability-gated by default - 每个操作都需授权',
];

const ArchitectureSection: FC = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          7-Crate 严格 DAG 架构
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          清晰的依赖方向，稳定的内核契约
        </p>
      </div>

      {/* Architecture diagram */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
        }}
      >
        {/* Level 0: Leaf */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CrateNode crate={crates[0]} />
        </div>

        {/* Level 1 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <CrateNode crate={crates[1]} />
          <CrateNode crate={crates[2]} />
        </div>

        {/* Level 2 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <CrateNode crate={crates[3]} />
          <CrateNode crate={crates[4]} />
          <CrateNode crate={crates[5]} />
        </div>

        {/* Level 3: Binary */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CrateNode crate={crates[6]} isBinary />
        </div>
      </div>

      {/* Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {highlights.map((highlight, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                color: 'var(--color-success)',
                fontSize: '1rem',
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

interface CrateNodeProps {
  crate: {
    name: string;
    role: string;
    level: number;
    color: string;
    deps?: string[];
  };
  isBinary?: boolean;
}

const CrateNode: FC<CrateNodeProps> = ({ crate, isBinary }) => {
  return (
    <div
      style={{
        padding: '0.75rem 1.25rem',
        background: isBinary
          ? 'var(--color-bg-tertiary)'
          : 'var(--color-bg-secondary)',
        border: `2px solid ${isBinary ? 'var(--color-accent)' : crate.color}`,
        borderRadius: '6px',
        textAlign: 'center',
        minWidth: '140px',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          color: crate.color,
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.25rem',
        }}
      >
        {crate.name}
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.4,
        }}
      >
        {crate.role}
      </div>
      {isBinary && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            padding: '0.15rem 0.4rem',
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            fontSize: '0.6rem',
            fontWeight: 700,
            borderRadius: '4px',
          }}
        >
          BINARY
        </div>
      )}
    </div>
  );
};

export default ArchitectureSection;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/ArchitectureSection.tsx
git commit -m "feat: add ArchitectureSection with 7-crate DAG visualization"
```

---

## Chunk 5: Community 组件

### Task 8: 创建 SocialLinks 组件

**文件:**
- 创建: `src/features/home/components/SocialLinks.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/SocialLinks.tsx
import type { FC } from 'react';
import { Github, MessageCircle, Send, Twitter } from 'lucide-react';

interface SocialLink {
  name: string;
  href: string;
  icon: typeof Github;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/loongclaw-ai/loongclaw',
    icon: Github,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/7kSTX9mca',
    icon: MessageCircle,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/loongclaw',
    icon: Send,
  },
  {
    name: 'X',
    href: 'https://x.com/loongclawai',
    icon: Twitter,
  },
];

const SocialLinks: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            background: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            transition: 'all 0.2s ease',
          }}
          title={link.name}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          <link.icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/SocialLinks.tsx
git commit -m "feat: add SocialLinks component with GitHub, Discord, Telegram, X"
```

---

### Task 9: 创建 CommunitySection 组件

**文件:**
- 创建: `src/features/home/components/CommunitySection.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/features/home/components/CommunitySection.tsx
import type { FC } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import SocialLinks from './SocialLinks';

const CommunitySection: FC = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          社区与生态
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          加入我们的开源社区，共同推动 Agentic OS 的发展
        </p>
      </div>

      {/* Star History */}
      <div
        style={{
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '1rem',
          }}
        >
          GitHub Star History
        </h3>
        <a
          href="https://star-history.com/#loongclaw-ai/loongclaw&Date"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
          }}
        >
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://api.star-history.com/svg?repos=loongclaw-ai/loongclaw&type=Date&theme=dark"
            />
            <img
              src="https://api.star-history.com/svg?repos=loongclaw-ai/loongclaw&type=Date"
              alt="Star History Chart"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </picture>
        </a>
      </div>

      {/* Social Links */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SocialLinks />
      </div>

      {/* Sponsor */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1rem',
          }}
        >
          感谢以下赞助商支持本项目
        </p>
        <a
          href="https://www.volcengine.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          <span
            style={{
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            Volcengine
          </span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Contributing CTA */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <a
          href="https://github.com/loongclaw-ai/loongclaw/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--color-accent)',
            borderRadius: '6px',
            color: 'var(--color-bg-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Github size={18} />
          <span>欢迎贡献代码</span>
        </a>
      </div>
    </section>
  );
};

export default CommunitySection;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/components/CommunitySection.tsx
git commit -m "feat: add CommunitySection with star history and social links"
```

---

## Chunk 6: Footer 组件

### Task 10: 创建 Footer 组件

**文件:**
- 创建: `src/components/layout/Footer.tsx`

- [ ] **Step 1: 编写组件代码**

```tsx
// src/components/layout/Footer.tsx
import type { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: '2rem 0',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left: Copyright */}
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
          }}
        >
          © {currentYear} LoongClaw AI · MIT License
        </div>

        {/* Right: Links */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <a
            href="/README.zh-CN.md"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            简体中文
          </a>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <a
            href="/README.md"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            English
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: 提交**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component with copyright and language links"
```

---

## Chunk 7: 集成到主页

### Task 11: 更新 HomePage 组件

**文件:**
- 修改: `src/features/home/index.tsx`

- [ ] **Step 1: 更新 imports 和组件结构**

```tsx
// src/features/home/index.tsx
import type { FC } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import QuickStartSection from './components/QuickStartSection';
import ArchitectureSection from './components/ArchitectureSection';
import CommunitySection from './components/CommunitySection';
import Footer from '../../components/layout/Footer';

const HomePage: FC = () => {
  return (
    <div
      style={{
        padding: '2rem 4rem',
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <HeroSection />
      <FeaturesSection />
      <QuickStartSection />
      <ArchitectureSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default HomePage;
```

- [ ] **Step 2: 提交**

```bash
git add src/features/home/index.tsx
git commit -m "feat: integrate all sections into HomePage"
```

---

### Task 12: 添加 CSS 样式

**文件:**
- 修改: `src/App.css` 或创建 `src/features/home/styles.css`

检查现有样式文件位置，然后添加 feature-card 的悬停效果样式：

- [ ] **Step 1: 添加样式到现有 CSS 文件**

```css
/* Feature card hover effect */
.feature-card {
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Code block button hover */
.code-block-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Social link hover */
.social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

- [ ] **Step 2: 提交**

```bash
git add src/App.css
git commit -m "style: add hover effects for feature cards and buttons"
```

---

## Chunk 8: 测试和验证

### Task 13: 运行开发服务器并验证

**文件:** N/A

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev
```

- [ ] **Step 2: 验证各 section 正常显示**

检查点:
- [ ] Hero 区域正常显示
- [ ] FeaturesSection 显示 3 个功能卡片
- [ ] QuickStartSection 显示 3 个步骤和代码块
- [ ] ArchitectureSection 显示架构图
- [ ] CommunitySection 显示社交链接和 Star History
- [ ] Footer 显示在页面底部

- [ ] **Step 3: 验证深色/浅色主题切换**

点击主题切换按钮，验证:
- [ ] 所有 section 颜色正确切换
- [ ] 代码块背景色正确
- [ ] 卡片边框和阴影正确

- [ ] **Step 4: 验证响应式布局**

调整浏览器窗口大小:
- [ ] Mobile (< 768px): 单列布局
- [ ] Tablet (768px - 1024px): 双列布局
- [ ] Desktop (> 1024px): 三列布局

- [ ] **Step 5: 验证交互功能**

- [ ] CodeBlock 复制按钮工作正常
- [ ] 所有外部链接可点击
- [ ] 悬停效果正常
- [ ] 按钮状态变化正常

---

### Task 14: 构建并验证生产环境

**文件:** N/A

- [ ] **Step 1: 运行生产构建**

```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 2: 检查构建输出**

```bash
ls -la dist/
```

Expected: 存在 index.html 和 assets 目录

- [ ] **Step 3: 提交所有更改**

```bash
git add .
git commit -m "feat: complete homepage enrichment with all sections"
```

---

## 验收标准

### 功能验收
- [ ] 所有 5 个 section 正常显示
- [ ] CodeBlock 复制功能正常工作
- [ ] 所有外部链接可点击
- [ ] 响应式布局在各断点正常

### 视觉验收
- [ ] 深色/浅色主题切换正常
- [ ] 动画效果流畅（60fps）
- [ ] 悬停效果一致
- [ ] 与现有设计风格统一

### 无障碍验收
- [ ] 键盘导航完整
- [ ] 对比度符合 WCAG AA
- [ ] 按钮有正确的 aria-label

---

## 参考资源

- [设计规范](../specs/2026-03-11-loongclaw-homepage-design.md)
- [UI/UX Pro Max 技能](../../../../../.claude/skills/ui-ux-pro-max/SKILL.md)
- [现有 HeroSection](../../src/features/home/components/HeroSection.tsx)
- [现有 TerminalWindow](../../src/features/home/components/TerminalWindow.tsx)

---

**计划版本**: v1.0
**创建时间**: 2026-03-11
**预计实施时间**: 2-3 小时
