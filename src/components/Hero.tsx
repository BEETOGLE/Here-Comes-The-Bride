import React from 'react';
import { motion } from 'framer-motion';
import AppointmentButton from './AppointmentButton';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-secondary/30 to-primary/30 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div 
            className="w-full max-w-2xl bg-white/90 rounded-xl shadow-xl p-8 mb-10 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-great-vibes font-bold text-primary mb-2">Here Comes The Bride</h1>
            <h2 className="text-2xl md:text-3xl font-playfair text-gray-700 mb-4 font-semibold tracking-wide">Bridal Shop</h2>
          </motion.div>
          <motion.div 
            className="w-full md:w-2/3 bg-white/80 rounded-lg shadow p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Find Your Perfect <span className="text-primary">Dream Dress</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover beautiful wedding dresses and accessories for your special day at affordable prices.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <AppointmentButton />
              <a 
                href="#wedding-dresses" 
                className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition duration-300"
              >
                Browse Dresses
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 