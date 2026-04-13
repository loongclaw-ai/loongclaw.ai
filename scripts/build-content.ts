import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const OUTPUT_DIR = path.resolve(process.cwd(), "src/content");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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

async function buildChangelog() {
  const changelogDir = path.join(CONTENT_DIR, "changelog");
  const outputDir = path.join(OUTPUT_DIR, "changelog");

  if (!fs.existsSync(changelogDir)) {
    console.log("No changelog directory found, skipping...");
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

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
    await buildChangelog();
    await buildCommunity();

    console.log("\n✓ All content built successfully");
  } catch (error) {
    console.error("\n✗ Build failed:", error);
    process.exit(1);
  }
}

main();
