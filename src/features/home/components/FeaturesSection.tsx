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
