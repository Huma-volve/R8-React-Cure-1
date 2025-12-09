import React from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactUs() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 980,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
          gap: { xs: 3, md: 6 },
          alignItems: "center",
          p: { xs: 2, md: 0 },
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 340, fontSize: "15px" }}
          >
            We are committed to processing the information in order to contact
            you and talk about your questions
          </Typography>

          <Stack spacing={1.6}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PhoneIcon fontSize="small" sx={{ color: "#0d4a73" }} />
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                0800 707 535-321
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <EmailIcon fontSize="small" sx={{ color: "#0d4a73" }} />
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                demo@example.com
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "#0d4a73", mt: "2px" }}
              />
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                526 Melrose Street, Water Mill, 11976
                <br />
                New York
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            justifySelf: { xs: "stretch", md: "flex-start" },
            maxWidth: 380,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
          }}
        >
          <TextField
            size="small"
            label="Name"
            fullWidth
            inputProps={{ style: { fontSize: 14 } }}
            sx={{ "& .MuiInputBase-root": { backgroundColor: "#ffffff" } }}
          />
          <TextField
            size="small"
            label="Email"
            type="email"
            fullWidth
            inputProps={{ style: { fontSize: 14 } }}
            sx={{ "& .MuiInputBase-root": { backgroundColor: "#ffffff" } }}
          />
          <TextField
            label="Message"
            multiline
            minRows={4}
            fullWidth
            inputProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                alignItems: "flex-start",
                backgroundColor: "#ffffff",
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#0d4a73",
              ":hover": { backgroundColor: "#0b3f63" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
