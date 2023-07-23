import { Button } from "@/components/Button";
import { HabitBestStreaksChart } from "@/components/HabitBestStreaksChart";
import { HabitHistoryCalendar } from "@/components/HabitHistoryCalendar";
import { HabitProgressChart } from "@/components/HabitProgressChart";
import { store } from "@/stores/habitsStore";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, Redirect, useLocation } from "wouter";

interface HaibtPageProps {
	params: {
		id: string;
	};
}

export function HabitPage({ params: { id: idProp } }: HaibtPageProps) {
	const { t } = useTranslation();
	const [, setLocation] = useLocation();

	const id = +idProp;

	const habit = store.habits.find(habit => habit.id === id);

	if (!habit) {
		return <Redirect href="/" />;
	}

	function handleDelete() {
		if (confirm(t("message.confirm-delete"))) {
			store.deleteHabit(id);
			setLocation("/", { replace: true });
			toast(t("message.habit-deleted"));
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<h2 className="flex-1 text-3xl">{habit.name}</h2>

				<Button as={Link} href={`/${id}/edit`}>
					{t("label.edit")}
				</Button>
				<Button variant="danger" onClick={handleDelete}>
					{t("label.delete")}
				</Button>
			</div>

			<div className="text-neutral-500 dark:text-neutral-400">
				<ArrowUpCircleIcon className="inline-block w-5 h-5" />{" "}
				<span className="align-middle">
					{habit.goal} {habit.unit}
				</span>
			</div>

			<HabitProgressChart habit={habit} />

			<HabitHistoryCalendar habit={habit} />

			<HabitBestStreaksChart habit={habit} />
		</div>
	);
}
