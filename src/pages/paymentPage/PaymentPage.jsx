import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/Firebase";
import { getUserData } from "../../service/User";
import { getProductById } from "../../service/Product";
import CardDetail from "../../components/Layout/Payment/CardDetail";
import SelectionAddressDateTime from "../../components/Layout/Payment/SelectionAddressDateTime";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../service/Order";
import { toast } from "react-toastify";

export default function PaymentPage() {
	const [userData, setUserData] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const [userId, setUserId] = useState(null);
	const [orderDetails, setOrderDetails] = useState({
		address: "",
		dateTime: "",
		paymentInfo: {},
		orderType: "dine-in",
		numberOfPeople: 1,
	});

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
				setUserData(user);
			} else {
				console.log("User is not logged in");
			}
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (userId) {
				const data = await getUserData(userId);
				if (data) {
					setUserData(data);

					const cartItemIds = data.carts;
					const cartItemsPromises = cartItemIds.map(async (itemId) => {
						const item = await getProductById(itemId);
						return { id: item.id, ...item };
					});
					const items = await Promise.all(cartItemsPromises);
					setCartItems(items);
				}
			}
		};
		fetchUserData();
	}, [userId]);

	const handleOrder = async () => {
		try {
			const orderData = {
				userId,
				name: userData.name,
				phone: userData.phone,
				dateTime: orderDetails.dateTime,
				numberOfPeople: orderDetails.numberOfPeople,
				address:
					orderDetails.orderType === "takeaway"
						? userData.address
						: "In Restaurant",
				dishes: cartItems.map((item) => ({
					name: item.title,
					price: item.price,
					quantity: item.quantity || 1,
				})),
				total:
					cartItems.reduce(
						(total, item) => total + item.price * (item.quantity || 1),
						0
					) + 15,
				state: "Pending",
			};
			console.log(orderData);
			await addOrder(orderData);
			toast.success("Order placed successfully!");
			navigate("/order-summary");
		} catch (error) {
			console.error("Error placing order: ", error);
			toast.error("Failed to place order.");
		}
	};

	return (
		<main className="max-w-screen-2xl mx-auto px-12">
			<h1 className="w-full border-b-[1px] text-2xl font-semibold p-[10px] border-[#808080]">
				Secure Checkout
			</h1>
			<div className="flex justify-between py-12">
				{/* selection */}
				<SelectionAddressDateTime
					userData={userData || {}}
					onDetailsChange={(details) =>
						setOrderDetails((prev) => ({ ...prev, ...details }))
					}
				/>
				{/* card details */}
				<CardDetail
					cartItems={cartItems}
					userData={userData || {}}
					onPaymentInfoChange={(paymentInfo) =>
						setOrderDetails((prev) => ({ ...prev, paymentInfo }))
					}
					onCartItemsChange={setCartItems}
					handleOrder={handleOrder}
					orderDetails={orderDetails}
				/>
			</div>
		</main>
	);
}
