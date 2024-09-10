import Hero from "../../components/Layout/Hero/Hero";
import FoodList from "../../components/Layout/FoodList/FoodList";
import SearchByRestaurant from "../../components/common/SearchByRestaurant";
import Category from "../../components/Layout/Category/Category";
import AllFoods from "../../components/Layout/FoodList/AllFoods";
import Loading from "../../components/common/Loading";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/Product";
import Chatbox from "../../components/Layout/ChatBox/ChatBox";

export default function MainHomePage() {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	if (products === null) {
		return <Loading />;
	}
	return (
		<main className="relative w-screen overflow-hidden">
			<div className=" max-w-screen-2xl mx-auto px-12">
				{/* Hero */}
				<Hero />
				{/* Dishes */}
				<FoodList products={products} />
			</div>
			<SearchByRestaurant />
			<Category />
			<AllFoods products={products} />
			<Chatbox /> {/* Thêm Chatbox ở đây */}
		</main>
	);
}
