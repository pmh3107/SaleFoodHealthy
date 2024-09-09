import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBoxOpen,
	faUser,
	faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/Product";
import { getUsers } from "../../service/User";
import { getOrders } from "../../service/Order";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export default function MainHomeAdminPage() {
	const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const productsData = await getProducts();
			const usersData = await getUsers();
			const ordersData = await getOrders();
			setProducts(productsData);
			setUsers(usersData);
			setOrders(ordersData);
		};
		fetchData();
	}, []);

	const productData = {
		labels: products.map((product) => product.title),
		datasets: [
			{
				label: "Products",
				data: products.map((product) => product.price),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			},
		],
	};

	const userData = {
		labels: users.map((user) => user.name),
		datasets: [
			{
				label: "Users",
				data: users.map((user) => (user.orders ? user.orders.length : 0)),
				backgroundColor: "rgba(153, 102, 255, 0.6)",
			},
		],
	};

	const orderData = {
		labels: ["Pending", "In Process", "Completed", "Delivered", "Cancelled"],
		datasets: [
			{
				label: "Orders",
				data: [
					orders.filter((order) => order.state === "Pending").length,
					orders.filter((order) => order.state === "In Process").length,
					orders.filter((order) => order.state === "Completed").length,
					orders.filter((order) => order.state === "Delivered").length,
					orders.filter((order) => order.state === "Cancelled").length,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
				],
			},
		],
	};

	return (
		<main className="p-10">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
			<p className="text-lg font-medium flex items-center gap-2">
				<FontAwesomeIcon icon={faBoxOpen} />
				Products: <strong>{products.length}</strong>
			</p>
			<p className="text-lg font-medium flex items-center gap-2">
				<FontAwesomeIcon icon={faUser} />
				Users: <strong>{users.length}</strong>
			</p>
			<p className="text-lg font-medium flex items-center gap-2">
				<FontAwesomeIcon icon={faShoppingCart} />
				Orders: <strong>{orders.length}</strong>
			</p>
			<section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
				<Link to="/admin/product" className="p-6 bg-white shadow rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Products</h2>
					{products.length > 0 && <Bar data={productData} />}
				</Link>
				<Link to="/admin/user" className="p-6 bg-white shadow rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Users</h2>
					{users.length > 0 && <Bar data={userData} />}
				</Link>
				<Link to="/admin/order" className="p-6 bg-white shadow rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Orders</h2>
					{orders.length > 0 && <Pie data={orderData} />}
				</Link>
			</section>
		</main>
	);
}
