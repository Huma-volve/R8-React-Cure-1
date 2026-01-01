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
  useSendPayment, 
  useSavedPaymentMethods,
  useCreatePaymentIntent,
  useConfirmPayment,
  useBookingDetails,
  useDoctorDetails
} from "../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import { setMethod } from "../store/paymentSlice";
import type { AppDispatch, RootState } from "../store";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
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

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
      },
    });

    if (error) {
      console.error("Stripe payment method error:", error);
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
    throw error;
  }
}

export default function PaymentCard({ onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const mutation = useSendPayment();
  const createPaymentIntentMutation = useCreatePaymentIntent();
  const confirmPaymentMutation = useConfirmPayment();
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

  // Fetch booking details to get doctor_id and appointment info
  const { data: bookingData, isLoading: isLoadingBooking, error: bookingError } = useBookingDetails(bookingId);
  const appointment = bookingData?.data;
  // Try to get doctor_id from different possible locations in the appointment data
  const doctorId = appointment?.doctor_id || (appointment?.doctor as any)?.id || appointment?.doctor?.id;
  
  // Fetch doctor details to get price and doctor info
  const { data: doctorData, isLoading: isLoadingDoctor, error: doctorError } = useDoctorDetails(doctorId);
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
  const doctorImage = appointment?.doctor?.image || doctor?.image;
  const doctorJob = appointment?.doctor?.job || doctor?.specialty?.name || "Doctor";
  
  // Log for debugging
  useEffect(() => {
    if (bookingData) {
      console.log("Booking Data:", bookingData);
      console.log("Appointment:", appointment);
      console.log("Appointment keys:", appointment ? Object.keys(appointment) : "No appointment");
      console.log("Doctor ID from appointment.doctor_id:", appointment?.doctor_id);
      console.log("Doctor ID from appointment.doctor.id:", (appointment?.doctor as any)?.id);
      console.log("Doctor object:", appointment?.doctor);
      console.log("Final Doctor ID:", doctorId);
      
      // Log price information
      console.log("Price from appointment.price:", (appointment as any)?.price);
      console.log("Price from appointment.doctor.price:", appointment?.doctor?.price);
      console.log("Price from appointment.doctor.consultation_fee:", (appointment?.doctor as any)?.consultation_fee);
      console.log("Final Doctor Price:", doctorPrice);
    }
    if (doctorData) {
      console.log("Doctor Data:", doctorData);
      console.log("Doctor price:", doctor?.price);
      console.log("Doctor consultation_fee:", (doctor as any)?.consultation_fee);
    }
    if (bookingError) {
      console.error("Error fetching booking:", bookingError);
    }
    if (doctorError) {
      console.error("Error fetching doctor:", doctorError);
    }
  }, [bookingData, doctorData, appointment, doctorId, doctorPrice, doctor, bookingError, doctorError]);
  
  // Format appointment date and time
  const formatAppointmentDateTime = () => {
    if (!appointment?.date || !appointment?.time) return "Loading...";
    const date = dayjs(appointment.date);
    const time = dayjs(appointment.time, 'HH:mm').format('h:mm A');
    const dayName = date.format('dddd');
    const monthDay = date.format('MMMM D');
    return `${dayName}, ${monthDay} • ${time}`;
  };

  // Get default saved payment method
  const defaultSavedMethod = savedPaymentMethods?.find((method) => method.is_default) || savedPaymentMethods?.[0];
  const hasSavedCard = !!defaultSavedMethod;

  // Auto-show card form when card payment method is selected
  useEffect(() => {
    if (selectedMethod === "card") {
      setShowAddCardForm(true);
    }
  }, [selectedMethod]);

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
              src={doctorImage || "https://i.pravatar.cc/120?img=32"}
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
                setIsCreatingPaymentMethod(true);

                // Get appointment_id from appointment data (more reliable than bookingId from Redux)
                // Use appointment.id if available, otherwise fall back to bookingId
                const appointment_id = appointment?.id || bookingId;
                
                if (!appointment_id) {
                  alert("Appointment ID is missing. Please try again.");
                  return;
                }

                // Step 1: Create payment intent
                // Validate that price exists from appointment
                if (!doctorPrice || doctorPrice <= 0) {
                  alert("Price information is missing. Please contact support.");
                  return;
                }
                
                const paymentIntentResponse = await createPaymentIntentMutation.mutateAsync({
                  appointment_id: appointment_id,
                  amount: doctorPrice * 100, // Convert to cents (e.g., 350$ = 35000 cents)
                });

                if (!paymentIntentResponse.status) {
                  throw new Error(paymentIntentResponse.message || "Failed to create payment intent");
                }

                const { payment_intent_id, client_secret, publishableKey } = paymentIntentResponse.data;
                
                // Log publishableKey for debugging (can be used to update Stripe if needed)
                if (publishableKey) {
                  console.log("Stripe Publishable Key:", publishableKey);
                }

                // Step 2: Create or get payment method (only for card payments)
                let paymentMethodId: string | undefined;
                
                if (selectedMethod === "card") {
                  // Always create/get payment method for card payments
                  if (hasSavedCard && defaultSavedMethod) {
                    // Use saved payment method token
                    paymentMethodId = defaultSavedMethod.provider_token;
                    console.log("Using saved payment method:", paymentMethodId);
                  } else {
                    // Create new Stripe payment method from card details
                    if (!stripe || !elements) {
                      throw new Error("Stripe is not initialized. Please wait a moment and try again.");
                    }
                    // Check if CardElement is available (user has added a new card)
                    const cardElement = elements.getElement(CardElement);
                    if (!cardElement) {
                      throw new Error("Please enter your card details first.");
                    }
                    console.log("Creating new payment method...");
                    try {
                      paymentMethodId = await createStripePaymentMethod(
                        stripe,
                        elements,
                        values.name
                      );
                      console.log("Created payment method:", paymentMethodId);
                      
                      if (!paymentMethodId || !paymentMethodId.startsWith("pm_")) {
                        throw new Error("Failed to create payment method. Please check your card details and try again.");
                      }
                    } catch (pmError: any) {
                      console.error("Error creating payment method:", pmError);
                      throw new Error(pmError.message || "Failed to create payment method. Please check your card details and try again.");
                    }
                  }
                  
                  // Validate payment method ID
                  if (!paymentMethodId || !paymentMethodId.startsWith("pm_")) {
                    throw new Error("Invalid payment method. Please check your card details and try again.");
                  }
                } else {
                  console.log("Non-card payment method selected:", selectedMethod);
                }

                // Step 3: Confirm payment with backend (backend will handle Stripe confirmation)
                // We don't need to confirm with Stripe directly - the backend will do it
                
                // Validate required fields
                if (!payment_intent_id) {
                  throw new Error("Payment intent ID is missing");
                }
                if (!appointment_id) {
                  throw new Error("Appointment ID is missing");
                }
                
                const confirmPayload: any = {
                  payment_intent_id: payment_intent_id,
                  appointment_id: appointment_id,
                };
                
                // Add payment_method_id if it exists and is valid
                // For card payments, payment_method_id is required
                if (selectedMethod === "card") {
                  if (!paymentMethodId || !paymentMethodId.startsWith("pm_")) {
                    throw new Error("Payment method is required. Please check your card details and try again.");
                  }
                  confirmPayload.payment_method_id = paymentMethodId;
                } else if (paymentMethodId && paymentMethodId.startsWith("pm_")) {
                  // For other payment methods, add if available
                  confirmPayload.payment_method_id = paymentMethodId;
                }
                
                console.log("Confirm Payment Payload:", confirmPayload);
                console.log("Payment Intent ID:", payment_intent_id);
                console.log("Appointment ID:", appointment_id);
                console.log("Payment Method ID:", paymentMethodId);
                
                let confirmResponse;
                try {
                  confirmResponse = await confirmPaymentMutation.mutateAsync(confirmPayload);
                } catch (confirmError: any) {
                  // Handle case where backend returns status: false
                  console.error("Confirm payment error details:", confirmError);
                  
                  // Check if error has responseData (from our custom error handling)
                  if (confirmError.responseData) {
                    const responseData = confirmError.responseData;
                    console.error("Payment confirmation failed:", responseData);
                    console.error("Full response data:", JSON.stringify(responseData, null, 2));
                    
                    // Check if there's a stripe_status in the response
                    if (responseData.data?.stripe_status) {
                      const status = responseData.data.stripe_status;
                      console.error("Stripe status:", status);
                      
                      if (status === "requires_payment_method") {
                        alert("Payment method is required. Please check your card details and try again.");
                      } else if (status === "requires_confirmation") {
                        alert("Payment requires confirmation. Please try again.");
                      } else if (status === "requires_action") {
                        alert("Payment requires additional action. Please complete the authentication.");
                      } else {
                        alert(`Payment status: ${status}. ${responseData.message || "Please try again."}`);
                      }
                    } else {
                      // Show the error message from backend with more details
                      const errorMsg = responseData.message || "Payment not completed";
                      const dataInfo = responseData.data ? `\nDetails: ${JSON.stringify(responseData.data)}` : "";
                      alert(`${errorMsg}. Please check your card details and try again.${dataInfo}`);
                    }
                    return;
                  }
                  
                  // If it's a regular error, show the message
                  console.error("Regular error:", confirmError);
                  alert(confirmError.message || "Failed to confirm payment. Please try again.");
                  return;
                }

                if (confirmResponse.status && confirmResponse.data.stripe_status === "succeeded") {
                  // Payment succeeded - generate dynamic message
                  const date = appointment?.date ? dayjs(appointment.date).format('MMMM D, YYYY') : '';
                  const time = appointment?.time ? dayjs(appointment.time, 'HH:mm').format('h:mm A') : '';
                  let successMessage = `Your appointment with ${doctorName} is confirmed.`;
                  if (date && time) {
                    successMessage = `Your appointment with ${doctorName} is confirmed for ${date}, at ${time}.`;
                  } else if (date) {
                    successMessage = `Your appointment with ${doctorName} is confirmed for ${date}.`;
                  }
                  onSuccess?.(successMessage);
                } else {
                  // Payment requires additional action
                  const status = confirmResponse.data.stripe_status;
                  if (status === "requires_payment_method") {
                    alert("Payment method is required. Please check your card details.");
                  } else if (status === "requires_confirmation") {
                    alert("Payment requires confirmation. Please try again.");
                  } else {
                    alert(`Payment status: ${status}. Please try again.`);
                  }
                }
              } catch (error: any) {
                console.error("Error processing payment:", error);
                alert(error.message || "Failed to process payment. Please try again.");
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
                        confirmPaymentMutation.isPending || 
                        isCreatingPaymentMethod ||
                        isLoadingBooking ||
                        isLoadingDoctor
                      }
                    >
                      {createPaymentIntentMutation.isPending || 
                       confirmPaymentMutation.isPending || 
                       isCreatingPaymentMethod ||
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
  