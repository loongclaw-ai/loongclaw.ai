import type { FC } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildSiteUrl, siteName } from "../../utils/site";

interface StructuredData {
  [key: string]: unknown;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  type?: string;
  structuredData?: StructuredData | StructuredData[];
}

function upsertMeta(
  attribute: "name" | "property",
  value: string,
  content: string,
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${value}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertStructuredData(
  structuredData?: StructuredData | StructuredData[],
) {
  const selector = 'script[data-seo="structured-data"]';
  const existing = document.head.querySelector(selector);

  if (!structuredData) {
    existing?.remove();
    return;
  }

  const payload = JSON.stringify(structuredData);
  let element = existing as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seo = "structured-data";
    document.head.appendChild(element);
  }

  element.text = payload;
}

const SeoHead: FC<SeoHeadProps> = ({
  title,
  description,
  canonical,
  robots = "index,follow,max-image-preview:large",
  type = "website",
  structuredData,
}) => {
  const location = useLocation();

  useEffect(() => {
    const url = canonical ?? buildSiteUrl(location.pathname);

    document.title = title;
    upsertCanonical(url);
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertStructuredData(structuredData);
  }, [canonical, description, location.pathname, robots, structuredData, title, type]);

  return null;
};

export default SeoHead;
