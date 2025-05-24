import { Product } from '../data/products';

const STORAGE_KEY = 'shop_products';

export const productService = {
  getProducts: (): Product[] => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    // If no products in storage, get from initial data
    const { products } = require('../data/products');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
  },

  saveProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  addProduct: (product: Product): void => {
    const products = productService.getProducts();
    products.push(product);
    productService.saveProducts(products);
  },

  updateProduct: (updatedProduct: Product): void => {
    const products = productService.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      productService.saveProducts(products);
    }
  },

  deleteProduct: (productId: string): void => {
    const products = productService.getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    productService.saveProducts(filteredProducts);
  }
}; 