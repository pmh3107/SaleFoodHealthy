import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/Firebase";
import { getUserData, updateUserOrders } from "../../service/User";
import { removeItemFromCart } from "../../service/UserCart";
import { getProductById } from "../../service/Product";
import CardDetail from "../../components/Layout/Payment/CardDetail";
import SelectionAddressDateTime from "../../components/Layout/Payment/SelectionAddressDateTime";
import { useNavigate } from "react-router-dom";
import { addOrder, createOrderStatus } from "../../service/Order";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function PaymentPage() {
	const [userId, setUserId] = useState(null);
	const [orderDetails, setOrderDetails] = useState({
		address: "",
		dateTime: "",
		paymentInfo: {},
		orderType: "dine-in",
		numberOfPeople: 1,
	});

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	useLayoutEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				console.log("User is not logged in");
				toast.error("Please login to continue");
				navigate("/LoginPage");
			}
		});
		return () => unsubscribe();
	}, [navigate]);

	const { data: userData } = useQuery(
		["userData", userId],
		() => getUserData(userId),
		{
			enabled: !!userId,
		}
	);

	const { data: cartItems } = useQuery(
		["cartItems", userData],
		async () => {
			const cartItemIds = userData.carts;
			const cartItemsPromises = cartItemIds.map(async (itemId) => {
				const item = await getProductById(itemId);
				return { id: item.id, ...item };
			});
			return Promise.all(cartItemsPromises);
		},
		{
			enabled: !!userData,
		}
	);

	const mutation = useMutation(addOrder, {
		onSuccess: async (data) => {
			await updateUserOrders(userId, data.id);
			queryClient.invalidateQueries("cartItems");
			queryClient.invalidateQueries(["userData", userId]);
			toast.success("Order placed successfully!");
			navigate("/OrderSummaryPage", {
				state: {
					orderDetails,
					cartItems,
				},
			});
		},
		onError: (error) => {
			console.error("Error placing order: ", error);
			toast.error("Failed to place order.");
		},
	});

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
					orderDetails.orderType === "takeaway"
						? cartItems.reduce(
								(total, item) => total + item.price * (item.quantity || 1),
								0
						  ) + 15
						: cartItems.reduce(
								(total, item) => total + item.price * (item.quantity || 1),
								0
						  ),
			};
			const { id } = await mutation.mutateAsync(orderData);
			await createOrderStatus(id, {
				state: "Pending",
				userId,
				timestamp: Date.now(),
			});

			await Promise.all(
				cartItems.map((item) => removeItemFromCart(userId, item.id))
			);
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
				<SelectionAddressDateTime
					userData={userData || {}}
					onDetailsChange={(details) =>
						setOrderDetails((prev) => ({ ...prev, ...details }))
					}
				/>
				<CardDetail
					cartItems={cartItems || []}
					userData={userData || {}}
					onPaymentInfoChange={(paymentInfo) =>
						setOrderDetails((prev) => ({ ...prev, paymentInfo }))
					}
					onCartItemsChange={(items) =>
						queryClient.setQueryData(["cartItems", userData], items)
					}
					handleOrder={handleOrder}
					orderDetails={orderDetails}
				/>
			</div>
		</main>
	);
}
