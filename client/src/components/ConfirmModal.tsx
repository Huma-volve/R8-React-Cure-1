import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type Props = { open: boolean; onClose: () => void; message?: string };

export default function ConfirmModal({ open, onClose, message }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <DialogContent className="p-8 text-center" sx={{ minWidth: 320 }}>
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#0b4a6f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <Typography variant="h6">Congratulations!</Typography>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          {message || "Your appointment is confirmed."}
        </Typography>
        <div className="mt-6">
          <Button variant="contained" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
