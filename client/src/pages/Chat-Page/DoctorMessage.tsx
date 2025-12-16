<<<<<<< HEAD


type message = {
  text : string
}

type props = {
  messages : message[]
}

export default function DoctorMessage({ messages } : props) {


  console.log("props" , messages);
  
=======
import { useSelector } from "react-redux"
import type { RootState } from "../Redux-Store/BokingStore/BokingStore"
import PatientMessage from "./PatientMessage";

export default function DoctorMessage() {

   const msg = useSelector((state: RootState) => state.ChatSlice) as {
  allMessage: { text: string }[];
};
>>>>>>> 8f21549

  return <>

      <div className="flex justify-end flex-col items-end">
<<<<<<< HEAD
         {messages.map((item, index) => (
      <p key={index} className="bg-[#145db8] text-white  p-2 rounded-lg rounded-bl-none w-fit mb-1 mr-auto">
        {item.text}
      </p>
    ))}

{/* <PatientMessage/> */}
=======
         {msg.allMessage.map((item, index) => (
  <p key={index} className="bg-[#145db8] text-white  p-2 rounded-lg rounded-bl-none w-fit mb-1 mr-auto">
    {item.text}
  </p>
))}

<PatientMessage/>
>>>>>>> 8f21549

    </div>


      </>
}
