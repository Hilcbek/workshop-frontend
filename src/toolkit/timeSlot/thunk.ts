import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { timeSlotApi } from "./api";
import type { timeSlotInputSchemaType } from "./types";

const getAllTimeSlotRelatedToWorkShop = createAsyncThunk(
    'timeSlot/getAllTimeSlotRelatedToWorkShop',
    async ({workShopId} : {workShopId : string} , thunkApi) => {
        try {
            const response = await timeSlotApi.getTimeSloteRelatedToWorkshop( {workShopId:workShopId});
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const createTimeSlotThunk = createAsyncThunk(
    'timeSlot/createTimeSlost',
    async (data:timeSlotInputSchemaType , thunkApi) => {
        try {
            const response = await timeSlotApi.createTimeSlot(data)
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const getAllTimeSlotsThunk = createAsyncThunk(
    'timeSlot/getAllTimeSlot',
    async (_ , thunkApi) => {
        try {
            const response = await timeSlotApi.getAllTimeSlot()
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const getSingleTimeSlotsThunk = createAsyncThunk(
    'timeSlot/getSingleTimeSlotsThunk',
    async (id:string , thunkApi) => {
        try {
            const response = await timeSlotApi.getSingleTimeSlot(id)
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const updateTimeSlotThunk = createAsyncThunk(
    'timeSlot/updateTimeSlot',
    async ({ id, endDate, startDate, maxCapacity }: { id: string; startDate : string , endDate : string, maxCapacity : number } , thunkApi) => {
        try {
            const response = await timeSlotApi.updateTimeSlot(id , {startTime : startDate , endTime : endDate, maxCapacity :maxCapacity})
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const deleteTimeSlotThunk = createAsyncThunk(
    'timeSlot/deleteTimeSlot',
    async (id:string , thunkApi) => {
        try {
            const response = await timeSlotApi.deleteTimeSlot(id)
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
export const timeSlotThunk = {
    getAllTimeSlotRelatedToWorkShop,
    createTimeSlotThunk,
    getAllTimeSlotsThunk,
    getSingleTimeSlotsThunk,
    updateTimeSlotThunk,
    deleteTimeSlotThunk
}