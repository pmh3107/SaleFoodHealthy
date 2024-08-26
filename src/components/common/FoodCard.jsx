import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FoodCard = ({ image, title, description, price, time, number }) => {
	console.log(image);
	const imgPath =
		"https://plus.unsplash.com/premium_photo-1679503585289-c02467981894?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww";
	return (
		<Link to={"/DetailDishes"}>
			<section className="max-w-[300px] h-[425px] p-6 flex flex-col gap-5 justify-center items-center rounded-[10px] bg-[#F8F8F8]">
				<figure className="w-64 h-64">
					<img
						className="rounded-[10px] w-full h-full object-cover"
						src={image ? image : imgPath}
						alt={title}
					/>
				</figure>
				<div className="flex flex-col gap-5 mt-5">
					<h2 className="text-[#202020] text-xl font-medium capitalize line-clamp-1">
						{title}
					</h2>
					<div className="flex items-center justify-between line-clamp-1 gap-2">
						<p className="text-base font-medium text-[#808080] lowercase">
							{description}
						</p>
						{number && (
							<span className="text-[#202020] text-base font-medium flex gap-1">
								<img
									src={
										number >= 4
											? "/images/dishes-start-green.svg"
											: "/images/dishes-start.svg"
									}
									alt={number}
								/>
								{number}
							</span>
						)}
					</div>
					<div className="flex items-center justify-between">
						<span className="text-[#202020] text-base font-medium flex gap-2">
							<img src="/images/dishes-price.svg" alt="price icon" />₹{price}
						</span>
						<span className="text-[#202020] text-base font-medium flex gap-2">
							<img src="/images/dishes-time.svg" alt="time icon" />
							{time} Mins
						</span>
					</div>
				</div>
			</section>
		</Link>
	);
};

FoodCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	time: PropTypes.number.isRequired,
	number: PropTypes.number,
};

export default FoodCard;
