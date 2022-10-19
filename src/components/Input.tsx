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
				"px-3 py-2 bg-white transition-colors duration-100 rounded-md font-sm outline-none border placeholder:text-neutral-400",
				className
			)}
			size={1}
			{...props}
			ref={ref}
		/>
	);
});
