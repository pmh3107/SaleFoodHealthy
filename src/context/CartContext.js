import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			return [...state, action.payload];
		case "REMOVE_ITEM":
			return state.filter((item) => item.id !== action.payload.id);
		case "UPDATE_ITEM":
			return state.map((item) =>
				item.id === action.payload.id
					? { ...item, quantity: action.payload.quantity }
					: item
			);
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(cartReducer, []);

	return (
		<CartContext.Provider value={{ cart, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
