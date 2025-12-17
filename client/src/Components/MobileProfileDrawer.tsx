import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import profileImg from "../assets/NavBarIcons/testimage.jpg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {Link} from "react-router-dom";

type MobileProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function MobileProfileDrawer({ open, onClose }: MobileProfileDrawerProps) {
  function handleClose() {
    onClose();
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100vw",
          maxWidth: "100vw",
          px: "16px",
          py: "32px",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              bgcolor: "#F5F6F7",
              p: 0,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {/* Profile Header  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // left group vs gear icon
            mt: 3,
          }}
        >
          {/* LEFT: avatar + name + address */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={profileImg} // your testimage here
              sx={{ width: 48, height: 48, mr: 2 }}
            />

            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ lineHeight: 1.2 }}
              >
                Seif Mohamed
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  129, El-Nasr Street, Cairo
                </Typography>
              </Box>
            </Box>
          </Box>

          {/*  settings icon */}
          <IconButton
            component={Link}
            to="/profle"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              bgcolor: "transparent",
              p: 0,
            }}
          >
            <SettingsOutlinedIcon sx={{ color: "#1565D8" }} />
          </IconButton>
        </Box>
        {/* Rest of the pop up buttons*/}
        {/* Menu list */}
        
        <List sx={{ mt: 3 }}>

            <ListItemButton >
            <ListItemIcon>
              <LocationOnOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <ChevronRightIcon
              sx={{ ml: "auto", fontSize: 18, color: "text.disabled" }}
            />
            </ListItemButton>

          <ListItemButton component={Link} to="/payment" onClick={handleClose}>
            <ListItemIcon>
              <CreditCardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Payment Method" />
            <ChevronRightIcon
              sx={{ ml: "auto", fontSize: 18, color: "text.disabled" }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/Favorite" onClick={handleClose}>
            <ListItemIcon>
              <FavoriteBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Favorite" />
            <ChevronRightIcon
              sx={{ ml: "auto", fontSize: 18, color: "text.disabled" }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/profile" onClick={handleClose}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            <ChevronRightIcon
              sx={{ ml: "auto", fontSize: 18, color: "text.disabled" }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/privacy" onClick={handleClose}>
            <ListItemIcon>
              <ShieldOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
            <ChevronRightIcon
              sx={{ ml: "auto", fontSize: 18, color: "text.disabled" }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/" onClick={handleClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Log out" sx={{ color: "error.main" }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default MobileProfileDrawer;
