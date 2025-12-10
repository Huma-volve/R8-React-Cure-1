import PaymentPage from "./pages/PaymentPage";
import "./App.css";
import ContactUs from "./components/ContactUs";


export default function App() {
  return (
    <div className="app-shell">
      <PaymentPage />
      {/* <ContactUs/> */}
    </div>
  );
  return <PaymentPage />;
}
