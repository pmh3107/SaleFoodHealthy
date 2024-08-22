import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";

export default function HomePage() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
