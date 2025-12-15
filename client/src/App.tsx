import { Container, Box } from '@mui/material';
import './App.css';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import HomePage from './pages/Appointmentpage/Homepage';
import { BrowserRouter } from 'react-router';
import { Route, Routes } from "react-router-dom"
import LogIn from "./auth/LogIn"
import SignUp from "./auth/SignUp"
import Verification from "./auth/Verification"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Profile from "./pages/Profile"
import PaymentPage from "./pages/PaymentPage";
import ContactUs from "./components/ContactUs";
import DoctorsMap from "./components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";

function App() {
  return (
        <Navbar />
    <Routes>       
      <Route path="/map" element={<DoctorsMap />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/doctor" element={<DoctorDetails />} />
      <Route path="*" element={<Navigate to="/map" replace />} />
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/verify" element={<Verification/>}/>
      <Route path="/privacy" element={<PrivacyPolicy/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
        <HomePage/>
      <Footer />
  );
}

export default App;
