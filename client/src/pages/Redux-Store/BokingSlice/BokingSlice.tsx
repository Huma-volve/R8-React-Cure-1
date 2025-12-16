
import { createSlice } from "@reduxjs/toolkit";

// interface data {

//     statuse :  string  
// }

const bookingSlice = createSlice({

    name : "bookingSlice" ,
    initialState : {
        status : "all"
    },

    reducers : { 
        checkStatus : (state , action )=>{

              state.status = action.payload

        }
     }
})

export default bookingSlice.reducer
export const checkStatus =  bookingSlice.actions.checkStatus

