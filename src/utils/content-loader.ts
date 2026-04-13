import type {
  ChangelogIndex,
  CommunityIndex,
} from "../content/types";
import changelogIndex from "../content/changelog-index.json";
import communityIndex from "../content/community-index.json";
export function getChangelogIndex(): ChangelogIndex {
  return changelogIndex as ChangelogIndex;
}

export function getCommunityIndex(): CommunityIndex {
  return communityIndex as CommunityIndex;
}
