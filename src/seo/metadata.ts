import changelogIndex from "../content/changelog-index.json";
import {
  buildSiteUrl,
  docsSiteUrl,
  repositoryUrl,
  siteName,
  siteUrl,
} from "../utils/site";

type Translate = (key: string) => string;

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export const prerenderPaths = ["/", "/community", "/changelog"];

export function getHomeSeo(
  t: Translate,
  language: string,
): SeoMetadata {
  const description = t("seo.default_description");

  return {
    title: t("seo.default_title"),
    description,
    canonical: buildSiteUrl("/"),
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        sameAs: [repositoryUrl, docsSiteUrl],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        inLanguage: language,
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: siteName,
        url: siteUrl,
        description,
        codeRepository: repositoryUrl,
        programmingLanguage: "Rust",
      },
    ],
  };
}

export function getCommunitySeo(
  t: Translate,
  language: string,
): SeoMetadata {
  const title = t("seo.community_title");
  const description = t("seo.community_description");

  return {
    title,
    description,
    canonical: buildSiteUrl("/community"),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: buildSiteUrl("/community"),
      inLanguage: language,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
    },
  };
}

export function getChangelogSeo(
  t: Translate,
  language: string,
): SeoMetadata {
  const title = t("seo.changelog_title");
  const description = t("seo.changelog_description");
  const releases = (changelogIndex as {
    releases: { version: string; date: string }[];
  }).releases;

  return {
    title,
    description,
    canonical: buildSiteUrl("/changelog"),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: buildSiteUrl("/changelog"),
      inLanguage: language,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
      hasPart: releases.map((release) => ({
        "@type": "CreativeWork",
        name: release.version,
        datePublished: release.date,
        url: buildSiteUrl("/changelog"),
      })),
    },
  };
}

export function getSeoForPath(
  pathname: string,
  t: Translate,
  language: string,
): SeoMetadata {
  if (pathname === "/community") {
    return getCommunitySeo(t, language);
  }

  if (pathname === "/changelog") {
    return getChangelogSeo(t, language);
  }

  return getHomeSeo(t, language);
}
