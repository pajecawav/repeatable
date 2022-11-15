import i18n from "i18next";
import { reaction } from "mobx";
import { initReactI18next } from "react-i18next";
import { Lang, settingsStore } from "./stores/settingsStore";

// TODO: should we import all of these or fetch them dynamically?
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const resources: Record<Lang, { translation: Record<string, string> }> = {
	en,
	ru,
};

i18n.use(initReactI18next).init({
	resources,
	lng: settingsStore.lang,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

reaction(
	() => settingsStore.lang,
	lang => i18n.changeLanguage(lang)
);

export default i18n;
