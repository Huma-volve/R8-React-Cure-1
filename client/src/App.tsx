
// import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import { myStore } from './pages/Redux-Store/BokingStore/BokingStore'
// import { Provider } from 'react-redux';
import Faqs from './pages/Faq-Page/Faq';
// import Layout from './pages/LAYOUT/Layout';
import Chat from './pages/Chat-Page/Chat';
import Booking from './pages/Booking/Booking';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {  Navigate, Route, Routes } from "react-router-dom";
// import { Container, Box } from '@mui/material';
import './App.css';
// import Navbar from './Components/NavBar';
// import Footer from './Components/Footer';
// import HomePage from './pages/Appointmentpage/Homepage';
// import { BrowserRouter } from 'react-router';
// import { Route, Routes } from "react-router-dom"
// import LogIn from "./auth/LogIn"
// import SignUp from "./auth/SignUp"
// import Verification from "./auth/Verification"
// import PrivacyPolicy from "./pages/PrivacyPolicy"
// import Profile from "./pages/Profile"
import PaymentPage from "./pages/PaymentPage";
import ContactUs from "./Components/ContactUs";
import DoctorsMap from "./Components/DoctorsMap";
import DoctorDetails from "./pages/DoctorDetails";
// import NotificationDropdown from "./components/NotificationDropdown";



export default function App() {
  return (
      <Routes>
        
        <Route path="/Booking" element={<Booking />} />
        <Route path="/faq" element={<Faqs />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/map" element={<DoctorsMap />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/doctor" element={<DoctorDetails />} />
        <Route path="*" element={<Navigate to="/map" replace />} />
      </Routes>
   
  );
}



