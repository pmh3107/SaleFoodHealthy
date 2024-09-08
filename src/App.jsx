import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ClientPage from "./pages/ClientPage";
import Loading from "./components/common/Loading";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./pages/ErrorPage/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./service/ProtectedRoute";
const MainHomePage = lazy(() => import("./pages/mainHomePage/MainHomePage"));
const SearchPage = lazy(() => import("./pages/searchPage/SearchPage"));
const DishesPage = lazy(() => import("./pages/dishesPage/DishesPage"));
const OrderSummaryPage = lazy(() =>
	import("./pages/orderSummaryPage/OrderSummaryPage")
);
const PaymentPage = lazy(() => import("./pages/paymentPage/PaymentPage"));
const UserPage = lazy(() => import("./pages/userPage/UserPage"));
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"));
const Login = lazy(() => import("./components/Layout/LogInSignUp/LogIn"));
const SignUp = lazy(() => import("./components/Layout/LogInSignUp/SignUp"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const MainHomeAdminPage = lazy(() =>
	import("./pages/mainHomeAdminPage/MainHomeAdminPage")
);
const LoginAdminPage = lazy(() => import("./pages/loginPage/LoginAdminPage"));
const AdminProduct = lazy(() =>
	import("./pages/adminProductPage/AdminProduct")
);
const AdminUser = lazy(() => import("./pages/adminUserPage/AdminUser"));
const AdminOrder = lazy(() => import("./pages/adminOrderPage/AdminOrder"));

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/" element={<ClientPage />}>
								<Route index element={<MainHomePage />} />
								<Route path="searchPage" element={<SearchPage />} />
								<Route path="dishesPage" element={<DishesPage />} />
								<Route path="paymentPage" element={<PaymentPage />} />
								<Route path="OrderSummaryPage" element={<OrderSummaryPage />} />
								<Route path="userPage" element={<UserPage />} />
								<Route path="*" element={<ErrorPage />} />
							</Route>
							<Route path="loginPage" element={<LoginPage />}>
								<Route index element={<Login />} />
								<Route path="signUp" element={<SignUp />} />
							</Route>
							<Route path="loginAdminPage" element={<LoginAdminPage />} />
							<Route
								path="/admin"
								element={
									<ProtectedRoute>
										<AdminPage />
									</ProtectedRoute>
								}
							>
								<Route path="/admin/home" element={<MainHomeAdminPage />} />
								<Route path="/admin/product" element={<AdminProduct />} />
								<Route path="/admin/user" element={<AdminUser />} />
								<Route path="/admin/order" element={<AdminOrder />} />
								<Route path="*" element={<ErrorPage />} />
							</Route>
						</Routes>
					</Suspense>
				</ErrorBoundary>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
