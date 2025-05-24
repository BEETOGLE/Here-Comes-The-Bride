import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from 'react-icons/fi';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Wedding Dresses',
    description: '',
    price: '',
    sold: false
  });

  useEffect(() => {
    setProducts(productService.getProducts());
  }, []);

  const categories = [
    "Wedding Dresses",
    "Flower Girl Dresses",
    "Belts",
    "Veils",
    "Jewelry",
    "Hair Pieces"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      // Update existing product
      const updatedProduct = { ...currentProduct as Product };
      productService.updateProduct(updatedProduct);
      setProducts(productService.getProducts());
    } else {
      // Add new product
      const newProduct: Product = {
        ...currentProduct as Product,
        id: `product-${Date.now()}`,
        imagePlaceholder: currentProduct.category || 'Product'
      };
      productService.addProduct(newProduct);
      setProducts(productService.getProducts());
    }
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      category: 'Wedding Dresses',
      description: '',
      price: '',
      sold: false
    });
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.deleteProduct(id);
      setProducts(productService.getProducts());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-primary"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
          <button
            onClick={() => {
              setCurrentProduct({
                name: '',
                category: 'Wedding Dresses',
                description: '',
                price: '',
                sold: false
              });
              setIsEditing(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
          >
            <FiPlus /> Add New Product
          </button>
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={currentProduct.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="sold"
                      checked={currentProduct.sold}
                      onChange={handleInputChange}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Sold</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentProduct({
                      name: '',
                      category: 'Wedding Dresses',
                      description: '',
                      price: '',
                      sold: false
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {currentProduct.id ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.sold
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.sold ? 'Sold' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary hover:text-primary-dark mr-4"
                    >
                      <FiEdit2 className="inline" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin; 