export function useRecentDates() {
	return Array.from({ length: 4 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i);
		return date;
	});
}
