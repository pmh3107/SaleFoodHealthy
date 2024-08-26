import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DishesDetail() {
	const navigate = useNavigate();
	return (
		<div className="max-w-screen-2xl mx-auto px-12">
			<div className="flex py-20 justify-between">
				{/* List */}
				<nav className="w-52 flex flex-col gap-4 items-end">
					<Link to="#" className="text-base font-medium text-[#FC8019]">
						Recommended
					</Link>
					<Link to="#" className="text-base font-medium text-[#404040]">
						Breakfast Box
					</Link>
					<Link to="#" className="text-base font-medium text-[#404040]">
						Lunch Box
					</Link>
					<Link to="#" className="text-base font-medium text-[#404040]">
						Combo Box
					</Link>
					<Link to="#" className="text-base font-medium text-[#404040]">
						Biryani Box
					</Link>
				</nav>
				<div className="w-[1px] h-[500px] bg-[#808080]"></div>
				{/* Dishes */}
				<section className="flex gap-10">
					<div className="flex flex-col gap-4">
						<h2 className="text-[#202020] text-xl font-medium">
							Brunch for 2 - Veg (Save up to ₹45)
						</h2>
						<span className="text-black text-base font-normal">₹599</span>
						<p className="text-[#808080] text-base font-normal max-w-[511px] line-clamp-4">
							Brunch: One meal to rule them all! Grab this mega saver combo with
							your choice of 2 veg wraps, Aloo Paratha (2 pcs), Chole and Curd
							lunchbox, and 2 Choco Lava cakes. This is just bliss on a plate!
						</p>
					</div>
					<figure className="w-40 h-40">
						<img
							src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGlzaGVzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
							alt="Brunch for 2 - Veg"
							className="w-full h-full object-cover rounded-[10px]"
						/>
					</figure>
				</section>
				{/* Detail */}
				<aside className="flex flex-col gap-11 w-[365px] h-[539px] text-[#202020]">
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
				</aside>
			</div>
		</div>
	);
}

export default DishesDetail;
