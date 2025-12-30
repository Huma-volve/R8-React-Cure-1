import { useState } from "react"
import { Card as MUICard } from "@mui/material"
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import d1 from '@/assets/images/d1.jpg';
import { favoritesToggle } from "@/api/auth";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";

interface Doctor{
  id: string | number;
  image: string
  name: string
  specialty: string
  hospital_name: string
  rating: number
  startTime?: string
  endTime?: string
  is_favorite: boolean
  className?: string;
}
interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState<boolean>(
    doctor.is_favorite
  );
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite button
    setLoading(true);
    try {
      // Call the toggle favorite API
      const result =await favoritesToggle(doctor.id as string);

      // Update local state
      setIsFavorited((prev) => !prev);
      setSnackbarMessage(result?.message);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/doctor/${doctor.id}`);
  };
  return (
    <MUICard
      className="rounded-xl! bg-white border  border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      elevation={0}
      onClick={handleCardClick}
    >
      <div className="">
        <div className="flex items-start justify-between ">
          <div className="flex space-x-15 ">
              <img src={d1} alt="" className="  items-start w-25" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
              <p className="text-sm text-gray-600 ">
                {doctor.specialty} | {doctor.hospital_name}
              </p>
              <div className="flex items-center gap-3 p-2">
                <div className="flex items-center gap-1">
                  <StarRateIcon sx={{ fontSize: 16 }} className="fill-yellow-400 text-yellow-400" />
                  <p className="text-sm font-medium text-gray-900">{doctor.rating}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <AccessTimeIcon className="h-4 w-5" />
                  <span className="text-sm">
                    {doctor.startTime} - {doctor.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleFavorite}
            disabled={loading}
            className="shrink-0 p-2 md:pr-1 pr-12 transition-colors"
            aria-label="Toggle favorite"
          >
            <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  />
            <FavoriteIcon
              sx={{ fontSize: 20 }}
              className={`${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-500"
              } transition-colors`}
            />
          </button>
        </div>
      </div>
    </MUICard>

  )
}
export default DoctorCard