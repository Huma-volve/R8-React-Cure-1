import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Notification = {
  id: string; // UUID from backend
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
  type?: string;
  data?: Record<string, any>;
};

// ---- Static / mock notifications instead of real API calls ----

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Appointment confirmed",
    message: "Your appointment with Dr. Jessica Turner is confirmed.",
    read_at: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New message",
    message: "You have a new message from the clinic.",
    read_at: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    title: "Reminder",
    message: "Don't forget your upcoming appointment tomorrow.",
    read_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

async function getAllNotificationsMock(): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_NOTIFICATIONS;
}

async function getUnreadNotificationsMock(): Promise<Notification[]> {
  const all = await getAllNotificationsMock();
  return all.filter((n) => !n.read_at);
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotificationsMock,
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotificationsMock,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const current =
        queryClient.getQueryData<Notification[]>(["notifications"]) || [];
      const updated = current.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      );
      queryClient.setQueryData(["notifications"], updated);
      queryClient.setQueryData(
        ["notifications", "unread"],
        updated.filter((n) => !n.read_at)
      );
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const current =
        queryClient.getQueryData<Notification[]>(["notifications"]) || [];
      const updated = current.map((n) => ({
        ...n,
        read_at: n.read_at || new Date().toISOString(),
      }));
      queryClient.setQueryData(["notifications"], updated);
      queryClient.setQueryData(
        ["notifications", "unread"],
        updated.filter((n) => !n.read_at)
      );
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

