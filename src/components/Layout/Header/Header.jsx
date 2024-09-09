import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlateWheat,
	faTrash,
	faBars,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { checkAuthState, logoutUser } from "../../../service/Authentication";
import { deleteProductFromUserCart } from "../../../service/User";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { getUserData, subscribeToUserCart } from "../../../service/User";
import { useQueries } from "react-query";
import { getProductById } from "../../../service/Product";
import { subscribeToOrderStatus } from "../../../service/Order";

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [infoUser, setInfoUser] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [orderID, setOrderID] = useState(null);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const userRef = useRef(null);
	const cartRef = useRef(null);
	const navigate = useNavigate();

	const { data: userData } = useQuery(
		["userData", user?.uid],
		() => getUserData(user?.uid),
		{
			enabled: !!user?.uid,
		}
	);

	useEffect(() => {
		if (userData) {
			setTimeout(() => {
				console.log(userData.orders);
				if (userData?.orders?.length > 0) {
					setOrderID(userData.orders);
				}
			}, 5000);
		}
	}, [userData]);

	useEffect(() => {
		const handleOrderStatus = async (orderID) => {
			if (!orderID) {
				return;
			}

			await orderID.forEach((order) => {
				if (order) {
					const unsubscribe = subscribeToOrderStatus(order, (status) => {
						if (status) {
							console.log("status", status.state);
							toast.info(`Order status updated to ${status.state}`);
						} else {
							console.warn("Received invalid status update:", status);
						}
					});
					return () => {
						if (typeof unsubscribe === "function") {
							unsubscribe();
						}
					};
				}
			});
		};

		handleOrderStatus(orderID);
	}, [orderID]);

	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
	};

	const handleShowUser = (e) => {
		e.preventDefault();
		setInfoUser((prev) => !prev);
	};

	const handleShowCart = (e) => {
		e.preventDefault();
		setShowCart((prev) => !prev);
	};

	const toggleNav = () => {
		setIsNavOpen((prev) => !prev);
	};

	useLayoutEffect(() => {
		checkAuthState((loggedIn, user) => {
			setIsLoggedIn(loggedIn);
			setUser(user);
		});
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userRef.current && !userRef.current.contains(event.target)) {
				setInfoUser(false);
			}
			if (cartRef.current && !cartRef.current.contains(event.target)) {
				setShowCart(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [user]);

	useEffect(() => {
		if (user) {
			const unsubscribe = subscribeToUserCart(user.uid, setCartItems);
			return () => {
				if (typeof unsubscribe === "function") {
					unsubscribe();
				}
			};
		}
	}, [user]);

	const productQueries = useQueries(
		cartItems.map((productId) => ({
			queryKey: ["product", productId],
			queryFn: () => getProductById(productId),
			enabled: !!productId,
		}))
	);

	const products = productQueries.map((query) => query.data).filter(Boolean);

	const handleDeleteItem = async (itemId) => {
		try {
			await deleteProductFromUserCart(user.uid, itemId);
			console.log("Item deleted from cart:", itemId);
		} catch (error) {
			console.error("Error removing item from cart:", error);
			toast.error("Failed to remove item from cart.");
		}
	};

	return (
		<header className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 my-8 sm:my-12 md:my-16">
			<nav
				className="flex justify-between items-center"
				aria-label="Main Navigation"
			>
				{/* Logo */}
				<div className="flex items-center gap-2">
					<button
						className="md:hidden text-2xl text-[#FC8019] m"
						onClick={toggleNav}
					>
						<FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
					</button>
					<Link
						to="/"
						className="flex items-center gap-2"
						aria-label="FastFOOD Home"
					>
						<FontAwesomeIcon
							className="text-2xl text-[#FC8019]"
							icon={faPlateWheat}
						/>
						<h1 className="font-bold text-xl sm:text-2xl">FreshFOOD</h1>
					</Link>
				</div>

				{/* Navbar */}
				<nav
					className="
					block
					flex-col
					md:flex-row
					gap-2
					sm:gap-4
					md:gap-6
					max-md:hidden"
				>
					<ul className="flex flex-col md:flex-row items-center gap-2 sm:gap-4 md:gap-6">
						<li>
							<NavLink
								to={"/"}
								className={({ isActive }) =>
									isActive
										? "text-base md:text-lg hover:text-[#FC8019] underline underline-offset-4"
										: "text-base md:text-lg hover:text-[#FC8019]"
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/SearchPage"}
								className={({ isActive }) =>
									isActive
										? "text-base md:text-lg hover:text-[#FC8019] underline underline-offset-4"
										: "text-base md:text-lg hover:text-[#FC8019]"
								}
							>
								Dishes
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/aboutUs"}
								className={({ isActive }) =>
									isActive
										? "text-base md:text-lg hover:text-[#FC8019] underline underline-offset-4"
										: "text-base md:text-lg hover:text-[#FC8019]"
								}
							>
								About Us
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/contact"}
								className={({ isActive }) =>
									isActive
										? "text-base md:text-lg hover:text-[#FC8019] underline underline-offset-4"
										: "text-base md:text-lg hover:text-[#FC8019]"
								}
							>
								Contact
							</NavLink>
						</li>
					</ul>
				</nav>
				<div
					className={`${
						isNavOpen ? "block opacity-100" : "hidden opacity-0"
					} md:hidden absolute top-24 left-0 w-full bg-white shadow-lg z-20 flex flex-col items-center py-4 transition-opacity duration-500`}
				>
					<ul className="flex flex-col items-center gap-4">
						<li>
							<NavLink
								to={"/"}
								className="text-lg text-gray-800 hover:text-[#FC8019] transition-colors duration-300"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/dishes"}
								className="text-lg text-gray-800 hover:text-[#FC8019] transition-colors duration-300"
							>
								Dishes
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/about"}
								className="text-lg text-gray-800 hover:text-[#FC8019] transition-colors duration-300"
							>
								About Us
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/contact"}
								className="text-lg text-gray-800 hover:text-[#FC8019] transition-colors duration-300"
							>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>
				{/* navbar for mobile */}
				<div className="flex items-center gap-4 sm:gap-6">
					<div className="relative w-10 h-10 sm:w-12 sm:h-12">
						<button
							onClick={handleShowCart}
							className="flex justify-center items-center text-[#202020] hover:opacity-75"
						>
							<figure className="w-7 h-7 sm:w-9 sm:h-9">
								<img
									src="/images/icon/Cart.svg"
									alt="Cart"
									className="w-full h-full object-cover"
								/>
								{cartItems.length > 0 && (
									<span className="absolute -top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#FC8019] text-white text-xs rounded-full flex justify-center items-center">
										{cartItems.length}
									</span>
								)}
							</figure>
						</button>
						{showCart && (
							<div
								ref={cartRef}
								className="absolute top-12 sm:top-16 right-0 z-20 min-w-[250px] sm:min-w-[300px]"
							>
								<section className="p-4 sm:p-5 bg-slate-50 rounded-[10px]">
									{cartItems.length === 0 ? (
										<p className="text-center text-gray-500">
											Your cart is empty
										</p>
									) : (
										products.map((product, index) => (
											<div
												key={index}
												className="flex gap-2 sm:gap-4 mb-2 sm:mb-4"
											>
												<img
													src={product.image}
													alt={product.title}
													className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
												/>
												<div>
													<p className="font-bold text-sm sm:text-base">
														{product.title}
													</p>
													<p className="text-xs sm:text-sm text-gray-600">
														${product.price}
													</p>
												</div>
												<button
													onClick={() => handleDeleteItem(product.id)}
													className="text-red-500 hover:text-red-700"
												>
													<FontAwesomeIcon icon={faTrash} />
												</button>
											</div>
										))
									)}

									<Link
										to={cartItems.length === 0 ? "#" : "/PaymentPage"}
										className="btnPrimary mt-4"
									>
										Go to Payment
									</Link>
								</section>
							</div>
						)}
					</div>
					<div className="flex gap-2">
						{isLoggedIn ? (
							<>
								<section
									className="w-8 h-8 sm:w-10 sm:h-10 relative"
									ref={userRef}
								>
									<button onClick={handleShowUser}>
										<figure className="w-8 h-8 sm:w-10 sm:h-10">
											<img
												src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt={user.name}
												className="w-full h-full object-cover rounded-[10px]"
											/>
										</figure>
									</button>
									<div
										className={`${
											infoUser ? "absolute" : "hidden"
										} top-12 sm:top-15 right-0 z-20 transition delay-400 duration-300 ease-in-out`}
									>
										<section className="p-4 sm:p-5 bg-slate-50 rounded-[10px]">
											<div className="flex flex-col gap-4 sm:gap-5">
												<p className="text-sm sm:text-base font-normal">
													{user.email}
												</p>
												<figure className="flex justify-center items-center">
													<img
														src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
														alt={user.name}
														className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
													/>
												</figure>
												<h2 className="text-lg sm:text-xl font-semibold min-w-60 text-center">
													Hi, {user.name} !
												</h2>
												<Link
													to={{
														pathname: "/UserPage",
														state: { user },
													}}
													className="px-6 sm:px-9 py-2 border-2 border-[#FC8019] text-sm sm:text-base font-normal rounded-full hover:opacity-60"
												>
													Manage your account
												</Link>
												<button
													onClick={handleLogout}
													className="px-8 sm:px-10 py-2 bg-[#FC8019] text-white rounded-[10px] hover:opacity-60"
												>
													Logout
												</button>
											</div>
										</section>
									</div>
								</section>
							</>
						) : (
							<>
								<Link to={"/SignUpPage"} className="btnPrimary opacity-55">
									Sign Up
								</Link>
								<Link to={"/LoginPage"} className="btnPrimary">
									Sign In
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
