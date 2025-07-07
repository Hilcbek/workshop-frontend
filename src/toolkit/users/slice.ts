import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import { type initialState, type userResponseProps } from './types';
import { userThunk } from './thunk';
import { toast } from 'sonner';

const initialState : initialState = {
    data : null,
    isLoading : false,
    isSuccess : false,
    isError : false,
    isLoggedIn : false,
    isLoggedInLoading : false
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers :{
        LOGOUT :(state) => {
            state.data = null
            state.isLoggedIn = false
            state.isLoggedInLoading = false
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
        }
    },
    extraReducers(builder) {
        builder.addCase(userThunk.createUserThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(userThunk.createUserThunk.fulfilled, (state, action : PayloadAction<userResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
            toast.success(action.payload.message)
        })
        builder.addCase(userThunk.createUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            toast.error(action.payload as string)
        })
        builder.addCase(userThunk.loginUserThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(userThunk.loginUserThunk.fulfilled, (state, action : PayloadAction<userResponseProps>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.data = action.payload
            toast.success(action.payload.message)
        })
        builder.addCase(userThunk.loginUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isLoggedIn = false
            toast.error(action.payload as string)
        })
         builder.addCase(userThunk.getLoggedInUserThunk.pending, (state) => {
            state.isLoggedInLoading = true
        })
        builder.addCase(userThunk.getLoggedInUserThunk.fulfilled, (state, action : PayloadAction<userResponseProps>) => {
            state.isLoggedInLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.data = action.payload
        })
        builder.addCase(userThunk.getLoggedInUserThunk.rejected, (state,) => {
            state.isLoggedInLoading = false
            state.isError = true
            state.isLoggedIn = false
        })
    },
})
export default userSlice.reducer
export const {LOGOUT} = userSlice.actions 
