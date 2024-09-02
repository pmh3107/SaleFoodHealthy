import { useState } from "react";
import FoodCard from "../../common/FoodCard";
import PropTypes from "prop-types";
import { Button } from "antd";

function AllFoods({ products }) {
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 4;
	const totalPages = Math.ceil(products.length / productsPerPage);
	const currentProducts = products.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	return (
		<div className="max-w-screen-2xl mx-auto px-12 mt-36">
			<h2 className="text-[#202020] text-2xl font-medium mb-7">All dishes</h2>
			<div className="grid grid-cols-4 gap-4">
				{currentProducts.map((item, index) => (
					<FoodCard key={index} item={item} />
				))}
			</div>
			<div className="flex justify-center mt-8">
				<Button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className="mx-2"
				>
					Previous
				</Button>
				<span className="mx-4">
					Page {currentPage} of {totalPages}
				</span>
				<Button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="mx-2"
				>
					Next
				</Button>
			</div>
		</div>
	);
}

AllFoods.propTypes = {
	products: PropTypes.array.isRequired,
};

export default AllFoods;
