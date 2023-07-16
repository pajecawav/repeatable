import { expect, test } from "@playwright/test";
import { createRandomHabit } from "./utils.js";

const LOCALSTORAGE_KEY = "repeatable.habits";

test.describe("backup", () => {
	test("state is identical after exporting and importing data", async ({
		page,
	}) => {
		for (let i = 0; i < 3; i++) {
			await createRandomHabit(page);
		}

		await page.goto("/settings");

		const localStorageSnapshot = await page.evaluate(
			`JSON.parse(window.localStorage.getItem("${LOCALSTORAGE_KEY}"))`,
		);
		await expect(localStorageSnapshot).toHaveLength(3);

		// download backup
		const downloadPromise = page.waitForEvent("download");
		await page.getByRole("button", { name: "Export" }).click();
		const download = await downloadPromise;
		const downloadPath = await download.path();

		await expect(downloadPath).not.toBe(null);
		await expect(page.getByText("Exported data.")).toBeVisible();

		// clear storage
		await page.evaluate(
			`window.localStorage.removeItem("${LOCALSTORAGE_KEY}")`,
		);

		// import backup
		await page.getByLabel("Import").setInputFiles(downloadPath!);

		const newLocalStorageSnapshot = await page.evaluate(
			`JSON.parse(window.localStorage.getItem("${LOCALSTORAGE_KEY}"))`,
		);
		expect(newLocalStorageSnapshot).toStrictEqual(localStorageSnapshot);
	});
});
