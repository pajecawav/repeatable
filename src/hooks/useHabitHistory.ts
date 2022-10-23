import { getDateKey } from "@/lib";
import { settingsStore } from "@/stores/settingsStore";
import { Habit } from "@/types";
import dayjs from "dayjs";
import { computed } from "mobx";
import { useState, useMemo, useCallback } from "react";

export function useHabitHistory(habit: Habit, totalWeeks: number) {
	const [offset, setOffset] = useState(0);

	const shiftLeft = useCallback(() => setOffset(offset => offset - 1), []);

	const shiftRight = useCallback(() => setOffset(offset => offset + 1), []);

	const data = useMemo(() => {
		return computed(() => {
			const endDate = dayjs().add(offset, "weeks");
			const nowDateKey = getDateKey(new Date());

			const weeksPadding = settingsStore.startOfWeek === 0 ? 1 : 0;
			const startDate = endDate
				.startOf("week")
				.subtract(totalWeeks - weeksPadding, "weeks")
				.add(settingsStore.startOfWeek, "day");

			const weeks: number[][] = [];

			const date = startDate.toDate();
			for (let week = 0; week < totalWeeks; week++) {
				const weekValues = [];
				for (let day = 0; day < 7; day++) {
					const dateKey = getDateKey(date);
					weekValues.push(habit.entries[dateKey]?.value ?? 0);

					if (dateKey === nowDateKey) {
						break;
					}

					date.setDate(date.getDate() + 1);
				}
				weeks.push(weekValues);
			}

			return { startDate, weeks };
		});
	}, [habit.entries, offset, totalWeeks]).get();

	return { data, offset, shiftLeft, shiftRight };
}
