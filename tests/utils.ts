import { Page } from "@playwright/test";

export type RandomHabit = ReturnType<typeof randomHabit>;

export function randomHabit() {
	return {
		name: "Hello world",
		goal: Math.floor(Math.random() * 100),
		units: "times",
	};
}

export async function fillHabitForm(page: Page, habit: RandomHabit) {
	await page.getByLabel("name").fill(habit.name);
	await page.getByLabel("goal").fill(habit.goal.toString());
	await page.getByLabel("units").fill(habit.units);
}

export async function createRandomHabit(page: Page) {
	const habit = randomHabit();
	await page.goto("/new");
	await fillHabitForm(page, habit);
	await page.getByRole("button", { name: "save" }).click();
	return habit;
}

export async function visitHabitPage(page: Page, name: string) {
	await page.goto("/");
	await page.getByRole("link", { name }).click();
}
