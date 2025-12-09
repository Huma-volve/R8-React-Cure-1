import { Button} from "@mui/material"
// FormControl, InputLabel, MenuItem, Select 
import {  useState } from "react"
import { NavLink } from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { checkStatus } from "../Redux-Store/BokingSlice/BokingSlice";
import profileImage from '../../assets/Images/644acebb39b684127cacceef34d2234b0b1622c9.jpg';
import deteImage from '../../assets/Images/calendar-02.png';
import iconImage from '../../assets/Images/Icon.png';
import type { RootState } from "../Redux-Store/BokingStore/BokingStore";


interface Doctor {
  name : string ,
  job : string ,
  img : string ,
  address : string ,
  status: string 
  
}
export default function Booking() {

  

  const [allDr] = useState<Doctor[]>([

    { name: "Jennifer Miller", job: "Psychiatrist", img: "img", address: "129, El-Nasr Street, Cairo, Egypt" , status : "Canceled" },
    { name: "Jennifer Miller", job: "Psychiatrist", img: "img", address: "129, El-Nasr Street, Cairo, Egypt" , status : "Upcoming" },
    { name: "Jennifer Miller", job: "Psychiatrist", img: "img", address: "129, El-Nasr Street, Cairo, Egypt" , status : "Completed" }
  ])

  
 const value = useSelector((state : RootState ) => state );


  const dispatch = useDispatch()

  const filterStatus = ()=>{

    if ( value.bookingSlice.status === "all") {
      return allDr
    }else{
      return allDr.filter( dr => dr.status === value.bookingSlice.status );
    }
  }


   const settings  = {
    arrows : false  ,
    dots :false ,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  const dayas = [

    { day: "Fri", date: 11 },
    { day: "Sat", date: 12 },
    { day: "Sun", date: 13 },
    { day: "Mon", date: 14 },
    { day: "Tue", date: 15 },
    { day: "Wed", date: 16 },
    { day: "Thu", date: 17 },
    { day: "Fri", date: 18 }

  ]


  return <>
  
<div className="w-[100]">
     <div className="md:hidden w-100 m-auto  py-1.5">
        <h2 className="p-5 font-bold">My Booking</h2>
        <Slider    {...settings}>

          {dayas.map((item , idx)=>{
            return <div
                key={idx}
              >
                <div className="bg-gray-200 mx-1.5 rounded-[7px] p-1">
                  <h3 className=" text-center">{item.day}</h3>
                <h4 className=" text-center">{item.date}</h4>
                </div>
              </div>

          })}
      </Slider>
       </div>

    
    <div className="container p-4 m-auto">


      <div className="hidden sm:flex justify-between items-center p-1 ">

        {/* Left section */}
        <div className="Appointments flex flex-col">
          <h2 className=" p-3 text-2xl">Your appointments</h2>

          <nav className="nav py-1">
            <ul className="flex justify-between gap-1 items-center text-xm w-100">
              <li><NavLink onClick={()=>{dispatch(checkStatus("all"))}} className="p-2  rounded-[7px] text-gray-400" to={"all"}>All</NavLink></li>
              <li><NavLink onClick={()=>{dispatch(checkStatus("Upcoming"))}} className="p-2 rounded-[7px] text-gray-400" to={"Upcoming"}>Upcoming</NavLink></li>
              <li><NavLink onClick={()=>{dispatch(checkStatus("Completed"))}} className="p-2 rounded-[7px] text-gray-400" to={"Completed"}>Completed</NavLink></li>
              <li><NavLink onClick={()=>{dispatch(checkStatus("Canceled"))}} className="p-2 rounded-[7px] text-gray-400" to={"Canceled"}>Canceled</NavLink></li>
            </ul>
          </nav>
        </div>

  
        
        <select name="" id="demo-select-small-label" className=" border border-gray-400 p-2 rounded-[10px] w-[396px] ">
          <option value=""><h3 className="flex text-[#bbc1c7]"> <img src={deteImage} alt="" />Monday, July 21 - 11:00 Am</h3></option>
        </select>

      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-\[100\%\]">

        {filterStatus().map((dr, i) => (
          <div key={i} className=" p-3 border border-[#bbc1c7] rounded-2xl mt-2">

            <div className="deat flex justify-between border-b border-[#bbc1c7] pb-1 ">
              <h3 className="flex "><img src={deteImage} className=" mr-1" alt="" />Monday, July 21 - 11:00 Am</h3>
                <h3 className={ dr.status === "Upcoming" ? "text-[#145db8]" : dr.status === "Canceled" ? "text-red-500" : dr.status === "Completed" ? "text-green-500" : "" }>{dr.status}</h3>
            </div>

            <div className="flex items-center  p-1">
              <figure className="w-[43px] h-[41px] rounded-full flex items-center justify-center overflow-hidden">
                <img src={profileImage} className="w-\[100\%\] h-\[100\%\] object-cover" alt="" />
              </figure>

              <div className="ml-2">
                <h3>{dr.name}</h3>
                <h4 className="text-gray-500">{dr.job}</h4>
              </div>
            </div>

            <p className="px-1 py-2 text-gray-400 flex gap-1"><img src={iconImage} alt="" />{dr.address}</p>

            <div className="btns mt-1 grid grid-cols-2 gap-3 p-1">

              <Button sx={{
                 borderRadius : "8px" ,
                 color : "#145db8" ,
                  borderColor : "#145db8",
                  
                "&:focus" : {
                  outline : "none",
                  boxShadow : "none"
                },

                "&:hover" :{
                   borderColor : "#99a2ab" ,
                   color : "#99a2ab" ,
                   backgroundColor : "white",
                }

              }} variant="outlined">Cancel</Button>
              <Button sx={{
                borderRadius : "8px" ,
                "&:focus" : {
                  outline : "none" ,
                  boxShadow : "none"
                } ,
                backgroundColor : "#145db8" ,
                "&:hover" :{
                   boxShadow : "none"
                } ,
                // padding : "5px",
                boxShadow : "none" 
              }} variant="contained">Reschedule</Button>
            </div>

          </div>
        ))}

      </div>

    </div>
</div>
  
  
  </>


      
  
}
