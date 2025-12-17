import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AppleIcon from "@mui/icons-material/Apple";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSendPayment, useSavedPaymentMethods } from "../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import { setMethod } from "../store/paymentSlice";
import type { AppDispatch, RootState } from "../store";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
type Props = { onSuccess?: (msg?: string) => void };

type PaymentFormValues = {
  cardNumber: string;
  name: string;
  expiry: string;
  cvv: string;
};

const paymentOptions = [
  {
    id: "card" as const,
    label: "Credit Card",
    hint: "",
    icon: <CreditCardIcon />,
  },
  {
    id: "paypal" as const,
    label: "PayPal",
    hint: "",
    icon: <PaymentIcon />,
  },
  {
    id: "applepay" as const,
    label: "Apple Pay",
    hint: "",
    icon: <AppleIcon />,
  },
];

// Helper function to create Stripe payment method
async function createStripePaymentMethod(
//   cardNumber: string,
//   expiry: string,
//   cvv: string,
  name: string
): Promise<string> {
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (!stripePublishableKey) {
    // If Stripe key is not configured, return a test payment method ID
    // In production, you should handle this error properly
    console.warn("Stripe publishable key not found. Using test payment method ID.");
    return "pm_test_1234567890";
  }
    const stripe = useStripe();
  try {
    const stripee = await loadStripe(stripePublishableKey);
    if (!stripee) {
      throw new Error("Failed to load Stripe");
    }

    // Parse expiry date (MM/YY format)
    // const [month, year] = expiry.split("/");
    // const expYear = parseInt(`20${year}`, 10);
    // const expMonth = parseInt(month, 10);
    const elements = useElements();
    // Create payment method using Stripe.js
   const cardElement = elements!.getElement(CardElement);

    const { paymentMethod, error } = await stripe!.createPaymentMethod({
    type: "card",
    card: cardElement!,
    billing_details: {
        name: name,
    },
    });

    if (error) {
    console.log(error);
    } else {
    console.log(paymentMethod);
    }

    if (error) {
      throw error;
    }

    if (!paymentMethod) {
      throw new Error("Failed to create payment method");
    }

    return paymentMethod.id;
  } catch (error) {
    console.error("Error creating Stripe payment method:", error);
    // Return a test payment method ID as fallback
    // In production, you should show an error to the user
    return "pm_test_1234567890";
  }
}

