import { createContext, useContext, useState, useEffect } from "react";
import {
	getCartItems,
	addItemToCart,
	removeItemFromCart,
} from "../service/Cart";
import { auth, onAuthStateChanged } from "../service/Firebase";
import PropTypes from "prop-types";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
				fetchCartItems(user.uid);
			} else {
				setUserId(null);
				setCartItems([]);
			}
		});
		return () => unsubscribe();
	}, []);

	const fetchCartItems = async (uid) => {
		const items = await getCartItems(uid);
		setCartItems(items);
	};

	const addToCart = async (itemId) => {
		if (userId) {
			const success = await addItemToCart(userId, itemId);
			if (success) {
				setCartItems((prevItems) => [...prevItems, itemId]);
			}
		}
	};

	const removeFromCart = async (itemId) => {
		if (userId) {
			const success = await removeItemFromCart(userId, itemId);
			if (success) {
				setCartItems((prevItems) => prevItems.filter((id) => id !== itemId));
			}
		}
	};

	return (
		<UserContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
			{children}
		</UserContext.Provider>
	);
};
UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
