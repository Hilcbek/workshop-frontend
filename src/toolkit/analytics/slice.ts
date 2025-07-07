import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { analyticsThunk } from './thunk';
import type { analyticsBookingResponse, initialState } from './types';

const initialState: initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const analyticsSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        CLEAR_BOOKING_STATE: (state) => {
            state.data = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(analyticsThunk.getMyBookingsThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            analyticsThunk.getMyBookingsThunk.fulfilled,
            (state, action: PayloadAction<analyticsBookingResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
                
            }
        );
        builder.addCase(analyticsThunk.getMyBookingsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            toast.error(action.payload as string);
        })
    }
})
export default analyticsSlice.reducer