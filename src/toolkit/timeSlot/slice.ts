import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { initialState, timeSlotResponseProps } from "./types";
import { timeSlotThunk } from './thunk';
import { toast } from "sonner";

const initialState: initialState = {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    updateing: false
}
const timeSlotSlice = createSlice({
    name: 'time-slot',
    reducers: {},
    initialState,
    extraReducers: (builder) => { 
        builder.addCase(timeSlotThunk.getAllTimeSlotRelatedToWorkShop.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(timeSlotThunk.getAllTimeSlotRelatedToWorkShop.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
        builder.addCase(timeSlotThunk.getAllTimeSlotRelatedToWorkShop.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(timeSlotThunk.createTimeSlotThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(timeSlotThunk.createTimeSlotThunk.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
            toast.success(action.payload.message, {dismissible:true})
        })
        builder.addCase(timeSlotThunk.createTimeSlotThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(timeSlotThunk.getAllTimeSlotsThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(timeSlotThunk.getAllTimeSlotsThunk.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
        builder.addCase(timeSlotThunk.getAllTimeSlotsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(timeSlotThunk.getSingleTimeSlotsThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(timeSlotThunk.getSingleTimeSlotsThunk.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
        builder.addCase(timeSlotThunk.getSingleTimeSlotsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(timeSlotThunk.updateTimeSlotThunk.pending, (state) => {
            state.updateing =true
        })
        builder.addCase(timeSlotThunk.updateTimeSlotThunk.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.updateing = false
            state.isSuccess = true
            state.data = action.payload
            toast.success(action.payload.message, {dismissible:true})
        })
        builder.addCase(timeSlotThunk.updateTimeSlotThunk.rejected, (state, action) => {
            state.updateing = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(timeSlotThunk.deleteTimeSlotThunk.pending, (state) => {
            state.updateing =true
        })
        builder.addCase(timeSlotThunk.deleteTimeSlotThunk.fulfilled, (state, action : PayloadAction<timeSlotResponseProps>) => {
            state.updateing = false
            state.isSuccess = true
            state.data = action.payload
            toast.success(action.payload.message, {dismissible:true})
        })
        builder.addCase(timeSlotThunk.deleteTimeSlotThunk.rejected, (state, action) => {
            state.updateing = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
    }
})
export default timeSlotSlice.reducer