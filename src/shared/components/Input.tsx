import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-subTitle text-black mb-2.5">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full h-[50px] px-4 py-3 rounded-lg border
            text-body text-black placeholder-gray-700
            bg-white shadow-dark
            focus:outline-none focus:ring-2 focus:ring-red-default focus:border-transparent
            disabled:bg-gray-100 disabled:text-gray-400
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-800"}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }