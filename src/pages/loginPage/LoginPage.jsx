import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Login from "../../components/Layout/LogInSignUp/LogIn";
import SignUp from "../../components/Layout/LogInSignUp/SignUp";

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<header className="max-w-screen-2xl mx-auto px-12 py-10">
				<Link
					to={"/"}
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
							src="https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Side visual"
							className="w-full h-full object-cover rounded-l-[10px]"
						/>
					</figure>

					<section className="w-1/2 p-12 flex flex-col justify-center">
						<h2 className="text-5xl text-[#202020] font-medium mb-20">
							Welcome to <span className="text-[#FC8019]">Fresh Food</span> !
						</h2>
						<ul className="flex items-center gap-8 mb-10 mx-auto">
							<li
								className={`px-4 cursor-pointer border-b-2 ${
									isLogin ? "border-[#202020]" : "border-transparent"
								} text-2xl text-[#202020] font-medium pb-2`}
								onClick={() => setIsLogin(true)}
							>
								LogIn
							</li>
							<li
								className={`px-4 cursor-pointer border-b-2 ${
									!isLogin ? "border-[#202020]" : "border-transparent"
								} text-2xl text-[#202020] font-medium pb-2`}
								onClick={() => setIsLogin(false)}
							>
								SignUp
							</li>
						</ul>
						{isLogin ? <Login /> : <SignUp />}
					</section>
				</div>
			</main>
			<footer></footer>
		</>
	);
}
