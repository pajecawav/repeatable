import { ArrowLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

export function Header() {
	const { t } = useTranslation();
	const [location] = useLocation();

	const locationParts = location.split("/");
	const previousLocation = "/" + locationParts.slice(1, -1).join("/");

	return (
		<header className="z-20 h-12 sticky top-0 py-2 flex gap-2 items-center bg-neutral-100 dark:bg-neutral-900">
			{location !== "/" && (
				<Link href={previousLocation}>
					<a href={previousLocation} aria-label={t("label.go-back")}>
						<ArrowLeftIcon className="w-6" />
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
