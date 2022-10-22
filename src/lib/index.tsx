import { DateKey } from "@/types";
import { Dayjs, isDayjs } from "dayjs";

export function getDateKey(date: Date | number | Dayjs): DateKey {
	if (typeof date === "number") {
		date = new Date(date);
	} else if (isDayjs(date)) {
		date = date.toDate();
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${month}-${day}`;
}
