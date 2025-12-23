import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import type { AppDispatch } from "@/store";
import { useEffect } from "react";
import { getChatList } from "../Redux-Store/ChatSlice/ChatSlice";
import { Link } from "react-router-dom";
import profileImage from "@/assets/Images/profileImage.jpg";

export default function Chat() {
  const { chatList, isLoadingList, isErrorList, msgUnread, search } = useSelector(
    (store: RootState) => store.ChatSlice
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  let filteredChat = chatList;

  // فلترة حسب الحالة
  if (msgUnread === "Unread") {
    filteredChat = chatList.filter((item) => item.messages.length >= 1);
  } else if (msgUnread === "Favorite") {
    filteredChat = chatList.filter((item) => item.messages.length === 0);
  }

  // فلترة البحث
  if (search?.trim()) {
    filteredChat = filteredChat.filter((c) =>
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

  return (
    <div className="h-100 bg-white flex flex-col">
      {/* ليست الشات */}
      <div className="flex-1 overflow-y-auto p-2">
        {!isLoadingList && !isErrorList && filteredChat.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No chat found
          </div>
        ) : (
          filteredChat.map((chat) => (
            <Link
              key={chat.room_id}
              to={`/chat/${chat.room_id}/${encodeURIComponent(
                chat.doctor.doctor_name
              )}/${encodeURIComponent(profileImage)}`}
            >
              <div className="p-2 mb-2 rounded-lg bg-[#f5f6f7] hover:bg-gray-200 flex justify-between">
                <div className="flex gap-3">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                      src={profileImage}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 className="text-sm">{chat.doctor.doctor_name}</h6>
                    <p className="text-gray-500 text-sm">
                      {chat.messages.map((msg) => msg.message_content.slice(0, 40))}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-600">{formatChatTime(chat.last_message_time)}</p>
                  {chat.messages.length >= 1 && (
                    <span className="bg-green-600 text-white w-[21px] h-[21px] rounded-full flex items-center justify-center text-xs mx-auto mt-1">
                      {chat.messages.length}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
