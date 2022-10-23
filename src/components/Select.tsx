import { cn } from "@/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {}

export function Select({ className, ...props }: SelectProps) {
	return (
		<div className="relative w-max">
			<select
				className={cn(
					"pl-4 pr-8 py-1 shadow-sm rounded-md bg-white appearance-none dark:bg-neutral-800",
					className
				)}
				{...props}
			/>
			<div className="absolute top-0 right-2 bottom-0 grid place-items-center">
				<ChevronDownIcon className="w-4" />
			</div>
		</div>
	);
}
