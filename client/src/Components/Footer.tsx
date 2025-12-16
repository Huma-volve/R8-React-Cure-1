import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MobileFooter from "./Footer/MobileFooter";
import DesktopFooter from "./Footer/DesktopFooter";
import DownloadSection from "./Footer/DownloadSection"; // adjust path if needed

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Box>
        <Box sx={{ px: 2, py: 4 }}>
          <DownloadSection />
        </Box>
        <MobileFooter />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1240,
          mx: "auto",
          px: 2,
          mb: -5,
        }}
      >
        <DownloadSection />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <DesktopFooter />
      </Box>
    </Box>
  );
}

export default Footer;
