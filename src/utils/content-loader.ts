import type {
  DocsIndex,
  DocSection,
  ChangelogIndex,
  CommunityIndex,
} from "../content/types";

interface DocsIndexWithRoot extends DocsIndex {
  title?: string;
  description?: string;
  path?: string;
  contentPath?: string;
}

import docsIndex from "../content/docs-index.json";
import changelogIndex from "../content/changelog-index.json";
import communityIndex from "../content/community-index.json";

export function getDocsIndex(): DocsIndex {
  return docsIndex as DocsIndex;
}

export function findDocByPath(path: string): DocSection | null {
  const index = getDocsIndex() as DocsIndexWithRoot;

  // 检查根路径 /docs
  if (path === "/docs" && index.contentPath) {
    return {
      id: "index",
      title: index.title || "Documentation",
      path: "/docs",
      description: index.description,
      contentPath: index.contentPath,
    };
  }

  for (const section of index.sections) {
    if (section.path === path) {
      return section;
    }
    if (section.children) {
      for (const child of section.children) {
        if (child.path === path) {
          return child;
        }
      }
    }
  }

  return null;
}

// 获取 Changelog 索引
export function getChangelogIndex(): ChangelogIndex {
  return changelogIndex as ChangelogIndex;
}

// 获取 Community 索引
export function getCommunityIndex(): CommunityIndex {
  return communityIndex as CommunityIndex;
}

const docModules = import.meta.glob<{ html: string; frontmatter: { title: string; description?: string } }>("../content/docs/**/*.ts", { eager: false });
const changelogModules = import.meta.glob<{ html: string; frontmatter: { version: string; date: string } }>("../content/changelog/**/*.ts", { eager: false });

export async function loadDocContent(
  contentPath: string,
): Promise<{ html: string; title: string; description?: string }> {
  const relativePath = contentPath.replace("/src/", "");
  const module = await docModules[`../${relativePath}`]();
  return {
    html: module.html,
    title: module.frontmatter.title,
    description: module.frontmatter.description,
  };
}

export async function loadChangelogContent(
  contentPath: string,
): Promise<{ html: string; version: string; date: string }> {
  const relativePath = contentPath.replace("/src/", "");
  const module = await changelogModules[`../${relativePath}`]();
  return {
    html: module.html,
    version: module.frontmatter.version,
    date: module.frontmatter.date,
  };
}
