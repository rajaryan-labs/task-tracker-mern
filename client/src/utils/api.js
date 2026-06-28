import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.messages?.[0] ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Auth API functions
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getMe: () => api.get('/auth/me'),
};

// Task API functions
export const taskAPI = {
  // Get all tasks with optional query params
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v && v !== 'all')
    ).toString();
    return api.get(`/tasks${queryString ? `?${queryString}` : ''}`);
  },

  // Get single task
  getById: (id) => api.get(`/tasks/${id}`),

  // Create new task
  create: (taskData) => api.post('/tasks', taskData),

  // Update task
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),

  // Delete task
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;
