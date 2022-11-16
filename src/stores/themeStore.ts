import { autorun, makeAutoObservable } from "mobx";

const THEME_KEY = "habits.theme";

export type Theme = "light" | "dark" | "system";

function getTheme(): Theme {
	const storedTheme = localStorage.getItem(THEME_KEY);

	if (storedTheme) {
		return storedTheme as Theme;
	}

	return "system";
}

function saveTheme(theme: Theme) {
	localStorage.setItem(THEME_KEY, theme);
}

function rawSetTheme(theme: "light" | "dark") {
	const root = document.documentElement;
	const meta = document.querySelector("meta[name='theme-color']");

	if (theme === "dark") {
		root.classList.add("dark");
		meta?.setAttribute("content", "#171717");
	} else {
		root.classList.remove("dark");
		meta?.setAttribute("content", "#f5f5f5");
	}
}

class ThemeStore {
	theme: Theme = getTheme();

	constructor() {
		makeAutoObservable(this);
	}

	setTheme(theme: Theme) {
		this.theme = theme;
	}
}

export const themeStore = new ThemeStore();

const prefersDarkMedia = matchMedia("(prefers-color-scheme: dark)");
prefersDarkMedia.addEventListener("change", event => {
	if (themeStore.theme !== "system") {
		return;
	}

	rawSetTheme(event.matches ? "dark" : "light");
});

autorun(() => {
	saveTheme(themeStore.theme);

	if (themeStore.theme === "system") {
		rawSetTheme(prefersDarkMedia.matches ? "dark" : "light");
	} else {
		rawSetTheme(themeStore.theme);
	}
});

window.addEventListener("storage", event => {
	if (event.key === THEME_KEY && event.newValue) {
		themeStore.setTheme(event.newValue as Theme);
	}
});
