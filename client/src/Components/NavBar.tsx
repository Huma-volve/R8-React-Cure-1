import NavBarSearch from "@/Components/homePageComponents/NavBarSearchBar";
import ProfilePopUp from "@/Components/homePageComponents/ProfilePopUp";
import api from "@/api/axios";
//Basic Imports
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  useMediaQuery,
  Button,
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

import { useEffect, useState } from "react";
import MobileProfileDrawer from "./MobileProfileDrawer";


//to be changed using redux? just a test for now
type User = {
  name: string;
  address: string;
  profilePicUrl?: any;
};

function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navButtonsOpen, setNavButtonsOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function handleMenuClick() {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setNavButtonsOpen((prev) => !prev);
    }
  }

const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) return; 

  let cancelled = false;

  (async () => {
    try {
      const res = await api.get("https://round8-cure-php-team-two.huma-volve.com/api/patient/profile"); // replace with your real endpoint
      console.log("User profile response:", res);
      if (!cancelled) setUser(res.data.data ?? res.data);
    } catch (e) {
      console.log(e);
    }
  })();

  return () => {
    cancelled = true;
  };
}, []);

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
                    to="/home" 
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
                    to="/home" 
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
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      borderColor: "transparent",
                      color: "#05162C",
                      bgcolor: "#F5F6F7",
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <NotificationsNoneIcon />
                  </IconButton>
                </Box>

                {/* user Icon Button */}
                <ProfilePopUp
                  name={user?.name || "Guest User"}
                  address={user?.address || "Unknown Location"}
                  avatarSrc={user?.profilePicUrl || testimage}
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
