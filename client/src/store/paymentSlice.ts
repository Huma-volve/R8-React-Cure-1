import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PaymentState = {
  method: "card" | "paypal" | "applepay";
  booking_id?: number;
};

const initialState: PaymentState = { method: "card" };

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<PaymentState["method"]>) {
      state.method = action.payload;
    },
    setBookingId(state, action: PayloadAction<number>) {
      state.booking_id = action.payload;
    },
  },
});

export const { setMethod, setBookingId } = paymentSlice.actions;
export default paymentSlice.reducer;
