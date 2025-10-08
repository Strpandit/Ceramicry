import axios from 'axios';

const Api = axios.create({
  // baseURL: "http://localhost:3000/api/",
  baseURL: "https://ceramicry.onrender.com/api/",
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach token to requests
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Token'] = `Bearer ${token}`;
  }
  return config;
});

export default Api;
