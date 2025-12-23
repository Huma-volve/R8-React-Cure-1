import { Button } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";

// import { useDispatch, useSelector } from "react-redux";
// import { checkStatus } from "../Redux-Store/BokingSlice/BokingSlice";
import profileImage from '@/assets/images/d1.jpg';
import deteImage from '@/assets/images/calendar-02.png';
import iconImage from "@/assets/images/Icon.png";
// import type { RootState } from "../Redux-Store/BokingStore/BokingStore";


interface Doctor {
  name: string;
  job: string;
  address: string;
  status: string;
}

export default function Booking() {
  // بيانات ستاتيك
  const [allDr] = useState<Doctor[]>([
    { name: "Jennifer Miller", job: "Psychiatrist", address: "129, El-Nasr Street, Cairo, Egypt", status: "Canceled" },
    { name: "Jennifer Miller", job: "Psychiatrist", address: "129, El-Nasr Street, Cairo, Egypt", status: "Upcoming" },
    { name: "Jennifer Miller", job: "Psychiatrist", address: "129, El-Nasr Street, Cairo, Egypt", status: "Completed" }
  ]);

  // فلترة بدون Redux
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredDoctors = allDr.filter(dr => {
    if (statusFilter === "all") return true;
    return dr.status === statusFilter;
  });

  // Slider settings
  const settings = {
    arrows: false,
    dots: false,
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
  ];

  return (
    <div className="w-full">
      {/* Slider for mobile */}
      <div className="md:hidden w-full m-auto py-1.5">
        <h2 className="p-5 font-bold">My Booking</h2>
        <Slider {...settings}>
          {dayas.map((item, idx) => (
            <div key={idx}>
              <div className="bg-gray-200 mx-1.5 rounded-[7px] p-1">
                <h3 className="text-center">{item.day}</h3>
                <h4 className="text-center">{item.date}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Main section */}
      <div className="container p-4 m-auto">
        {/* Filters */}
        <div className="hidden sm:flex justify-between items-center p-1">
          <div className="Appointments flex flex-col">
            <h2 className="p-3 text-2xl">Your appointments</h2>
            <div className="flex gap-2">
              {["all", "Upcoming", "Completed", "Canceled"].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`p-2 rounded-[7px] cursor-pointer ${statusFilter === st ? "bg-blue-500 text-white" : "text-gray-400"}`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <select className="border border-gray-400 p-2 rounded-[10px] w-[396px]">
            <option value="">
              Monday, July 21 - 11:00 AM
            </option>
          </select>
        </div>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
          {filteredDoctors.map((dr, i) => (
            <div key={i} className="p-3 border border-[#bbc1c7] rounded-2xl mt-2">
              <div className="deat flex justify-between border-b border-[#bbc1c7] pb-1">
                <h3 className="flex"><img src={deteImage} className="mr-1" alt="" />Monday, July 21 - 11:00 AM</h3>
                <h3 className={
                  dr.status === "Upcoming" ? "text-[#145db8]" :
                  dr.status === "Canceled" ? "text-red-500" :
                  dr.status === "Completed" ? "text-green-500" : ""
                }>{dr.status}</h3>
              </div>

              <div className="flex items-center p-1">
                <figure className="w-[43px] h-[41px] rounded-full flex items-center justify-center overflow-hidden">
                  <img src={profileImage} className="w-full h-full object-cover" alt="" />
                </figure>
                <div className="ml-2">
                  <h3>{dr.name}</h3>
                  <h4 className="text-gray-500">{dr.job}</h4>
                </div>
              </div>

              <p className="px-1 py-2 text-gray-400 flex gap-1">
                <img src={iconImage} alt="" />
                {dr.address}
              </p>

              <div className="btns mt-1 grid grid-cols-2 gap-3 p-1">
                <Button
                  sx={{
                    borderRadius: "8px",
                    color: "#145db8",
                    borderColor: "#145db8",
                    "&:hover": { borderColor: "#99a2ab", color: "#99a2ab", backgroundColor: "white" }
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#145db8",
                    "&:hover": { boxShadow: "none" },
                  }}
                  variant="contained"
                >
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
