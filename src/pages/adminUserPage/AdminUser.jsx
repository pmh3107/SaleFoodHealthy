import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Switch } from "antd";
import { getUsers, addUser, updateUser, deleteUser } from "../../service/User";
import { toast } from "react-toastify";

const AdminUser = () => {
	const [users, setUsers] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUsers();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleEdit = (record) => {
		form.setFieldsValue(record);
		setCurrentUser(record);
		setIsEditing(true);
		setIsModalVisible(true);
	};

	const handleDelete = async (id) => {
		await deleteUser(id);
		setUsers(users.filter((item) => item.id !== id));
		toast.success("User deleted successfully");
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (isEditing) {
				await updateUser({ ...currentUser, ...values });
				setUsers(
					users.map((item) =>
						item.id === currentUser.id ? { ...item, ...values } : item
					)
				);
			} else {
				const { email, password, ...userData } = values;
				const newUser = await addUser(email, password, userData);
				setUsers([...users, { ...userData, id: newUser.uid, email }]);
			}
			setIsModalVisible(false);
			toast.success("User updated successfully");
		} catch (error) {
			console.error("Error saving user:", error);
			toast.error("Error saving user");
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleVoucherToggle = async (record) => {
		try {
			const updatedUser = {
				...record,
				uid: record.id,
				voucher: !record.voucher,
			};
			await updateUser(updatedUser);
			setUsers(
				users.map((item) => (item.id === record.id ? updatedUser : item))
			);
			toast.success(
				`Voucher ${record.voucher ? "removed" : "added"} successfully`
			);
		} catch (error) {
			console.error("Error updating voucher:", error);
			toast.error("Error updating voucher");
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Voucher",
			dataIndex: "voucher",
			key: "voucher",
			render: (text, record) => (
				<Switch
					checked={record.voucher}
					onChange={() => handleVoucherToggle(record)}
				/>
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

	return (
		<main className="w-5/6 h-screen">
			<article className="px-10 py-16 flex flex-col gap-4">
				<h1 className="text-3xl font-bold ">User Management</h1>
				<p className="text-xl">
					Number of Users: <strong>{users.length}</strong>
				</p>
			</article>

			<Table columns={columns} dataSource={users} rowKey="id" />
			<Modal
				title={isEditing ? "Edit User" : "Add User"}
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: "Please input the user name!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone Number"
						rules={[
							{ required: true, message: "Please input the phone number!" },
						]}
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
					<Form.Item name="voucher" label="Voucher" valuePropName="checked">
						<Switch />
					</Form.Item>
				</Form>
			</Modal>
		</main>
	);
};

export default AdminUser;
