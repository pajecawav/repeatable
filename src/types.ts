export type HabitType = "boolean" | "numeric";

// yyyy-mm-dd
export type DateKey = string;

export interface Habit {
	id: number;
	name: string;
	type: HabitType;
	goal: number;
	unit: string;
	entries: Record<DateKey, HabitEntry | undefined>;
}

export interface HabitEntry {
	// date: DateKey;
	value: number;
}
