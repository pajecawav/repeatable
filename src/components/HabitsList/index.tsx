import { store } from "@/store";
import { observer } from "mobx-react-lite";
import { HabitListEntry } from "./HabitsListEntry";

export const HabitsList = observer(() => {
	return (
		<div className="text-sm sm:text-base space-y-2">
			{store.habits.map(habit => (
				<HabitListEntry habit={habit} key={habit.id} />
			))}
		</div>
	);
});
