import React from 'react';
import { FiCheckCircle, FiDollarSign, FiUsers } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const Consignment: React.FC = () => {
  const steps = [
    {
      title: "Schedule an Appointment",
      description: "Contact us to arrange a time to bring in your wedding dress or accessories for evaluation.",
      icon: <FiUsers className="text-primary" size={24} />
    },
    {
      title: "Item Evaluation",
      description: "We'll assess the condition, style, and potential market value of your items together.",
      icon: <FiCheckCircle className="text-primary" size={24} />
    },
    {
      title: "50/50 Split When Sold",
      description: "When your item sells, you receive 50% of the final selling price - a fair split that benefits everyone.",
      icon: <FiDollarSign className="text-primary" size={24} />
    }
  ];

  return (
    <section id="consignment" className="py-16 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Consignment</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Give your wedding dress a second life and earn back some of your investment through our simple consignment process.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.3}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-semibold mb-6">How Our Consignment Works</h3>
              
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                {steps.map((step, index) => (
                  <AnimatedSection key={index} delay={0.4 + index * 0.15} direction="up">
                    <motion.div 
                      className="bg-gray-50 p-6 rounded-lg"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                      }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(177, 156, 217, 0.25)" }}
                      >
                        {step.icon}
                      </motion.div>
                      <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
              
              <AnimatedSection delay={0.7} direction="up">
                <div className="bg-primary/5 border-l-4 border-primary p-6 mb-8">
                  <h4 className="text-xl font-semibold mb-3">Why Choose Our Consignment Service?</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Fair 50/50 split on all sales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>No upfront fees or costs to you</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Experienced marketing of your items to our established customer base</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Professional display and care of your garments</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.8} direction="up">
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    We accept wedding dresses, veils, accessories and flower girl dresses that are in excellent condition, 
                    clean, and from recent seasons. Vintage items in exceptional condition are also welcome.
                  </p>
                  <motion.a 
                    href="#contact" 
                    className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us to Get Started
                  </motion.a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Consignment; 