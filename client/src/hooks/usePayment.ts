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

export type PaymentIntentResponse = {
  payment_intent_id: string;
  client_secret: string;
  payment_id: number;
  publishableKey: string;
};

export type ConfirmPaymentResponse = {
  stripe_status?: string; // e.g., "requires_payment_method", "succeeded", etc.
  [key: string]: any;
};

// Helper function to check API response status
function checkApiResponse(response: any, defaultMessage: string = "API request failed") {
  if (response.status !== true && response.status !== 200) {
    const error = new Error(response.message || defaultMessage) as Error & { 
      data?: any;
      stripe_status?: string;
    };
    // Include additional data in error for better error handling
    if (response.data) {
      error.data = response.data;
      if (response.data.stripe_status) {
        error.stripe_status = response.data.stripe_status;
      }
    }
    throw error;
  }
  return response;
}

async function createPaymentIntent(payload: PaymentPayload): Promise<PaymentIntentResponse> {
  const { data } = await api.post("/stripe/create-payment-intent", payload);
  // API returns { status: true, message: "Payment intent created successfully", data: {...} }
  checkApiResponse(data, "Failed to create payment intent");
  return data.data;
}

async function sendPayment(payload: PaymentPayload) {
  // Step 1: create payment intent on backend
  const paymentIntent = await createPaymentIntent(payload);

  // Step 2: confirm payment on backend (using booking_id)
  const { data } = await api.post("/stripe/confirm-payment", {
    booking_id: payload.booking_id,
  });

  // API returns { status: true/false, message: "...", data: { stripe_status: "..." } }
  // Check response status - will throw error if status is false
  checkApiResponse(data, "Failed to confirm payment");

  return {
    ...data.data, // Extract data from response
    paymentIntent, // Include payment intent data in response
  };
}

async function getSavedPaymentMethods(): Promise<SavedPaymentMethod[]> {
  try {
    const { data } = await api.get("/payments/methods");
    // API might return { status, message, data: [] } or just array
    if (data?.data) {
      return data.data;
    }
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    // If endpoint doesn't exist (404) or other errors, return empty array
    // This allows the app to continue working without saved payment methods
    if (error?.response?.status === 404) {
      console.warn("Payments methods endpoint not available, returning empty array");
      return [];
    }
    // Re-throw other errors
    throw error;
  }
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: createPaymentIntent,
  });
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
    retry: false, // Don't retry on failure
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid repeated 404 errors
  });
}
