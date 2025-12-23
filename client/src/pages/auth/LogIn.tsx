import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import HeartIcon from "@/assets/BsHeartPulse.png"
import wave from '@/assets/wave bg.png';
import border from '@/assets/border.png';
import googleIcon from '@/assets/flat-color-icons_google.png';

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  return (
    <div className="flex min-h-screen relative overflow-hidden">
        
      <img 
        className="absolute top-0 right-0 w-full h-full object-right md:w-237 "
        src={wave} 
        alt="wave bg" 
      />
      <img 
        className="absolute top-0 right-0 w-full h-full object-right md:w-237 "
        src={border} 
        alt="border" 
      />

      {/* أيقونة القلب - responsive وآمنة */}
      <img
        src={HeartIcon}
        alt='heart'
        className='absolute top-8 left-6 w-10 h-10 md:top-10 md:left-20 z-20'
      />

      {/* الفورم - responsive 100% ومرن على كل الأجهزة */}
      <div 
        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 lg:pr-32 z-10 pointer-events-none"
      >
        <div 
    className="bg-white rounded-2xl shadow-2xl 
               w-[90%] max-w-md 
               p-6 md:p-8 
               pointer-events-auto
               animate-in fade-in zoom-in-95 duration-300
               md:-translate-x-50 lg:-translate-x-75 xl:-translate-x-125" 
  >
          <div className="flex flex-col" style={{ gap: '32px' }}>
            
            <div className="flex flex-col text-center gap-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-[#05162C] font-georgia">
                Sign In
              </h1>
              <p className="text-[#6D7379] text-sm md:text-base font-montserrat">
                Please Enter your phone number
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <PhoneInput
                  defaultCountry="EG" 
                  value={phoneNumber}
                  onChange={(e:any) => setPhoneNumber(e || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter phone number"
                />
              </div>

              <div className='flex flex-col gap-y-5'>
                <Button component={Link} to="/home" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium w-full py-3.5 rounded-lg transition">
                  Sign In
                </Button>

                <div className='flex items-center gap-x-4'>
                  <hr className='flex-1 border-gray-300'/>
                  <p className='text-gray-400 text-sm'>or</p>
                  <hr className='flex-1 border-gray-300'/>
                </div>

                <button className="cursor-pointer flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#05162C] font-medium w-full py-3.5 border border-gray-300 rounded-lg transition">
                  <img src={googleIcon} alt="google" className='w-5 h-5'/>
                  Sign In With Google
                </button>
              </div>

              <div className='text-center'>
                <p className='text-gray-500 text-sm'>
                  Don’t have an account? {' '}
                  <Link to="/signup" className='text-blue-500 hover:underline font-medium'>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
