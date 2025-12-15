import { Link, Navigate, Route, Routes } from "react-router-dom";
import PaymentPage from "./pages/PaymentPage";
import ContactUs from "./components/ContactUs";
import DoctorsMap from "./components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";
import NotificationDropdown from "./components/NotificationDropdown";

export default function App() {
  return (
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
