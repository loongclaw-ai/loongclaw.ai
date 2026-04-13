import type { FC } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import SeoHead from "../../components/seo/SeoHead";
import { buildSiteUrl } from "../../utils/site";

const RouteErrorPage: FC = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title =
    status === 404
      ? "Page Not Found | Loong"
      : "Application Error | Loong";
  const heading =
    status === 404 ? "Page not found" : "Something went wrong";
  const description =
    isRouteErrorResponse(error)
      ? error.statusText || "The requested route failed to load."
      : "An unexpected error occurred while rendering the page.";

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}
    >
      <SeoHead
        title={title}
        description={description}
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
        {status}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.25rem",
          color: "var(--color-text-primary)",
          marginBottom: "1rem",
        }}
      >
        {heading}
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}
      >
        {description}
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link to="/" className="hero-btn hero-btn-primary">
          Home
        </Link>
        <a href="/sitemap.xml" className="hero-btn hero-btn-secondary">
          Sitemap XML
        </a>
      </div>
    </div>
  );
};

export default RouteErrorPage;
