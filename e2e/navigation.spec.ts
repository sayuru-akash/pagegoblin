import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("header links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Extension", exact: true }).first().click();
    await expect(page).toHaveURL(/\/extension/);
  });

  test("footer links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /privacy/i }).first().click();
    await expect(page).toHaveURL(/\/privacy/);
  });

  test("extension install links point to the live Chrome Web Store listing", async ({ page }) => {
    await page.goto("/extension");
    const installLink = page.getByRole("link", { name: /add pagegoblin to chrome/i });
    await expect(installLink).toHaveAttribute(
      "href",
      "https://chromewebstore.google.com/detail/pagegoblin-%E2%80%94-website-roas/dbhodopbhioihlpebnnjbjdhkbeomndp",
    );
    await expect(installLink).toHaveAttribute("target", "_blank");
    await expect(installLink).toHaveAttribute("rel", /noopener/);
  });

  test("roast my page CTA navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /roast my page/i }).first().click();
    await expect(page).toHaveURL(/\/analyze|\/$/);
  });
});
