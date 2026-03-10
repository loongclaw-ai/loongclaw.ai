// 文档内容类型
export interface DocFrontmatter {
  title: string;
  description?: string;
  order?: number;
  path?: string;
}

export interface DocContent {
  id: string;
  title: string;
  description?: string;
  path: string;
  html: string;
  order: number;
}

export interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocSection[];
  contentPath?: string;
}

export interface DocsIndex {
  sections: DocSection[];
}

// Changelog 内容类型
export interface ChangelogFrontmatter {
  version: string;
  date: string;
}

export interface ChangelogContent {
  version: string;
  date: string;
  html: string;
}

export interface ChangelogIndex {
  releases: {
    version: string;
    date: string;
    contentPath: string;
  }[];
}

// 社区内容类型
export interface CommunityFrontmatter {
  title: string;
}

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: 'discord' | 'github' | 'forum' | 'blog' | 'twitter';
}

export interface CommunityIndex {
  resources: CommunityResource[];
}

// 通用内容类型
export interface ContentFile {
  frontmatter: Record<string, unknown>;
  html: string;
  slug: string;
  path: string;
}
