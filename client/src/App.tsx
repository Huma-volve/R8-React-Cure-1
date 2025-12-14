import { Container, Box } from '@mui/material';
import './App.css';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import HomePage from './pages/Appointmentpage/Homepage';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
    <Box  display="flex" flexDirection="column">

        <Navbar />
        {/* content */}
        <HomePage/>
      <Footer />
    </Box>
    </BrowserRouter>
  );
}

export default App;
