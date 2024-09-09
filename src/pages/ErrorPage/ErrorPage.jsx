import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
function ErrorPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<header></header>
			<main className="w-screen h-screen bg-white flex flex-col items-center justify-center">
				<div className="flex items-center">
					<div className="relative">
						<img src="/images/ErrorPage.png" alt="" />
						<a
							href="/"
							className="absolute -right-20 bottom-0 bg-[#FC8019] hover:bg-[#FFEDD0] px-10 py-3 rounded-md text-[#202020] text-lg font-bold flex gap-2 justify-center items-center"
						>
							<FontAwesomeIcon icon={faArrowLeft} className="" />
							Back to Home Page
						</a>
					</div>
				</div>
			</main>
			<footer></footer>
		</>
	);
}

export default ErrorPage;
