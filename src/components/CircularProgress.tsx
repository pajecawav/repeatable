interface CircularProgressProps {
	progress: number;
	className?: string;
}

export function CircularProgress({
	progress,
	className,
}: CircularProgressProps) {
	progress = Math.max(0, Math.min(1, progress));

	return (
		<svg
			viewBox="0 0 10 10"
			className={className}
			width="1em"
			height="1em"
			stroke="currentColor"
			fill="none"
			strokeWidth="1.5"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				className="text-neutral-200 dark:text-neutral-600"
				cx="5"
				cy="5"
				r="4"
			/>
			<circle
				className="transition-[stroke-dasharray] duration-500"
				cx="5"
				cy="5"
				r="4"
				pathLength="100"
				strokeDasharray={`${100 * progress} ${100 * (1 - progress)}`}
				// offset for 90 degrees rotation
				strokeDashoffset="25"
			/>
		</svg>
	);
}
