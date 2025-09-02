import axios from 'axios';

const apiUrl = process.env.VITE_BACKEND_URL

const API = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
})

export default API