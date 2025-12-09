// src/Components/Hero.tsx
import {
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Hero = () => {
  return (
    <Box
      sx={{
        py: "200px",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Top pill */}
      <Chip
        label="Upgrade your account"
        size="small"
        sx={{
          mb: 3,
          borderRadius: "999px",
          bgcolor: "#F5F6F7",
          fontWeight: 500,
        }}
      />

      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "3rem" },
          maxWidth: 700,
          mx: "auto",
          mb: 2,
        }}
      >
        Find and book top doctors near you
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 620,
          mx: "auto",
          mb: 4,
        }}
      >
        Easily find top-rated specialists near you and book appointments in just
        a few clicks. Whether you need an in-person visit or an online
        consultation, we connect you with the right care—fast, simple, and
        secure.
      </Typography>

      {/* Social proof pill */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 1,
          borderRadius: "999px",
          bgcolor: "#F5F6F7",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ width: 26, height: 26 }} />
          <Avatar sx={{ width: 26, height: 26, ml: -1 }} />
          <Avatar sx={{ width: 26, height: 26, ml: -1 }} />
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          10k+ happy patients
        </Typography>
      </Box>

      {/* Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
      >
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Get started
        </Button>

        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 500,
            bgcolor: "background.paper",
          }}
          startIcon={<CalendarMonthIcon />}
        >
          Book Appointment
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
