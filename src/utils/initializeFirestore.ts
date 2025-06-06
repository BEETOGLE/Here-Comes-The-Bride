import { productService } from '../services/productService';

export const initializeFirestore = async (): Promise<void> => {
  try {
    console.log('Checking if Firestore needs initialization...');
    const products = await productService.getProducts();
    
    if (products.length === 0) {
      console.log('No products found, initializing Firestore with default products...');
      await productService.initializeProducts();
      console.log('Firestore initialized successfully!');
    } else {
      console.log(`Firestore already has ${products.length} products.`);
    }
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    throw error;
  }
}; 