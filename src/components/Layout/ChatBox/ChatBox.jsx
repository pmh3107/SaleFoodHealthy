import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faComments } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Chatbox() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSend = () => {
		if (input.trim()) {
			setMessages([...messages, { text: input, sender: "user" }]);
			setInput("");
		}
	};

	return (
		<div className="fixed bottom-4 right-4 flex flex-col items-end">
			<button
				className="bg-[#FC8019] text-white p-4 rounded-full shadow-lg hover:bg-[#e56e00] focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<FontAwesomeIcon icon={faComments} size="lg" />
			</button>
			{isOpen && (
				<div className="w-80 bg-white rounded-lg shadow-lg mt-4">
					<div className="p-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold">Chat with us</h2>
					</div>
					<div className="p-4 h-64 overflow-y-auto">
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`mb-2 ${
									msg.sender === "user" ? "text-right" : "text-left"
								}`}
							>
								<span
									className={`inline-block p-2 rounded-lg ${
										msg.sender === "user"
											? "bg-[#FC8019] text-white"
											: "bg-gray-200 text-black"
									}`}
								>
									{msg.text}
								</span>
							</div>
						))}
					</div>
					<div className="p-4 border-t border-gray-200 flex items-center">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type a message..."
							className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none"
						/>
						<button
							onClick={handleSend}
							className="ml-2 bg-[#FC8019] text-white p-2 rounded-lg hover:bg-[#e56e00] focus:outline-none"
						>
							<FontAwesomeIcon icon={faPaperPlane} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
