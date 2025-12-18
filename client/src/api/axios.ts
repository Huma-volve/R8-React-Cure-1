import axios from "axios";

const api = axios.create({
  baseURL: "https://round8-cure-php-team-two.huma-volve.com/api/v1",
  timeout: 30000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";
  if (token) config.headers.Authorization = `${tokenType} ${token}`;
  return config;
});

export default api;
