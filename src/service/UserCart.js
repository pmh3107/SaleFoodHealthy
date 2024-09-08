import { fireStore } from "./Firebase";
import {
	doc,
	setDoc,
	getDoc,
	arrayUnion,
	arrayRemove,
	collection,
} from "firebase/firestore";

const userCollection = collection(fireStore, "users");

export const addItemToCart = async (uid, itemId) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, { carts: arrayUnion(itemId) }, { merge: true });
		return true;
	} catch (error) {
		console.error("Error adding item to cart:", error);
		return false;
	}
};

export const removeItemFromCart = async (uid, itemId) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, { carts: arrayRemove(itemId) }, { merge: true });
		return true;
	} catch (error) {
		console.error("Error removing item from cart:", error);
		return false;
	}
};

export const getCartItems = async (uid) => {
	try {
		const userDoc = doc(userCollection, uid);
		const userSnapshot = await getDoc(userDoc);
		if (userSnapshot.exists()) {
			return userSnapshot.data().carts || [];
		} else {
			console.error("No such user!");
			return [];
		}
	} catch (error) {
		console.error("Error fetching cart items:", error);
		return [];
	}
};
