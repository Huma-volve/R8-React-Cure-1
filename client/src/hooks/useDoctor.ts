import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export type DoctorSpecialty = {
  id: number;
  name: string;
  icon: string | null;
};

export type DoctorLocation = {
  lat: number;
  lng: number;
};

export type DoctorTimeSlot = {
  date: string;
  start_time: string;
  end_time: string;
};

export type DoctorReview = {
  patient_name: string;
  rating: number;
  comment: string;
  time_ago: string;
};

export type Doctor = {
  id: number;
  name: string;
  specialty: DoctorSpecialty;
  hospital_name: string;
  location: DoctorLocation;
  bio: string;
  years_of_experience: number;
  rating: number;
  total_reviews: number;
  total_patients: number;
  consultation_fee: string;
  phone: string;
  email: string;
  profile_image: string;
  is_favorite: boolean;
  times: DoctorTimeSlot[];
  reviews: Record<string, DoctorReview>;
};

// Helper function to check API response status
function checkApiResponse(response: any, defaultMessage: string = "API request failed") {
  if (response.status !== true && response.status !== 200) {
    throw new Error(response.message || defaultMessage);
  }
  return response;
}

async function getDoctorById(id: number): Promise<Doctor> {
  const { data } = await api.get(`/doctors/${id}`);
  // API returns { status: true, message: "Doctor details loaded successfully", data: {...} }
  checkApiResponse(data, "Failed to fetch doctor details");
  return data.data;
}

export function useDoctor(doctorId: number | string | undefined) {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctorById(Number(doctorId)),
    enabled: !!doctorId && !isNaN(Number(doctorId)),
  });
}

// Type for doctors list from API
export type DoctorListItem = {
  id: number;
  name: string;
  image: string;
  hospital_name: string;
  specialty_id: number;
  location: DoctorLocation;
  specialty: DoctorSpecialty;
  times: DoctorTimeSlot[];
  reviews: any[];
};

export type NearYouDoctorsResponse = {
  doctors_near_you: {
    current_page: number;
    data: DoctorListItem[];
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

async function getNearYouDoctors(page: number = 1): Promise<NearYouDoctorsResponse> {
  const { data } = await api.get(`/home/all-near-you-doctors`, {
    params: { page },
  });
  // API returns { status: true, message: "Doctors near you loaded successfully", data: {...} }
  checkApiResponse(data, "Failed to fetch doctors");
  return data.data;
}

export function useNearYouDoctors(page: number = 1) {
  return useQuery({
    queryKey: ["nearYouDoctors", page],
    queryFn: () => getNearYouDoctors(page),
  });
}

// Endpoint that uses user's current location
async function getDoctorsNearYouLocation(
  lat?: number,
  lng?: number
): Promise<DoctorListItem[]> {
  const { data } = await api.get(`/home/doctors_near_you`, {
    params: lat && lng ? { lat, lng } : {},
  });
  // API returns { status: true, message: "...", data: [] }
  checkApiResponse(data, "Failed to fetch doctors near you");
  // Handle empty data array
  return Array.isArray(data.data) ? data.data : [];
}

export function useDoctorsNearYouLocation(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ["doctorsNearYouLocation", lat, lng],
    queryFn: () => getDoctorsNearYouLocation(lat, lng),
    enabled: !!lat && !!lng, // Only fetch if location is provided
  });
}

