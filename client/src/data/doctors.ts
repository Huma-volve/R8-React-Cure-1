export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  times: string;
  lat: number;
  lng: number;
  image: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    times: "9:30am - 8:00pm",
    lat: 30.0444,
    lng: 31.2357,
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "Sarah Ibrahim",
    specialty: "Dermatologist | Cairo Medical Center",
    rating: 4.6,
    times: "10:00am - 7:00pm",
    lat: 30.0500,
    lng: 31.2300,
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    name: "Mohamed Adel",
    specialty: "Cardiologist | Heart Clinic",
    rating: 4.9,
    times: "11:00am - 6:00pm",
    lat: 30.0480,
    lng: 31.2450,
    image: "https://i.pravatar.cc/100?img=15",
  },
];
