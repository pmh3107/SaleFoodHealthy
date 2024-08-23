import FoodCard from "../../common/FoodCard";
import foodData from "./dataFoodList";
import foodDataRecomend from "./dataFoodRecomend";

const FoodList = () => {
	return (
		<div className="flex ">
			<div className="flex flex-col gap-8">
				<h2 className="text-[#202020] text-2xl font-medium">
					Nearby Restaurants
				</h2>
				<div className="flex flex-wrap gap-5">
					{foodData.map((item, index) => (
						<FoodCard
							key={index}
							image={item.image}
							title={item.title}
							description={item.description}
							price={item.price}
							time={item.time}
							number={item.number}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-8">
				<h2 className="text-[#202020] text-2xl font-medium">
					Recommended Food Items
				</h2>
				<div className="flex flex-wrap gap-5">
					{foodDataRecomend.map((item, index) => (
						<FoodCard
							key={index}
							image={item.image}
							title={item.title}
							description={item.description}
							price={item.price}
							time={item.time}
							number={item.number}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default FoodList;
