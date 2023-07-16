import {
	ProgressEntry,
	ProgressSection,
	useProgress,
} from "@/hooks/useProgress";
import { Habit } from "@/types";
import { formatValue } from "@/utils";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./Card";

interface HabitProgressChartProps {
	habit: Habit;
}

function HabitProgressChartEntry({
	label,
	entry,
}: {
	label: string;
	entry: ProgressEntry;
}) {
	const percentage = (100 * entry.value) / entry.goal;
	const remaining = entry.goal - entry.value;
	return (
		<Fragment>
			<span className="text-right text-sm text-gray-500 dark:text-neutral-500">
				{label}
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
		const { t } = useTranslation();
		const progress = useProgress(habit);

		const labels: Record<ProgressSection, string> = {
			day: t("label.today"),
			week: t("label.week"),
			month: t("label.month"),
			year: t("label.year"),
		};

		return (
			<Card>
				<Card.Title>{t("label.goal")}</Card.Title>

				<div className="grid grid-cols-[max-content,1fr] items-center gap-x-2 gap-y-1">
					<HabitProgressChartEntry
						label={labels.day}
						entry={progress.day}
					/>
					<HabitProgressChartEntry
						label={labels.week}
						entry={progress.week}
					/>
					<HabitProgressChartEntry
						label={labels.month}
						entry={progress.month}
					/>
					<HabitProgressChartEntry
						label={labels.year}
						entry={progress.year}
					/>
				</div>
			</Card>
		);
	},
);
