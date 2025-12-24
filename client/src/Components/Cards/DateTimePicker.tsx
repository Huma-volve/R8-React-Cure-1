import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
// import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { getDoctorById } from "@/api/auth";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { bookAppointment } from "@/api/auth"; // or "@/api/booking"


interface DoctorTimeSlot {
  date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:mm"
  end_time: string;   // "HH:mm"
}

interface Doctor {
  id: string;
  name: string;
  is_favorite: boolean;
  times?: DoctorTimeSlot[];
}

interface TimesByMonth {
  [monthKey: string]: {
    [day: string]: { start_time: string; end_time: string }[];
  };
}

export function DateTimePicker() {
  const { id } = useParams()
  const [timesByMonth, setTimesByMonth] = useState<TimesByMonth>({});
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // "YYYY-MM"
  const [selectedDay, setSelectedDay] = useState<string>('');     // "DD"
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableHours, setAvailableHours] = useState<{ start_time: string; end_time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch doctor and group times by month/day
  useEffect(() => {
    if (!id) return;
    getDoctorById("1")
      .then((res) => {
        const data: Doctor = res.data;

        const grouped: TimesByMonth = {};
        if (data.times && Array.isArray(data.times)) {
          data.times.forEach(({ date, start_time, end_time }) => {
            const [year, month, day] = date.split("-");
            const monthKey = `${year}-${month}`;
            if (!grouped[monthKey]) grouped[monthKey] = {};
            if (!grouped[monthKey][day]) grouped[monthKey][day] = [];
            grouped[monthKey][day].push({ start_time, end_time });
          });
        }

        setTimesByMonth(grouped);
      })
      .catch(console.error);
  }, [id]);

  // Update available days when month changes
useEffect(() => {
  if (!selectedMonth || !timesByMonth[selectedMonth]) {
    setAvailableDays([]);
    setSelectedDay('');
    setAvailableHours([]);
    setSelectedTime('');
    return;
  }

  const days = Object.keys(timesByMonth[selectedMonth]); setAvailableDays(days); setSelectedDay(''); setAvailableHours([]); setSelectedTime(''); }, [selectedMonth, timesByMonth]);
  // Update available hours when day changes
  useEffect(() => {
    if (!selectedMonth || !selectedDay || !timesByMonth[selectedMonth]?.[selectedDay]) {
      setAvailableHours([]);
      setSelectedTime('');
      return;
    }
    setAvailableHours(timesByMonth[selectedMonth][selectedDay]);
  }, [selectedMonth, selectedDay, timesByMonth]);
  const handleBook = async () => {
    if (!selectedMonth || !selectedDay || !selectedTime) return;

    const date = `${selectedMonth}-${selectedDay}`; // "YYYY-MM-DD"
    const time= selectedTime; // selected hour
    if (!id) {
      console.error("Doctor ID is missing");
      return; // or show an error
    }
    try {
      const bookingData = {
      doctor_id: id,
      date,
      time,
    };

    const result = await bookAppointment(bookingData);
     setSnackbarMessage(result.data?.message || "Booking successful!");
      setSnackbarOpen(true);
    } catch (error: any) {
      // Show error message
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
};
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 pb-4 border-b border-gray-200 gap-3 sm:gap-0">
        <h2 className="text-gray-700 font-medium text-base md:text-lg">Choose date and time</h2>
        <div className="flex items-center gap-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Month & Year"
            views={['month', 'year']}
            value={selectedMonth ? dayjs(`${selectedMonth}-01`) : null} 
            onChange={(date) => {
              if (date) {
                 const month = `${date.year()}-${String(date.month() + 1).padStart(2, '0')}`;
                  setSelectedMonth(month);
              }
            }}
          />
          </LocalizationProvider>
        </div>
      </div>

      {/* Date Selection */}
      {availableDays.length > 0 && (
        <div className="mb-6 md:mb-8">
          <div className="grid grid-cols-7 gap-2 md:gap-3 md:grid-cols-4">
            {availableDays.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center py-2 md:py-3 px-1 md:px-2 text-xs font-medium rounded-lg transition-all ${
                  selectedDay === day ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-base md:text-lg font-semibold">{day}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Selection */}
      {availableHours.length > 0 && (
        <div className="mb-6 md:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
            {availableHours.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTime(`${dayjs(slot.start_time, 'HH:mm:ss').format('HH:mm')} - ${dayjs(slot.end_time, 'HH:mm:ss').format('HH:mm')}`)}
                className={`py-2 md:py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === `${dayjs(slot.start_time, 'HH:mm:ss').format('HH:mm')} - ${dayjs(slot.end_time, 'HH:mm:ss').format('HH:mm')}`
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dayjs(slot.start_time, 'HH:mm:ss').format('HH:mm')} - {dayjs(slot.end_time, 'HH:mm:ss').format('HH:mm')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary & Book */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          {selectedDay && selectedMonth && selectedTime && (
            <span className="font-medium">
              {selectedTime} / {selectedMonth}-{selectedDay}  
            </span>
          )}
        </div>
        <Button
          onClick={handleBook}
          variant="outlined"
          className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
          disabled={!selectedDay || !selectedTime}
        >
          Book
        </Button>
              <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      </div>
    </div>
  );
}
export default DateTimePicker;