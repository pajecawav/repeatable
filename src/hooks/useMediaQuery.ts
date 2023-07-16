import { useEffect, useState } from "react";

const QUERIES = {
	xs: {
		min: 475,
		max: 639,
	},
	sm: {
		min: 640,
		max: 767,
	},
	md: {
		min: 768,
		max: 1023,
	},
	lg: {
		min: 1024,
		max: 1279,
	},
	xl: {
		min: 1280,
		max: Infinity,
	},
} as const;

type Size = keyof typeof QUERIES;

export const useMediaQuery = (size: Size, useMax = false) => {
	const { min, max } = QUERIES[size];

	const mediaQuery = useMax
		? `(max-width: ${max}px)`
		: `(min-width: ${min}px)`;

	const [matches, setMatches] = useState(
		() => window.matchMedia(mediaQuery).matches,
	);

	useEffect(() => {
		const query = window.matchMedia(mediaQuery);

		const updateMatch = () => setMatches(query.matches);

		updateMatch();

		query.addEventListener("change", updateMatch);

		return () => {
			query.removeEventListener("change", updateMatch);
		};
	}, [mediaQuery]);

	return matches;
};
