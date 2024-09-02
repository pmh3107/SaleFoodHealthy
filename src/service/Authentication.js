import { auth, fireStore } from "./Firebase";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const loginUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		const accessToken = user.stsTokenManager.accessToken;
		localStorage.setItem("accessToken", accessToken);

		console.log("User logged in:", user);
		return user;
	} catch (error) {
		console.error("Error logging in:", error.message);
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

export { loginUser, createNewUser, logoutUser, checkAuthState };
