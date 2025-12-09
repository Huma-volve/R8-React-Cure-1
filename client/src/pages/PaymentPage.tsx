import React, { useState } from "react";
import PaymentCard from "../components/PaymentCard";
import ConfirmModal from "../components/ConfirmModal";
import { Typography } from "@mui/material";

export default function PaymentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState(
    "Your appointment with Dr. David Patel is confirmed for June 30, 2023, at 10:00 AM."
  );

  function handleSuccess(msg?: string) {
    setMessage(
      msg ||
        "Your appointment with Dr. David Patel is confirmed for June 30, 2023, at 10:00 AM."
    );
    setModalOpen(true);
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
            <PaymentCard onSuccess={handleSuccess} />
          </div>
        </div>
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={message}
      />
    </div>
  );
}
