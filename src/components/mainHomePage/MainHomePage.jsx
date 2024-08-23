import FoodList from "../Layout/FoodList/FoodList";
import Hero from "../Layout/Hero/Hero";

import SearchByRestaurant from "../common/SearchByRestaurant";

export default function MainHomePage() {
	return (
		<main className="relative w-screen overflow-hidden">
			<div className=" max-w-screen-2xl mx-auto px-12 ">
				{/* Hero */}
				<Hero />
				{/* Dishes */}
				<FoodList />
			</div>
			{/* Search */}
			<SearchByRestaurant />
		</main>
	);
}
