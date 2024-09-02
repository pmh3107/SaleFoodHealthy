import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
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
					<Link to={"/LoginPage"} className="btnPrimary">
						Sign In
					</Link>
				</div>
			</nav>
		</header>
	);
}
