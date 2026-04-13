// Navigation
export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
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
