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

// 静态导入所有语言的索引文件
import docsIndexEn from "../content/docs-index.json";
import docsIndexZhCN from "../content/docs-index-zh-CN.json";
import changelogIndex from "../content/changelog-index.json";
import communityIndex from "../content/community-index.json";

const docsIndexes: Record<string, DocsIndex> = {
  en: docsIndexEn as DocsIndex,
  "zh-CN": docsIndexZhCN as DocsIndex,
};

const DEFAULT_LANG = "en";

export function getDocsIndex(lang: string = DEFAULT_LANG): DocsIndex {
  return docsIndexes[lang] || docsIndexes[DEFAULT_LANG];
}

export function findDocByPath(path: string, lang: string = DEFAULT_LANG): DocSection | null {
  const index = getDocsIndex(lang) as DocsIndexWithRoot;

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

  const findRecursive = (sections: DocSection[]): DocSection | null => {
    for (const section of sections) {
      if (section.path === path) {
        return section;
      }
      if (section.children) {
        const found = findRecursive(section.children);
        if (found) return found;
      }
    }
    return null;
  };

  return findRecursive(index.sections);
}

// 获取 Changelog 索引
export function getChangelogIndex(): ChangelogIndex {
  return changelogIndex as ChangelogIndex;
}

// 获取 Community 索引
export function getCommunityIndex(): CommunityIndex {
  return communityIndex as CommunityIndex;
}

// 多语言文档 glob 映射
const docModulesEn = import.meta.glob<{ html: string; frontmatter: { title: string; description?: string } }>("../content/docs/**/*.json", { eager: false });
const docModulesZhCN = import.meta.glob<{ html: string; frontmatter: { title: string; description?: string } }>("../content/docs-zh-CN/**/*.json", { eager: false });

const docModulesByLang: Record<string, typeof docModulesEn> = {
  en: docModulesEn,
  "zh-CN": docModulesZhCN,
};

const changelogModules = import.meta.glob<{ html: string; frontmatter: { version: string; date: string } }>("../content/changelog/**/*.json", { eager: false });

export async function loadDocContent(
  contentPath: string,
  lang: string = DEFAULT_LANG,
): Promise<{ html: string; title: string; description?: string }> {
  // 根据语言选择对应的 glob 映射
  const docModules = docModulesByLang[lang] || docModulesByLang[DEFAULT_LANG];

  // 处理路径：移除语言特定的前缀
  // 例如 /src/content/docs-zh-CN/getting-started/index.json -> getting-started/index.json
  let relativePath = contentPath.replace("/src/", "");

  // 如果当前语言不是默认语言，需要调整路径
  if (lang !== DEFAULT_LANG) {
    // 将 docs-zh-CN 路径转换为正确的路径
    relativePath = relativePath.replace(`docs-${lang}`, `docs-${lang}`);
  }

  const module = await docModules[`../${relativePath}`]();
  // JSON files are imported as default export
  const data = (module as { default?: typeof module }).default || module;
  return {
    html: data.html,
    title: data.frontmatter.title,
    description: data.frontmatter.description,
  };
}

export async function loadChangelogContent(
  contentPath: string,
): Promise<{ html: string; version: string; date: string }> {
  const relativePath = contentPath.replace("/src/", "");
  const module = await changelogModules[`../${relativePath}`]();
  // JSON files are imported as default export
  const data = (module as { default?: typeof module }).default || module;
  return {
    html: data.html,
    version: data.frontmatter.version,
    date: data.frontmatter.date,
  };
}
