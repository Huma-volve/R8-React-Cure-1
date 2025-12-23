import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

interface Doctor {
  id: number;
  image: string
  name: string
  specialty: string
  hospital: string
  rating: number
  startTime: string
  endTime: string
  price: number
  className?: string;
}

function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://your-api.com/doctors");
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div className="p-4">Loading doctors...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {doctors.map((doctor) => (
        <div>
          <DoctorCard key={doctor.id} doctor={doctor} />
          <div>
            <span>price/hour</span>
            <span className="font-bold text-lg ml-2">${doctor.price}</span>
          </div>
          <button>
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoctorsList;
