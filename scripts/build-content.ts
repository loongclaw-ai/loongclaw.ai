import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const OUTPUT_DIR = path.resolve(process.cwd(), "src/content");

// 支持的语言
const LANGUAGES = ['en', 'zh-CN'];
const DEFAULT_LANG = 'en';

// 类型定义
interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  contentPath?: string;
  order?: number;
  children?: DocSection[];
}

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function processMarkdown(filePath: string): Promise<{
  frontmatter: Record<string, unknown>;
  html: string;
  slug: string;
}> {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content: markdownContent } = matter(content);

  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(markdownContent);

  const htmlContent = String(result);
  const slug = path.basename(filePath, ".md");

  return { frontmatter, html: htmlContent, slug };
}

// 获取语言特定的 docs 目录
function getDocsDir(lang: string): string {
  if (lang === DEFAULT_LANG) {
    return path.join(CONTENT_DIR, "docs");
  }
  return path.join(CONTENT_DIR, `docs-${lang}`);
}

async function processDocDirectory(
  dir: string,
  relPath: string, // e.g. "", "/getting-started"
  outputDir: string,
  lang: string,
): Promise<DocSection | null> {
  if (!fs.existsSync(dir)) return null;

  const items = fs.readdirSync(dir);
  const children: DocSection[] = [];
  let indexNode: {
    frontmatter: Record<string, unknown>;
    html: string;
    slug: string;
  } | null = null;

  const langDir = lang === DEFAULT_LANG ? "docs" : `docs-${lang}`;
  const routePath = `/docs${relPath}`;

  // First, find index.md if it exists
  const indexPath = path.join(dir, "index.md");
  if (fs.existsSync(indexPath)) {
    indexNode = await processMarkdown(indexPath);

    // Save output
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputFile = path.join(outputDir, "index.json");
    fs.writeFileSync(
      outputFile,
      JSON.stringify(
        {
          frontmatter: indexNode.frontmatter,
          html: indexNode.html,
          slug: indexNode.slug,
        },
        null,
        2,
      ),
    );
  }

  // Then process other items
  for (const item of items) {
    if (item === "index.md") continue;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const subSection = await processDocDirectory(
        itemPath,
        `${relPath}/${item}`,
        path.join(outputDir, item),
        lang,
      );
      if (subSection) {
        children.push(subSection);
      }
    } else if (item.endsWith(".md")) {
      const slug = path.basename(item, ".md");
      const { frontmatter, html } = await processMarkdown(itemPath);

      // Save output
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const outputFile = path.join(outputDir, `${slug}.json`);
      fs.writeFileSync(
        outputFile,
        JSON.stringify({ frontmatter, html, slug }, null, 2),
      );

      children.push({
        id: slug,
        title: frontmatter.title as string,
        path: (frontmatter.path as string) || `${routePath}/${slug}`,
        description: frontmatter.description as string,
        contentPath: `/src/content/${langDir}${relPath}/${slug}.json`,
        order: (frontmatter.order as number) || 999,
      });
    }
  }

  if (indexNode || children.length > 0) {
    const id = path.basename(dir);
    const section: DocSection = {
      id,
      title: (indexNode?.frontmatter.title as string) || id,
      path: (indexNode?.frontmatter.path as string) || routePath,
      description: indexNode?.frontmatter.description as string,
      contentPath: indexNode
        ? `/src/content/${langDir}${relPath}/index.json`
        : undefined,
      order: (indexNode?.frontmatter.order as number) || 999,
      children:
        children.length > 0
          ? children.sort((a, b) => (a.order || 999) - (b.order || 999))
          : undefined,
    };
    return section;
  }

  return null;
}

async function buildDocsForLanguage(lang: string) {
  const docsDir = getDocsDir(lang);
  const outputDir = path.join(
    OUTPUT_DIR,
    lang === DEFAULT_LANG ? "docs" : `docs-${lang}`,
  );

  if (!fs.existsSync(docsDir)) {
    console.log(`  No docs directory found for ${lang}, skipping...`);
    return null;
  }

  const rootSection = await processDocDirectory(docsDir, "", outputDir, lang);
  if (!rootSection) return null;

  // Transform rootSection to the expected index format
  const index = {
    title: rootSection.title,
    description: rootSection.description,
    path: rootSection.path,
    contentPath: rootSection.contentPath,
    sections: rootSection.children || [],
  };

  fs.writeFileSync(
    path.join(
      OUTPUT_DIR,
      lang === DEFAULT_LANG ? "docs-index.json" : `docs-index-${lang}.json`,
    ),
    JSON.stringify(index, null, 2),
  );

  console.log(`✓ Docs content built for ${lang}`);
  return index;
}

async function buildDocs() {
  for (const lang of LANGUAGES) {
    await buildDocsForLanguage(lang);
  }
}

async function buildChangelog() {
  const changelogDir = path.join(CONTENT_DIR, "changelog");
  const outputDir = path.join(OUTPUT_DIR, "changelog");

  if (!fs.existsSync(changelogDir)) {
    console.log("No changelog directory found, skipping...");
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(changelogDir).filter((f) => f.endsWith(".md"));
  const releases: { version: string; date: string; contentPath: string }[] = [];

  for (const file of files) {
    const filePath = path.join(changelogDir, file);
    const { frontmatter, html, slug } = await processMarkdown(filePath);

    // 保存 HTML 内容
    const outputFile = path.join(outputDir, `${slug}.json`);
    fs.writeFileSync(
      outputFile,
      JSON.stringify({ frontmatter, html, slug }, null, 2),
    );

    releases.push({
      version: frontmatter.version as string,
      date: frontmatter.date as string,
      contentPath: `/src/content/changelog/${slug}.json`,
    });
  }

  // 按版本号排序（降序）
  releases.sort((a, b) => b.version.localeCompare(a.version));

  const index = { releases };
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "changelog-index.json"),
    JSON.stringify(index, null, 2),
  );

  console.log("✓ Changelog content built");
}

async function buildCommunity() {
  const communityDir = path.join(CONTENT_DIR, "community");
  const outputFile = path.join(OUTPUT_DIR, "community-index.json");

  if (!fs.existsSync(communityDir)) {
    console.log("No community directory found, skipping...");
    return;
  }

  const resourcesFile = path.join(communityDir, "resources.md");
  if (!fs.existsSync(resourcesFile)) {
    console.log("No resources.md found, skipping...");
    return;
  }

  const { frontmatter } = await processMarkdown(resourcesFile);
  const resources = (frontmatter.resources as unknown[]) || [];

  const index = { resources };
  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));

  console.log("✓ Community content built");
}

async function main() {
  console.log("Building content...\n");

  try {
    await buildDocs();
    await buildChangelog();
    await buildCommunity();

    console.log("\n✓ All content built successfully");
  } catch (error) {
    console.error("\n✗ Build failed:", error);
    process.exit(1);
  }
}

main();
