// import { useState } from "react";

// function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="h-screen overflow-hidden">

//       {/* Drawer (fixed on the left) */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-20
//           transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="p-4 border-b font-medium">Drawer Menu</div>
//         <div className="p-4">This is the drawer content.</div>

//         {/* Close button inside drawer */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute top-4 right-4 text-gray-500"
//         >
//           Close
//         </button>
//       </div>

//       {/* PAGE CONTENT (this moves right when drawer opens) */}
//       <div
//         className={`
//           h-full bg-gray-100 transition-transform duration-300
//           ${isOpen ? "translate-x-64" : "translate-x-0"}
//         `}
//       >
//         <div className="p-4 flex justify-between items-center bg-white shadow">
//           <button
//             onClick={() => setIsOpen(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Open Drawer
//           </button>
//           <span className="text-lg font-medium">Main Content Area</span>
//         </div>

//         <div className="p-4">
//           <p>
//             All of this content shifts to the right by 256px (w-64) when the drawer opens.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

 function Test() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-blue-600 text-2xl font-bold">Cure</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search about specialty, doctor"
                className="w-96 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Bookings</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Chat</a>
            <button className="p-2">X</button>
            <button className="p-2">🔔</button>
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
          </nav>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto mt-6 gap-6 px-6">
        {/* Sidebar Filter */}
        <aside
          className={`bg-white border rounded-lg p-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden p-0'
          }`}
        >
          {isSidebarOpen && (
            <div>
              <h3 className="font-semibold mb-4">Available Date</h3>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Today</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Tomorrow</span>
                </label>
              </div>

              <h3 className="font-semibold mb-4">Gender</h3>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="rounded-full" defaultChecked />
                  <span className="bg-blue-600 text-white px-3 py-1 rounded">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="rounded-full" />
                  <span className="border px-3 py-1 rounded">Female</span>
                </label>
              </div>

              <h3 className="font-semibold mb-4">Consultation Type</h3>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>In-clinic</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Home Visit</span>
                </label>
              </div>

              <h3 className="font-semibold mb-4">Sort</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Most recommended</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Price Low to high</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Price High to low</span>
                </label>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filter</span>
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>

            <input
              type="text"
              placeholder="Search doctors"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              🗺️ Map
            </button>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Choose Specialties</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Dentist', 'Cardiologist', 'ENT', 'Neurologist', 'General Practitioner', 'Ophthalmologist', 'Pulmonologist'].map((specialty) => (
                <button
                  key={specialty}
                  className="px-4 py-2 border rounded-full whitespace-nowrap hover:bg-gray-50"
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className={`grid gap-6 mb-6 transition-all duration-300 ${
            isSidebarOpen ? 'grid-cols-3' : 'grid-cols-3'
          }`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Robert Johnson</h3>
                    <p className="text-sm text-gray-600">Orthopedic | El-Nasr Hospital</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <span>🕐</span>
                    <span>9:30am - 8:00pm</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">
                    Price<span className="text-xs">/hour</span>
                  </div>
                  <div className="text-red-500 font-semibold">$350</div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Book appointment
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
              Previous page
            </button>
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
              Next Page
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Test;