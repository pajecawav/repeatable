import { Habit } from "@/types";
import dayjs from "dayjs";
import { Fragment, useMemo } from "react";

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
			<span className="text-right text-sm text-gray-500">
				{progressLabels[section]}
			</span>
			<div className="flex rounded-sm overflow-hidden text-sm text-center bg-neutral-200">
				<div
					className="bg-sky-600 text-white"
					style={{ width: `${percentage}%` }}
				>
					{percentage > 5 ? entry.value : null}
				</div>
				<div className="w-0 flex-1 text-gray-600">
					{percentage < 90 ? remaining : null}
				</div>
			</div>
		</Fragment>
	);
}

export function HabitProgressChart({ habit }: HabitProgressChartProps) {
	const progress = useMemo<Progress>(() => {
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
					today.endOf("year").diff(today.startOf("year"), "days") *
					goal,
			},
		};

		for (const [dateKey, data] of Object.entries(habit.entries)) {
			if (!data) {
				continue;
			}

			const date = new Date(dateKey);

			if (today.isSame(date, "day")) {
				result.day.value += data.value;
			}
			if (today.isSame(date, "week")) {
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
	}, [habit]);

	return (
		<div className="p-4 rounded-md bg-white text-lg">
			<h3 className="mb-2 text-sky-600">Goal</h3>

			<div className="grid grid-cols-[max-content,1fr] items-center space-x-2 space-y-1">
				<HabitProgressChartEntry section="day" entry={progress.day} />
				<HabitProgressChartEntry section="week" entry={progress.week} />
				<HabitProgressChartEntry
					section="month"
					entry={progress.month}
				/>
				<HabitProgressChartEntry section="year" entry={progress.year} />
			</div>
		</div>
	);
}
