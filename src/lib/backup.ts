import { Habit } from "@/types";
import dayjs from "dayjs";

export interface DataBackup {
	habits: Habit[];
}

export function exportData(data: DataBackup) {
	const date = dayjs().format("YYYY-MM-DD_HH-mm-ss");
	saveToFile(JSON.stringify(data, undefined, 4), `habits-${date}.json`);
}

export async function importData(file: File): Promise<DataBackup> {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			const data = JSON.parse(result) as DataBackup;
			// TODO: validate data
			resolve(data);
		};
		reader.readAsText(file);
	});
}

export function saveToFile(text: string, filename: string) {
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });

	const a = document.createElement("a");
	const url = URL.createObjectURL(blob);
	a.href = url;
	a.download = filename;

	document.body.appendChild(a);

	a.click();

	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}
