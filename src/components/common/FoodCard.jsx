import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
	const imgPath =
		"https://plus.unsplash.com/premium_photo-1679503585289-c02467981894?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww";
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/DishesPage", { state: item });
	};

	return (
		<button onClick={handleClick}>
			<section className="max-w-[300px] h-[425px] p-6 flex flex-col gap-5 justify-center items-center rounded-[10px] bg-[#F8F8F8]">
				<figure className="w-64 h-64">
					<img
						className="rounded-[10px] w-full h-full object-cover"
						src={item.image ? item.image : imgPath}
						alt={item.title}
					/>
				</figure>
				<div className="flex flex-col gap-5 mt-5">
					<h2 className="text-[#202020] text-xl font-medium capitalize line-clamp-1">
						{item.title}
					</h2>
					<div className="flex items-center justify-between line-clamp-1 gap-2">
						<p className="text-base font-medium text-[#808080] lowercase">
							{item.category}
						</p>
						{item.rate && (
							<span className="text-[#202020] text-base font-medium flex gap-1">
								<img
									src={
										item.rate >= 4
											? "/images/dishes-start-green.svg"
											: "/images/dishes-start.svg"
									}
									alt={item.rate}
								/>
								{item.rate}
							</span>
						)}
					</div>
					<div className="flex items-center justify-between">
						<span className="text-[#202020] text-base font-medium flex gap-2">
							<img src="/images/dishes-price.svg" alt="price icon" />$
							{item.price}
						</span>
						<span className="text-[#202020] text-base font-medium flex gap-2">
							<img src="/images/dishes-time.svg" alt="time icon" />
							{item.timeCook} Mins
						</span>
					</div>
				</div>
			</section>
		</button>
	);
};

FoodCard.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		price: PropTypes.number.isRequired,
		image: PropTypes.string,
		category: PropTypes.string.isRequired,
		rate: PropTypes.number,
		timeCook: PropTypes.number,
	}),
};

export default FoodCard;
