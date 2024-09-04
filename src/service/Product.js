import { fireStore } from "./Firebase";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	getDoc,
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

const getProductById = async (id) => {
	try {
		const productDoc = doc(fireStore, "products", id);
		const productSnapshot = await getDoc(productDoc);
		if (productSnapshot.exists()) {
			return { id: productSnapshot.id, ...productSnapshot.data() };
		} else {
			console.error("No such product!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
};

export {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	getProductById,
};
