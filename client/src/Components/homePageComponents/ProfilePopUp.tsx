import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useMediaQuery, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";


type ProfilePopoverProps = {
  name: string;
  address: string;
  avatarSrc: string;

  onPaymentMethod?: () => void;
  onFavorite?: () => void;
  onSettings?: () => void;
  onPrivacy?: () => void;
  onLogout?: () => void;
};

export default function ProfilePopUp({
  name,
  address,
  avatarSrc,
  onPaymentMethod,
  onFavorite,
  onSettings,
  onPrivacy,
  onLogout,
}: ProfilePopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
   const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const navigate = useNavigate();

  function handleOpen(_e: React.MouseEvent<HTMLElement>) {
    if (!isMobile) {
      setAnchorEl(_e.currentTarget);
    }
    else { {
      navigate("/profile");
    }}
   }
  //const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          height: "41px",
          width: "41px",
          border: 0,
          borderRadius: "50%",
          p: 0,
          overflow: "hidden",
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar
          src={avatarSrc}
          alt={name}
          sx={{ width: "100%", height: "100%" }}
          variant="circular"
        />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Paper elevation={0} sx={{ p: 1.5 ,bgcolor:"#F5F6F7"}}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 0.5, pb: 1.25 }}>
            <Avatar src={avatarSrc} alt={name} sx={{ width: 52, height: 52 }} />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography fontWeight={700} noWrap>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {address}
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={() => {
                handleClose();
                onSettings?.();
              }}
              sx={{
                "&:hover": { bgcolor: "grey.200" },
                borderRadius: 3,
              }}
              aria-label="Settings"
            >
              <SettingsOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1.25 }} />

          {/* Menu */}
          <MenuList sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1 }}>
            <Row
              icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
              label="Favorite"
              onClick={() => {
                handleClose();
                onFavorite?.();
              }}
            />
            <Row
              icon={<SettingsOutlinedIcon fontSize="small" />}
              label="Settings"
              onClick={() => {
                handleClose();
                onSettings?.();
              }}
            />
            <Row
              icon={<LockOutlinedIcon fontSize="small" />}
              label="Privacy Policy"
              onClick={() => {
                handleClose();
                onPrivacy?.();
              }}
            />

            <MenuItem
              onClick={() => {
                handleClose();
                onLogout?.();
              }}
              sx={{
                mt: 0.5,
                borderRadius: 3,
                bgcolor: "rgba(244, 63, 94, 0.10)",
                "&:hover": { bgcolor: "rgba(244, 63, 94, 0.16)" },
                py: 1.25,
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "error.main" }}>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                primaryTypographyProps={{ fontWeight: 700, color: "error.main" }}
              />
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
}

function Row({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        borderRadius: 3,
        "&:hover": { bgcolor: "grey.100" },
        py: 1.25,
      }}
    >
      <ListItemIcon sx={{ minWidth: 34 }}>{icon}</ListItemIcon>
      <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 700 }} />
      <ChevronRightIcon fontSize="small" sx={{ color: "text.disabled" }} />
    </MenuItem>
  );
}
