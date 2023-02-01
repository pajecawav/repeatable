import { test, expect } from "@playwright/test";

test.describe("settings", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/settings");
	});

	test("changes app language", async ({ page }) => {
		const languageSelect = page.getByTestId("language-select");
		await languageSelect.selectOption({ label: "Русский" });
		await expect(page.getByText("язык").first()).toBeVisible();
	});

	test("changes theme", async ({ page }) => {
		const themeSelect = page.getByTestId("theme-select");

		await themeSelect.selectOption({ label: "Dark" });
		await expect(page.locator("html")).toHaveClass("dark");

		await themeSelect.selectOption({ label: "Light" });
		await expect(page.locator("html")).not.toHaveClass("dark");
	});
});
