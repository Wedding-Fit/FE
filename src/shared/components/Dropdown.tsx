import { useState, useRef, useEffect } from "react"

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  className?: string
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  label,
  error,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`w-full ${className} h-[50px]`} ref={dropdownRef}>
      {label && <label className="block text-body text-gray-700 mb-2.5">{label}</label>}
      <div className="relative ">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[50px] px-4 py-3 border border-gray-800 rounded-lg bg-white flex items-center justify-between text-subTitle ${
            error ? "border-red-500" : ""
          }`}
        >
          <span className={selectedOption ? "text-black text-body" : "text-gray-700 text-body"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="#626262"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2.5 bg-white border border-gray-800 rounded-lg shadow-dark">
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-2 text-left text-body ${
                    value === option.value ? "bg-gray-100 text-black font-bold" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-2.5 text-sm text-red-strong">{error}</p>}
    </div>
  )
}

export default Dropdown