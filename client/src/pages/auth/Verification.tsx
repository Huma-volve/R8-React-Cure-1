import { useState, useEffect, useRef } from 'react';
import { getFullApiUrl } from '@/config';

const Verification = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(55);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Get user_id from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('verification_user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('No verification session found. Please sign up again.');
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);


    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(55);
    setCode(['', '', '', '']);
    setError('');
    inputsRef.current[0]?.focus();
  };

  const handleVerify = async () => {
    if (!userId) {
      setError('No verification session found. Please sign up again.');
      return;
    }

    const otp = code.join('');
    if (otp.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(getFullApiUrl('/api/v1/auth/otp/verify'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          user_id: userId,
          otp: otp,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      setSuccess('OTP verified successfully!');
      console.log('Verification response:', data);

      // Clear the stored user_id
      localStorage.removeItem('verification_user_id');

      // Redirect to login page after short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">

      <img
        className="absolute top-0 right-0 w-full h-full  object-right md:w-237"
        src="src/assets/images/wave bg.png"
        alt="wave bg"
      />
      <img
        className="absolute top-0 right-0 w-full h-full  object-right md:w-237"
        src="src/assets/images/border.png"
        alt="border"
      />




      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 pointer-events-auto
                     animate-in fade-in zoom-in-95 duration-300 md:-translate-x-20 lg:-translate-x-32"
        >
          <div className="flex flex-col gap-8">

            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[#05162C] font-georgia">
                Code Verification
              </h1>
              <p className="mt-3 text-sm md:text-base text-[#6D7379]">
                Enter the 4-digit code sent to your phone
              </p>
            </div>

            {/* 4 OTP input boxes */}
            <div className="flex justify-center gap-3 md:gap-5">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: any) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold text-[#05162C]
                           border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                           outline-none transition-all"
                />
              ))}
            </div>

            {/* Resend code */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-bold text-blue-600">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={code.some((d) => !d) || loading}
              className="cursor-pointer w-full py-3.5 rounded-lg font-medium text-white transition
                         bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            {/* Back */}
            <p className="text-center text-sm text-gray-500">
              <a href="/signUp" className="text-blue-600 hover:underline font-medium">
                ← Back to Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
