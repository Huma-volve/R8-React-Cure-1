import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux-Store/BokingStore/BokingStore";
import { cancelAppointment, checkStatus, fetchBookings } from "../Redux-Store/BokingSlice/BokingSlice";
import type { Booking } from "../Redux-Store/BokingSlice/BokingSlice";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

import { Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import profileImage from "../../assets/Images/644acebb39b684127cacceef34d2234b0b1622c9.jpg";
import iconImage from "../../assets/Images/Icon.png";

import Loading from "../Loding";
import ErrorPage from "../ERROR-PAGE/ErrorPage";
// import { useNavigate } from "react-router-dom";

export default function Booking() {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // For modal confirmation
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  const { status, allData, isLoading, isError } = useSelector(
    (state: RootState) => state.bookingSlice
  );

  const STATUS_LIST = ["all", "Upcoming", "Completed", "cancelled"];

  useEffect(() => {
    if (!allData.length) {
      dispatch(fetchBookings(status));
    }
  }, [dispatch, status, allData.length]);

  const filteredData = allData.filter((dr) => {
    if (status === "all") return true;
    if (status === "Upcoming") {
      return dr.status === "Upcoming" || dr.status === "pending_payment";
    }
    return dr.status === status.toLowerCase();
  });

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  const handleOpenConfirm = (id: number) => {
    setSelectedBookingId(id);
    setOpenConfirm(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBookingId) {
      dispatch(cancelAppointment(selectedBookingId));
    }
    setOpenConfirm(false);
  };

  const handleCloseConfirm = () => setOpenConfirm(false);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full p-4">
      {/* Slider Mobile */}
      <div className="sm:hidden w-full m-auto py-1.5">
        <h2 className="p-5 font-bold">My Booking</h2>
       <Slider {...sliderSettings}>
            {filteredData.slice(0, 7).map((item) => {
              const day = item.date.split("-")[2]; // يفصل yyyy-mm-dd ويجيب اليوم
              return (
                <div key={item.id}>
                  <div className="bg-gray-200 mx-1.5 rounded-[7px] p-1">
                    <h3 className="text-center">{day}</h3>
                    <h4 className="text-center">{item.time}</h4>
                  </div>
                </div>
              );
            })}
          </Slider>

      </div>

      {/* Header + Tabs */}
      <div className="hidden sm:flex justify-between items-center mb-6">
        <div>
          <h2 className="p-3 text-2xl">Your appointments</h2>
          <Tabs
            value={status}
            onChange={(_, newValue) => dispatch(checkStatus(newValue))}
            sx={{
              minHeight: "48px",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                color: "text.primary",
              },
              "& .MuiTab-root.Mui-selected": {
                backgroundColor: "primary.main",
                color: "#fff !important",
                borderRadius: "8px",
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {STATUS_LIST.map((st) => (
              <Tab key={st} label={st} value={st} />
            ))}
          </Tabs>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{ textField: { helperText: "" } }}
          />
        </LocalizationProvider>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((dr) => {
            const canCancel = (dr: Booking) => {
              const appointmentDateTime = new Date(`${dr.date}T${dr.time}`);
              return dr.can_cancel && new Date() > appointmentDateTime;
            };

            return (
              <div key={dr.id} className="p-3 border border-[#bbc1c7] rounded-2xl">
                <div className="flex justify-between border-b border-[#bbc1c7] pb-1">
                  <h3 className="flex gap-1 items-center">
                    <EventNoteIcon />
                    {dr.date} {dr.time}
                  </h3>

                  <span
                    onClick={() => {
                      if (dr.status != "cancelled") {
                        handleOpenConfirm(dr.id);
                      }
                    }}
                    className={
                      dr.status === "Upcoming" || dr.status === "pending_payment"
                        ? "text-[#145db8] cursor-pointer"
                        : dr.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-500 cursor-pointer"
                    }
                  >
                    {dr.status === "pending_payment" ? "Upcoming" : dr.status}
                  </span>
                </div>

                <div className="flex items-center p-1">
                  <img
                    src={profileImage}
                    className="w-10.75 h-10.25 rounded-full object-cover"
                    alt={dr.doctor.name}
                  />
                  <div className="ml-2">
                    <h3>{dr.doctor.name}</h3>
                    <h4 className="text-gray-500">{dr.doctor.job}</h4>
                  </div>
                </div>

                <p className="px-1 py-2 text-gray-400 flex gap-1 items-center">
                  <img src={iconImage} alt="" />
                  6th of October City, Cairo
                </p>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant="outlined"
                    disabled={dr.status === "pending_payment"}
                    onClick={() => {
                      if (dr.status !== "cancelled") {
                        dispatch(cancelAppointment(dr.id));
                      }

                      // if (dr.status === "cancelled") {
                      //   navigate("/Appointment");
                      // }


                    }}
                  >
                    {canCancel(dr)
                      ? "Cancel"
                      : dr.status === "cancelled"
                      ? "Book Again"
                      : dr.status === "pending_payment"
                      ? "Cancel"
                      : "View Details"}
                  </Button>

                  <Button

                  onClick={()=>{


                      // if (dr.status != "cancelled" && dr.status != "pending_payment" ) {
                      //      navigate("/Form");
                      //   }

                  }}

                    variant="contained"
                    sx={{ boxShadow: "none", "&:hover": { boxShadow: "none" } }}
                  >
                    {canCancel(dr)
                      ? "Reschedule"
                      : dr.status === "cancelled"
                      ? "Support"
                      : dr.status === "pending_payment"
                      ? "Reschedule"
                      : "FeadBack"}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
             No {status} Appointments
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Are you sure you want to cancel this appointment?</DialogTitle>
        <DialogContent>
          <p>This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>No, Keep it</Button>
          <Button onClick={handleConfirmCancel} variant="contained" color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
