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
