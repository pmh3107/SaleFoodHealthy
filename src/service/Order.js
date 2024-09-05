import { fireStore } from "./Firebase";
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	getDocs,
} from "firebase/firestore";

const ordersCollection = collection(fireStore, "orders");

export const getOrders = async () => {
	try {
		const ordersSnapshot = await getDocs(ordersCollection);
		const orders = ordersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return orders;
	} catch (error) {
		console.error("Error fetching orders: ", error);
		throw error;
	}
};

export const addOrder = async (orderData) => {
	try {
		const orderRef = await addDoc(ordersCollection, orderData);
		return { id: orderRef.id };
	} catch (error) {
		console.error("Error adding order: ", error);
		throw error;
	}
};

export const updateOrder = async (id, orderData) => {
	try {
		const orderRef = doc(fireStore, "orders", id);
		await updateDoc(orderRef, orderData);
	} catch (error) {
		console.error("Error updating order: ", error);
		throw error;
	}
};

export const deleteOrder = async (id) => {
	try {
		const orderRef = doc(fireStore, "orders", id);
		await deleteDoc(orderRef);
	} catch (error) {
		console.error("Error deleting order: ", error);
		throw error;
	}
};
