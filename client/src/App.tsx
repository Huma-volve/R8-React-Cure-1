
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Booking from './pages/Booking/Booking'
import { myStore } from './pages/Redux-Store/BokingStore/BokingStore'
import { Provider } from 'react-redux';
// import Faqs from './pages/Faq-Page/Faq';

function App() {

  return (
    <>
    <BrowserRouter>
      <Provider store={myStore}>
         <Booking/>
         {/* <Faqs /> */}
      </Provider>
    </BrowserRouter>
     
    </>
  )
}

export default App
