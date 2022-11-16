import { EditHabitForm, EditHabitFormData } from "@/components/EditHabitForm";
import { store } from "@/stores/habitsStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

export function NewHabitPage() {
	const { t } = useTranslation();
	const [, setLocation] = useLocation();

	function handleSubmit(data: EditHabitFormData) {
		store.addHabit({ ...data, type: "numeric" });
		setLocation("/", { replace: true });
		toast(t("message.habit-created"));
	}

	return <EditHabitForm onSubmit={handleSubmit} />;
}
