import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Lock, LogOut, Loader2, CheckCircle2, AlertCircle, X, MapPin, Mail, Phone } from 'lucide-react';
import { getFullApiUrl } from '../config';

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  bir_of_date?: string | null;
  location?: string | null;
  image?: string | null;
  gender?: string;
  status?: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    day: '01',
    month: '01',
    year: '1990',
    location: '',
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<any>(null);

  // Load user data
  useEffect(() => {
    const loadData = () => {
      // Check for token in URL first (for direct redirects)
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      const urlUser = params.get('user');

      if (urlToken) {
        localStorage.setItem('auth_token', urlToken);
        localStorage.setItem('token_type', params.get('token_type') || 'Bearer');
        if (urlUser) {
          try {
            const decodedUser = JSON.parse(decodeURIComponent(urlUser));
            localStorage.setItem('user_data', JSON.stringify(decodedUser));
          } catch (e) {
            console.error('Error parsing user data from URL', e);
          }
        }
        // Clean URL after consuming parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          const user: UserData = JSON.parse(userData);
          const initialData = {
            fullName: user.name || '',
            email: user.email || '',
            phoneNumber: user.phone || '',
            location: user.location || '',
            day: '01',
            month: '01',
            year: '1990',
          };

          if (user.bir_of_date) {
            const [y, m, d] = user.bir_of_date.split('-');
            if (y) initialData.year = y;
            if (m) initialData.month = m;
            if (d) initialData.day = d;
          }

          setFormData(initialData);
          setOriginalData(initialData);
          setProfileImage(user.image || null);
        } catch (err) {
          console.error('Failed to parse user data', err);
        }
      } else {
        // Sample data for development
        const sample = {
          fullName: 'Ahmed',
          email: 'ahmedelabras@gmail.com',
          phoneNumber: '01208448554',
          location: 'Cairo, Egypt',
          day: '01',
          month: '01',
          year: '1990',
        };
        setFormData(sample);
        setOriginalData(sample);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Auto-dismiss alerts
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Invalid phone format (10-15 digits)';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!validate()) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('auth_token');
    const tokenType = localStorage.getItem('token_type') || 'Bearer';
    const birthday = `${formData.year}-${formData.month}-${formData.day}`;

    // Helper to update local storage
    const updateLocal = () => {
      const existing = JSON.parse(localStorage.getItem('user_data') || '{}');
      const updated = {
        ...existing,
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        bir_of_date: birthday,
        location: formData.location,
        image: profileImage
      };
      localStorage.setItem('user_data', JSON.stringify(updated));
      setOriginalData(formData);
    };

    if (!token) {
      setTimeout(() => {
        updateLocal();
        setSuccess('Success! Changes saved to your browser (Dev Mode).');
        setIsSaving(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch(getFullApiUrl('/api/v1/auth/profile/update'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.email,
          bir_of_date: birthday,
          location: formData.location,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.clear();
        navigate('/login');
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      updateLocal();
      setSuccess('Profile updated successfully!');
      // Update original data so "Save" button becomes disabled until new changes
      setOriginalData(formData);

    } catch (err: any) {
      console.error('Update error:', err);
      setError(err.message || 'Unable to connect to service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setFieldErrors({});
    setError(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-500 font-medium animate-pulse">Initializing Profile...</p>
      </div>
    );
  }

  const isModified = JSON.stringify(formData) !== JSON.stringify(originalData);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:flex-row min-h-[700px]">

            {/* Sidebar Left */}
            <div className="w-full lg:w-[350px] bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
              <div className="text-center mb-10 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-lg relative overflow-hidden ring-4 ring-blue-50 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=3b82f6&color=fff&size=200`}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-blue-600 text-white p-2.5 rounded-xl shadow-xl hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all z-10"
                    title="Upload Photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900 tracking-tight">{formData.fullName || 'New User'}</h2>
                <div className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <User className="w-3 h-3" />
                  Premium Member
                </div>
              </div>

              <div className="space-y-2 flex-grow">
                <nav className="space-y-1">
                  <NavItem icon={User} label="Profile Details" active />
                  <NavItem icon={Lock} label="Security" />
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="mt-10 flex items-center justify-center gap-3 w-full p-4 text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-2xl transition-all active:scale-[0.98]"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>

            {/* Main Content Right */}
            <div className="flex-1 p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">General Settings</h1>
                  <p className="text-slate-500 mt-1">Manage your account information and preferences</p>
                </div>
              </div>

              {/* Status Notifications */}
              <div className="space-y-4 mb-8">
                {success && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{success}</span>
                    <button onClick={() => setSuccess(null)} className="ml-auto hover:bg-emerald-100 p-1 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                    <button onClick={() => setError(null)} className="ml-auto hover:bg-rose-100 p-1 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <CustomInput
                  label="Full Name"
                  icon={User}
                  value={formData.fullName}
                  error={fieldErrors.fullName}
                  placeholder="Enter your name"
                  onChange={(val: string) => handleInputChange('fullName', val)}
                />

                {/* Phone */}
                <CustomInput
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  value={formData.phoneNumber}
                  error={fieldErrors.phoneNumber}
                  placeholder="+20 123 456 789"
                  onChange={(val: string) => handleInputChange('phoneNumber', val)}
                />

                {/* Email */}
                <CustomInput
                  label="Personal Email"
                  icon={Mail}
                  type="email"
                  value={formData.email}
                  error={fieldErrors.email}
                  placeholder="name@example.com"
                  onChange={(val: string) => handleInputChange('email', val)}
                />

                {/* Birthday */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-3">
                    <SelectField value={formData.day} onChange={(val: string) => handleInputChange('day', val)} range={31} />
                    <SelectField value={formData.month} onChange={(val: string) => handleInputChange('month', val)} range={12} />
                    <SelectField value={formData.year} onChange={(val: string) => handleInputChange('year', val)} startYear={2024} length={100} reverse />
                  </div>
                </div>
              </div>

              {/* Location Long Input */}
              <div className="mt-8">
                <CustomInput
                  label="Current Location"
                  icon={MapPin}
                  value={formData.location}
                  placeholder="City, Country"
                  onChange={(val: string) => handleInputChange('location', val)}
                />
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving || !isModified}
                  className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200/50 hover:bg-blue-700 hover:-translate-y-0.5 disabled:bg-slate-200 disabled:shadow-none disabled:translate-y-0 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    'Validate All & Update'
                  )}
                </button>

                {isModified && !isSaving && (
                  <button
                    onClick={handleCancel}
                    className="w-full md:w-auto px-8 py-4 bg-white text-slate-500 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    Cancel Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Last account activity: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

// Internal Components for Cleanliness
const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-white hover:text-blue-600'
    }`}>
    <Icon className="w-5 h-5 shrink-0" />
    <span className="font-bold text-sm tracking-wide">{label}</span>
  </div>
);

const CustomInput = ({ label, icon: Icon, value, error, placeholder, type = "text", onChange }: any) => (
  <div className="space-y-2 group">
    <label className="text-sm font-bold text-slate-700 ml-1 block">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl outline-none transition-all ${error ? 'border-rose-400 bg-rose-50/10' : 'border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:bg-white'
          }`}
      />
    </div>
    {error && <p className="text-xs font-bold text-rose-500 ml-2 animate-in fade-in duration-200">{error}</p>}
  </div>
);

const SelectField = ({ value, onChange, range, startYear, length, reverse }: any) => {
  let options: string[] = [];
  if (range) {
    options = Array.from({ length: range }, (_, i) => (i + 1).toString().padStart(2, '0'));
  } else if (startYear) {
    options = Array.from({ length }, (_, i) => (startYear - i).toString());
    if (!reverse) options.reverse();
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-semibold"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
};

export default Profile;