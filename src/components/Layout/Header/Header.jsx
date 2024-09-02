import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { checkAuthState, logoutUser } from "../../../service/Authentication";

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [infoUser, setInfoUser] = useState(false);
	const userRef = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		checkAuthState((loggedIn, user) => {
			setIsLoggedIn(loggedIn);
			setUser(user);
		});
		const handleClickOutside = (event) => {
			if (userRef.current && !userRef.current.contains(event.target)) {
				setInfoUser(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
	};

	const handleShowUser = (e) => {
		e.preventDefault();
		setInfoUser((prev) => !prev);
	};

	return (
		<header className="max-w-screen-2xl mx-auto px-12 my-16">
			<nav
				className="flex justify-between items-center"
				aria-label="Main Navigation"
			>
				{/* Logo */}
				<a
					href="/"
					className="flex items-center gap-2"
					aria-label="FastFOOD Home"
				>
					<FontAwesomeIcon
						className="text-2xl text-[#FC8019]"
						icon={faPlateWheat}
					/>
					<h1 className="font-bold text-2xl">FastFOOD</h1>
				</a>

				{/* Navbar */}
				<div className="flex items-center gap-6">
					<form
						className="flex justify-between w-[450px] px-6 py-3 rounded-[10px] border-[1px] border-[#808080] opacity-75 bg-white"
						role="search"
					>
						<label htmlFor="search" className="sr-only">
							Search for items or restaurants
						</label>
						<input
							id="search"
							className="text-base font-normal w-full focus:outline-none placeholder-[#808080]"
							type="text"
							placeholder="Enter item or restaurant you are looking for"
						/>
						<button aria-label="Search" type="submit">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</form>

					<a
						href="/cart"
						className="w-12 h-12 flex justify-center items-center text-[#202020] hover:opacity-75"
						aria-label="View Cart"
					>
						<img src="/images/icon/Cart.svg" alt="Cart" />
					</a>
					<div className="flex gap-2">
						{isLoggedIn ? (
							<>
								<section className="w-10 h-10 relative" ref={userRef}>
									<button onClick={handleShowUser}>
										<figure className="w-10 h-10">
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
										} top-15 right-0 z-20`}
									>
										<section className="transition delay-150 duration-300 ease-in-out p-5 bg-slate-50 rounded-[10px]">
											<div className="flex flex-col gap-5">
												<p className="text-base font-normal">{user.email}</p>
												<figure className="flex justify-center items-center">
													<img
														src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
														alt={user.name}
														className="w-20 h-20 object-cover rounded-full"
													/>
												</figure>
												<h2 className="text-xl font-semibold min-w-60 text-center">
													Hi, {user.name} !
												</h2>
												<Link
													to={{
														pathname: "/UserPage",
														state: { user },
													}}
													className="px-9 py-2 border-2 border-[#FC8019] text-base font-normal rounded-full hover:opacity-60"
												>
													Manage your account
												</Link>
												<button
													onClick={handleLogout}
													className="px-10 py-2 bg-[#FC8019] text-white rounded-[10px] hover:opacity-60"
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
