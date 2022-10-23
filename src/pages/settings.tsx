import { Select } from "@/components/Select";
import { settingsStore, WeekDay } from "@/stores/settingsStore";
import { Theme, themeStore } from "@/stores/themeStore";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

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
	return (
		<div className="mt-1 flex flex-col gap-4">
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
		</div>
	);
});
