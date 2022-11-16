import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { SCHEMA_VERSION } from "@/constants";
import { DataBackup, exportData, importData } from "@/lib/backup";
import { store } from "@/stores/habitsStore";
import { Lang, settingsStore, WeekDay } from "@/stores/settingsStore";
import { Theme, themeStore } from "@/stores/themeStore";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { version } from "../../package.json";

const languages: Record<Lang, string> = {
	en: "English",
	ru: "Русский",
};

function Section({ children }: { children: ReactNode }) {
	return <div className="flex gap-1 items-center">{children}</div>;
}

function InfoContainer({ children }: { children: ReactNode }) {
	return <div className="flex-1 flex flex-col gap-1">{children}</div>;
}

function Title({ children }: { children: ReactNode }) {
	return <span className="font-medium">{children}</span>;
}

function Description({ children }: { children: ReactNode }) {
	return <span className="text-neutral-500">{children}</span>;
}

export const SettingsPage = observer(() => {
	const { t } = useTranslation();

	async function handleExport() {
		const data: DataBackup = {
			version: SCHEMA_VERSION,
			habits: store.habits,
		};
		exportData(data);
		toast(t("message.data-exported"));
	}

	async function handleImport(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (!file) {
			return;
		}

		const data = await importData(file);
		store.replaceHabits(data.habits);
		toast(t("message.data-imported"));
	}

	const separator = (
		<hr className="border-neutral-200 dark:border-neutral-800" />
	);

	return (
		<div className="mt-1 flex flex-col gap-4">
			<Section>
				<InfoContainer>
					<Title>{t("label.settings.hide-completed.title")}</Title>
					<Description>
						{t("label.settings.hide-completed.description")}
					</Description>
				</InfoContainer>
				<Toggle
					checked={settingsStore.hideCompleted}
					onChange={value => settingsStore.setHideCompleted(value)}
				/>
			</Section>

			{separator}

			<Section>
				<InfoContainer>
					<Title>{t("label.settings.language.title")}</Title>
					<Description>
						{t("label.settings.language.description")}
					</Description>
				</InfoContainer>
				<Select
					onChange={e =>
						settingsStore.setLang(e.target.value as Lang)
					}
					value={settingsStore.lang}
				>
					{Object.entries(languages).map(([lang, name]) => (
						<option value={lang} key={lang}>
							{name}
						</option>
					))}
				</Select>
			</Section>

			<Section>
				<InfoContainer>
					<Title>{t("label.settings.theme.title")}</Title>
					<Description>
						{t("label.settings.theme.description")}
					</Description>
				</InfoContainer>
				<Select
					onChange={e => themeStore.setTheme(e.target.value as Theme)}
					value={themeStore.theme}
				>
					<option value="system">{t("label.theme.system")}</option>
					<option value="light">{t("label.theme.light")}</option>
					<option value="dark">{t("label.theme.dark")}</option>
				</Select>
			</Section>

			<Section>
				<InfoContainer>
					<Title>{t("label.settings.first-day.title")}</Title>
					<Description>
						{t("label.settings.first-day.description")}
					</Description>
				</InfoContainer>
				<Select
					onChange={e =>
						settingsStore.setStartOfWeek(+e.target.value as WeekDay)
					}
					value={settingsStore.startOfWeek}
				>
					<option value="0">{t("label.weekday.sunday")}</option>
					<option value="1">{t("label.weekday.monday")}</option>
					<option value="2">{t("label.weekday.tuesday")}</option>
					<option value="3">{t("label.weekday.wednesday")}</option>
					<option value="4">{t("label.weekday.thursday")}</option>
					<option value="5">{t("label.weekday.friday")}</option>
					<option value="6">{t("label.weekday.saturday")}</option>
				</Select>
			</Section>

			{separator}

			<Section>
				<InfoContainer>
					<Title>{t("label.settings.export.title")}</Title>
					<Description>
						{t("label.settings.export.description")}
					</Description>
				</InfoContainer>
				<Button onClick={handleExport}>{t("label.export")}</Button>
			</Section>

			<Section>
				<InfoContainer>
					<Title>{t("label.settings.import.title")}</Title>
					<Description>
						{t("label.settings.import.description")}
					</Description>
				</InfoContainer>

				<Button
					as="label"
					className="cursor-pointer focus-within:[outline:auto]"
				>
					{t("label.import")}
					<input
						className="sr-only"
						type="file"
						accept="application/json"
						onChange={handleImport}
					/>
				</Button>
			</Section>

			<a
				className="mx-auto hover:underline text-neutral-400 dark:text-neutral-600"
				href="https://github.com/pajecawav/repeatable"
				target="_blank"
				rel="noreferrer noopener"
			>
				v{version}
			</a>
		</div>
	);
});
