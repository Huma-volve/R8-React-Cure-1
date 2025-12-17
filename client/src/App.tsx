import AppointmentPage from "@/pages/Appointmentpage/Appointmentpage";
import SearchDoctor from "@/pages/SearchPage/SearchDoctor";
import Favorite from "@/pages/Favorite/EmptyFavorite/EmptyFavorite";

// import Faqs from './pages/Faq-Page/Faq';
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "@/pages/Appointmentpage/Homepage";
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import Verification from "./auth/Verification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import PaymentPage from "@/pages/PaymentPage";
import ContactUs from "@/Components/ContactUs.tsx";
//import DoctorsMap from "@/Components/DoctorsMap.tsx";
import DoctorDetails from "@/pages/DoctorDetails";
import Booking from "@/pages/Booking/Booking";
import Chat from "@/pages/Chat-Page/Chat";
import Faq from "@/pages/Faq-Page/Faq";

function App() {
  return (
    <>
      <Navbar />
      <main className="mt-35 lg:mt-30">
      <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/doctor" element={<DoctorDetails />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/SearchDoctor" element={<SearchDoctor />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/Appointment" element={<AppointmentPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      </main>


      <Footer />
    </>
  );
}

export default App;
