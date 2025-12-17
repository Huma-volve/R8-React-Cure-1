import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Eye, EyeOff } from 'lucide-react';
import HeartIcon from "@/assets/BsHeartPulse.png"
import wave from '@/assets/wave bg.png';
import border from '@/assets/border.png';
import googleIcon from '@/assets/flat-color-icons_google.png';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="flex min-h-screen relative overflow-hidden">
     
      <img
        className="absolute top-0 right-0 w-full h-full object-right md:w-[948px]"
        src={wave}
        alt="wave bg"
      />
      <img
        className="absolute top-0 right-0 w-full h-full object-right md:w-[948px]"
        src={border}
        alt="border"
      />

      {/* أيقونة القلب */}
      <img
        src={HeartIcon}
        alt="heart"
        className="absolute top-8 left-6 w-10 h-10 md:top-10 md:left-20 z-20"
      />

      {/* البطاقة - مقصّرة ومريحة للعين */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
       <div
          className="bg-white rounded-2xl shadow-2xl 
                    w-full max-w-md 
                    h-[65vh] md:h-[80vh] lg:h-[75vh]  
                    overflow-y-auto             
                    p-6 md:p-8 lg:p-10            
                    pointer-events-auto
                    animate-in fade-in zoom-in-95 duration-300
                    md:-translate-x-20 lg:-translate-x-32 "
        >
          <div className="flex flex-col gap-6 md:gap-8 h-full ">
            <div className="text-center -space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#05162C]">
                Sign Up
              </h1>
              <p className="text-xs md:text-sm text-[#6D7379] mt-2">
                Create your account in seconds
              </p>
            </div>

           
            <div className="space-y-4"> 
              <div>
                <label className="block text-xs font-medium text-[#05162C] mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#05162C] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            transition outline-none pr-12" 
                />
                
               
                {email && (
                  <button
                    type="button"


                
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#05162C] mb-1">Phone Number</label>
                <PhoneInput
                  defaultCountry="EG"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value || '')}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition"
                />
              </div>
            </div>

           
            <div className="space-y-3">  
              <button className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition text-sm">
                Create Account
              </button>

              <div className="flex items-center gap-x-3">
                <hr className="flex-1 border-gray-300" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <button className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white hover:bg-gray-50 text-[#05162C] font-medium py-3 border border-gray-300 rounded-lg transition text-sm">
                <img src={googleIcon} alt="google" className=" w-5 h-5" />
                Continue with Google
              </button>
            </div>

            {/* رابط تسجيل الدخول */}
            <p className="text-center text-xs text-gray-600 ">
              Already have an account?{' '}
              <a href="/" className="text-blue-500 hover:underline font-medium ">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
