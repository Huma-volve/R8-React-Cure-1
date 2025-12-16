

import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "../BokingSlice/BokingSlice"
import ChatSlice from "../ChatSlice/ChatSlice"

export const myStore = configureStore({
    reducer : {
     bookingSlice ,
     ChatSlice
    }
})


 export type RootState = ReturnType<typeof myStore.getState>;
 export type AppDispatch = typeof myStore.dispatch;
 