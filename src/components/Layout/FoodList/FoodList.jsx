import PropTypes from "prop-types";
import FoodCard from "../../common/FoodCard";

const FoodList = ({ products }) => {
	const higherStars = products.filter((item) => item.rate >= 4).slice(0, 4);
	const fashTimeCook = products
		.filter((item) => item.timeCook <= 15)
		.slice(0, 4);

	return (
		<div className="flex flex-col gap-8 lg:flex-row">
			<div className="flex flex-col gap-8">
				<h2 className="text-[#202020] text-2xl font-medium">
					High class food above 4 stars
				</h2>
				<div className="flex flex-wrap gap-5">
					{higherStars.map((item, index) => (
						<FoodCard key={index} item={item} />
					))}
				</div>
			</div>
			<div className="flex flex-col gap-8">
				<h2 className="text-[#202020] text-2xl font-medium">
					Recommended Fast time Cook
				</h2>
				<div className="flex flex-wrap gap-5">
					{fashTimeCook.map((item, index) => (
						<FoodCard key={index} item={item} />
					))}
				</div>
			</div>
		</div>
	);
};

FoodList.propTypes = {
	products: PropTypes.array,
};

export default FoodList;
