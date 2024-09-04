import { useEffect, useState } from "react";
import { getCategory } from "../../../service/Category";
function Category() {
	const [categoryList, setCategoryList] = useState([]);
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
		<div className="max-w-screen-2xl mx-auto px-12 ">
			<h2 className="text-[#202020] text-2xl font-medium mb-7">
				What’s on your mind?
			</h2>
			{/* Categories */}
			<ul className="flex justify-between items-center">
				{categoryList.map((item) => (
					<li key={item.id} className="p-6 ">
						<button
							href="!#"
							className="flex flex-col items-center gap-6 justify-center"
						>
							<img
								className="w-40 h-40 rounded-full object-cover"
								src={item.imgPath}
								alt={item.name}
							/>
							<span className="block w-full text-black text-center text-base font-medium">
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
