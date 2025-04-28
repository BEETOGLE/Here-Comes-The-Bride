import React from 'react';
import { FiHeart, FiStar, FiAward, FiGift, FiFeather, FiCrosshair } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface CategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ title, description, icon, href }) => {
  return (
    <motion.a 
      href={href}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 block"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.a>
  );
};

const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: 'Wedding Dresses',
      description: 'Beautiful gowns for your special day at affordable prices.',
      icon: <FiHeart size={24} />,
      href: '#wedding-dresses'
    },
    {
      title: 'Flower Girl Dresses',
      description: 'Adorable dresses for the little ones in your wedding party.',
      icon: <FiStar size={24} />,
      href: '#flower-girl-dresses'
    },
    {
      title: 'Belts',
      description: 'Elegant belts to add that perfect finishing touch to your dress.',
      icon: <FiAward size={24} />,
      href: '#belts'
    },
    {
      title: 'Veils',
      description: 'Traditional and modern veils in various lengths and styles.',
      icon: <FiFeather size={24} />,
      href: '#veils'
    },
    {
      title: 'Jewelry',
      description: 'Stunning accessories to complement your wedding ensemble.',
      icon: <FiGift size={24} />,
      href: '#jewelry'
    },
    {
      title: 'Hair Pieces',
      description: 'Beautiful hair accessories to complete your bridal look.',
      icon: <FiCrosshair size={24} />,
      href: '#hair-pieces'
    }
  ];

  return (
    <section id="products" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0.1} direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collections</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our carefully curated selection of wedding dresses and accessories. Each piece is selected with quality and affordability in mind.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <AnimatedSection key={index} delay={0.2 + index * 0.1} direction="up">
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                href={category.href}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories; 