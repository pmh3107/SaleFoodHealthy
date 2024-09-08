import { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<header></header>
					<main className="w-screen h-screen  bg-slate-200/70 flex flex-col items-center justify-center">
						<div className="flex items-center">
							<div className="relative">
								<img src="/images/ErrorPage.png" alt="" />
								<a
									href="/"
									className="absolute -right-20 bottom-0 bg-[#FCD980] hover:bg-yellow-200 px-10 py-3 rounded-md text-[#282938] text-lg font-bold flex gap-2 justify-center items-center"
								>
									{" "}
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

		return this.props.children;
	}
}
ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};
export default ErrorBoundary;
