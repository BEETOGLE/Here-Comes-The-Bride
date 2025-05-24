interface DreamDressRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  dreamDress: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: string;
}

const STORAGE_KEY = 'dream_dress_requests';

export const dreamFinderService = {
  submitRequest: (data: Omit<DreamDressRequest, 'id' | 'status' | 'createdAt'>): DreamDressRequest => {
    const requests = dreamFinderService.getRequests();
    
    const newRequest: DreamDressRequest = {
      ...data,
      id: `request-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));

    // In a real application, you would also:
    // 1. Send an email notification to the store
    // 2. Send a confirmation email to the customer
    // 3. Store the request in a database
    
    return newRequest;
  },

  getRequests: (): DreamDressRequest[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  updateRequestStatus: (id: string, status: DreamDressRequest['status']): void => {
    const requests = dreamFinderService.getRequests();
    const index = requests.findIndex(r => r.id === id);
    
    if (index !== -1) {
      requests[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    }
  }
}; 