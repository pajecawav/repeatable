import { EditHabitForm, EditHabitFormData } from "@/components/EditHabitForm";
import { store } from "@/stores/habitsStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "wouter";

interface EditHaibtPageProps {
	params: {
		id: string;
	};
}

export function EditHabitPage({ params: { id: idProp } }: EditHaibtPageProps) {
	const { t } = useTranslation();
	const [, setLocation] = useLocation();

	const id = +idProp;

	const habit = store.habits.find(habit => habit.id === id);

	if (!habit) {
		return <Redirect href="/" />;
	}

	function handleSubmit(data: EditHabitFormData) {
		store.updateHabit(id, data);
		setLocation(`/${id}`);
		toast(t("message.habit-updated"));
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
