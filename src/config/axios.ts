import axios from 'axios'
export const baseURL = axios.create({
    baseURL : 'https://workshop-backend-j4dm.onrender.com/api',
    withCredentials : true
})
// https://workshop-backend-j4dm.onrender.com/api