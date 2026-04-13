import type { FC } from "react";
import { useEffect } from "react";
import SeoHead from "../../components/seo/SeoHead";

interface FileRedirectPageProps {
  title: string;
  description: string;
  target: string;
}

const FileRedirectPage: FC<FileRedirectPageProps> = ({
  title,
  description,
  target,
}) => {
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
      <SeoHead
        title={title}
        description={description}
        canonical={target}
        robots="noindex,follow"
      />
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--color-text-primary)",
          marginBottom: "1rem",
        }}
      >
        Redirecting
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
          lineHeight: 1.7,
        }}
      >
        {description}
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

export default FileRedirectPage;
