<<<<<<< HEAD
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
=======

import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { myStore } from './pages/Redux-Store/BokingStore/BokingStore'
import { Provider } from 'react-redux';
import Faqs from './pages/Faq-Page/Faq';
import Layout from './pages/LAYOUT/Layout';
import Chat from './pages/Chat-Page/Chat';
import Booking from './pages/Booking/Booking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

 const myRouter = createBrowserRouter([
  // صفحات مستقلة
  { path: "Booking", element: <Booking /> },
  { path: "Faqs", element: <Faqs /> },

  // Layout مع صفحات children
  {
    path: "chat",
    element: <Layout />,
    children: [
      { index: true, element: <Chat /> },       // الصفحة الافتراضية عند /chat
      { path: "allChat", element: <Chat /> },
      { path: "/chat/:id/:name/:img", element: <Chat /> }
    ]
  },

  // default route عند / يفتح Faqs
  { path: "/", element: <Faqs /> }
]);


const queryClient = new QueryClient()




  return (
    <>

    <QueryClientProvider client={queryClient}>
      <Provider store={myStore}>
         <RouterProvider router={myRouter}/>
      </Provider>
    </QueryClientProvider>



     
    </>
  )
>>>>>>> 880d3a01f445a2d2727c0a9d0498490bf1b41161
}

export default App
