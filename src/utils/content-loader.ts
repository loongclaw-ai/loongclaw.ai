import type {
  DocsIndex,
  DocSection,
  ChangelogIndex,
  CommunityIndex,
} from "../content/types";

import docsIndex from "../content/docs-index.json";
import changelogIndex from "../content/changelog-index.json";
import communityIndex from "../content/community-index.json";

export function getDocsIndex(): DocsIndex {
  return docsIndex as DocsIndex;
}

export function findDocByPath(path: string): DocSection | null {
  const index = getDocsIndex();

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

// 动态导入内容文件
export async function loadDocContent(
  contentPath: string,
): Promise<{ html: string; title: string; description?: string }> {
  // 从路径中提取相对路径
  const relativePath = contentPath.replace("/src/", "");
  const module = await import(`../${relativePath}`);
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
  const module = await import(`../${relativePath}`);
  return {
    html: module.html,
    version: module.frontmatter.version,
    date: module.frontmatter.date,
  };
}
