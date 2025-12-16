import {  createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
//createAsyncThunk,
// ------------------ Types ------------------
interface Booking {
  id: number;
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
  isSuccess: boolean;
}

// ------------------ Initial State ------------------
const initialState: BookingState = {
  status: "all",
  cancelStatus: "",
  allData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

// const token = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

// ------------------ Async Thunks ------------------
// export const fetchBookings = createAsyncThunk<Booking[], string | undefined>(
//   "booking/fetchBookings",
//   async (status) => {
//     const res = await axios.get<Booking[]>(
//       "https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/my-bookings",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         params: status && status !== "all" ? { status } : {},
//       }
//     );
//     return res.data;
//   }
// );

// export const cancelAppointment = createAsyncThunk<void, number>(
//   "booking/cancelAppointment",
//   async (id) => {
//     await axios.post(
//       `https://round8-cure-php-team-two.huma-volve.com/api/v1/appointments/${id}/cancel`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//   }
// );

// ------------------ Slice ------------------
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    checkStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBookings.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchBookings.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = false;
  //       state.isSuccess = true;
  //       state.allData = action.payload;
  //     })
  //     .addCase(fetchBookings.rejected, (state) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.isSuccess = false;
  //     })
  //     .addCase(cancelAppointment.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(cancelAppointment.fulfilled, (state) => {
  //       state.isLoading = false;
  //       state.isError = false;
  //       state.isSuccess = true;
  //     })
  //     .addCase(cancelAppointment.rejected, (state) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //     });
  // },
});

export const { checkStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
