import axios from 'axios';

export const API_URL = import.meta.env.VITE_BACKEND_URL;
export const DEPLOYED_URL = "https://zosh-bazzar-backend.onrender.com"
// change api

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});