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
  reviews: unknown[];
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
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    if (axiosError.response?.data) {
      throw new Error(
        axiosError.response.data.message || "Failed to fetch nearby doctors"
      );
    } else if (axiosError.message) {
      throw new Error(axiosError.message);
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
  const response = await api.post(
    `/favorites-toggle/${doctorId}`
  );
  return response.data;
};
/**
 * Book Appointment
 */
export const addReview = async (data: ReviewData) => {
  try {
    const response = await api.post("/reviews/add", data);
    return response.data;
  } catch (error: unknown) {
    // Throw a consistent error object
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    if (axiosError.response?.data) {
      // Backend returned an error response
      throw new Error(axiosError.response.data.message || "Booking failed");
    } else if (axiosError.message) {
      // Network or Axios error
      throw new Error(axiosError.message);
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
  } catch (error: unknown) {
    // Throw a consistent error object
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    if (axiosError.response?.data) {
      // Backend returned an error response
      throw new Error(axiosError.response.data.message || "Booking failed");
    } else if (axiosError.message) {
      // Network or Axios error
      throw new Error(axiosError.message);
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
  payment_method?: string; // Payment method type: "card", "paypal", "applepay"
  payment_method_id?: string; // Stripe payment method ID (required for card payments)
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
    // Log the payload being sent (for debugging - remove in production)
    console.log("Sending payment intent request:", JSON.stringify(data, null, 2));
    
    const response = await api.post<PaymentIntentResponse>(
      "/stripe/create-payment-intent",
      data
    );
    return response.data;
  } catch (error: unknown) {
    // Throw a consistent error object
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    if (axiosError.response?.data) {
      // Backend returned an error response
      throw new Error(
        axiosError.response.data.message || "Failed to create payment intent"
      );
    } else if (axiosError.message) {
      // Network or Axios error
      throw new Error(axiosError.message);
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
  return_url: string; // Required for redirect-based payment methods (PayPal, etc.)
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
    const response = await api.post<ConfirmPaymentResponse>(
      "/stripe/confirm-payment",
      data
    );
    return response.data;
  } catch (error: unknown) {
    // Check if backend returned a response with status: false
    const axiosError = error as { 
      response?: { 
        status?: number;
        data?: { 
          status?: boolean; 
          message?: string; 
          error?: string;
          errors?: Record<string, string[]>;
        }; 
      }; 
      message?: string;
    };
    
    if (axiosError.response?.data) {
      const responseData = axiosError.response.data;
      const statusCode = axiosError.response.status;
      
      // If backend returned status: false, it's not necessarily an HTTP error
      // but the payment didn't complete successfully
      if (responseData.status === false) {
        const errorMessage = responseData.message || "Payment not completed";
        const paymentError = new Error(errorMessage) as Error & { responseData?: unknown; requestData?: ConfirmPaymentPayload };
        paymentError.responseData = responseData;
        paymentError.requestData = data;
        throw paymentError;
      }
      
      // Handle 400 Bad Request with validation errors
      if (statusCode === 400) {
        let errorMessage = responseData.message || "Invalid payment data";
        
        // If there are validation errors, include them
        if (responseData.errors) {
          const errorDetails = Object.entries(responseData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
            .join("; ");
          errorMessage = `${errorMessage}. ${errorDetails}`;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
        
        // Include full response data for debugging
        const fullErrorDetails = `Sent data: ${JSON.stringify(data, null, 2)}. Backend response: ${JSON.stringify(responseData, null, 2)}`;
        errorMessage = `${errorMessage}\n\n${fullErrorDetails}`;
        
        const badRequestError = new Error(errorMessage) as Error & { responseData?: unknown; requestData?: ConfirmPaymentPayload };
        badRequestError.responseData = responseData;
        badRequestError.requestData = data;
        throw badRequestError;
      }
      
      // Backend returned an error response
      const errorMessage = responseData.message 
        || responseData.error 
        || JSON.stringify(responseData)
        || "Failed to confirm payment";
      throw new Error(errorMessage);
    } else if (axiosError.message) {
      // Network or Axios error
      throw new Error(axiosError.message);
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
  } catch (error: unknown) {
    // Throw a consistent error object
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    if (axiosError.response?.data) {
      throw new Error(
        axiosError.response.data.message || "Failed to get booking details"
      );
    } else if (axiosError.message) {
      throw new Error(axiosError.message);
    } else {
      throw new Error("Failed to get booking details");
    }
  }
};

export default api;

// // Re-export types for easier importing
// export type { NearbyDoctor, NearbyDoctorsResponse };