import { Habit } from "@/types";
import dayjs from "dayjs";
import { useMemo } from "react";

export interface Streak {
	start: Date;
	end: Date;
	length: number;
}

export function useStreaks(habit: Habit) {
	const streaks = useMemo<Streak[]>(() => {
		const dates = Object.entries(habit.entries)
			// consider every day with non-zero value as a part of the streak
			.filter(([, entry]) => entry?.value)
			.map(([date]) => date)
			.sort((a, b) => (a < b ? -1 : 1));

		if (dates.length === 0) {
			return [];
		}

		let data: Streak[] = [];

		const firstDate = dates.shift()!;
		let start = dayjs(firstDate);
		let end = dayjs(firstDate);

		for (const date of dates) {
			const current = dayjs(date);
			if (current.diff(end, "days") === 1) {
				end = current;
			} else {
				data.push({
					start: start.toDate(),
					end: end.toDate(),
					length: end.diff(start, "days") + 1,
				});
				start = current;
				end = current;
			}
		}

		data.push({
			start: start.toDate(),
			end: end.toDate(),
			length: end.diff(start, "days") + 1,
		});

		// find 10 longset streaks and sort them in descending order by start date
		data.sort((a, b) => b.length - a.length);
		data = data.slice(0, 10);
		data.sort((a, b) => (a.start < b.start ? 1 : -1));

		return data;
	}, [habit]);

	return streaks;
}
