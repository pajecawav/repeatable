import { store } from "@/stores/habitsStore";
import { observer } from "mobx-react-lite";
import { HabitListEntry } from "./HabitsListEntry";

export const HabitsList = observer(() => {
	if (store.habits.length === 0) {
		return (
			<div className="h-32 grid place-items-center text-xl text-neutral-500 border-b border-b-neutral-700">
				No habits in the list.
			</div>
		);
	}

	return (
		<div className="text-sm sm:text-base space-y-2">
			{store.habits.map(habit => (
				<HabitListEntry habit={habit} key={habit.id} />
			))}
		</div>
	);
});
