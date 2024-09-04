import {
	collection,
	getDoc,
	getDocs,
	doc,
	setDoc,
	deleteDoc,
	arrayUnion,
	arrayRemove,
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
			return { id: userSnapshot.id, ...userSnapshot.data() };
		} else {
			console.error("No such user!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
};

const updateUser = async (uid, updatedData) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, updatedData, { merge: true });
		return true;
	} catch (error) {
		console.error("Error updating user data:", error);
		return false;
	}
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

export {
	createUser,
	getUserData,
	updateUser,
	addItemToCart,
	getUsers,
	addUser,
	deleteUser,
	updateUserPassword,
	deleteUserAccount,
	deleteProductFromUserCart,
};
