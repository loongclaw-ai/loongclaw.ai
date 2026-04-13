export const siteName = "Loong";
export const siteUrl = "https://loongclaw.ai";
export const repositoryUrl = "https://github.com/eastreams/loong";
export const docsSiteUrl = "https://docs.loongclaw.ai";

export function buildSiteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}
