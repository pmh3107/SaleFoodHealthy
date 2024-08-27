import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHomePage from "./pages/mainHomePage/MainHomePage";
import SearchPage from "./pages/searchPage/SearchPage";
import ClientPage from "./pages/ClientPage";
import DishesPage from "./pages/dishesPage/DishesPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import LoginPage from "./pages/loginPage/LoginPage";
export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientPage />}>
					<Route index element={<MainHomePage />} />
					<Route path="/SearchPage" element={<SearchPage />} />
					<Route path="/DishesPage" element={<DishesPage />} />
					<Route path="/PaymentPage" element={<PaymentPage />} />
					<Route path="*" element={<h1>404</h1>} />
				</Route>
				<Route path="/LoginPage" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}
