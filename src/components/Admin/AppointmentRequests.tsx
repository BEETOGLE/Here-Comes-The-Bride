import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiCalendar, FiCheck, FiX, FiClock } from 'react-icons/fi';

interface AppointmentRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDate?: string;
  status: 'new' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

const AppointmentRequests: React.FC = () => {
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentRequest['status'] | 'all'>('all');

  useEffect(() => {
    // Initial load
    setRequests(appointmentService.getRequests());

    // Set up storage event listener for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'appointment_requests') {
        setRequests(JSON.parse(e.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Check for updates every 5 seconds
    const interval = setInterval(() => {
      setRequests(appointmentService.getRequests());
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleStatusChange = (requestId: string, newStatus: AppointmentRequest['status']) => {
    appointmentService.updateRequestStatus(requestId, newStatus);
    setRequests(appointmentService.getRequests());
  };

  const filteredRequests = selectedStatus === 'all'
    ? requests
    : requests.filter(request => request.status === selectedStatus);

  const statusColors = {
    new: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointment Requests</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus('new')}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === 'new'
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setSelectedStatus('scheduled')}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === 'scheduled'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setSelectedStatus('completed')}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 hover:bg-green-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setSelectedStatus('cancelled')}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 hover:bg-red-200'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      <AnimatePresence>
        <div className="grid gap-6">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{request.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <FiMail className="mr-2" />
                  <a href={`mailto:${request.email}`} className="hover:text-primary">
                    {request.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiPhone className="mr-2" />
                  <a href={`tel:${request.phone}`} className="hover:text-primary">
                    {request.phone}
                  </a>
                </div>
                {request.preferredDate && (
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2" />
                    <span>Preferred: {new Date(request.preferredDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Message:</h4>
                <p className="text-gray-600">{request.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <FiCalendar className="mr-1" />
                  {new Date(request.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  {request.status === 'new' && (
                    <button
                      onClick={() => handleStatusChange(request.id, 'scheduled')}
                      className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                    >
                      <FiCheck className="mr-1" />
                      Mark as Scheduled
                    </button>
                  )}
                  {request.status === 'scheduled' && (
                    <button
                      onClick={() => handleStatusChange(request.id, 'completed')}
                      className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                    >
                      <FiCheck className="mr-1" />
                      Mark as Completed
                    </button>
                  )}
                  {(request.status === 'new' || request.status === 'scheduled') && (
                    <button
                      onClick={() => handleStatusChange(request.id, 'cancelled')}
                      className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                    >
                      <FiX className="mr-1" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredRequests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              No requests found.
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default AppointmentRequests; 