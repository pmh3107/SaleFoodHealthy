import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const auth = getAuth(app);

// Check if Firebase is initialized correctly
if (!app) {
	console.error("Firebase initialization failed. Check your configuration.");
} else {
	console.log("Firebase initialized successfully.");
}

export { fireStore, auth };
