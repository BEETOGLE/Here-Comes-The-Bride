import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image?: string;
  imagePlaceholder: string;
  sold: boolean;
}

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: string;
  image?: File;
  sold: boolean;
}

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData>({
    name: '',
    category: 'Wedding Dresses',
    description: '',
    price: '',
    sold: false
  });

  const categories = [
    "Wedding Dresses",
    "Flower Girl Dresses",
    "Belts",
    "Veils",
    "Jewelry",
    "Hair Pieces"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentProduct(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll implement the actual save functionality
    // For now, just log the data
    console.log('Saving product:', currentProduct);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add New Product
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Name</label>
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
              <label className="block mb-2">Category</label>
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
              <label className="block mb-2">Price</label>
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
              <label className="block mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sold"
                  checked={currentProduct.sold}
                  onChange={handleInputChange}
                />
                Sold
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Save Product
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.sold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {product.sold ? 'Sold' : 'Available'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentProduct({
                        name: product.name,
                        category: product.category,
                        description: product.description,
                        price: product.price,
                        sold: product.sold
                      });
                      setIsEditing(true);
                    }}
                    className="text-primary hover:text-primary-dark mr-4"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      // Implement delete functionality
                      console.log('Delete product:', product.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel; 