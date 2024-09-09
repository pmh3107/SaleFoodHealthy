import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdminUser } from "../../../service/Authentication";

export default function HeaderAdmin() {
	const currentTime = new Date();
	const time = currentTime.toLocaleTimeString();
	const navigate = useNavigate();
	const handleLogout = (e) => {
		e.preventDefault();
		logoutAdminUser();
		navigate("/loginAdminPage");
	};

	return (
		<header className="w-1/6 h-screen bg-gradient-to-b from-orange-500 to-orange-700 shadow-lg">
			<article className="p-6">
				<h1 className="text-3xl font-bold text-white mb-4">Admin page</h1>
				<p className="text-white">{time}</p>
			</article>
			<nav className="w-full p-6">
				<ul className="text-white font-semibold text-xl flex flex-col gap-4">
					<li>
						<NavLink
							to={"/admin/home"}
							className={({ isActive }) =>
								"underline-offset-8 hover:underline transition duration-300 " +
								(isActive ? "underline" : "")
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/admin/product"}
							className={({ isActive }) =>
								"underline-offset-8 hover:underline transition duration-300 " +
								(isActive ? "underline" : "")
							}
						>
							Products
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/admin/user"}
							className={({ isActive }) =>
								"underline-offset-8 hover:underline transition duration-300 " +
								(isActive ? "underline" : "")
							}
						>
							User
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/admin/order"}
							className={({ isActive }) =>
								"underline-offset-8 hover:underline transition duration-300 " +
								(isActive ? "underline" : "")
							}
						>
							Order
						</NavLink>
					</li>
				</ul>
			</nav>
			<button
				onClick={handleLogout}
				className="mt-auto mx-6 mb-6 py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
			>
				Logout
			</button>
		</header>
	);
}
