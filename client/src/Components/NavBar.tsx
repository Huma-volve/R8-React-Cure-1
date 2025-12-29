import NavBarSearch from "@/Components/homePageComponents/NavBarSearchBar";
import ProfilePopUp from "@/Components/homePageComponents/ProfilePopUp";
//Basic Imports
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  useMediaQuery,
  Button,
  Badge,
} from "@mui/material";
import { Toolbar, useTheme } from "@mui/material";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


//Icons And images
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import testimage from "../assets/NavBarIcons/testimage.jpg";
import BsHeartPulse from "../assets/NavBarIcons/BsHeartPulse.svg";
//import Magnifer from "../assets/NavBarIcons/Magnifer.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationDropdown from "./NotificationDropdown";
import { useUnreadNotifications } from "../hooks/useNotifications";
import { useState } from "react";
import MobileProfileDrawer from "./MobileProfileDrawer";


function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navButtonsOpen, setNavButtonsOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLButtonElement | null>(null);
  const { data: unreadNotifications } = useUnreadNotifications();
  const unreadCount = unreadNotifications?.length || 0;

  const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  function handleMenuClick() {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setNavButtonsOpen((prev) => !prev);
    }
  }

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          position: "fixed",
          bgcolor: "white",
        }}
      >
<Toolbar
  sx={{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 2,
    rowGap: 2,
    px: { xs: 2, sm: 4, md: 8 },
    pb: "24px",
    pt: { xs: "24px", sm: "52px" },
  }}
>
          {/* Left Side HeartPulse Icon */}
          <Box component={Link} to="/home" sx={{ order: { xs: 1, sm: 1 } }}>
            <IconButton sx={{ width: "64px" }}>
              <img src={BsHeartPulse} alt="HearPulseIcon" />
            </IconButton>
          </Box>
          <Box
  sx={{
    order: { xs: 3, md: 2 },
    flexBasis: { xs: "100%", md: "auto" },
    flexGrow: 1,
    mx: { md: "auto" },
    display: "flex",
    justifyContent: "center",
    transition: "transform 400ms ease",
    transform: {
      xs: "none",
      md: navButtonsOpen ? "translateX(-20px)" : "translateX(0)",
    },
  }}
>
  <NavBarSearch onSelect={(v) => console.log("search:", v)} />
</Box>

          {/* Right Side Icons Box */}
          <Box sx={{ order: { xs: 2, md: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* 3 nav buttons from menu button  */}
              <Slide
                in={navButtonsOpen && !isMobile}
                direction="left"
                timeout={{ enter: 400, exit: 300 }}
                mountOnEnter
                unmountOnExit
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    mr: 2,
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  <Button //Home Button
                    component={Link}
                    to="/home" 
                    variant="contained"
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      bgcolor: "#F5F6F7",
                      color: "text.primary",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#E9EAEC", boxShadow: "none" },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                                      component={Link}
                    to="/booking" 
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      bgcolor: "#F5F6F7",
                      color: "text.primary",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#E9EAEC", boxShadow: "none" },
                    }}
                  >
                    Bookings
                  </Button>
                  <Button
                  component={Link}
                    to="/chat" 
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      bgcolor: "#F5F6F7",
                      color: "text.primary",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#E9EAEC", boxShadow: "none" },
                    }}
                  >
                    Chat
                  </Button>
                </Stack>
              </Slide>

              <Stack direction="row" spacing={{ xs: 2, sm: 4 }}>
                {/* notification and nenu Icons Box */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                    height: "40px",
                    width: "96x",
                  }}
                >
                  {/* Menu Icon Button */}
                  <IconButton
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      borderColor: "transparent",
                      color: "#05162C",
                      bgcolor: "#F5F6F7",
                      transition:
                        "transform 200ms ease, background-color 200ms ease",
                      transform:
                        !isMobile && navButtonsOpen ? "rotate(90deg)" : "none",
                    }}
                    onClick={handleMenuClick}
                  >
                    {/* swap icon on desktop when nav open */}
                    {!isMobile && navButtonsOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>

                  {/* notification icon Button */}
                 <IconButton
                    onClick={handleNotificationClick}
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      borderColor: "transparent",
                      color: "#05162C",
                      bgcolor: "#F5F6F7",
                      display: { xs: "none", sm: "flex" },
                      "&:hover": {
                        bgcolor: "#E9EAEC",
                      },
                    }}
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      {unreadCount > 0 ? (
                        <NotificationsIcon />
                      ) : (
                        <NotificationsNoneIcon />
                      )}
                    </Badge>
                  </IconButton>
                  <NotificationDropdown 
                    anchorEl={notificationAnchor}
                    onClose={handleNotificationClose}
                    showIconButton={false}
                  />                  
                </Box>

                {/* user Icon Button */}
                <ProfilePopUp
                  name="Seif Mohamed"
                  address="129, El-Nasr Street, Cairo"
                  avatarSrc={testimage}
                  onPaymentMethod={() => navigate("/payment")}
      onFavorite={() => navigate("/favorite")}
      onSettings={() => navigate("/profile")}
      onPrivacy={() => navigate("/privacy")}
      onLogout={()=> navigate("/login")}
                />
              </Stack>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

export default Navbar;
