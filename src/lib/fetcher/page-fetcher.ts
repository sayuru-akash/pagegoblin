import { assertSafeFetchUrl } from "./url-safety";
import { extractSignalsFromHtml } from "./html-signals";
import { PageFetchError, type FetchPageOptions, type FetchedPage } from "./types";
import type { PageSignals } from "../analysis/types";

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_MAX_BYTES = 1_500_000;
const DEFAULT_MAX_REDIRECTS = 3;
const DEFAULT_USER_AGENT = "PageGoblin/1.0 (page analysis bot; +https://pagegoblin.org)";

const HTML_CONTENT_TYPES = [
  "text/html",
  "application/xhtml+xml",
];

function isHtmlContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const lower = contentType.toLowerCase();
  return HTML_CONTENT_TYPES.some((t) => lower.includes(t));
}

function looksLikeAccessChallenge(html: string): boolean {
  const sample = html.slice(0, 500_000).toLowerCase();

  const exactChallengeMarkers = [
    "cdn-cgi/challenge-platform",
    "__cf_chl_",
    "cf-chl-",
    "captcha-delivery.com",
  ];
  if (exactChallengeMarkers.some((marker) => sample.includes(marker))) return true;

  const cloudflareChallenge = sample.includes("cloudflare") && [
    "just a moment",
    "attention required",
    "checking your browser",
    "verify you are human",
    "enable javascript and cookies to continue",
  ].some((marker) => sample.includes(marker));

  const akamaiChallenge = sample.includes("access denied")
    && (sample.includes("reference #") || sample.includes("akamai"));

  const perimeterXChallenge = sample.includes("press & hold")
    && (sample.includes("perimeterx") || sample.includes("_px"));

  const dataDomeChallenge = sample.includes("datadome")
    && (sample.includes("captcha") || sample.includes("blocked"));

  return cloudflareChallenge || akamaiChallenge || perimeterXChallenge || dataDomeChallenge;
}

async function readBodyWithCap(body: ReadableStream<Uint8Array> | null, maxBytes: number): Promise<{ html: string; bytesRead: number }> {
  if (!body) {
    return { html: "", bytesRead: 0 };
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let bytesRead = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bytesRead += value.length;
      if (bytesRead > maxBytes) {
        throw new PageFetchError("BODY_TOO_LARGE", `Page response exceeds maximum size of ${Math.round(maxBytes / 1024)}KB.`);
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const decoder = new TextDecoder("utf-8", { fatal: false });
  let html = "";
  for (const chunk of chunks) {
    html += decoder.decode(chunk, { stream: true });
  }
  html += decoder.decode();

  return { html, bytesRead };
}

export async function fetchPageHtml(inputUrl: string, options?: FetchPageOptions): Promise<FetchedPage> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxBytes = DEFAULT_MAX_BYTES,
    maxRedirects = DEFAULT_MAX_REDIRECTS,
    userAgent = DEFAULT_USER_AGENT,
  } = options ?? {};

  let currentUrl = inputUrl;
  let redirectCount = 0;

  while (true) {
    const normalized = await assertSafeFetchUrl(currentUrl);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(normalized.url, {
        signal: controller.signal,
        redirect: "manual",
        headers: new Headers({
          "User-Agent": userAgent,
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        }),
      });
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof PageFetchError) throw err;
      if (err instanceof DOMException && err.name === "AbortError") {
        throw new PageFetchError("TIMEOUT", `Page took too long to respond (exceeded ${timeoutMs}ms).`);
      }
      throw new PageFetchError("FETCH_FAILED", `Failed to fetch page: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      clearTimeout(timer);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new PageFetchError("FETCH_FAILED", "Redirect response missing Location header.");
      }

      redirectCount++;
      if (redirectCount > maxRedirects) {
        throw new PageFetchError("REDIRECT_LIMIT", `Page redirected more than ${maxRedirects} times.`);
      }

      let nextUrl: string;
      try {
        nextUrl = new URL(location, normalized.url).href;
      } catch {
        throw new PageFetchError("INVALID_URL", `Invalid redirect target URL: ${location}`);
      }

      currentUrl = nextUrl;
      continue;
    }

    const contentType = response.headers.get("content-type");

    if ([401, 403, 407, 429].includes(response.status)) {
      throw new PageFetchError(
        "ACCESS_BLOCKED",
        `The site returned an access shield instead of its page (HTTP ${response.status}).`
      );
    }

    if (response.status >= 400) {
      throw new PageFetchError(
        "HTTP_ERROR",
        `The site returned HTTP ${response.status} instead of a page.`
      );
    }

    if (!isHtmlContentType(contentType)) {
      throw new PageFetchError("NON_HTML_CONTENT", `Page did not return HTML content. Got: ${contentType ?? "unknown"}`);
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength && Number(contentLength) > maxBytes) {
      throw new PageFetchError("BODY_TOO_LARGE", `Page response exceeds maximum size of ${Math.round(maxBytes / 1024)}KB.`);
    }

    const { html, bytesRead } = await readBodyWithCap(response.body, maxBytes);

    if (looksLikeAccessChallenge(html)) {
      throw new PageFetchError(
        "ACCESS_BLOCKED",
        "The site returned a bot challenge instead of its real page."
      );
    }

    const finalNormalized = await assertSafeFetchUrl(response.url || currentUrl);

    return {
      requestedUrl: inputUrl,
      finalUrl: finalNormalized.url,
      status: response.status,
      contentType,
      bytesRead,
      html,
    };
  }
}

export async function fetchAndExtractSignals(inputUrl: string, options?: FetchPageOptions): Promise<PageSignals> {
  const fetched = await fetchPageHtml(inputUrl, options);
  return extractSignalsFromHtml({
    url: fetched.finalUrl,
    html: fetched.html,
    source: "WEB_URL",
  });
}
