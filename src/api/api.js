// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // عنوان الـ backend
  headers: { 'Content-Type': 'application/json' }
});

// إضافة التوكين تلقائياً لكل الطلبات
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;