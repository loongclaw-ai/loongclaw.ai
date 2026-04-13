import type { FC } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildDocsUrl } from "../../utils/docs-url";

const DocsPage: FC = () => {
  const location = useLocation();
  const target = buildDocsUrl(
    location.pathname,
    location.search,
    location.hash,
  );

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--color-text-primary)",
          marginBottom: "1rem",
        }}
      >
        Redirecting to the new docs site
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        If the redirect does not happen automatically, open the new docs here.
      </p>
      <a
        href={target}
        style={{
          color: "var(--color-text-accent)",
          wordBreak: "break-all",
        }}
      >
        {target}
      </a>
    </div>
  );
};

export default DocsPage;
