import { autorun, makeAutoObservable } from "mobx";
import { DateKey, Habit } from "../types";

const HABITS_KEY = "habits.data";

// TODO: use IndexedDB instead of LocalStorage
function saveHabits(habits: Habit[]) {
	localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}
function loadHabits(): Habit[] | null {
	const habits = localStorage.getItem(HABITS_KEY);
	return habits ? JSON.parse(habits) : null;
}

const savedHabits: Habit[] = loadHabits() ?? [];
let latestId = Math.max(0, ...savedHabits.map(habit => habit.id));

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

	moveHabit(oldIndex: number, newIndex: number) {
		if (oldIndex < 0 || oldIndex >= this.habits.length) {
			throw new Error("oldIndex out of range");
		}

		if (newIndex < 0 || newIndex >= this.habits.length) {
			throw new Error("newIndex out of range");
		}

		const [habit] = this.habits.splice(oldIndex, 1);
		this.habits.splice(newIndex, 0, habit);
	}

	replaceHabits(habits: Habit[]) {
		this.habits = habits;
	}
}

export const store = new Store();

autorun(() => saveHabits(store.habits));

window.addEventListener("storage", event => {
	if (event.key === HABITS_KEY && event.newValue) {
		store.replaceHabits(JSON.parse(event.newValue) as Habit[]);
	}
});
