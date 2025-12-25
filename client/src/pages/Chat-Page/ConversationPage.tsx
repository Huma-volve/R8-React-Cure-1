import { useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DoctorMessage from "./DoctorMessage";
import { cleareAllMessages, markAllMessagesRead, sendMessage, setAllMessage, setMessage } from "../Redux-Store/ChatSlice/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "@/store";
import { useMediaQuery } from "@mui/material";

export default function ConversationPage() {
  const { id, name, img } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const chatId = id ? Number(id) : undefined;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openClear, setOpenClear] = useState<boolean>(false);

  const imgDr = decodeURIComponent(img || "");
  const nameDr = decodeURIComponent(name || "");

  const dispatch = useDispatch<AppDispatch>();
  const msg = useSelector((state: RootState) => state.ChatSlice);

  const messages = msg.allMessages?.[id || ""] || [];

  console.log("chatchatchat", messages);


  useEffect(()=>{
    if (!chatId) return
       dispatch(markAllMessagesRead(Number(chatId)))
  } , [chatId , dispatch])

  function sendTextMessage() {
    if (!msg.messageDr.trim() || !id) return;

    dispatch(
      sendMessage({
        chat_id: chatId!,
        type: "text",
        content: msg.messageDr,
      })
    );

    dispatch(setMessage(""));
  }

  function sendImage(file: File) {
    if (!file || !id) return;

    dispatch(
      setAllMessage({
        chatId: id,
        message: { 
          message_content: file.name, 
          message_type: "image", 
          chat_id: chatId 
        },
      })
    );

    dispatch(
      sendMessage({
        chat_id: chatId!,
        type: "image",
        content: file,
      })
    ).then((res) => {
      console.log("result", res);
    }).catch((err) => {
      console.log("error", err);
    });

    setSelectedFile(null);
  }

  // إذا لم يكن هناك محادثة محددة، اعرض شاشة البدء
  if (!imgDr) {
    return (
      <div className="md:w-[70%] md:flex flex-col border rounded-r-lg border-gray-400 border-l-0 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="capitalize font-bold text-2xl mb-2">Start Your Chat</h2>
          <p className="text-gray-600">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-full md:flex flex-col border rounded-r-lg border-gray-400 border-l-0 h-full ">
      {/* Header */}
      <div className={`${msg.titlePage ? "border relative border-x-0 p-2 border-t-0 border-gray-400 px-3 flex justify-between items-center" : "p-2 px-3 flex justify-between items-center"}`}>
        <div className="flex gap-2 items-center">
          {isMobile && (
            <ArrowBackIcon 
              onClick={() => navigate('/chat')}
              sx={{ cursor: 'pointer', mr: 1 }}
              className="text-gray-600 hover:text-gray-800"
            />
          )}
          <img src={imgDr} className="w-7.5 h-7.5 rounded-full" alt="profileDr" />
          <h2 className="font-semibold">{nameDr}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <VideocamIcon fontSize="small" sx={{ color: "blue", cursor: "pointer" }} />
          <CallIcon fontSize="small" sx={{ color: "blue", cursor: "pointer" }} />
          <div className="relative">
            <p 
              onClick={() => {
                if (chatId) dispatch(cleareAllMessages(chatId));
                setOpenClear(false);
              }} 
              className={`${openClear ? "absolute top-8 right-0 z-50 cursor-pointer bg-gray-700 text-gray-100 px-3 py-1 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 whitespace-nowrap" : "hidden"}`}
            >
              Clear All Messages
            </p>
          </div>
          <MoreVertIcon 
            onClick={() => setOpenClear(prev => !prev)} 
            fontSize="small" 
            sx={{ cursor: "pointer" }} 
          />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 h-[calc(100vh-200px)]">
        <DoctorMessage messages={messages} idDr={chatId} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 w-[85%] m-auto">
        <div className="flex-1 relative bg-[#f5f6f7] rounded-lg">
          <input
            type="text"
            value={msg.messageDr}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            placeholder="Message"
            className="w-full rounded-md p-2 pr-16 focus:outline-none bg-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendTextMessage();
              }
            }}
          />
          <div className="absolute right-2 top-2 flex text-gray-600 gap-1">
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

        <div className="flex items-center gap-1.5">
          <div className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600">
            <KeyboardVoiceIcon />
          </div>
          <button
            disabled={!msg.messageDr.trim() && !selectedFile}
            onClick={sendTextMessage}
            className="cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 text-blue-600 hover:text-blue-800"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
