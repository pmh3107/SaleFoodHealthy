import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/Authentication";
import { getUserData } from "../../../service/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		// Simple email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email");
			return;
		}

		try {
			const user = await loginUser(email, password);
			console.log("User logged in:", user.uid);
			const userData = await getUserData(user.uid);
			console.log(userData);
			if (user) {
				navigate("/", { state: { userData } });
			} else {
				toast.error("Login failed. Please check your credentials.");
			}
		} catch (error) {
			console.log(error);
			toast.error("An error occurred. Please try again later.");
		}
	};

	return (
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
				<span className="text-xl font-normal text-[#202020] opacity-50 w-full text-center">
					or
				</span>
				<button className="font-medium text-xl flex justify-center items-center gap-2 text-[#202020] hover:opacity-75">
					LogIn with Google <img src="/images/google-icon.svg" alt="" />
				</button>
			</form>
		</div>
	);
}
