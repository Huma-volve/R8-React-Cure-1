import { Link, Navigate, Route, Routes } from "react-router-dom";

import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import HomePage from './pages/Appointmentpage/Homepage';
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import Verification from "./auth/Verification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
import ContactUs from "./Components/ContactUs";
import DoctorsMap from "./Components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";
import NotificationDropdown from "./Components/NotificationDropdown";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex gap-3 py-3 px-4 bg-[#1f2937] items-center justify-between">
        <div className="flex gap-3">
          <Link
            to="/map"
            className="text-[#e5e7eb] no-underline font-semibold py-1.5 px-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.08)]"
          >
            Map
          </Link>
          <Link
            to="/payment"
            className="text-[#e5e7eb] no-underline font-semibold py-1.5 px-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.08)]"
          >
            Payment
          </Link>
          <Link
            to="/contact"
            className="text-[#e5e7eb] no-underline font-semibold py-1.5 px-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.08)]"
          >
            Contact
          </Link>
          <Link
            to="/doctor/1"
            className="text-[#e5e7eb] no-underline font-semibold py-1.5 px-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.08)]"
          >
            Doctor
          </Link>
        </div>
        <NotificationDropdown />
      </div>

      <Routes>
        <Route path="/map" element={<DoctorsMap />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/map" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
