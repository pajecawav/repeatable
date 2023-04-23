import { store } from "@/stores/habitsStore";
import { settingsStore } from "@/stores/settingsStore";
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
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HabitsListEntry } from "./HabitsListEntry";

interface HabitsListProps {
	dates: Date[];
}

export const HabitsList = observer(({ dates }: HabitsListProps) => {
	const { t } = useTranslation();

	const habits = useMemo(
		() =>
			computed(() => {
				return settingsStore.hideCompleted
					? store.uncompletedHabits
					: store.habits;
			}),
		[]
	).get();

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

	if (habits.length === 0) {
		return (
			<div className="h-32 grid place-items-center text-xl text-neutral-500 border-b border-neutral-300 dark:border-neutral-800">
				{t("message.no-habits")}
			</div>
		);
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			onDragStart={() => navigator.vibrate?.(100)}
		>
			<SortableContext
				items={habits.map(habit => habit.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className="flex flex-col gap-2 text-sm sm:text-base">
					{habits.map(habit => (
						<HabitsListEntry
							habit={habit}
							dates={dates}
							key={habit.id}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
});
