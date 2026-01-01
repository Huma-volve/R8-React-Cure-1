import axios from "axios";
import type { AxiosInstance } from "axios";


interface BookingData {
  doctor_id: string;
  date: string; 
  time: string; 

}
interface ReviewData {
  doctor_id: string;
  rating: number; 
  comment: string; 

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
// const HARDCODED_TEST_TOKEN = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

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
    const token = localStorage.getItem('auth_token');
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


    /**
     * STEP 2 (PRODUCTION MODE):
     * Uncomment this and remove hardcoded token
     */
    // const token = HARDCODED_TEST_TOKEN;

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
 * Get nearby doctors
 */
export interface NearbyDoctor {
  id: number;
  name: string;
  image: string;
  hospital_name: string;
  specialty_id: number;
  location: {
    lat: number;
    lng: number;
  };
  specialty: {
    id: number;
    name: string;
    icon: string | null;
    created_at: string;
    updated_at: string;
  };
  times: Array<{
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    doctor_id: number;
    created_at: string;
    updated_at: string;
  }>;
  reviews: any[];
}

export interface NearbyDoctorsResponse {
  status: boolean;
  message: string;
  data: {
    doctors_near_you: {
      current_page: number;
      data: NearbyDoctor[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
      }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
}

export const getNearbyDoctors = async (
  page: number = 1
): Promise<NearbyDoctorsResponse> => {
  try {
    const response = await api.get<NearbyDoctorsResponse>(
      `/home/all-near-you-doctors`,
      {
        params: { page },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to fetch nearby doctors"
      );
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to fetch nearby doctors");
    }
  }
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
 * favoritesToggle
 **/

export const favoritesToggle = async (doctorId: string) => {
  try {
  const response = await api.post(
    `/favorites-toggle/${doctorId}`
  );
  return response.data;
} catch (error) {
  throw error;
}
};
/**
 * Book Appointment
 */
export const addReview = async (data: ReviewData) => {
  try {
    const response = await api.post("/reviews/add", data);
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

/**
 * Book Appointment
 */
export const bookAppointment = async (data: BookingData) => {
  try {
    const response = await api.post("/appointments/book", data);
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

/**
 * Create Stripe Payment Intent
 */
interface CreatePaymentIntentPayload {
  appointment_id: number;
  amount?: number; // Optional, backend might calculate it
}

interface PaymentIntentResponse {
  status: boolean;
  message: string;
  data: {
    payment_intent_id: string;
    client_secret: string;
    payment_id: number;
    publishableKey: string;
  };
}

export const createPaymentIntent = async (
  data: CreatePaymentIntentPayload
): Promise<PaymentIntentResponse> => {
  try {
    const response = await api.post<PaymentIntentResponse>(
      "/stripe/create-payment-intent",
      data
    );
    return response.data;
  } catch (error: any) {
    // Throw a consistent error object
    if (error.response && error.response.data) {
      // Backend returned an error response
      throw new Error(
        error.response.data.message || "Failed to create payment intent"
      );
    } else if (error.message) {
      // Network or Axios error
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create payment intent");
    }
  }
};

/**
 * Confirm Stripe Payment
 */
interface ConfirmPaymentPayload {
  payment_intent_id: string;
  appointment_id: number;
  payment_method_id?: string; // Optional: payment method ID if using card payment
}

interface ConfirmPaymentResponse {
  status: boolean;
  message: string;
  data: {
    stripe_status: string; // e.g., "requires_payment_method", "succeeded", etc.
  };
}

export const confirmPayment = async (
  data: ConfirmPaymentPayload
): Promise<ConfirmPaymentResponse> => {
  try {
    console.log("Sending confirm payment request with data:", data);
    const response = await api.post<ConfirmPaymentResponse>(
      "/stripe/confirm-payment",
      data
    );
    console.log("Confirm payment response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Confirm payment error:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    
    // Check if backend returned a response with status: false
    if (error.response && error.response.data) {
      const responseData = error.response.data;
      
      // If backend returned status: false, it's not necessarily an HTTP error
      // but the payment didn't complete successfully
      if (responseData.status === false) {
        const errorMessage = responseData.message || "Payment not completed";
        const error = new Error(errorMessage);
        (error as any).responseData = responseData;
        throw error;
      }
      
      // Backend returned an error response
      const errorMessage = responseData.message 
        || responseData.error 
        || JSON.stringify(responseData)
        || "Failed to confirm payment";
      throw new Error(errorMessage);
    } else if (error.message) {
      // Network or Axios error
      throw new Error(error.message);
    } else {
      throw new Error("Failed to confirm payment");
    }
  }
};

/**
 * Get Booking Details by ID
 */
interface BookingDetails {
  id: number;
  doctor_id: number;
  doctor: {
    name: string;
    image?: string;
    job: string;
    price?: number;
  };
  date: string;
  time: string;
  status: string;
  cancelStatus: string;
  address: string;
  can_cancel: boolean;
}

interface BookingDetailsResponse {
  status: boolean;
  message: string;
  data: BookingDetails;
}

export const getBookingById = async (
  bookingId: number
): Promise<BookingDetailsResponse> => {
  try {
    // Fetch all appointments using GET and find the one with matching ID
    const response = await api.get<{ data: BookingDetails[] }>(
      `/appointments/my-bookings`
    );
    
    if (!response.data || !response.data.data) {
      throw new Error("Failed to fetch appointments");
    }
    
    // Find the appointment with matching ID
    const appointment = response.data.data.find((apt: BookingDetails) => apt.id === bookingId);
    
    if (!appointment) {
      throw new Error(`Appointment with ID ${bookingId} not found`);
    }
    
    return {
      status: true,
      message: "Appointment found",
      data: appointment,
    };
  } catch (error: any) {
    // Throw a consistent error object
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to get booking details"
      );
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get booking details");
    }
  }
};

export default api;

// // Re-export types for easier importing
// export type { NearbyDoctor, NearbyDoctorsResponse };