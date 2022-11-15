import { PROJECT_NAME } from "@/constants";
import { autorun, makeAutoObservable } from "mobx";

const SETTINGS_KEY = `${PROJECT_NAME}.settings`;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Lang = "en" | "ru";

interface Settings {
	startOfWeek: WeekDay;
	hideCompleted: boolean;
	lang: Lang;
}

function saveSettings(settings: Settings) {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
function loadSettings(): Settings | null {
	const value = localStorage.getItem(SETTINGS_KEY);
	return value ? JSON.parse(value) : null;
}

const savedSettings = loadSettings();

class SettingsStore implements Settings {
	startOfWeek = savedSettings?.startOfWeek ?? 0;
	hideCompleted = savedSettings?.hideCompleted ?? false;
	lang = savedSettings?.lang ?? "en";

	constructor() {
		makeAutoObservable(this);
	}

	updateSettings({ startOfWeek, hideCompleted, lang }: Partial<Settings>) {
		if (startOfWeek !== undefined) {
			this.startOfWeek = startOfWeek;
		}

		if (hideCompleted !== undefined) {
			this.hideCompleted = hideCompleted;
		}

		if (lang !== undefined) {
			this.lang = lang;
		}
	}

	setStartOfWeek(value: WeekDay) {
		this.startOfWeek = value;
	}

	setHideCompleted(value: boolean) {
		this.hideCompleted = value;
	}

	setLang(value: Lang) {
		this.lang = value;
	}
}

export const settingsStore = new SettingsStore();

autorun(() => saveSettings(settingsStore));

window.addEventListener("storage", event => {
	if (event.key === SETTINGS_KEY && event.newValue) {
		settingsStore.updateSettings(JSON.parse(event.newValue) as Settings);
	}
});
