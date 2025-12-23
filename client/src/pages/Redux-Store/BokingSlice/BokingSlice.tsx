import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------ Types ------------------
export  interface Booking {
  id: number;
  doctor_id : number;
  doctor: {
    name: string;
    image?: string;
    job: string;
  };
  date: string;
  time: string;
  status: string;
  cancelStatus: string;
  address: string;
  can_cancel: boolean;
}

interface BookingState {
  status: string;
  cancelStatus: string;
  allData: Booking[];
  isError: boolean;
  isLoading: boolean;
  isLoadingCancel: boolean;
  isErrorCancel: boolean;
  isSuccess: boolean;
  errorMessageCancel  : string
}

interface BookingResponse {
  data: Booking[];
}

// ------------------ Initial State ------------------
const initialState: BookingState = {
  status: "all",
  cancelStatus: "",
  allData: [],
  isError: false,
  isLoading: false,
  isLoadingCancel: false,
  errorMessageCancel : "" ,
  isErrorCancel: false,
  isSuccess: false,
};

const token = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

// ------------------ Async Thunks ------------------  //

export const fetchBookings = createAsyncThunk<Booking[], string | undefined>(
  "booking/fetchBookings",
  async (status) => {
    const res = await axios.get<BookingResponse>(
      "https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/my-bookings",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: status && status !== "all" ? { status } : {},
      }
    );
    
    return res.data.data;
  }
);




export const cancelAppointment = createAsyncThunk< number, number>( "booking/cancelAppointment" , async (id: number) => {
    
      await axios.post(
        `https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/${id}/cancel`,
        {},
        { headers: { 
            Authorization: `Bearer ${token}` } 
        }
      );
      return id;
  }
);







// type BookingDate = {
//   doctor_id: number;
//   date: string;
//   time: string;
// };

// export const bookAppointment = createAsyncThunk<BookingDate, BookingDate>(
//   "booking/bookAppointment",
//   async ({ doctor_id, date, time }) => {
//     const res = await axios.post(
//       `https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/book`,
//       { doctor_id , date, time },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       }
//     );

//     return res.data; 
//   }
// );






// interface BookAppointmentPayload {
//   doctorId : number ;
//   date : string ;
//   time : string
// }
// export const bookAppointment = createAsyncThunk<BookAppointmentPayload>("booking/bookAppointment" , async ({doctorId , date , time  })=>{
//  const res =  await axios.post(
//     `https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/book`,
//     { doctor_id: doctorId , date , time  },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   return res.data
// })

// ------------------ Slice ------------------
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    checkStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allData = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })


      .addCase(cancelAppointment.pending, (state) => {
        state.isLoadingCancel = true;
        state.isErrorCancel = false
        state.errorMessageCancel = ""
      })
      .addCase(cancelAppointment.fulfilled, (state , action : PayloadAction<number>) => {
        state.isErrorCancel = false;
        state.isLoadingCancel = false;
        state.allData = state.allData.filter(b => b.id !== action.payload)
        console.log("fulfilled");
        
      })
      .addCase(cancelAppointment.rejected, (state , action) => {
        state.isLoadingCancel = false;
        state.isErrorCancel = true;
        state.errorMessageCancel = action.payload as string || "Failed to cancel"
        console.log("rejected");
      })



      // builder.addCase(bookAppointment.pending , (state )=>{
      //   state.isLoading = true;
      //   state.isError = false;
      //   state.isSuccess = false
      // })
      //   .addCase(bookAppointment.fulfilled , (state , action )=>{
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true ;
      //     state.allData.push(action.payload as unknown as Booking)
      //     console.log("mostafa ahmed hassan");
          
      //   })
      //  .addCase(bookAppointment.rejected , (state )=>{
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false
      //     console.log("mostafa hassan");
          
      // })
  },
});

export const { checkStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
