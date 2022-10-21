import { store } from "@/stores/habitsStore";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { HabitListEntry } from "./HabitsListEntry";

export const HabitsList = observer(() => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { delay: 100, tolerance: 10 },
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = store.habits.findIndex(
				habit => habit.id === active.id
			);
			const newIndex = store.habits.findIndex(
				habit => habit.id === over.id
			);
			store.moveHabit(oldIndex, newIndex);
		}
	}

	if (store.habits.length === 0) {
		return (
			<div className="h-32 grid place-items-center text-xl text-neutral-500 border-b border-neutral-300 dark:border-neutral-800">
				No habits in the list.
			</div>
		);
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={store.habits.map(habit => habit.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className="flex flex-col gap-2 text-sm sm:text-base">
					{store.habits.map(habit => (
						<HabitListEntry habit={habit} key={habit.id} />
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
});
