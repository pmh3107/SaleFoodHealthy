import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OrderSummaryPage = () => {
	return (
		<main className="px-16 py-14 flex flex-col justify-center overflow-hidden max-md:px-2">
			<div className="px-20 py-20 flex items-center justify-center gap-40 bg-white shadow-lg overflow-hidden h-full w-full max-lg:flex-col">
				<div>
					<img src="/images/imgThanks.png" alt="" />
				</div>
				<div>
					<div>
						<h1 className="text-5xl font-bold text-[#FC8019] mb-2">
							Congratulations,
						</h1>
						<h1 className="text-5xl font-semibold text-[#FC8019]">
							you have successfully ordered!
						</h1>
					</div>
					<p className="max-w-[700px] text-[#202020] text-xl opacity-70 py-7">
						Thank you for choosing FreshFood, your Order will be processed and
						sent to your User page as soon as possible.
					</p>
					<button className="bottom-0 bg-[#FC8019] hover:bg-[#e07b17] px-10 py-3 rounded-md text-white text-lg font-medium flex gap-2 justify-center items-center">
						<FontAwesomeIcon icon={faArrowLeft} className="" />
						<Link to="/UserPage" className="">
							Go to User Page
						</Link>
					</button>
				</div>
			</div>
		</main>
	);
};
export default OrderSummaryPage;
