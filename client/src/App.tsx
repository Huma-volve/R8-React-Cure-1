import AppointmentPage from '@/pages/Appointmentpage/Appointmentpage';
import SearchDoctor from '@/pages/SearchPage/SearchDoctor';
import Favorite from '@/pages/Favorite/EmptyFavorite/EmptyFavorite';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';;
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/SearchDoctor" element={<SearchDoctor/>}/>
      <Route path="/Favorite" element={<Favorite/>}/>
      <Route path="/Appointment" element={<AppointmentPage/>}/>
    </Routes>
      <Footer />

    </>
      
  );
}

export default App;
