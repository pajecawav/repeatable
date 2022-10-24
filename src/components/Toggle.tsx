import { cn } from "@/utils";
import { Switch } from "@headlessui/react";

type ToggleProps = Parameters<typeof Switch>[0] & {
	srText?: string;
};

export function Toggle({ className, checked, srText, ...props }: ToggleProps) {
	return (
		<Switch
			className={cn(
				"shadow-sm relative inline-flex h-6 w-11 items-center rounded-full border dark:border-transparent",
				checked
					? "bg-blue-200 dark:bg-blue-500"
					: "bg-white dark:bg-neutral-800",
				className
			)}
			checked={checked}
			{...props}
		>
			<span className="sr-only">{srText}</span>
			<span
				className={cn(
					checked ? "translate-x-6" : "translate-x-1",
					"inline-block h-4 w-4 transform transition-transform rounded-full bg-neutral-500 dark:bg-current"
				)}
			/>
		</Switch>
	);
}
