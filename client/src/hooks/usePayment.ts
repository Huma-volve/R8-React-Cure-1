import { useMutation, useQuery } from "@tanstack/react-query";
import { createPaymentIntent, confirmPayment, getBookingById, getDoctorById } from "../api/auth";

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

export type CreatePaymentIntentPayload = {
  appointment_id: number;
  amount?: number; // Optional, backend might calculate it
};

export type PaymentIntentResponse = {
  status: boolean;
  message: string;
  data: {
    payment_intent_id: string;
    client_secret: string;
    payment_id: number;
    publishableKey: string;
  };
};

export type ConfirmPaymentPayload = {
  payment_intent_id: string;
  appointment_id: number;
  payment_method_id?: string; // Optional: payment method ID if using card payment
};

export type ConfirmPaymentResponse = {
  status: boolean;
  message: string;
  data: {
    stripe_status: string; // e.g., "requires_payment_method", "succeeded", etc.
  };
};

// ---- Static / mock data instead of real API calls ----

async function sendPaymentMock(_payload: PaymentPayload) {
  // Simulate a short delay then return a fake success response
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    status: "success",
    message: "Mock payment processed successfully.",
  };
}

async function getSavedPaymentMethodsMock(): Promise<SavedPaymentMethod[]> {
  // Static list of saved cards
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    {
      provider_token: "pm_mock_visa_1234",
      brand: "Visa",
      last_four: "2783",
      exp_month: 3,
      exp_year: 2025,
      is_default: true,
    },
    {
      provider_token: "pm_mock_mastercard_5678",
      brand: "Mastercard",
      last_four: "5678",
      exp_month: 11,
      exp_year: 2027,
      is_default: false,
    },
  ];
}

/**
 * Hook to create Stripe payment intent
 */
export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (payload: CreatePaymentIntentPayload) =>
      createPaymentIntent(payload),
  });
}

/**
 * Hook to confirm Stripe payment
 */
export function useConfirmPayment() {
  return useMutation({
    mutationFn: (payload: ConfirmPaymentPayload) =>
      confirmPayment(payload),
  });
}

/**
 * Hook to get booking details by ID
 */
export function useBookingDetails(bookingId: number | undefined) {
  return useQuery({
    queryKey: ["bookingDetails", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });
}

/**
 * Hook to get doctor details by ID
 */
export function useDoctorDetails(doctorId: number | string | undefined) {
  return useQuery({
    queryKey: ["doctorDetails", doctorId],
    queryFn: () => getDoctorById(String(doctorId!)),
    enabled: !!doctorId,
  });
}

export function useSendPayment() {
  // Use react-query mutation but with mock function (no real API)
  return useMutation({
    mutationFn: sendPaymentMock,
  });
}

export function useSavedPaymentMethods() {
  // Use react-query query with static mock data
  return useQuery({
    queryKey: ["savedPaymentMethods"],
    queryFn: getSavedPaymentMethodsMock,
  });
}
