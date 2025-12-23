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
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = async () => {
    if (!phoneNumber) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Remove country code prefix (+20) - backend expects local format like "01208448553"
      let formattedPhone = phoneNumber;
      if (phoneNumber.startsWith('+20')) {
        formattedPhone = '0' + phoneNumber.slice(3); // +20... -> 0...
      } else if (phoneNumber.startsWith('+')) {
        // For other countries, just remove the + sign
        formattedPhone = phoneNumber.slice(1);
      }

      const response = await fetch(getFullApiUrl('/api/v1/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          phone: formattedPhone,
          password: password,
        }),
        credentials: 'include',
      });

      // Handle redirect response (302)
      if (response.type === 'opaqueredirect' || response.status === 302) {
        // The backend is redirecting - this might mean success
        // Check the Location header in the terminal logs
        setSuccess('Request sent! Check if OTP was sent to your phone.');
        console.log('Redirect response:', response);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data in localStorage
      const token = data.data.token;
      const tokenType = data.data.token_type;
      const userData = data.data.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('token_type', tokenType);
      localStorage.setItem('user_data', JSON.stringify(userData));

      setSuccess(`Login successful!`);
      window.location.href = '/profile';

    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // 1. Fetch the Google OAuth URL from your backend
      const response = await fetch(getFullApiUrl('/api/v1/auth/google/redirect'));
      const text = await response.text();
      let url = text;

      try {
        // Try to parse as JSON in case the backend returns { "url": "..." }
        const json = JSON.parse(text);
        url = json.url || json.data?.url || text;
      } catch (e) {
        // Not JSON
      }

      // 2. Remove any surrounding quotes if they exist
      url = url.replace(/^"|"$/g, '');

      // 3. We use the URL as provided by the backend because it contains 
      // the whitelisted redirect_uri (127.0.0.1:8000). 
      // To make this work, run the proxy: node auth_proxy.cjs
      url = url.replace(/^"|"$/g, '');

      console.log('Redirecting to Google:', url);
      window.location.href = url;
    } catch (err) {
      console.error('Failed to get Google redirect URL:', err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
        
      <img 
        className="absolute top-0 right-0 w-full h-full object-right md:w-237 "
        src={wave} 
        alt="wave bg" 
      />
      <img 
        className="absolute top-0 right-0 w-full h-full object-right md:w-[948px] "
        src={border} 
        alt="border" 
      />

      <img
        src={HeartIcon}
        alt='heart'
        className='absolute top-8 left-6 w-10 h-10 md:top-10 md:left-20 z-20'
      />

      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 lg:pr-32 z-10 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl 
                     w-[90%] max-w-md 
                     p-6 md:p-8 
                     pointer-events-auto
                     animate-in fade-in zoom-in-95 duration-300
                     md:-translate-x-[200px] lg:-translate-x-[300px] xl:-translate-x-[500px]"
        >
          <div className="flex flex-col" style={{ gap: '32px' }}>
            <div className="flex flex-col text-center gap-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-[#05162C] font-georgia">
                Sign In
              </h1>
              <p className="text-[#6D7379] text-sm md:text-base font-montserrat">
                Please enter your credentials
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <PhoneInput
                  defaultCountry="EG"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}

              <div className='flex flex-col gap-y-5'>
                <Button component={Link} to="/home" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium w-full py-3.5 rounded-lg transition">
                  Sign In
                </Button>

                <div className="flex items-center gap-x-4">
                  <hr className="flex-1 border-gray-300" />
                  <p className="text-gray-400 text-sm">or</p>
                  <hr className="flex-1 border-gray-300" />
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
  );
};

export default LogIn;