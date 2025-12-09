import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Chip,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AppleIcon from "@mui/icons-material/Apple";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSendPayment } from "../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import { setMethod } from "../store/paymentSlice";
import type { AppDispatch, RootState } from "../store";

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
  },
  {
    id: "paypal" as const,
    label: "PayPal",
    hint: "",
  },
  {
    id: "applepay" as const,
    label: "Apple Pay",
    hint: "",
  },
];

export default function PaymentCard({ onSuccess }: Props) {
  const mutation = useSendPayment();
  const dispatch = useDispatch<AppDispatch>();
  const selectedMethod = useSelector(
    (state: RootState) => state.payment.method
  );

  // Validation removed since inputs are hidden per request.
  const PaymentSchema = Yup.object();

  const initialValues: PaymentFormValues = {
    cardNumber: "3642364626382783",
    name: "David Patel",
    expiry: "03/25",
    cvv: "200",
  };

  return (
    <div className="w-full">
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


            }}
          >
            + Add new card
          </Box>

          <Divider sx={{ my: 3 }} />

          <Formik
            initialValues={initialValues}
            validationSchema={PaymentSchema}
            onSubmit={(values) => {
              const payload = {
                amount: 350,
                method: selectedMethod,
                card:
                  selectedMethod === "card"
                    ? {
                        number: values.cardNumber,
                        name: values.name,
                        expiry: values.expiry,
                        cvv: values.cvv,
                      }
                    : undefined,
              };

              mutation.mutate(payload, {
                onSuccess: () =>
                  onSuccess?.(
                    "Your appointment is confirmed for June 30, 2026, at 10:00 AM."
                  ),
                onError: () =>
                  onSuccess?.(
                    "Payment simulated: Your appointment is confirmed for June 30, 2026, at 10:00 AM."
                  ),
              });
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
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Processing..." : "Pay"}
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
