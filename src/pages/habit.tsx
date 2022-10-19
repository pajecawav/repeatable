import { Button } from "@/components/Button";
import { store } from "@/store";
import { Link, Redirect, useLocation } from "wouter";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { HabitProgressChart } from "@/components/HabitProgressChart";

interface HaibtPageProps {
	params: {
		id: string;
	};
}

export function HabitPage({ params: { id: idProp } }: HaibtPageProps) {
	const [, setLocation] = useLocation();

	const id = +idProp;

	const habit = store.habits.find(habit => habit.id === id);

	if (!habit) {
		return <Redirect href="/" />;
	}

	function handleDelete() {
		if (confirm("Are you sure you want to delete this habit?")) {
			store.deleteHabit(id);
			setLocation("/", { replace: true });
		}
	}

	return (
		<div className="space-y-2">
			<div className="flex items-center space-x-2">
				<h2 className="flex-1 text-3xl text-neutral-800">
					{habit.name}
				</h2>

				<Button as={Link} href={`/${id}/edit`}>
					Edit
				</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</div>

			<div className="text-neutral-500">
				<ArrowUpCircleIcon className="inline-block w-5 h-5" />{" "}
				<span className="align-middle">
					{habit.goal} {habit.unit}
				</span>
			</div>

			<HabitProgressChart habit={habit} />
		</div>
	);
}