export default function PaymentCard({ onSuccess }: Props) {
  const mutation = useSendPayment();
  const { data: savedPaymentMethods, isLoading: isLoadingSavedMethods } =
    useSavedPaymentMethods();
  const dispatch = useDispatch<AppDispatch>();
  const selectedMethod = useSelector(
    (state: RootState) => state.payment.method
  );
  const bookingId = useSelector(
    (state: RootState) => state.payment.booking_id
  );
  const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  // Get default saved payment method
  const defaultSavedMethod = savedPaymentMethods?.find((method) => method.is_default) || savedPaymentMethods?.[0];
  const hasSavedCard = !!defaultSavedMethod;

  // Validation removed since inputs are hidden per request.
  const PaymentSchema = Yup.object();

  const initialValues: PaymentFormValues = {
    cardNumber: "3642364626382783",
    name: "David Patel",
    expiry: "03/25",
    cvv: "200",
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "#e5e7eb",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <CardContent sx={{ p: 3, pb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src="https://i.pravatar.cc/120?img=32"
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <Typography variant="subtitle1" fontWeight={600}>
                Dr. Jessica Turner
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Pulmonologist
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                129, El-Nasr Street, Cairo
              </Typography>
              <Stack direction="row" spacing={3} mt={1} alignItems="center">
                <Chip
                  label="Friday, July 17 • 4:00pm"
                  size="small"
                  color="default"
                />
                <Typography
                  variant="caption"
                  color="primary"
                  className="cursor-pointer"
                >
                  Reschedule
                </Typography>
              </Stack>
            </div>
          </Stack>

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5 }}>
            Payment Method
          </Typography>

          {isLoadingSavedMethods ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              Loading payment methods...
            </Typography>
          ) : hasSavedCard && !showAddCardForm && selectedMethod === "card" ? (
            // Display saved card
            <Box
              sx={{
                mt: 1,
                borderRadius: 2,
                border: "2px solid #0d4a73",
                backgroundColor: "#f8fafc",
                p: 2.5,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CreditCardIcon sx={{ fontSize: 32, color: "#0d4a73" }} />
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {defaultSavedMethod.brand}
                      </Typography>
                      {defaultSavedMethod.is_default && (
                        <Chip
                          label="Default"
                          size="small"
                          sx={{
                            backgroundColor: "#0d4a73",
                            color: "white",
                            fontSize: "0.7rem",
                            height: "20px",
                          }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      •••• •••• •••• {defaultSavedMethod.last_four}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Expires {String(defaultSavedMethod.exp_month).padStart(2, "0")}/{defaultSavedMethod.exp_year}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setShowAddCardForm(true);
                      dispatch(setMethod("card"));
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ) : (
            // Show payment method options or add card form
            <>
              <Stack spacing={1.2}>
                {paymentOptions.map((option) => {
                  const isActive = selectedMethod === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => dispatch(setMethod(option.id))}
                      className={`w-full rounded-lg border transition flex items-center justify-between px-4 py-3 text-base ${
                        isActive
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 21 }}
                            className="text-emerald-600"
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ fontSize: 21 }}
                            className="text-slate-400"
                          />
                        )}
                        <div
                          className="flex items-center gap-2 font-medium text-slate-700"
                          style={{ fontSize: 19 }}
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                      </div>
                      {option.id === "card" ? (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                          alt="visa"
                          className="h-5"
                        />
                      ) : null}
                      {option.id === "paypal" ? (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                          alt="paypal"
                          className="h-5"
                        />
                      ) : null}
                      {option.id === "applepay" ? (
                        <span className="text-sm font-semibold">
                          <AppleIcon /> Pay
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </Stack>

              {!hasSavedCard && (
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: 1,
                    border: "1px dashed #0d4a73",
                    backgroundColor: "#f8fafc",
                    py: 2,
                    fontSize: "18px",
                    color: "#0d4a73",
                    fontWeight: 600,
                    width: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                  onClick={() => setShowAddCardForm(true)}
                >
                  + Add new card
                </Box>
              )}
            </>
          )}

          <Divider sx={{ my: 3 }} />

          <Formik
            initialValues={initialValues}
            validationSchema={PaymentSchema}
            onSubmit={async (values) => {
              try {
                setIsCreatingPaymentMethod(true);

                // Get booking_id from Redux or use a default value
                const booking_id = bookingId || 123; // Default to 123 if not set

                // Use saved payment method if available, otherwise create new one
                let paymentMethodId: string;
                
                if (hasSavedCard && defaultSavedMethod && selectedMethod === "card") {
                  // Use saved payment method token
                  paymentMethodId = defaultSavedMethod.provider_token;
                } else if (selectedMethod === "card") {
                  // Create new Stripe payment method from card details
                  paymentMethodId = await createStripePaymentMethod(
                    values.cardNumber,
                    // values.expiry,
                    // values.cvv,
                    // values.name
                  );
                } else {
                  // For non-card payment methods, you might need different handling
                  // For now, using a test payment method ID
                  paymentMethodId = "pm_test_1234567890";
                }

                // Prepare payload according to API specification
                const payload = {
                  booking_id: booking_id,
                  payment_method_id: paymentMethodId,
                  gateway: "stripe" as const,
                };

                mutation.mutate(payload, {
                  onSuccess: () => {
                    onSuccess?.(
                      "Your appointment with Dr. David Patel is confirmed for June 30, 2026, at 10:00 AM."
                    );
                  },
                  onError: (error) => {
                    console.error("Payment API error:", error);
                    // Show error to user or handle appropriately
                    alert("Payment failed. Please try again.");
                  },
                });
              } catch (error) {
                console.error("Error processing payment:", error);
                alert("Failed to process payment. Please try again.");
              } finally {
                setIsCreatingPaymentMethod(false);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                {/* Inputs hidden per request */}
                <Box className="space-y-3">
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      Price / hour
                    </Typography>
                    <Typography variant="h6" color="error" fontWeight={700}>
                      350$
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disableElevation
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "#0d4a73",
                        ":hover": { backgroundColor: "#0b3f63" },
                        py: 1.5,
                      }}
                      onClick={() => submitForm()}
                      disabled={mutation.isPending || isCreatingPaymentMethod}
                    >
                      {mutation.isPending || isCreatingPaymentMethod
                        ? "Processing..."
                        : "Pay"}
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
  