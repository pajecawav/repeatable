import { ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link, useRoute } from "wouter";

export function Header() {
	const { t } = useTranslation();
	const [isHomePage] = useRoute("/");

	return (
		<header className="z-20 h-12 sticky top-0 py-2 flex gap-2 items-center bg-neutral-100 dark:bg-neutral-900">
			{!isHomePage && (
				<Link href="/">
					<a href="/" aria-label={t("label.go-home")}>
						<ChartBarIcon className="h-6" />
					</a>
				</Link>
			)}
			<Link href="/settings">
				<a
					className="ml-auto"
					href="/settings"
					aria-label={t("label.go-settings")}
				>
					<Cog6ToothIcon className="w-6" />
				</a>
			</Link>
		</header>
	);
}
