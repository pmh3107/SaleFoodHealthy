import FoodCard from "../../common/FoodCard";
import foodDataRecomend from "./dataFoodRecomend";

function RecomendFoods() {
	return (
		<div className="max-w-screen-2xl mx-auto px-12 mt-36">
			<h2 className="text-[#202020] text-2xl font-medium mb-7">
				Personalized recommendations
			</h2>
			<div className="flex justify-between items-center ">
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
	);
}
export default RecomendFoods;
