import { DateKey } from "@/types";

export function getDateKey(date: Date | number): DateKey {
	if (typeof date === "number") {
		date = new Date(date);
	}

	return date.toISOString().split("T")[0];
}
