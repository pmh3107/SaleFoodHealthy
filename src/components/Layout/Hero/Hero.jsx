import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const images = [
		"https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
		"https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGhlYWx0aHl8ZW58MHx8MHx8fDA%3D",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [images.length]);
	const navigate = useNavigate();
	return (
		<div className="my-16 flex flex-col lg:flex-row relative max-md:mb-10">
			<img
				src="/images/hero-icon-left.png"
				alt=""
				className="absolute -left-60 top-10 hidden lg:block"
			/>
			<section className="pt-10 pr-16 flex flex-col gap-8 z-10 bg-white max-md:p-0">
				<header className="text-[#202020] font-medium text-4xl lg:text-6xl">
					<h1 className="leading-normal">
						Premium <span className="text-[#FC8019]">quality</span>
					</h1>
					<div className="flex items-center gap-5 mt-2">
						<h2 className="leading-normal w-[250px] lg:w-[400px]">
							Food for your
						</h2>
						<div className="w-32 flex gap-2 flex-col justify-center items-center py-5 pr-12 bg-[#FFEDD0] rounded-[50px] ">
							<img
								src="/images/hero-banana.svg"
								alt="Banana icon"
								className="w-6 h-6 lg:w-11 lg:h-11"
							/>
						</div>
						<h2 className="text-[#FC8019]">healthy</h2>
					</div>
					<div className="flex items-center gap-5 mt-2">
						<div className="w-32 flex gap-2 flex-col justify-center items-center pt-1 pb-5 px-7 bg-[#FFD0D0] rounded-[50px] ">
							<img
								className="w-6 h-6 lg:w-12 lg:h-12"
								src="/images/hero-tomato.svg"
								alt="Tomato icon"
							/>
						</div>
						<h2 className="text-[#FC8019]">& Daily Life</h2>
					</div>
				</header>

				<p className="w-full lg:w-[712px] text-[#404040] text-base font-normal max-md:hidden">
					Discover the finest selection of fresh, organic produce and gourmet
					ingredients, carefully curated to bring out the best in every meal.
					Whether you are looking to eat healthier, explore new flavors, or
					simply enjoy the convenience of quality food delivered to your
					doorstep, we&apos;ve got you covered.
				</p>

				<form
					className="flex flex-col lg:flex-row gap-5"
					onSubmit={(e) => {
						e.preventDefault();
						const keyword = e.target.elements.search.value;
						navigate(`/searchPage?keyword=${keyword}`);
					}}
				>
					<input
						type="text"
						name="search"
						placeholder="Enter your dishes name"
						className="rounded-[10px] border-[1px] border-[#808080] bg-white py-4 px-6 w-full lg:w-[622px]"
					/>
					<button type="submit" className="btnPrimary">
						Get Started
					</button>
				</form>

				<article className="flex gap-8 flex-col items-start">
					<p className="text-[#404040] text-base font-medium">
						Restaurant in Ho Chi Minh City
					</p>
					<ul className="text-[#808080] text-base font-normal flex flex-wrap justify-center items-center gap-5">
						<li>District 1</li>
						<li className="text-[#FC8019BF]">District 5</li>
						<li>District 7</li>
						<li className="text-[#FC8019BF]">Thu Duc</li>
						<li>Phu Nhuan</li>
					</ul>
				</article>
			</section>

			{/* IMG SLIDER */}
			<section className="flex max-w-[1120px] h-[640px] max-md:hidden">
				<div
					className="flex gap-10 transition-transform duration-700 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 32}%)` }}
				>
					{images.map((src, index) => (
						<figure
							key={index}
							className={`flex-shrink-0 w-[400px] h-[600px] transition-transform duration-700 ease-in-out ${
								currentIndex === index ? "scale-100" : "scale-75"
							}`}
						>
							<img
								src={src}
								alt={`Slide ${index}`}
								className="w-full h-full object-cover rounded-[20px]"
							/>
						</figure>
					))}
				</div>
			</section>
		</div>
	);
}

export default Hero;
