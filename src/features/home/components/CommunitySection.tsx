import type { FC } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { useTheme, THEMES } from '../../../contexts/useTheme';

const CommunitySection: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? 'var(--color-border)'
    : 'rgb(177, 35, 28)';

  // Star History theme URLs
  const starHistoryUrl = isDark
    ? 'https://api.star-history.com/svg?repos=loongclaw-ai/loongclaw&type=Date&theme=dark'
    : 'https://api.star-history.com/svg?repos=loongclaw-ai/loongclaw&type=Date';
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: `1px solid ${dividerColor}`,
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
          Community & Ecosystem
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Join our open source community and help advance the Agentic OS
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
          <img
            src={starHistoryUrl}
            alt="Star History Chart"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
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
          Thanks to our sponsor
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
          <span>Contribute on GitHub</span>
        </a>
      </div>
    </section>
  );
};

export default CommunitySection;
