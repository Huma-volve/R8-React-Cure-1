import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Eye, EyeOff } from 'lucide-react';
import { getFullApiUrl } from '@/config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    setError('');
    setSuccess('');
    setLoading(true);


    if (!name || !email || !password || !passwordConfirmation || !phoneNumber) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Remove country code prefix (+20) - backend expects local format like "01208448553"
    let formattedPhone = phoneNumber;
    if (phoneNumber.startsWith('+20')) {
      formattedPhone = '0' + phoneNumber.slice(3);
    } else if (phoneNumber.startsWith('+')) {
      formattedPhone = phoneNumber.slice(1);
    }

    try {
      const response = await fetch(getFullApiUrl('/api/v1/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          phone: formattedPhone,
          gender: 'male',
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store user_id for OTP verification
      localStorage.setItem('verification_user_id', data.data.user_id.toString());

      setSuccess('Account created! OTP sent to your WhatsApp.');
      console.log('Register response:', data);

      // Redirect to verification page after short delay
      setTimeout(() => {
        window.location.href = '/verify';
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to connect to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const response = await fetch(getFullApiUrl('/api/v1/auth/google/redirect'));
      const text = await response.text();
      let url = text;

      try {
        const json = JSON.parse(text);
        url = json.url || json.data?.url || text;
      } catch (e) {
        // Not JSON
      }

      url = url.replace(/^"|"$/g, '');

      // 3. We use the URL as provided by the backend because it contains 
      // the whitelisted redirect_uri (127.0.0.1:8000). 
      // To make this work, run the proxy: node auth_proxy.cjs
      url = url.replace(/^"|"$/g, '');

      console.log('Redirecting to Google:', url);
      window.location.href = url;
    } catch (err) {
      console.error('Failed to get Google redirect URL:', err);
      alert('Connection to login server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <img className="absolute top-0 right-0 w-full h-full object-right md:w-[948px]" src="src/assets/wave bg.png" alt="wave bg" />
      <img className="absolute top-0 right-0 w-full h-full object-right md:w-[948px]" src="src/assets/border.png" alt="border" />

      <img
        src="src/assets/BsHeartPulse.png"
        alt="heart"
        className="absolute top-8 left-6 w-10 h-10 md:top-10 md:left-20 z-20"
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
        <div
          className="bg-white rounded-2xl shadow-2xl 
                    w-full max-w-md 
                    h-[65vh] md:h-[80vh] lg:h-[75vh]  
                    overflow-y-auto             
                    p-6 md:p-8 lg:p-10            
                    pointer-events-auto
                    animate-in fade-in zoom-in-95 duration-300
                    md:-translate-x-20 lg:-translate-x-32"
        >
          <div className="flex flex-col gap-6 md:gap-8 h-full">
            <div className="text-center -space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#05162C]">Sign Up</h1>
              <p className="text-xs md:text-sm text-[#6D7379] mt-2">
                Create your account in seconds
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#05162C] mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#05162C] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#05162C] mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"

                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            transition outline-none pr-12"
                  required
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-[#05162C] mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm your password"

                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            transition outline-none pr-12"
                  required
                />
                {passwordConfirmation && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#05162C] mb-1">Phone Number</label>
                <PhoneInput
                  international
                  defaultCountry="EG"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value || '')}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 rounded-lg transition text-sm"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="space-y-3">
              <div className="flex items-center gap-x-3">
                <hr className="flex-1 border-gray-300" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#05162C] font-medium py-3 border border-gray-300 rounded-lg transition text-sm cursor-pointer"
              >
                <img src="src/assets/flat-color-icons_google.png" alt="google" className="w-5 h-5" />
                {loading ? 'Connecting...' : 'Continue with Google'}
              </button>
            </div>

            <p className="text-center text-xs text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline font-medium">
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
