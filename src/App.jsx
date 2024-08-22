import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainHomePage from "./components/mainHomePage/MainHomePage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<HomePage />}>
					<Route path="/" element={<MainHomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
