

import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "../BokingSlice/BokingSlice"

export const myStore = configureStore({
    reducer : {
     bookingSlice
    }
})


 export type RootState = ReturnType<typeof myStore.getState>;
 