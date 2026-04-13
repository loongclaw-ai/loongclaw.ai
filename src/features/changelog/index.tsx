import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { getChangelogIndex } from "../../utils/content-loader";
import SeoHead from "../../components/seo/SeoHead";
import { getChangelogSeo } from "../../seo/metadata";

const changelogModules = import.meta.glob<{ default?: { html: string; frontmatter: { version: string; date: string } }; html: string; frontmatter: { version: string; date: string } }>("../../content/changelog/**/*.json", { eager: true });

const ChangelogPage: FC = () => {
  const { t, i18n } = useTranslation();
  const { releases: releaseIndex } = getChangelogIndex();
  const seo = getChangelogSeo(t, i18n.language);
  const releases = releaseIndex.flatMap((release) => {
    const relativePath = release.contentPath.replace("/src/", "");
    const module =
      changelogModules[`../../${relativePath}`];

    if (!module) {
      return [];
    }

    const data = module.default ?? module;

    return [
      {
        version: data.frontmatter.version,
        date: data.frontmatter.date,
        html: data.html,
      },
    ];
  });

  return (
    <>
      <SeoHead {...seo} />
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
          {t("changelog_page.title")}
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
    </>
  );
};

export default ChangelogPage;
