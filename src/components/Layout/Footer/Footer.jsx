import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlateWheat } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-[#FC8019] text-white">
			<div className="h-80 max-w-screen-2xl mx-auto px-12 mt-16 flex items-center justify-center flex-col">
				<div className="w-full flex justify-between items-center">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<FontAwesomeIcon className="text-2xl" icon={faPlateWheat} />
						<h1 className="font-bold text-2xl">FastFOOD</h1>
					</div>

					{/* Navigation Links */}
					<nav aria-label="Footer Navigation">
						<ul className="flex gap-16 text-base font-medium">
							<li className="hover:opacity-50">
								<Link to={"/about"}>About Us</Link>
							</li>
							<li className="hover:opacity-50">
								<Link to={"/delivery"}>Delivery</Link>
							</li>
							<li className="hover:opacity-50">
								<Link to={"/support"}>Help & Support</Link>
							</li>
							<li className="hover:opacity-50">
								<Link to={"/terms"}>T&C</Link>
							</li>
						</ul>
					</nav>

					{/* Contact Info */}
					<div>
						<p className="text-sm font-medium">
							Contact:
							<strong className="ml-2 text-base font-semibold">
								<a href="tel:+911234567899" aria-label="Phone Number">
									+91 1234567899
								</a>
							</strong>
						</p>
					</div>
				</div>

				{/* Social Media Links */}
				<div className="flex items-center mt-9 gap-5">
					<a
						className="hover:opacity-50"
						href="https://www.facebook.com"
						aria-label="Facebook"
					>
						<img src="/images/icon/Facebook.svg" alt="Facebook" />
					</a>
					<a
						className="hover:opacity-50"
						href="https://www.instagram.com"
						aria-label="Instagram"
					>
						<img src="/images/icon/Instagram.svg" alt="Instagram" />
					</a>
					<a
						className="hover:opacity-50"
						href="https://www.twitter.com"
						aria-label="X"
					>
						<img src="/images/icon/x.svg" alt="Twitter/X" />
					</a>
				</div>
			</div>
		</footer>
	);
}
