import { isPrivateIp } from "./ip-check";
import { PageFetchError } from "./types";
import type { NormalizedUrl } from "../analysis/types";
import dns from "dns/promises";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

const BLOCKED_HOSTNAMES = new Set(["localhost"]);

function tryParseUrl(input: string): URL | null {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function isBlockedHostname(hostname: string): boolean {
  if (BLOCKED_HOSTNAMES.has(hostname)) return true;
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (hostname === "0.0.0.0") return true;
  if (hostname === "[::1]") return true;
  return false;
}

function isBlockedPrivateIpv4(hostname: string): boolean {
  return isPrivateIp(hostname);
}

function hasCredentials(url: URL): boolean {
  return url.username !== "" || url.password !== "";
}

function normalizeUrl(input: string): string {
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(input)) {
    return input;
  }
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(input)) {
    return input;
  }
  return `https://${input}`;
}

export async function assertSafeFetchUrl(input: string): Promise<NormalizedUrl> {
  const normalized = normalizeUrl(input.trim());
  const url = tryParseUrl(normalized);

  if (!url) {
    throw new PageFetchError("INVALID_URL", `Could not parse URL: ${input}`);
  }

  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    throw new PageFetchError("BLOCKED_PROTOCOL", `URL protocol "${url.protocol}" is not allowed. Only http: and https: are supported.`);
  }

  if (hasCredentials(url)) {
    throw new PageFetchError("BLOCKED_CREDENTIALS", "URLs with embedded credentials (user:pass@host) are not allowed.");
  }

  const hostname = url.hostname.toLowerCase();

  if (isBlockedHostname(hostname)) {
    throw new PageFetchError("BLOCKED_HOST", `URL points to a private network address: ${hostname}`);
  }

  if (isBlockedPrivateIpv4(hostname)) {
    throw new PageFetchError("BLOCKED_HOST", `URL points to a private network address: ${hostname}`);
  }

  try {
    const lookup = await dns.lookup(hostname);
    if (isPrivateIp(lookup.address)) {
      throw new PageFetchError("DNS_PRIVATE_IP", `DNS lookup resolved ${hostname} to a private IP address.`);
    }
  } catch (err) {
    if (err instanceof PageFetchError) throw err;
    throw new PageFetchError("DNS_LOOKUP_FAILED", `Could not resolve hostname: ${hostname}`);
  }

  return {
    url: url.href,
    domain: url.hostname,
    protocol: url.protocol,
  };
}
