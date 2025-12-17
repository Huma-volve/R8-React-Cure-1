import { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

interface TimeSlot {
  time: string
  available: boolean
}

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "12:30 PM", available: true },
  { time: "5:30 PM", available: true },
  { time: "7:00 PM", available: true },
]

export function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedTime, setSelectedTime] = useState("11:00 AM")
  const [month, setMonth] = useState("November")
  const [year, setYear] = useState(2024)

  // Generate week starting from the 12th
  const weekDays = [
    { day: "Fri", date: 12 },
    { day: "Sat", date: 13 },
    { day: "Sun", date: 14 },
    { day: "Mon", date: 15 },
    { day: "Tue", date: 16 },
    { day: "Wed", date: 17 },
    { day: "Thu", date: 18 },
  ]

  const getDayName = (date: number): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const d = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), date)
    return days[d.getDay()]
  }

  const isSelected = (date: number) => selectedDate === date

  return (
    <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 pb-4 border-b border-gray-200 gap-3 sm:gap-0">
        <h2 className="text-gray-700 font-medium text-base md:text-lg">Choose date and time</h2>
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-900">
            {month}, {year}
          </span>
          <ExpandMoreIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Date Selection */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-7 gap-2 md:gap-3 md:grid-cols-4 ">
          {weekDays.map(({ day, date }) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center py-2 md:py-3 px-1 md:px-2 rounded-lg transition-all ${
                isSelected(date) ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xs font-medium mb-1">{day}</span>
              <span className="text-base md:text-lg font-semibold">{date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
          {timeSlots.map(({ time }) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 md:py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Selection Summary and Book Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium">
            {weekDays.find((w) => w.date === selectedDate)?.day}, {month} {selectedDate} - {selectedTime}
          </span>
        </div>
        <Button 
          variant="outlined" 
          className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
        >
          Book
        </Button>
      </div>
    </div>
  )
}
export default DateTimePicker;