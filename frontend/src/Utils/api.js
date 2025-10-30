import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true
});

// Auth
export const login = (username, password) =>
  API.post('/api/auth/login', { username, password });

export const logout = () => API.post('/api/auth/logout');

export const register = ({ username, password, role = 'user' }) =>
  API.post('/api/auth/register', { username, password, role }, {
    headers: { 'Content-Type': 'application/json' }
  });

// Family
export const getMembers = () => API.get('/api/family').then(r => r.data);
export const createMember = (payload) => API.post('/api/family', payload);
export const updateMember = (id, payload) => API.put(`/api/family/${id}`, payload);
export const deleteMember = (id) => API.delete(`/api/family/${id}`);
