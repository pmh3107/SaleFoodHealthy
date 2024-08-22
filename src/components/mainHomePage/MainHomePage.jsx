import Hero from "../Layout/Hero/Hero";
import FoodCard from "../common/FoodCard";
export default function MainHomePage() {
	return (
		<main className="relative w-screen overflow-hidden">
			<div className=" max-w-screen-2xl mx-auto px-12 ">
				{/* Hero */}
				<Hero />
				{/* Dishes */}
				<FoodCard
					image="https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					title="Pander Taka Rice Bowl"
					description="The Good Bowl"
					price={200}
					time={20}
					number={4.5}
				/>
			</div>
		</main>
	);
}
