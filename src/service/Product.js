import { fireStore } from "./Firebase";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";

const productsCollection = collection(fireStore, "products");

const getProducts = async () => {
	try {
		const productsSnapshot = await getDocs(productsCollection);
		const productsList = productsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return productsList;
	} catch (error) {
		console.error("Error fetching products:", error);
		return null;
	}
};

const addProduct = async (product) => {
	try {
		await addDoc(productsCollection, product);
	} catch (error) {
		console.error("Error adding product:", error);
	}
};

const updateProduct = async (id, updatedProduct) => {
	try {
		const productDoc = doc(fireStore, "products", id);
		await updateDoc(productDoc, updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error);
	}
};

const deleteProduct = async (id) => {
	try {
		const productDoc = doc(fireStore, "products", id);
		await deleteDoc(productDoc);
	} catch (error) {
		console.error("Error deleting product:", error);
	}
};

export { getProducts, addProduct, updateProduct, deleteProduct };
