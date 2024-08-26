import DishedInfo from "../../components/Layout/Dishes/DishesInfo";
import DishesDetail from "../../components/Layout/Dishes/DishesDetail";

export default function DishesPage() {
	return (
		<main className="w-screen overflow-hidden h-screen">
			<DishedInfo />
			<DishesDetail />
		</main>
	);
}
