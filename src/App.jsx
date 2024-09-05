import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHomePage from "./pages/mainHomePage/MainHomePage";
import SearchPage from "./pages/searchPage/SearchPage";
import ClientPage from "./pages/ClientPage";
import DishesPage from "./pages/dishesPage/DishesPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import LoginPage from "./pages/loginPage/LoginPage";
import AdminPage from "./pages/AdminPage";
import MainHomeAdminPage from "./pages/mainHomeAdminPage/MainHomeAdminPage";
import AdminProduct from "./pages/adminProductPage/AdminProduct";
import AdminUser from "./pages/adminUserPage/AdminUser";
import AdminOrder from "./pages/adminOrderPage/AdminOrder";
import Login from "./components/Layout/LogInSignUp/LogIn";
import SignUp from "./components/Layout/LogInSignUp/SignUp";
import UserPage from "./pages/userPage/UserPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ClientPage />}>
						<Route index element={<MainHomePage />} />
						<Route path="/SearchPage" element={<SearchPage />} />
						<Route path="/DishesPage" element={<DishesPage />} />
						<Route path="/PaymentPage" element={<PaymentPage />} />
						<Route path="/UserPage" element={<UserPage />} />
						<Route path="*" element={<h1>404</h1>} />
					</Route>
					<Route path="/LoginPage" element={<LoginPage />}>
						<Route index element={<Login />} />
						<Route path="SignUp" element={<SignUp />} />
					</Route>
					<Route path="/admin/" element={<AdminPage />}>
						<Route path="/admin/home" element={<MainHomeAdminPage />} />
						<Route path="/admin/product" element={<AdminProduct />} />
						<Route path="/admin/user" element={<AdminUser />} />
						<Route path="/admin/order" element={<AdminOrder />} />
						<Route path="*" element={<h1>404</h1>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
