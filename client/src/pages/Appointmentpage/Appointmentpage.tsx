import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DateTimePicker from '@/Components/Cards/DateTimePicker';
import StarRateIcon from '@mui/icons-material/StarRate';
import human from '@/assets/images/human.png';
import verify from '@/assets/images/verified.svg';
import medal from '@/assets/images/medal.svg';
import star2 from '@/assets/images/star2.svg';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import profile from '@/assets/images/profile.svg';
import AppointmentSkeleton from "@/skelatons/AppointmentSkeleton";
import messages from '@/assets/images/messages.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ReviewCard from "@/Components/Cards/ReviewCard";
import PopUp from '@/Components/Cards/PopUp';
import Rating from '@mui/material/Rating';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getDoctorById } from "@/api/auth";
import { useDispatch } from "react-redux";
import { createChat } from "../Redux-Store/ChatSlice/ChatSlice";
import type {  AppDispatch } from "@/store";


interface Specialty {
  id: number;
  name: string;
  icon: string | null;
}
interface Review {
  patient_name: string;
  rating: number;
  comment: string;
  time_ago: string;
}
type ReviewsResponse = Record<string, Review>;
const normalizeReviews = (reviews?: ReviewsResponse): Review[] => {
  if (!reviews) return [];
  return Object.values(reviews);
};
interface Doctor{

  id: number
  image: string
  name: string
  specialty: Specialty
  hospital_name: string
  rating: number
  bio: string
  years_of_experience:number
  total_reviews: number
  total_patients: number
  is_favorite: boolean
  price:number  
  reviews?: ReviewsResponse
}
const AppointmentPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  

  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false)
const handleFavoriteToggle = () => {
  setIsFavorited((prev) => {
    const newValue = !prev;

    console.log(
      newValue
        ? "Doctor added to favorites (UI only)"
        : "Doctor removed from favorites (UI only)"
    );

    return newValue;
  });
};
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  




 useEffect(() => {
    if (!id) return;
    getDoctorById(id)
      .then((res) => {
      setDoctor(res.data);
      setIsFavorited(res.data.is_favorite); 
    })
    .catch(console.error);
  }, [id]);

  if (!doctor) return <AppointmentSkeleton/>;

  
