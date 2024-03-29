import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Route, Switch } from "wouter";
import { Header } from "./components/Header";
import { useSWRegistration } from "./hooks/useSWRegistration";
import { EditHabitPage } from "./pages/edit";
import { HabitPage } from "./pages/habit";
import { HomePage } from "./pages/home";
import { NewHabitPage } from "./pages/new";
import { SettingsPage } from "./pages/settings";

import "./i18n";

export const App = observer(() => {
	useSWRegistration();

	return (
		<div className="max-w-xl w-full mx-auto px-2 pb-2">
			<Toaster
				position="bottom-center"
				toastOptions={{
					blank: {
						className: "dark:text-inherit dark:bg-neutral-800",
					},
				}}
			/>

			<Header />

			<Switch>
				<Route path="/" component={HomePage} />
				<Route path="/new" component={NewHabitPage} />
				<Route path="/settings" component={SettingsPage} />
				<Route path="/:id" component={HabitPage} />
				<Route path="/:id/edit" component={EditHabitPage} />
			</Switch>
		</div>
	);
});
