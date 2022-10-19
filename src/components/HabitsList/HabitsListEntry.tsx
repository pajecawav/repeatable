import { useDisclosure } from "@/hooks/useDisclosure";
import { getDateKey } from "@/lib";
import { DateKey, Habit } from "@/types";
import { cn, formatValue } from "@/utils";
import { observer } from "mobx-react-lite";
import { Link } from "wouter";
import { CircularProgress } from "../CircularProgress";
import { UpdateHabitProgressModal } from "../UpdateHabitProgressModal";

function DateProgressLabel({ date, habit }: { date: DateKey; habit: Habit }) {
	const { isOpen, open, close } = useDisclosure(false);

	const value = habit.entries[date]?.value ?? 0;

	return (
		<>
			<button
				className={cn(
					"flex-1 overflow-hidden",
					value === 0 && "text-gray-400",
					value !== 0 && value < habit.goal && "text-gray-600"
				)}
				onClick={open}
			>
				<div>{formatValue(value)}</div>
				<div>{habit.unit}</div>
			</button>

			{isOpen && (
				<UpdateHabitProgressModal
					habitId={habit.id}
					value={value}
					unit={habit.unit}
					date={date}
					onClose={close}
				/>
			)}
		</>
	);
}

export const HabitListEntry = observer(({ habit }: { habit: Habit }) => {
	const now = new Date();

	const todayKey = getDateKey(now);
	const entryToday = habit.entries[todayKey];
	const progress = (entryToday?.value ?? 0) / habit.goal;

	const dateKeys: DateKey[] = Array.from({ length: 4 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i);
		return getDateKey(date);
	});

	return (
		<div className="shadow-sm flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-md bg-white text-sky-600">
			<CircularProgress
				className="text-xl flex-shrink-0"
				progress={progress}
			/>

			<Link
				className="truncate flex-shrink-1 flex-1"
				href={`/${habit.id}`}
			>
				{habit.name}
			</Link>

			<div className="flex-shrink-0 w-1/2 sm:w-2/5 flex text-center leading-tight font-medium">
				{dateKeys.map(dateKey => (
					<DateProgressLabel
						habit={habit}
						date={dateKey}
						key={dateKey}
					/>
				))}
			</div>
		</div>
	);
});
