export function cn(...values: (string | null | boolean | undefined)[]): string {
	return values.filter(Boolean).join(" ");
}

export function getShortWeekDay(date: Date): string {
	return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
}
