import { useState } from "react";
import DateTimePicker from '@/Components/Cards/DateTimePicker';
import StarRateIcon from '@mui/icons-material/StarRate';
import human from '@/assets/images/human.png';
import verify from '@/assets/images/verified.svg';
import medal from '@/assets/images/medal.svg';
import star2 from '@/assets/images/star2.svg';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import profile from '@/assets/images/profile.svg';
import messages from '@/assets/images/messages.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ReviewCard from "@/Components/Cards/ReviewCard";
import PopUp from '@/Components/Cards/PopUp';
import Rating from '@mui/material/Rating';

const AppointmentPage: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false)
  const handleFavoriteToggle = () => {
    const newState = !isFavorited
    setIsFavorited(newState)
  }
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {/* Main container - responsive flex direction */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-34 flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-28"> 
        
        {/* Left column - reviews section */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-11 w-full lg:w-1/2">
          
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
            <span className='font-[Georgia] text-3xl md:text-[40px]'>4.5/5</span>
            <div className="flex flex-col items-center">
              <div>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" className="md:text-base" />
              </div>
              <p className='font-montserrat font-medium text-right text-gray-600 text-sm md:text-base'>1250+ reviews</p>
            </div>
          </div>
          
          {/* Review Cards - responsive grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            {/* Review Card 1 */}
            <div className='w-full border border-gray-300 rounded-lg p-3'>
              <div className='flex flex-row gap-3 md:gap-4'>
                <img src={human} alt="" className='rounded-full w-12 h-12 md:w-15 md:h-15 object-cover bg-gray-400 shrink-0'/>
                <div className='flex flex-row justify-between w-full'>
                  <div className='pt-1 md:pt-2'>
                    <p className='font-[Georgia] font-normal text-sm md:text-[16px] text-gray-900'>Nabila Reyna</p>
                    <p className='font-montserrat font-medium text-xs md:text-[14px] text-gray-600'>30 min ago</p>
                  </div>
                  <div className="flex items-center justify-center gap-0.5 w-14 h-7 md:w-16 md:h-8 bg-amber-100 rounded-md shrink-0">
                    <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400 md:text-[25px]" />
                    <span className='font-extrabold text-sm md:text-[16px] text-amber-400'>4.5</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='font-montserrat font-medium text-sm md:text-[16px] text-gray-600 pt-2 md:pt-1'>
                  Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!
                </p>
              </div>
            </div>
            
            {/* Review Card 2 */}
            <div className='w-full border border-gray-300 rounded-lg p-3'>
              <div className='flex flex-row gap-3 md:gap-4'>
                <img src={human} alt="" className='rounded-full w-12 h-12 md:w-15 md:h-15 object-cover bg-gray-400 shrink-0'/>
                <div className='flex flex-row justify-between w-full'>
                  <div className='pt-1 md:pt-2'>
                    <p className='font-[Georgia] font-normal text-sm md:text-[16px] text-gray-900'>Nabila Reyna</p>
                    <p className='font-montserrat font-medium text-xs md:text-[14px] text-gray-600'>30 min ago</p>
                  </div>
                  <div className="flex items-center justify-center gap-0.5 w-14 h-7 md:w-16 md:h-8 bg-amber-100 rounded-md shrink-0">
                    <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400 md:text-[25px]" />
                    <span className='font-extrabold text-sm md:text-[16px] text-amber-400'>4.5</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='font-montserrat font-medium text-sm md:text-[16px] text-gray-600 pt-2 md:pt-1'>
                  Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!
                </p>
              </div>
            </div>
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
              <p className='text-shadow-blue-950 font-[Georgia] font-normal text-lg md:text-[20px] text-center'>Dr. Jessica Turner</p>
              <p className='font-normal font-montserrat text-gray-800 text-xs md:text-[14px]'>Pulmonologist</p>
            </div>
            
            <button className="border-0 rounded-full bg-amber-50 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
              <ChatIcon className="text-xl md:text-2xl"/>
            </button>
          </div>
          
          {/* Stats section - responsive grid */}
          <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6'>
            <div className='flex flex-col items-center gap-1'>
              <img src={profile} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>2,000+</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Patients</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={medal} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>10+</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Experience</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={star2} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>4.5</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Rating</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <img src={messages} alt="" className='object-cover w-10 h-10 md:w-auto md:h-auto'/>
              <p className='text-gray-700 text-xs md:text-[14px] font-semibold font-montserrat'>1325</p>
              <p className='font-montserrat text-gray-700 text-xs md:text-[14px]'>Reviews</p>
            </div>
          </div>
          
          {/* About Doctor section */}
          <div className='flex flex-col gap-3'>
            <span className='font-[Georgia] text-lg md:text-xl text-black'>About Doctor</span>
            <div className="relative text-gray-800 leading-relaxed">
              <h4 className={`text-sm md:text-base ${expanded ? "h-auto" : "line-clamp-3 md:line-clamp-4"}`}>
                Dr. Jessica Turner is a highly skilled pulmonologist with over 10 years of experience in diagnosing and treating respiratory conditions.
                She is dedicated to providing personalized care and utilizing the latest medical advancements to ensure the best outcomes for her patients.
                Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
                Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
                Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
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