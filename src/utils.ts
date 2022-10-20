export function cn(...values: (string | null | boolean | undefined)[]): string {
	return values.filter(Boolean).join(" ");
}

export function getShortWeekDay(date: Date): string {
	return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
}

export function formatValue(value: number): string {
	return new Intl.NumberFormat("en-US", { notation: "compact" }).format(
		value
	);
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
		date
	);
}
