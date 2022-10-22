import { cn } from "@/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, ...props },
	ref
) {
	return (
		<input
			className={cn(
				"px-3 py-2 rounded-md font-sm outline-none border",
				"bg-white placeholder:text-neutral-400 dark:bg-neutral-800 dark:border-neutral-800 dark:placeholder:text-neutral-600",
				className
			)}
			size={1}
			{...props}
			ref={ref}
		/>
	);
});
