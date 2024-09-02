import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Layout/Header/HeaderAdmin";

export default function AdminPage() {
	return (
		<div className="flex">
			<HeaderAdmin />
			<Outlet />
			<footer></footer>
		</div>
	);
}
