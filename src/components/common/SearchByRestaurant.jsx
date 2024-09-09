import { useNavigate } from "react-router-dom";

function SearchByRestaurant() {
	const navigate = useNavigate();

	return (
		<div className="bg-[#FC8019] my-28 max-md:hidden">
			<div className="max-w-screen-2xl mx-auto py-20 flex gap-8 items-center justify-center">
				<h2 className="flex items-center justify-center text-white text-2xl font-semibold gap-7">
					Search by Restaurant <img src="/images/search.svg" alt="" />
				</h2>

				<form
					className="flex gap-5"
					onSubmit={(e) => {
						e.preventDefault();
						const keyword = e.target.elements.search.value;
						navigate(`/searchPage?keyword=${keyword}`);
					}}
				>
					<input
						type="text"
						name="search"
						placeholder="Enter item or restaurant you are looking for"
						className="text-sm placeholder-[rgba(255, 255, 255, 0.50)]  text-white bg-transparent border-[1px] border-white w-[622px] px-6 py-4 rounded-[10px] focus:outline-none"
					/>
					<button type="submit" className="btnPrimary">
						Search Now
					</button>
				</form>
			</div>
		</div>
	);
}
export default SearchByRestaurant;
