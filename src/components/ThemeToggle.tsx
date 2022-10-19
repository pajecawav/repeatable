import { themeStore } from "@/stores/themeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";

export const ThemeToggle = observer(() => {
	const Icon = themeStore.theme === "light" ? MoonIcon : SunIcon;

	return (
		<button
			onClick={() => themeStore.toggleTheme()}
			aria-label="Toggle theme"
		>
			<Icon className="w-6" />
		</button>
	);
});
