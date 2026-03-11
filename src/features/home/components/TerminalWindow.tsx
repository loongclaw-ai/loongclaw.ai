// src/features/home/components/TerminalWindow.tsx
import type { FC } from "react";
import { useTheme, THEMES } from "../../../contexts/useTheme";

const TerminalWindow: FC = () => {
  const { theme } = useTheme();

  const isDark = theme === THEMES.DARK;
  const terminalBg = isDark
    ? "rgba(13, 17, 22, 0.95)"
    : "rgba(252, 245, 226, 0.95)";
  const headerBg = isDark
    ? "rgba(139, 148, 158, 0.05)"
    : "rgba(120, 110, 90, 0.05)";
  const cornerBorderColor = isDark
    ? "var(--color-text-muted)"
    : "rgb(177, 35, 28)";
  const scanLineColor = isDark
    ? "rgba(0,0,0,0.03)"
    : "rgba(177, 35, 28, 0.03)";

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        alignSelf: "center",
      }}
    >
      {/* Corner accents - tech style */}
      <div
        style={{
          position: "absolute",
          width: "24px",
          height: "24px",
          borderTop: `1px solid ${cornerBorderColor}`,
          borderLeft: `1px solid ${cornerBorderColor}`,
          top: "-8px",
          left: "-8px",
          zIndex: 3,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "24px",
          height: "24px",
          borderBottom: "1px solid var(--color-text-muted)",
          borderRight: "1px solid var(--color-text-muted)",
          bottom: "-8px",
          right: "-8px",
          zIndex: 3,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Terminal container with glow */}
      <div
        style={{
          background: terminalBg,
          backdropFilter: "blur(12px)",
          border: "1px solid var(--color-border)",
          borderRadius: "6px",
          width: "100%",
          minWidth: "420px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, var(--color-text-secondary) 50%, transparent 100%)",
            opacity: 0.3,
          }}
        />

        {/* Terminal header */}
        <div
          style={{
            borderBottom: "1px solid var(--color-border)",
            padding: "0.6rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: headerBg,
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-mono)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            loongclaw@claw:~$
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-text-muted)",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-text-muted)",
                opacity: 0.3,
              }}
            />
          </div>
        </div>

        {/* Terminal content */}
        <div
          style={{
            padding: "1.25rem",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            minHeight: "260px",
            fontFamily: "var(--font-mono)",
            position: "relative",
          }}
        >
          {/* Scan line effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${scanLineColor} 2px, ${scanLineColor} 4px)`,
              pointerEvents: "none",
              opacity: isDark ? 0.5 : 0.3,
            }}
          />

          <div
            style={{
              marginBottom: "0.75rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            # Clone the repository
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                color: "var(--color-text-secondary)",
                marginRight: "0.5rem",
              }}
            >
              $
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              git clone https://github.com/loongclaw-ai/loongclaw.git
            </span>
          </div>
          <br />

          <div
            style={{
              marginBottom: "0.75rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            # Run install script (one-time setup)
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                color: "var(--color-text-secondary)",
                marginRight: "0.5rem",
              }}
            >
              $
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              ./scripts/install.sh
            </span>
          </div>
          <div
            style={{
              marginBottom: "0.5rem",
              color: "var(--color-text-secondary)",
              fontSize: "0.75rem",
            }}
          >
            ==&gt; Running initial setup
            <br />
            Done.
            <br />
            Try: loongclaw --help
          </div>
          <br />

          <div
            style={{
              marginBottom: "0.75rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            # First time setup
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                color: "var(--color-text-secondary)",
                marginRight: "0.5rem",
              }}
            >
              $
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              loongclaw onboard
            </span>
          </div>
          <div
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.75rem",
            }}
          >
            &gt; provider setup... [OK]
            <br />
            &gt; model setup... [OK]
            <br />
            &gt; finish...
            <br />
            <br />
            <div style={{ marginBottom: "0.5rem" }}>
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  marginRight: "0.5rem",
                }}
              >
                $
              </span>
              <span style={{ color: "var(--color-text-primary)" }}>
                loongclaw chat
              </span>
              <div
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                &gt; Hi LoongClaw! Can you tell me a joke?
                <br />
                &gt; Why did the AI go to therapy? Because it had too many
                layers of issues!
              </div>
              &gt;&nbsp;
              <span
                className="terminal-cursor"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "16px",
                  background: "var(--color-text-secondary)",
                  verticalAlign: "middle",
                  marginLeft: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
