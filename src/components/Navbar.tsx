import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const categories = [
    { name: "Wedding Dresses", href: "#wedding-dresses" },
    { name: "Flower Girl Dresses", href: "#flower-girl-dresses" },
    { name: "Belts", href: "#belts" },
    { name: "Veils", href: "#veils" },
    { name: "Jewelry", href: "#jewelry" },
    { name: "Hair Pieces", href: "#hair-pieces" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/"
                className="text-xl font-bold text-primary"
              >
                <Logo size="medium" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-4">
              {!isAdminPage ? (
                <>
                  <button
                    onClick={() => scrollToSection('home')}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </button>
                  
                  {/* Categories Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                      className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                    >
                      Products
                      <FiChevronDown className="ml-1" />
                    </button>

                    {showCategoriesDropdown && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {categories.map((category) => (
                            <button
                              key={category.name}
                              onClick={() => {
                                scrollToSection(category.href.substring(1));
                                setShowCategoriesDropdown(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => scrollToSection('consignment')}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Consignment
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Back to Site
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {!isAdminPage ? (
            <>
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Home
              </button>

              {/* Mobile Products Dropdown */}
              <div>
                <button
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center justify-between"
                >
                  Products
                  <FiChevronDown className={`transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showCategoriesDropdown && (
                  <div className="bg-gray-50">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => {
                          scrollToSection(category.href.substring(1));
                          setShowCategoriesDropdown(false);
                        }}
                        className="block w-full text-left pl-6 pr-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('consignment')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Consignment
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Contact
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Back to Site
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 