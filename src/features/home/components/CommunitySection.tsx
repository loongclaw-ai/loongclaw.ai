import type { FC } from 'react';
import { useRef } from 'react';
import { Github, MessageCircle, Send, Ghost, Camera, MessagesSquare, Bird, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getCommunityIndex } from '../../../utils/content-loader';

const getIcon = (type: string) => {
  switch (type) {
    case 'github': return Github;
    case 'x': return Twitter;
    case 'discord': return MessageCircle;
    case 'telegram': return Send;
    case 'reddit': return Ghost;
    case 'xiaohongshu': return Camera;
    case 'wechat': return MessagesSquare;
    case 'feishu': return Bird;
    default: return Github;
  }
};

const CommunitySection: FC = () => {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);
  const dividerColor = 'var(--color-border)';
  const { resources } = getCommunityIndex();

  return (
    <section className="section-padding" style={{ borderTop: `1px solid ${dividerColor}` }}>
      {/* Section header */}
      <div
        ref={headerRef}
        className="section-header"
        style={{ textAlign: 'center' }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          {t('community.title')}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t('community.subtitle')}
        </p>
      </div>

      {/* Community Resources Grid */}
      <div
        className="community-grid"
        style={{
          display: 'grid',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto 3rem',
        }}
      >
        {resources.map((resource) => {
          const key = resource.type || resource.title.toLowerCase();
          const Icon = getIcon(key);

          return (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="community-link-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Icon size={24} style={{ color: 'var(--color-text-primary)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                {t(`community_page.resources.${key}.title`, { defaultValue: resource.title })}
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {t(`community_page.resources.${key}.description`, { defaultValue: resource.description })}
            </p>
          </a>
          );
        })}
      </div>

      {/* A Letter from the Developer - HIDDEN
      <div
        id="developer-letter"
        ref={envelopeRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto 2rem',
          perspective: '1000px',
          overflowAnchor: 'none',
        }}
      >
        <style>
          {`
            @keyframes envelopeOpen {
              0% {
                transform: rotateX(0deg);
              }
              100% {
                transform: rotateX(180deg);
              }
            }
            @keyframes letterSlideUp {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .envelope-flap {
              transform-origin: top;
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .envelope-open .envelope-flap {
              transform: rotateX(180deg);
            }
          `}
        </style>
        {!isOpen ? (
          <div
            onClick={() => setIsOpen(true)}
            className="envelope-wrapper"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  var(--color-border) 20%, 
                  var(--color-border) 80%, 
                  transparent 100%)`,
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--color-text-primary)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                }}
              >
                <Mail size={56} strokeWidth={1.25} />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    background: 'var(--color-accent)',
                    borderRadius: '50%',
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
                letterSpacing: '0.02em',
              }}
            >
              {t('community.letter_title')}
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <span>{t('community.click_to_open')}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.6 }}
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </p>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              overflow: 'hidden',
              animation: 'envelopeExpand 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'top center',
            }}
          >
            <style>
              {`
                @keyframes envelopeExpand {
                  0% {
                    opacity: 0;
                    transform: scale(0.98);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}
            </style>
            <div
              style={{
                padding: '1.5rem 2.5rem',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--color-bg-tertiary)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Mail size={20} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} />
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {t('community.letter_title')}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-bg-secondary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
                aria-label="Close letter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              style={{
                padding: '2.5rem',
                animation: 'letterSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both',
              }}
            >
              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.9',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '650px',
                  margin: '0 auto',
                }}
              >
                <p
                  style={{
                    marginBottom: '1.5rem',
                    fontSize: '1.05rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {t('community.greeting')}
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('community.p1')}
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('community.p2')}
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('community.p3')}
                </p>
                <p
                  style={{
                    marginBottom: '2rem',
                    fontSize: '1.05rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {t('community.p4')}
                </p>
                <div
                  style={{
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '0.5rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {t('community.signoff')}
                  </p>
                  <p
                    style={{
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      fontSize: '1.05rem',
                    }}
                  >
                    {t('community.team')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      */}

      {/* Social Links - HIDDEN because redundant with grid above
      <div style={{ marginBottom: '1rem' }}>
        <SocialLinks />
      </div>
      */}
    </section>
  );
};

export default CommunitySection;
