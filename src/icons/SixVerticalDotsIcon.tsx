import { ComponentProps } from "react";

export function SixVerticalDotsIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 256 256"
			{...props}
		>
			<circle cx="92" cy="60" r="12"></circle>
			<circle cx="164" cy="60" r="12"></circle>
			<circle cx="92" cy="128" r="12"></circle>
			<circle cx="164" cy="128" r="12"></circle>
			<circle cx="92" cy="196" r="12"></circle>
			<circle cx="164" cy="196" r="12"></circle>
		</svg>
	);
}
