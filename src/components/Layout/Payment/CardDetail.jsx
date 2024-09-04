import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { deleteProductFromUserCart } from "../../../service/User";

export default function CardDetail({
	cartItems,
	userData,
	onCartItemsChange,
	handleOrder,
	orderDetails,
}) {
	const hasVoucher = userData?.voucher;
	const discount = hasVoucher ? 0.1 : 0; // 10% discount if voucher is true
	const subtotal = cartItems.reduce(
		(total, item) => total + item.price * (item.quantity || 1),
		0
	);
	const discountedTotal = subtotal * (1 - discount);
	const deliveryFee = 15;
	const total = discountedTotal + deliveryFee;

	const handleQuantityChange = async (id, quantity) => {
		if (quantity === 0) {
			await deleteProductFromUserCart(userData.id, id);
			const updatedCartItems = cartItems.filter((item) => item.id !== id);
			onCartItemsChange(updatedCartItems);
		} else {
			const updatedCartItems = cartItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
			);
			onCartItemsChange(updatedCartItems);
		}
	};

	return (
		<div className="w-1/3 flex justify-end">
			<aside className="flex flex-col gap-11 w-[365px] min-h-[539px] text-[#202020] bg-[#F8F8F8] p-6 rounded-[10px]">
				<header className="flex items-center justify-between text-2xl font-medium">
					<h2>Cart</h2>
					<p className="text-base">{cartItems.length} items</p>
				</header>
				<div className="flex flex-col gap-8">
					{cartItems.map((item) => (
						<div key={item.id} className="flex flex-col gap-4">
							<h2 className="text-base font-medium">
								from <span className="text-[#FC8019]">{item.category}</span>
							</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-base font-medium">{item.title}</p>
									<span className="text-[#808080]">${item.price}</span>
								</div>
								<div className="flex items-center gap-3 text-xl font-normal">
									<button
										onClick={() =>
											handleQuantityChange(item.id, (item.quantity || 1) - 1)
										}
									>
										-
									</button>
									<span>{item.quantity || 1}</span>
									<button
										onClick={() =>
											handleQuantityChange(item.id, (item.quantity || 1) + 1)
										}
									>
										+
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div>
					<div className="flex justify-between items-center text-2xl font-medium">
						<h3>Subtotal</h3>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					{hasVoucher && (
						<div className="flex justify-between items-center text-2xl font-medium">
							<h3>Discount</h3>
							<span>- ${(subtotal * discount).toFixed(2)}</span>
						</div>
					)}
					<p className="text-[#808080] text-sm font-normal">
						Extra charges may apply
					</p>
				</div>
				{orderDetails.orderType === "takeaway" && (
					<div className="text-[#808080] text-sm font-normal flex flex-col gap-4">
						<p>Bill details</p>
						<div className="flex justify-between items-center">
							<p>Item Total</p>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-1">
								<p className="w-[155px]">
									Delivery Fee | 12.9 kms Custom Delivery time
								</p>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
							<span>${deliveryFee.toFixed(2)}</span>
						</div>
					</div>
				)}
				<header className="flex items-center justify-between text-2xl font-medium">
					<h2>Total</h2>
					<p>${total.toFixed(2)}</p>
				</header>
				<button
					className="text-white font-medium text-base  bg-[#FC8019] px-6 py-4 rounded-[10px] hover:opacity-70"
					onClick={handleOrder}
				>
					Proceed To Payment
				</button>
			</aside>
		</div>
	);
}

CardDetail.propTypes = {
	cartItems: PropTypes.array.isRequired,
	userData: PropTypes.object.isRequired,
	onCartItemsChange: PropTypes.func.isRequired,
	handleOrder: PropTypes.func.isRequired,
	orderDetails: PropTypes.object.isRequired,
};
