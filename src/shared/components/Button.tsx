import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full h-[60px] flex items-center justify-center rounded-md bg-red-default text-white text-buttonTitle font-bold ${className}`}
    >
      {children}
    </button>
  )
}

export default Button