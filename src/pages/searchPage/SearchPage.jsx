import { Link } from "react-router-dom";

export default function SearchPage() {
	const data = [
		{
			image:
				"https://plus.unsplash.com/premium_photo-1675798983878-604c09f6d154?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2QlMjBoZWFsdGh5fGVufDB8fDB8fHww",
			title: "Baked Pizza Wrap - Vegetarian",
			description: "faasos - wraps & rolls",
			price: 209,
			time: 35,
			number: 3,
		},
		{
			image:
				"https://images.unsplash.com/photo-1449831438585-6f419654d73e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2QlMjBoZWFsdGh5fGVufDB8fDB8fHww",
			title: "Mixed Veg Fried Rice With Dry Fruits",
			description: "mfc restaurant",
			price: 180,
			time: 45,
			number: 4,
		},
		{
			image:
				"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D",
			title: "Fresh Fruit Salad Bowl",
			description: "healthy bites cafe",
			price: 150,
			time: 20,
			number: 5,
		},
		{
			image:
				"https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
			title: "Assorted Sushi Platter",
			description: "sushi express",
			price: 350,
			time: 40,
			number: 4,
		},
		{
			image:
				"https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGN1cnJ5fGVufDB8fDB8fHww",
			title: "Spicy Chicken Curry",
			description: "indian spice house",
			price: 220,
			time: 30,
			number: 4,
		},
	];

	const imgPath = "/default-image.jpg"; // Add a default image path

	return (
		<main className="max-w-screen-2xl mx-auto px-12">
			{/* Info searching */}
			<section>
				<h1 className="text-2xl font-medium text-black">
					{`Search results for "Rice Bowls"`}
				</h1>
				<nav className="flex gap-5 mt-7">
					<button className="btnActive">Dishes</button>
					<button className="btnSecondary">Restaurants</button>
				</nav>
			</section>
			{/* Dishes */}
			<section className="flex flex-wrap gap-5 mt-10">
				{data.map((item, index) => (
					<article key={index} className="max-w-[450px] w-full">
						<Link
							to={"/DetailDishes"}
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
									{item.number && (
										<span className="text-[#202020] text-base font-medium flex items-center gap-1">
											<img
												src={
													item.number >= 4
														? "/images/dishes-start-green.svg"
														: "/images/dishes-start.svg"
												}
												alt={`Rating: ${item.number}`}
											/>
											{item.number}
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
										{item.time} Mins
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
