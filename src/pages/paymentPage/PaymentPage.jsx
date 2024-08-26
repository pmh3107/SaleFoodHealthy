import CardDetail from "../../components/Layout/Payment/CardDetail";
import SelectionAddressDateTime from "../../components/Layout/Payment/SelectionAddressDateTime";

export default function PaymentPage() {
	return (
		<main className="max-w-screen-2xl mx-auto px-12">
			<h1 className="w-full border-b-[1px] text-2xl font-semibold p-[10px] border-[#808080]">
				Secure Checkout
			</h1>
			<div className="flex justify-between py-12">
				{/* selection */}
				<SelectionAddressDateTime />
				{/* card details */}
				<CardDetail />
			</div>
		</main>
	);
}
