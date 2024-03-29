import { useDisclosure } from "@/hooks/useDisclosure";
import { SixVerticalDotsIcon } from "@/icons/SixVerticalDotsIcon";
import { getDateKey } from "@/lib";
import { DateKey, Habit } from "@/types";
import { cn, formatValue } from "@/utils";
import { useSortable } from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
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
					value === 0 && "text-gray-400 dark:text-neutral-500",
					value !== 0 &&
						value < habit.goal &&
						"text-neutral-500 dark:text-neutral-300",
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

interface HabitsListEntryProps {
	habit: Habit;
	dates: Date[];
}

export const HabitsListEntry = observer(
	({ habit, dates }: HabitsListEntryProps) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
			isOver,
			isSorting,
		} = useSortable({ id: habit.id, attributes: { tabIndex: -1 } });

		const style: CSSProperties = {
			transform: transform ? `translateY(${transform.y}px)` : undefined,
			transition,
			pointerEvents: isDragging ? "none" : undefined,
		};

		const now = new Date();

		const todayKey = getDateKey(now);
		const entryToday = habit.entries[todayKey];
		const progress = (entryToday?.value ?? 0) / habit.goal;

		const dateKeys: DateKey[] = dates.map(getDateKey);

		return (
			<div
				className="group relative cursor-auto touch-none shadow-sm flex items-center gap-2 px-2 sm:px-4 py-2 rounded-md bg-white text-sky-600 dark:bg-neutral-800 dark:text-blue-400"
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				{(!isSorting || isDragging) && (
					<SixVerticalDotsIcon
						className={cn(
							"absolute left-0 -translate-x-full w-6 h-6 opacity-0 hidden sm:block",
							"text-gray-400 dark:text-neutral-500 cursor-grab outline-none transition-opacity duration-200 group-hover:duration-75",
							!isOver && !isDragging && "group-hover:opacity-100",
						)}
					/>
				)}

				<CircularProgress
					className="text-xl flex-shrink-0"
					progress={progress}
				/>

				<Link
					className="truncate flex-shrink-1 flex-1"
					href={`/${habit.id}`}
					style={{ WebkitTapHighlightColor: "transparent" }}
					data-testid="habit-name"
				>
					{habit.name}
				</Link>

				<div className="flex-shrink-0 w-1/2 sm:w-[45%] flex text-center leading-tight">
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
	},
);
