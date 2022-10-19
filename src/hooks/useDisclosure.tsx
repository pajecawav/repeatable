import { useCallback, useState } from "react";

export function useDisclosure(initialValue: boolean) {
	const [isOpen, setIsOpen] = useState(initialValue);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return { isOpen, open, close };
}
