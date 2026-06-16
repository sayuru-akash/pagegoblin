import type { NormalizedUrl } from "./types";

export function normalizePageUrl(input: string): NormalizedUrl {
  let trimmed = input.trim();

  if (!trimmed.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//)) {
    trimmed = `https://${trimmed}`;
  }

  const url = new URL(trimmed);

  // Remove trailing slash from href for root paths
  let href = url.href;
  if (href.endsWith("/") && url.pathname === "/") {
    href = href.slice(0, -1);
  }

  return {
    url: href,
    domain: url.hostname,
    protocol: url.protocol,
  };
}
