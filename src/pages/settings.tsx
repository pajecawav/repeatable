import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { SCHEMA_VERSION } from "@/constants";
import { DataBackup, exportData, importData } from "@/lib/backup";
import { store } from "@/stores/habitsStore";
import { settingsStore, WeekDay } from "@/stores/settingsStore";
import { Theme, themeStore } from "@/stores/themeStore";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode } from "react";

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
	function handleExport() {
		const data: DataBackup = {
			version: SCHEMA_VERSION,
			habits: store.habits,
		};
		exportData(data);
	}

	async function handleImport(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (!file) {
			return;
		}

		const data = await importData(file);
		// TODO: show toast?
		store.replaceHabits(data.habits);
	}

	return (
		<div className="mt-1 flex flex-col gap-4">
			<Section>
				<InfoContainer>
					<Title>Hide completed</Title>
					<Description>
						Completed habits will be hidden for the rest of the day.
					</Description>
				</InfoContainer>
				<Toggle
					checked={settingsStore.hideCompleted}
					onChange={value => settingsStore.setHideCompleted(value)}
				/>
			</Section>

			<hr className="border-neutral-200 dark:border-neutral-800" />

			<Section>
				<InfoContainer>
					<Title>Interface theme</Title>
					<Description>Select interface color scheme.</Description>
				</InfoContainer>
				<Select
					onChange={e => themeStore.setTheme(e.target.value as Theme)}
					value={themeStore.theme}
				>
					<option value="system">System</option>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</Select>
			</Section>

			<Section>
				<InfoContainer>
					<Title>First day of the week</Title>
					<Description>
						Set the first day of the week for the stats.
					</Description>
				</InfoContainer>
				<Select
					onChange={e =>
						settingsStore.setStartOfWeek(+e.target.value as WeekDay)
					}
					value={settingsStore.startOfWeek}
				>
					<option value="0">Sunday</option>
					<option value="1">Monday</option>
					<option value="2">Tuesday</option>
					<option value="3">Wednesday</option>
					<option value="4">Thursday</option>
					<option value="5">Friday</option>
					<option value="6">Saturday</option>
				</Select>
			</Section>

			<hr className="border-neutral-200 dark:border-neutral-800" />

			<Section>
				<InfoContainer>
					<Title>Export habits</Title>
					<Description>
						Generate a file with your habits. You can import this
						file later.
					</Description>
				</InfoContainer>
				<Button onClick={handleExport}>Export</Button>
			</Section>

			<Section>
				<InfoContainer>
					<Title>Import habits</Title>
					<Description>Load previously exported habits.</Description>
				</InfoContainer>

				<Button as="label" className="cursor-pointer">
					Import
					<input
						className="hidden"
						type="file"
						accept="application/json"
						onChange={handleImport}
					/>
				</Button>
			</Section>
		</div>
	);
});
