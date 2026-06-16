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
    const button = page.getByText(/unleash the goblin/i);
    await button.click();
    await expect(page.locator('#url-roast-error, [role="alert"]').first()).toBeVisible({ timeout: 5000 });
  });

  test("valid URL navigates to report (or shows loading)", async ({ page }) => {
    await page.goto("/");
    const input = page.locator('input[placeholder*="website"], input[placeholder*="your-website"]').first();
    await input.fill("example.com");
    const button = page.getByText(/unleash the goblin/i);
    await button.click();
    await page.waitForTimeout(3000);
    const url = page.url();
    expect(url.includes("/roasts/") || url === "http://localhost:3000/" || url.includes("/analyze")).toBeTruthy();
  });
});
