import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import Button from './Button'

interface SelectMenuProps {
  options: string[]
  selected: string
  onSelect: (value: string) => void
}

const SelectMenu = ({ options, selected, onSelect }: SelectMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [tempSelected, setTempSelected] = useState(selected)

    const close = () => setIsOpen(false)

    return (
        <div className="relative inline-block">
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-body font-medium"
        >
            {selected}
            <ChevronDown className="w-[14px] h-[14px]" />
        </button>

        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl w-[372px] p-5 shadow-xl relative">
            <h2 className="text-title text-center mb-[20px]">지역 선택</h2>
            <button
                onClick={close}
                className="absolute top-[25px] right-[25px] text-gray-500 hover:text-black"
            >
                <X size={20} />
            </button>
                <div className="grid grid-cols-3 gap-2 mb-[20px]">
                    {options.map((region) => {
                        const isSelected = tempSelected === region
                        return (
                        <button
                            key={region}
                            onClick={() => setTempSelected(region)}
                            className={`px-3 py-2 border rounded-md text-body ${
                            isSelected
                                ? 'bg-red-default text-white border-red-default font-bold'
                                : 'text-black border-red-default'
                            }`}
                        >
                            {region}
                        </button>
                        )
                    })}
                    </div>

                    <Button
                    onClick={() => {
                        onSelect(tempSelected)
                        close()
                    }}
                    >
                    완료
                    </Button>
                </div>
            </div>
        )}
        </div>
    )
}

export default SelectMenu