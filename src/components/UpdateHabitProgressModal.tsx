import { Modal } from "@/Modal";
import { store } from "@/stores/habitsStore";
import { DateKey } from "@/types";
import { FormEvent } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface UpdateHabitProgressModalProps {
	habitId: number;
	value: number;
	unit: string;
	date: DateKey;
	onClose?: () => void;
}

export function UpdateHabitProgressModal({
	habitId,
	value,
	unit,
	date,
	onClose,
}: UpdateHabitProgressModalProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const input = event.currentTarget.value as HTMLInputElement;
		const value = input.valueAsNumber || 0;

		store.updateHabitEntry(habitId, date, value);
		onClose?.();
	}

	return (
		<Modal title="Update value" onClose={onClose}>
			<form
				className="w-48 flex flex-col items-center gap-2"
				onSubmit={handleSubmit}
			>
				<div>
					<Input
						className="w-24 mr-3"
						type="number"
						name="value"
						min={0}
						step="0.01"
						size={4}
						defaultValue={value || undefined}
						// TODO: this is triggered after clicking inside the modal
						ref={elem => elem?.select()}
					/>
					<span>{unit}</span>
				</div>

				<Button className="ml-auto border border-neutral-200 dark:border-none">
					Save
				</Button>
			</form>
		</Modal>
	);
}
