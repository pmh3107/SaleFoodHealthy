import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuthState } from "../service/Authentication";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		checkAdminAuthState((isAdminState) => {
			if (!isAdminState) {
				navigate("/loginAdminPage");
			} else {
				setIsAdmin(true);
			}
		});
	}, [navigate]);

	if (!isAdmin) {
		return null;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
