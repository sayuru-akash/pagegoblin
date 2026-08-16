import { test, expect } from "@playwright/test";

test.describe("Page rendering", () => {
  test("homepage loads with hero and roast form", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/PageGoblin/i);
    await expect(page.locator('input[type="text"], input[placeholder*="website"]').first()).toBeVisible();
    await expect(page.getByRole("button", { name: /roast my page/i }).first()).toBeVisible();
  });

  test("how-it-works page loads", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("examples page loads", async ({ page }) => {
    await page.goto("/examples");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("extension page loads with real product screenshots", async ({ page }) => {
    await page.goto("/extension");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/put a goblin in/i);
    await expect(page.locator('img[src*="extension-score"]')).toHaveCount(2);
    await expect(page.locator('img[src*="extension-complaints"]')).toHaveCount(1);
    await expect(page.locator('img[src*="extension-fixes"]')).toHaveCount(1);
  });

  test("shared final roast CTA stays consistent", async ({ page }) => {
    for (const route of ["/", "/how-it-works", "/examples"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { name: /go on\. feed me the page/i })).toBeVisible();
    }
  });

  test("extension page has no mobile horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/extension");
    const sizes = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(sizes.scrollWidth).toBe(sizes.clientWidth);
  });

  test("missing routes return the themed noindex 404", async ({ page }) => {
    const response = await page.goto("/a-page-the-goblin-cannot-find");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /this page is gone/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  });

  test("analyze page loads with form", async ({ page }) => {
    await page.goto("/analyze");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("support page loads", async ({ page }) => {
    await page.goto("/support");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("signin page loads", async ({ page }) => {
    await page.goto("/signin");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("signup page loads", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("body")).not.toContainText("Application error");
  });
});
