import { productService } from '../services/productService';
import { Product } from '../data/products';

export const testFirestoreConnection = async (): Promise<void> => {
  try {
    console.log('🔥 Testing Firestore connection...');
    
    // Test 1: Load products
    console.log('📋 Loading products...');
    const products = await productService.getProducts();
    console.log(`✅ Successfully loaded ${products.length} products`);
    
    // Test 2: Add a test product
    console.log('➕ Testing product addition...');
    const testProduct: Product = {
      id: `test-product-${Date.now()}`,
      name: 'Test Product',
      category: 'Wedding Dresses',
      description: 'This is a test product to verify Firestore functionality.',
      price: '$999',
      sold: false,
      imagePlaceholder: 'Test Product'
    };
    
    await productService.addProduct(testProduct);
    console.log('✅ Successfully added test product');
    
    // Test 3: Update the test product
    console.log('📝 Testing product update...');
    const updatedProduct = { ...testProduct, name: 'Updated Test Product', sold: true };
    await productService.updateProduct(updatedProduct);
    console.log('✅ Successfully updated test product');
    
    // Test 4: Delete the test product
    console.log('🗑️ Testing product deletion...');
    await productService.deleteProduct(testProduct.id);
    console.log('✅ Successfully deleted test product');
    
    console.log('🎉 All Firestore tests passed!');
    
  } catch (error) {
    console.error('❌ Firestore test failed:', error);
    throw error;
  }
}; 