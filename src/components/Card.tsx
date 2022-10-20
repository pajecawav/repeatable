import { ElementType, ReactNode } from "react";

interface CardProps {
	children: ReactNode;
}

function CardTitle({
	as: Component = "h3",
	children,
}: {
	as?: ElementType;
	children: ReactNode;
}) {
	return (
		<Component className="mb-2 text-sky-600 dark:text-blue-400">
			{children}
		</Component>
	);
}

export function Card({ children }: CardProps) {
	return (
		<div className="shadow-sm p-2 sm:p-4 rounded-md bg-white text-lg dark:bg-neutral-800">
			{children}
		</div>
	);
}

Card.Title = CardTitle;
