import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNewUser } from "../../../service/Authentication";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate();
	const { setLoading } = useOutletContext();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!name || !email || !password || !confirmPassword) {
			toast.error("Please fill in all fields");
			return;
		}

		// Simple email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		const userData = { name, email, address, phone };

		try {
			setLoading(true);
			const user = await createNewUser(email, password, userData);
			if (user) {
				toast("Successfully signed up. Please log in to continue.");
				navigate("/LoginPage");
			} else {
				toast.error("Sign up failed. Please try again.");
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="px-12">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col">
					<input
						type="text"
						id="signUp-name"
						name="name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name ...."
						className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<input
						type="email"
						id="signUp-email"
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
						type="phone"
						id="signUp-phone"
						name="phone"
						required
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Enter your phone number ...."
						className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<input
						type="text"
						id="signUp-address"
						name="address"
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Enter your address ...."
						className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<input
						type="password"
						id="signUp-password"
						name="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password ...."
						className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<input
						type="password"
						id="signUp-confirm-password"
						name="confirmPassword"
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm your password ...."
						className="border-b-2 border-[#808080] px-4 py-3 mt-1 text-[#202020] focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					className="mt-6 text-white font-medium text-2xl bg-[#FC8019] px-6 py-3 rounded-[10px] hover:opacity-70"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
