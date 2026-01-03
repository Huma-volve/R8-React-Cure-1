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
import { 
  useSavedPaymentMethods,
  useCreatePaymentIntent,
  useBookingDetails,
  useDoctorDetails
} from "../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import { setMethod } from "../store/paymentSlice";
import type { AppDispatch, RootState } from "../store";
import { } from "react";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
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
// This function should be called from within the component where useStripe and useElements are available
async function createStripePaymentMethod(
  stripe: any,
  elements: any,
  name: string
): Promise<string> {
  try {
    if (!stripe || !elements) {
      throw new Error("Stripe or Elements not initialized");
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error("Card element not found");
    }

    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
      },
    });

    if (stripeError) {
      throw stripeError;
    }

    if (!paymentMethod) {
      throw new Error("Failed to create payment method");
    }

    return paymentMethod.id;
  } catch (err) {
    throw err;
  }
}

export default function PaymentCard({ onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const createPaymentIntentMutation = useCreatePaymentIntent();
  const { data: savedPaymentMethods, isLoading: isLoadingSavedMethods } =
    useSavedPaymentMethods();
  const dispatch = useDispatch<AppDispatch>();
  const selectedMethod = useSelector(
    (state: RootState) => state.payment.method
  );
  const bookingId = useSelector(
    (state: RootState) => state.payment.booking_id
  );

  // Fetch booking details to get doctor_id and appointment info
  const { data: bookingData, isLoading: isLoadingBooking } = useBookingDetails(bookingId);
  const appointment = bookingData?.data;
  // Try to get doctor_id from different possible locations in the appointment data
  const doctorId = appointment?.doctor_id || (appointment?.doctor as { id?: number })?.id;
  
  // Fetch doctor details to get price and doctor info
  const { data: doctorData, isLoading: isLoadingDoctor } = useDoctorDetails(doctorId);
  const doctor = doctorData?.data;
  
  // Use doctor data from appointment first, then from doctor API, then defaults
  // Price should come from appointment data (the booked appointment), not static value
  // Try to get price from appointment directly, then from appointment.doctor, then from doctor data
  // Handle both number and string types for price/consultation_fee
  const getPriceValue = (value: any): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  };

  const doctorPrice = getPriceValue((appointment as any)?.price) 
    || getPriceValue(appointment?.doctor?.price) 
    || getPriceValue((appointment?.doctor as any)?.consultation_fee)
    || getPriceValue(doctor?.price) 
    || getPriceValue((doctor as any)?.consultation_fee)
    || null; // Get price from appointment data, no static default
  const doctorName = appointment?.doctor?.name || doctor?.name || "Dr. David Patel"; // Default name
  // Get doctor image with fallback to avoid broken images
  const getDoctorImage = () => {
    const image = appointment?.doctor?.image || doctor?.image;
    // If image is from via.placeholder.com or is invalid, use fallback
    if (!image || image.includes('via.placeholder.com') || image.includes('ERR_NAME_NOT_RESOLVED')) {
      return "https://i.pravatar.cc/120?img=32";
    }
    return image;
  };
  const doctorImage = getDoctorImage();
  const doctorJob = appointment?.doctor?.job || doctor?.specialty?.name || "Doctor";
  
  
  // Format appointment date and time
  const formatAppointmentDateTime = () => {
    if (!appointment?.date || !appointment?.time) return "Loading...";
    const date = dayjs(appointment.date);
    const time = dayjs(appointment.time, 'HH:mm').format('h:mm A');
    const dayName = date.format('dddd');
    const monthDay = date.format('MMMM D');
    return `${dayName}, ${monthDay} • ${time}`;
  };


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
              src={doctorImage}
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                const target = e.target as HTMLImageElement;
                if (target.src !== "https://i.pravatar.cc/120?img=32") {
                  target.src = "https://i.pravatar.cc/120?img=32";
                }
              }}
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <Typography variant="subtitle1" fontWeight={600}>
                {isLoadingDoctor || isLoadingBooking 
                  ? "Loading..." 
                  : doctorName}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {isLoadingDoctor || isLoadingBooking 
                  ? "Loading..." 
                  : doctorJob}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {isLoadingBooking 
                  ? "Loading..." 
                  : appointment?.address || "Address not available"}
              </Typography>
              <Stack direction="row" spacing={3} mt={1} alignItems="center">
                <Chip
                  label={formatAppointmentDateTime()}
                  size="small"
                  color="default"
                />
                {doctorId && (
                  <Typography component={Link} to={`/doctors/${doctorId}`}
                    variant="caption"
                    color="primary"
                    className="cursor-pointer"
                  >
                    Reschedule
                  </Typography>
                )}
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
          ) : (
            // Show payment method options
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

              {/* Always show card details form when card method is selected */}
              {selectedMethod === "card" && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Card Details
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                    }}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </Box>
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

                // Get appointment_id from appointment data (more reliable than bookingId from Redux)
                // Use appointment.id if available, otherwise fall back to bookingId
                const appointment_id = appointment?.id || bookingId;
                
                if (!appointment_id) {
                  alert("Appointment ID is missing. Please try again.");
                  return;
                }

                // Validate payment method is selected
                if (!selectedMethod) {
                  alert("Please select a payment method.");
                  return;
                }

                // Step 1: Create payment intent
                // Validate that price exists from appointment
                if (!doctorPrice || doctorPrice <= 0) {
                  alert("Price information is missing. Please contact support.");
                  return;
                }

                // Prepare payment intent payload
                // Note: Backend may require payment_method_id for all payment methods
                const paymentIntentPayload: {
                  appointment_id: number;
                  amount: number;
                  payment_method: string;
                  payment_method_id?: string;
                } = {
                  appointment_id: appointment_id,
                  amount: doctorPrice * 100, // Convert to cents (e.g., 350$ = 35000 cents)
                  payment_method: selectedMethod, // "card", "paypal", or "applepay"
                };

                // Debug: Log the payload (remove in production)
                console.log("Payment Intent Payload before payment method creation:", paymentIntentPayload);

                // If card payment is selected, create Stripe payment method first
                if (selectedMethod === "card") {
                  if (!stripe || !elements) {
                    alert("Payment system is not ready. Please wait a moment and try again.");
                    return;
                  }

                  try {
                    const paymentMethodId = await createStripePaymentMethod(
                      stripe,
                      elements,
                      values.name || "Customer"
                    );
                    paymentIntentPayload.payment_method_id = paymentMethodId;
                  } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : "Failed to process card details. Please check your card information.";
                    alert(errorMessage);
                    return;
                  }
                } else {
                  // For PayPal and Apple Pay, payment_method_id is not required from Stripe
                  // But if backend requires it, it should be handled on backend side
                  // We only send payment_method for non-card methods
                }
                
                // Debug: Log the final payload (remove in production)
                console.log("Final Payment Intent Payload:", JSON.stringify(paymentIntentPayload, null, 2));
                
                const paymentIntentResponse = await createPaymentIntentMutation.mutateAsync(paymentIntentPayload);

                if (!paymentIntentResponse.status) {
                  throw new Error(paymentIntentResponse.message || "Failed to create payment intent");
                }

                // Step 2: Confirm payment using Stripe directly in frontend
                const { client_secret } = paymentIntentResponse.data;

                if (!client_secret) {
                  throw new Error("Client secret is missing from payment intent response");
                }

                if (!stripe) {
                  throw new Error("Stripe not initialized");
                }

                // For card payments, use confirmCardPayment with payment_method_id
                // This keeps the user on the same page (no redirect)
                if (selectedMethod === "card" && paymentIntentPayload.payment_method_id) {
                  const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                    client_secret,
                    {
                      payment_method: paymentIntentPayload.payment_method_id,
                    }
                  );

                  if (confirmError) {
                    throw new Error(confirmError.message || "Payment confirmation failed");
                  }

                  // Check payment intent status
                  if (paymentIntent && paymentIntent.status === "succeeded") {
                    // Payment confirmed successfully
                    const date = appointment?.date ? dayjs(appointment.date).format('MMMM D, YYYY') : '';
                    const time = appointment?.time ? dayjs(appointment.time, 'HH:mm').format('h:mm A') : '';
                    let successMessage = `Payment confirmed successfully for your appointment with ${doctorName}.`;
                    if (date && time) {
                      successMessage = `Payment confirmed successfully for your appointment with ${doctorName} on ${date}, at ${time}.`;
                    } else if (date) {
                      successMessage = `Payment confirmed successfully for your appointment with ${doctorName} on ${date}.`;
                    }
                    onSuccess?.(successMessage);
                  } else if (paymentIntent) {
                    // Payment intent exists but status is not succeeded
                    throw new Error(`Payment status: ${paymentIntent.status}. Payment confirmation is pending.`);
                  }
                } else {
                  // For non-card payments (PayPal, Apple Pay), we need to use confirmPayment
                  // But since we don't have PaymentElement, we'll need to handle this differently
                  // For now, throw an error for non-card payments
                  throw new Error("Card payment is required. Other payment methods are not supported in this flow.");
                }
              } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "Failed to process payment. Please try again.";
                alert(errorMessage);
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
                      {isLoadingDoctor || isLoadingBooking 
                        ? "Loading..." 
                        : doctorPrice 
                          ? `$${doctorPrice}` 
                          : "Price not available"}
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
                      disabled={
                        createPaymentIntentMutation.isPending || 
                        isLoadingBooking ||
                        isLoadingDoctor ||
                        !stripe ||
                        !elements
                      }
                    >
                      {createPaymentIntentMutation.isPending || 
                       isLoadingBooking ||
                       isLoadingDoctor
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
  