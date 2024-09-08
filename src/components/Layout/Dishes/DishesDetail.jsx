import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../../service/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addItemToCart } from "../../../service/User"; // Import the addItemToCart function
import { toast } from "react-toastify";

function DishesDetail({ item }) {
	const [categories, setCategories] = useState([]);
	const [user, setUser] = useState(null); // State to store user info
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchCategory = async () => {
			const categoryList = await getCategory();
			setCategories(categoryList);
		};
		fetchCategory();
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	const handleAddToCart = async (e) => {
		e.preventDefault();
		if (user) {
			const success = await addItemToCart(user.uid, item.id);
			if (success) {
				toast.success("Item added to cart");
			} else {
				toast.error("Failed to add item to cart");
			}
		} else {
			toast.info("Please login to add to cart");
			setTimeout(() => {
				navigate("/LoginPage");
			}, 1500);
		}
	};

	const handleBuy = async (e) => {
		e.preventDefault();
		if (user) {
			const success = await addItemToCart(user.uid, item.id);
			if (success) {
				navigate("/PaymentPage");
			} else {
				toast.error("Failed to buy, please try again");
			}
		} else {
			toast.info("Please login to add to cart");
			setTimeout(() => {
				navigate("/LoginPage");
			}, 1500);
		}
	};

	const imgPath =
		"https://plus.unsplash.com/premium_photo-1679503585289-c02467981894?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww";
	return (
		<div className="max-w-screen-2xl mx-auto px-12">
			<div className="flex pt-12 justify-between">
				{/* List */}
				<nav className="w-52 flex flex-col gap-4 items-end">
					{categories.map((category, index) => (
						<span
							key={index}
							className={`text-base font-medium ${
								item.category.toLowerCase() === category.name.toLowerCase()
									? "text-[#FC8019]"
									: "text-[#404040]"
							}`}
						>
							{category.name}
						</span>
					))}
				</nav>
				<div className="w-[1px] h-[300px] bg-[#808080]"></div>
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
				{/* Option add to cart or payment */}
				<div className="flex flex-col gap-4">
					<button
						onClick={handleAddToCart} // Add onClick handler
						className="text-white font-medium text-xl bg-blue-500 px-6 py-4 rounded-[10px] hover:opacity-70"
					>
						Add to cart <FontAwesomeIcon icon={faCartShopping} />
					</button>
					<button
						onClick={handleBuy}
						className="text-white font-medium text-xl bg-[#FC8019] px-6 py-4 rounded-[10px] hover:opacity-70"
					>
						Buy now <FontAwesomeIcon icon={faCashRegister} />
					</button>
				</div>
			</div>
		</div>
	);
}

DishesDetail.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
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
