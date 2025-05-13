import React from 'react';
import { FiInstagram, FiMail, FiPhone } from 'react-icons/fi';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const socialIcons = [
    { icon: <FiInstagram size={20} />, href: "https://instagram.com", delay: 0.1 },
    { icon: <FiMail size={20} />, href: "mailto:Herecomesthebride2025@aol.com", delay: 0.2 },
    { icon: <FiPhone size={20} />, href: "tel:3152253891", delay: 0.3 }
  ];

  const quickLinks = [
    { name: "Home", href: "#home", delay: 0.1 },
    { name: "Wedding Dresses", href: "#wedding-dresses", delay: 0.2 },
    { name: "Consignment", href: "#consignment", delay: 0.3 },
    { name: "About", href: "#about", delay: 0.4 },
    { name: "Contact", href: "#contact", delay: 0.5 }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Logo className="text-white mb-4" />
            <p className="text-gray-400 mb-6">
              Helping brides find their perfect dress without breaking the bank.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, color: "#B19CD9" }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: social.delay }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: link.delay }}
                >
                  <motion.a 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 5, color: "#B19CD9" }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <FiPhone className="text-primary mt-1 mr-3" />
                <span>315-225-3891</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <FiMail className="text-primary mt-1 mr-3" />
                <span>Herecomesthebride2025@aol.com</span>
              </motion.li>
              <motion.li 
                className="text-gray-400 italic mt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                By appointment only
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Here Comes The Bride. All rights reserved.
          </p>
          <div className="text-gray-500 text-sm">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <motion.a 
              href="#" 
              className="hover:text-primary transition-colors duration-300 mr-4"
              whileHover={{ color: "#B19CD9" }}
            >
              Privacy Policy
            </motion.a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <motion.a 
              href="#" 
              className="hover:text-primary transition-colors duration-300"
              whileHover={{ color: "#B19CD9" }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 