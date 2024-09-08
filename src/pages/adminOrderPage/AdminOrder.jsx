import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import {
	getOrders,
	updateOrder,
	deleteOrder,
	updateOrderStatus,
	removeOrderFromUserOrders, // Add this import statement
} from "../../service/Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBarsProgress,
	faUtensils,
	faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const { Option } = Select;

const AdminOrder = () => {
	const [orders, setOrders] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [form] = Form.useForm();
	console.log(orders);
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

	const handleEdit = (record) => {
		form.setFieldsValue(record);
		setCurrentOrder(record);
		setIsEditing(true);
		setIsModalVisible(true);
	};

	const handleDelete = async (id) => {
		try {
			// Ensure currentOrder is set before accessing userId
			if (!currentOrder) {
				console.error("No current order selected for deletion.");
				return;
			}

			// Xóa đơn hàng từ collection orders
			await deleteOrder(id);

			// Lấy userId từ đơn hàng hiện tại
			const userId = currentOrder.userId; // Điều chỉnh dòng này dựa trên cấu trúc dữ liệu của bạn

			// Xóa ID đơn hàng khỏi collection user/orders
			await removeOrderFromUserOrders(userId, id); // Hàm này cần được định nghĩa để xóa ID đơn hàng

			// Cập nhật trạng thái local
			setOrders((prevOrders) => prevOrders.filter((item) => item.id !== id));
			setCurrentOrder(null); // Reset currentOrder after deletion
		} catch (error) {
			console.error("Error deleting order:", error);
		}
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
			}
			setIsModalVisible(false);
		} catch (error) {
			console.error("Error saving order:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleUpdateStatus = async (id, status) => {
		try {
			await updateOrderStatus(id, { state: status, timestamp: Date.now() });
			toast.success(`Order ${id} status updated to ${status}`);
		} catch (error) {
			console.error("Error updating order status:", error);
			toast.error("Failed to update order status.");
		}
	};

	const columns = [
		{
			title: "Order ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "User Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: `Dishes`,
			dataIndex: "dishes",
			key: "dishes",
			render: (dishes) => (
				<ul>
					<strong>Dishes </strong>
					{orders.length + 1}
					{dishes.map((dish, index) => (
						<li key={index}>
							{index + 1}. {dish.name}
						</li>
					))}
				</ul>
			),
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
			render: (text, record) => (
				<Select
					defaultValue={text}
					style={{ width: 120 }}
					onChange={(value) => handleUpdateStatus(record.id, value)} // Update status on change
				>
					<Option value="Pending">Pending</Option>
					<Option value="In Process">In Process</Option>
					<Option value="Completed">Completed</Option>
					<Option value="Delivered">Delivered</Option>
					<Option value="Cancelled">Cancelled</Option>
				</Select>
			),
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
				<h1 className="text-3xl font-bold text-orange-500 text-center">
					{" "}
					<FontAwesomeIcon icon={faBarsProgress} className="mr-2" />
					Order Management
				</h1>
				<p className="text-xl text-center font-normal">
					Number of Orders: <strong>{orders.length}</strong>
				</p>
			</article>
			<section className="px-10">
				<h2 className="text-2xl font-semibold my-3">
					<FontAwesomeIcon icon={faTruckFast} className="mr-2" />
					Delivery Orders
				</h2>
				<Table columns={columns} dataSource={deliveryOrders} rowKey="id" />
			</section>
			<section className="px-10 mt-10">
				<h2 className="text-2xl font-semibold my-3">
					<FontAwesomeIcon icon={faUtensils} className="mr-2" />
					Restaurant Orders
				</h2>
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
