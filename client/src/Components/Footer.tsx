import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MobileFooter from "@/components/Footer/MobileFooter";
import DesktopFooter from "@/components/Footer/DesktopFooter";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
    return isMobile ? <MobileFooter /> : <DesktopFooter />;
    }

export default Footer;
