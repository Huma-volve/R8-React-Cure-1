import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentSlice";
import bookingSlice from "../pages/Redux-Store/BokingSlice/BokingSlice";
import ChatSlice from "../pages/Redux-Store/ChatSlice/ChatSlice";

export const store = configureStore({
  reducer: { 
    payment: paymentReducer,
    bookingSlice,
    ChatSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
