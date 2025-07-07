import { baseURL } from "../../config/axios";
import type { userInputSchemaType } from "./types";
import Cookies from 'js-cookie'

const createUser = async (user : userInputSchemaType) => {
    const response = await baseURL.post('/user/', user);
    return response.data;
}
const loginUser = async (user : Omit<userInputSchemaType, 'email'>) => {
    const response = await baseURL.post('/user/login', user);
    return response.data;
}
const getLoggedInUser = async () => {
    const token = Cookies.get('token')
    const response = await baseURL.get('/user', {
        headers : {
            authorization : `Bearer ${token}`
        }
    });
    return response.data;
}
export const userApi = {
    createUser,
    loginUser,
    getLoggedInUser
}