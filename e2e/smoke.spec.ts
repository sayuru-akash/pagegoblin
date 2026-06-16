import { test, expect } from "@playwright/test";

test.describe("Page rendering", () => {
  test("homepage loads with hero and roast form", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/PageGoblin/i);
    await expect(page.locator('input[type="text"], input[placeholder*="website"]')).toBeVisible();
    await expect(page.getByText(/unleash the goblin/i)).toBeVisible();
  });

  test("how-it-works page loads", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page.locator("body")).not.toContainText("Application error");
  });

  test("examples page loads", async ({ page }) => {
    await page.goto("/examples");
    await expect(page.locator("body")).not.toContainText("Application error");
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
