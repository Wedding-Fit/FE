import { useState, useRef, useEffect } from "react"

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
}

export default function DatePicker({ value = "", onChange, placeholder = "YYYY-MM-DD" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(value)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  const koreanDays = ["일", "월", "화", "수", "목", "금", "토"]
  const koreanMonths = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({
        date: prevMonthDay.getDate(),
        isCurrentMonth: false,
        fullDate: prevMonthDay,
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: new Date(year, month, day),
      })
    }

    const remainingCells = 42 - days.length 
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonthDay = new Date(year, month + 1, day)
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextMonthDay,
      })
    }

    return days
  }

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0]
    setSelectedDate(formattedDate)
    onChange?.(formattedDate)
    setIsOpen(false)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentMonth)
  const currentYear = currentMonth.getFullYear()
  const currentMonthName = koreanMonths[currentMonth.getMonth()]

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="relative w-full border border-gray-800 rounded-lg px-4 py-3 bg-white cursor-pointer hover:border-gray-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selectedDate}
          placeholder={placeholder}
          readOnly
          className={`
            w-full bg-transparent outline-none cursor-pointer text-body
            ${selectedDate ? "text-black" : "text-gray-700"}
            placeholder-gray-700
          `}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2.5 bg-white border border-gray-800 rounded-lg shadow-dark z-50 p-4">
          <div className="flex items-center justify-between mb-2.5">
            <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-100 rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <h3 className="text-subTitle text-black font-bold">
              {currentYear}년 {currentMonthName}
            </h3>

            <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-100 rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>


          <div className="grid grid-cols-7 gap-1 mb-2.5">
            {koreanDays.map((day, index) => (
              <div
                key={day}
                className={`text-center py-2 text-body font-medium ${
                  index === 0 ? "text-red-strong" : index === 6 ? "text-navy-dark" : "text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day.fullDate)}
                className={`
                  h-10 text-center rounded hover:bg-gray-100 transition-colors text-body
                  ${day.isCurrentMonth ? "text-black font-medium" : "text-gray-400"}
                  ${
                    selectedDate === day.fullDate.toISOString().split("T")[0]
                      ? "bg-red-default text-white hover:bg-red-dark"
                      : ""
                  }
                `}
              >
                {day.date.toString().padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
