import { Container, Box } from '@mui/material';
import './App.css';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
    <Box minHeight="100vh" display="flex" flexDirection="column">

        <Navbar />
        {/* content */}
        <Hero/>
      <Footer />
    </Box>
    </BrowserRouter>
  );
}

export default App;
