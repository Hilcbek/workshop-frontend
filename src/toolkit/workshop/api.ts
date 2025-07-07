import Cookies from "js-cookie";
import { baseURL } from "../../config/axios"
import type {updateWorkShopSchemaType, workshopInputSchemaType} from './types'
const getAuthHeader = () => {
    const token = Cookies.get("token");
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  };
const getAllWorkShops = async () => {
    const response = await baseURL.get(`/workshops`, getAuthHeader());
    return response.data;
}
const createWorkShop = async (data : workshopInputSchemaType) => {
  const response = await baseURL.post('/workshops', data, getAuthHeader())
  return response.data
}
const updateWorkshop = async (id : string,data: updateWorkShopSchemaType) => {
  const response = await baseURL.patch(`/workshops/${id}`, data, getAuthHeader())
  return response.data
}
const deleteWorkshop = async (id: string) => {
  const response = await baseURL.delete(`/workshops/${id}`, getAuthHeader())
  return response.data
}
const getSingleWorkshop = async (id: string) => {
  const response = await baseURL.get(`/workshops/${id}`, getAuthHeader())
  return response.data
}
export const workshopApi = {
    getAllWorkShops,
  createWorkShop,
  updateWorkshop,
  deleteWorkshop,
  getSingleWorkshop
}