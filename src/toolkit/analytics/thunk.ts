import { createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsApi } from "./api";
import { AxiosError } from "axios";

const getMyBookingsThunk = createAsyncThunk(
    'booking/getMyBookings',
    async (_, thunkApi) => {
      try {
        const response = await analyticsApi.getAnalytics();
        return response;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return thunkApi.rejectWithValue(error.response.data.error);
        }
        return thunkApi.rejectWithValue('An unexpected error occurred');
      }
    }
);
  export const analyticsThunk = {
    getMyBookingsThunk,
  };