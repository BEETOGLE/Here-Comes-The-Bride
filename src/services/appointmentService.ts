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

const STORAGE_KEY = 'appointment_requests';

export const appointmentService = {
  submitRequest: (data: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>): AppointmentRequest => {
    const requests = appointmentService.getRequests();
    
    const newRequest: AppointmentRequest = {
      ...data,
      id: `appointment-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    
    return newRequest;
  },

  getRequests: (): AppointmentRequest[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  updateRequestStatus: (id: string, status: AppointmentRequest['status']): void => {
    const requests = appointmentService.getRequests();
    const index = requests.findIndex(r => r.id === id);
    
    if (index !== -1) {
      requests[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    }
  }
}; 