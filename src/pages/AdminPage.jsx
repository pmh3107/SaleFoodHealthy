import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Layout/Header/HeaderAdmin";
import { checkAdminAuthState } from "../service/Authentication";
import PropTypes from "prop-types";
export default function AdminPage() {
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		checkAdminAuthState((isAdminState) => {
			setIsAdmin(isAdminState);
			if (!isAdminState) {
				navigate("/loginAdminPage");
			}
		});
	}, [navigate]);

	if (!isAdmin) {
		return null;
	}

	return (
		<div className="flex">
			<HeaderAdmin />
			<Outlet />
			<footer></footer>
		</div>
	);
}

AdminPage.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
};
