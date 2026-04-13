import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");
const assetDir = path.join(distDir, "assets");

type SeoMetadata = {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function replaceTag(
  html: string,
  pattern: RegExp,
  replacement: string,
) {
  return html.replace(pattern, replacement);
}

function injectSeo(template: string, seo: SeoMetadata) {
  const robots = seo.robots ?? "index,follow,max-image-preview:large";
  const type = seo.type ?? "website";
  let html = template;

  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeAttribute(seo.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="robots"[\s\S]*?\/>/,
    `<meta name="robots" content="${escapeAttribute(robots)}" />`,
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:type"[\s\S]*?\/>/,
    `<meta property="og:type" content="${escapeAttribute(type)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${escapeAttribute(seo.canonical)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
  );

  const structuredData = seo.structuredData
    ? `\n        <script type="application/ld+json">${JSON.stringify(seo.structuredData)}</script>`
    : "";

  html = html.replace("</head>", `${structuredData}\n    </head>`);

  return html;
}

function injectApp(template: string, appHtml: string) {
  return template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
}

async function getAssetMap() {
  const files = await readdir(assetDir);
  const map: Record<string, string> = {};

  for (const file of files) {
    if (file.startsWith("loongclaw-icon-white-")) {
      map["/src/assets/loongclaw-icon-white.ico"] = `/assets/${file}`;
    }

    if (file.startsWith("loongclaw-icon-red-")) {
      map["/src/assets/loongclaw-icon-red.ico"] = `/assets/${file}`;
    }
  }

  return map;
}

function rewriteAssetUrls(
  html: string,
  assetMap: Record<string, string>,
) {
  let output = html;

  for (const [sourcePath, builtPath] of Object.entries(assetMap)) {
    output = output.replaceAll(sourcePath, builtPath);
  }

  return output;
}

function getOutputPath(pathname: string) {
  if (pathname === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, pathname.slice(1), "index.html");
}

async function main() {
  const template = await readFile(templatePath, "utf8");
  const assetMap = await getAssetMap();
  const vite = await createServer({
    appType: "custom",
    logLevel: "error",
    server: {
      middlewareMode: true,
    },
  });

  try {
    const entry = await vite.ssrLoadModule("/src/entry-server.tsx");
    const metadata = await vite.ssrLoadModule("/src/seo/metadata.ts");
    const paths = metadata.prerenderPaths as string[];

    for (const pathname of paths) {
      const { appHtml, seo } = await entry.render(pathname);
      const html = rewriteAssetUrls(
        injectApp(injectSeo(template, seo), appHtml),
        assetMap,
      );
      const outputPath = getOutputPath(pathname);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html);
    }
  } finally {
    await vite.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
