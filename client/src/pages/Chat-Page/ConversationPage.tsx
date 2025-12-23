import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
<<<<<<< HEAD
=======
import DoctorMessage from './DoctorMessage';
import profileImage from '../../assets/Images/644acebb39b684127cacceef34d2234b0b1622c9.jpg';
import { setAllMessage, setMessage } from '../Redux-Store/ChatSlice/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Redux-Store/BokingStore/BokingStore';
import { useEffect } from 'react';
>>>>>>> 8f21549
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";

<<<<<<< HEAD
import DoctorMessage from './DoctorMessage';

import { setAllMessage, setMessage } from '../Redux-Store/ChatSlice/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Redux-Store/BokingStore/BokingStore';

import { useParams } from 'react-router-dom';

export default function ConversationPage() {

  const { id, name, img } = useParams();

  const imgDr = decodeURIComponent(img || "");
  const nameDr = decodeURIComponent(name || "");

  const dispatch = useDispatch();

  const msg = useSelector((state: RootState) => state.ChatSlice);


  const messages = msg.allMessages?.[id || ""] || [];

  function getDataInInput() {
    if (!msg.messageDr.trim() || !id) return;

    dispatch(
      setAllMessage({
        chatId: id,
        message: { text: msg.messageDr },
      })
    );

    dispatch(setMessage(""));
  }

  return (
    <div className="md:w-[70%] hidden md:flex flex-col border rounded-r-lg border-gray-400   border-l-0">

      {/* Header */}
      <div className="border border-x-0 p-2 border-t-0 border-gray-400 px-3 flex justify-between ">

         {imgDr ? <>
         
         <div className="flex gap-2 items-center ">
           <img
            src={ imgDr }
            className="w-[30px] h-[30px] rounded-full"
            alt="profileDr"
          /> 
          <h2 className="font-semibold">{nameDr}</h2>
        </div>

        <div className="flex gap-2 items-center">
          <VideocamIcon fontSize="small" sx={{ color: "blue" , cursor : "pointer" }} />
          <CallIcon fontSize="small" sx={{ color: "blue" , cursor : "pointer" }} />
          <MoreVertIcon fontSize="small" sx={{ cursor : "pointer" }} />
        </div>
         
         </> : ""}
        

      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">

        {!imgDr ? (
          <div className="m-auto text-center">
            <h2 className="capitalize font-bold text-2xl">Start Your Chat</h2>
            <p>Welcome! Start your conversation now.</p>
          </div>
        ) : (
          <DoctorMessage messages={messages} />
        )}

      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3">
        <div className="flex-1 relative bg-[#f5f6f7] rounded-lg">
          <input
            type="text"
            value={msg.messageDr}
            onChange={(e) => dispatch(setMessage(e.target.value))}
=======

// import PatientMessage from './PatientMessage';

// type Message  = {
//   text : string , 
// }
export default function ConversationPage() {
  

    // const [ allMessage, setAllMessage ] = useState<Message[]>([])
    // setMessage

    const dispatch = useDispatch()

   const msg = useSelector( (msg : RootState)=>{
      return msg.ChatSlice
    })

    //messageDr


    function getDataInInput() {
      
      if (!msg.messageDr.trim()) {
      console.log("ddddddddddddddd");
      
    }else{
      console.log("msg" , msg);
  
        dispatch(setAllMessage([...msg.allMessage, { text: msg.messageDr }]));
      

      dispatch(setMessage(""))
    }

    }


    useEffect(() => {
  console.log("Updated allMessage:", msg.allMessage);
}, [msg.allMessage]);
    
    


  return (

  <div className="md:w-[70%] hidden md:flex flex-col border rounded-r-lg border-gray-400 border-l-0">

      {/* Header */}
      <div className="border border-x-0 p-1 border-t-0 border-gray-400 px-3 flex justify-between">
        <div className="imgDr flex gap-2 items-center">
          <img src={profileImage} className='w-[25px] h-[25px] rounded-[50%]' alt="profileDr" />
          <h2 >mostafa hassan</h2>
        </div>

        <div className='flex gap-1'>
             <div >
               <VideocamIcon sx={{
                  color : "blue"
                }} fontSize='small'/>
             </div>
             <div >
                <CallIcon sx={{
                  color : "blue"
                }} fontSize='small'/>
             </div>
             <div >
                <MoreVertIcon fontSize='small'/>
             </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-3">


        

          {msg.allMessage.length === 0 ? <div className=' text-center h-100 w-100  m-auto flex justify-center items-center flex-col'>
          <h2 className='capitalize font-bold text-2xl'>Start Your Chat</h2>
          <p>Welcome! Start your conversation now.</p>
        </div> : <>

        {/* <PatientMessage /> */}
        <DoctorMessage />

        </>}
        
      </div>

      {/* Form */}
      <div className="flex items-center gap-2 p-3 ">
        <div className="flex-1 relative bg-[#f5f6f7] rounded-[7px]">
          <input
            type="text"
            value={msg.messageDr}
            onChange={(e)=>dispatch(setMessage(e.target.value))}
>>>>>>> 8f21549
            placeholder="Message"
            className="w-full rounded-md p-2 pr-16 focus:outline-none"
          />

          <div className="absolute right-2 top-2 flex text-gray-600 gap-1">
            <AttachFileIcon fontSize="small" />
            <CameraAltIcon fontSize="small" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
<<<<<<< HEAD
          <div className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
            <KeyboardVoiceIcon />
          </div>

          <button
            disabled={!msg.messageDr.trim()}
            onClick={getDataInInput}
            className="
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:text-gray-300
              text-blue-600
            "
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
=======
          <div  className="bg-blue-500 text-white p-2 rounded-[7px] cursor-pointer">
            <KeyboardVoiceIcon />
          </div>
          {msg.messageDr.length >= 1 ? <SendIcon onClick={getDataInInput}  className="cursor-pointer text-blue-600" /> : <button
            disabled={msg.messageDr.length < 1}
            onClick={getDataInInput}
      className="
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:text-gray-300
        text-blue-600
      "
    >
      <SendIcon />
    </button>
    }
          
        </div>
      </div>
    </div>


>>>>>>> 8f21549
  );
}
