import Hero from "../../components/Layout/Hero/Hero";
import FoodList from "../../components/Layout/FoodList/FoodList";
import SearchByRestaurant from "../../components/common/SearchByRestaurant";
import Category from "../../components/Layout/Category/Category";
import RecomendFoods from "../../components/Layout/FoodList/RecomendFood";

export default function MainHomePage() {
	return (
		<main className="relative w-screen overflow-hidden">
			<div className=" max-w-screen-2xl mx-auto px-12">
				{/* Hero */}
				<Hero />
				{/* Dishes */}
				<FoodList />
			</div>
			{/* Search */}
			<SearchByRestaurant />
			{/* Categories */}
			<Category />
			{/* Recommendations */}
			<RecomendFoods />
		</main>
	);
}
