import axios from 'axios'

export const api_back  = axios.create({
    baseURL: 'http://localhost:5000',
})