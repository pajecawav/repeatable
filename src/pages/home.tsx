import { Button } from "@/components/Button";
import { HabitsList } from "@/components/HabitsList";
import { getShortWeekDay } from "@/utils";
import { Link } from "wouter";

export function HomePage() {
	const recentDates: Date[] = Array.from({ length: 4 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i);
		return date;
	});

	return (
		<div>
			<div className="z-20 sticky top-12 flex items-end bg-neutral-100 pb-2 px-2 sm:px-4 dark:bg-neutral-900">
				<Button
					className="shadow-sm -ml-2 sm:-ml-4"
					as={Link}
					href="/new"
				>
					New
				</Button>

				<div className="ml-auto  w-1/2 sm:w-2/5 flex text-gray-500 text-center text-sm leading-tight font-medium dark:text-neutral-400">
					{recentDates.map(date => (
						<div className="flex-1" key={date.toISOString()}>
							<div>{getShortWeekDay(date)}</div>
							<div>{date.getDate()}</div>
						</div>
					))}
				</div>
			</div>

			<HabitsList />
		</div>
	);
}
