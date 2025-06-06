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
      console.log('📦 Fetching products from Firestore...');
      
      const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const products: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      console.log(`✅ Successfully fetched ${products.length} products from Firestore`);
      
      // If no products exist in Firestore, initialize with default products
      if (products.length === 0) {
        console.log('🔄 No products found, initializing with default products...');
        await productService.initializeProducts();
        return initialProducts;
      }
      
      return products;
    } catch (error: any) {
      console.error('❌ Error getting products from Firestore:', {
        message: error.message,
        code: error.code,
        details: error.details,
        stack: error.stack
      });
      
      // If it's a network/permission error, throw it up
      if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
        throw new Error('Access denied. Please check Firestore security rules.');
      }
      
      if (error.code === 'unavailable' || error.message?.includes('400')) {
        throw new Error('Firestore service unavailable. Please check your Firebase configuration.');
      }
      
      throw error;
    }
  },

  // Initialize Firestore with default products
  initializeProducts: async (): Promise<void> => {
    try {
      console.log('🚀 Initializing Firestore with default products...');
      
      const batch = initialProducts.map(async (product) => {
        const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
        await setDoc(docRef, product);
      });
      
      await Promise.all(batch);
      console.log('✅ Products initialized in Firestore successfully');
    } catch (error: any) {
      console.error('❌ Error initializing products:', {
        message: error.message,
        code: error.code,
        details: error.details
      });
      throw error;
    }
  },

  // Add a new product to Firestore
  addProduct: async (product: Product): Promise<void> => {
    try {
      console.log('➕ Adding product to Firestore:', product.name);
      
      const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
      await setDoc(docRef, product);
      console.log('✅ Product added successfully:', product.name);
    } catch (error: any) {
      console.error('❌ Error adding product:', {
        productId: product.id,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  },

  // Update an existing product in Firestore
  updateProduct: async (updatedProduct: Product): Promise<void> => {
    try {
      console.log('📝 Updating product in Firestore:', updatedProduct.name);
      
      const docRef = doc(db, PRODUCTS_COLLECTION, updatedProduct.id);
      await updateDoc(docRef, { ...updatedProduct });
      console.log('✅ Product updated successfully:', updatedProduct.name);
    } catch (error: any) {
      console.error('❌ Error updating product:', {
        productId: updatedProduct.id,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  },

  // Delete a product from Firestore
  deleteProduct: async (productId: string): Promise<void> => {
    try {
      console.log('🗑️ Deleting product from Firestore:', productId);
      
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(docRef);
      console.log('✅ Product deleted successfully:', productId);
    } catch (error: any) {
      console.error('❌ Error deleting product:', {
        productId,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  },

  // Subscribe to real-time product updates (expensive - use sparingly!)
  // Use only on admin pages where real-time syncing is essential
  // Each connected listener incurs read costs for every document change
  subscribeToProducts: (callback: (products: Product[]) => void): Unsubscribe => {
    console.log('👂 Setting up real-time listener for products...');
    
    const unsubscribe = onSnapshot(
      collection(db, PRODUCTS_COLLECTION),
      (querySnapshot) => {
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() } as Product);
        });
        console.log(`🔄 Real-time update: ${products.length} products received`);
        callback(products);
      },
      (error: any) => {
        console.error('❌ Real-time listener error:', {
          message: error.message,
          code: error.code,
          details: error.details
        });
        
        // Try to provide helpful error messages
        if (error.code === 'permission-denied') {
          console.error('🚫 Permission denied - check Firestore security rules');
        } else if (error.code === 'unavailable') {
          console.error('📡 Firestore unavailable - check network connection and Firebase config');
        }
      }
    );
    
    return unsubscribe;
  }
}; 