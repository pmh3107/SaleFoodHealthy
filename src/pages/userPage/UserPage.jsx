import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Button, Modal, Form, Input, message } from "antd";
import { updateUser } from "../../service/User"; // Import updateUser function

export default function UserPage() {
	const [userData, setUserData] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		const fetchUserData = async (uid) => {
			const db = getFirestore();
			const userDoc = doc(db, "users", uid);
			const userSnapshot = await getDoc(userDoc);
			if (userSnapshot.exists()) {
				setUserData({ uid, ...userSnapshot.data() });
			} else {
				console.log("No such document!");
			}
		};

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				fetchUserData(user.uid);
			} else {
				console.log("User is not signed in");
			}
		});
	}, []);

	const handleEditInfo = () => {
		form.setFieldsValue(userData);
		setIsEditing(true);
		setIsModalVisible(true);
	};

	const handleAddAddress = () => {
		form.resetFields();
		setIsEditing(false);
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (!userData || !userData.uid) {
				message.error("User ID is missing.");
				return;
			}
			const success = await updateUser(userData.uid, values);

			if (success) {
				message.success("User data updated successfully!");
				setUserData({ ...userData, ...values });
			} else {
				message.error("Failed to update user data.");
			}
			setIsModalVisible(false);
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
									<Button
										type="primary"
										onClick={handleAddAddress}
										className="bg-[#FC8019] text-white px-4 py-2 rounded-md"
									>
										Change new address
									</Button>
								</div>
							</div>
							<span className="w-[1px] h-60 bg-slate-600"></span>
							<div>
								<h2 className="text-3xl font-semibold">Manage orders</h2>
								<div className="flex flex-col gap-4 mt-5">
									<p className="text-lg font-medium ">Orders completed: 1</p>
									<p className="text-lg font-medium ">Dishes in cart: 1</p>
								</div>
							</div>
						</div>
					</div>
					<Modal
						title={isEditing ? "Edit Information" : "Add Address"}
						visible={isModalVisible}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Form form={form} layout="vertical">
							{isEditing ? (
								<>
									<Form.Item
										name="name"
										label="Name"
										rules={[
											{ required: true, message: "Please input your name!" },
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										name="email"
										label="Email"
										rules={[
											{ required: true, message: "Please input your email!" },
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item name="phone" label="Phone">
										<Input />
									</Form.Item>
								</>
							) : (
								<Form.Item
									name="address"
									label="New Address"
									rules={[
										{
											required: true,
											message: "Please input the new address!",
										},
									]}
								>
									<Input />
								</Form.Item>
							)}
						</Form>
					</Modal>
				</>
			)}
			{!userData && (
				<div className="w-screen h-screen flex items-center justify-center">
					<h1 className="text-3xl font-semibold">You are not logged in</h1>
				</div>
			)}
		</main>
	);
}
