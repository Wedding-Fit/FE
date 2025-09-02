import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const SemiButton = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-[180px] h-[35px] flex items-center justify-center rounded-md bg-red-default text-white text-bodyBold font-bold ${className}`}
    >
      {children}
    </button>
  )
}

export default SemiButton