// Navigation
export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

// Documentation
export interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocSection[];
}

export interface DocNode extends DocSection {
  content?: string;
  prev?: string;
  next?: string;
}

// Changelog
export type ChangeType = "feat" | "fix" | "perf" | "breaking" | "docs";

export interface Change {
  type: ChangeType;
  description: string;
}

export interface Release {
  version: string;
  date: string;
  changes: Change[];
}

// Community
export type ResourceType = "discord" | "github" | "forum" | "blog" | "twitter";

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  icon?: string;
}

// Stats
export interface Stat {
  label: string;
  value: string;
}

// Terminal
export interface TerminalCommand {
  prompt: string;
  command: string;
  output?: string[];
}
