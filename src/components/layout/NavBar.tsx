import { Link, useLocation } from "react-router-dom";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { Star, Languages, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../contexts/useTheme";

import darkIcon from "../../assets/loongclaw-icon-white.ico";
import lightIcon from "../../assets/loongclaw-icon-red.ico";

const NavBar: FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [starCount, setStarCount] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh-CN" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    fetch("https://api.github.com/repos/loongclaw-ai/loongclaw")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => { });
  }, []);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    color: isActive(path)
      ? "var(--color-text-accent)"
      : "var(--color-text-secondary)",
    fontWeight: isActive(path) ? 700 : 500,
    textDecoration: "none",
    transition:
      "color var(--transition-base), font-weight var(--transition-base)",
    fontSize: "1rem",
    letterSpacing: "0.02em",
    fontFamily: i18n.language === "zh-CN" ? "var(--font-chinese)" : "var(--font-mono)",
    height: "36px",
    transform: "translateY(1.5px)", // Slightly reduced offset for larger font
  });

  return (
    <>
      <nav
        className="navbar-container"
        style={{
          position: "sticky",
          top: 0,
          zIndex: "var(--z-sticky)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--color-bg-secondary)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Logo / Home Link */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            textDecoration: "none",
            color: "var(--color-text-accent)",
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          {/* Theme-based Icon */}
          <img
            src={theme === THEMES.DARK ? darkIcon : lightIcon}
            alt="LoongClaw"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              transform: "translateY(-3px)",
            }}
          />
          <span>LOONGCLAW</span>
        </Link>

        {/* Desktop Navigation Items */}
        <div className="navbar-links">
          <Link to="/docs" style={getLinkStyle("/docs")}>
            {t("nav.docs")}
          </Link>
          <Link to="/community" style={getLinkStyle("/community")}>
            {t("nav.community")}
          </Link>
          <Link to="/changelog" style={getLinkStyle("/changelog")}>
            {t("nav.changelog")}
          </Link>

          {/* Action Group: Theme, Language, GitHub */}
          <div
            className="navbar-mobile-menu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
            }}
          >
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="navbar-btn"
            title={
              theme === THEMES.DARK
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === THEMES.DARK ? (
              // Sun icon for dark mode (switch to light)
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon for light mode (switch to dark)
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Language Switch Button */}
          <button
            className="navbar-btn"
            title="Switch language"
            onClick={toggleLanguage}
          >
            <Languages size={18} strokeWidth={2} />
          </button>

          {/* GitHub Button */}
          <a
            href="https://github.com/loongclaw-ai/loongclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-btn navbar-btn-github"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub</span>
            {starCount !== null && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  background: "var(--color-bg-tertiary)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "999px",
                }}
              >
                <Star size={12} fill="currentColor" />
                <span>{starCount.toLocaleString()}</span>
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Mobile Menu Button - shown on small screens */}
      <button
        className="navbar-btn navbar-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        title="Toggle menu"
        style={{
          display: "none",
        }}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "var(--color-bg-primary)",
            zIndex: "calc(var(--z-overlay) - 1)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Link to="/docs" style={{ ...getLinkStyle("/docs"), padding: "0.75rem 0" }} onClick={() => setMobileMenuOpen(false)}>
            {t("nav.docs")}
          </Link>
          <Link to="/community" style={{ ...getLinkStyle("/community"), padding: "0.75rem 0" }} onClick={() => setMobileMenuOpen(false)}>
            {t("nav.community")}
          </Link>
          <Link to="/changelog" style={{ ...getLinkStyle("/changelog"), padding: "0.75rem 0" }} onClick={() => setMobileMenuOpen(false)}>
            {t("nav.changelog")}
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
