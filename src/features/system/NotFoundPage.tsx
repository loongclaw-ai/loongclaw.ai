import type { FC } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/seo/SeoHead";
import { buildSiteUrl } from "../../utils/site";

const NotFoundPage: FC = () => {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}
    >
      <SeoHead
        title="Page Not Found | Loong"
        description="The page you requested could not be found."
        canonical={buildSiteUrl("/")}
        robots="noindex,follow"
      />
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          marginBottom: "1rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.25rem",
          color: "var(--color-text-primary)",
          marginBottom: "1rem",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}
      >
        The route does not exist. If you were looking for crawl files, use
        the direct static URLs below.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <Link to="/" className="hero-btn hero-btn-primary">
          Home
        </Link>
        <a href="/sitemap.xml" className="hero-btn hero-btn-secondary">
          Sitemap XML
        </a>
        <a href="/robots.txt" className="hero-btn hero-btn-secondary">
          robots.txt
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
