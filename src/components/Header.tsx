import { Link } from "wouter";

import {
	createContext,
	forwardRef,
	Key,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import ReactDOM from "react-dom";

type HeaderContextValue = [
	HTMLElement | null,
	(ref: HTMLElement | null) => void
];

export const HeaderContext = createContext<HeaderContextValue | null>(null);

export function useHeaderContext() {
	const context = useContext(HeaderContext);

	if (!context) {
		throw new Error("Missing HeaderProvider");
	}

	return context;
}

export const HeaderProvider = (props: {
	children?: ReactNode;
	key?: Key | null | undefined;
}) => {
	const headerState = useState(null);
	return (
		<HeaderContext.Provider
			value={headerState as HeaderContextValue}
			{...props}
		/>
	);
};

interface HeaderPortalProps {
	children: ReactNode;
}

export const HeaderPortal = forwardRef<HTMLElement, HeaderPortalProps>(
	function HeaderPortal({ children }, ref) {
		const [header] = useHeaderContext();

		useEffect(() => {
			if (typeof ref === "function") {
				ref(header);
				return () => ref(null);
			} else if (ref) {
				ref.current = header;
				return () => (ref.current = null);
			}
		}, [header, ref]);

		return header ? ReactDOM.createPortal(children, header) : null;
	}
);

export function Header() {
	const [, setHeader] = useHeaderContext();

	return (
		<header
			className="h-12 sticky top-0 py-2 flex items-center bg-neutral-100"
			ref={setHeader}
		>
			<Link href="/" className="text-2xl">
				Habits
			</Link>
		</header>
	);
}
