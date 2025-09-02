import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SimpleDropdownOption {
  value: string
  label: string
}

interface SimpleDropdownProps {
  options: SimpleDropdownOption[]
  selectedValue: string
  onSelect: (value: string) => void
}

const SimpleDropdown = ({ options, selectedValue, onSelect }: SimpleDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || ''

  return (
    <div className="relative inline-block text-body font-medium">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-[14px] h-[14px]" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2.5 bg-white border border-gray-800 rounded-md shadow z-10 w-max">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value)
                setIsOpen(false)
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-body"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SimpleDropdown