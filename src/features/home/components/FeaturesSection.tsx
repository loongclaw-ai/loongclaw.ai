// src/features/home/components/FeaturesSection.tsx
import type { FC } from 'react';
import { Shield, Zap, Puzzle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Shield,
    title: 'Secure Kernel',
    description:
      'Capability Token mechanism, authorization required for every call, human approval, audit trails',
    details: [
      'Capability-based policy engine',
      'Human approval gates',
      'JSONL SIEM export',
      'Denylist precedence',
    ],
  },
  {
    icon: Zap,
    title: 'Lightweight & Efficient',
    description: 'Edge device ready, 256MB RAM, <0.4s cold boot, 42 TOK/s',
    details: [
      'Raspberry Pi 4 compatible',
      '256 MB RAM footprint',
      '< 0.4s cold boot',
      '42 TOK/s inference',
    ],
  },
  {
    icon: Puzzle,
    title: 'Easy to Extend',
    description: 'WASM plugins, multi-language support, 7-crate DAG architecture, pluggable components',
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
          Core Features
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Secure, lightweight, and extensible AI assistant runtime
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
