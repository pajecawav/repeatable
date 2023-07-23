import { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../utils";

const variantClassNames = {
	neutral: "bg-white dark:bg-neutral-800",
	neutral2: "bg-neutral-100 dark:bg-neutral-700",
	danger: "bg-red-200 dark:bg-red-900",
	accent: "bg-sky-100 dark:bg-sky-700",
};

type Variant = keyof typeof variantClassNames;

interface ButtonProps<As extends ElementType> {
	as?: As;
	variant?: Variant;
}

export function Button<As extends ElementType = "button">({
	className,
	as,
	variant = "neutral",
	...props
}: ButtonProps<As> & ComponentPropsWithoutRef<As>) {
	const Component = as ?? "button";

	return (
		<Component
			className={cn(
				"shadow-sm min-w-[4rem] text-center px-3 py-1 rounded-md",
				variantClassNames[variant],
				className,
			)}
			{...props}
		/>
	);
}
