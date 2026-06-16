import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchPageHtml, fetchAndExtractSignals } from "../page-fetcher";
import { PageFetchError } from "../types";

const HTML_RESPONSE = `<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1></body></html>`;

const RICH_HTML = `<!DOCTYPE html><html><head>
<title>Acme Pricing</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head><body>
<h1>Acme — Best Widgets</h1>
<button>Start Free Trial</button>
<p>$49 per month for the Pro plan</p>
<div class="dashboard">Private admin panel</div>
</body></html>`;

function makeResponse(opts: {
  status?: number;
  contentType?: string;
  body?: string;
}): Response {
  const { status = 200, contentType = "text/html; charset=utf-8", body = HTML_RESPONSE } = opts;
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      "content-length": String(new TextEncoder().encode(body).length),
    },
  }) as Response & { url: string };
}

describe("fetchPageHtml", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns FetchedPage for HTML response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({}));

    const result = await fetchPageHtml("https://example.com");
    expect(result.requestedUrl).toBe("https://example.com");
    expect(result.finalUrl).toBe("https://example.com/");
    expect(result.status).toBe(200);
    expect(result.contentType).toContain("text/html");
    expect(result.html).toBe(HTML_RESPONSE);
    expect(result.bytesRead).toBeGreaterThan(0);
  });

  it("rejects non-HTML response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({
      contentType: "application/json",
      body: '{"error": "not found"}',
    }));

    await expect(fetchPageHtml("https://example.com/api")).rejects.toThrow(PageFetchError);
    await expect(fetchPageHtml("https://example.com/api")).rejects.toMatchObject({ code: "NON_HTML_CONTENT" });
  });

  it("rejects too-large body", async () => {
    const bigBody = "x".repeat(3_000_000);
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({ body: bigBody }));

    await expect(fetchPageHtml("https://example.com", { maxBytes: 1_000_000 })).rejects.toThrow(PageFetchError);
    await expect(fetchPageHtml("https://example.com", { maxBytes: 1_000_000 })).rejects.toMatchObject({ code: "BODY_TOO_LARGE" });
  });

  it("follows redirects up to limit", async () => {
    let callCount = 0;
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount <= 3) {
        const headers = new Headers({ location: `https://example.com/redirect-${callCount}` });
        return new Response(null, { status: 302, headers }) as Response;
      }
      return makeResponse({});
    });

    const result = await fetchPageHtml("https://example.com", { maxRedirects: 5 });
    expect(result.status).toBe(200);
    expect(callCount).toBe(4);
  });

  it("rejects when redirect limit exceeded", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      const headers = new Headers({ location: "https://example.com/loop" });
      return new Response(null, { status: 302, headers }) as Response;
    });

    await expect(fetchPageHtml("https://example.com", { maxRedirects: 3 })).rejects.toThrow(PageFetchError);
    await expect(fetchPageHtml("https://example.com", { maxRedirects: 3 })).rejects.toMatchObject({ code: "REDIRECT_LIMIT" });
  });

  it("rejects redirect to blocked host", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      const headers = new Headers({ location: "http://localhost:3000/admin" });
      return new Response(null, { status: 302, headers }) as Response;
    });

    await expect(fetchPageHtml("https://example.com")).rejects.toThrow(PageFetchError);
  });

  it("rejects fetch network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError("fetch failed"));

    await expect(fetchPageHtml("https://example.com")).rejects.toThrow(PageFetchError);
    await expect(fetchPageHtml("https://example.com")).rejects.toMatchObject({ code: "FETCH_FAILED" });
  });

  it("rejects URL safety violations", async () => {
    await expect(fetchPageHtml("http://localhost:3000")).rejects.toThrow(PageFetchError);
    await expect(fetchPageHtml("http://192.168.1.1")).rejects.toThrow(PageFetchError);
  });

  it("accepts HTML content type with charset", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({
      contentType: "text/html; charset=utf-8",
    }));

    const result = await fetchPageHtml("https://example.com");
    expect(result.contentType).toContain("text/html");
  });

  it("accepts application/xhtml+xml content type", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({
      contentType: "application/xhtml+xml",
    }));

    const result = await fetchPageHtml("https://example.com");
    expect(result.contentType).toContain("xhtml");
  });

  it("sets userAgent header", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({}));

    await fetchPageHtml("https://example.com", { userAgent: "PageGoblin/1.0" });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );
  });
});

describe("fetchAndExtractSignals", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns sanitized PageSignals with extracted fields", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({ body: RICH_HTML }));

    const signals = await fetchAndExtractSignals("https://example.com");

    expect(signals.url).toBe("https://example.com/");
    expect(signals.source).toBe("WEB_URL");
    expect(signals.title).toBe("Acme Pricing");
    expect(signals.h1).toContain("Acme — Best Widgets");
    expect(signals.ctaTexts?.length).toBeGreaterThan(0);
    expect(signals.hasPricing).toBe(true);
    expect(signals.hasMobileViewport).toBe(true);
  });

  it("does not include html property on returned signals", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({ body: RICH_HTML }));

    const signals = await fetchAndExtractSignals("https://example.com");

    expect("html" in signals).toBe(false);
  });

  it("preserves data for downstream private-page detection", async () => {
    const privateHtml = `<!DOCTYPE html><html><head><title>Dashboard</title></head><body><h1>Admin Panel</h1><p>Welcome to localhost admin</p></body></html>`;
    globalThis.fetch = vi.fn().mockResolvedValue(makeResponse({ body: privateHtml }));

    const signals = await fetchAndExtractSignals("https://example.com/admin");

    expect(signals.url).toContain("/admin");
    expect(signals.title).toBe("Dashboard");
    expect(signals.h1).toContain("Admin Panel");
    expect(signals.bodyTextSample).toBeDefined();
  });
});
