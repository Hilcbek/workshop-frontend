import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { initialState, workshopResponseProps } from "./types";
import { toast } from "sonner";
import { workShopThunk } from "./thunk";

const initialState: initialState = {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    deleting : false
}
const workShopSlice = createSlice({
    name: 'workshop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(workShopThunk.getAllWorkShop.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(workShopThunk.getAllWorkShop.fulfilled, (state, action: PayloadAction<workshopResponseProps> ) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = action.payload
        })
        builder.addCase(workShopThunk.getAllWorkShop.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(workShopThunk.createWorkShopThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(workShopThunk.createWorkShopThunk.fulfilled, (state, action: PayloadAction<workshopResponseProps> ) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = action.payload
            toast.success(action.payload.message, {dismissible : true})
        })
        builder.addCase(workShopThunk.createWorkShopThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(workShopThunk.getSingledeleteWoshopThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(workShopThunk.getSingledeleteWoshopThunk.fulfilled, (state, action: PayloadAction<workshopResponseProps> ) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = action.payload
        })
        builder.addCase(workShopThunk.getSingledeleteWoshopThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
        builder.addCase(workShopThunk.deleteWoshopThunk.pending, (state) => {
            state.isLoading =true
        })
        builder.addCase(workShopThunk.deleteWoshopThunk.fulfilled, (state, action: PayloadAction<workshopResponseProps> ) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            if (state.data) {
                state.data.data = state.data.data.filter((data) => {
                  return data.id !== action.payload?.data[0].id;
                });
              }
              
        })
        builder.addCase(workShopThunk.deleteWoshopThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload as string)
        })
    }
})
export default workShopSlice.reducer