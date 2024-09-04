import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function PickDateTime({ onDetailsChange }) {
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
		onDetailsChange({ dateTime: `${event.target.value} ${time}` });
	};

	const handleTimeChange = (event) => {
		setTime(event.target.value);
		onDetailsChange({ dateTime: `${date} ${event.target.value}` });
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

function SelectionAddressDateTime({ userData, onDetailsChange }) {
	const [user, setUser] = useState([]);
	const [orderType, setOrderType] = useState("dine-in");

	useEffect(() => {
		setUser(userData);
		setTimeout(() => {
			onDetailsChange({ name: userData.name, phone: userData.phone });
		}, 5000);
	}, [userData, onDetailsChange]);

	const handleOrderTypeChange = (type) => {
		setOrderType(type);
		onDetailsChange({ orderType: type });
	};

	const handleNumberOfPeopleChange = (event) => {
		onDetailsChange({ numberOfPeople: event.target.value });
	};

	return (
		<div className="w-2/3">
			<div className="flex gap-8 py-10">
				<button
					className={`px-6 py-4 rounded-[10px] text-[#404040] flex gap-[10px] items-center justify-center ${
						orderType === "dine-in"
							? "bg-[#FC8019] text-white"
							: "border-[#FC8019] border-2 border-dashed "
					}`}
					onClick={() => handleOrderTypeChange("dine-in")}
				>
					<FontAwesomeIcon icon={faCalendarDays} />
					<p className="text-base font-medium">Dine In</p>
				</button>
				<button
					className={`px-6 py-4 rounded-[10px] text-[#404040] flex gap-[10px] items-center justify-center ${
						orderType === "takeaway"
							? "bg-[#FC8019] text-white"
							: "border-[#FC8019] border-2 border-dashed "
					}`}
					onClick={() => handleOrderTypeChange("takeaway")}
				>
					<FontAwesomeIcon icon={faCalendarDays} />
					<p className="text-base font-medium">Takeaway</p>
				</button>
			</div>
			<div>
				<h2 className="text-[#202020] text-2xl font-semibold">
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-[#FC8019] mr-4"
					/>
					{orderType === "takeaway" ? "Delivery address" : "Restaurant address"}
				</h2>
				{orderType === "takeaway" ? (
					<div className="flex gap-8 mt-7">
						<section className="bg-[#FC8019] max-w-[370px] p-6 rounded-[10px] text-white flex flex-col items-start gap-5">
							<FontAwesomeIcon
								icon={faLocationDot}
								className=" mr-4 text-3xl"
							/>
							<p className="text-base font-medium">{user.address}</p>
						</section>
					</div>
				) : (
					<div className="flex gap-8 mt-7">
						<section className="bg-[#FC8019] max-w-[370px] p-6 rounded-[10px] text-white flex flex-col items-start gap-5">
							<FontAwesomeIcon
								icon={faLocationDot}
								className=" mr-4 text-3xl"
							/>
							<p className="text-base font-medium">
								10 Ten Lua, Tan Binh, Ho Chi Minh City
							</p>
						</section>
					</div>
				)}
			</div>
			<div className="py-12">
				<h2 className="text-[#202020] text-2xl font-semibold">
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-[#FC8019] mr-4"
					/>
					Type of Order
				</h2>

				{orderType === "dine-in" ? (
					<div className="mt-7">
						<PickDateTime onDetailsChange={onDetailsChange} />
						<div className="mt-10 flex gap-3 border-b-[1px] border-[#808080] items-center">
							<label
								htmlFor="number-of-people"
								className="text-black font-medium mb-2"
							>
								Number of People
							</label>
							<input
								type="number"
								id="number-of-people"
								name="number-of-people"
								min="1"
								className="border-none text-gray-500 px-6 pb-4 focus:outline-none"
								onChange={handleNumberOfPeopleChange}
							/>
						</div>
					</div>
				) : (
					<PickDateTime onDetailsChange={onDetailsChange} />
				)}
			</div>
		</div>
	);
}

SelectionAddressDateTime.propTypes = {
	userData: PropTypes.object.isRequired,
	onDetailsChange: PropTypes.func.isRequired,
};
PickDateTime.propTypes = {
	onDetailsChange: PropTypes.func.isRequired,
};

export default SelectionAddressDateTime;
