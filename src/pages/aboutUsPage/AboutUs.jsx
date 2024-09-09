export default function AboutUs() {
	return (
		<main className="max-w-screen-2xl mx-auto px-12 py-16">
			<section className="text-center mb-12">
				<h1 className="text-5xl font-bold text-[#FC8019]">About Us</h1>
				<p className="text-xl text-[#202020] mt-4">
					Welcome to FreshFood, your number one source for all things healthy
					and delicious. We&apos;re dedicated to providing you the very best of
					organic food, with an emphasis on quality, freshness, and customer
					service.
				</p>
			</section>
			<section className="flex flex-col lg:flex-row gap-12">
				<div className="lg:w-1/2">
					<img
						src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
						alt="Restaurant"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div className="lg:w-1/2 flex flex-col justify-center">
					<h2 className="text-3xl font-semibold text-[#202020] mb-4">
						Our Story
					</h2>
					<p className="text-lg text-[#404040] mb-4">
						Founded in 2021 by John Doe, FreshFood has come a long way from its
						beginnings in a small kitchen. When John first started out, his
						passion for healthy eating drove him to start his own business.
					</p>
					<p className="text-lg text-[#404040]">
						We now serve customers all over the city and are thrilled that
						we&apos;re able to turn our passion into our own website. We hope
						you enjoy our products as much as we enjoy offering them to you.
					</p>
				</div>
			</section>
			<section className="mt-16">
				<h2 className="text-3xl font-semibold text-[#202020] text-center mb-8">
					Our Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="p-6 bg-white shadow-lg rounded-lg text-center">
						<h3 className="text-2xl font-semibold text-[#FC8019] mb-4">
							Quality Ingredients
						</h3>
						<p className="text-lg text-[#404040]">
							We use only the freshest and highest quality ingredients in all of
							our dishes.
						</p>
					</div>
					<div className="p-6 bg-white shadow-lg rounded-lg text-center">
						<h3 className="text-2xl font-semibold text-[#FC8019] mb-4">
							Fast Delivery
						</h3>
						<p className="text-lg text-[#404040]">
							Enjoy our delicious meals delivered to your doorstep in no time.
						</p>
					</div>
					<div className="p-6 bg-white shadow-lg rounded-lg text-center">
						<h3 className="text-2xl font-semibold text-[#FC8019] mb-4">
							Excellent Service
						</h3>
						<p className="text-lg text-[#404040]">
							Our team is dedicated to providing you with the best service
							possible.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
