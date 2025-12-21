import { useState } from "react"
import { Card as MUICard } from "@mui/material"
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import placeholder from "@/assets/images/profile.svg"

interface Doctor{
  id?: number;
  image: any
  name: string
  specialty: string
  hospital: string
  rating: number
  startTime: string
  endTime: string
  className?: string;
}
interface DoctorCardProps {
  doctor: Doctor;
  onFavoriteToggle?: (isFavorited: boolean) => void
}

export const DoctorCard = ({doctor,onFavoriteToggle }: DoctorCardProps) => {
  const [isFavorited, setIsFavorited] = useState(true)
  const handleFavoriteToggle = () => {
    const newState = !isFavorited
    setIsFavorited(newState)
    onFavoriteToggle?.(newState)
  }
  return (
    <MUICard
      className="rounded-xl! bg-white border  border-gray-200 hover:shadow-md transition-shadow"
      elevation={0}
    >
      <div className="">
        <div className="flex items-start justify-around mb-1">
          <div className="flex gap-4">
              <img src={doctor.image || {placeholder}} alt={doctor.name} className="object-center w-22 h-24" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
              <p className="text-sm text-gray-600 ">
                {doctor.specialty} | {doctor.hospital}
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
            onClick={handleFavoriteToggle}
            className="shrink-0 p-2  transition-colors"
            aria-label="Toggle favorite"
          >
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