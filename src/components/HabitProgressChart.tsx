import { settingsStore } from "@/stores/settingsStore";
import { Habit } from "@/types";
import { formatValue } from "@/utils";
import dayjs from "dayjs";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Fragment, useMemo } from "react";
import { Card } from "./Card";

interface HabitProgressChartProps {
	habit: Habit;
}

interface ProgressEntry {
	value: number;
	goal: number;
}

interface Progress {
	day: ProgressEntry;
	week: ProgressEntry;
	month: ProgressEntry;
	year: ProgressEntry;
}

type ProgressSection = keyof Progress;

const progressLabels: Record<ProgressSection, string> = {
	day: "Today",
	week: "Week",
	month: "Month",
	year: "Year",
};

function HabitProgressChartEntry({
	section,
	entry,
}: {
	section: ProgressSection;
	entry: ProgressEntry;
}) {
	const percentage = (100 * entry.value) / entry.goal;
	const remaining = entry.goal - entry.value;
	return (
		<Fragment>
			<span className="text-right text-sm text-gray-500 dark:text-neutral-500">
				{progressLabels[section]}
			</span>
			<div className="flex items-center rounded-sm overflow-hidden text-sm text-center bg-gray-200 dark:bg-neutral-700">
				<div
					className="transition-[width] duration-300 bg-sky-600 text-white dark:bg-blue-500 dark:text-neutral-800"
					style={{ width: `${percentage}%` }}
				>
					{percentage > 5 ? formatValue(entry.value) : null}
				</div>
				<div className="w-0 flex-1 text-gray-600 dark:text-neutral-400">
					{percentage < 95 ? formatValue(remaining) : null}
				</div>
			</div>
		</Fragment>
	);
}

export const HabitProgressChart = observer(
	({ habit }: HabitProgressChartProps) => {
		const progress: Progress = useMemo(() => {
			return computed(() => {
				const goal = habit.goal;
				const today = dayjs();

				const result: Progress = {
					day: {
						value: 0,
						goal,
					},
					week: {
						value: 0,
						goal: 7 * goal,
					},
					month: {
						value: 0,
						goal: today.daysInMonth() * goal,
					},
					year: {
						value: 0,
						goal:
							today
								.endOf("year")
								.diff(today.startOf("year"), "days") * goal,
					},
				};

				// padding to respect custom start of the week
				const daysPadding = (7 - settingsStore.startOfWeek) % 7;

				for (const [dateKey, data] of Object.entries(habit.entries)) {
					if (!data) {
						continue;
					}

					const date = dayjs(new Date(dateKey));

					if (today.isSame(date, "day")) {
						result.day.value += data.value;
					}
					if (today.isSame(date.add(daysPadding, "days"), "week")) {
						result.week.value += data.value;
					}
					if (today.isSame(date, "month")) {
						result.month.value += data.value;
					}
					if (today.isSame(date, "year")) {
						result.year.value += data.value;
					}
				}

				return result;
			});
		}, [habit]).get();

		return (
			<Card>
				<Card.Title>Goal</Card.Title>

				<div className="grid grid-cols-[max-content,1fr] items-center gap-x-2 gap-y-1">
					<HabitProgressChartEntry
						section="day"
						entry={progress.day}
					/>
					<HabitProgressChartEntry
						section="week"
						entry={progress.week}
					/>
					<HabitProgressChartEntry
						section="month"
						entry={progress.month}
					/>
					<HabitProgressChartEntry
						section="year"
						entry={progress.year}
					/>
				</div>
			</Card>
		);
	}
);
