import { Streak, useStreaks } from "@/hooks/useStreaks";
import { Habit } from "@/types";
import { cn, formatDate } from "@/utils";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Card } from "./Card";

interface HabitBestStreaksChartProps {
	habit: Habit;
}

function StreakEntry({ streak, best }: { streak: Streak; best: number }) {
	const percentageOfBest = streak.length / best;

	const paddingElement = (
		<div
			className="transition-[flex-grow] duration-300"
			style={{ flexGrow: (1 - percentageOfBest) / 2 }}
		/>
	);

	return (
		<div className="flex">
			{paddingElement}

			<span className="mr-2 text-gray-500 dark:text-neutral-500">
				{formatDate(streak.start)}
			</span>
			<div
				className={cn(
					"rounded-sm text-center transition-[flex-grow] duration-300",
					percentageOfBest > 0.5 &&
						"bg-sky-600 text-white dark:bg-blue-500 dark:text-neutral-800",
					percentageOfBest <= 0.5 &&
						"bg-gray-200 text-gray-600 dark:bg-neutral-700 dark:text-neutral-400"
				)}
				style={{ flexGrow: percentageOfBest }}
			>
				{streak.length}
			</div>
			<span className="ml-2 text-gray-500 dark:text-neutral-500">
				{formatDate(streak.end)}
			</span>

			{paddingElement}
		</div>
	);
}

export const HabitBestStreaksChart = observer(
	({ habit }: HabitBestStreaksChartProps) => {
		const streaks = useStreaks(habit);

		const bestStreak = useMemo(
			() =>
				streaks.reduce(
					(best, streak) => Math.max(best, streak.length),
					0
				),
			[streaks]
		);

		return (
			<Card>
				<Card.Title>Best streaks</Card.Title>

				<div className="text-sm flex flex-col gap-1">
					{streaks.map(streak => (
						<StreakEntry
							streak={streak}
							best={bestStreak}
							key={streak.start.toISOString()}
						/>
					))}
				</div>
			</Card>
		);
	}
);
