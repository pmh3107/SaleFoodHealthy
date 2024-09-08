import { useEffect, useState } from "react";
import DishedInfo from "../../components/Layout/Dishes/DishesInfo";
import DishesDetail from "../../components/Layout/Dishes/DishesDetail";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../service/Product";
import AllFoods from "../../components/Layout/FoodList/AllFoods";

export default function DishesPage() {
	const location = useLocation();
	const item = location.state;
	const [allDishes, setAllDishes] = useState([]);

	useEffect(() => {
		const fetchDishes = async () => {
			const dishes = await getProducts();
			setAllDishes(dishes);
		};
		item ? window.scrollTo({ top: 0, behavior: "smooth" }) : null;
		fetchDishes();
	}, [item]);

	return (
		<main className="w-screen overflow-hidden">
			<DishedInfo item={item} />
			<DishesDetail item={item} allDishes={allDishes} />
			<AllFoods products={allDishes} />
		</main>
	);
}
