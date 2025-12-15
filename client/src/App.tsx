import { Link, Navigate, Route, Routes } from "react-router-dom";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";
import ContactUs from "./components/ContactUs";
import DoctorsMap from "./components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";
import NotificationDropdown from "./components/NotificationDropdown";

export default function App() {
  return (
    <div className="min-h-screen">
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
          to="/doctor"
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
        <Route path="/doctor" element={<DoctorDetails />} />
        <Route path="*" element={<Navigate to="/map" replace />} />
      </Routes>
    </div>
  );
}
