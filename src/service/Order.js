import { fireStore, storage } from "./Firebase";
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	getDocs,
	arrayRemove,
} from "firebase/firestore";
import { ref, set, get, remove, onValue, off } from "firebase/database";

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

// Handle order status by realtime database
export const createOrderStatus = async (orderId, infoOrder) => {
	try {
		const orderStatusRef = ref(storage, `orders/${orderId}/status`);
		await set(orderStatusRef, infoOrder);
		console.log(`Order ${orderId} status created with ${infoOrder}`);
	} catch (error) {
		console.error("Error creating order status: ", error);
		throw error;
	}
};

export const getOrderStatus = async (orderId) => {
	try {
		const orderStatusRef = ref(storage, `orders/${orderId}/status`);
		const snapshot = await get(orderStatusRef);
		return snapshot.val();
	} catch (error) {
		console.error("Error getting order status: ", error);
		throw error;
	}
};

export const updateOrderStatus = async (orderId, infoOrder) => {
	try {
		const orderStatusRef = ref(storage, `orders/${orderId}/status`);
		await set(orderStatusRef, infoOrder);
		console.log(`Order ${orderId} status updated to ${infoOrder.state}`);
	} catch (error) {
		console.error("Error updating order status: ", error);
		throw error;
	}
};

export const deleteOrderStatus = async (orderId) => {
	try {
		const orderStatusRef = ref(storage, `orders/${orderId}/status`);
		await remove(orderStatusRef);
		console.log(`Order ${orderId} status deleted`);
	} catch (error) {
		console.error("Error deleting order status: ", error);
		throw error;
	}
};

// Subscribe to order status changes
export const subscribeToOrderStatus = (orderId, callback) => {
	const orderStatusRef = ref(storage, `orders/${orderId}/status`);
	const listener = onValue(orderStatusRef, (snapshot) => {
		const data = snapshot.val();
		if (data) {
			return callback(data);
		} else {
			console.warn("Received invalid status update:", data);
		}
	});
	return () => off(orderStatusRef, listener);
};

// Add this function to remove an order ID from a user's orders
export const removeOrderFromUserOrders = async (userId, orderId) => {
	try {
		const userRef = doc(fireStore, "users", userId);
		await updateDoc(userRef, {
			orders: arrayRemove(orderId), // Ensure you import arrayRemove from firebase/firestore
		});
		console.log(`Order ${orderId} removed from user ${userId}`);
	} catch (error) {
		console.error("Error removing order from user orders:", error);
		throw error;
	}
};
