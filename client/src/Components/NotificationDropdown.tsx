import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  useNotifications,
  useUnreadNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  type Notification,
} from "../hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: allNotifications, isLoading } = useNotifications();
  const { data: unreadNotifications } = useUnreadNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = unreadNotifications?.length || 0;
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead.mutateAsync();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      // Fallback: simple date formatting
      try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        return date.toLocaleDateString();
      } catch {
        return dateString;
      }
    }
  };

  const displayNotifications = allNotifications || [];

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "#e5e7eb",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        aria-label="notifications"
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? (
            <NotificationsIcon sx={{ color: "#e5e7eb" }} />
          ) : (
            <NotificationsNoneIcon sx={{ color: "#e5e7eb" }} />
          )}
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            width: { xs: "90vw", sm: "400px" },
            maxWidth: "400px",
            maxHeight: "600px",
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box ref={popoverRef} sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                onClick={handleMarkAllAsRead}
                sx={{ textTransform: "none" }}
              >
                Mark all as read
              </Button>
            )}
          </Box>

          {/* Notifications List */}
          <Box
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Loading notifications...
                </Typography>
              </Box>
            ) : displayNotifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <NotificationsNoneIcon
                  sx={{ fontSize: 48, color: "#d1d5db", mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {displayNotifications.map((notification: Notification, index: number) => {
                  const isUnread = !notification.read_at;
                  return (
                    <Box key={notification.id}>
                      <ListItem
                        sx={{
                          backgroundColor: isUnread ? "#f0f9ff" : "transparent",
                          "&:hover": {
                            backgroundColor: isUnread ? "#e0f2fe" : "#f9fafb",
                          },
                          cursor: "pointer",
                          py: 1.5,
                          px: 2,
                        }}
                        onClick={() => {
                          if (isUnread) {
                            handleMarkAsRead(notification.id);
                          }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography
                                variant="subtitle2"
                                fontWeight={isUnread ? 600 : 400}
                                sx={{ flex: 1 }}
                              >
                                {notification.title}
                              </Typography>
                              {isUnread && (
                                <Chip
                                  label="New"
                                  size="small"
                                  sx={{
                                    height: "18px",
                                    fontSize: "0.65rem",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                  }}
                                />
                              )}
                            </Stack>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.5 }}
                              >
                                {notification.message}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(notification.created_at)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < displayNotifications.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </List>
            )}
          </Box>
        </Box>
      </Popover>
    </>
  );
}

