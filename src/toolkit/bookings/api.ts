// src/services/bookingApi.ts
import { baseURL } from "../../config/axios";
import Cookies from "js-cookie";
import type { bookingInputSchemaType, bookingUpdateSchemaType,   } from "./types"; // define your types here

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

const createBooking = async (bookingData: bookingInputSchemaType) => {
  const response = await baseURL.post("/bookings", bookingData, getAuthHeader());
  return response.data;
};

const getMyBookings = async () => {
  const response = await baseURL.get("/bookings", getAuthHeader());
  return response.data;
};

const getAllBookings = async ({ page, limit } : {page : number , limit : number}) => {
  const response = await baseURL.get(`/bookings?page=${page}&limit=${limit}`, getAuthHeader());
  return response.data;
};

const updateBooking = async (id: number, updateData: bookingUpdateSchemaType) => {

  const response = await baseURL.patch(`/bookings/${id}`, updateData, getAuthHeader());
  return response.data;
};
const getSingleBooking = async (id:string) => {
  const response = await baseURL.get(`/bookings/${id}`, getAuthHeader());
  return response.data;
}
const deleteBooking = async (id: number) => {
  const response = await baseURL.delete(`/bookings/${id}`, getAuthHeader());
  return response.data;
};

const getBookingAnalytics = async () => {
  const response = await baseURL.get("/bookings/analytics", getAuthHeader());
  return response.data;
};
const getAllLoggedUserBookings = async () => {
  const response = await baseURL.get("/bookings/current-user/books", getAuthHeader());
  return response.data;
}

export const bookingApi = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingAnalytics,
  getSingleBooking,
  getAllLoggedUserBookings
};
