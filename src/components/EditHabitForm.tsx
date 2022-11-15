import { Button } from "@/components/Button";
import { FormControl } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { HabitCreate } from "@/stores/habitsStore";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditHabitFormProps {
	onSubmit: (habit: EditHabitFormData) => void;
	defaultValues?: Partial<EditHabitFormData>;
}

export type EditHabitFormData = Omit<HabitCreate, "type">;

export function EditHabitForm({ onSubmit, defaultValues }: EditHabitFormProps) {
	const { t } = useTranslation();

	const form = useForm<EditHabitFormData>({
		shouldUseNativeValidation: true,
		defaultValues,
	});

	return (
		<form
			className="flex flex-col gap-2"
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<FormControl>
				<label htmlFor="name">{t("label.name")}</label>
				<Input
					className="w-full"
					id="name"
					placeholder={t("label.name-placeholder")}
					{...form.register("name", {
						required: true,
						minLength: 1,
					})}
				/>
			</FormControl>

			<div className="grid gap-x-2 grid-cols-2">
				<FormControl>
					<label htmlFor="goal">{t("label.goal")}</label>
					<Input
						className="w-full"
						id="goal"
						type="number"
						placeholder="20"
						{...form.register("goal", {
							required: true,
							min: 1,
							valueAsNumber: true,
						})}
					/>
				</FormControl>

				<FormControl>
					<label htmlFor="unit">{t("label.units")}</label>
					<Input
						className="w-full"
						id="unit"
						placeholder={t("label.units-placeholder")}
						autoCapitalize="off"
						{...form.register("unit", {
							required: true,
							minLength: 1,
						})}
					/>
				</FormControl>
			</div>

			<Button className="mx-auto shadow-sm">{t("label.save")}</Button>
		</form>
	);
}
