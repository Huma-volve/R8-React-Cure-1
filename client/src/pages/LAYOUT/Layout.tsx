import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBarChat from "../Chat-Page/NavBarChat";
import Search from "../Chat-Page/Search";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import { setTitlePage } from "../Redux-Store/ChatSlice/ChatSlice";
import { useEffect, useState } from "react";
import ConversationPage from "../Chat-Page/ConversationPage";
import { useMediaQuery } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Layout() {
  const myStore = useSelector((store: RootState) => {
    return store.ChatSlice;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // كشف حجم الشاشة
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const isInConversation = location.pathname !== '/chat';

  const [setShowChat] = useState(false);

  useEffect(() => {
    if (myStore.msgUnread === "All") {
      dispatch(setTitlePage("chat"));
    } else if(myStore.msgUnread === "Unread") {
      dispatch(setTitlePage("Unread"));
    } else {
      dispatch(setTitlePage("Favorite"));
    }
  }, [myStore.msgUnread, dispatch]);

  return (
    <div className="p-5 pt-14 ">
      <div className="md:flex p-2  w-full ">
        {/* قائمة المحادثات */}
        <div 
          className={`
            ${isMobile && isInConversation ? 'hidden' : 'block'} 
            md:w-[30%] md:border border-gray-400 rounded-l-2xl p-2 pt-0  
            ${isMobile ? 'w-full' : ''}
          `}
        >
          {isMobile && isInConversation && (
            <button 
              onClick={() => navigate('/chat')}
              className="flex items-center gap-2 mb-3 text-blue-600 hover:text-blue-800"
            >
              <ArrowBackIcon />
              Back to chats
            </button>
          )}
          
          <h2 className="p-2 border-gray-400 italic font-bold text-2xl border-b pl-1 ">
            {myStore.titlePage}
          </h2>
          <Search />
          <NavBarChat />
          <div className="md:block">
            <Outlet context={{ setShowChat, navigate }} />
          </div>
        </div>
        
        {/* نافذة المحادثة */}
        <div className={`
          ${isMobile && !isInConversation ? 'hidden' : 'block'} 
          ${isMobile ? 'w-full' : 'md:w-full '}
        `}>
          {(isMobile && isInConversation) || !isMobile ? (
            <ConversationPage />
          ) : null}
        </div>
      </div>
    </div>
  );
}
