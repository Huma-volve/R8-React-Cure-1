import {  useSelector } from "react-redux";
import type {  RootState } from "../Redux-Store/BokingStore/BokingStore";
// import { useEffect } from "react";
// import { getChatList } from "../Redux-Store/ChatSlice/ChatSlice";
import profileImage from "../../assets/Images/644acebb39b684127cacceef34d2234b0b1622c9.jpg";

export default function Chat() {

  const {  msgUnread , search } = useSelector((store: RootState) => store.ChatSlice);


  // const dispatch = useDispatch<AppDispatch>()

  // useEffect(()=>{
  //   dispatch(getChatList())
  // } , [])

  // console.log("datafadadafata" , chatList);
  
  const chatList = [
     { id: 1, name: "Mostafa", message: "Hello doctor", time: "3:56", unread: 2, img: profileImage },
    { id: 2, name: "Ahmed", message: "Thanks 🙏", time: "2:40", unread: 0, img: profileImage },
    { id: 3, name: "Ali", message: "How are you?", time: "1:20", unread: 1, img: profileImage },
  ];



 let filteredChat = chatList;


if (msgUnread === "Unread") {
  filteredChat = chatList.filter((item) => {
    return item.unread >= 1
  })
}else if(msgUnread === "Favorite"){
  filteredChat = chatList.filter((item=>{
    return item.unread === 0
  }))
}else {
  filteredChat = chatList
}





// فلترة البحث
if (search?.trim()) {
  filteredChat = filteredChat.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
}

  return (
    /* الشاشة كلها */
    <div className="h-100 bg-white flex flex-col">

      {/* ليست الشات */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredChat.length ? (
          filteredChat.map((chat) => (
            <div
              key={chat.id}
              className="p-2 mb-2 rounded-lg  bg-[#f5f6f7] flex justify-between"
            >
              <div className="flex gap-3">
                <div className="w-[50px]  h-[50px] rounded-full overflow-hidden">
                  <img
                    src={chat.img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <h4>{chat.name}</h4>
                  <p className="text-gray-500 text-sm">{chat.message}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">{chat.time}</p>

                {chat.unread > 0 && (
                  <span className="bg-green-600 text-white w-[24px] h-[24px] rounded-full flex items-center justify-center text-xs mx-auto mt-1">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No chat found
          </div>
        )}
      </div> 
    </div>
  );
}
