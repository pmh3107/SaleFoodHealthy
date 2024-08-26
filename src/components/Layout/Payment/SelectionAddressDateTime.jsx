import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

function PickDateTime() {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	useEffect(() => {
		const now = new Date();
		const formattedDate = now.toISOString().split("T")[0];
		setDate(formattedDate);
		const formattedTime = now.toTimeString().slice(0, 5);
		setTime(formattedTime);
	}, []);

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

	return (
		<div className="flex justify-between items-center w-[500px] mt-[75px]">
			<div className="flex flex-col gap-3 border-b-[1px] border-[#808080] items-center">
				<label htmlFor="delivery-date" className="text-black font-medium mb-2">
					Date of delivery
				</label>
				<div className="flex items-center">
					<input
						type="date"
						id="delivery-date"
						name="delivery-date"
						value={date}
						min={date}
						onChange={handleDateChange}
						className="border-none text-gray-500 px-6 pb-4 "
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div className=" flex flex-col gap-3 border-b-[1px] border-[#808080] items-center">
					<label
						htmlFor="delivery-time"
						className="text-black font-medium mb-2 text-start"
					>
						Time of delivery
					</label>
					<div className="flex items-center px-6 pb-4">
						<input
							type="time"
							id="delivery-time"
							name="delivery-time"
							value={time}
							min={
								date === new Date().toISOString().split("T")[0]
									? time
									: undefined
							}
							onChange={handleTimeChange}
							className="border-none text-gray-500 "
						/>
					</div>
				</div>
				<span className="text-[#FC8019] text-base  font-medium mt-5">
					24 hrs
				</span>
			</div>
		</div>
	);
}

function SelectionAddressDateTime() {
	return (
		<div className="w-2/3">
			<div>
				<h2 className="text-[#202020] text-2xl font-semibold">
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-[#FC8019] mr-4"
					/>
					Delivery address
				</h2>
				<div className="flex gap-8 mt-7">
					<section className="bg-[#FC8019] max-w-[370px] p-6 rounded-[10px] text-white flex flex-col items-start gap-5">
						<FontAwesomeIcon icon={faLocationDot} className=" mr-4 text-3xl" />
						<p className="text-base font-medium">
							Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telanganam
						</p>
					</section>
					<section className="max-w-[370px] p-6 rounded-[10px] text-[#404040] flex flex-col items-start gap-5 border-2 border-[#FC8019] border-dashed">
						<FontAwesomeIcon icon={faLocationDot} className=" mr-4 text-3xl" />
						<p className="text-base font-medium">
							Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telanganam
						</p>
					</section>
				</div>
			</div>
			<div className="py-12">
				<h2 className="text-[#202020] text-2xl font-semibold">
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-[#FC8019] mr-4"
					/>
					Type of Order
				</h2>
				<div className="flex gap-8 mt-7">
					<section className="bg-[#FC8019] px-6 py-4 rounded-[10px] text-white flex gap-[10px] items-center justify-center">
						<FontAwesomeIcon icon={faCalendarDays} />
						<p className="text-base font-medium">Schedule Order</p>
					</section>
					<section className="border-[#FC8019] border-2 border-dashed px-6 py-4 rounded-[10px] text-[#404040] flex gap-[10px] items-center justify-center">
						<FontAwesomeIcon icon={faCalendarDays} />
						<p className="text-base font-medium">Order Now</p>
					</section>
					<section className="border-[#FC8019] border-2 border-dashed px-6 py-4 rounded-[10px] text-[#404040] flex gap-[10px] items-center justify-center">
						<FontAwesomeIcon icon={faCalendarDays} />
						<p className="text-base font-medium">Subscription</p>
					</section>
				</div>
				<PickDateTime />
			</div>
		</div>
	);
}
export default SelectionAddressDateTime;
