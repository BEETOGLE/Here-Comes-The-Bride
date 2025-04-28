import React from 'react';
import { FiClock, FiPhone, FiMail, FiInfo } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const businessHours = [
    { day: 'Monday', hours: 'By Appointment' },
    { day: 'Tuesday', hours: 'By Appointment' },
    { day: 'Wednesday', hours: 'By Appointment' },
    { day: 'Thursday', hours: 'By Appointment' },
    { day: 'Friday', hours: 'By Appointment' },
    { day: 'Saturday', hours: 'By Appointment' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We'd love to help you find your perfect dress. Contact us to schedule an appointment.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.3}>
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden mx-auto max-w-4xl"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Business Hours and Contact */}
                <AnimatedSection direction="left" delay={0.5}>
                  <div>
                    <div className="flex items-center mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FiClock className="text-primary text-2xl mr-4" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold">By Appointment Only</h3>
                    </div>
                    
                    <div className="space-y-3 mb-10">
                      {businessHours.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        >
                          <span className="font-medium">{item.day}</span>
                          <span className="text-gray-600">{item.hours}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="space-y-6 mt-8">
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiPhone className="text-primary text-xl mr-4" />
                        <span>Frances: (123) 456-7890</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiMail className="text-primary text-xl mr-4" />
                        <span>frances@herecomesthebride.com</span>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedSection>
                
                {/* Important Info */}
                <AnimatedSection direction="right" delay={0.5}>
                  <div className="bg-secondary/10 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          repeatDelay: 2
                        }}
                      >
                        <FiInfo className="text-primary text-2xl mr-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold">Important Information</h3>
                    </div>
                    
                    <div className="space-y-4 text-gray-700">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <strong>Appointments:</strong> To provide you with the best personalized service, we operate by appointment only.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <strong>Trying on dresses:</strong> Please wear appropriate undergarments and bring any special shoes or accessories you plan to wear on your wedding day.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <strong>Payment methods:</strong> We accept cash, credit cards, and mobile payments for your convenience.
                      </motion.p>
                    </div>
                    
                    <div className="mt-8">
                      <motion.a 
                        href="mailto:frances@herecomesthebride.com"
                        className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300 w-full text-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Request an Appointment
                      </motion.a>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact; 