import type { FC } from "react";
import { useState, useEffect } from "react";
import { getChangelogIndex } from "../../utils/content-loader";

interface ReleaseContent {
  version: string;
  date: string;
  html: string;
}

const ChangelogPage: FC = () => {
  const [releases, setReleases] = useState<ReleaseContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { releases: releaseIndex } = getChangelogIndex();

  useEffect(() => {
    const loadReleases = async () => {
      const loadedReleases = await Promise.all(
        releaseIndex.map(async (release) => {
          const relativePath = release.contentPath.replace("/src/", "");
          const module = await import(`../../${relativePath}`);
          return {
            version: module.frontmatter.version,
            date: module.frontmatter.date,
            html: module.html,
          };
        }),
      );
      setReleases(loadedReleases);
      setLoading(false);
    };

    loadReleases();
  }, [releaseIndex]);

  if (loading) {
    return (
      <div style={{ padding: "4rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Changelog
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "4rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          marginBottom: "3rem",
          color: "var(--color-text-primary)",
        }}
      >
        Changelog
      </h1>

      {releases.map((release) => (
        <div
          key={release.version}
          style={{
            marginBottom: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--color-border-light)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                color: "var(--color-text-primary)",
              }}
            >
              {release.version}
            </h2>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {release.date}
            </span>
          </div>

          <div
            className="changelog-content"
            dangerouslySetInnerHTML={{ __html: release.html }}
            style={{
              color: "var(--color-text-primary)",
              lineHeight: "1.7",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChangelogPage;
