import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../../service/Category";

function Category() {
	const [categoryList, setCategoryList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getCategory();
				setCategoryList(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-[#202020] text-2xl font-medium mb-7 text-center sm:text-left">
				What’s on your mind?
			</h2>
			{/* Categories */}
			<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{categoryList.map((item) => (
					<li key={item.id} className="p-4">
						<button
							onClick={() => navigate(`/searchPage?category=${item.name}`)}
							className="flex flex-col items-center gap-4 justify-center"
						>
							<img
								className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover"
								src={item.imgPath}
								alt={item.name}
							/>
							<span className="block w-full text-black text-center text-sm sm:text-base font-medium">
								{item.name}
							</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
export default Category;
