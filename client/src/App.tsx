import Booking from '@/pages/Booking/Booking'
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from '@/pages/Appointmentpage/Homepage';
import LogIn from "./pages/auth/LogIn"
import SignUp from "./pages/auth/SignUp"
import Verification from "./pages/auth/Verification"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Profile from "./pages/Profile"
import PaymentPage from "./pages/PaymentPage";
import ContactUs from "./Components/ContactUs";
import DoctorsMap from "./Components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";
import AppointmentPage from '@/pages/Appointmentpage/Appointmentpage';
import SearchDoctor from '@/pages/SearchPage/SearchDoctor';
import Favorite from '@/pages/Favorite/EmptyFavorite/EmptyFavorite';
import Faqs from './pages/Faq-Page/Faq';
import Chat from './pages/Chat-Page/Chat';
import Layout from './pages/LAYOUT/Layout';


function App() {
  return (
    <>
      <Navbar />
      <main className="mt-35 lg:mt-30">
        <Routes>
          {/* Public Routes - لا تحتاج تسجيل دخول */}
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verification />} />

          {/* Protected Routes - تحتاج تسجيل دخول */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><DoctorsMap /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/doctor/:id" element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
          <Route path="/privacy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/SearchDoctor" element={<ProtectedRoute><SearchDoctor /></ProtectedRoute>} />
          <Route path="/Favorite" element={<ProtectedRoute><Favorite /></ProtectedRoute>} />
          <Route path="/doctors/:id" element={<ProtectedRoute><AppointmentPage /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Chat />} />
            <Route path="/chat/:id/:name/:img" element={<Chat />} />
          </Route>
          <Route path="/faq" element={<ProtectedRoute><Faqs /></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
