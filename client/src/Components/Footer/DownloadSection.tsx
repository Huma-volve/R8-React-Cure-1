import iPhone12Pro from "@/assets/images/iPhone12Pro.svg";
import { Box,  Typography, Button } from "@mui/material";
import googleIcon from "@/assets/images/googleIcon.svg";
import AppleIcon from "@/assets/images/AppleIcon.svg";

function DownloadSection() {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        bgcolor: "#6292CF",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { sm: 1 },
        px: { xs: 3, sm: 4, lg: 10 },
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          gap: { xs: 1, md: 4 },
          py: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", md: "40px" },
            textAlign: { xs: "center", sm: "left" },
            fontWeight: 700,
            color: "white",
          }}
        >
          Your Health, One Tap Away
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", md: "16px" },
            maxWidth: 620,
            textAlign: { xs: "center", sm: "left" },
            color: "#FFFFFF",
          }}
        >
          Book appointments, chat with doctors, and manage your health
          anytime—right from your phone. Download the app now and stay connected
          wherever you are.
        </Typography>
        <Box
          component={"img"}
          src={iPhone12Pro}
          sx={{ py: { xs: 1, sm: 0 }, display: { xs: "block", md: "none" } }}
        />
        <Box sx={{ display: { sm: "flex" }, gap: 2 }}>
          <Button
            sx={{
              bgcolor: "#05162C",
              width: "185px",
              borderRadius: "10px",
              border: 1,
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-around",
              mb: { xs: 2, sm: 0}
            }}
          >
            <Box component={"img"} src={googleIcon} sx={{ px: 0.5 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "8px", color: "white" }}>
                GET IT ON
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 700, color: "white" }}
              >
                Google Play
              </Typography>
            </Box>
          </Button>
          <Button
            sx={{
              bgcolor: "#05162C",
              width: "185px",
              borderRadius: "10px",
              border: 1,
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box component={"img"} src={AppleIcon} sx={{ px: 0.5 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "8px", color: "white" }}>
                Download on the
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 700, color: "white" }}
              >
                Apple Store
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box
        component={"img"}
        src={iPhone12Pro}
        sx={{ display: { xs: "none", md: "block" } }}
      />
      {/* Text Ends here*/}
    </Box>
  );
}

export default DownloadSection;
