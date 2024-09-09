import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../service/Product";
import { getCategory } from "../../service/Category"; // Import the getCategory function

export default function SearchPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const keyword = searchParams.get("keyword");
	const category = searchParams.get("category");

	const [filteredData, setFilteredData] = useState([]);
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [searchInput, setSearchInput] = useState(keyword || "");

	useEffect(() => {
		const fetchData = async () => {
			const products = await getProducts();
			setData(products);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const categoryList = await getCategory();
			setCategories(categoryList);
		};
		fetchCategories();
		window.scrollTo(0, 0);
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

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/searchPage?keyword=${searchInput}`);
	};

	const imgPath = "/default-image.jpg";

	return (
		<main className="max-w-screen-2xl mx-auto px-12 min-h-screen">
			{/* Search Input */}
			<section className="my-8 mx-40 lg:mx-60">
				<form onSubmit={handleSearch} className="flex gap-5">
					<input
						type="text"
						name="search"
						placeholder="Enter item or restaurant you are looking for"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						className="text-sm placeholder-[rgba(0, 0, 0, 0.50)] text-black bg-transparent border-[1px] border-black w-full px-6 rounded-[10px] focus:outline-none"
					/>
					<button
						type="submit"
						className="bg-black text-white px-6 py-3 rounded-[10px] w-[200px] text-sm font-medium"
					>
						Search Now
					</button>
				</form>
			</section>
			{/* Categories */}
			<section className="my-8 mx-auto">
				<div className="flex gap-1 flex-wrap justify-center">
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => navigate(`/searchPage?category=${cat.name}`)}
							className=" text-black decoration-underline underline-offset-4 px-6 py-2  text-sm font-normal"
						>
							{cat.name}
						</button>
					))}
				</div>
			</section>
			{/* Info searching */}
			<section>
				<h1 className="text-2xl font-medium text-black">
					{keyword
						? `Search results for "${keyword}"`
						: `Category: ${category}`}
				</h1>
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
