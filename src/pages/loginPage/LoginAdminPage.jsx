import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAdminUser } from "../../service/Authentication";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LoginAdminPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const user = await loginAdminUser({ email, password });
			if (user && user.isAdmin) {
				navigate("/admin/home");
			} else {
				toast.error("Access denied. Admins only.");
			}
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
			console.error("Login failed:", error);
		}
	};

	return (
		<>
			<header className="max-w-screen-2xl mx-auto px-12 py-10">
				<Link
					to="/"
					className="text-[#FC8019] font-medium text-lg hover:text-[#F54B4B]"
				>
					<FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
					Back to HomePage
				</Link>
			</header>
			<main className="max-w-screen-2xl mx-auto px-12 h-screen flex">
				<div className="w-full h-[80vh] rounded-[10px] shadow-md flex">
					<figure className="w-1/2 h-full">
						<img
							src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Side visual"
							className="w-full h-full object-cover rounded-l-[10px]"
						/>
					</figure>
					<section className="w-1/2 p-12 flex flex-col justify-center">
						<h2 className="text-5xl text-[#202020] font-medium  text-center">
							Welcome <span className="text-[#FC8019]">Admin</span>!
						</h2>
						<p className="text-center text-lg font-normal text-[#202020] opacity-50 mb-10 mt-5">
							Enter your <strong>admin account</strong> to access the admin
							panel.
						</p>
						<div className="px-12">
							<form onSubmit={handleSubmit} className="flex flex-col gap-6">
								<div className="flex flex-col">
									<input
										type="email"
										id="login-email"
										name="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email ...."
										className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<input
										type="password"
										id="login-password"
										name="password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter your password ...."
										className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
									/>
								</div>
								<button
									type="submit"
									className="mt-6 text-white font-medium text-2xl bg-[#FC8019] px-6 py-3 rounded-[10px] hover:opacity-70"
								>
									Log In
								</button>
							</form>
						</div>
					</section>
				</div>
			</main>
			<footer></footer>
		</>
	);
}
