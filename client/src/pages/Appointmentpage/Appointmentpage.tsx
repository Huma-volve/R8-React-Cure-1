import { useState } from "react";
import DateTimePicker from '@/components/DateTimePicker';
import StarRateIcon from '@mui/icons-material/StarRate';
import human from '../../assets/images/human.png?url';
import verify from '../../assets/images/verified.svg';
import medal from '../../assets/images/medal.svg';
import star2 from '../../assets/images/star2.svg';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import profile from '../../assets/images/profile.svg';
import messages from '../../assets/images/messages.svg';
import ReviewCard from "@/components/Cards/ReviewCard";
import PopUp from '@/components/Cards/PopUp';

const AppointmentPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [open,setOpen] = useState(false);
  return (
      // main container 
    <div className="p-24 flex flex-row gap-28 "> 
      <div className="flex flex-col gap-11 w-1/2"> {/* left row */}
        <DateTimePicker />     {/* 1st left col*/}
        <div className="flex items-center justify-between ">{/* 2nd left col*/}
          <span className='font-[Georgia] text-xl text-black '>Review and Rating</span>
          <button onClick={ () => setOpen(true)} className="flex items-center text-blue-600 mt-2 font-medium hover:underline cursor-pointer"><CreateOutlinedIcon sx={{ fontSize: 22 }} />Add review</button>
            <PopUp open={open} onClose={() => setOpen(false)}>
              <ReviewCard/>
            </PopUp>
        </div>
        <div className="flex items-center justify-between">{/* 3ed left col*/}
          <span className='font-[Georgia] text-[40px]'>4.5/5</span>
          <div className=" flex flex-col items-center">
            <div>
            <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
            <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
            <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
            <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
            <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
            </div>
            <p className='font-montserrat font-medium text-right text-gray-600'>1250+ reiview</p>
          </div>
        </div>
        <div className='flex flex-row gap-2'> {/* 4th left col*/}
          <div className= 'w-95 h-44 border border-gray-300 rounded-lg p-3'>
            <div className='flex flex-row gap-4 '>
              <img src={human} alt="" className='rounded-full  w-15 h-15 object-cover bg-gray-400'/>
              <div className='flex flex-row justify-between w-full'>
                <div className='pt-2'>
                  <p className='font-[Georgia] font-normal text-[16px] text-gray-900'>Nabila Reyna</p>
                  <p className='font-montserrat font-medium text-[14px] text-gray-600'>30 min ago</p>
                </div>
                <div className="flex items-center justify-center gap-0.5 w-16 h-8 bg-amber-100 rounded-md mt-3.5">
                  <StarRateIcon sx={{ fontSize: 25 }} className="fill-yellow-400 text-yellow-400" />
                  <span className='font-extrabold text-[16px] text-amber-400'>4.5</span>
                </div>
              </div>
            </div>
            <div>
              <p className='font-montserrat font-medium text-[16px] text-gray-600 pt-1'>Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!</p>
            </div>
          </div>
          <div className= 'w-95 h-44 border border-gray-300 rounded-lg p-3'>
            <div className='flex flex-row gap-4 '>
              <img src={human} alt="" className='rounded-full  w-15 h-15 object-cover bg-gray-400'/>
              <div className='flex flex-row justify-between w-full'>
                <div className='pt-2'>
                  <p className='font-[Georgia] font-normal text-[16px] text-gray-900'>Nabila Reyna</p>
                  <p className='font-montserrat font-medium text-[14px] text-gray-600'>30 min ago</p>
                </div>
                <div className="flex items-center justify-center gap-0.5 w-16 h-8 bg-amber-100 rounded-md mt-3.5">
                  <StarRateIcon sx={{ fontSize: 25 }} className="fill-yellow-400 text-yellow-400" />
                  <span className='font-extrabold text-[16px] text-amber-400'>4.5</span>
                </div>
              </div>
            </div>
            <div>
              <p className='font-montserrat font-medium text-[16px] text-gray-600 pt-1'>Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full p-7 pl-16 pr-16 bg-gray-200 rounded-3xl"> {/* right row */}
        <div className='flex flex-row justify-between p-2'> {/* 1st right col*/}
          <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
          <div className='flex flex-col items-center'> 
            <div className='relative mb-2'>
              <img src={human} alt="" className='rounded-full  w-32 h-28 object-cover'/>
              <img src={verify} alt="" className='absolute bottom-2 right-2' />
            </div>
            <p className='text-shadow-blue-950 font-[Georgia] font-normal text-[20px]'>Dr. Jessica Turner</p>
            <p className='font-normal font-montserrat text-gray-800 text-[14px]'>Pulmonologist</p>
          </div>
          <StarRateIcon sx={{ fontSize: 20 }} className="fill-yellow-400 text-yellow-400" />
        </div>
        <div className='w-fu h-[98px] flex  flex-row justify-between'>{/* 2nd right col*/}
          <div className='flex flex-col items-center gap-1 '>
            <img src={profile} alt="" className='object-cover '/>
            <p className='text-gray-700 text-[14px] font-semibold font-montserrat '>2,000+</p>
            <p className='font-montserrat text-gray-700 text-[14px]'>Patients</p>
          </div>
          <div className='flex flex-col items-center gap-1 '>
            <img src={medal} alt="" className='object-cover '/>
            <p className='text-gray-700 text-[14px] font-semibold font-montserrat '>10+</p>
            <p className='font-montserrat text-gray-700 text-[14px]'>Experience</p>
          </div>
          <div className='flex flex-col items-center gap-1 '>
            <img src={star2} alt="" className='object-cover '/>
            <p className='text-gray-700 text-[14px] font-semibold font-montserrat '>4.5</p>
            <p className='font-montserrat text-gray-700 text-[14px]'>Rating</p>
          </div>
          <div className='flex flex-col items-center gap-1 '>
            <img src={messages} alt="" className='object-cover '/>
            <p className='text-gray-700 text-[14px] font-semibold font-montserrat '>1325</p>
            <p className='font-montserrat text-gray-700 text-[14px]'>Reviews</p>
          </div>
        </div>
        <div className='flex flex-col gap-3 '> {/* 3rd right col*/}
          <span className='font-[Georgia] text-xl text-black '>About Doctor</span>
            <div className="relative text-gray-800  leading-relaxed  ">
                  <h4 className={`${expanded ? "h-auto" : "h-13 overflow-hidden"}`}>
                    Dr. Jessica Turner is a highly skilled pulmonologist with over 10 years of experience in diagnosing and treating respiratory conditions.
                    She is dedicated to providing personalized care and utilizing the latest medical advancements to ensure the best outcomes for her patients 
                    Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
                    Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
                    Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
                  </h4>
                  <button
                    className="text-blue-600 mt-2 font-medium hover:underline"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Read Less" : "Read More..."}
                  </button>
                </div>
        </div>
        <div>{/* 4th right col*/}
          <span className='font-[Georgia] text-xl text-black '>Location</span>
        </div>
      </div> 
  </div>
 
  );
};

export default AppointmentPage;
