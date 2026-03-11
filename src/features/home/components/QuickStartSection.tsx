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
