import axios from 'axios';

const api = axios.create({
  baseURL: 'https://round8-cure-php-team-two.huma-volve.com/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;