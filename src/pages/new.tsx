import { EditHabitForm, EditHabitFormData } from "@/components/EditHabitForm";
import { store } from "@/store";
import { useLocation } from "wouter";

export function NewHabitPage() {
	const [, setLocation] = useLocation();

	function handleSubmit(data: EditHabitFormData) {
		store.addHabit({ ...data, type: "numeric" });
		setLocation("/", { replace: true });
	}

	return <EditHabitForm onSubmit={handleSubmit} />;
}
