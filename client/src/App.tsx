
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
}

export default App
