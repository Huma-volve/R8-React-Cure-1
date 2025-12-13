import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export type PaymentPayload = {
  booking_id: number;
  payment_method_id: string; // Stripe Payment Method ID (e.g., "pm_...")
  gateway: "stripe";
};

export type SavedPaymentMethod = {
  provider_token: string; // Token from Stripe (e.g., "pm_card_...")
  brand: string; // Card brand (e.g., "Visa", "Mastercard")
  last_four: string; // Last 4 digits of card
  exp_month: number; // Expiry month (1-12)
  exp_year: number; // Expiry year (e.g., 2025)
  is_default: boolean; // Whether this is the default payment method
};

async function sendPayment(payload: PaymentPayload) {
  const { data } = await api.post("/payments/process", payload);
  return data;
}

async function getSavedPaymentMethods(): Promise<SavedPaymentMethod[]> {
  const { data } = await api.get("/payments/methods");
  return data;
}

export function useSendPayment() {
  return useMutation({
    mutationFn: sendPayment,
  });
}

export function useSavedPaymentMethods() {
  return useQuery({
    queryKey: ["savedPaymentMethods"],
    queryFn: getSavedPaymentMethods,
  });
}
