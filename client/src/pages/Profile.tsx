import { useState } from 'react';
import { Camera, User, Lock, LogOut } from 'lucide-react';

const Profile = () => {
  
  const [fullName, setFullName] = useState('Seif Mohamed');
  const [phoneNumber, setPhoneNumber] = useState('+1 (123) 456-7890');
  const [email, setEmail] = useState('john.doe@example.com');
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('1990');
  const [location, setLocation] = useState('New York, USA');

 
  const userImage = 'src/assets/profileImage.jpg'; 
  const userName = 'Seif Mohamed';
  const userTitle = '129,El-Nasr Street, Cairo';

 
  const handleSaveChanges = () => {
    console.log('Saving changes:', { fullName, phoneNumber, email, day, month, year, location });
  
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto  rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-1/3 bg-gray-100 p-6 md:p-8 flex flex-col items-center ">

            <div className="relative mb-6">
              <img
                src={userImage}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                aria-label="Change Profile Picture"
              >
                <Camera className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

         
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{userName}</h2>
            <p className="text-sm text-gray-500 mb-8">{userTitle}</p>

          
            <ul className="w-full space-y-4">
              <li className="flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                <User className="w-5 h-5 text-blue-500" />
                <span className="text-sm md:text-base font-medium text-gray-700">Personal information</span>
              </li>
              <li className="flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                <Lock className="w-5 h-5 text-blue-500" />
                <span className="text-sm md:text-base font-medium text-gray-700">Password management</span>
              </li>
              <li className="flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-sm md:text-base font-medium text-gray-700">Logout</span>
              </li>
            </ul>
          </div>

          
          <div className="w-full lg:w-2/3 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

            {/* الحقول العلوية: Full Name & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                />
              </div>
            </div>

            {/* Email & Birthday */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Birthday</label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                        {(i + 1).toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                        {(i + 1).toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                  >
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={2024 - i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              />
            </div>

            {/* زر Save Changes */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="cursor-pointer w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;