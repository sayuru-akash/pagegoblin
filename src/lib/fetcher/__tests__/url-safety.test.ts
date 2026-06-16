import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { assertSafeFetchUrl } from "../url-safety";
import { PageFetchError } from "../types";

describe("assertSafeFetchUrl", () => {
  it("accepts normal https URL", async () => {
    const result = await assertSafeFetchUrl("https://example.com/page?q=1#hero");
    expect(result.url).toBe("https://example.com/page?q=1#hero");
    expect(result.domain).toBe("example.com");
    expect(result.protocol).toBe("https:");
  });

  it("accepts http URL", async () => {
    const result = await assertSafeFetchUrl("http://example.com");
    expect(result.url).toBe("http://example.com/");
    expect(result.protocol).toBe("http:");
  });

  it("normalizes URL without protocol to https", async () => {
    const result = await assertSafeFetchUrl("example.com/path");
    expect(result.url).toMatch(/^https:\/\//);
    expect(result.domain).toBe("example.com");
  });

  it("rejects file: protocol", async () => {
    await expect(assertSafeFetchUrl("file:///etc/passwd")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("file:///etc/passwd")).rejects.toMatchObject({ code: "BLOCKED_PROTOCOL" });
  });

  it("rejects ftp: protocol", async () => {
    await expect(assertSafeFetchUrl("ftp://example.com/file")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("ftp://example.com/file")).rejects.toMatchObject({ code: "BLOCKED_PROTOCOL" });
  });

  it("rejects javascript: protocol", async () => {
    await expect(assertSafeFetchUrl("javascript:alert(1)")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("javascript:alert(1)")).rejects.toMatchObject({ code: "BLOCKED_PROTOCOL" });
  });

  it("rejects localhost", async () => {
    await expect(assertSafeFetchUrl("http://localhost:3000")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://localhost:3000")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects 127.0.0.1", async () => {
    await expect(assertSafeFetchUrl("http://127.0.0.1")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://127.0.0.1")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects 127.x.x.x range", async () => {
    await expect(assertSafeFetchUrl("http://127.0.0.2")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://127.0.0.2")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects 0.0.0.0", async () => {
    await expect(assertSafeFetchUrl("http://0.0.0.0")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://0.0.0.0")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects 10.x.x.x private range", async () => {
    await expect(assertSafeFetchUrl("http://10.0.0.1")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://10.0.0.1")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects 172.16-31.x.x private range", async () => {
    await expect(assertSafeFetchUrl("http://172.16.0.1")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://172.16.0.1")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
    await expect(assertSafeFetchUrl("http://172.31.255.255")).rejects.toThrow(PageFetchError);
  });

  it("rejects 192.168.x.x private range", async () => {
    await expect(assertSafeFetchUrl("http://192.168.1.1")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://192.168.1.1")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects IPv6 loopback ::1", async () => {
    await expect(assertSafeFetchUrl("http://[::1]")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("http://[::1]")).rejects.toMatchObject({ code: "BLOCKED_HOST" });
  });

  it("rejects credentialed URL", async () => {
    await expect(assertSafeFetchUrl("https://user:pass@example.com")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("https://user:pass@example.com")).rejects.toMatchObject({ code: "BLOCKED_CREDENTIALS" });
  });

  it("rejects invalid URL string", async () => {
    await expect(assertSafeFetchUrl("not a url at all %%")).rejects.toThrow(PageFetchError);
    await expect(assertSafeFetchUrl("not a url at all %%")).rejects.toMatchObject({ code: "INVALID_URL" });
  });

  describe("DNS resolution private IP blocking", () => {
    let originalLookup: typeof import("dns").promises.lookup;

    beforeEach(async () => {
      const dns = await import("dns");
      originalLookup = dns.promises.lookup;
    });

    afterEach(async () => {
      const dns = await import("dns");
      dns.promises.lookup = originalLookup;
    });

    it("rejects domain that resolves to private IP", async () => {
      const dns = await import("dns");
      dns.promises.lookup = vi.fn().mockResolvedValue({ address: "192.168.1.100", family: 4 }) as typeof originalLookup;

      await expect(assertSafeFetchUrl("https://internal.mycompany.com")).rejects.toThrow(PageFetchError);
      await expect(assertSafeFetchUrl("https://internal.mycompany.com")).rejects.toMatchObject({ code: "DNS_PRIVATE_IP" });
    });

    it("rejects domain that resolves to loopback", async () => {
      const dns = await import("dns");
      dns.promises.lookup = vi.fn().mockResolvedValue({ address: "127.0.0.1", family: 4 }) as typeof originalLookup;

      await expect(assertSafeFetchUrl("https://sneaky.local")).rejects.toThrow(PageFetchError);
      await expect(assertSafeFetchUrl("https://sneaky.local")).rejects.toMatchObject({ code: "DNS_PRIVATE_IP" });
    });
  });
});
