import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/auth";

export type Notification = {
  id: string | number; // UUID or ID from backend
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
  type?: string;
  data?: Record<string, any>;
};

interface NotificationsResponse {
  status: boolean;
  message: string;
  data: Notification[];
}

// ---- Real API calls ----

async function getAllNotifications(): Promise<Notification[]> {
  try {
    const response = await api.get<NotificationsResponse>("/notifications");
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error: any) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}

async function getUnreadNotifications(): Promise<Notification[]> {
  try {
    const response = await api.get<NotificationsResponse>("/notifications/unread");
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error: any) {
    console.error("Failed to fetch unread notifications:", error);
    return [];
  }
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotifications,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      try {
        const response = await api.post(`/notifications/${id}/read`);
        if (response.data.status) {
          // Invalidate and refetch notifications
          await queryClient.invalidateQueries({ queryKey: ["notifications"] });
          await queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
        }
        return response.data;
      } catch (error: any) {
        console.error("Failed to mark notification as read:", error);
        throw error;
      }
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await api.post("/notifications/mark-all-read");
        if (response.data.status) {
          // Invalidate and refetch notifications to get updated data
          await queryClient.invalidateQueries({ queryKey: ["notifications"] });
          await queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
        }
        return response.data;
      } catch (error: any) {
        console.error("Failed to mark all notifications as read:", error);
        throw error;
      }
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const current =
        queryClient.getQueryData<Notification[]>(["notifications"]) || [];
      const updated = current.filter((n) => n.id !== id);
      queryClient.setQueryData(["notifications"], updated);
      queryClient.setQueryData(
        ["notifications", "unread"],
        updated.filter((n) => !n.read_at)
      );
    },
  });
}

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(["notifications"], []);
      queryClient.setQueryData(["notifications", "unread"], []);
    },
  });
}

