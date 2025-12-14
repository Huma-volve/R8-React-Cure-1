import NavBarSearch from "@/Components/homePageComponents/NavBarSearchBar";

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
import { styled } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";


//Icons And images
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import testimage from "../assets/NavBarIcons/testimage.jpg";
import BsHeartPulse from "../assets/NavBarIcons/BsHeartPulse.svg";
//import Magnifer from "../assets/NavBarIcons/Magnifer.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useState } from "react";
import MobileProfileDrawer from "./MobileProfileDrawer";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   width: "100%",
//   display: "block",
//   [theme.breakpoints.up("sm")]: {
//     borderRadius: "10px",
//     display: "block",
//     backgroundColor: "#F5F6F7",
//     paddingLeft: "16px",
//     paddingRight: "16px",
//     marginRight: theme.spacing(3),
//     width: "100%",
//     maxWidth: 568,
//   },
//   [theme.breakpoints.up("md")]: {
//     width: "568px",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 0),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "#99A2AB",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("md")]: {
//       width: "568px",
//     },
//   },
// }));

function Navbar() {
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
          <Box sx={{ order: { xs: 1, sm: 1 } }}>
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
          {/* TODO!!!!! Fix SearchBar Animation*/}
          {/* <Box
            sx={{
              order: { xs: 0, sm: 0 },
              justifyContent: "center",
              transition: "transform 400ms ease", // <-- Animation To be fixed Starts here
              transform: {
                xs: "none",
                md: navButtonsOpen ? "translateX(-20px)" : "translateX(0)",
              },
            }}
          >
            <Search>
              <SearchIconWrapper>
                <img src={Magnifer} alt="MaginfierIcon" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search about speciality, doctor"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box> */}


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
                    //to="/" <-- Set correct Path (route?)
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
                <IconButton
                  sx={{
                    height: "41px",
                    width: "41px",
                    border: 0,
                    borderRadius: "50%",
                    padding: "0",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={testimage}
                    alt="UserIcon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </IconButton>
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
