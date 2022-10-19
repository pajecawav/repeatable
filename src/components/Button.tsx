import { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../utils";

interface ButtonProps<As extends ElementType> {
	as?: As;
}

export function Button<As extends ElementType = "button">({
	className,
	as,
	...props
}: ButtonProps<As> & ComponentPropsWithoutRef<As>) {
	const Component = as ?? "button";

	return (
		<Component
			className={cn(
				"min-w-[4rem] bg-white text-black text-center px-3 py-1.5 rounded-md transition-colors",
				className
			)}
			{...props}
		/>
	);
}
