import { useCallback, useState } from "react";

export function useRecentDates() {
	const [offset, setOffset] = useState(0);

	const shiftEarlier = useCallback(() => setOffset(offset => offset - 1), []);

	const shiftLater = useCallback(
		() => setOffset(offset => Math.min(0, offset + 1)),
		[],
	);

	const recentDates = Array.from({ length: 4 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i + offset);
		return date;
	});

	return {
		recentDates,
		offset,
		shiftEarlier,
		shiftLater,
	};
}
