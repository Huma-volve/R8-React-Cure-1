// import Hearts from '@/assets/images/Heart.svg';
import d1 from "@/assets/images/d1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "@/components/Cards/DoctorCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

// interface Doctor {
//   id: number;
//   image: string
//   name: string
//   specialty: string
//   hospital: string
//   rating: number
//   startTime: string
//   endTime: string
//   onFavoriteToggle?: (isFavorited: boolean) => void
//   className?: string;
// }
const EmptyFavorite: React.FC = () => {
  //   const [doctors, setDoctors] = useState<Doctor[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  //   const [isFavorited, setIsFavorited] = useState(false)
  //   const handleFavoriteToggle = () => {
  //     const newState = !isFavorited
  //     setIsFavorited(newState)
  //     onFavoriteToggle?.(newState)
  //   }

  //     useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const response = await axios.get("https://your-api.com/doctors");
  //       setDoctors(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch doctors.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);

  // if (loading) return <div className="p-4">Loading doctors...</div>;
  // if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <>
      {/* <div className="flex h-screen justify-center items-center flex-col gap-5">
            <img src={Hearts} alt="Heart pic" />
            <h1>Your favorite!</h1>
            <h3>Add your favorite to find it easily</h3> 
             
        </div> */}
      <div className="w-full">
        <div className="flex items-center pt-4 md:pt-8 lg:pt-22 px-4 py-2 gap-1 text-gray-600">
          <button>
            <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
          </button>
          <span className="text-xl md:text-2xl font-semibold px-2 md:px-5">
            Your Favorites Doctors
          </span>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-20 md:gap-6 p-4 md:p-5 h-screen overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
            <div key={i} className="w-full">
              <DoctorCard
                doctor={{
                  id: 1,
                  image: { d1 },
                  name: "Dr. John Doe",
                  specialty: "Cardiologist",
                  hospital: "City Hospital",
                  rating: 4.5,
                  startTime: "09:00 AM",
                  endTime: "05:00 PM",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {doctors.map((doctor) => (

            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div> */}
    </>
  );
};

export default EmptyFavorite;
