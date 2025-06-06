import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../data/products';
import { products as initialProducts } from '../data/products';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  // Get all products from Firestore (one-time read)
  // Use this for public pages to minimize costs
  getProducts: async (): Promise<Product[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const products: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      // If no products exist in Firestore, initialize with default products
      if (products.length === 0) {
        await productService.initializeProducts();
        return initialProducts;
      }
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Initialize Firestore with default products
  initializeProducts: async (): Promise<void> => {
    try {
      const batch = initialProducts.map(async (product) => {
        const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
        await setDoc(docRef, product);
      });
      
      await Promise.all(batch);
      console.log('Products initialized in Firestore');
    } catch (error) {
      console.error('Error initializing products:', error);
      throw error;
    }
  },

  // Add a new product to Firestore
  addProduct: async (product: Product): Promise<void> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
      await setDoc(docRef, product);
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update an existing product in Firestore
  updateProduct: async (updatedProduct: Product): Promise<void> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, updatedProduct.id);
      await updateDoc(docRef, { ...updatedProduct });
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product from Firestore
  deleteProduct: async (productId: string): Promise<void> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(docRef);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Subscribe to real-time product updates (expensive - use sparingly!)
  // Use only on admin pages where real-time syncing is essential
  // Each connected listener incurs read costs for every document change
  subscribeToProducts: (callback: (products: Product[]) => void): Unsubscribe => {
    const unsubscribe = onSnapshot(
      collection(db, PRODUCTS_COLLECTION),
      (querySnapshot) => {
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() } as Product);
        });
        callback(products);
      },
      (error) => {
        console.error('Error listening to products:', error);
      }
    );
    
    return unsubscribe;
  }
}; 