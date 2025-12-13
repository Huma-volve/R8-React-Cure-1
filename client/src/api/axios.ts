import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://round8-backend-team-one.huma-volve.com',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;