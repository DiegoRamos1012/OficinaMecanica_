import axios from 'axios';

// Crie uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: "http://localhost:8080/api", // <- importante!
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

// Interceptador para adicionar o token de autenticação em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@OficinaMecanica:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;