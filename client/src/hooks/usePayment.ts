import { useMutation, useQuery } from "@tanstack/react-query";

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
