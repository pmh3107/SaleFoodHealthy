import DishedInfo from "../../components/Layout/Dishes/DishesInfo";
import DishesDetail from "../../components/Layout/Dishes/DishesDetail";

import { useLocation } from "react-router-dom";
export default function DishesPage() {
	const location = useLocation();
	const item = location.state;
	return (
		<main className="w-screen overflow-hidden h-screen">
			<DishedInfo item={item} />
			<DishesDetail item={item} />
		</main>
	);
}
