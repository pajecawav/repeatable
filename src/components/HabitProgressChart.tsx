import {
	ProgressEntry,
	ProgressSection,
	useProgress,
} from "@/hooks/useProgress";
import { Habit } from "@/types";
import { formatValue } from "@/utils";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Card } from "./Card";

interface HabitProgressChartProps {
	habit: Habit;
}

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
		const progress = useProgress(habit);

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
