import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import type { AppDispatch } from "@/store";
import { useEffect } from "react";
import { getChatList } from "../Redux-Store/ChatSlice/ChatSlice";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/Images/644acebb39b684127cacceef34d2234b0b1622c9.jpg";

export default function Chat() {
  const { chatList, allMessages, isLoadingList, isErrorList, msgUnread, search } = useSelector(
    (store: RootState) => store.ChatSlice
  );

  console.log("isDeleted", allMessages);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => { 
    dispatch(getChatList()); 
  }, [dispatch]);

  let filteredChat = chatList;

  if (msgUnread === "Unread") {
    filteredChat = chatList.filter(chat => {
      const messages = allMessages[chat.room_id] || [];
      return messages.some(msg => !msg.message_seen || msg.message_seen === 0);
    });
  } else if (msgUnread === "Favorite") {
    filteredChat = chatList.filter(chat => {
      const messages = allMessages[chat.room_id] || [];
      return messages.length === 0;
    });
  }

  if (search?.trim()) {
    filteredChat = filteredChat.filter(c =>
      c.doctor.doctor_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const formatChatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-us", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };



  type chatItem = {
      room_id : string | number ,
      doctor : {
         doctor_name : string
      }

  }

  const handleChatClick = (chat: chatItem) => {
    const url = `/chat/${chat.room_id}/${encodeURIComponent(chat.doctor.doctor_name)}/${encodeURIComponent(profileImage)}`;
    navigate(url);
  };

  return (
    <div className="h-100 bg-white flex flex-col mt-7 ">
      <div className="flex-1 overflow-y-auto p-2">
        {!isLoadingList && !isErrorList && filteredChat.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No chat found
          </div>
        ) : (
          filteredChat.map(chat => {
            const chatMessages = allMessages[chat.room_id] || [];
            const lastMessage = chatMessages.slice(-1)[0];

            console.log("chatMessages", chatMessages);
            
            return (
              <div
                key={chat.room_id}
                className="p-2 mb-2 rounded-lg bg-[#f5f6f7] hover:bg-gray-200 flex justify-between cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                <div className="flex gap-3">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img 
                      src={profileImage} 
                      className="w-full h-full object-cover" 
                      alt={chat.doctor.doctor_name} 
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-medium">{chat.doctor.doctor_name}</h6>
                    <p className="text-gray-500 text-sm truncate max-w-[180px]">
                      {lastMessage
                        ? lastMessage.is_deleted
                          ? <span className="italic">تم حذف الرساله</span>
                          : lastMessage.message_content
                        : "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  {chatMessages.length > 0 && lastMessage?.message_created_at ? (
                    <p className="text-xs text-green-600">
                      {formatChatTime(lastMessage.message_created_at)}
                    </p>
                  ) : ""}
                  
                  {chatMessages.length > 0 ? (
                    <>
                      {chatMessages.filter(msg => !msg.is_deleted).length >= 1 ? (
                        <span className="bg-green-600 text-white w-[21px] h-[21px] rounded-full flex items-center justify-center text-xs mx-auto mt-1">
                          {chatMessages.filter(msg => !msg.is_deleted).length}
                        </span>
                      ) : ""}
                    </>
                  ) : ""}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
