import { RefObject, useEffect, useRef } from "react";

interface UseSwipeOptions {
	threshold: number;
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
}

export function useHorizontalSwipe(
	ref: RefObject<HTMLElement | SVGSVGElement>,
	options: UseSwipeOptions,
) {
	const optionsRef = useRef(options);

	useEffect(() => {
		optionsRef.current = options;
	}, [options]);

	useEffect(() => {
		let touchId: number | null = null;
		let prevX = 0;
		let lengthX = 0;

		function handleStart(event: TouchEvent) {
			lengthX = 0;

			const touch = event.changedTouches[0];
			touchId = touch.identifier;
			prevX = touch.clientX;
		}

		function handleMove(event: TouchEvent) {
			const touch = [...event.changedTouches].find(
				t => t.identifier === touchId,
			);
			if (!touch) {
				return;
			}

			const x = touch.clientX;
			const delta = x - prevX;
			lengthX += delta;

			const threshold = optionsRef.current.threshold;
			if (Math.abs(lengthX) >= threshold) {
				if (lengthX >= threshold) {
					optionsRef.current.onSwipeLeft?.();
				} else {
					optionsRef.current.onSwipeRight?.();
				}
				lengthX = 0;
			}

			prevX = x;
		}

		const node = ref.current;

		node?.addEventListener("touchstart", handleStart as EventListener);
		node?.addEventListener("touchmove", handleMove as EventListener);

		return () => {
			node?.removeEventListener(
				"touchstart",
				handleStart as EventListener,
			);
			node?.removeEventListener("touchmove", handleMove as EventListener);
		};
	}, [ref]);
}
