import { useState, useEffect } from "react";
import PaymentCard from "@/Components/PaymentCard";
import ConfirmModal from "@/Components/ConfirmModal";
import { Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingId } from "../store/paymentSlice";
import type { AppDispatch, RootState } from "../store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useBookingDetails, useDoctorDetails } from "../hooks/usePayment";
import dayjs from 'dayjs';



// Initialize Stripe with publishable key
// You can get this from environment variable or from API response
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51SbehEKP7rMANlwKO8w9gOkx330Ts4fLUPvyRGFQkbkNVACaa81M8rsJNn4cUj2WZMmUNhzyGneQftmjnIZQ937w00EuA98GFO";
const stripePromise = loadStripe(stripePublishableKey);

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Get booking_id from URL params and store in Redux
  const bookingId = useSelector((state: RootState) => state.payment.booking_id);
  
  useEffect(() => {
    const bookingIdParam = searchParams.get("bookingId");
    if (bookingIdParam) {
      const id = parseInt(bookingIdParam, 10);
      if (!isNaN(id)) {
        dispatch(setBookingId(id));
      }
    }
  }, [searchParams, dispatch]);

  // Fetch booking and doctor details for dynamic message
  const { data: bookingData } = useBookingDetails(bookingId);
  const appointment = bookingData?.data;
  const doctorId = appointment?.doctor_id;
  const { data: doctorData } = useDoctorDetails(doctorId);
  const doctor = doctorData?.data;

  // Generate dynamic confirmation message
  const generateConfirmationMessage = () => {
    if (!appointment) return "Your appointment is confirmed.";
    
    const doctorName = appointment.doctor?.name || doctor?.name || "the doctor";
    const date = appointment.date ? dayjs(appointment.date).format('MMMM D, YYYY') : '';
    const time = appointment.time ? dayjs(appointment.time, 'HH:mm').format('h:mm A') : '';
    
    if (date && time) {
      return `Your appointment with ${doctorName} is confirmed for ${date}, at ${time}.`;
    } else if (date) {
      return `Your appointment with ${doctorName} is confirmed for ${date}.`;
    } else {
      return `Your appointment with ${doctorName} is confirmed.`;
    }
  };

  function handleSuccess(msg?: string) {
    console.log("handleSuccess called, opening modal");
    setMessage(
      msg || generateConfirmationMessage()
    );
    setModalOpen(true);
    console.log("modalOpen set to:", true);
  }

  return (
    <div className="bg-[#f3f4f6] min-h-screen py-10 px-4 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Typography variant="h5" fontWeight={700} color="text.secondary">
            Payment
          </Typography>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <Elements stripe={stripePromise}>
              <PaymentCard onSuccess={handleSuccess} />
            </Elements>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => {
          console.log("Closing modal");
          setModalOpen(false);
        }}
        message={message}
      />
    </div>
  );
}
