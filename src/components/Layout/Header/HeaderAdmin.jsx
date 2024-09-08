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
		<header className="w-1/6 h-screen bg-orange-500">
			<article>
				<h1>Admin page</h1>
				<p>{time}</p>
			</article>
			<nav className="w-full p-6  ">
				<ul className="text-white font-semibold text-xl flex flex-col gap-4 justify-between">
					<li>
						<NavLink
							to={"/admin/home"}
							className={({ isActive }) =>
								"underline-offset-8 hover:underline " +
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
								"underline-offset-8 hover:underline " +
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
								"underline-offset-8 hover:underline " +
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
								"underline-offset-8 hover:underline " +
								(isActive ? "underline" : "")
							}
						>
							{" "}
							Order
						</NavLink>
					</li>
				</ul>
			</nav>
			<button onClick={handleLogout}>Logout</button>
		</header>
	);
}
