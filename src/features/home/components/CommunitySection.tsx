import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import SocialLinks from './SocialLinks';

const CommunitySection: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const dividerColor = 'var(--color-border)';

  const scrollTargetToTop = () => {
    const target = headerRef.current ?? envelopeRef.current;
    if (!target) return;

    const main = (target.closest('main') as HTMLElement | null) ??
      (document.querySelector('main') as HTMLElement | null);

    if (main) {
      const targetRect = target.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();
      const top = main.scrollTop + (targetRect.top - mainRect.top);

      main.scrollTo({
        top,
        behavior: 'smooth',
      });
      return;
    }

    const top = window.scrollY + target.getBoundingClientRect().top;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isOpen) {
      const frame = window.requestAnimationFrame(() => {
        scrollTargetToTop();
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }
  }, [isOpen]);
  return (
    <section
      style={{
        padding: '2rem 0',
        borderTop: `1px solid ${dividerColor}`,
      }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
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

      {/* A Letter from the Developer */}
      <div
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
            {/* Decorative envelope lines */}
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
              A Letter from the Developer
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
              <span>Click to open</span>
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
            {/* Envelope header */}
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
                  A Letter from the Developer
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
            {/* Letter content */}
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
                  Dear Community Members,
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  When we started building LoongClaw, our vision was simple: create an Agentic OS that empowers developers to build intelligent, autonomous applications with ease. Today, we're excited to share this journey with you.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  This project represents countless hours of development, testing, and refinement. But more importantly, it represents our commitment to open source and the belief that the best software is built together, as a community.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Whether you're here to contribute code, report bugs, or simply explore what we've built — welcome. Your feedback, ideas, and enthusiasm are what will make LoongClaw truly great.
                </p>
                <p
                  style={{
                    marginBottom: '2rem',
                    fontSize: '1.05rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Let's build the future of Agentic OS, together.
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
                    With gratitude,
                  </p>
                  <p
                    style={{
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      fontSize: '1.05rem',
                    }}
                  >
                    The LoongClaw Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div style={{ marginBottom: '1rem' }}>
        <SocialLinks />
      </div>
    </section>
  );
};

export default CommunitySection;
