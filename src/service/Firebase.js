import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Debugging: Log environment variables
console.log("API Key:", import.meta.env.VITE_REACT_APP_API_KEY);
console.log("Auth Domain:", import.meta.env.VITE_REACT_APP_AUTH_DOMAIN);
console.log("Project ID:", import.meta.env.VITE_REACT_APP_PROJECT_ID);
console.log("Storage Bucket:", import.meta.env.VITE_REACT_APP_STORAGE_BUCKET);
console.log(
	"Messaging Sender ID:",
	import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID
);
console.log("App ID:", import.meta.env.VITE_REACT_APP_APP_ID);

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

// Check if Firebase is initialized correctly
if (!app) {
	console.error("Firebase initialization failed. Check your configuration.");
}

export default fireStore;
