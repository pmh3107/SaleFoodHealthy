import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Modal, Form, Input, message } from "antd";
import {
	updateUser,
	getUserData,
	getUserOrdersByIds,
} from "../../service/User";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function UserPage() {
	const [userId, setUserId] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				console.log("User is not signed in");
			}
		});
		return () => unsubscribe();
	}, []);

	const { data: userData } = useQuery(
		["userData", userId],
		() => getUserData(userId),
		{
			enabled: !!userId,
		}
	);

	const { data: ordersData } = useQuery(
		["userOrders", userData?.orders],
		() => getUserOrdersByIds(userData?.orders),
		{
			enabled: !!userData?.orders?.length,
		}
	);

	const mutation = useMutation(updateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(["userData", userId]);
			message.success("User data updated successfully!");
			setIsModalVisible(false);
		},
		onError: (error) => {
			console.error("Error updating user data:", error);
			message.error("Failed to update user data.");
		},
	});

	const handleEditInfo = () => {
		form.setFieldsValue(userData);
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (!userId) {
				message.error("User ID is missing.");
				return;
			}
			const { name, email, phone, address } = values;
			if (
				typeof name !== "string" ||
				typeof address !== "string" ||
				typeof phone !== "number"
			) {
				message.error(
					"Name, email, and address must be strings, and phone must be a number."
				);
				return;
			}
			mutation.mutate({
				uid: userId,
				name,
				email,
				phone: Number(phone),
				address,
			});
		} catch (error) {
			console.error("Error saving user data:", error);
			message.error("Error saving user data.");
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<main className="w-screen overflow-hidden">
			{userData && (
				<>
					<div className="bg-[#202020]">
						<div className="max-w-screen-2xl mx-auto px-12 py-6 flex items-center justify-between">
							<section className="text-white flex items-center gap-10">
								<figure className="h-40 w-40">
									<img
										src={
											"https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										}
										alt={userData.name}
										className="w-full h-full object-cover rounded-full"
									/>
								</figure>
								<div className="flex flex-col gap-2.5">
									<h1 className="text-3xl font-semibold">{userData.name}</h1>
									<p className="text-base font-normal lowercase">
										{userData.email}
									</p>
								</div>
							</section>
							{userData.voucher && (
								<aside className="max-w-[400px] flex flex-col gap-5 p-8 rounded-[20px] border-2 border-[#FC8019] border-dashed text-white">
									<h2 className="text-[#FC8019] text-2xl font-medium">
										Offers
									</h2>
									<div className="flex items-center gap-2.5">
										<img src="/images/discount.svg" alt="Discount icon" />
										<p className="text-base font-medium">
											50% off up to $10 | Use code TRYNEW
										</p>
									</div>
									<div className="flex items-center gap-2.5">
										<img src="/images/discount.svg" alt="Discount icon" />
										<p className="text-base font-medium">
											20% off | Use code PARTY
										</p>
									</div>
								</aside>
							)}
						</div>
					</div>
					<div className="max-w-screen-2xl mx-auto px-12 py-6 ">
						<div className="flex gap-20">
							<div>
								<h2 className="text-3xl font-semibold">Manage information</h2>
								<div className="flex flex-col gap-4 mt-5">
									<p className="text-lg font-medium ">
										<strong>Name: </strong>
										{userData.name}
									</p>
									<p className="text-lg font-medium ">
										<strong>Email: </strong>
										{userData.email}
									</p>
									<p className="text-lg font-medium ">
										<strong>Phone: </strong>
										{userData.phone}
									</p>
									<p className="text-lg font-medium ">
										<strong>Address: </strong> {userData.address}
									</p>
								</div>
								<div className="flex items-center gap-4 mt-10">
									<Button
										type="primary"
										onClick={handleEditInfo}
										className="bg-[#FC8019] text-white px-4 py-2 rounded-md"
									>
										Edit information
									</Button>
								</div>
							</div>
							<span className="w-[1px] h-60 bg-slate-600"></span>
							<div>
								<h2 className="text-3xl font-semibold text-center">
									Manage orders ({ordersData?.length || 0})
								</h2>
								<div className="flex flex-col gap-4 mt-5">
									{ordersData?.map((order) => (
										<div key={order.id} className="border p-4 rounded-md">
											<p className="text-xl font-semibold mb-2 text-center">
												{order.address === "In Restaurant"
													? "In Restaurant"
													: "Delivery"}{" "}
												Order
											</p>
											<p className="text-lg font-medium">
												<strong>Order ID: </strong> {order.id}
											</p>
											<p className="text-lg font-medium">
												<strong>Date: </strong> {order.dateTime}
											</p>
											<p className="text-lg font-medium">
												<strong>Total: </strong> ${order.total}
											</p>
											<p className="text-lg font-medium">
												<strong>Status: </strong> {order.state}
											</p>
										</div>
									))}
								</div>
							</div>
							<span className="w-[1px] h-60 bg-slate-600"></span>
							<div>
								<h2 className="text-3xl font-semibold text-center">
									Notifications
								</h2>
								<div className="flex flex-col gap-4 mt-5">
									{/* <p className="text-lg font-medium">
										<strong>Email: </strong> {userData.email}
									</p> */}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<Modal
				title="Edit Information"
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: "Please input your name!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone"
						rules={[{ required: true, message: "Please input your phone!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="address"
						label="Address"
						rules={[{ required: true, message: "Please input your address!" }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</main>
	);
}
