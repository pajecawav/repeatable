import { autorun, makeAutoObservable } from "mobx";
import { DateKey, Habit } from "./types";

const LOCAL_STORAGE_KEY = "habits";

let latestId = 0;

// TODO: use IndexedDB instead of LocalStorage
function saveHabits(habits: Habit[]) {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
}
function loadHabits(): Habit[] | null {
	const habits = localStorage.getItem(LOCAL_STORAGE_KEY);
	return habits ? JSON.parse(habits) : null;
}

const savedHabits: Habit[] = loadHabits() ?? [];

export type HabitCreate = Omit<Habit, "id" | "entries">;
export type HabitUpdate = Partial<Omit<Habit, "id" | "entries">>;

class Store {
	habits: Habit[] = savedHabits;

	constructor() {
		makeAutoObservable(this);
	}

	addHabit(data: HabitCreate): Habit {
		const newHabit: Habit = {
			...data,
			id: ++latestId,
			entries: {},
		};

		this.habits.unshift(newHabit);

		return newHabit;
	}

	updateHabit(habitId: number, data: HabitUpdate): Habit {
		const habit = this.habits.find(habit => habit.id === habitId);

		if (!habit) {
			throw new Error(`Habit with id ${habitId} doesn't exist`);
		}

		Object.assign(habit, data);

		return habit;
	}

	deleteHabit(habitId: number): Habit {
		const index = this.habits.findIndex(habit => habit.id === habitId);

		if (index < 0) {
			throw new Error(`Habit with id ${habitId} doesn't exist`);
		}

		const [habit] = this.habits.splice(index, 1);

		return habit;
	}

	updateHabitEntry(habitId: number, dateKey: DateKey, value: number) {
		const habit = this.habits.find(habit => habit.id === habitId);

		if (!habit) {
			throw new Error(`Habit with id ${habitId} doesn't exist`);
		}

		habit.entries[dateKey] = { value };
	}
}

export const store = new Store();

autorun(() => saveHabits(store.habits));
