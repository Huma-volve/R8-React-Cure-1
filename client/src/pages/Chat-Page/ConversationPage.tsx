// import AttachFileIcon from "@mui/icons-material/AttachFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DoctorMessage from "./DoctorMessage";
import {cleareAllMessages, sendMessage, setAllMessage, setMessage } from "../Redux-Store/ChatSlice/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "@/store";

export default function ConversationPage() {
  const { id, name, img } = useParams();
  const chatId = id ? Number(id) : undefined;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [openClear, setOpenClear] = useState<boolean>(false);

  const imgDr = decodeURIComponent(img || "");
  const nameDr = decodeURIComponent(name || "");

  const dispatch = useDispatch<AppDispatch>();
  const msg = useSelector((state: RootState) => state.ChatSlice);

  const messages = msg.allMessages?.[id || ""] || [];

  console.log("chatchatchat" , messages);
  
  

  function sendTextMessage() {
  if (!msg.messageDr.trim() || !id) return;



  dispatch(
    setAllMessage({
      chatId: id,
      message: {
        message_content: msg.messageDr,
        message_type: "text",
        message_form: "user",
        chat_id: chatId,
        message_created_at: new Date().toISOString(),
      },
    })
  );


  dispatch(
    sendMessage({
      chat_id: chatId!,
      type: "text",
      content: msg.messageDr,
    })
  );

  // مسح input
  dispatch(setMessage(""));
}


  function sendImage(file: File) {
    if (!file || !id) return;

    dispatch(
      setAllMessage({
        chatId: id,
        message: { message_content: file.name, message_type: "image", chat_id: chatId },
      })
    );

    dispatch(
      sendMessage({
        chat_id: chatId!,
        type : "image" ,
        content : file ,
      })
    ).then((res)=>{
         return console.log("resalt" , res);
         
    }).catch((err)=>{
      return console.log("error" , err);
      
    });

    setSelectedFile(null);
  }

  return (
    <div className="md:w-[70%]  md:flex flex-col border rounded-r-lg border-gray-400 border-l-0">

      {/* Header */}
      <div className={msg.titlePage? "border relative border-x-0 p-2 border-t-0 border-gray-400 px-3 flex justify-between" : "p-2 px-3 flex justify-between"}>
        {imgDr && (
          <>
            <div className="flex gap-2 items-center">
              <img src={imgDr} className="w-[30px] h-[30px] rounded-full" alt="profileDr" />
              <h2 className="font-semibold">{nameDr}</h2>
            </div>
            <div className="flex gap-2 items-center">
              <VideocamIcon fontSize="small" sx={{ color: "blue", cursor: "pointer" }} />
              <CallIcon fontSize="small" sx={{ color: "blue", cursor: "pointer" }} />
              <div className="">
                <p onClick={()=> {
                  return <>
                   
                   {chatId ? dispatch(cleareAllMessages(chatId)) : ""}
                  
                  </>
                }} className={ openClear ? "absolute top-12 right-2 z-50 cursor-pointer bg-gray-700 text-gray-100 px-3 py-1 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200" : "hidden"}>Clear All Message</p>
              </div>
                <MoreVertIcon onClick={()=>  setOpenClear(prev => !prev) } fontSize="small" sx={{ cursor: "pointer" }} />
            </div>
          </>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {!imgDr ? (
          <div className="text-center h-100 w-100 m-auto flex justify-center items-center flex-col">
            <h2 className="capitalize font-bold text-2xl">Start Your Chat</h2>
            <p>Welcome! Start your conversation now.</p>
          </div>
        ) : (
          <DoctorMessage messages={messages} idDr={chatId} />
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 w-[85%] m-auto">
        <div className="flex-1 relative bg-[#f5f6f7] rounded-lg">
          <input
            type="text"
            value={msg.messageDr}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            placeholder="Message"
            className="w-full rounded-md p-2 pr-16 focus:outline-none"
          />
          <div className="absolute right-2 top-2 flex text-gray-600 gap-1 ">
            {/* <AttachFileIcon fontSize="small" /> */}
            <div>
              <CameraAltIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
                  fileInput?.click();
                }}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setSelectedFile(file); 
                  sendImage(file);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
            <KeyboardVoiceIcon />
          </div>
          <button
            disabled={!msg.messageDr.trim() && !selectedFile}
            onClick={sendTextMessage}
            className="cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 text-blue-600"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
