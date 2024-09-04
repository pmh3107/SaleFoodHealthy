import { fireStore } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";

const ordersCollection = collection(fireStore, "orders");

export const addOrder = async (orderData) => {
	try {
		await addDoc(ordersCollection, orderData);
	} catch (error) {
		console.error("Error adding order: ", error);
	}
};
