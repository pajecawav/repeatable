import { EditHabitForm, EditHabitFormData } from "@/components/EditHabitForm";
import { store } from "@/store";
import { Redirect, useLocation } from "wouter";

interface EditHaibtPageProps {
	params: {
		id: string;
	};
}

export function EditHabitPage({ params: { id: idProp } }: EditHaibtPageProps) {
	const [, setLocation] = useLocation();

	const id = +idProp;

	const habit = store.habits.find(habit => habit.id === id);

	if (!habit) {
		return <Redirect href="/" />;
	}

	function handleSubmit(data: EditHabitFormData) {
		store.updateHabit(id, data);
		setLocation(`/${id}`);
	}

	return (
		<EditHabitForm
			defaultValues={{
				name: habit.name,
				goal: habit.goal,
				unit: habit.unit,
			}}
			onSubmit={handleSubmit}
		/>
	);
}
