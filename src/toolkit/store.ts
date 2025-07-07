import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import userSlice from './users/slice';
import timeSlotSlice from './timeSlot/slice';
import bookingSlice from './bookings/slice';
import workShopSlice from './workshop/slice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme'],
  };
  
const rootReducer = combineReducers({
    userSlice,
    timeSlotSlice,
    bookingSlice,
    workShopSlice
})
const persistReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : persistReducers,
    devTools : true,
    middleware : getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck : false
    })
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;