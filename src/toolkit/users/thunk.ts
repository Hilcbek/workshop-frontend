import { createAsyncThunk } from "@reduxjs/toolkit";
import type { userInputSchemaType } from "./types";
import { AxiosError } from "axios";
import { userApi } from "./api";

const createUserThunk = createAsyncThunk(
    'user/createUser',
    async (user:userInputSchemaType, thunkApi) => {
       try {
       const response = await userApi.createUser(user)
       return response
       } catch (error) {
       
        if(error instanceof AxiosError && error.response){
            return thunkApi.rejectWithValue(error.response?.data.error);
        }
        return thunkApi.rejectWithValue('An unexpected error occurred');
       }
    }
)
const loginUserThunk = createAsyncThunk(
    'user/loginUser',
    async (user:Omit<userInputSchemaType, 'email'>, thunkApi) => {
       try {
       const response = await userApi.loginUser(user)
       return response
       } catch (error) {
       
        if(error instanceof AxiosError && error.response){
            return thunkApi.rejectWithValue(error.response?.data.error);
        }
        return thunkApi.rejectWithValue('An unexpected error occurred');
       }
    }
)
const getLoggedInUserThunk = createAsyncThunk(
    'user/loggedInUser',
    async (_, thunkApi) => {
       try {
       const response = await userApi.getLoggedInUser()
       return response
       } catch (error) {
       
        if(error instanceof AxiosError && error.response){
            return thunkApi.rejectWithValue(error.response?.data.error);
        }
        return thunkApi.rejectWithValue('An unexpected error occurred');
       }
    }
)
export const userThunk = {
    createUserThunk,
    loginUserThunk,
    getLoggedInUserThunk
}