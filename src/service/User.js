import {
	collection,
	getDoc,
	getDocs,
	doc,
	setDoc,
	deleteDoc,
	arrayUnion,
	arrayRemove,
	updateDoc,
	onSnapshot,
	query,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { fireStore, auth } from "./Firebase";
import {
	createUserWithEmailAndPassword,
	deleteUser as deleteAuthUser,
	updatePassword,
} from "firebase/auth";
const userCollection = collection(fireStore, "users");

const createUser = async (email, password, userData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		const userDoc = doc(userCollection, user.uid);
		await setDoc(userDoc, userData);
		return user;
	} catch (error) {
		console.error("Error creating new user:", error);
		return false;
	}
};

const getUserData = async (uid) => {
	try {
		const userDoc = doc(userCollection, uid);
		const userSnapshot = await getDoc(userDoc);
		if (userSnapshot.exists()) {
			const userData = userSnapshot.data();
			return { id: userSnapshot.id, ...userData };
		} else {
			console.error("No such user!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
};

const getUserOrders = async (uid, lastOrder = null) => {
	try {
		const ordersCollection = collection(fireStore, "orders");
		let ordersQuery = query(
			ordersCollection,
			orderBy("dateTime", "desc"),
			limit(10)
		);

		if (lastOrder) {
			ordersQuery = query(
				ordersCollection,
				orderBy("dateTime", "desc"),
				startAfter(lastOrder),
				limit(10)
			);
		}

		const ordersSnapshot = await getDocs(ordersQuery);
		const orders = ordersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return orders;
	} catch (error) {
		console.error("Error fetching orders:", error);
		return [];
	}
};

const updateUser = async ({ uid, name, phone, address, voucher }) => {
	if (
		typeof name !== "string" ||
		typeof address !== "string" ||
		isNaN(Number(phone)) ||
		typeof voucher !== "boolean"
	) {
		throw new TypeError(
			"Name, address must be strings, and phone must be a number."
		);
	}

	const userRef = doc(fireStore, "users", uid);
	await updateDoc(
		userRef,
		{
			name,
			phone: Number(phone), // Convert phone to number
			address,
			voucher: !!voucher,
		},
		{ merge: true }
	);
	return true;
};

const addItemToCart = async (uid, itemId) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, { carts: arrayUnion(itemId) }, { merge: true });
		return true;
	} catch (error) {
		console.error("Error adding item to cart:", error);
		return false;
	}
};

const getUsers = async () => {
	try {
		const usersSnapshot = await getDocs(userCollection);
		const usersList = usersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return usersList;
	} catch (error) {
		console.error("Error fetching users:", error);
		return null;
	}
};

const addUser = async (email, password, userData) => {
	try {
		const user = await createUser(email, password, userData);
		return user;
	} catch (error) {
		console.error("Error adding user:", error);
	}
};

const deleteUser = async (uid) => {
	try {
		const userDoc = doc(fireStore, "users", uid);
		await deleteDoc(userDoc);
		const user = auth.currentUser;
		if (user && user.uid === uid) {
			await deleteAuthUser(user);
		}
	} catch (error) {
		console.error("Error deleting user:", error);
	}
};

const updateUserPassword = async (newPassword) => {
	try {
		const user = auth.currentUser;
		if (user) {
			await updatePassword(user, newPassword);
			console.log("Password updated successfully");
		} else {
			throw new Error("No user is currently signed in");
		}
	} catch (error) {
		console.error("Error updating password:", error.message);
		throw error;
	}
};

const deleteUserAccount = async () => {
	try {
		const user = auth.currentUser;
		if (user) {
			await deleteAuthUser(user);
			console.log("User account deleted successfully");
		} else {
			throw new Error("No user is currently signed in");
		}
	} catch (error) {
		console.error("Error deleting user account:", error.message);
		throw error;
	}
};

const deleteProductFromUserCart = async (uid, itemId) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, { carts: arrayRemove(itemId) }, { merge: true });
		return true;
	} catch (error) {
		console.error("Error removing item from cart:", error);
		return false;
	}
};

const getUserOrdersByIds = async (orderIds) => {
	try {
		const ordersCollection = collection(fireStore, "orders");
		const ordersPromises = orderIds.map(async (orderId) => {
			const orderDoc = await getDoc(doc(ordersCollection, orderId));
			return { id: orderDoc.id, ...orderDoc.data() };
		});
		const orders = await Promise.all(ordersPromises);
		return orders;
	} catch (error) {
		console.error("Error fetching orders by IDs:", error);
		return [];
	}
};

const updateUserOrders = async (userId, orderId) => {
	try {
		const userRef = doc(fireStore, "users", userId);
		await updateDoc(userRef, {
			orders: arrayUnion(orderId),
		});
		console.log(`Order ${orderId} added to user ${userId}`);
	} catch (error) {
		console.error("Error updating user orders:", error);
		throw error;
	}
};
function subscribeToUserCart(userId, callback) {
	const userDocRef = doc(fireStore, "users", userId);

	const unsubscribe = onSnapshot(
		userDocRef,
		(docSnapshot) => {
			if (docSnapshot.exists()) {
				const userData = docSnapshot.data();
				const cartItems = userData.carts || [];
				callback(cartItems);
			} else {
				callback([]);
			}
		},
		(error) => {
			console.error("Error subscribing to user cart:", error);
			callback([]);
		}
	);

	return unsubscribe;
}

export {
	createUser,
	getUserData,
	getUserOrders,
	updateUser,
	addItemToCart,
	getUsers,
	addUser,
	deleteUser,
	updateUserPassword,
	deleteUserAccount,
	deleteProductFromUserCart,
	getUserOrdersByIds,
	updateUserOrders,
	subscribeToUserCart,
};
