import { observer } from "mobx-react-lite";
import { Route, Switch } from "wouter";
import { Header, HeaderProvider } from "./components/Header";
import { EditHabitPage } from "./pages/edit";
import { HabitPage } from "./pages/habit";
import { HomePage } from "./pages/home";
import { NewHabitPage } from "./pages/new";

export const App = observer(() => {
	return (
		<div className="max-w-xl w-full mx-auto px-1 pb-2">
			<HeaderProvider>
				<Header />

				<Switch>
					<Route path="/" component={HomePage} />
					<Route path="/new" component={NewHabitPage} />
					<Route path="/:id" component={HabitPage} />
					<Route path="/:id/edit" component={EditHabitPage} />
				</Switch>
			</HeaderProvider>
		</div>
	);
});
