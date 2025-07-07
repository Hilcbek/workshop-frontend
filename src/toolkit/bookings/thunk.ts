import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { bookingApi } from './api';
import type {
  bookingInputSchemaType,
  bookingUpdateSchemaType,
} from './types';

const createBookingThunk = createAsyncThunk(
  'booking/createBooking',
  async (booking: bookingInputSchemaType, thunkApi) => {
    try {
      const response = await bookingApi.createBooking(booking);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);

const getMyBookingsThunk = createAsyncThunk(
  'booking/getMyBookings',
  async (_, thunkApi) => {
    try {
      const response = await bookingApi.getMyBookings();
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);


const getAllBookingsThunk = createAsyncThunk(
  'booking/getAllBookings',
  async ({limit, page} : {page : number , limit : number}, thunkApi) => {
    try {
      const response = await bookingApi.getAllBookings({limit : limit, page : page});
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);


const updateBookingThunk = createAsyncThunk(
  'booking/updateBooking',
  async (
    { id, data }: { id: number; data: bookingUpdateSchemaType },
    thunkApi
  ) => {
    try {
      const response = await bookingApi.updateBooking(id, data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);


const deleteBookingThunk = createAsyncThunk(
  'booking/deleteBooking',
  async (id: number, thunkApi) => {
    try {
      const response = await bookingApi.deleteBooking(id);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);


const getBookingAnalyticsThunk = createAsyncThunk(
  'booking/analytics',
  async (_, thunkApi) => {
    try {
      const response = await bookingApi.getBookingAnalytics();
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);
const getAllLoggedUserBookingsThunk = createAsyncThunk(
  'booking/getAllLoggedUserBookings',
  async (_, thunkApi) => {
    try {
      const response = await bookingApi.getAllLoggedUserBookings();
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);
const getSingleBookingThunk = createAsyncThunk(
  'booking/getSingleBooking',
  async (id:string, thunkApi) => {
    try {
      const response = await bookingApi.getSingleBooking(id);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
      return thunkApi.rejectWithValue('An unexpected error occurred');
    }
  }
);
export const bookingThunk = {
  createBookingThunk,
  getMyBookingsThunk,
  getAllBookingsThunk,
  updateBookingThunk,
  deleteBookingThunk,
  getBookingAnalyticsThunk,
  getAllLoggedUserBookingsThunk,
  getSingleBookingThunk
};
