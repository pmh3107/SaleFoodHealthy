import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import {
	getOrders,
	addOrder,
	updateOrder,
	deleteOrder,
} from "../../service/Order";

const AdminOrder = () => {
	const [orders, setOrders] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getOrders();
				setOrders(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleAdd = () => {
		form.resetFields();
		setCurrentOrder(null);
		setIsEditing(false);
		setIsModalVisible(true);
	};

	const handleEdit = (record) => {
		form.setFieldsValue(record);
		setCurrentOrder(record);
		setIsEditing(true);
		setIsModalVisible(true);
	};

	const handleDelete = async (id) => {
		await deleteOrder(id);
		setOrders(orders.filter((item) => item.id !== id));
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (isEditing) {
				await updateOrder(currentOrder.id, values);
				setOrders(
					orders.map((item) =>
						item.id === currentOrder.id ? { ...item, ...values } : item
					)
				);
			} else {
				const newOrder = await addOrder(values);
				setOrders([...orders, { ...values, id: newOrder.id }]);
			}
			setIsModalVisible(false);
		} catch (error) {
			console.error("Error saving order:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: "Order ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "User ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "Total",
			dataIndex: "total",
			key: "total",
		},
		{
			title: "State",
			dataIndex: "state",
			key: "state",
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<div className="flex flex-col gap-2">
					<Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
						Edit
					</Button>
					<Button onClick={() => handleDelete(record.id)} danger>
						Delete
					</Button>
				</div>
			),
		},
	];

	const deliveryOrders = orders.filter(
		(order) => order.address !== "In Restaurant"
	);
	const restaurantOrders = orders.filter(
		(order) => order.address === "In Restaurant"
	);

	return (
		<main className="w-5/6 h-screen">
			<article className="px-10 py-16 flex flex-col gap-4">
				<h1 className="text-3xl font-bold ">Order Management</h1>
				<p className="text-xl">
					Number of Orders: <strong>{orders.length}</strong>
				</p>
			</article>
			<Button
				type="primary"
				onClick={handleAdd}
				style={{ marginBottom: 16 }}
				className="mx-10"
			>
				Add Order
			</Button>
			<section className="px-10">
				<h2 className="text-2xl font-semibold">Delivery Orders</h2>
				<Table columns={columns} dataSource={deliveryOrders} rowKey="id" />
			</section>
			<section className="px-10 mt-10">
				<h2 className="text-2xl font-semibold">Restaurant Orders</h2>
				<Table columns={columns} dataSource={restaurantOrders} rowKey="id" />
			</section>
			<Modal
				title={isEditing ? "Edit Order" : "Add Order"}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="userId"
						label="User ID"
						rules={[{ required: true, message: "Please input the user ID!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="total"
						label="Total"
						rules={[{ required: true, message: "Please input the total!" }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						name="state"
						label="State"
						rules={[{ required: true, message: "Please input the state!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="address"
						label="Address"
						rules={[{ required: true, message: "Please input the address!" }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</main>
	);
};

export default AdminOrder;
