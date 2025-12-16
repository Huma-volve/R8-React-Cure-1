import { Outlet } from "react-router-dom";
import NavBarChat from "../Chat-Page/NavBarChat";
import Search from "../Chat-Page/Search";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";
import { setTitlePage } from "../Redux-Store/ChatSlice/ChatSlice";
import { useEffect } from "react";
import ConversationPage from "../Chat-Page/ConversationPage";
// import logo from "../../assets/Images/BsHeartPulse.png"
// import CloseIcon from '@mui/icons-material/Close';

export default function Layout() {

 const myStore =  useSelector((store : RootState )=>{
    return store.ChatSlice
  })

 const dispatch =  useDispatch()



useEffect(() => {
  if (myStore.msgUnread === "All") {
    dispatch(setTitlePage("chat"));
  } else if(myStore.msgUnread === "Unread") {
    dispatch(setTitlePage("Unread"));
  } else {
    dispatch(setTitlePage("Favorite"));
  }
}, [myStore.msgUnread, dispatch]);




  return <>
   
   <div className="h-screen ">
     
        
         
        <div className="md:flex p-2">

          <div className="  md:w-100 md:border border-gray-400 rounded-l-2xl p-2 pt-1">
         <h2 className="p-2 border border-l-0 border-t-0 border-gray-400 italic font-bold border-r-0 text-2xl border-b-0 pl-1">{myStore.titlePage}</h2>
          <Search/>
          <NavBarChat/> 
          <Outlet/>
        </div>
          <ConversationPage />
        </div>    
       </div>
   
  </>
}
