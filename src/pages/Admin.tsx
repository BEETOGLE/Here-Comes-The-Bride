import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiPlus, FiLogOut, FiImage, FiX, FiPackage, FiHeart, FiCalendar, FiUpload } from 'react-icons/fi';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { imgurService } from '../services/imgurService';
import { dreamFinderService } from '../services/dreamFinderService';
import { appointmentService } from '../services/appointmentService';
import DreamDressRequests from '../components/Admin/DreamDressRequests';
import AppointmentRequests from '../components/Admin/AppointmentRequests';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB (Imgur limit)

type AdminTab = 'products' | 'requests' | 'appointments';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Wedding Dresses',
    description: '',
    price: '',
    sold: false
  });
  const [imageError, setImageError] = useState<string>('');
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [newDreamRequests, setNewDreamRequests] = useState(0);
  const [newAppointments, setNewAppointments] = useState(0);
  const [actionLoading, setActionLoading] = useState<string>(''); // Track which action is loading
  const [connectionMode, setConnectionMode] = useState<'realtime' | 'polling' | 'disconnected'>('disconnected');

  useEffect(() => {
    updateNotifications();

    // Set up storage event listener for notifications
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dream_dress_requests' || e.key === 'appointment_requests') {
        updateNotifications();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Check for updates every 5 seconds
    const interval = setInterval(updateNotifications, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Separate effect for product management - only when products tab is active
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    if (activeTab === 'products') {
      // Load initial products first
      loadProducts();
      
      try {
        // Set up real-time listener only for products tab
        // This will automatically fall back to polling if real-time fails
        unsubscribe = productService.subscribeToProducts(
          (updatedProducts) => {
            setProducts(updatedProducts);
            setLoading(false);
            setError(''); // Clear any previous errors on successful update
          },
          (mode) => {
            setConnectionMode(mode);
            console.log('🔗 Connection mode changed to:', mode);
          }
        );
      } catch (error: any) {
        console.error('Failed to setup product listener:', error);
        setError('Real-time updates unavailable, using manual refresh mode');
        setLoading(false);
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [activeTab]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const loadedProducts = await productService.getProducts();
      setProducts(loadedProducts);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateNotifications = () => {
    const dreamRequests = dreamFinderService.getRequests();
    const appointments = appointmentService.getRequests();
    
    setNewDreamRequests(dreamRequests.filter(r => r.status === 'new').length);
    setNewAppointments(appointments.filter(r => r.status === 'new').length);
  };

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

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');
    setUploadSuccess(false);

    if (!file) return;

    try {
      setImageUploading(true);
      
      // Validate image using Imgur service
      imgurService.validateImage(file, MAX_IMAGE_SIZE);
      
      // Upload to Imgur
      const imageUrl = await imgurService.uploadImage(file);
      
      // Update current product with Imgur URL
      setCurrentProduct(prev => ({
        ...prev,
        imageUrl: imageUrl
      }));
      
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000); // Clear success after 3 seconds
      
    } catch (error: any) {
      setImageError(error.message || 'Failed to upload image');
      console.error('Image upload error:', error);
    } finally {
      setImageUploading(false);
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setCurrentProduct(prev => ({
      ...prev,
      imageUrl: undefined
    }));
    setUploadSuccess(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent saving if image is still uploading
    if (imageUploading) {
      setError('Please wait for image upload to complete before saving.');
      return;
    }
    
    try {
      setActionLoading('save');
      setError('');
      
      if (currentProduct.id) {
        // Update existing product
        const updatedProduct = { ...currentProduct as Product };
        await productService.updateProduct(updatedProduct);
      } else {
        // Add new product
        const newProduct: Product = {
          ...currentProduct as Product,
          id: `product-${Date.now()}`,
          imagePlaceholder: currentProduct.category || 'Product'
        };
        await productService.addProduct(newProduct);
      }
      
      setIsEditing(false);
      setCurrentProduct({
        name: '',
        category: 'Wedding Dresses',
        description: '',
        price: '',
        sold: false
      });
      setUploadSuccess(false);
      setImageError('');
      
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setActionLoading('');
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setActionLoading(id);
        setError('');
        await productService.deleteProduct(id);
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      } finally {
        setActionLoading('');
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

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
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FiPackage className="mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'requests'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FiHeart className="mr-2" />
            Dream Dress Requests
            {newDreamRequests > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {newDreamRequests}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'appointments'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FiCalendar className="mr-2" />
            Appointments
            {newAppointments > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {newAppointments}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'products' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
              <div className="flex items-center gap-4">
                {/* Connection Status Indicator */}
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionMode === 'realtime' ? 'bg-green-500' :
                    connectionMode === 'polling' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-600">
                    {connectionMode === 'realtime' ? 'Real-time' :
                     connectionMode === 'polling' ? 'Polling mode' : 'Connecting...'}
                  </span>
                </div>
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
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}

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
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Product Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          {currentProduct.imageUrl ? (
                            <div className="relative">
                              <img
                                src={currentProduct.imageUrl}
                                alt="Product preview"
                                className="mx-auto h-64 w-auto object-contain rounded-lg shadow-sm"
                                loading="lazy"
                              />
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 shadow-sm"
                                disabled={imageUploading}
                              >
                                <FiX size={16} />
                              </button>
                              {uploadSuccess && (
                                <div className="absolute top-2 left-2 bg-green-100 text-green-600 rounded-full p-2 shadow-sm">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ) : imageUploading ? (
                            <div className="flex flex-col items-center py-8">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                              <div className="text-primary font-medium">Uploading to Imgur...</div>
                              <div className="text-sm text-gray-500 mt-1">Please wait while your image uploads</div>
                            </div>
                          ) : (
                            <>
                              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                  <span>Upload to Imgur</span>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={imageUploading}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
                              <p className="text-xs text-gray-400">Images will be hosted on Imgur for free</p>
                            </>
                          )}
                          {imageError && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {imageError}
                              </div>
                            </div>
                          )}
                          {uploadSuccess && !currentProduct.imageUrl && (
                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Image uploaded successfully!
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
                      disabled={actionLoading === 'save' || imageUploading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      disabled={actionLoading === 'save' || imageUploading}
                    >
                      {(actionLoading === 'save' || imageUploading) && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      )}
                      {imageUploading ? 'Uploading Image...' : 
                       actionLoading === 'save' ? 'Saving...' :
                       currentProduct.id ? 'Update Product' : 'Add Product'}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
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
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-16 w-16 object-cover rounded shadow-sm"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        {/* Fallback placeholder */}
                        <div className={`h-16 w-16 bg-gray-100 flex items-center justify-center rounded ${product.imageUrl ? 'hidden' : ''}`}>
                          <FiImage className="text-gray-400" size={24} />
                        </div>
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
                          className="text-primary hover:text-primary-dark mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={actionLoading !== ''}
                        >
                          <FiEdit2 className="inline" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          disabled={actionLoading !== ''}
                        >
                          {actionLoading === product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                          ) : (
                            <FiTrash2 className="inline" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeTab === 'requests' ? (
          <DreamDressRequests />
        ) : (
          <AppointmentRequests />
        )}
      </div>
    </div>
  );
};

export default Admin; 