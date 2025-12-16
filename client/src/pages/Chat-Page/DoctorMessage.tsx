

type message = {
  text : string
}

type props = {
  messages : message[]
}

export default function DoctorMessage({ messages } : props) {


  console.log("props" , messages);
  

  return <>

      <div className="flex justify-end flex-col items-end">
         {messages.map((item, index) => (
      <p key={index} className="bg-[#145db8] text-white  p-2 rounded-lg rounded-bl-none w-fit mb-1 mr-auto">
        {item.text}
      </p>
    ))}

{/* <PatientMessage/> */}

    </div>


      </>
}
