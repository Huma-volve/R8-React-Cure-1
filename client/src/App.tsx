import PaymentPage from "./pages/PaymentPage";
import "./App.css";
import ContactUs from "./components/ContactUs";
import DoctorsMap from "./components/DoctorsMap";


export default function App() {
  return (
    <div className="app-shell">
      <PaymentPage />
      {/* <ContactUs/> */}
      <DoctorsMap/>
    </div>
  );

}
