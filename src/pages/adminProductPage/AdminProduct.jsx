import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../../service/Product";

const AdminProduct = () => {
	const [products, setProducts] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);
	const [form] = Form.useForm();
	console.log(products.length);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleAdd = () => {
		form.resetFields();
		setCurrentProduct(null);
		setIsEditing(false);
		setIsModalVisible(true);
	};

	const handleEdit = (record) => {
		form.setFieldsValue(record);
		setCurrentProduct(record);
		setIsEditing(true);
		setIsModalVisible(true);
	};

	const handleDelete = async (id) => {
		await deleteProduct(id);
		setProducts(products.filter((item) => item.id !== id));
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();

			// Convert relevant fields to numbers
			const productData = {
				...values,
				price: Number(values.price),
				rate: Number(values.rate),
				timeCook: Number(values.timeCook),
			};

			if (isEditing) {
				await updateProduct(currentProduct.id, productData);
				setProducts(
					products.map((item) =>
						item.id === currentProduct.id ? { ...item, ...productData } : item
					)
				);
			} else {
				await addProduct(productData);
				setProducts([
					...products,
					{ ...productData, id: Math.random().toString(36).substring(2, 9) },
				]);
			}
			setIsModalVisible(false);
		} catch (error) {
			console.error("Error saving product:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Rate",
			dataIndex: "rate",
			key: "rate",
		},
		{
			title: "Time Cook",
			dataIndex: "timeCook",
			key: "timeCook",
		},
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (text, record) => (
				<img src={record.image} alt={record.title} style={{ width: 100 }} />
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
				<h1 className="text-3xl font-bold ">Product Management</h1>
				<p className="text-xl">
					Number of Dishes: <strong>{products.length}</strong>
				</p>
			</article>
			<Button
				type="primary"
				onClick={handleAdd}
				style={{ marginBottom: 16 }}
				className="mx-10"
			>
				Add Product
			</Button>
			<Table columns={columns} dataSource={products} rowKey="id" />
			<Modal
				title={isEditing ? "Edit Product" : "Add Product"}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="title"
						label="Title"
						rules={[
							{ required: true, message: "Please input the product title!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="category"
						label="Category"
						rules={[{ required: true, message: "Please input the category!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						name="price"
						label="Price"
						rules={[{ required: true, message: "Please input the price!" }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						name="rate"
						label="Rate"
						rules={[{ required: true, message: "Please input the rate!" }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item name="timeCook" label="Time Cook (minutes)">
						<Input type="number" />
					</Form.Item>
					<Form.Item
						name="image"
						label="Image URL"
						rules={[{ required: true, message: "Please input the image URL!" }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</main>
	);
};

export default AdminProduct;
