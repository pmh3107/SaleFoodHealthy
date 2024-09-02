import fireStore from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const collectionCategory = collection(fireStore, "categories");

const getCategory = async () => {
	try {
		const categorySnapshot = await getDocs(collectionCategory);
		const categoryList = categorySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return categoryList;
	} catch (error) {
		console.error("Error fetching category:", error);
		return null;
	}
};

export { getCategory };
