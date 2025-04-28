import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Hero: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    };
    
    sequence();
  }, [controls]);

  return (
    <section className="bg-gradient-to-r from-secondary/30 to-primary/30 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Find Your Perfect <span className="text-primary">Dream Dress</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover beautiful wedding dresses and accessories for your special day at affordable prices.
            </p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
              <motion.a 
                href="#wedding-dresses" 
                className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Dresses
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl bg-white aspect-video">
              {/* This would be replaced with an actual bride image */}
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center p-6">
                  <motion.h3 
                    className="font-serif italic text-2xl text-primary mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Here Comes The Bride
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Elegant Wedding Dress Silhouette
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 