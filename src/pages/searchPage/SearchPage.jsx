import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../service/Product"; // Import the getProducts function

export default function SearchPage() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const keyword = searchParams.get("keyword");
	const category = searchParams.get("category");

	const [filteredData, setFilteredData] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const products = await getProducts();
			setData(products);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (keyword) {
			setFilteredData(
				data.filter((item) =>
					item.title.toLowerCase().includes(keyword.toLowerCase())
				)
			);
		} else if (category) {
			setFilteredData(
				data.filter((item) =>
					item.category.toLowerCase().includes(category.toLowerCase())
				)
			);
		} else {
			setFilteredData(data);
		}
	}, [keyword, category, data]);

	const imgPath = "/default-image.jpg"; // Add a default image path

	return (
		<main className="max-w-screen-2xl mx-auto px-12">
			{/* Info searching */}
			<section>
				<h1 className="text-2xl font-medium text-black">
					{keyword
						? `Search results for "${keyword}"`
						: `Category: ${category}`}
				</h1>
				<nav className="flex gap-5 mt-7">
					<button className="btnActive">Dishes</button>
					<button className="btnSecondary">Restaurants</button>
				</nav>
			</section>
			{/* Dishes */}
			<section className="flex flex-wrap gap-5 mt-10">
				{filteredData.map((item, index) => (
					<article key={index} className="max-w-[450px] w-full">
						<Link
							to={"/DishesPage"}
							state={item}
							className="h-[150px] p-6 flex gap-5 justify-center items-center rounded-[10px] bg-[#F8F8F8] mb-4"
						>
							<figure className="w-32 h-32 flex-shrink-0">
								<img
									className="rounded-[10px] w-full h-full object-cover"
									src={item.image || imgPath}
									alt={item.title}
								/>
							</figure>
							<div className="flex flex-col gap-2.5 flex-grow">
								<h2 className="text-[#202020] text-xl font-medium capitalize line-clamp-1">
									{item.title}
								</h2>
								<div className="flex items-center justify-between">
									<p className="text-base font-medium text-[#808080] lowercase line-clamp-1">
										{item.description}
									</p>
									{item.rate && (
										<span className="text-[#202020] text-base font-medium flex items-center gap-1">
											<img
												src={
													item.rate >= 4
														? "/images/dishes-start-green.svg"
														: "/images/dishes-start.svg"
												}
												alt={`Rating: ${item.rate}`}
											/>
											{item.rate}
										</span>
									)}
								</div>
								<div className="flex items-center justify-between">
									<span className="text-[#202020] text-base font-medium flex items-center gap-2">
										<img src="/images/dishes-price.svg" alt="Price icon" />₹
										{item.price}
									</span>
									<span className="text-[#202020] text-base font-medium flex items-center gap-2">
										<img src="/images/dishes-time.svg" alt="Time icon" />
										{item.timeCook} Mins
									</span>
								</div>
							</div>
						</Link>
					</article>
				))}
			</section>
		</main>
	);
}
