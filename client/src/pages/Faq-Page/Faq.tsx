
import { useState } from "react"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function Faqs() {

  const [ openAnswer , setOpenAnswer ] = useState<number | null >(null)

  
const [faqList] = useState([
  {
    id: 1,
    question: "What is this app used for?",
    answer:
      "This app is designed to help users manage their bookings, appointments, and schedules easily in one place.",
  },
  {
    id: 2,
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment by selecting the desired service, choosing an available date and time, and confirming your booking.",
  },
  {
    id: 3,
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes, you can cancel or reschedule your appointment from the bookings section before the appointment time.",
  },
  {
    id: 4,
    question: "Do I need to create an account to use the app?",
    answer:
      "Yes, creating an account allows you to track your appointments, receive notifications, and manage your profile.",
  },
  {
    id: 5,
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use secure technologies to protect your personal data and ensure your privacy at all times.",
  },
]);




  
  

  return <>
   <div className=" absolute top-[20px] "> <ArrowBackIosNewIcon className="text-4xl cursor-pointer" /> </div>
  
  <div className="allContent p-1.5 m-auto flex justify-center items-center flex-col">
    <h1 className=" font-bold text-3xl p-1.5 text-center">FAQS</h1>
   
   <div className=" w-100 md:w-[50%]  gap-5 p-2 py-5">

  {faqList.map((lest , idx)=>{

    return <div key={idx} className="lestFaaq mb-1.5 bg-[#f5f6f7] rounded-[10px] pt-1 ">


      <div className="question flex justify-between items-center p-2 text-2xl">
        <span>{lest.question}</span>
        { openAnswer === lest.id 
          ? <button className="cursor-pointer" onClick={() => setOpenAnswer(null)}><RemoveIcon /></button> 
          : <button className="cursor-pointer" onClick={() => setOpenAnswer(lest.id)}><AddIcon /></button>
        }
      </div>

      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out  border-t p-2 ${
        openAnswer === lest.id ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0 " }`}>
          
          {openAnswer === lest.id && (
            <p className="overflow-hidden transition-all duration-300">
              {lest.answer}
            </p>
          )}
          
       </div>
       

    </div>
  })}

   </div>
  </div>

  </>
    
  
}




