import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../../contexts/useTheme";

const TerminalWindow: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const isDark = theme === THEMES.DARK;
  const terminalBg = isDark
    ? "rgba(13, 17, 22, 0.95)"
    : "rgba(251, 251, 251, 0.95)";
  const headerBg = isDark
    ? "rgba(139, 148, 158, 0.05)"
    : "rgba(0, 0, 0, 0.05)";
  const cornerBorderColor = isDark
    ? "var(--color-text-muted)"
    : "rgb(177, 35, 28)";
  const scanLineColor = isDark
    ? "rgba(0,0,0,0.03)"
    : "rgba(177, 35, 28, 0.03)";

  const operatorPath = [
    t("terminal.path_step_1"),
    t("terminal.path_step_2"),
    t("terminal.path_step_3"),
  ];

  const runtimeSurface = [
    t("terminal.surface_1"),
    t("terminal.surface_2"),
    t("terminal.surface_3"),
    t("terminal.surface_4"),
  ];

  const changedFiles = [
    "gateway.toml",
    "provider.env",
    "skills/index",
  ];

  return (
    <div className="terminal-visual-stack">
      <div className="terminal-overlay terminal-overlay-path">
        <span className="terminal-overlay-label">{t("terminal.overlay_path_title")}</span>
        <div className="terminal-overlay-list">
          {operatorPath.map((item, index) => (
            <div key={item} className="terminal-overlay-row">
              <span className="terminal-overlay-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-overlay terminal-overlay-runtime">
        <span className="terminal-overlay-label">{t("terminal.overlay_runtime_title")}</span>
        <div className="terminal-overlay-pills">
          {runtimeSurface.map((item) => (
            <span key={item} className="terminal-overlay-pill">{item}</span>
          ))}
        </div>
      </div>

      <div className="terminal-overlay terminal-overlay-files">
        <span className="terminal-overlay-label">{t("terminal.overlay_files_title")}</span>
        <div className="terminal-overlay-list">
          {changedFiles.map((item) => (
            <div key={item} className="terminal-overlay-row">
              <span className="terminal-overlay-index">+</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-overlay terminal-overlay-status">
        <span className="terminal-overlay-label">{t("terminal.overlay_status_title")}</span>
        <div className="terminal-overlay-metric">
          <strong>12</strong>
          <span>{t("terminal.overlay_status_files")}</span>
        </div>
        <div className="terminal-overlay-metric">
          <strong>OK</strong>
          <span>{t("terminal.overlay_status_health")}</span>
        </div>
      </div>

      <div
        className="terminal-window terminal-shell"
        style={{
          position: "relative",
          zIndex: 2,
          alignSelf: "stretch",
        }}
      >
        <div
          className="terminal-corner terminal-corner-tl"
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
          className="terminal-corner terminal-corner-br"
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

        <div
          className="terminal-frame"
          style={{
            background: terminalBg,
            backdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
            borderRadius: "6px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="terminal-top-glow"
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

          <div
            className="terminal-shell-header"
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
              className="terminal-shell-prompt"
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
                className="terminal-status-dot terminal-status-dot-live"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              loong@claw:~$
            </span>
            <div className="terminal-shell-controls" style={{ display: "flex", gap: "6px" }}>
              <div
                className="terminal-status-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--color-text-muted)",
                  opacity: 0.5,
                }}
              />
              <div
                className="terminal-status-dot terminal-status-dot-faint"
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

          <div
            className="terminal-shell-body"
            style={{
              padding: "1.25rem",
              fontSize: "0.8rem",
              lineHeight: 1.5,
              minHeight: "260px",
              fontFamily: "var(--font-mono)",
              position: "relative",
            }}
          >
            <div
              className="terminal-scan"
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

            <div className="terminal-segment" style={{ animationDelay: "60ms" }}>
              <div
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                }}
              >
                {t("terminal.line1", "# Recommended install")}
              </div>
              <div className="terminal-command" style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--color-text-secondary)", marginRight: "0.5rem" }}>$</span>
                <span style={{ color: "var(--color-text-primary)" }}>
                  curl -fsSL https://raw.githubusercontent.com/eastreams/loong/dev/scripts/install.sh | bash -s -- --onboard
                </span>
              </div>
            </div>
            <br />

            <div className="terminal-segment" style={{ animationDelay: "180ms" }}>
              <div
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                }}
              >
                {t("terminal.line2", "# Supported first-run loop")}
              </div>
              <div className="terminal-command" style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--color-text-secondary)", marginRight: "0.5rem" }}>$</span>
                <span style={{ color: "var(--color-text-primary)" }}>loong onboard</span>
              </div>
              <div className="terminal-output" style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                &gt; provider setup... [OK]
                <br />
                &gt; first-run path... [OK]
              </div>
              <div className="terminal-command" style={{ marginBottom: "0.5rem", marginTop: "0.75rem" }}>
                <span style={{ color: "var(--color-text-secondary)", marginRight: "0.5rem" }}>$</span>
                <span style={{ color: "var(--color-text-primary)" }}>
                  loong ask --message "Summarize this repository and suggest the best next step."
                </span>
              </div>
              <div className="terminal-output" style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                &gt; repo summary: rust agent runtime with secure channels, tools, and memory
                <br />
                &gt; next step: run loong chat to continue from an interactive session
              </div>
            </div>
            <br />

            <div className="terminal-segment" style={{ animationDelay: "320ms" }}>
              <div
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                }}
              >
                {t("terminal.line3", "# Check doctor and continue")}
              </div>
              <div className="terminal-output" style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                <div className="terminal-command" style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-text-secondary)", marginRight: "0.5rem" }}>$</span>
                  <span style={{ color: "var(--color-text-primary)" }}>loong doctor</span>
                </div>
                &gt; runtime health: healthy
                <br />
                <br />
                <div className="terminal-command" style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-text-secondary)", marginRight: "0.5rem" }}>$</span>
                  <span style={{ color: "var(--color-text-primary)" }}>loong chat</span>
                  <div className="terminal-output" style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                    &gt; continue from the recommended next step
                    <br />
                    &gt; ready for follow-up work
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
      </div>

      <div className="terminal-mobile-summary">
        <span className="terminal-mobile-chip">{t("terminal.path_step_1")}</span>
        <span className="terminal-mobile-chip">{t("terminal.path_step_2")}</span>
        <span className="terminal-mobile-chip">{t("terminal.path_step_3")}</span>
      </div>
    </div>
  );
};

export default TerminalWindow;
