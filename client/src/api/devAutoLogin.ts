import api from "./axios";

export async function devAutoLogin() {
  if (!import.meta.env.DEV) return;

  // skip if already logged in
  if (localStorage.getItem("access_token")) return;

  const phone = import.meta.env.VITE_DEV_PHONE;
  const password = import.meta.env.VITE_DEV_PASSWORD;

  if (!phone || !password) {
    console.warn("Missing VITE_DEV_EMAIL / VITE_DEV_PASSWORD in .env");
    return;
  }

  const res = await api.post("/auth/login", { phone, password });

  const token = res.data?.data?.token;          // <-- exact field
  const tokenType = res.data?.data?.token_type; // "Bearer"

  if (!token) throw new Error("Login response did not include data.token");

  localStorage.setItem("access_token", token);
  localStorage.setItem("token_type", tokenType || "Bearer");
}
