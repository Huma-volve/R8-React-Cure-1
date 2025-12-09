import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PaymentState = {
  method: "card" | "paypal" | "applepay";
};

const initialState: PaymentState = { method: "card" };

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<PaymentState["method"]>) {
      state.method = action.payload;
    },
  },
});

export const { setMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
