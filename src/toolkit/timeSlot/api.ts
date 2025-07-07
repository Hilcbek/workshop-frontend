import Cookies from "js-cookie";
import { baseURL } from "../../config/axios"
import type { timeSlotInputSchemaType } from "./types";

const getAuthHeader = () => {
    const token = Cookies.get("token");
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  };
  
const createTimeSlot = async (data : timeSlotInputSchemaType) => {
  const response = await baseURL.post("/time-slot", data, getAuthHeader())
  return response.data
}

const getTimeSloteRelatedToWorkshop = async ({ workShopId }: { workShopId: string }) => {
    const response = await baseURL.get(`/time-slot/time-slot-workshop/${workShopId}`, getAuthHeader())
    return response.data
}
const getAllTimeSlot = async () => { 
    const response = await baseURL.get("/time-slot", getAuthHeader())
    return response.data

}
const getSingleTimeSlot = async (id: string) => {
  const response = await baseURL.get(`/time-slot/${id}`, getAuthHeader())
  return response.data
}
const updateTimeSlot = async (id: string,{startTime , endTime} : {startTime : string , endTime : string}) => {
  const response = await baseURL.patch(`/time-slot/${id}`, {startTime , endTime}, getAuthHeader())
  return response.data
}
const deleteTimeSlot = async (id: string,) => {
  const response = await baseURL.delete(`/time-slot/${id}`, getAuthHeader())
  return response.data
}
export const timeSlotApi = {
    createTimeSlot,
  getTimeSloteRelatedToWorkshop,
  getAllTimeSlot,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
}
