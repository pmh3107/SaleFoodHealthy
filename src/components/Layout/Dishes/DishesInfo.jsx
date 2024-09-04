import PropTypes from "prop-types";
function DishedInfo({ item }) {
	const imgPath =
		"https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	return (
		<div className="bg-[#202020]">
			<div className="max-w-screen-2xl mx-auto px-12 py-6 flex items-center justify-between">
				<section className="text-white flex items-center gap-10">
					<figure className="w-[400px] h-[250px]">
						<img
							src={item.image ? item.image : imgPath}
							alt={item.title}
							className="w-full h-full object-cover rounded-[10px]"
						/>
					</figure>
					<div className="flex flex-col gap-2.5">
						<h1 className="text-3xl font-semibold">{item.title}</h1>
						<p className="text-base font-normal lowercase">{item.category}</p>
						<ul className="flex items-center">
							<li className="flex flex-col gap-1 pr-16 border-r border-white">
								<div className="flex items-center gap-1">
									{item.rate && (
										<>
											<img
												src={
													item.rate >= 4
														? "/images/dishes-start-green.svg"
														: "/images/dishes-start.svg"
												}
												alt={item.rate}
											/>
											<p className="text-base font-medium">{item.rate}</p>
										</>
									)}
								</div>
								<p className="text-base font-medium">100+ ratings</p>
							</li>
							<li className="flex flex-col gap-1 px-16 border-r border-white">
								<span>{item.timeCook} Mins</span>
								<p>Delivery Time</p>
							</li>
							<li className="flex flex-col gap-1 pl-16">
								<span>$ {item.price}</span>
								<p>Cost for two</p>
							</li>
						</ul>
					</div>
				</section>
				{/* Discount */}
				<aside className="max-w-[400px] flex flex-col gap-5 p-8 rounded-[20px] border-2 border-[#FC8019] border-dashed text-white">
					<h2 className="text-[#FC8019] text-2xl font-medium">Offers</h2>
					<div className="flex items-center gap-2.5">
						<img src="/images/discount.svg" alt="Discount icon" />
						<p className="text-base font-medium">
							50% off up to $10 | Use code TRYNEW
						</p>
					</div>
					<div className="flex items-center gap-2.5">
						<img src="/images/discount.svg" alt="Discount icon" />
						<p className="text-base font-medium">20% off | Use code PARTY</p>
					</div>
				</aside>
			</div>
		</div>
	);
}
DishedInfo.propTypes = {
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
export default DishedInfo;
