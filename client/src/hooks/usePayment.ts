import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export type PaymentPayload = {
  amount: number;
  method: "card" | "paypal" | "applepay";
  card?: { number: string; name: string; expiry: string; cvv: string };
};

async function sendPayment(payload: PaymentPayload) {
  // Simulate API call for development/testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Payment successful" });
    }, 500);
  });

  // Original API call (uncomment when API is ready)
  // const { data } = await api.post("/payments", payload);
  // return data;
}

export function useSendPayment() {
  return useMutation({
    mutationFn: sendPayment,
  });
}
