import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("header links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /how it works/i }).first().click();
    await expect(page).toHaveURL(/\/(#how-it-works|how-it-works)/);
  });

  test("footer links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /privacy/i }).first().click();
    await expect(page).toHaveURL(/\/privacy/);
  });

  test("roast my page CTA navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /roast my page/i }).first().click();
    await expect(page).toHaveURL(/\/analyze|\/$/);
  });
});
