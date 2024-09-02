import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategory } from "../../../service/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faCashRegister,
} from "@fortawesome/free-solid-svg-icons";

function DishesDetail({ item }) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategory = async () => {
			const categoryList = await getCategory();
			setCategories(categoryList);
		};
		fetchCategory();
	}, []);
	console.log(categories);
	// const navigate = useNavigate();
	const imgPath =
		"https://plus.unsplash.com/premium_photo-1679503585289-c02467981894?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww";
	console.log(categories, item.category);
	return (
		<div className="max-w-screen-2xl mx-auto px-12">
			<div className="flex py-20 justify-between">
				{/* List */}
				<nav className="w-52 flex flex-col gap-4 items-end">
					{categories.map((category, index) => (
						<span
							key={index}
							className={`text-base font-medium ${
								item.category === category ? "text-[#FC8019]" : "text-[#404040]"
							}`}
						>
							{category.name}
						</span>
					))}
				</nav>
				<div className="w-[1px] h-[500px] bg-[#808080]"></div>
				{/* Dishes */}
				<section className="flex gap-10">
					<div className="flex flex-col gap-4">
						<h2 className="text-[#202020] text-xl font-medium">{item.title}</h2>
						<span className="text-black text-base font-normal">
							${item.price}
						</span>
						<p className="text-[#808080] text-base font-normal max-w-[511px] line-clamp-4">
							{item.description}
						</p>
					</div>
					<figure className="w-40 h-40">
						<img
							src={item.image ? item.image : imgPath}
							alt="Brunch for 2 - Veg"
							className="w-full h-full object-cover rounded-[10px]"
						/>
					</figure>
				</section>
				{/* Detail */}
				{/* <aside className="flex flex-col gap-11 w-[365px] h-[539px] text-[#202020]">
					<header className="flex items-center justify-between text-2xl font-medium">
						<h2>Cart</h2>
						<p className="text-base">2 items</p>
					</header>

					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<h2 className="text-base font-medium">
								from <span className="text-[#FC8019]">Lunch Box</span>
							</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-base font-medium">Brunch for 2 - Veg</p>
									<span className="text-[#808080]">₹599</span>
								</div>
								<div className="flex items-center gap-3 text-xl font-normal">
									<button>-</button>
									<span>1</span>
									<button>+</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<h2 className="text-base font-medium">
								from <span className="text-[#FC8019]">Fatso</span>
							</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-base font-medium">Brunch for 2 - Veg</p>
									<span className="text-[#808080]">₹599</span>
								</div>
								<div className="flex items-center gap-3 text-xl font-normal">
									<button>-</button>
									<span>1</span>
									<button>+</button>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className="flex justify-between items-center text-2xl font-medium">
							<h3>Subtotal</h3>
							<span>₹799</span>
						</div>
						<p className="text-[#808080] text-sm font-normal">
							Extra charges may apply
						</p>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							navigate("/PaymentPage");
						}}
						className="text-white font-medium text-2xl bg-[#FC8019] px-6 py-4 rounded-[10px] hover:opacity-70"
					>
						Checkout
					</button>
				</aside> */}
				{/* Option add to cart or payment */}
				<div className="flex flex-col gap-4">
					<button className="text-white font-medium text-xl bg-blue-500 px-6 py-4 rounded-[10px] hover:opacity-70">
						Add to cart <FontAwesomeIcon icon={faCartShopping} />
					</button>
					<button className="text-white font-medium text-xl bg-[#FC8019] px-6 py-4 rounded-[10px] hover:opacity-70">
						Buy now <FontAwesomeIcon icon={faCashRegister} />
					</button>
				</div>
			</div>
		</div>
	);
}
DishesDetail.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		price: PropTypes.number.isRequired,
		image: PropTypes.string,
		category: PropTypes.string.isRequired,
		rate: PropTypes.number,
		time: PropTypes.number,
	}),
};
export default DishesDetail;
