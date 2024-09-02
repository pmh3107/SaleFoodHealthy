import { collection, getDoc } from "firebase/firestore";
import { fireStore } from "./Firebase";

const userCollection = collection(fireStore, "users");

import { doc, setDoc } from "firebase/firestore";

const createUser = async (uid, user) => {
	try {
		const userDoc = doc(userCollection, uid);
		await setDoc(userDoc, user);
		return true;
	} catch (error) {
		console.error("error to created new user:", error);
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

export { createUser, getUserData, updateUser };
