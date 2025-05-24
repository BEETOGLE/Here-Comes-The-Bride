import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppointmentForm from './AppointmentForm';

const AppointmentButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Request an Appointment
      </motion.button>

      <AppointmentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AppointmentButton; 