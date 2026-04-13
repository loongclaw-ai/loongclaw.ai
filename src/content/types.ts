export interface ChangelogIndex {
  releases: {
    version: string;
    date: string;
    contentPath: string;
  }[];
}

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: "discord" | "github" | "forum" | "blog" | "twitter";
}

export interface CommunityIndex {
  resources: CommunityResource[];
}
