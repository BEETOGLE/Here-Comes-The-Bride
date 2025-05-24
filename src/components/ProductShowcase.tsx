import React, { useState, useEffect } from 'react';
import { FiHeart, FiInfo } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface ProductProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  imagePlaceholder: string;
  sold: boolean;
  image?: string;
}

const Product: React.FC<ProductProps> = ({ 
  id, 
  name, 
  category, 
  description, 
  price, 
  imagePlaceholder,
  image, 
  sold 
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="aspect-[2/3] bg-gray-100 relative">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/60">
            {imagePlaceholder}
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
  products: ProductProps[];
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
              <Product
                id={product.id}
                name={product.name}
                category={product.category}
                description={product.description}
                price={product.price}
                imagePlaceholder={product.imagePlaceholder}
                image={product.image}
                sold={product.sold}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/admin/config.yml');
        if (!response.ok) {
          throw new Error('Failed to fetch CMS configuration');
        }
        
        // For now, fall back to the JSON file if CMS is not yet configured
        const productsResponse = await fetch('/data/products.json');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const productsData = await productsResponse.json();
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      description: "Beautiful hair pieces to complete your perfect bridal look."
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          id={category.id}
          title={category.title}
          category={category.category}
          description={category.description}
          products={products}
        />
      ))}
    </div>
  );
};

export default ProductShowcase; 