import { cn } from "@/utils";
import { Switch } from "@headlessui/react";

type ToggleProps = Parameters<typeof Switch>[0] & {
	srText?: string;
};

export function Toggle({ className, checked, srText, ...props }: ToggleProps) {
	return (
		<Switch
			className={cn(
				"shadow-sm relative inline-flex h-6 w-11 items-center rounded-full dark:border-transparent",
				checked
					? "bg-blue-500 dark:bg-blue-500"
					: "bg-white dark:bg-neutral-800",
				className
			)}
			checked={checked}
			{...props}
		>
			{srText && <span className="sr-only">{srText}</span>}
			<span
				className={cn(
					checked
						? "translate-x-6 bg-white"
						: "translate-x-1 bg-neutral-600",
					"inline-block h-4 w-4 transform transition-transform rounded-full dark:bg-current"
				)}
			/>
		</Switch>
	);
}
