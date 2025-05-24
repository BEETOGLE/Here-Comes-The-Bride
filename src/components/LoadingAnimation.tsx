import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingAnimation: React.FC<{isLoading: boolean}> = ({ isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'all' : 'none' 
      }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            repeat: isLoading ? Infinity : 0,
            repeatType: "reverse",
            repeatDelay: 0.2
          }}
        >
          <Logo className="mx-auto scale-150 mb-6" size="large" />
        </motion.div>
        
        <motion.div 
          className="flex space-x-3 justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-3 h-3 rounded-full bg-primary"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: dot * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation; 