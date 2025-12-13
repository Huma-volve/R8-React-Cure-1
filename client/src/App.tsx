import { Route, Routes } from "react-router-dom"
import LogIn from "./auth/LogIn"
import SignUp from "./auth/SignUp"
import Verification from "./auth/Verification"
import PrivacyPolicy from "./pages/PrivacyPolicy"

function App() {
  return (
   <div>
    <Routes>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/verify" element={<Verification/>}/>
      <Route path="/privacy" element={<PrivacyPolicy/>}/>
    </Routes>
   </div>
  )
}

export default App
