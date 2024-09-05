import { auth, fireStore } from "./Firebase";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	updatePassword,
	deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const loginUser = async ({ email, password }) => {
	try {
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
};

const createNewUser = async (email, password, userData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		await setDoc(doc(fireStore, "users", user.uid), userData);

		console.log("User signed up and data saved:", user);
		return user;
	} catch (error) {
		console.error("Error signing up:", error.message);
		return false;
	}
};

const logoutUser = async () => {
	try {
		await signOut(auth);
		localStorage.removeItem("accessToken");
		console.log("User logged out successfully");
	} catch (error) {
		console.error("Error logging out:", error.message);
	}
};

const checkAuthState = (callback) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const userDoc = await getDoc(doc(fireStore, "users", user.uid));
			if (userDoc.exists()) {
				callback(true, { uid: user.uid, ...userDoc.data() });
			} else {
				console.error("No such user document!");
				callback(false, null);
			}
		} else {
			callback(false, null);
		}
	});
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
			await deleteUser(user);
			console.log("User account deleted successfully");
		} else {
			throw new Error("No user is currently signed in");
		}
	} catch (error) {
		console.error("Error deleting user account:", error.message);
		throw error;
	}
};

export {
	loginUser,
	createNewUser,
	logoutUser,
	checkAuthState,
	updateUserPassword,
	deleteUserAccount,
};
