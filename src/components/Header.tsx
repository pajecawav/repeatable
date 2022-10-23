import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "wouter";

export function Header() {
	return (
		<header className="z-20 h-12 sticky top-0 py-2 flex gap-2 justify-between items-center bg-neutral-100 dark:bg-neutral-900">
			<Link href="/" className="text-2xl">
				Habits
			</Link>

			<Link href="/settings">
				<a href="/settings">
					<Cog6ToothIcon className="w-6" />
				</a>
			</Link>
		</header>
	);
}
