// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // sửa nếu bạn dùng port hoặc route khác
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
