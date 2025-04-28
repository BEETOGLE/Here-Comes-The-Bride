import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Logo from './Logo';
import { motion, useAnimation } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { name: "Wedding Dresses", href: "#wedding-dresses" },
    { name: "Flower Girl Dresses", href: "#flower-girl-dresses" },
    { name: "Belts", href: "#belts" },
    { name: "Veils", href: "#veils" },
    { name: "Jewelry", href: "#jewelry" },
    { name: "Hair Pieces", href: "#hair-pieces" },
  ];

  return (
    <motion.nav 
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.a 
              href="/#"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Logo />
            </motion.a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <motion.a 
              href="#home" 
              className="text-gray-600 hover:text-primary"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Home
            </motion.a>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button 
                onClick={toggleCategoriesDropdown}
                className="flex items-center text-gray-600 hover:text-primary"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Products <FiChevronDown className="ml-1" />
              </motion.button>
              
              {showCategoriesDropdown && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    {categories.map((category, index) => (
                      <motion.a
                        key={index}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
                        whileHover={{ x: 5, backgroundColor: "rgba(177, 156, 217, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.a 
              href="#consignment" 
              className="text-gray-600 hover:text-primary"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Consignment
            </motion.a>
            <motion.a 
              href="#about" 
              className="text-gray-600 hover:text-primary"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-gray-600 hover:text-primary"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-2 pb-4 space-y-1 bg-white">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#home" className="block px-4 py-2 text-primary font-medium">Home</a>
            
            {/* Mobile Categories Dropdown */}
            <div>
              <button 
                onClick={toggleCategoriesDropdown}
                className="flex items-center w-full px-4 py-2 text-gray-600 hover:text-primary"
              >
                Products <FiChevronDown className={`ml-1 transform ${showCategoriesDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              
              {showCategoriesDropdown && (
                <motion.div 
                  className="bg-gray-50 pl-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {categories.map((category, index) => (
                    <motion.a
                      key={index}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-primary"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {category.name}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </div>
            
            <a href="#consignment" className="block px-4 py-2 text-gray-600 hover:text-primary">Consignment</a>
            <a href="#about" className="block px-4 py-2 text-gray-600 hover:text-primary">About</a>
            <a href="#contact" className="block px-4 py-2 text-gray-600 hover:text-primary">Contact</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 