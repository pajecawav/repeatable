import { DateKey } from "@/types";

export function getDateKey(date: Date | number): DateKey {
	if (typeof date === "number") {
		date = new Date(date);
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${month}-${day}`;
}
