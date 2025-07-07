import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { workshopApi } from "./api";
import type {workshopInputSchemaType} from './types'
const getAllWorkShop = createAsyncThunk(
    'timeSlot/getAllTimeSlotRelatedToWorkShop',
    async (_, thunkApi) => {
        try {
            const response = await workshopApi.getAllWorkShops();
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const createWorkShopThunk = createAsyncThunk(
    'timeSlot/createWorkShop',
    async (data : workshopInputSchemaType, thunkApi) => {
        try {
            const response = await workshopApi.createWorkShop(data);
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const updateWoshopThunk = createAsyncThunk(
    'timeSlot/updateWorkShop',
    async ({ data, id}:{id : string , data : workshopInputSchemaType}, thunkApi) => {
        try {
            const response = await workshopApi.updateWorkshop(id,data);
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const deleteWoshopThunk = createAsyncThunk(
    'timeSlot/deleteWorkShop',
    async (id : string, thunkApi) => {
        try {
            const response = await workshopApi.deleteWorkshop(id);
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
const getSingledeleteWoshopThunk = createAsyncThunk(
    'timeSlot/getSingledWorkShop',
    async (id : string, thunkApi) => {
        try {
            const response = await workshopApi.getSingleWorkshop(id);
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkApi.rejectWithValue(error.response.data.error);
            }
            return thunkApi.rejectWithValue('An unexpected error occurred');
        }
    }
)
export const workShopThunk = {
    getAllWorkShop,
    createWorkShopThunk,
    updateWoshopThunk,
    deleteWoshopThunk,
    getSingledeleteWoshopThunk
}