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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
