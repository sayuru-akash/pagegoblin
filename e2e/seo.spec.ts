import { test, expect } from "@playwright/test";

test.describe("Public SEO surface", () => {
  for (const route of ["/", "/analyze", "/extension", "/how-it-works", "/examples", "/support", "/privacy", "/terms"]) {
    test(`${route} has complete page metadata`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveTitle(/PageGoblin/i);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.trim().length).toBeGreaterThanOrEqual(40);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://pagegoblin.org${route === "/" ? "" : route}`,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /pagegoblin-og\.jpg$/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    });
  }

  test("extension page exposes valid software and FAQ structured data", async ({ page }) => {
    await page.goto("/extension");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = blocks.map((block) => JSON.parse(block));
    expect(parsed.some((item) => JSON.stringify(item).includes("SoftwareApplication"))).toBe(true);
    expect(parsed.some((item) => JSON.stringify(item).includes("FAQPage"))).toBe(true);
  });

  test("sitemap and robots include the right public and private boundaries", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("/extension");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    const text = await robots.text();
    expect(text).toContain("Disallow: /api/");
    expect(text).toContain("Disallow: /admin/");
    expect(text).toContain("Sitemap:");
  });
});
