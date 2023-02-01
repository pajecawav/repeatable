import { test, expect } from "@playwright/test";

test.describe("header", () => {
	test("has settings link", async ({ page }) => {
		await page.goto("/");
		const header = page.locator("header");
		const link = header.getByRole("link", { name: "settings" });
		await expect(link).toBeVisible();
	});

	test("has 'go back' button on non-root pages", async ({ page }) => {
		await page.goto("/settings");
		const header = page.locator("header");
		const link = header.getByRole("link", { name: "habits" });
		await expect(link).toBeVisible();
	});
});
