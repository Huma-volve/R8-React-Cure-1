import { useState } from "react"
import { useDispatch} from "react-redux"
import { checkMesage } from '../Redux-Store/ChatSlice/ChatSlice';
// import CloseIcon from '@mui/icons-material/Close';
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


export default function NavBarChat() {



    const dispatch =  useDispatch()

    const [isActive , setIsActive] = useState("All")

    

  return <>
  
   <div className="links ">
    {["All" , "Unread" , "Favorite"].map((status)=>{
        return  <button onClick={()=> {setIsActive(status) ; dispatch(checkMesage(status))}} className={`p-2 m-1  px-3  rounded-[7px] cursor-pointer ${
            isActive == status ? "bg-blue-700 text-white" : "bg-[#f5f6f7]"
        }`}>
              {status}
        </button>

    })}


   </div>
  
  </>
}
