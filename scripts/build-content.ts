import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const OUTPUT_DIR = path.resolve(process.cwd(), "src/content");

// 类型定义
interface DocChild {
  id: string;
  title: string;
  path: string;
  description?: string;
  contentPath: string;
  order: number;
}

interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  contentPath?: string;
  children?: DocChild[];
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

async function buildDocs() {
  const docsDir = path.join(CONTENT_DIR, "docs");
  const outputDir = path.join(OUTPUT_DIR, "docs");

  if (!fs.existsSync(docsDir)) {
    console.log("No docs directory found, skipping...");
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let docsIndex: {
    frontmatter: Record<string, unknown>;
    html: string;
  } | null = null;

  // 处理 docs/index.md 首页
  const rootIndexPath = path.join(docsDir, "index.md");
  if (fs.existsSync(rootIndexPath)) {
    const { frontmatter, html } = await processMarkdown(rootIndexPath);
    docsIndex = { frontmatter, html };
    fs.writeFileSync(
      path.join(outputDir, "index.json"),
      JSON.stringify({ frontmatter, html, slug: "index" }, null, 2),
    );
    console.log("  ✓ Docs root index built");
  }

  const sections: DocSection[] = [];

  // 遍历 docs 目录
  const categories = fs
    .readdirSync(docsDir)
    .filter((f) => fs.statSync(path.join(docsDir, f)).isDirectory());

  for (const category of categories) {
    const categoryDir = path.join(docsDir, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));

    const children: DocChild[] = [];
    let categoryIndex: {
      frontmatter: Record<string, unknown>;
      slug: string;
    } | null = null;

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const { frontmatter, html, slug } = await processMarkdown(filePath);

      // 保存 HTML 内容
      const categoryOutputDir = path.join(outputDir, category);
      if (!fs.existsSync(categoryOutputDir)) {
        fs.mkdirSync(categoryOutputDir, { recursive: true });
      }
      const outputFile = path.join(categoryOutputDir, `${slug}.json`);
      fs.writeFileSync(
        outputFile,
        JSON.stringify({ frontmatter, html, slug }, null, 2),
      );

      if (slug === "index") {
        categoryIndex = { frontmatter, slug };
      } else {
        children.push({
          id: slug,
          title: frontmatter.title as string,
          path: (frontmatter.path as string) || `/docs/${category}/${slug}`,
          description: frontmatter.description as string,
          contentPath: `/src/content/docs/${category}/${slug}.json`,
          order: (frontmatter.order as number) || 999,
        });
      }
    }

    // 按 order 排序
    children.sort((a, b) => a.order - b.order);

    if (categoryIndex) {
      const categoryPath =
        (categoryIndex.frontmatter.path as string) || `/docs/${category}`;
      sections.push({
        id: category,
        title: categoryIndex.frontmatter.title as string,
        path: categoryPath,
        description: categoryIndex.frontmatter.description as string,
        contentPath: `/src/content/docs/${category}/index.json`,
        children: children.map((child) => ({
          ...child,
          path: `${categoryPath}/${child.id}`,
        })),
      });
    }
  }

  // 写入索引
  const index = docsIndex
    ? {
        title: docsIndex.frontmatter.title,
        description: docsIndex.frontmatter.description,
        path: docsIndex.frontmatter.path || "/docs",
        contentPath: "/src/content/docs/index.json",
        sections,
      }
    : { sections };
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "docs-index.json"),
    JSON.stringify(index, null, 2),
  );

  console.log("✓ Docs content built");
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
