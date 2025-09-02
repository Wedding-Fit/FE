import type React from "react"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name: string
  label?: string
  error?: string
  className?: string
  direction?: "horizontal" | "vertical"
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  className = "",
  direction = "horizontal",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-subTitle text-black mb-2.5">{label}</label>}
      <div className={`flex gap-6 ${direction === "vertical" ? "flex-col" : "flex-row"}`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="sr-only"
              />
              <div
                className={`
                  w-5 h-5 border-2 rounded-full transition-all duration-200
                  ${value === option.value
                    ? "border-red-default bg-red-default"
                    : error
                    ? "border-red-500 bg-white"
                    : "border-gray-800 bg-white"}
                `}
              >
                {value === option.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
            <span className="ml-3 text-subTitle text-black select-none">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export { RadioGroup }
export type { RadioOption }