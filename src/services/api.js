// Centralized API service for consistent authentication handling
const API_BASE_URL = 'https://travella-server-v2.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get the current auth token
  getToken() {
    return localStorage.getItem('adminToken');
  }

  // Get headers with authentication
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Generic fetch method with authentication
  async fetch(url, options = {}) {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers
      }
    };

    const response = await fetch(`${this.baseURL}${url}`, config);
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }

    return response;
  }

  // GET request
  async get(url, options = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  // POST request
  async post(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(url, options = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  // PATCH request
  async patch(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export specific API methods for convenience
export const api = {
  // Auth endpoints
  login: (credentials) => apiService.post('/api/auth/login', credentials),
  getUserList: () => apiService.get('/api/auth/userlist'),

  // Dashboard endpoints
  getBookingStats: () => apiService.get('/api/bookings/stats'),
  getUserBookings: () => apiService.get('/api/bookings/userbookings'),
  updateBookingStatus: (bookingId, status) => 
    apiService.patch(`/api/bookings/${bookingId}/status`, { status }),

  // Destinations endpoints
  getDestinations: () => apiService.get('/api/destinations'),
  createDestination: (data) => apiService.post('/api/destinations', data),
  updateDestination: (id, data) => apiService.put(`/api/destinations/${id}`, data),
  deleteDestination: (id) => apiService.delete(`/api/destinations/${id}`),

  // Places endpoints
  getPlaces: () => apiService.get('/api/places'),
  createPlace: (data) => apiService.post('/api/places', data),
  updatePlace: (id, data) => apiService.put(`/api/places/${id}`, data),
  deletePlace: (id) => apiService.delete(`/api/places/${id}`),

  // Hotels endpoints
  getHotels: () => apiService.get('/api/hotels'),
  createHotel: (data) => apiService.post('/api/hotels', data),
  updateHotel: (id, data) => apiService.put(`/api/hotels/${id}`, data),
  deleteHotel: (id) => apiService.delete(`/api/hotels/${id}`),

  // Car Rentals endpoints
  getCarRentals: () => apiService.get('/api/carrentals'),
  createCarRental: (data) => apiService.post('/api/carrentals', data),
  updateCarRental: (id, data) => apiService.put(`/api/carrentals/${id}`, data),
  deleteCarRental: (id) => apiService.delete(`/api/carrentals/${id}`)
};
