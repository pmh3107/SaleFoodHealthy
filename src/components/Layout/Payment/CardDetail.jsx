import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
export default function CardDetail() {
	return (
		<div className="w-1/3 flex justify-end">
			<aside className="flex flex-col gap-11 w-[365px] min-h-[539px] text-[#202020] bg-[#F8F8F8] p-6 rounded-[10px]">
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
								<p className="text-base font-medium w-[180px]">
									Paneer Signature Rice Bowl (Regular)
								</p>
								<span className="text-[#808080]">₹200</span>
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
				<div className="text-[#808080] text-sm font-normal flex flex-col gap-4">
					<p>Bill details</p>
					<div className="flex justify-between items-center">
						<p>Item Total</p>
						<span>₹799.00</span>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-1">
							<p className="w-[155px]">
								Delivery Fee | 12.9 kms Custom Delivery time
							</p>
							<FontAwesomeIcon icon={faCircleExclamation} />
						</div>
						<span>₹131.00</span>
					</div>
				</div>
				<header className="flex items-center justify-between text-2xl font-medium">
					<h2>Total</h2>
					<p>₹932.00</p>
				</header>
				<button className="text-white font-medium text-base  bg-[#FC8019] px-6 py-4 rounded-[10px] hover:opacity-70">
					Proceed To Payment
				</button>
			</aside>
		</div>
	);
}
