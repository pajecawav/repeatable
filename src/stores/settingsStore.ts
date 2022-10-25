import { PROJECT_NAME } from "@/constants";
import { autorun, makeAutoObservable } from "mobx";

const SETTINGS_KEY = `${PROJECT_NAME}.settings`;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Settings {
	startOfWeek: WeekDay;
	hideCompleted: boolean;
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

	constructor() {
		makeAutoObservable(this);
	}

	updateSettings({ startOfWeek, hideCompleted }: Partial<Settings>) {
		if (startOfWeek !== undefined) {
			this.startOfWeek = startOfWeek;
		}

		if (hideCompleted !== undefined) {
			this.hideCompleted = hideCompleted;
		}
	}

	setStartOfWeek(value: WeekDay) {
		this.startOfWeek = value;
	}

	setHideCompleted(value: boolean) {
		this.hideCompleted = value;
	}
}

export const settingsStore = new SettingsStore();

autorun(() => saveSettings(settingsStore));

window.addEventListener("storage", event => {
	if (event.key === SETTINGS_KEY && event.newValue) {
		settingsStore.updateSettings(JSON.parse(event.newValue) as Settings);
	}
});
