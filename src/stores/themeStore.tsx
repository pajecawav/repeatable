import { autorun, makeAutoObservable } from "mobx";

const THEME_KEY = "habits.theme";

export type Theme = "light" | "dark";

function getTheme(): Theme {
	const storedTheme = localStorage.getItem(THEME_KEY);
	if (storedTheme) {
		return storedTheme as Theme;
	}

	const userMedia = matchMedia("(prefers-color-scheme: dark)");
	if (userMedia?.matches) {
		return "dark";
	}

	return "light";
}

function saveTheme(theme: Theme) {
	localStorage.setItem(THEME_KEY, theme);
}

class ThemeStore {
	theme: Theme = getTheme();

	constructor() {
		makeAutoObservable(this);
	}

	setTheme(theme: Theme) {
		this.theme = theme;
	}

	toggleTheme() {
		this.theme = this.theme === "light" ? "dark" : "light";
	}
}

export const themeStore = new ThemeStore();

autorun(() => {
	saveTheme(themeStore.theme);

	const root = document.documentElement;

	if (themeStore.theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
});
