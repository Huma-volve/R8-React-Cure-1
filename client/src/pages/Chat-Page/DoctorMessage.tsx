import { useEffect, useRef } from "react";
import { deleteMessage, fetchChatMessages, type Message } from "../Redux-Store/ChatSlice/ChatSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux-Store/BokingStore/BokingStore";  
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';


type Props = {
  messages: Message[];
  idDr?: number;
};

export default function DoctorMessage({ messages, idDr }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log("iddr" , idDr);

  // Scroll to bottom on messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages if empty
  useEffect(() => {
    if (!idDr) return;
    if (messages.length > 0) return;
    dispatch(fetchChatMessages(Number(idDr)));

    
  }, [ idDr, dispatch, messages.length ]);

  const formatChatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!Array.isArray(messages)) return <div>Loading...</div>;

  
    


  return (
    <div ref={scrollRef} className="flex flex-col gap-2 h-100 overflow-auto">
      {messages
        .slice() 
        .sort((a, b) => new Date(b.message_created_at || "").getTime() - new Date(a.message_created_at || "").getTime()) // latest on top
        .map((msg, i) => {
          const isDoctor = msg.message_form === "doctor";

          return (
            <div key={i} className={isDoctor ? "flex justify-end" : "flex justify-start"}>
              {msg.message_type === "image" ? (
                msg.is_deleted ? (
                  <div className="p-2 bg-gray-300 rounded-lg text-gray-600">تم حذف الرساله</div>
                ) : (
                  <img src={msg.message_content} className="w-40 rounded-lg" />
                )
              ) : (
                <div className="relative group max-w-[80%]">
                  <div
                    className={
                      isDoctor
                        ? "flex items-center bg-blue-600 break-words text-white p-2 rounded-lg gap-2"
                        : "flex items-center bg-gray-400 break-words gap-2 text-white p-2 rounded-lg"
                    }
                  >
                    <p>{msg.is_deleted ? "تم حذف الرساله" : msg.message_content}</p>
                    <p className="text-sm text-[#E5E7EB]">
                      {msg.message_created_at && formatChatTime(msg.message_created_at)}
                    </p>

                    {msg.message_seen ? <DoneAllIcon sx={{
                      color : "blue"
                    }}/>  : <DoneAllIcon sx={{
                      color : "#eee"
                    }}/> }</div>

                  {!msg.is_deleted && (
                    <DeleteIcon
                    onClick={() => {
                      console.log("Trying to delete:", msg.message_id, msg);
                      if ( msg.message_id != null ) {
                        dispatch(deleteMessage(msg.message_id));
                      }
                    }}

                    

                      className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-200"
                      sx={{ color: "#B91C1C", cursor: "pointer" }}
                    />
                  )}


                </div>
              )}

            </div>
          );
        })}

        {/* {unreadMessages.map()} */}
    </div>
  );
}
