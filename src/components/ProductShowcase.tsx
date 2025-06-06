import React, { useState, useEffect } from 'react';
import { FiHeart, FiInfo } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { productService } from '../services/productService';

const ProductCard: React.FC<Product> = ({ 
  id, 
  name, 
  category, 
  description, 
  price, 
  imagePlaceholder,
  imageUrl, 
  sold 
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="aspect-[2/3] bg-gray-100 relative">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
        ) : null}
        
        {/* Placeholder - shown when no image or image fails to load */}
        <div className={`absolute inset-0 flex items-center justify-center text-primary/60 text-2xl font-light ${imageUrl && !imageError ? 'hidden' : ''}`}>
          {imagePlaceholder}
        </div>
        
        {/* Image error overlay */}
        {imageError && imageUrl && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-600 rounded-full p-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {sold && (
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-white text-2xl font-bold transform -rotate-12 border-2 border-white px-6 py-2 rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              SOLD
            </motion.span>
          </motion.div>
        )}
        
        <motion.button 
          onClick={() => setShowInfo(!showInfo)}
          className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full hover:bg-primary/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiInfo className="text-primary" size={20} />
        </motion.button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{category}</p>
        <div className="flex justify-between items-center">
          <span className="font-medium">{price}</span>
          <motion.button 
            className="p-2 text-primary hover:bg-primary/10 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart size={20} />
          </motion.button>
        </div>
      </div>
      
      {/* Expandable Product Details */}
      <motion.div 
        className="px-4 py-3 bg-primary/5 border-t border-primary/10"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showInfo ? 'auto' : 0,
          opacity: showInfo ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-700">{description}</p>
      </motion.div>
    </motion.div>
  );
};

// This component will display products filtered by category
const CategorySection: React.FC<{
  products: Product[];
  category: string;
  title: string;
  description: string;
  id: string;
}> = ({ products, category, title, description, id }) => {
  const filteredProducts = products.filter(product => product.category === category);
  
  if (filteredProducts.length === 0) {
    return null;
  }
  
  return (
    <section id={id} className="py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} delay={0.2 + index * 0.1} direction="up">
              <ProductCard {...product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const loadedProducts = await productService.getProducts();
      setProducts(loadedProducts);
    } catch (err) {
      setError('Failed to load products. Please try refreshing the page.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: "wedding-dresses",
      title: "Wedding Dresses",
      category: "Wedding Dresses",
      description: "Browse our collection of beautiful wedding dresses. Each is unique and available for purchase by appointment only."
    },
    {
      id: "flower-girl-dresses",
      title: "Flower Girl Dresses",
      category: "Flower Girl Dresses",
      description: "Adorable dresses for the little ones in your wedding party."
    },
    {
      id: "belts",
      title: "Wedding Dress Belts",
      category: "Belts",
      description: "Add the perfect finishing touch to your wedding dress with our selection of belts."
    },
    {
      id: "veils",
      title: "Wedding Veils",
      category: "Veils",
      description: "Complete your bridal look with a beautiful veil in various lengths and styles."
    },
    {
      id: "jewelry",
      title: "Bridal Jewelry",
      category: "Jewelry",
      description: "Elegant jewelry pieces to complement your wedding ensemble."
    },
    {
      id: "hair-pieces",
      title: "Hair Accessories",
      category: "Hair Pieces",
      description: "Beautiful hair accessories to complete your bridal style."
    }
  ];

  if (loading && products.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our beautiful collection...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
              <p className="font-medium">Unable to load products</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={loadProducts}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {categories.map((categoryData) => (
        <CategorySection
          key={categoryData.id}
          products={products}
          {...categoryData}
        />
      ))}
    </div>
  );
};

export default ProductShowcase; 