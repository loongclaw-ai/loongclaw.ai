export const docsBaseUrl = "https://docs.loongclaw.ai";

export function buildDocsUrl(
  pathname: string,
  search = "",
  hash = "",
): string {
  const suffix = pathname.replace(/^\/docs/, "");
  return `${docsBaseUrl}${suffix}${search}${hash}`;
}
