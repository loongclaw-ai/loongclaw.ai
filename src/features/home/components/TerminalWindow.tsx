// src/features/home/components/TerminalWindow.tsx
import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTheme } from '../../../contexts/useTheme';

const TerminalWindow: FC = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Dynamic styles based on theme
  const terminalBg = theme === 'dark'
    ? 'rgba(13, 17, 22, 0.95)'
    : 'rgba(232, 244, 246, 0.95)';

  const headerBg = theme === 'dark'
    ? 'rgba(139, 148, 158, 0.05)'
    : 'rgba(70, 100, 110, 0.05)';

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        alignSelf: 'center',
      }}
    >
      {/* Corner accents */}
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderTop: '1px solid var(--color-text-muted)',
          borderLeft: '1px solid var(--color-text-muted)',
          top: '-5px',
          left: '-5px',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderBottom: '1px solid var(--color-text-muted)',
          borderRight: '1px solid var(--color-text-muted)',
          bottom: '-5px',
          right: '-5px',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      {/* Terminal container */}
      <div
        style={{
          background: terminalBg,
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--color-border)',
          width: '100%',
          minWidth: '400px',
          boxShadow: theme === 'dark'
            ? '0 20px 60px rgba(0,0,0,0.8)'
            : '0 20px 60px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            borderBottom: '1px solid var(--color-border)',
            padding: '0.5rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: headerBg,
          }}
        >
          <span
            style={{
              fontSize: '0.6rem',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            // TERM: ROOT@OCLW_CORE
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                background: 'var(--color-text-muted)',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                background: 'var(--color-text-muted)',
                opacity: 0.3,
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                background: 'var(--color-text-muted)',
                opacity: 0.3,
              }}
            />
          </div>
        </div>

        {/* Terminal content */}
        <div
          style={{
            padding: '1.5rem',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            minHeight: '250px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div
            style={{
              marginBottom: '0.5rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            # Install via package manager
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-secondary)', marginRight: '0.5rem' }}>
              ~ $
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>
              curl -sSfL https://loongclaw.ai/install.sh | sh
            </span>
          </div>
          <br />

          <div
            style={{
              marginBottom: '0.5rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            # Pull optimized local model
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-secondary)', marginRight: '0.5rem' }}>
              ~ $
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>claw pull literati-7b-q4</span>
          </div>
          <div
            style={{
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
              opacity: 0.6,
            }}
          >
            [====================&gt;] 100% | 3.8GB
            <br />
            Verification complete. SHA256 matched.
          </div>
          <br />

          <div
            style={{
              marginBottom: '0.5rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            # Execute shell query
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-secondary)', marginRight: '0.5rem' }}>
              ~ $
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>
              claw run --prompt &quot;Write a python script to parse syslogs&quot;
            </span>
          </div>
          <div style={{ color: 'var(--color-text-primary)', opacity: 0.6 }}>
            &gt; initializing tensor backend... [OK]
            <br />
            &gt; generating output stream...
            <br />
            <br />
            <span style={{ color: 'var(--color-text-primary)', opacity: 1 }}>
              import re
              <br />
              def parse_syslog(file_path):
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;pattern = re.compile(r&apos;^(?P&lt;time&gt;\S+\s+\d+\s+\d+:\d+:\d+)&apos;)
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '15px',
                background: 'var(--color-text-secondary)',
                verticalAlign: 'middle',
                opacity: cursorVisible ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