const reviews = normalizeReviews(doctor.reviews).slice(0, 2);







  return (
    <>
    <div className="flex items-center sm:pt-10 px-10 py-2 gap-1 text-gray-600">
          <button onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
          </button>
          <span className="text-xl md:text-2xl font-semibold px-2 md:px-5">
            Make Your Appointment
          </span>
        </div>
      {/* Main container - responsive flex direction */}
      <div className="p-4  sm:p-6  md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-28"> 
        
        {/* Left column - reviews section */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-11  lg:w-1/2">
          
          {/* Date Time Picker */}
          <DateTimePicker />
          
          {/* Review Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className='font-[Georgia] text-lg md:text-xl text-black'>Review and Rating</span>
            <button 
              onClick={() => setOpen(true)} 
              className="flex items-center text-blue-600 font-medium hover:underline cursor-pointer text-sm md:text-base"
            >
              <CreateOutlinedIcon sx={{ fontSize: 20 }} className="md:text-[22px]" />
              Add review
            </button>
            <PopUp open={open} onClose={() => setOpen(false)}>
              <ReviewCard/>
            </PopUp>
          </div>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-between">
            <span className='font-[Georgia] text-3xl md:text-[40px]'>{doctor.rating}/5</span>
            <div className="flex flex-col items-center">
              <div>
                <Rating name="read-only" value={doctor.rating} precision={0.1} readOnly size="small" className="md:text-base" />
              </div>
              <p className='font-montserrat font-medium text-right text-gray-600 text-sm md:text-base'>{doctor.rating}reviews</p>
            </div>
          </div>
          
          {/* Review Cards - responsive grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4'>
            {/* Review Card 1 */}
            {reviews.map((review, index) => {
              return <>
              
                 <div key={index} className='w-full border border-gray-300 rounded-lg p-3'>
              <div className='flex flex-row gap-3 md:gap-4'>
                <img src={human} alt="" className='rounded-full w-12 h-12 md:w-15 md:h-15 object-cover bg-gray-400 shrink-0'/>
                <div className='flex flex-row justify-between w-full'>
                  <div className='pt-1 md:pt-2'>
                    <p className='font-[Georgia] font-normal text-sm md:text-[16px] text-gray-900'>{review.patient_name}</p>
                    <p className='font-montserrat font-medium text-xs md:text-[14px] text-gray-600'>{review.time_ago}</p>
                  </div>
                  <div className="flex items-center justify-center gap-0.5 w-14 h-7 md:w-16 md:h-8 bg-amber-100 rounded-md shrink-0">
                    <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400 md:text-[25px]" />
                    <span className='font-extrabold text-sm md:text-[16px] text-amber-400'>{review.rating}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='font-montserrat font-medium text-sm md:text-[16px] text-gray-600 pt-2 md:pt-1'>
                  {review.comment}
                </p>
              </div>
            </div>
              
              
              </>
            })}
          </div>
        </div>
        
        {/* Right column - doctor info section */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:w-1/2 p-5 md:p-7 lg:pl-16 lg:pr-16 bg-gray-200 rounded-2xl lg:rounded-3xl">
          
          {/* Doctor Header with favorite and chat buttons */}
          <div className='flex flex-row justify-between items-start p-2'>
            <button
              onClick={handleFavoriteToggle}
              className="relative transition-colors border-0 rounded-full bg-amber-50 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center"
              aria-label="Toggle favorite"
            >
              <FavoriteIcon
                sx={{ fontSize: 28 }}
                className={`${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-500"
                } transition-colors md:text-[35px]`}
              />
            </button>
            
            <div className='flex flex-col items-center'> 
              <div className='relative mb-2'>
                <img src={human} alt="" className='rounded-full w-24 h-24 md:w-32 md:h-28 object-cover'/>
                <img src={verify} alt="" className='absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 md:w-auto md:h-auto' />
              </div>
              <p className='text-shadow-blue-950 font-[Georgia] font-normal text-lg md:text-[20px] text-center'>{doctor.name}</p>
              <p className='font-normal font-montserrat text-gray-800 text-xs md:text-[14px]'>{doctor.specialty.name}</p>
            </div>
            


            <button onClick={() => {
             dispatch(createChat(doctor.id))
              .unwrap()
        .then((payload) => {

          navigate(`/chat/${payload.room_id}/${encodeURIComponent(doctor.name)}/${encodeURIComponent(doctor.image)}`);
        })
        .catch((err) => {
          console.error("Failed to create chat:", err);
        });
    }}  
className="border-0 cursor-pointer rounded-full bg-amber-50 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
              <ChatIcon className="text-xl md:text-2xl"/>
            </button>



          </div>
          
          {/* Stats section - responsive grid */}
          <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6'>
            <div className='flex flex-col items-center gap-1'>
              <img src={profile} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>{doctor.total_patients}</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Patients</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={medal} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>{doctor.years_of_experience}</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Experience</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={star2} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>{doctor.rating}</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Rating</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={messages} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>{doctor.total_reviews}</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Reviews</p>
            </div>
          </div>
          
          {/* About Doctor section */}
          <div className='flex flex-col gap-3'>
            <span className='font-[Georgia] text-lg md:text-xl text-black'>About Doctor</span>
            <div className="relative text-gray-800 leading-relaxed">
              <h4 className={`text-sm md:text-base ${expanded ? "h-auto" : "line-clamp-1 "}`}>
                {doctor.bio}
              </h4>
              <button
                className="text-blue-600 mt-2 font-medium hover:underline text-sm md:text-base"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Read Less" : "Read More..."}
              </button>
            </div>
          </div>
          
          {/* Location section */}
          <div>
            <span className='font-[Georgia] text-lg md:text-xl text-black'>Location</span>
          </div>
        </div> 
      </div>
    </>
  );
};

export default AppointmentPage;
