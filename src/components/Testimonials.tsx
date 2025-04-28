import React from 'react';
import { FiHeart } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up" delay={0.3}>
            <motion.div 
              className="bg-secondary/10 rounded-lg p-8 md:p-12 shadow-md relative overflow-hidden"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <FiHeart size={32} />
                </div>
              </motion.div>
              
              <motion.blockquote 
                className="text-xl md:text-2xl font-serif italic text-center text-gray-700 mb-6 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="absolute top-0 left-0 text-6xl text-primary/20 -translate-x-1/2 -translate-y-1/2">"</span>
                If I don't have the dress of your dreams, I'll do all I can to help you find it.
                <span className="absolute bottom-0 right-0 text-6xl text-primary/20 translate-x-1/2 translate-y-1/2">"</span>
              </motion.blockquote>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-gray-600 mb-2">
                  At Here Comes The Bride, we understand that your wedding dress is one of the most important elements of your special day. We're dedicated to helping every bride find a beautiful dress that makes them feel their absolute best, without breaking the bank.
                </p>
                
                <p className="text-gray-600">
                  We offer a carefully curated selection of pre-loved and sample wedding dresses in excellent condition, along with accessories to complete your bridal look.
                </p>
              </motion.div>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.6}>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-4">Personal, Attentive Service</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Unlike large bridal shops with overwhelming inventory, we offer a personalized shopping experience where you'll receive undivided attention and honest advice. By appointment only, ensuring you get the focused help you deserve.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About; 