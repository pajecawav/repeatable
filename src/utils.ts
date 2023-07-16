import dayjs from "dayjs";
import i18n from "./i18n";

export function cn(
	...values: (string | boolean | number | null | undefined)[]
): string {
	return values.filter(Boolean).join(" ");
}

export function getShortWeekDay(date: Date): string {
	return new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(
		date,
	);
}

export function formatValue(value: number): string {
	return new Intl.NumberFormat(i18n.language, { notation: "compact" }).format(
		value,
	);
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat(i18n.language, {
		dateStyle: "medium",
	}).format(date);
}

export function formatMonthLabel(date: Date, withYear: boolean): string {
	const options: Intl.DateTimeFormatOptions = { month: "short" };

	if (withYear) {
		options.year = "numeric";
	}

	return new Intl.DateTimeFormat(i18n.language, options).format(date);
}

export function getWeekDays(): string[] {
	const intl = new Intl.DateTimeFormat(i18n.language, { weekday: "short" });

	const weekDays = [];

	const date = dayjs().startOf("week");
	for (let i = 0; i < 7; i++) {
		const weekDay = intl.format(date.add(i, "days").toDate());
		weekDays.push(weekDay);
	}

	return weekDays;
}
