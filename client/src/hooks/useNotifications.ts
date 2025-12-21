import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export type Notification = {
  id: string; // UUID from backend
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
  type?: string;
  data?: Record<string, any>;
};

// Helper function to check API response status
function checkApiResponse(response: any, defaultMessage: string = "API request failed") {
  if (response.status !== true && response.status !== 200) {
    throw new Error(response.message || defaultMessage);
  }
  return response;
}

async function getAllNotifications(): Promise<Notification[]> {
  const { data } = await api.get("/notifications");
  // API returns { status, message, data: [] }
  checkApiResponse(data, "Failed to fetch notifications");
  return data?.data || [];
}

async function getUnreadNotifications(): Promise<Notification[]> {
  const { data } = await api.get("/notifications/unread");
  // API returns { status, message, data: [] }
  checkApiResponse(data, "Failed to fetch unread notifications");
  return data?.data || [];
}

async function markNotificationAsRead(id: string): Promise<void> {
  const { data } = await api.post(`/notifications/${id}/read`);
  // API returns { status, message } or { status: 404, message: "Notification not found" }
  checkApiResponse(data, "Failed to mark notification as read");
}

async function markAllNotificationsAsRead(): Promise<void> {
  const { data } = await api.post("/notifications/mark-all-read");
  // API returns { status: 200, message: "All unread notifications marked as read" }
  checkApiResponse(data, "Failed to mark all notifications as read");
}

async function deleteNotification(id: string): Promise<void> {
  const { data } = await api.delete(`/notifications/${id}`);
  // API returns { status: true/200, message: "..." } or { status: 404, message: "Notification not found" }
  checkApiResponse(data, "Failed to delete notification");
}

async function deleteAllNotifications(): Promise<void> {
  const { data } = await api.delete("/notifications");
  // API returns { status, message }
  checkApiResponse(data, "Failed to delete all notifications");
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotifications,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      // Invalidate and refetch notifications & unread list
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    },
  });
}

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    },
  });
}

