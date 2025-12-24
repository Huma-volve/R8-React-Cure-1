import axios from "axios";
import type { AxiosInstance } from "axios";


interface BookingData {
  doctor_id: string;
  date: string; 
  time: string; 

}
/**
 * ======================================================
 * CONFIGURATION
 * ======================================================
 * Change ONLY the baseURL to your API URL
 */
const API_BASE_URL = "https://round8-cure-php-team-two.huma-volve.com/api/v1/";

/**
 * ======================================================
 * TEMP TOKEN FOR TESTING (REMOVE LATER)
 * ======================================================
 * ⚠️ FOR LOCAL TESTING ONLY
 * ⚠️ DO NOT COMMIT REAL TOKENS
 *
 * When backend login is ready:
 *  - REMOVE this constant
 *  - Get token from login API
 *  - Save it in localStorage
 */
const HARDCODED_TEST_TOKEN = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

/**
 * ======================================================
 * AXIOS INSTANCE
 * ======================================================
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ======================================================
 * REQUEST INTERCEPTOR (AUTH HEADER)
 * ======================================================
 */
api.interceptors.request.use(
  (config) => {
    /**
     * STEP 1 (CURRENT - TEST MODE):
     * Uses hardcoded token
     */
    const token = HARDCODED_TEST_TOKEN;

    /**
     * STEP 2 (PRODUCTION MODE):
     * Uncomment this and remove hardcoded token
     */
    // const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ======================================================
 * RESPONSE INTERCEPTOR (OPTIONAL)
 * ======================================================
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - token invalid or expired");
    }
    return Promise.reject(error);
  }
);

/**
 * ======================================================
 * AUTH API FUNCTIONS
 * ======================================================
 */
  // localStorage.setItem("auth_token", response.data.token);

/**
 * getFavorites 
 */

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

/**
 * getFavorites 
 */

export const getAllDoctors = async () => {
  const response = await api.get("/search/all-doctors");
  return response.data;
};

/**
 * Get doctor by ID
 */
export const getDoctorById = async (doctorId: string) => {
  const response = await api.get(
    `/doctors/${doctorId}`
  );
  return response.data;
};

/**
 * getSpecialists 
 */

export const getSpecialists = async () => {
  const response = await api.get("/home/specialties");
  return response.data;
};

/**
 * get Doctor Reviews by id 
 **/

export const getReviews = async (doctorId: number) => {
  const response = await api.get(
    `/doctors/${doctorId}`

  );
  return response.data;
};

/**
 * Book Appointment
 */
export const bookAppointment = async (data: BookingData) => {
  try {
    const response = await axios.post("/appointments/book", data);
    return response.data;
  } catch (error: any) {
    // Throw a consistent error object
    if (error.response && error.response.data) {
      // Backend returned an error response
      throw new Error(error.response.data.message || "Booking failed");
    } else if (error.message) {
      // Network or Axios error
      throw new Error(error.message);
    } else {
      throw new Error("Booking failed");
    }
  }
};

export default api;