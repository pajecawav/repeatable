import { expect, Page, test } from "@playwright/test";

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
			page.getByText(`${habit.goal} ${habit.units}`)
		).toBeVisible();
	});

	test("redirects to the home page", async ({ page }) => {
		await createRandomHabit(page);
		await expect(page).toHaveURL("/");
	});
});

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

type RandomHabit = ReturnType<typeof randomHabit>;

function randomHabit() {
	return {
		name: "Hello world",
		goal: Math.floor(Math.random() * 100),
		units: "times",
	};
}

async function fillHabitForm(page: Page, habit: RandomHabit) {
	await page.getByLabel("name").fill(habit.name);
	await page.getByLabel("goal").fill(habit.goal.toString());
	await page.getByLabel("units").fill(habit.units);
}

async function createRandomHabit(page: Page) {
	const habit = randomHabit();
	await page.goto("/new");
	await fillHabitForm(page, habit);
	await page.getByRole("button", { name: "save" }).click();
	return habit;
}

async function visitHabitPage(page: Page, name: string) {
	await page.goto("/");
	await page.getByRole("link", { name }).click();
}
