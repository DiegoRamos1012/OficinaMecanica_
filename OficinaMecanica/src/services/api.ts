import axios from "axios";

// Crie uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptador para adicionar o token de autenticação em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@OficinaMecanica:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Log de debug para cada requisição
  console.log(
    "[api.ts] Requisição:",
    config.method?.toUpperCase(),
    `${config.baseURL ?? ""}${config.url ?? ""}`,
    "Token:",
    token
  );
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("@OficinaMecanica:token");
      localStorage.removeItem("@OficinaMecanica:user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
