import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type bookingInitialState, type bookingResponseProps } from './types';
import { bookingThunk } from './thunk';
import { toast } from 'sonner';

const initialState: bookingInitialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  updateing: false,
};

const bookingSlice = createSlice({
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
    
    builder.addCase(bookingThunk.createBookingThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.createBookingThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        toast.success(action.payload.message);
      }
    );
    builder.addCase(bookingThunk.createBookingThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });

    
    builder.addCase(bookingThunk.getMyBookingsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.getMyBookingsThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(bookingThunk.getMyBookingsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });

    
    builder.addCase(bookingThunk.getAllBookingsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.getAllBookingsThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(bookingThunk.getAllBookingsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });

    
    builder.addCase(bookingThunk.updateBookingThunk.pending, (state) => {
      state.updateing = true;
    });
    builder.addCase(
      bookingThunk.updateBookingThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.updateing = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
      }
    );
    builder.addCase(bookingThunk.updateBookingThunk.rejected, (state, action) => {
      state.updateing = false;
      state.isError = true;
      toast.error(action.payload as string);
    });

    
    builder.addCase(bookingThunk.deleteBookingThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.deleteBookingThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
      }
    );
    builder.addCase(bookingThunk.deleteBookingThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });

    
    builder.addCase(bookingThunk.getBookingAnalyticsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.getBookingAnalyticsThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(bookingThunk.getBookingAnalyticsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });
    builder.addCase(bookingThunk.getAllLoggedUserBookingsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.getAllLoggedUserBookingsThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(bookingThunk.getAllLoggedUserBookingsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });
    builder.addCase(bookingThunk.getSingleBookingThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      bookingThunk.getSingleBookingThunk.fulfilled,
      (state, action: PayloadAction<bookingResponseProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(bookingThunk.getSingleBookingThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload as string);
    });
  },
});

export default bookingSlice.reducer;
export const { CLEAR_BOOKING_STATE } = bookingSlice.actions;
