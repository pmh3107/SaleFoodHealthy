import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHomePage from "./pages/mainHomePage/MainHomePage";
import SearchPage from "./pages/searchPage/SearchPage";
import ClientPage from "./pages/ClientPage";
import DishesPage from "./pages/DishesPage/DishesPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientPage />}>
					<Route index element={<MainHomePage />} />
					<Route path="/SearchPage" element={<SearchPage />} />
					<Route path="/DetailDishes" element={<DishesPage />} />
					<Route path="/PaymentPage" element={<PaymentPage />} />
					<Route path="*" element={<h1>404</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
