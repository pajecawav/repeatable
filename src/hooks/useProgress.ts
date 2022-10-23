import { settingsStore } from "@/stores/settingsStore";
import { Habit } from "@/types";
import dayjs from "dayjs";
import { computed } from "mobx";
import { useMemo } from "react";

export interface ProgressEntry {
	value: number;
	goal: number;
}

export interface Progress {
	day: ProgressEntry;
	week: ProgressEntry;
	month: ProgressEntry;
	year: ProgressEntry;
}

export type ProgressSection = keyof Progress;

export function useProgress(habit: Habit) {
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

	return progress;
}
