import { expect, test } from "@playwright/test";
import { createRandomHabit, visitHabitPage } from "./utils.js";

test.describe("habit form", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/new");
	});

	test("creates new habit", async ({ page }) => {
		const habit = await createRandomHabit(page);
		await page.goto("/");
		await expect(page.getByText(habit.name)).toBeVisible();

		await visitHabitPage(page, habit.name);
		await expect(page.getByText(habit.name)).toBeVisible();
		await expect(
			page.getByText(`${habit.goal} ${habit.units}`),
		).toBeVisible();
	});

	test("redirects to the home page", async ({ page }) => {
		await createRandomHabit(page);
		await expect(page).toHaveURL("/");
	});

	test("new habits is inserted at the start of the list", async ({
		page,
	}) => {
		const firstHabit = await createRandomHabit(page);
		const secondHabit = await createRandomHabit(page);

		await page.goto("/");

		await expect(page.getByTestId("habit-name").nth(0)).toHaveText(
			secondHabit.name,
		);
		await expect(page.getByTestId("habit-name").nth(1)).toHaveText(
			firstHabit.name,
		);
	});
});

test.describe("habit page", () => {
	test("can edit habit", async ({ page }) => {
		const habit = await createRandomHabit(page);
		const newName = "EDITED";

		await visitHabitPage(page, habit.name);
		await page.getByRole("link", { name: "Edit" }).click();

		await page.getByLabel("name").fill(newName);
		await page.getByRole("button", { name: "Save" }).click();

		await page.goto("/");
		await expect(page.getByText(newName)).toBeVisible();
	});

	test("can delete habit", async ({ page }) => {
		const habit = await createRandomHabit(page);

		page.on("dialog", dialog => dialog.accept());

		await visitHabitPage(page, habit.name);
		await page.getByRole("button", { name: "Delete" }).click();

		await page.goto("/");
		await expect(page.getByText(habit.name)).not.toBeVisible();
	});
});
