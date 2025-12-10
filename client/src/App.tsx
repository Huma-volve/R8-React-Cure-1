import { Link, Navigate, Route, Routes } from "react-router-dom";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";
import ContactUs from "./components/ContactUs";
import DoctorsMap from "./components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";

export default function App() {
  return (
    <div className="app-shell">
      <div className="temp-nav">
        <Link to="/map">Map</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/doctor">Doctor</Link>
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
