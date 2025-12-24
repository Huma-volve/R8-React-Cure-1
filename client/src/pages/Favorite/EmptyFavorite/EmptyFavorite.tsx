import Hearts from '@/assets/images/Heart.svg';
import { useEffect, useState } from "react";
import DoctorCard from '@/Components/Cards/DoctorCard';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getFavorites } from "@/api/auth";
import { useNavigate } from 'react-router-dom';

interface DoctorTimeSlot {
  date: string;
  start_time: string;
  end_time: string;
}

interface FavoriteItem {
  id: number;
  image: string
  name: string
  specialty: string
  hospital_name: string
  rating: number
  times?: DoctorTimeSlot[];
  is_favorite: boolean

  onFavoriteToggle?: (isFavorited: boolean) => void
}

const getWorkingTimeRange = (times?: DoctorTimeSlot[]) => {
  if (!times || times.length === 0) return null;

  const sorted = [...times].sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  return {
    start: sorted[0].start_time.slice(0, 5),
    end: sorted[sorted.length - 1].end_time.slice(0, 5),
  };
};
const EmptyFavorite: React.FC = () => {
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    getFavorites()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : [];

        const mapped = list.map((doctor: FavoriteItem) => {
          const range = getWorkingTimeRange(doctor.times);

          return {
            ...doctor,
            startTime: range?.start,
            endTime: range?.end,
          };
        });

        setFavorites(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <p className="flex h-screen justify-center items-center flex-col gap-5">Loading...</p>;
  if (favorites.length === 0) {
    return (
      <div className="flex h-screen justify-center items-center flex-col gap-5">
            <img src={Hearts} alt="Heart pic" />
            <h1>Your favorite!</h1>
            <h3>Add your favorite to find it easily</h3> 
             
        </div>
    );
  }
  return (
    <>  

      <div className="w-full h-screen">
        <div className="flex items-center sm:pt-10 px-4 py-2 gap-1 text-gray-600">
          <button onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
          </button>
          <span className="text-xl md:text-2xl font-semibold px-2 md:px-5">
            Your Favorites Doctors
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-5  overflow-y-auto">
            {favorites.map((FavoriteItem) => (

              <DoctorCard key={FavoriteItem.id} doctor={FavoriteItem} />
            ))}
          </div>
      </div>
    </>
  );
};

export default EmptyFavorite;
