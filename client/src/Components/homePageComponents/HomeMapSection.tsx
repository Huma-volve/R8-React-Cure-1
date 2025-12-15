import { Box, Typography, Button } from "@mui/material";
import HomePageMapExample from "../../assets/images/HomePageMapExample.svg";
import Maginifier from "../../assets/NavBarIcons/Magnifer.svg"

function HomeMapSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: {sm: 1},
        justifyContent: { md: "space-between" },
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
          justifyContent: "center",
          gap: { xs: 1, sm: 4 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", md: "40px" },
            textAlign: { xs: "center", sm:"left" },
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Find Care Near You in Seconds
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "16px" },
            maxWidth: 620,
            textAlign: { xs: "center", sm:"left"},
            color: "text.secondary",
          }}
        >
          Allow location access or choose your city to instantly discover
          trusted doctors and clinics around you—quick, easy, and local.
        </Typography>
        <Box
          component={"img"}
          src={HomePageMapExample}
          sx={{ py: { xs: 4, sm: 0 }, display: { xs: "block", sm: "none" }, width: "70%" }}
        />
        <Button sx={{ width: "185px", borderRadius:"10px", borderColor:"#145DB8",border:1, fontSize:"12px", ":hover":{bgcolor:"#145DB8", color:"white"}}} >
          <Box component={"img"} src={Maginifier} sx={{px:0.5}}/>Search By Location
        </Button>
      </Box>
              <Box
          component={"img"}
          src={HomePageMapExample}
          sx={{ py: { xs: 4, sm: 0 }, display: { xs: "none", sm: "block" } }}
        />
      {/* Text Ends here*/}
    </Box>
  );
}

export default HomeMapSection;
