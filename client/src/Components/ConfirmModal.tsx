import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";

type Props = { open: boolean; onClose: () => void; message?: string };

export default function ConfirmModal({ open, onClose, message }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "white",
          margin: 2,
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: "white",
          "&.MuiDialogContent-root": {
            padding: 4,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Circular Icon with Shield and Blue Checkmark */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#6A9DEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* White Shield Icon */}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "absolute", zIndex: 1 }}
            >
              <path
                d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"
                fill="white"
              />
            </svg>
            {/* Blue Checkmark inside shield */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "absolute", zIndex: 2 }}
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="#6A9DEB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>

          {/* Congratulations Heading */}
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: "#1f2937",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            Congratulations!
          </Typography>

          {/* Confirmation Message */}
          <Typography
            variant="body1"
            sx={{
              color: "#4b5563",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            {message ||
              "Your appointment with Dr. David Patel is confirmed for June 30, 2026, at 10:00 AM."}
          </Typography>

          {/* Done Button - Dark background */}
          <Button
            variant="contained"
            fullWidth
            onClick={onClose}
            sx={{
              backgroundColor: "#0F172A",
              color: "white",
              borderRadius: 2,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#1e293b",
              },
            }}
          >
            Done
          </Button>

          {/* Edit Appointment Link */}
          <Link
            component="button"
            onClick={onClose}
            sx={{
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "0.9rem",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Edit your appointment
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
