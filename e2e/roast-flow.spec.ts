import { test, expect } from "@playwright/test";

test.describe("URL roast form", () => {
  test("form accepts URL input", async ({ page }) => {
    await page.goto("/");
    const input = page.locator('input[placeholder*="website"], input[placeholder*="your-website"]').first();
    await input.fill("example.com");
    await expect(input).toHaveValue(/example\.com/);
  });

  test("empty submission shows validation error", async ({ page }) => {
    await page.goto("/");
    const input = page.locator('input[placeholder*="website"], input[placeholder*="your-website"]').first();
    await input.fill("not-a-url");
    const button = page.getByRole("button", { name: /roast my page/i }).first();
    await button.click();
    await expect(page.locator('#url-roast-error, [role="alert"]').first()).toBeVisible({ timeout: 5000 });
  });

  test("valid URL submits and follows the report link", async ({ page }) => {
    await page.route("**/api/roasts", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ report: { slug: "test-roast" }, links: { report: "/analyze" } }),
      });
    });
    await page.goto("/");
    const input = page.locator('input[placeholder*="website"], input[placeholder*="your-website"]').first();
    await input.fill("example.com");
    const button = page.getByRole("button", { name: /roast my page/i }).first();
    await button.click();
    await expect(page).toHaveURL(/\/analyze$/);
  });
});
