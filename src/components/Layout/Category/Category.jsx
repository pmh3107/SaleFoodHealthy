function Category() {
	const foodList = [
		{
			id: 1,
			title: "Burger",
			image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
		},
		{
			id: 2,
			title: "Pizza",
			image:
				"https://images.unsplash.com/photo-1483918793747-5adbf82956c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
		},
		{
			id: 3,
			title: "Pasta",
			image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a",
		},
		{
			id: 4,
			title: "Salad",
			image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
		},
		{
			id: 5,
			title: "Sandwich",
			image:
				"https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
		},
		{
			id: 6,
			title: "Cake",
			image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
		},
	];
	return (
		<div className="max-w-screen-2xl mx-auto px-12 ">
			<h2 className="text-[#202020] text-2xl font-medium mb-7">
				What’s on your mind?
			</h2>
			{/* Categories */}
			<ul className="flex justify-between items-center">
				{foodList.map((item) => (
					<li key={item.id} className="p-6 ">
						<a
							href="!#"
							className="flex flex-col items-center gap-6 justify-center"
						>
							<img
								className="w-40 h-40 rounded-full object-cover"
								src={item.image}
								alt=""
							/>
							<span
								className="block w-full
							text-black text-center text-base font-medium"
							>
								{item.title}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
export default Category;
